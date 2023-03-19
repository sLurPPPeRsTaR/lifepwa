import * as CONST from './constant';

export const getCurrentSubs = (payload) => ({
  type: CONST.GET_CURRENT_SUBS_LIFECOVER,
  payload,
});

export const getCurrentSubsSuccess = (payload) => ({
  type: CONST.GET_CURRENT_SUBS_LIFECOVER_SUCCESS,
  payload,
});

export const getCurrentSubsFailed = (payload) => ({
  type: CONST.GET_CURRENT_SUBS_LIFECOVER_FAILED,
  payload,
});
