import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getListReferralApi = (payload) => {
  return api.get(`${API.REFERRAL.getListReferral}?page=1&pageSize=10&sortField=publishedAt&sortDirection=desc`);
};