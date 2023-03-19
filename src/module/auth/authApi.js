import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';
import { encryptMpin } from '@cp-util/common';

export const setClearAuthApi = (payload) => {
  const { ...sendData } = payload;
  return api.post(API.AUTH.logout, {
    ...sendData,
  });
};

export const setRequestOtpApi = (payload) => {
  return api.post(API.AUTH.requestOtp, {
    id: payload?.id,
    action: payload?.action,
    isPWA: payload?.isPWA,
  });
};

export const setLoginApi = (payload) => {
  return api.post(API.AUTH.login, payload);
};

export const setLogoutApi = (payload) => {
  return api.post(API.AUTH.logout, payload);
};

export const setResetPasswordApi = (payload) => {
  return api.post(API.AUTH.resetSandi, payload);
};

export const setChangePassApi = (payload) => {
  return api.post(API.AUTH.changeSandi, payload);
};

export const setPersonalDataApi = (payload) => {
  return api.put(API.USER.user, payload);
};

export const getPersonalDataApi = (payload) => {
  return api.get(API.USER.user, payload);
};

export const setDeleteAccountApi = (payload) => {
  return api.delete(API.AUTH.delete, payload);
};

export const getCheckIssuedPolicyApi = (payload) => {
  return api.get(API.POLICY.checkIssuedPolicy, payload);
};

export const getUserFlagApi = (payload) => {
  return api.get(API.USER.userFlag, payload);
};

export const setAuthVerifyPINApi = (payload) => {
  const resultEncrypt = encryptMpin(payload, payload?.pin, 'VERIFY_PIN');

  return api.post(API.PIN.verify, resultEncrypt);
};

export const setAuthRequestOTPApi = (payload) => {
  return api.post(API.AUTH.requestOtpByToken, payload);
};

export const setAuthVerifyOTPApi = (payload) => {
  return api.post(API.AUTH.verifyOtp, payload);
};

export const setAuthCreatePINApi = (payload) => {
  const resultEncrypt = encryptMpin(payload?.pin, payload?.pin, 'CREATE_PIN');
  return api.post(API.PIN.pin, resultEncrypt);
};
