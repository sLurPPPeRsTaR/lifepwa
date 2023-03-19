import * as CONST from './constant';

const addBeneficiaryReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.ADD_BENEFICIARY]: () => ({
      ...state,
      addBeneficiaryFetch: true,
      addBeneficiaryParam: payload,
      addBeneficiaryResponse: null,
      addBeneficiaryFailed: null,
      action: type,
    }),

    [CONST.ADD_BENEFICIARY_SUCCESS]: () => ({
      ...state,
      addBeneficiaryResponse: payload,
      addBeneficiaryFailed: null,
      addBeneficiaryFetch: false,
      action: type,
    }),

    [CONST.ADD_BENEFICIARY_FAILED]: () => ({
      ...state,
      addBeneficiaryResponse: null,
      addBeneficiaryFailed: payload,
      addBeneficiaryFetch: false,
      action: type,
    }),
  };
};

export default addBeneficiaryReducer;
