import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getPaymentMethodApi = (payload) => {
  return api.post(`${API.PAYMENT.getPaymentMethod}`, payload);
};

export const setCreateBillApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBill}`, payload);
};

export const setCreateBillEventApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillEvent}`, payload);
};

export const setCreteBillProposalApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillProposal}`, payload);
};

export const setCreateBillSinglePaymentApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillSinglePayment}`, payload);
};

export const setCreateBillRenewalApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillRenewal}`, payload);
};

export const setCreateBillInvoiceMasterApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillInvoiceMaster}`, payload);
};

export const getPaymentStatusApi = (payload) => {
  return api.post(`${API.PAYMENT.getPaymentStatus}`, payload);
};

export const getPaymentStatusv2Api = (payload) => {
  return api.post(`${API.PAYMENT.getPaymentStatusv2}`, payload);
};

export const orderPaymentMethodApi = (payload) => {
  return api.post(`${API.PAYMENT.orderPaymentMethod}`, payload);
};

export const deletePaymentMethodApi = (payload) => {
  return api.put(`${API.PAYMENT.getPaymentMethod}`, payload);
};

export const paymentEventVoucherApi = (payload) => {
  console.log({ payload });
  return api.post(`${API.PAYMENT.getPaymentEventVoucher}`, payload);
  // return api({
  //   method: 'get',
  //   url: API.PAYMENT.getPaymentEventVoucher,
  //   data: payload
  // })
};

export const getPaymentEventStatusApi = (payload) => {
  return api.post(`${API.PAYMENT.getPaymentEventStatus}`, payload);
};


export const getAddCardStatusApi = (payload) => {
  return api.get(
    `${API.PAYMENT.getPaymentStatus}?paymentId=${payload.paymentId}&invoiceId=${payload.invoiceId}`,
    payload,
  );
};

export const setLifetagPaymentCheckApi = (payload) => {
  return api.post(`${API.CUSTOMER.PRODUCT.order}/payment/check`, payload);
};

// LIFETAG PAYMENT
export const setLifetagPaymentApi = (payload) => {
  return api.post(`${API.CUSTOMER.PRODUCT.order}/payment`, payload);
};

export const setCreateBillBundlingApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillBundling}`, payload);
};

export const getPaymentStatusv3Api = (payload) => {
  return api.post(`${API.PAYMENT.getPaymentStatusv3}`, payload);
};

export const checkEkycApi = (payload) => {
  return api.post(`${API.PAYMENT.saveEkyc}`, payload);
}

export const setCreateBillBulkApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillBulk}`,payload)
}