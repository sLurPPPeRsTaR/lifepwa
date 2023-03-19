import { call, put, takeLatest } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from './constant';
import { checkReferralApi } from './api';
import {
  checkReferralSuccess,
  checkReferralFailed,
  setReferralCode,
} from './action';

function* checkReferral(params) {
  try {
    const response = yield call(checkReferralApi, params.payload);
    yield put(setReferralCode(params.payload?.referralCode));
    yield put(checkReferralSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(checkReferralFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(checkReferralFailed(error?.response?.data));
        break;
      default:
        yield put(checkReferralFailed(error?.response?.data));
    }
  }
}

export default [takeLatest(CONST.CHECK_REFERRAL, checkReferral)];
