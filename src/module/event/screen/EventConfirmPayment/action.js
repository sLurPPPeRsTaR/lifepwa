import { paymentEventVoucherApi } from '@cp-module/payments/paymentsApi';

export function paymentEventVoucherAction(params, callback) {
  paymentEventVoucherApi(params)
    .then((response) => {
      callback({
        metaCode: 200,
        data: response?.data,
        message: 'success'
      })
    })
    .catch(error => {
      callback({
        metaCode: error?.response?.status,
        data: null,
        message: error?.response?.message
      })
    })
}