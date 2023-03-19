import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/referral/referralConstant';
import {
  getListReferralApi,
} from '@cp-module/referral/referralApi';
import {
  getListReferralSuccess,
  getListReferralFailed,
} from '@cp-module/referral/referralAction';

// setAuthVerifyPIN
function* getListReferral(params) {
  try {
    const response = yield call(getListReferralApi, params.payload);
    yield put(getListReferralSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getListReferralFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getListReferralFailed(error?.response?.data));
        break;
      default:
    }
  }
}

export default [
  takeLatest(CONST.GET_LIST_REFERRAL, getListReferral),
];
