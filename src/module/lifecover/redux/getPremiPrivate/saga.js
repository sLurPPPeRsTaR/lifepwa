import { call, put, debounce } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/lifecover/lifecoverConstant';
import { getPremiPrivateApi } from '@cp-module/lifecover/lifecoverApi';
import {
  getPremiPrivateSuccess,
  getPremiPrivateFailed,
} from '@cp-module/lifecover/lifecoverAction';

function* getPremiPrivate(params) {
  try {
    const response = yield call(getPremiPrivateApi, params.payload);
    yield put(getPremiPrivateSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPremiPrivateFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPremiPrivateFailed(error?.response?.data));
        break;
      default:
        yield put(getPremiPrivateFailed(error?.response?.data));
    }
  }
}

export default [debounce(1000, CONST.GET_PREMI_PRIVATE, getPremiPrivate)];
