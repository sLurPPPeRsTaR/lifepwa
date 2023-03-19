import * as CONST from './constant';

const checkReferralReducer = (state, action) => {
  const { payload, type, code } = action;
  return {
    [CONST.CHECK_REFERRAL]: () => ({
      ...state,
      checkReferralParam: payload,
      checkReferralResponse: null,
      checkReferralFailed: null,
      checkReferralFetch: true,
      action: type,
    }),

    [CONST.CHECK_REFERRAL_SUCCESS]: () => ({
      ...state,
      checkReferralResponse: payload,
      checkReferralFailed: null,
      checkReferralFetch: false,
      action: type,
    }),

    [CONST.CHECK_REFERRAL_FAILED]: () => ({
      ...state,
      checkReferralResponse: null,
      checkReferralFailed: payload,
      checkReferralFetch: false,
      action: type,
    }),

    [CONST.SET_REFERRAL]: () => {
      return {
        ...state,
        referralCode: code,
        action: type,
      };
    },
  };
};

export default checkReferralReducer;
