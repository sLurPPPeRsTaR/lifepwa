import * as CONST from './constant';

export const checkReferral = (payload) => ({
  type: CONST.CHECK_REFERRAL,
  payload,
});
export const checkReferralSuccess = (payload) => ({
  type: CONST.CHECK_REFERRAL_SUCCESS,
  payload,
});
export const checkReferralFailed = (payload) => ({
  type: CONST.CHECK_REFERRAL_FAILED,
  payload,
});

export const setReferralCode = (code) => {
  return {
    type: CONST.SET_REFERRAL,
    code,
  };
};
