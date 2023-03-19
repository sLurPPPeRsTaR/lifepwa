import { call, put, debounce } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/lifecover/lifecoverConstant';
import { createBillingApi } from '@cp-module/lifecover/lifecoverApi';
import {
  createBillingSuccess,
  createBillingFailed,
} from '@cp-module/lifecover/lifecoverAction';

function* createBilling(params) {
  try {
    const response = yield call(createBillingApi, params.payload);
    yield put(createBillingSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(createBillingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(createBillingFailed(error?.response?.data));
        break;
      default:
        yield put(createBillingFailed(error?.response?.data));
    }
  }
}

export default [debounce(1000, CONST.CREATE_BILLING, createBilling)];
