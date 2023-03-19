import * as CONST from './constant';

const getCurrentSubsReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.GET_CURRENT_SUBS_LIFECOVER]: () => ({
      ...state,
      getCurrentSubsLifecoverFetch: true,
      getCurrentSubsLifecoverParam: payload,
      getCurrentSubsLifecoverResponse: null,
      getCurrentSubsLifecoverFailed: null,
      action: type,
    }),

    [CONST.GET_CURRENT_SUBS_LIFECOVER_SUCCESS]: () => ({
      ...state,
      getCurrentSubsLifecoverResponse: payload,
      getCurrentSubsLifecoverFailed: null,
      getCurrentSubsLifecoverFetch: false,
      action: type,
    }),

    [CONST.GET_CURRENT_SUBS_LIFECOVER_FAILED]: () => ({
      ...state,
      getCurrentSubsLifecoverResponse: null,
      getCurrentSubsLifecoverFailed: payload,
      getCurrentSubsLifecoverFetch: false,
      action: type,
    }),
  };
};

export default getCurrentSubsReducer;
