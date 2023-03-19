import * as CONST from './constant';

export const updateSubmission = (payload) => ({
  type: CONST.UPDATE_SUBMISSION,
  payload,
});

export const updateSubmissionSuccess = (payload) => ({
  type: CONST.UPDATE_SUBMISSION_SUCCESS,
  payload,
});

export const updateSubmissionFailed = (payload) => ({
  type: CONST.UPDATE_SUBMISSION_FAILED,
  payload,
});
