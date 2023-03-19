import * as CONST from './constant';

export const setSubmission = (payload) => ({
  type: CONST.SET_SUBMISSION,
  payload,
});
export const setSubmissionSuccess = (payload) => ({
  type: CONST.SET_SUBMISSION_SUCCESS,
  payload,
});
export const setSubmissionFailed = (payload) => ({
  type: CONST.SET_SUBMISSION_FAILED,
  payload,
});
