import { useEffect, useState } from 'react'

const USER = 'user'
const ENVIRONMENT = 'environment'
const SUPPORTED_FACING_MODES = [USER, ENVIRONMENT]
const MINIMUM_CONSTRAINTS = {
  audio: false,
  video: true
}

const isEmptyObject = (obj) => {
  if (typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
  }
}
const isMinimumConstraints = (idealFacingMode, idealResolution) => {
  return !(idealFacingMode || (idealResolution && !isEmptyObject(idealResolution)))
}
const getNavigatorDevices = () => {
  let NMDevice = null
  let isNewApi = typeof window !== 'undefined' ? !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) : false
  let isOldApi = typeof window !== 'undefined' ? !!(navigator?.mozGetUserMedia || navigator?.webkitGetUserMedia) : false

  if (isNewApi) {
    NMDevice = navigator.mediaDevices
  } else if (isOldApi) {
    let NMDeviceOld = navigator.mozGetUserMedia || navigator.webkitGetUserMedia

    // Setup getUserMedia, with polyfill for older browsers
    // Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    let polyfillGetUserMedia = {
      getUserMedia: function(constraint) {
        return new Promise(function (resolve, reject) {
          NMDeviceOld.call(navigator, constraint, resolve, reject)
        })
      }
    }

    // overwrite getUserMedia() with the polyfill
    NMDevice = Object.assign(NMDeviceOld, polyfillGetUserMedia)
  }

  return NMDevice
}
const getIdealConstraints = (idealFacingMode, idealResolution) => {
  let idealConstraints = {
    audio: false,
    video: {}
  }

  if (isMinimumConstraints(idealFacingMode, idealResolution)) {
    return MINIMUM_CONSTRAINTS
  }

  const supports = getNavigatorDevices().getSupportedConstraints()

  if (!supports.width || !supports.height || !supports.facingMode) {
    console.error('Constraint width height or facingMode not supported!, use minimum constraints')
    return MINIMUM_CONSTRAINTS
  }

  if (idealFacingMode && SUPPORTED_FACING_MODES.includes(idealFacingMode)) {
    idealConstraints.video.facingMode = idealFacingMode
  }

  if (idealResolution && idealResolution.width) {
    idealConstraints.video.width = idealResolution.width
  }

  if (idealResolution && idealResolution.height) {
    idealConstraints.video.height = idealResolution.height
  }

  return idealConstraints
}
const getMaxResVideoConstraints = (idealFacingMode = {}, numberOfMaxResolutionTry, forceUser = 'desktop') => {
  let constraints = getIdealConstraints(idealFacingMode)

  const facingMode = constraints.video.facingMode
  const facingConstraints = { 'facingMode': 'environment' }
  // const facingConstraints = forceUser === 'mobile'
  //   ? { 'facingMode': { 'exact': facingMode } }
  //   : { 'ideal': { 'facingMode': 'environment' } }

  const VIDEO_ADVANCED_CONSTRAINTS = forceUser === 'mobile'
    ? [
      {
        'width': { min: 240, ideal: 360, max: 480 },
        'height': { min: 320, ideal: 640, max: 640 },
        ...facingConstraints
      }
    ]
    : [
      {'width': {'min': 640}, ...facingConstraints},
      {'width': {'min': 800}, ...facingConstraints},
      {'width': {'min': 900}, ...facingConstraints},
      {'width': {'min': 1024}, ...facingConstraints},
      {'width': {'min': 1080}, ...facingConstraints},
      {'width': {'min': 1280}, ...facingConstraints},
      {'width': {'min': 1920}, ...facingConstraints},
      {'width': {'min': 2560}, ...facingConstraints},
      {'width': {'min': 3840}, ...facingConstraints},
    ]

  if (numberOfMaxResolutionTry >= VIDEO_ADVANCED_CONSTRAINTS.length) {
    return null
  }

  let advanced = VIDEO_ADVANCED_CONSTRAINTS.slice(0, -numberOfMaxResolutionTry)
  constraints.video.advanced = advanced

  return constraints
}
const getWindowUrl = () => {
  let windowURL = typeof window !== 'undefined' ? window.URL || window.webkitURL || window.mozURL || window.msURL : undefined;
  return windowURL
}

