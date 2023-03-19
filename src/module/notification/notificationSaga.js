import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/notification/notificationConstant';
import {
  getNotifFailed,
  getNotifSuccess,
  getNotifTransactionSuccess,
  getNotifTransactionFailed,
  readNotifFailed,
  readNotifSuccess,
} from '@cp-module/notification/notificationAction';
import {
  getNotifApi,
  getNotifTransactionApi,
  readNotifApi,
} from '@cp-module/notification/notificationApi';

function* getNotif(params) {
  try {
    const response = yield call(getNotifApi, params.payload);
    yield put(getNotifSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getNotifFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getNotifFailed(error?.response?.data));
        break;
      default:
        yield put(getNotifFailed(error?.response?.data));
    }
  }
}

function* getNotifTransaction(params) {
  try {
    const response = yield call(getNotifTransactionApi, params.payload);
    yield put(getNotifTransactionSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getNotifTransactionFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getNotifTransactionFailed(error?.response?.data));
        break;
      default:
        yield put(getNotifTransactionFailed(error?.response?.data));
    }
  }
}

function* readNotif(params) {
  try {
    const response = yield call(readNotifApi, params.payload);
    yield put(readNotifSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(readNotifFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(readNotifFailed(error?.response?.data));
        break;
      default:
        yield put(readNotifFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.GET_NOTIF, getNotif),
  takeLatest(CONST.GET_NOTIF_TRANSACTION, getNotifTransaction),
  takeLatest(CONST.READ_NOTIF, readNotif),
];
