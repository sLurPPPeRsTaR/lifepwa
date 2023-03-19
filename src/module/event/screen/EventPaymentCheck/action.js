import { getPaymentEventStatusFailed, getPaymentEventStatusSuccess } from '@cp-module/payments/paymentsAction';
import {
  getPaymentEventStatusApi
} from '@cp-module/payments/paymentsApi';
import { RESPONSE_STATUS } from '@cp-util/constant';

export function getPaymentEventStatusAction(params, callback) {
  getPaymentEventStatusApi(params)
    .then((response) => {
      callback({
        metaCode: 200,
        data: response?.data
      })
      getPaymentEventStatusSuccess(response?.data)
    })
    .catch(error => {
      callback({
        metaCode: error?.response?.status
      })
      switch (error?.response?.status) {
        case RESPONSE_STATUS.BAD_REQUEST:
          getPaymentEventStatusFailed(error?.response?.data);
          break;
        case RESPONSE_STATUS.ERROR:
          getPaymentEventStatusFailed(error?.response?.data);
          break;
        default:
          getPaymentEventStatusFailed(error?.response?.data);
      }
    })
}