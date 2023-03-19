export const getPaymentMethodInitialState = {
  getPaymentMethodFetch: false,
  getPaymentMethodParam: {},
  getPaymentMethodResponse: {},
  getPaymentMethodError: {
    message: '',
  },
};

export const setCreateBillInitialState = {
  setCreateBillFetch: false,
  setCreateBillParam: {},
  setCreateBillResponse: {},
  setCreateBillError: {
    message: '',
  },
};

export const getPaymentStatusInitialState = {
  getPaymentStatusFetch: false,
  getPaymentStatusParam: {},
  getPaymentStatusResponse: {},
  getPaymentStatusError: {
    message: '',
  },
};

export const getPaymentStatusv2InitialState = {
  getPaymentStatusv2Fetch: false,
  getPaymentStatusv2Param: {},
  getPaymentStatusv2Response: {},
  getPaymentStatusv2Error: {
    message: null,
  },
};

export const getPaymentHistory = {
  from: '',
  product: '',
};

export const getCheckPaymentParamState = {
  inviteeUserId: '',
  paymentId: '',
};

export const orderPaymentMethodInitialState = {
  orderPaymentMethodFetch: false,
  orderPaymentMethodParam: {},
  orderPaymentMethodResponse: {},
  orderPaymentMethodError: {
    message: {},
  },
};

export const deletePaymentMethodInitialState = {
  deletePaymentMethodFetch: false,
  deletePaymentMethodParam: {},
  deletePaymentMethodResponse: {},
  deletePaymentMethodError: {
    message: {},
  },
};

export const getPaymentEventStatusInitialState = {
  getPaymentEventStatusFetch: false,
  getPaymentEventStatusParam: {},
  getPaymentEventStatusResponse: {},
  getPaymentEventStatusError: {
    message: {},
  },
};

export const getAddCardStatusInitialState = {
  Fetch: false,
  getAddCardStatusParam: {},
  getAddCardStatusResponse: {},
  getAddCardStatusError: {
    message: {},
  },
};

// LIFETAG PAYMENT
export const setLifetagPaymentCheckInitialState = {
  setLifetagPaymentCheckFetch: false,
  setLifetagPaymentCheckParam: {},
  setLifetagPaymentCheckResponse: {},
  setLifetagPaymentCheckFailed: {
    message: '',
  },
};

export const getPaymentStatusv3InitialState = {
  getPaymentStatusv3Fetch: false,
  getPaymentStatusv3Param: {},
  getPaymentStatusv3Response: {},
  getPaymentStatusv3Error: {
    message: '',
  },
};

export const setCreateBillEventInitialState = {
  setCreateBillEventFetch: false,
  setCreateBillEventParam: {},
  setCreateBillEventResponse: {},
  setCreateBillEventError: {
    message: '',
  },
};
