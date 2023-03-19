import * as CONST from './constant';

const getPremiPrivateReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.GET_PREMI_PRIVATE]: () => ({
      ...state,
      getPremiPrivategetPremiPrivateParam: payload,
      getPremiPrivateResponse: null,
      getPremiPrivateFailed: null,
      getPremiPrivateFetch: true,
      action: type,
    }),

    [CONST.GET_PREMI_PRIVATE_SUCCESS]: () => ({
      ...state,
      getPremiPrivateResponse: payload,
      getPremiPrivateFailed: null,
      getPremiPrivateFetch: false,
      action: type,
    }),

    [CONST.GET_PREMI_PRIVATE_FAILED]: () => ({
      ...state,
      getPremiPrivateResponse: null,
      getPremiPrivateFailed: payload,
      getPremiPrivateFetch: false,
      action: type,
    }),
  };
};

export default getPremiPrivateReducer;
