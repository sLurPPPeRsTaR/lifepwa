import * as CONST from './constant';

const setSubmissionReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.SET_SUBMISSION]: () => ({
      ...state,
      setSubmissionParam: payload,
      setSubmissionResponse: null,
      setSubmissionfailed: null,
      setSubmissionFetch: true,
      action: type,
    }),
    [CONST.SET_SUBMISSION_SUCCESS]: () => ({
      ...state,
      setSubmissionResponse: payload,
      setSubmissionfailed: null,
      setSubmissionFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMISSION_FAILED]: () => ({
      ...state,
      setSubmissionResponse: null,
      setSubmissionfailed: payload,
      setSubmissionFetch: false,
      action: type,
    }),
  };
};

export default setSubmissionReducer;