export const useCameraHelper = () => {
  const [videoEl, setVideoEl] = useState(null)
  const [streamData, setStreamData] = useState(null)
  const [currSettings, setCurrentSettings] = useState(null)
  const [numberOfMaxResolutionTry, setNumberOfMaxResolutionTry] = useState(3)
  const [inputVideoDeviceInfo, setInputVideoDeviceInfo] = useState([])

  const windowURL = getWindowUrl()
  const mediaDevices = getNavigatorDevices()

  const setVideoSrc = (stream) => {
    if (videoEl) {
      if ('srcObject' in videoEl) {
        videoEl.srcObject = stream
      } else {
        let videoSrc = windowURL?.createObjectURL(stream)
        videoEl.src = videoSrc
      }
      videoEl?.setAttribute('playsinline', true)
      videoEl?.play()
    }
  }
  const setSettings = (stream) => {
    setCurrentSettings(null)
    const tracks = (stream && stream?.getTracks)
      ? stream.getTracks()
      : []

    if (tracks?.length > 0 && tracks[0].getSettings) {
      setCurrentSettings(tracks[0].getSettings())
    }
  }
  const goStream = (stream) => {
    setStreamData(stream)
    setSettings(stream)
    setVideoSrc(stream)
  }
  const getInputVideoDeviceInfoPromise = () => {
    return new Promise((resolve, reject) => {
      let tempInputVideoDeviceInfo = []
      mediaDevices.enumerateDevices()
        .then((devices) => {
          devices.forEach((device) => {
            if (device.kind === 'videoinput') {
              tempInputVideoDeviceInfo.push(device)
            }
          })
          resolve(tempInputVideoDeviceInfo)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  const getStreamDeviceDefaultResolution = (idealFacingMode, idealResolution) => {
    return new Promise((resolve, reject) => {
      let constraints = getIdealConstraints(idealFacingMode, idealResolution)

      mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          goStream(stream)
          getInputVideoDeviceInfoPromise()
            .then((deviceInfo) => {
              setInputVideoDeviceInfo(deviceInfo)
            })
            .catch(() => {})
            .then(() => resolve(stream))
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  const getStreamDeviceMaxResolution = (idealFacingMode, forceUser) => {
    let constraints = getMaxResVideoConstraints(idealFacingMode, numberOfMaxResolutionTry, forceUser)

    if (constraints === null) {
      let idealResolution = {}
      return getStreamDeviceDefaultResolution(idealFacingMode, idealResolution)
    }

    return new Promise((resolve, reject) => {
      mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          goStream(stream)
          getInputVideoDeviceInfoPromise()
            .then((deviceInfo) => {
              setInputVideoDeviceInfo(deviceInfo)
            })
            .catch(() => {})
            .then(() => resolve(stream))
        })
        .catch((error) => {
          console.log(error)
          if (
            error.name === 'NotAllowedError' ||
            error.name === 'OverconstrainedError' ||
            error.name === 'NotFoundError'
          ) {
            reject(error)
          } else {
            setTimeout(() => {
              setNumberOfMaxResolutionTry(numberOfMaxResolutionTry+1)
              getStreamDeviceMaxResolution(idealFacingMode, forceUser)
                .catch(() => {
                  reject(error)
                })
            }, 20);
          }
        })
    })
  }

  const initVideoEl = (videoEl) => {
    setVideoEl(videoEl)
  }
  const stopCamera = () => {
    return new Promise((resolve, reject) => {
      if (streamData) {
        streamData.getTracks().forEach((track) => {
          if (track) {
            track.stop()
          }
        })
        videoEl.src = ''
        setStreamData(null)
        setSettings(null)
        resolve('Success')
      }
      reject('No stream data found')
    })
  }
  const startCameraMaxResolution = (idealFacingMode = {}, forceUser) => {
    // stop the stream before playing it
    return stopCamera()
      .then(() => {})
      .catch(() => {})
      // always called (when the promise stopCamera is done)
      .then(() => {
        return getStreamDeviceMaxResolution(idealFacingMode, forceUser)
      })
  }
  const getCameraSettings = () => {
    return currSettings
  }
  const getInputVideoDeviceInfo = () => {
    return inputVideoDeviceInfo
  }


  return {
    videoEl,
    initVideoEl,
    stopCamera,
    startCameraMaxResolution,
    getCameraSettings,
    getInputVideoDeviceInfo
  }
}