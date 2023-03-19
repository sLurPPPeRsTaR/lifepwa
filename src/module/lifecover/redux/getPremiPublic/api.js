import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getPremiPublicApi = (payload) => {
  return api.post(API.LIFECOVER.getPremiPublic, payload);
};
