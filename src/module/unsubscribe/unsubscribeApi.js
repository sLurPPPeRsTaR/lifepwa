import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const setUnsubscribeNewsletterApi = (payload) => {
  return api.post(API.UNSUBSCRIBE.UnsubscribeNewletter, payload);
};
