import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getBeneficiaryApi = (payload) => {
  return api.post(API.LIFECOVER.beneficiary, payload);
};
