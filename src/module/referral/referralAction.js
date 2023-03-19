import * as CONST from '@cp-module/referral/referralConstant';

export const getListReferral = (payload) => ({
  type: CONST.GET_LIST_REFERRAL,
  payload,
});
export const getListReferralSuccess = (payload) => ({
  type: CONST.GET_LIST_REFERRAL_SUCCESS,
  payload,
});
export const getListReferralFailed = (payload) => ({
  type: CONST.GET_LIST_REFERRAL_FAILED,
  payload,
});
export const getListReferralClear = (payload) => ({
  type: CONST.GET_LIST_REFERRAL_CLEAR,
  payload,
});
