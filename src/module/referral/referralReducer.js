import * as CONST from '@cp-module/referral/referralConstant';
import * as STATE from '@cp-module/referral/referralInitialState';
import _ from 'lodash';

const referralInitialState = {
  ...STATE.getListReferralInitialState,
  action: '',
};

export const referralReducer = (state = referralInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    // SET_AUTH_REQUEST_OTP
    [CONST.GET_LIST_REFERRAL]: () => ({
      ...state,
      getListReferralParam: payload,
      getListReferralFetch: true,
      action: type,
    }),
    [CONST.GET_LIST_REFERRAL_SUCCESS]: () => ({
      ...state,
      getListReferralResponse: payload,
      getListReferralFetch: false,
      action: type,
    }),
    [CONST.GET_LIST_REFERRAL_FAILED]: () => ({
      ...state,
      getListReferralFailed: payload,
      getListReferralFetch: false,
      action: type,
    }),
    [CONST.GET_LIST_REFERRAL_CLEAR]: () => ({
      ...state,
      ...STATE.getListReferralInitialState,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
