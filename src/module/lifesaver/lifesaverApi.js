import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';
import axios from 'axios';

export const getProductApi = (payload) => {
  return api.get(
    `${API.LIFESAVER.getProduct}?productCode=${payload?.productCode}&planCode=${payload?.planCode}`,
  );
};

export const getListRsApi = (payload) => {
  const { search, page, limit, type } = payload;
  return api.get(
    `${API.LIFESAVER.getListRs}?search=${search}&page=${page}&limit=${limit}${
      type !== 'ALL' ? `&type=${type}` : ''
    }`,
  );
};

export const getPersonalRiplayApi = () => {
  return api.get(API.LIFESAVER.getPersonalRiplay, {
    responseType: 'blob',
  });
};

export const setSubmissionApi = (payload) => {
  return api.post(API.LIFESAVER.setSubmission, payload);
};

export const setSubmissionApiOld = (payload) => {
  return api.post(API.LIFESAVER.setSubmissionOld, payload);
};

export const getCurrentSubsApi = () => {
  return api.get(API.LIFESAVER.getCurrentSubs);
};

export const getInvitationListFriendApi = (payload) => {
  return api.post(API.REFERRAL.getInvitationListFriend, payload);
};

export const getIsUserEligibleBajoRunApi = (payload) => {
  return api.get(API.REFERRAL.getIsUserEligibleBajoRun, payload);
};

export const setWaitingApi = () => {
  return api.post(API.LIFESAVER.setWaiting);
};

export const getBajoRunProductApi = () => {
  return api.get(API.LIFESAVER.getBajoRunProduct);
};

export const getPendingInvitesApi = (payload) => {
  return api.post(API.LIFESAVER.getPendingInvites, payload);
};

export const getCampaignApi = (payload = '') => {
  return api.get(`${API.LIFESAVER.getCampaign}?eventCode=${payload}`);
};

export const getIsUserEligibleApi = (payload = '') => {
  return api.get(`${API.REFERRAL.getIsUserEligible}?channel=${payload}`);
};

export const getCheckMaxInviteApi = () => {
  return api.post(API.REFERRAL.getCheckMaxInvite);
};

export const getEligibleLiteApi = () => {
  return api.get(API.LIFESAVER.getEligibleLite);
};

export const getProductLifetagApi = (payload) => {
  return api.get(API.LIFESAVER.getProductLifetag + payload);
};

export const getEligiblePosApi = () => {
  return api.get(API.LIFESAVER.getEligiblePos);
};

export const getTotalClaimApi = () => {
  return api.post(API.LIFESAVER.getTotalClaim);
};

export const setSubmissionForOtherApi = (payload) => {
  return api.post(API.LIFESAVER.setSubmissionForOther, payload);
};

export const getIDCardDataOCRApi = (payload) => {
  const form = new FormData();
  form.append('file', payload.file);
  form.append('fileName', 'ktp1.jpg');
  form.append('category', 'E_KYC_FOR_OTHER');
  return api.post("/v1/eKyc/idCardOther", form);
};

export const getBulkReceiverApi = () => {
  return api.get(API.LIFESAVER.getBulkReceiver);
};

export const getRelationTypeApi = () => {
  return api.get(API.LIFESAVER.getRelationType);
};

export const getReceiverStatusApi = () => {
  return api.get(API.LIFESAVER.getReceiverStatus);
};

export const getSubscribeForOtherApi = () => {
  return api.get(API.LIFESAVER.getSubscribeForOther + '?page=0&limit=100');
};
