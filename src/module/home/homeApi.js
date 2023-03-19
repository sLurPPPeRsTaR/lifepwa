import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getPolicyApi = (payload) => {
  return api.post(API.POLICY.inquiry, payload);
};

export const setLinkPolicyApi = (payload) => {
  return api.post(API.POLICY.link, payload);
};

export const getPoliciesApi = (payload) => {
  return api.get(API.POLICY.policy, payload);
};

export const getCheckPolisApi = (payload) => {
  return api.post(API.POLICY.checkpolis, payload);
};
export const getNotifCountApi = () => {
  return api.get(`${API.NOTIFICATION.getNotifCount}`);
};
export const getWidgetManfaatApi = () => {
  return api.get(`${API.POLICY.getWidgetManfaat}`);
};

export const getProductPricesFitApi = () => {
  return api.get(`${API.LANDING.getFitPrices}`);
};

export const getProductPricesFitPlusApi = () => {
  return api.get(`${API.LANDING.getFitPlusPrices}`);
};

export const getIsUserEligibleApi = (payload) => {
  return api.get(API.REFERRAL.getIsUserEligible, payload);
};

export const getProductBannerApi = (payload) => {
  return api.get(`${API.LANDING.getProductBanner}?filterValue=${payload.position}&language=${payload.lang}`);
};

export const getPolicyWidgetHomeApi = (payload) => {
  return api.get(API.POLICY.policyWidgetHome, payload);
};

export const getPolicyWidgetHomePublicApi = () => {
  return api.get(API.POLICY.policyWidgetHomePublic);
};

export const setCallTimeApi = () => {
  return api.post(API.LIFESAVER.setCallTime);
};

export const getPendingInvitesApi = (payload) => {
  return api.post(API.LIFESAVER.getPendingInvites, payload);
};

export const getPolicyProposalApi = (payload) => {
  return api.get(
    `${API.POLICY.getPolicyProposal}?proposalStatus=WAITING_FOR_PAYMENT`,
    payload
  );
};

export const getFaqContentApi = (payload) => {
  return api.get(`${API.LANDING.getFaqContent}?page=1&pageSize=25&filterField=[needFor]&filterValue=${payload.position}&sortField=publishedAt&sortDirection=desc&lang=${payload.lang}`);
};