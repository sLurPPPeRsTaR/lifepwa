import { call, put, debounce } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/lifecover/lifecoverConstant';
import { getAgePublicApi } from '@cp-module/lifecover/lifecoverApi';
import {
  getAgePublicSuccess,
  getAgePublicFailed,
} from '@cp-module/lifecover/lifecoverAction';

function* getAgePublic(params) {
  try {
    const response = yield call(getAgePublicApi, params.payload);
    yield put(getAgePublicSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getAgePublicFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getAgePublicFailed(error?.response?.data));
        break;
      default:
        yield put(getAgePublicFailed(error?.response?.data));
    }
  }
}

export default [debounce(1000, CONST.GET_AGE_PUBLIC, getAgePublic)];
