import * as CONST from '@cp-module/forpass/forpassConstant';

export const getResetPassword = (payload) => ({
  type: CONST.GET_RESET_PASS,
  payload,
});
export const getResetPasswordSuccess = (payload) => ({
  type: CONST.GET_RESET_PASS_SUCCESS,
  payload,
});
export const getResetPasswordFailed = (payload) => ({
  type: CONST.GET_RESET_PASS_FAILED,
  payload,
});
export const getResetPasswordClear = (payload) => ({
  type: CONST.GET_RESET_PASS_CLEAR,
  payload,
});

export const setResetPassword = (payload) => ({
  type: CONST.SET_RESET_PASS,
  payload,
});
export const setResetPasswordSuccess = (payload) => ({
  type: CONST.SET_RESET_PASS_SUCCESS,
  payload,
});
export const setResetPasswordFailed = (payload) => ({
  type: CONST.SET_RESET_PASS_FAILED,
  payload,
});
export const setResetPasswordClear = (payload) => ({
  type: CONST.SET_RESET_PASS_CLEAR,
  payload,
});
