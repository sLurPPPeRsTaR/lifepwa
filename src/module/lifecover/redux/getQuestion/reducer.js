import * as CONST from './constant';

const getQuestionReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.GET_QUESTIONS]: () => ({
      ...state,
      getQuestionParam: payload,
      getQuestionResponse: null,
      getQuestionFailed: null,
      getQuestionFetch: true,
      action: type,
    }),

    [CONST.GET_QUESTION_SUCCESS]: () => ({
      ...state,
      getQuestionResponse: payload,
      getQuestionFailed: null,
      getQuestionFetch: false,
      action: type,
    }),

    [CONST.GET_QUESTION_FAILED]: () => ({
      ...state,
      getQuestionResponse: null,
      getQuestionFailed: payload,
      getQuestionFetch: false,
      action: type,
    }),
  };
};

export default getQuestionReducer;
