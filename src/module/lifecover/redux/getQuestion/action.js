import * as CONST from './constant';

export const getQuestions = (payload) => ({
  type: CONST.GET_QUESTIONS,
  payload,
});
export const getQuestionSuccess = (payload) => ({
  type: CONST.GET_QUESTION_SUCCESS,
  payload,
});
export const getQuestionFailed = (payload) => ({
  type: CONST.GET_QUESTION_FAILED,
  payload,
});
