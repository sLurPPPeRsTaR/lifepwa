import * as CONST from '@cp-module/persist/persistConstant';

// LIFETAG INITIALSTATE
export const setLifetagTempState = (payload) => ({
  type: CONST.SET_LIFETAG_TEMP_STATE,
  payload,
});
export const setLifetagTempStateClear = (payload) => ({
  type: CONST.SET_LIFETAG_TEMP_STATE_CLEAR,
  payload,
});
export const setLifetagTempOrderState = (payload) => ({
  type: CONST.SET_LIFETAG_TEMP_ORDER_STATE,
  payload,
});
export const setLifetagTempOrderStateClaer = (payload) => ({
  type: CONST.SET_LIFETAG_TEMP_ORDER_STATE_CLEAR,
  payload,
});

export const setIsComingFromScreen = (payload) => ({
  type: CONST.SET_IS_COMING_FROM_SCREEN,
  payload,
});
export const setIsComingFromDeepLink = (payload) => ({
  type: CONST.SET_IS_COMING_FROM_DEEPLINK,
  payload,
});
export const setLifetagOtherInfo = (payload) => ({
  type: CONST.SET_LIFETAG_OTHER_INFO,
  payload,
});

// LIVENESS
export const setLivenessTemp = (payload) => ({
  type: CONST.SET_LIVENESS_TEMP,
  payload,
});

// kkpm
export const setKkpmTemp = (payload) => ({
  type: CONST.SET_KKPM_TEMP,
  payload,
});
export const setKkpmDataKk = (payload) => ({
  type: CONST.SET_KKPM_DATA_KK,
  payload,
});
export const setClearKkpm = (payload) => ({
  type: CONST.SET_CLEAR_KKPM,
  payload,
});
export const setIsKTPSame = (payload) => ({
  type: CONST.SET_IS_KTP_SAME,
  payload,
});
export const setIsKKSame = (payload) => ({
  type: CONST.SET_IS_KK_SAME,
  payload,
});
// OTHERINFORMATION
export const setOtherInformation = (payload) => ({
  type: CONST.SET_UPDATA_OTHERINFORMATION,
  payload,
});
export const setOtherInformationClear = (payload) => ({
  type: CONST.SET_UPDATA_OTHERINFORMATION_CLEAR,
  payload,
});
// TEMP_STATE
export const setUpdataTempState = (payload) => ({
  type: CONST.SET_UPDATA_TEMP_STATE,
  payload,
});
export const setUpdataTempStateClear = (payload) => ({
  type: CONST.SET_UPDATA_TEMP_STATE_CLEAR,
  payload,
});

// BUY_FOR_OTHERS_FORM
export const setBuyForOthersState = (payload) => ({
  type: CONST.SET_BUY_OTHERS_TEMP,
  payload,
});
export const setBuyForOthersStateClear = (payload) => ({
  type: CONST.SET_CLEAR_BUY_OTHERS,
  payload,
});

//widget home
export const setWidgetHome = (payload) => {
  return {
    type: CONST.SET_WIDGET_HOME,
    payload,
  };
};
