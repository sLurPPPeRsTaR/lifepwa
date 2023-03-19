import { call, put, takeLatest } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from './constant';
import { setSubmissionApi } from './api';
import { setSubmissionSuccess, setSubmissionFailed } from './action';

function* setSubmission(params) {
  try {
    const response = yield call(setSubmissionApi, params.payload);
    yield put(setSubmissionSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setSubmissionFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setSubmissionFailed(error?.response?.data));
        break;
      default:
        yield put(setSubmissionFailed(error?.response?.data));
    }
  }
}

export default [takeLatest(CONST.SET_SUBMISSION, setSubmission)];
