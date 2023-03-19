import * as CONST from './constant';

export const getPremiPublic = (payload) => ({
  type: CONST.GET_PREMI_PUBLIC,
  payload,
});

export const getPremiPublicSuccess = (payload) => ({
  type: CONST.GET_PREMI_PUBLIC_SUCCESS,
  payload,
});

export const getPremiPublicFailed = (payload) => ({
  type: CONST.GET_PREMI_PUBLIC_FAILED,
  payload,
});
