import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const setRegisterApi = (payload) => {
  return api.post(API.USER.user, payload);
};

export const setRegisterSocialApi = (payload) => {
  return api.post(API.USER.channel, payload);
};

export const getCheckPhoneEmail = (payload) => {
  return api.post(API.USER.checkPhoneEmail, payload);
};

export const getInquiryPolicyNoApi = (payload) => {
  return api.post(API.POLICY.inquiryPolicyNo, payload);
};

export const getCheckLinkPolicyNoApi = (payload) => {
  return api.post(API.POLICY.checkLinkPolicyNo, payload);
};
