import * as CONST from './constant';

export const getUserConfirmationDetail = (payload) => ({
  type: CONST.GET_USER_CONFIRMATION,
  payload,
});

export const getUserConfirmationDetailSuccess = (payload) => ({
  type: CONST.GET_USER_CONFIRMATION_SUCCESS,
  payload,
});

export const getUserConfirmationDetailFailed = (payload) => ({
  type: CONST.GET_USER_CONFIRMATION_FAILED,
  payload,
});
