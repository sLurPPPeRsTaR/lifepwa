import { call, put, takeLatest } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from './constant';
import { getQuestionApi } from './api';
import { getQuestionSuccess, getQuestionFailed } from './action';

function* getQuestions(params) {
  try {
    const response = yield call(getQuestionApi, params.payload);
    yield put(getQuestionSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getQuestionFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getQuestionFailed(error?.response?.data));
        break;
      default:
        yield put(getQuestionFailed(error?.response?.data));
    }
  }
}

export default [takeLatest(CONST.GET_QUESTIONS, getQuestions)];
