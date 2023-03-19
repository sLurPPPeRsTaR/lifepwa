import { call, put, debounce } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/lifecover/lifecoverConstant';
import { getPremiPublicApi } from '@cp-module/lifecover/lifecoverApi';
import {
  getPremiPublicSuccess,
  getPremiPublicFailed,
} from '@cp-module/lifecover/lifecoverAction';

function* getPremiPublic(params) {
  try {
    const response = yield call(getPremiPublicApi, params.payload);
    yield put(getPremiPublicSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPremiPublicFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPremiPublicFailed(error?.response?.data));
        break;
      default:
        yield put(getPremiPublicFailed(error?.response?.data));
    }
  }
}

export default [debounce(1000, CONST.GET_PREMI_PUBLIC, getPremiPublic)];
