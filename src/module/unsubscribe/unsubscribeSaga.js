import { call, put, takeLatest } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/unsubscribe/unsubscribeConstant';

import { setUnsubscribeNewsletterApi } from '@cp-module/unsubscribe/unsubscribeApi';
import {
  setUnsubscribeNewsletterSuccess,
  setUnsubscribeNewsletterFailed,
} from '@cp-module/unsubscribe/unsubscribeAction';

function* setUnsubscribeNewsletter(params) {
  try {
    const response = yield call(setUnsubscribeNewsletterApi, params.payload);
    yield put(setUnsubscribeNewsletterSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUnsubscribeNewsletterFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUnsubscribeNewsletterFailed(error?.response?.data));
        break;
      default:
        yield put(setUnsubscribeNewsletterFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.SET_UNSUBSCRIBE_NEWS_LETTER, setUnsubscribeNewsletter),
];
