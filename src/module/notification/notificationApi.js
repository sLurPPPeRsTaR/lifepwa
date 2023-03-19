import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getNotifApi = (payload) => {
  return api.get(`${API.NOTIFICATION.getNotif}/${payload}`);
};

export const getNotifTransactionApi = (payload) => {
  return api.get(`${API.NOTIFICATION.getNotifTransaction}/${payload}`);
};

export const readNotifApi = (payload) => {
  return api.put(`${API.NOTIFICATION.readNotif}/${payload}`);
};
