import * as STATE from '@cp-module/payments/paymentsInitialState';
import * as CONST from '@cp-module/payments/paymentsConstant';

const paymentsInitialState = {
  ...STATE.getPaymentMethodInitialState,
  ...STATE.setCreateBillInitialState,
  ...STATE.getPaymentStatusInitialState,
  ...STATE.getPaymentStatusv2InitialState,
  ...STATE.getPaymentHistory,
  ...STATE.getCheckPaymentParamState,
  ...STATE.orderPaymentMethodInitialState,
  ...STATE.deletePaymentMethodInitialState,
  ...STATE.getPaymentEventStatusInitialState,
  ...STATE.getPaymentStatusv3InitialState,
  ...STATE.setCreateBillEventInitialState,
  action: '',
  
};

export const paymentsReducer = (state = paymentsInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.GET_PAYMENT_METHOD]: () => ({
      ...state,
      getPaymentMethodParam: payload,
      getPaymentMethodFetch: true,
      action: type,
    }),
    [CONST.GET_PAYMENT_METHOD_SUCCESS]: () => ({
      ...state,
      getPaymentMethodResponse: payload,
      getPaymentMethodFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_METHOD_FAILED]: () => ({
      ...state,
      getPaymentMethodError: payload,
      getPaymentMethodFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_METHOD_CLEAR]: () => ({
      ...state,
      getPaymentMethodResponse: paymentsInitialState.getPaymentMethodResponse,
      getPaymentMethodError: paymentsInitialState.getPaymentMethodError,
      action: type,
    }),

    [CONST.SET_CREATE_BILL]: () => ({
      ...state,
      setCreateBillParam: payload,
      setCreateBillFetch: true,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_SUCCESS]: () => ({
      ...state,
      setCreateBillResponse: payload,
      setCreateBillFetch: false,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_FAILED]: () => ({
      ...state,
      setCreateBillError: payload,
      setCreateBillFetch: false,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_CLEAR]: () => ({
      ...state,
      setCreateBillResponse: {},
      setCreateBillError: { message: '' },
      action: type,
    }),

    [CONST.GET_PAYMENT_STATUS]: () => ({
      ...state,
      getPaymentStatusParam: payload,
      getPaymentStatusFetch: true,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_SUCCESS]: () => ({
      ...state,
      getPaymentStatusResponse: payload,
      getPaymentStatusFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_FAILED]: () => ({
      ...state,
      getPaymentStatusError: payload,
      getPaymentStatusFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_CLEAR]: () => ({
      ...state,
      getPaymentStatusResponse: paymentsInitialState.getPaymentStatusResponse,
      getPaymentStatusError: paymentsInitialState.getPaymentStatusError,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_V2]: () => ({
      ...state,
      getPaymentStatusv2Param: payload,
      getPaymentStatusv2Fetch: true,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_V2_SUCCESS]: () => ({
      ...state,
      getPaymentStatusv2Response: payload,
      getPaymentStatusv2Fetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_V2_FAILED]: () => {
      return {
        ...state,
        getPaymentStatusv2Error: payload,
        getPaymentStatusv2Fetch: false,
        action: type,
      }
    }
   ,
    [CONST.GET_PAYMENT_STATUS_V2_CLEAR]: () => ({
      ...state,
      getPaymentStatusv2Response:
        paymentsInitialState.getPaymentStatusv2Response,
      getPaymentStatusv2Error: paymentsInitialState.getPaymentStatusv2Error,
      action: type,
    }),
    [CONST.GET_PAYMENT_HISTORY]: () => ({
      ...state,
      from: payload.from,
      product: payload.product,
    }),
    [CONST.GET_CHECK_PAYMENT_PARAM]: () => ({
      ...state,
      paymentId: payload.paymentId,
      inviteeUserId: payload.inviteeUserId,
      action: type,
    }),

    [CONST.ORDER_PAYMENT_METHOD]: () => ({
      ...state,
      orderPaymentMethodParam: payload,
      orderPaymentMethodFetch: true,
      action: type,
    }),
    [CONST.ORDER_PAYMENT_METHOD_SUCCESS]: () => ({
      ...state,
      orderPaymentMethodResponse: payload,
      orderPaymentMethodFetch: false,
      action: type,
    }),
    [CONST.ORDER_PAYMENT_METHOD_FAILED]: () => ({
      ...state,
      orderPaymentMethodError: payload,
      orderPaymentMethodFetch: false,
      action: type,
    }),
    [CONST.ORDER_PAYMENT_METHOD_CLEAR]: () => ({
      ...state,
      orderPaymentMethodResponse:
        paymentsInitialState.orderPaymentMethodResponse,
      orderPaymentMethodError: paymentsInitialState.orderPaymentMethodError,
      action: type,
    }),

    [CONST.DELETE_PAYMENT_METHOD]: () => ({
      ...state,
      deletePaymentMethodParam: payload,
      deletePaymentMethodFetch: true,
      action: type,
    }),
    [CONST.DELETE_PAYMENT_METHOD_SUCCESS]: () => ({
      ...state,
      deletePaymentMethodResponse: payload,
      deletePaymentMethodFetch: false,
      action: type,
    }),
    [CONST.DELETE_PAYMENT_METHOD_FAILED]: () => ({
      ...state,
      deletePaymentMethodError: payload,
      deletePaymentMethodFetch: false,
      action: type,
    }),
    [CONST.DELETE_PAYMENT_METHOD_CLEAR]: () => ({
      ...state,
      deletePaymentMethodResponse:
        paymentsInitialState.deletePaymentMethodResponse,
      deletePaymentMethodError: paymentsInitialState.deletePaymentMethodError,
      action: type,
    }),

    [CONST.GET_PAYMENT_EVENT_STATUS]: () => ({
      ...state,
      getPaymentEventStatusParam: payload,
      getPaymentEventStatusFetch: true,
      action: type,
    }),
    [CONST.GET_PAYMENT_EVENT_STATUS_SUCCESS]: () => ({
      ...state,
      getPaymentEventStatusResponse: payload,
      getPaymentEventStatusFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_EVENT_STATUS_FAILED]: () => ({
      ...state,
      getPaymentEventStatusError: payload,
      getPaymentEventStatusFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_EVENT_STATUS_CLEAR]: () => ({
      ...state,
      getPaymentEventStatusResponse:
        paymentsInitialState.getPaymentEventStatusResponse,
      getPaymentEventStatusError:
        paymentsInitialState.getPaymentEventStatusError,
      action: type,
    }),

    
    [CONST.GET_ADD_CARD_STATUS]: () => ({
      ...state,
      getAddCardStatusParam: payload,
      getAddCardStatusFetch: true,
      action: type,
    }),
    [CONST.GET_ADD_CARD_STATUS_SUCCESS]: () => ({
      ...state,
      getAddCardStatusResponse: payload,
      getAddCardStatusFetch: false,
      action: type,
    }),
    [CONST.GET_ADD_CARD_STATUS_FAILED]: () => ({
      ...state,
      getAddCardStatusError: payload,
      getAddCardStatusFetch: false,
      action: type,
    }),
    [CONST.GET_ADD_CARD_STATUS_CLEAR]: () => ({
      getAddCardStatusResponse: paymentsInitialState.getAddCardStatusResponse,
      getAddCardStatusError: paymentsInitialState.getAddCardStatusError,
      action: type,
    }),

    // LIFETAG PAYMENT
    [CONST.SET_LIFETAG_PAYMENT_CHECK]: () => ({
      ...state,
      setLifetagPaymentCheckParam: payload,
      setLifetagPaymentCheckFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_PAYMENT_CHECK_SUCCESS]: () => ({
      ...state,
      setLifetagPaymentCheckResponse: payload,
      setLifetagPaymentCheckFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_PAYMENT_CHECK_FAILED]: () => ({
      ...state,
      setLifetagPaymentCheckFailed: payload,
      setLifetagPaymentCheckFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_PAYMENT_CHECK_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagPaymentCheckInitialState,
      action: type,
    }),

    [CONST.GET_PAYMENT_STATUS_V3]: () => ({
      ...state,
      getPaymentStatusv3Param: payload,
      getPaymentStatusv3Fetch: true,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_V3_SUCCESS]: () => ({
      ...state,
      getPaymentStatusv3Response: payload,
      getPaymentStatusv3Fetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_V3_FAILED]: () => ({
      ...state,
      getPaymentStatusv3Error: payload,
      getPaymentStatusv3Fetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_V3_CLEAR]: () => ({
      ...state,
      getPaymentStatusv3Response:
        paymentsInitialState.getPaymentStatusv3Response,
      getPaymentStatusv3Error: paymentsInitialState.getPaymentStatusv3Error,
      action: type,
    }),


    [CONST.SET_CREATE_BILL_EVENT]: () => ({
      ...state,
      setCreateBillEventParam: payload,
      setCreateBillEventFetch: true,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_EVENT_SUCCESS]: () => ({
      ...state,
      setCreateBillEventResponse: payload,
      setCreateBillEventFetch: false,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_EVENT_FAILED]: () => ({
      ...state,
      setCreateBillEventError: payload,
      setCreateBillEventFetch: false,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_EVENT_CLEAR]: () => ({
      ...state,
      setCreateBillEventResponse:
        paymentsInitialState.setCreateBillEventResponse,
      setCreateBillEventError: paymentsInitialState.setCreateBillEventError,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
