import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getSubscriptionsApi = () => {
  return api.get(`${API.SUBS.getSubscriptions}?page=0&limit=100`);
};

export const getSubscriptionDetailApi = (payload) => {
  return api.get(`${API.SUBS.getSubscriptionDetail}/${payload}`);
};

export const getBillsApi = (payload) => {
  return api.get(`${API.SUBS.getBills}/${payload.policyNo}?page=${payload.page}&limit=${payload.limit}`);
};

export const setResubscribeApi = (payload) => {
  return api.post(API.SUBS.setCancelUnsubscribe, payload);
}

export const getSubsasedApi = (payload) => {
  return api.get(`${API.SUBS.getSubscriptionDetail}/${payload}`);
};

export const setUnsubscribeApi = (payload) => {
  return api.post(API.SUBS.setUnsubscribe, payload);
}

export const getSubscriptionsOtherApi = () => {
  return api.get(API.SUBS.getSubscribeForOther + '?page=0&limit=100');
};