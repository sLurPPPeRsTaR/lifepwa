import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const setLoginSocialApi = (payload) => {
  return api.post(API.AUTH.loginChannel, payload);
};
