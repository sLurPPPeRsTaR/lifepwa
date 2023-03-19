import * as CONST from './constant';

const getPremiPublicReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.GET_PREMI_PUBLIC]: () => ({
      ...state,
      getPremiPublicgetPremiPublicParam: payload,
      getPremiPublicResponse: null,
      getPremiPublicFailed: null,
      getPremiPublicFetch: true,
      action: type,
    }),

    [CONST.GET_PREMI_PUBLIC_SUCCESS]: () => ({
      ...state,
      getPremiPublicResponse: payload,
      getPremiPublicFailed: null,
      getPremiPublicFetch: false,
      action: type,
    }),

    [CONST.GET_PREMI_PUBLIC_FAILED]: () => ({
      ...state,
      getPremiPublicResponse: null,
      getPremiPublicFailed: payload,
      getPremiPublicFetch: false,
      action: type,
    }),
  };
};

export default getPremiPublicReducer;
