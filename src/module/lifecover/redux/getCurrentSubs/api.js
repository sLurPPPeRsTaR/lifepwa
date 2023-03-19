import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getCurrentSubsApi = (payload) => {
  return api.get(API.LIFECOVER.getCurrentSubs, payload);
};
