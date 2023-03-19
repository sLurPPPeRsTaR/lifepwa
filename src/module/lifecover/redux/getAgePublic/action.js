import * as CONST from './constant';

export const getAgePublic = (payload) => ({
  type: CONST.GET_AGE_PUBLIC,
  payload,
});

export const getAgePublicSuccess = (payload) => ({
  type: CONST.GET_AGE_PUBLIC_SUCCESS,
  payload,
});

export const getAgePublicFailed = (payload) => ({
  type: CONST.GET_AGE_PUBLIC_FAILED,
  payload,
});
