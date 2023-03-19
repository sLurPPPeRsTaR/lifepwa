import { call, put, debounce } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/lifecover/lifecoverConstant';
import { getUserConfirmationDetailApi } from '@cp-module/lifecover/lifecoverApi';
import {
  getUserConfirmationDetailSuccess,
  getUserConfirmationDetailFailed,
} from '@cp-module/lifecover/lifecoverAction';

function* getUserConfirmationDetail(params) {
  try {
    const response = yield call(getUserConfirmationDetailApi, params.payload);
    yield put(getUserConfirmationDetailSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUserConfirmationDetailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUserConfirmationDetailFailed(error?.response?.data));
        break;
      default:
        yield put(getUserConfirmationDetailFailed(error?.response?.data));
    }
  }
}

export default [
  debounce(1000, CONST.GET_USER_CONFIRMATION, getUserConfirmationDetail),
];
