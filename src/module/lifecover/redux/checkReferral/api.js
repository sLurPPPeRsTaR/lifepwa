import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const checkReferralApi = (payload) => {
  return api.post(API.EVENT.referralCodeValidation, payload);
};
