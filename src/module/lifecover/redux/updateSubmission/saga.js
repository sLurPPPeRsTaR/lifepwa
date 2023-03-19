import { call, put, debounce } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/lifecover/lifecoverConstant';
import { updateSubmissionApi } from '@cp-module/lifecover/lifecoverApi';
import {
  updateSubmissionSuccess,
  updateSubmissionFailed,
} from '@cp-module/lifecover/lifecoverAction';

function* updateSubmission(params) {
  try {
    const response = yield call(updateSubmissionApi, params.payload);
    console.log('Response Redux Saga - updateSubmission 14 ', response);
    yield put(updateSubmissionSuccess(response));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(updateSubmissionFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(updateSubmissionFailed(error?.response?.data));
        break;
      default:
        yield put(updateSubmissionFailed(error?.response?.data));
    }
  }
}

export default [debounce(1000, CONST.UPDATE_SUBMISSION, updateSubmission)];
