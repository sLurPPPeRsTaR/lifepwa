import { RESPONSE_STATUS } from '@cp-util/constant';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as CONST from '@cp-module/payments/paymentsConstant';
import {
  deletePaymentMethodFailed,
  deletePaymentMethodSuccess,
  getPaymentEventStatusFailed,
  getPaymentEventStatusSuccess,
  getPaymentMethodFailed,
  getPaymentMethodSuccess,
  getPaymentStatusFailed,
  getPaymentStatusSuccess,
  getPaymentStatusv2Failed,
  getPaymentStatusv2Success,
  orderPaymentMethodFailed,
  orderPaymentMethodSuccess,
  setCreateBillFailed,
  setCreateBillSuccess,
  getAddCardStatusFailed,
  setLifetagPaymentCheckFailed,
  setLifetagPaymentCheckSuccess,
  getPaymentStatusv3Success,
  getPaymentStatusv3Failed,
  setCreateBillEventSuccess,
  setCreateBillEventFailed,
} from '@cp-module/payments/paymentsAction';
import {
  deletePaymentMethodApi,
  getPaymentEventStatusApi,
  getPaymentMethodApi,
  getPaymentStatusApi,
  getPaymentStatusv2Api,
  orderPaymentMethodApi,
  setCreateBillApi,
  setCreateBillEventApi,
  setCreateBillRenewalApi,
  setCreateBillSinglePaymentApi,
  setCreteBillProposalApi,
  getAddCardStatusApi,
  getAddCardAsMainApi,
  setLifetagPaymentCheckApi,
  setLifetagPaymentApi,
  setCreateBillBundlingApi,
  getPaymentStatusv3Api,
  setCreateBillInvoiceMasterApi,
} from '@cp-module/payments/paymentsApi';

function* getPaymentMethod(params) {
  try {
    const response = yield call(getPaymentMethodApi, params.payload);
    yield put(getPaymentMethodSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPaymentMethodFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPaymentMethodFailed(error?.response?.data));
        break;
      default:
        yield put(getPaymentMethodFailed(error?.response?.data));
    }
  }
}

function* setCreateBill(params) {
  try {
    let response;
    if (params?.payload?.isPaymentTypeFalse) {
      response = yield call(setCreateBillEventApi, params?.payload?.data);
    } else if (params?.payload?.isProposal) {
      response = yield call(setCreteBillProposalApi, params?.payload?.data);
    } else if (params?.payload?.isSinglePayment) {
      response = yield call(
        setCreateBillSinglePaymentApi,
        params?.payload?.data,
      );
    } else if (params?.payload?.isRenewal) {
      response = yield call(setCreateBillRenewalApi, params?.payload?.data);
    } else if (params?.payload?.isLifetagPayment) {
      response = yield call(setLifetagPaymentApi, params?.payload?.data);
    } else if (params?.payload?.isBundling) {
      response = yield call(setCreateBillBundlingApi, params?.payload?.data);
    } else if (params?.payload?.isInvoiceMaster) {
      response = yield call(
        setCreateBillInvoiceMasterApi,
        params?.payload?.data
      );
    }
     else {
      response = yield call(setCreateBillApi, params.payload);
    }

    yield put(setCreateBillSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setCreateBillFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setCreateBillFailed(error?.response?.data));
        break;
      default:
        yield put(setCreateBillFailed(error?.response?.data));
    }
  }
}

function* getPaymentStatus(params) {
  try {
    let response;
    if (params?.payload?.isOnlyAddCard) {
      response = yield call(getAddCardStatusApi, params.payload.data);
    } else {
      response = yield call(getPaymentStatusApi, params.payload);
    }
    yield put(getPaymentStatusSuccess(response?.data));
    // if (
    //   response?.data?.paymentList[response?.data?.paymentList?.length - 1]
    //     ?.status === 'success'
    // ) {
    //   yield put(
    //     getPaymentStatusSuccess({
    //       status: 'success',
    //       data: response?.data,
    //     }),
    //   );
    // } else {
    //   yield put(
    //     getPaymentStatusSuccess({
    //       status: 'failed',
    //       data: response?.data,
    //     }),
    //   );
    // }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPaymentStatusFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPaymentStatusFailed(error?.response?.data));
        break;
      default:
        yield put(getPaymentStatusFailed(error?.response?.data));
    }
  }
}

