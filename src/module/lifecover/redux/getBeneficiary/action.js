import * as CONST from './constant';

export const getBeneficiary = (payload) => ({
  type: CONST.GET_BENEFICIARY,
  payload,
});

export const getBeneficiarySuccess = (payload) => ({
  type: CONST.GET_BENEFICIARY_SUCCESS,
  payload,
});

export const getBeneficiaryFailed = (payload) => ({
  type: CONST.GET_BENEFICIARY_FAILED,
  payload,
});

export const getBeneficiaryClear = (payload) => ({
  type: CONST.GET_BENEFICIARY_CLEAR,
  payload,
});
