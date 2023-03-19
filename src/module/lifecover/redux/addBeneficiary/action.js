import * as CONST from './constant';

export const addBeneficiary = (payload) => ({
  type: CONST.ADD_BENEFICIARY,
  payload,
});

export const addBeneficiarySuccess = (payload) => ({
  type: CONST.ADD_BENEFICIARY_SUCCESS,
  payload,
});

export const addBeneficiaryFailed = (payload) => ({
  type: CONST.ADD_BENEFICIARY_FAILED,
  payload,
});
