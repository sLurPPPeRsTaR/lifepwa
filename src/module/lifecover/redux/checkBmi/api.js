import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const checkBmiApi = (payload) => {
  return api.post(API.LIFECOVER.checkBmi, payload);
};
