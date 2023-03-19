import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const addBeneficiaryApi = (payload) => {
  return api.post(API.LIFECOVER.addBeneficiary, payload);
};
