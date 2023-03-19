import * as CONST from './constant';

const getBeneficiaryReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.GET_BENEFICIARY]: () => ({
      ...state,
      getBeneficiaryFetch: true,
      getBeneficiaryParam: payload,
      getBeneficiaryResponse: null,
      getBeneficiaryFailed: null,
      action: type,
    }),

    [CONST.GET_BENEFICIARY_SUCCESS]: () => ({
      ...state,
      getBeneficiaryResponse: payload,
      getBeneficiaryFailed: null,
      getBeneficiaryFetch: false,
      action: type,
    }),

    [CONST.GET_BENEFICIARY_FAILED]: () => ({
      ...state,
      getBeneficiaryResponse: null,
      getBeneficiaryFailed: payload,
      getBeneficiaryFetch: false,
      action: type,
    }),

    [CONST.GET_BENEFICIARY_CLEAR]: () => ({
      ...state,
      getBeneficiaryResponse: null,
      getBeneficiaryFailed: null,
      getBeneficiaryFetch: false,
      action: type,
    }),
  };
};

export default getBeneficiaryReducer;
