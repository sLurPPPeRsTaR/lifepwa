import * as CONST from '@cp-module/payments/paymentsConstant';

export const getPaymentMethod = (payload) => ({
  type: CONST.GET_PAYMENT_METHOD,
  payload,
});
export const getPaymentMethodSuccess = (payload) => ({
  type: CONST.GET_PAYMENT_METHOD_SUCCESS,
  payload,
});
export const getPaymentMethodFailed = (payload) => ({
  type: CONST.GET_PAYMENT_METHOD_FAILED,
  payload,
});
export const getPaymentMethodClear = (payload) => ({
  type: CONST.GET_PAYMENT_METHOD_CLEAR,
  payload,
});

export const setCreateBill = (payload) => ({
  type: CONST.SET_CREATE_BILL,
  payload,
});
export const setCreateBillSuccess = (payload) => ({
  type: CONST.SET_CREATE_BILL_SUCCESS,
  payload,
});
export const setCreateBillFailed = (payload) => ({
  type: CONST.SET_CREATE_BILL_FAILED,
  payload,
});
export const setCreateBillClear = (payload) => ({
  type: CONST.SET_CREATE_BILL_CLEAR,
  payload,
});

export const getPaymentStatus = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS,
  payload,
});
export const getPaymentStatusSuccess = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_SUCCESS,
  payload,
});
export const getPaymentStatusFailed = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_FAILED,
  payload,
});
export const getPaymentStatusClear = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_CLEAR,
  payload,
});

export const getPaymentStatusv2 = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_V2,
  payload,
});
export const getPaymentStatusv2Success = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_V2_SUCCESS,
  payload,
});
export const getPaymentStatusv2Failed = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_V2_FAILED,
  payload,
});
export const getPaymentStatusv2Clear = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_V2_CLEAR,
  payload,
});

export const getPaymentHistory = (payload) => ({
  type: CONST.GET_PAYMENT_HISTORY,
  payload,
});

export const getCheckPaymentParam = (payload) => ({
  type: CONST.GET_CHECK_PAYMENT_PARAM,
  payload,
});

export const orderPaymentMethod = (payload) => ({
  type: CONST.ORDER_PAYMENT_METHOD,
  payload,
});
export const orderPaymentMethodSuccess = (payload) => ({
  type: CONST.ORDER_PAYMENT_METHOD_SUCCESS,
  payload,
});
export const orderPaymentMethodFailed = (payload) => ({
  type: CONST.ORDER_PAYMENT_METHOD_FAILED,
  payload,
});
export const orderPaymentMethodClear = (payload) => ({
  type: CONST.ORDER_PAYMENT_METHOD_CLEAR,
  payload,
});

export const deletePaymentMethod = (payload) => ({
  type: CONST.DELETE_PAYMENT_METHOD,
  payload,
});
export const deletePaymentMethodSuccess = (payload) => ({
  type: CONST.DELETE_PAYMENT_METHOD_SUCCESS,
  payload,
});
export const deletePaymentMethodFailed = (payload) => ({
  type: CONST.DELETE_PAYMENT_METHOD_FAILED,
  payload,
});
export const deletePaymentMethodClear = (payload) => ({
  type: CONST.DELETE_PAYMENT_METHOD_CLEAR,
  payload,
});
export const getPaymentEventStatus = (payload) => ({
  type: CONST.GET_PAYMENT_EVENT_STATUS,
  payload,
});
export const getPaymentEventStatusSuccess = (payload) => ({
  type: CONST.GET_PAYMENT_EVENT_STATUS_SUCCESS,
  payload,
});
export const getPaymentEventStatusFailed = (payload) => ({
  type: CONST.GET_PAYMENT_EVENT_STATUS_FAILED,
  payload,
});
export const getPaymentEventStatusClear = (payload) => ({
  type: CONST.GET_PAYMENT_EVENT_STATUS_CLEAR,
  payload,
});

export const getAddCardStatus = (payload) => ({
  type: CONST.GET_ADD_CARD_STATUS,
  payload,
});
export const getAddCardStatusSuccess = (payload) => ({
  type: CONST.GET_ADD_CARD_STATUS_SUCCESS,
  payload,
});
  export const getAddCardStatusFailed = (payload) => ({
    type: CONST.GET_ADD_CARD_STATUS_FAILED,
    payload,
  });
export const getAddCardStatusClear = (payload) => ({
  type: CONST.GET_ADD_CARD_STATUS_CLEAR,
  payload,
});

// LIFETAG PAYMENT
export const setLifetagPaymentCheck = (payload) => ({
  type: CONST.SET_LIFETAG_PAYMENT_CHECK,
  payload,
});
export const setLifetagPaymentCheckSuccess = (payload) => ({
  type: CONST.SET_LIFETAG_PAYMENT_CHECK_SUCCESS,
  payload,
});
export const setLifetagPaymentCheckFailed = (payload) => ({
  type: CONST.SET_LIFETAG_PAYMENT_CHECK_FAILED,
  payload,
});
export const setLifetagPaymentCheckClear = (payload) => ({
  type: CONST.SET_LIFETAG_PAYMENT_CHECK_CLEAR,
  payload,
});

export const getPaymentStatusv3 = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_V3,
  payload,
});
export const getPaymentStatusv3Success = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_V3_SUCCESS,
  payload,
});
export const getPaymentStatusv3Failed = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_V3_FAILED,
  payload,
});
export const getPaymentStatusv3Clear = (payload) => ({
  type: CONST.GET_PAYMENT_STATUS_V3_CLEAR,
  payload,
});

export const setCreateBillEvent = (payload) => ({
  type: CONST.SET_CREATE_BILL_EVENT,
  payload,
});
export const setCreateBillEventSuccess = (payload) => ({
  type: CONST.SET_CREATE_BILL_EVENT_SUCCESS,
  payload,
});
export const setCreateBillEventFailed = (payload) => ({
  type: CONST.SET_CREATE_BILL_EVENT_FAILED,
  payload,
});
export const setCreateBillEventClear = (payload) => ({
  type: CONST.SET_CREATE_BILL_EVENT_CLEAR,
  payload,
});
