import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getPremiPrivateApi = (payload) => {
  return api.post(API.LIFECOVER.getPremiPrivate, payload);
};
