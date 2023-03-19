import { call, put, debounce } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/lifecover/lifecoverConstant';
import { getCurrentSubsApi } from '@cp-module/lifecover/lifecoverApi';
import {
  getCurrentSubsSuccess,
  getCurrentSubsFailed,
} from '@cp-module/lifecover/lifecoverAction';

function* getCurrentSubsSaga(params) {
  try {
    const response = yield call(getCurrentSubsApi, params.payload);
    yield put(getCurrentSubsSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCurrentSubsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCurrentSubsFailed(error?.response?.data));
        break;
      default:
        yield put(getCurrentSubsFailed(error?.response?.data));
    }
  }
}

export default [debounce(1000, CONST.GET_CURRENT_SUBS_LIFECOVER, getCurrentSubsSaga)];
