import * as CONST from './constant';

export const getPremiPrivate = (payload) => {
  return {
    type: CONST.GET_PREMI_PRIVATE,
    payload,
  };
};

export const getPremiPrivateSuccess = (payload) => ({
  type: CONST.GET_PREMI_PRIVATE_SUCCESS,
  payload,
});

export const getPremiPrivateFailed = (payload) => ({
  type: CONST.GET_PREMI_PRIVATE_FAILED,
  payload,
});
