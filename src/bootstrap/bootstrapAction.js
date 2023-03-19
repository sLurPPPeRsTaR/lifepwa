import * as BOOTSTRAP from '@cp-bootstrap/bootstrapConstant';
import { type } from 'react-icons-kit/feather';

export const setActivity = (type, value = '') => ({
  payload: {
    type,
    value,
  },
  type: BOOTSTRAP.SET_ACTIVITY,
});
export const setLocation = (payload) => ({
  type: BOOTSTRAP.SET_LOCATION,
  payload,
});
export const setiIsLocationPermissionGranted = (payload) => ({
  type: BOOTSTRAP.SET_IS_LOCATION_PERMISSION_GRANTED,
  payload,
});
export const setIsShowModalComingSoon = (payload) => ({
  type: BOOTSTRAP.SET_IS_SHOW_MODAL_COMING_SOON,
  payload,
});

export const setUploadImageProgress = (payload) => ({
  type: BOOTSTRAP.SET_UPLOAD_IMAGE_PROGRESS,
  payload,
});
export const setToastMsg = (payload) => ({
  type: BOOTSTRAP.SET_TOASTMSG,
  payload,
});
export const setIsProgressCodePush = (payload) => ({
  type: BOOTSTRAP.SET_ISPROGRESS_CODEPUSH,
  payload,
});
export const setDimensions = (payload) => ({
  type: BOOTSTRAP.SET_DIMENSIONS,
  payload,
});

export const setFirstLoad = (payload) => ({
  type: BOOTSTRAP.SET_FIRST_LOAD,
  payload,
});
export const setAppConfig = (payload) => ({
  type: BOOTSTRAP.SET_APP_CONFIG,
  payload,
});

// used
export const setInternalServerError = (payload) => ({
  type: BOOTSTRAP.SET_INTERNAL_SERVER_ERROR,
  payload,
});
export const setBetterOpenApp = (payload) => ({
  type: BOOTSTRAP.SET_BETTER_OPEN_APP,
  payload,
});
export const setHospital = (payload) => ({
  type: BOOTSTRAP.SET_HOSPITAL,
  payload,
});
export const setFaqAsk = (payload) => ({
  type: BOOTSTRAP.SET_FAQ_ASK,
  payload,
});
export const setCustomerCare = (payload) => ({
  type: BOOTSTRAP.SET_CUSTOMER_CARE,
  payload,
});
export const setLoading = (payload) => ({
  type: BOOTSTRAP.SET_LOADING,
  payload,
});
export const setNotAvailable = (payload) => ({
  type: BOOTSTRAP.SET_NOT_AVAILABLE,
  payload,
});
export const setAvailableOnMobile = (payload) => ({
  type: BOOTSTRAP.SET_AVAILABLE_ON_MOBILE,
  payload,
});
export const setEventCode = (payload) => ({
  type: BOOTSTRAP.SET_EVENT_CODE,
  payload,
});
export const setIsComingFromScreen = (payload) => ({
  type: BOOTSTRAP.SET_IS_COMING_FROM_SCREEN,
  payload,
});
export const setIsComingFromDeepLink = (payload) => ({
  type: BOOTSTRAP.SET_IS_COMING_FROM_DEEPLINK,
  payload,
});
export const setIsOnlyAddCard = (payload) => ({
  type: BOOTSTRAP.SET_IS_ONLY_ADD_CARD,
  payload,
});
export const setModalTermNCondition = (payload) => ({
  type: BOOTSTRAP.SET_IS_MODAL_TERM_N_CONDITION,
  payload,
});
export const setModalLsTnc = (payload) => ({
  type: BOOTSTRAP.SET_IS_MODAL_LS_TNC,
  payload
})
export const setModalShowRiplay = (payload) => ({
  type: BOOTSTRAP.SET_IS_MODAL_SHOW_LS_RIPLAY,
  payload
})
export const setPayloadSubSubscribe = (payload) => ({
  type: BOOTSTRAP.SET_PAYLOAD_SUB_SUBSCRIBE,
  payload
})

// modal lifetag
export const setLifetagAccessFailed = (payload) => ({
  type: BOOTSTRAP.SET_LIFETAG_ACCESS_FAILED,
  payload,
});
export const setLifetagNotActive = (payload) => ({
  type: BOOTSTRAP.SET_LIFETAG_NOT_ACTIVE,
  payload,
});
export const setLifetagOutOffStock = (payload) => ({
  type: BOOTSTRAP.SET_LIFETAG_OUT_OFF_STOCK,
  payload,
});
export const setLifetagPairingFailed = (payload) => ({
  type: BOOTSTRAP.SET_LIFETAG_PAIRING_FAILED,
  payload,
});
export const setLifetagReadyToConnect = (payload) => ({
  type: BOOTSTRAP.SET_LIFETAG_READY_TO_CONNECT,
  payload,
});

export const setAppsflyerData = (payload) => ({
  type: BOOTSTRAP.SET_APPSFLYER_DATA,
  payload,
});
export const setReferral = (payload) => ({
  type: BOOTSTRAP.SET_REFERRAL,
  payload,
});