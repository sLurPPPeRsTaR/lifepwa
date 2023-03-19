import * as CONST from './constant';

export const createBilling = (payload) => ({
  type: CONST.CREATE_BILLING,
  payload,
});

export const createBillingSuccess = (payload) => ({
  type: CONST.CREATE_BILLING_SUCCESS,
  payload,
});

export const createBillingFailed = (payload) => ({
  type: CONST.CREATE_BILLING_FAILED,
  payload,
});
