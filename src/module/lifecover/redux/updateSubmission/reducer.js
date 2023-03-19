import * as CONST from './constant';

const updateSubmissionReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.UPDATE_SUBMISSION]: () => ({
      ...state,
      updateSubmissionFetch: true,
      updateSubmissionParam: payload,
      updateSubmissionResponse: null,
      updateSubmissionFailed: null,
      action: type,
    }),

    [CONST.UPDATE_SUBMISSION_SUCCESS]: () => ({
      ...state,
      updateSubmissionResponse: payload,
      updateSubmissionFailed: null,
      updateSubmissionFetch: false,
      action: type,
    }),

    [CONST.UPDATE_SUBMISSION_FAILED]: () => ({
      ...state,
      updateSubmissionResponse: null,
      updateSubmissionFailed: payload,
      updateSubmissionFetch: false,
      action: type,
    }),
  };
};

export default updateSubmissionReducer;
