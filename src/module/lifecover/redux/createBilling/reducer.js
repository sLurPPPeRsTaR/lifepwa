import * as CONST from './constant';

const createBillingReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.CREATE_BILLING]: () => ({
      ...state,
      createBillingFetch: true,
      createBillingParam: payload,
      createBillingResponse: null,
      createBillingFailed: null,
      action: type,
    }),

    [CONST.CREATE_BILLING_SUCCESS]: () => ({
      ...state,
      createBillingResponse: payload,
      createBillingFailed: null,
      createBillingFetch: false,
      action: type,
    }),

    [CONST.CREATE_BILLING_FAILED]: () => ({
      ...state,
      createBillingResponse: null,
      createBillingFailed: payload,
      createBillingFetch: false,
      action: type,
    }),
  };
};

export default createBillingReducer;