function* getPaymentStatusv2(params) {
  try {
    const response = yield call(getPaymentStatusv2Api, params.payload);
    yield put(getPaymentStatusv2Success(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPaymentStatusv2Failed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPaymentStatusv2Failed(error?.response?.data));
        break;
      default:
        yield put(getPaymentStatusv2Failed(error?.response?.data));
    }
  }
}

function* orderPaymentMethod(params) {
  try {
    const response = yield call(orderPaymentMethodApi, params.payload);
    yield put(orderPaymentMethodSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(orderPaymentMethodFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(orderPaymentMethodFailed(error?.response?.data));
        break;
      default:
        yield put(orderPaymentMethodFailed(error?.response?.data));
    }
  }
}

function* deletePaymentMethod(params) {
  try {
    const response = yield call(deletePaymentMethodApi, params.payload);
    yield put(deletePaymentMethodSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(deletePaymentMethodFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(deletePaymentMethodFailed(error?.response?.data));
        break;
      default:
        yield put(deletePaymentMethodFailed(error?.response?.data));
    }
  }
}

function* getPaymentEventStatus(params) {
  try {
    const response = yield call(getPaymentEventStatusApi, params.payload);
    yield put(getPaymentEventStatusSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPaymentEventStatusFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPaymentEventStatusFailed(error?.response?.data));
        break;
      default:
        yield put(getPaymentEventStatusFailed(error?.response?.data));
    }
  }
}

function* getAddCardStatus(params) {
  try {
    const response = yield call(getAddCardStatusApi, params.payload);
    yield put(getPaymentStatusSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getAddCardStatusFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getAddCardStatusFailed(error?.response?.data));
        break;
      default:
        yield put(getAddCardStatusFailed(error?.response?.data));
    }
  }
}

// LIFETAG PAYMENT
function* setLifetagPaymentCheck(params) {
  try {
    const response = yield call(setLifetagPaymentCheckApi, params.payload);
    yield put(setLifetagPaymentCheckSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagPaymentCheckFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagPaymentCheckFailed(error?.response?.data));
        break;
      default:
        yield put(setLifetagPaymentCheckFailed(error?.response?.data));
    }
  }
}

function* getPaymentStatusv3(params) {
  try {
    const response = yield call(getPaymentStatusv3Api, params.payload);
    yield put(getPaymentStatusv3Success(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPaymentStatusv3Failed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPaymentStatusv3Failed(error?.response?.data));
        break;
      default:
        yield put(getPaymentStatusv3Failed(error?.response?.data));
    }
  }
}

function* setCreateBillEvent(params) {
  try {
    const response = yield call(setCreateBillEventApi, params.payload);
    yield put(setCreateBillEventSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setCreateBillEventFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setCreateBillEventFailed(error?.response?.data));
        break;
      default:
        yield put(setCreateBillEventFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.GET_PAYMENT_METHOD, getPaymentMethod),
  takeLatest(CONST.SET_CREATE_BILL, setCreateBill),
  takeLatest(CONST.GET_PAYMENT_STATUS, getPaymentStatus),
  takeLatest(CONST.GET_PAYMENT_STATUS_V2, getPaymentStatusv2),
  takeLatest(CONST.ORDER_PAYMENT_METHOD, orderPaymentMethod),
  takeLatest(CONST.DELETE_PAYMENT_METHOD, deletePaymentMethod),
  takeLatest(CONST.GET_PAYMENT_EVENT_STATUS, getPaymentEventStatus),
  takeLatest(CONST.GET_ADD_CARD_STATUS, getAddCardStatus),
  takeLatest(CONST.SET_LIFETAG_PAYMENT_CHECK, setLifetagPaymentCheck),
  takeLatest(CONST.GET_PAYMENT_STATUS_V3, getPaymentStatusv3),
  takeLatest(CONST.SET_CREATE_BILL_EVENT, setCreateBillEvent),
];
