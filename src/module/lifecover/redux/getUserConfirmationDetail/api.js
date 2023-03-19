import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getUserConfirmationDetailApi = (payload) => {
  return api.post(API.LIFECOVER.getUserConfirmationDetail, payload);
};
