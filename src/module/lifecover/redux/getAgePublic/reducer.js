import * as CONST from './constant';

const getAgePublicReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.GET_AGE_PUBLIC]: () => ({
      ...state,
      getAgePublicgetAgePublicParam: payload,
      getAgePublicResponse: null,
      getAgePublicFailed: null,
      getAgePublicFetch: true,
      action: type,
    }),

    [CONST.GET_AGE_PUBLIC_SUCCESS]: () => ({
      ...state,
      getAgePublicResponse: payload,
      getAgePublicFailed: null,
      getAgePublicFetch: false,
      action: type,
    }),

    [CONST.GET_AGE_PUBLIC_FAILED]: () => ({
      ...state,
      getAgePublicResponse: null,
      getAgePublicFailed: payload,
      getAgePublicFetch: false,
      action: type,
    }),
  };
};

export default getAgePublicReducer;
