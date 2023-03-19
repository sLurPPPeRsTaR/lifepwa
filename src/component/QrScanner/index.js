import jsQR from "jsqr";
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useCameraHelper } from '@cp-util/camera'
import Icon from 'react-icons-kit';
import { arrowLeft } from 'react-icons-kit/feather';
import { NAVIGATION } from '@cp-util/constant';
import { useRouter } from "next/router";
import { useBreakpoints } from "@cp-util/common";

const QrScanner = ({
  // PROPS
  open,
  onDetectedQrCode,
}) => {
  // HOOKS
  const cameraHelper = useCameraHelper()
  const router = useRouter()
  const { isLg } = useBreakpoints()

  // REF
  const videoRef = useRef()
  const canvasRef = useRef()

  // STATE
  const [canvasCtx, setCanvasCtx] = useState(null)
  const [debugTextQrData, setDebugTextQrData] = useState('No QR detected')

  // HANDLER
  const handleOnDetectedQrCode = useCallback((code) => {
    if (onDetectedQrCode) {
      onDetectedQrCode(code)
    }
  }, [onDetectedQrCode])
  const handleOnLoadedMetadata = (event) => {
    canvasRef.current.height = event.target.videoHeight
    canvasRef.current.width = event.target.videoWidth
  }
  const handleTick = useCallback(() => {
    const video = videoRef.current
    if (video?.readyState === 4) {
      if (canvasRef.current) {
        canvasCtx?.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height)
      }
      const imageData = canvasCtx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code && code.data) {
        setDebugTextQrData(code.data)
        handleOnDetectedQrCode(code.data)
        cancelAnimationFrame(handleTick)
        cameraHelper.stopCamera()
        return true
      }
    }
    requestAnimationFrame(handleTick)
  }, [cameraHelper, canvasCtx, handleOnDetectedQrCode])

  // EFFECTS
  useEffect(() => {
    if (open && videoRef.current) {
      cameraHelper.initVideoEl(videoRef.current)
    }

    return () => {
      cameraHelper.stopCamera()
    }
  }, [open])
  useEffect(() => {
    if (cameraHelper.videoEl) {
      const deviceView = isLg ? 'desktop' : 'mobile'
      cameraHelper.startCameraMaxResolution('environment', deviceView)
        .then(() => {
          setCanvasCtx(canvasRef.current.getContext('2d'))
        })
        .catch((error) => console.error(error))
    }
  }, [cameraHelper.videoEl, isLg])
  useEffect(() => {
    if (canvasCtx) {
      requestAnimationFrame(handleTick)
    }
  }, [canvasCtx])

  // RENDERER
  const renderHeader = () => (
    <div className="relative flex w-full items-center justify-center min-h-[80px] bg-black">
      <div
        role="button"
        onClick={() => {
          cameraHelper.stopCamera()
            .then(() => {
              router.push({
                pathname: NAVIGATION.HOME.Home,
              });
            })
        }}
        className="absolute flex items-center left-4"
      >
        <Icon
          icon={arrowLeft}
          size={20}
          onClick={() => router.push(NAVIGATION.HOME.Home)}
          className="cursor-pointer text-white"
          color="white"
        />
      </div>

      <div className="text-white text-center font-bold">
        Scan Barcode
      </div>
    </div>
  )
  // const renderDevelopmentDebug = () => {
  //   if (process.env.NODE_ENV === 'development') {
  //     return (
  //       <div className="absolute bg-white top-[30px] left-[30px] z-10 ">
  //         DEV (ONLY) DEBUG QR CODE RESULT: {debugTextQrData}
  //       </div>
  //     )
  //   }
  //   return null
  // }

  return (
    <>
      {renderHeader()}
      <div className="relative flex items-center justify-center bg-black w-full h-[calc(100vh-80px)] box-border overflow-hidden">
        {/* {renderDevelopmentDebug()} */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover lg:scale-x-[-1]"
          onLoadedMetadata={handleOnLoadedMetadata}
        />
        <canvas
          ref={canvasRef} 
          className="absolute left-0 top-0 lg:scale-x-[-1]"
          style={{ visibility: 'hidden' }}
        />

        {/* backdrop */}
        <div
          style={{
            position: 'absolute',
            boxShadow: '0 1000px 0 9999px rgba(0, 0, 0, 0.7)',
            zIndex: 180,
          }} 
          className="bg-white/15 h-[280px] w-full max-w-[280px] xm:h-80 xm:max-w-[260px] sm:h-96 sm:max-w-lg mx-5"
        >
          <div className="absolute w-[30px] md:[80px] xl:w-[120px]">
            <svg width="100%" viewBox="0 0 154 154" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M153.25 2.5C153.25 1.11929 152.131 0 150.75 0H0V150.75C0 152.131 1.11926 153.25 2.5 153.25C3.88074 153.25 5 152.131 5 150.75V5H150.75C152.131 5 153.25 3.88071 153.25 2.5Z" fill="white"/>
            </svg>
          </div>
          <div className="absolute w-[30px] md:[80px] xl:w-[120px] right-0 top-0 scale-x-[-1]">
            <svg width="100%" viewBox="0 0 154 154" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M153.25 2.5C153.25 1.11929 152.131 0 150.75 0H0V150.75C0 152.131 1.11926 153.25 2.5 153.25C3.88074 153.25 5 152.131 5 150.75V5H150.75C152.131 5 153.25 3.88071 153.25 2.5Z" fill="white"/>
            </svg>
          </div>
          <div className="absolute w-[30px] md:[80px] xl:w-[120px] right-0 bottom-0 scale-y-[-1] scale-x-[-1]">
            <svg width="100%" viewBox="0 0 154 154" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M153.25 2.5C153.25 1.11929 152.131 0 150.75 0H0V150.75C0 152.131 1.11926 153.25 2.5 153.25C3.88074 153.25 5 152.131 5 150.75V5H150.75C152.131 5 153.25 3.88071 153.25 2.5Z" fill="white"/>
            </svg>
          </div>
          <div className="absolute w-[30px] md:[80px] xl:w-[120px] left-0 bottom-0 scale-y-[-1]">
            <svg width="100%" viewBox="0 0 154 154" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M153.25 2.5C153.25 1.11929 152.131 0 150.75 0H0V150.75C0 152.131 1.11926 153.25 2.5 153.25C3.88074 153.25 5 152.131 5 150.75V5H150.75C152.131 5 153.25 3.88071 153.25 2.5Z" fill="white"/>
            </svg>
          </div>

          {/* detector animation */}
          <div className="absolute motion-safe:animate-updown w-full h-[1px] bg-[#D71920]" />
        </div>
      </div>
    </>
  )
}

export default QrScanner
