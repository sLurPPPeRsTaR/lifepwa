import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const createBillingApi = (payload) => {
  return api.post(API.LIFECOVER.createBilling, payload);
};
