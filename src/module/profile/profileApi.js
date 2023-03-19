import { encryptMpin } from '@cp-util/common';
import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';
import FormData from 'form-data';

export const getProfileDeviceApi = (payload) => {
  return api.get(API.USER.session, payload);
};
export const setProfileDeviceApi = (payload) => {
  return api.delete(`${API.USER.session}/${payload.sessionId}`);
};
export const setCreatePinApi = (payload) => {
  const resultEncrypt = encryptMpin(payload?.pin, payload?.pin, 'CREATE_PIN');
  return api.post(API.PIN.pin, resultEncrypt);
};
export const setChangePinApi = (payload) => {
  const resultEncrypt = encryptMpin(payload, payload?.oldPin, 'CHANGE_PIN');
  return api.put(API.PIN.pin, resultEncrypt);
};
export const getVerifyPinApi = (payload) => {
  const resultEncrypt = encryptMpin(payload, payload?.pin, 'VERIFY_PIN');
  return api.post(API.PIN.verify, resultEncrypt);
};
export const setPhoneNumberApi = (payload) => {
  return api.post(API.USER.changeMobilePhoneNumber, payload);
};
export const setEmailApi = (payload) => {
  return api.post(API.USER.changeEmail, payload);
};
export const setUploadProfileApi = (payload, onUploadProgress) => {
  const sendData = new FormData();
  sendData.append('fileName', payload?.name);
  sendData.append('file', payload);
  sendData.append('isPublic', 'false');
  sendData.append('directory', 'photos');
  return api.post(API.USER.photo, sendData, {
    onUploadProgress,
    ...{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
    },
  });
};
export const setThumbnailApi = (payload) => {
  return api.post(API.USER.thumbnail, payload);
};
export const setUserFotoApi = (payload) => {
  return api.put(API.USER.user, payload);
};
export const setDeleteFotoProfileApi = (payload) => {
  return api.delete(`${API.USER.photo}/${payload.photoKey}`);
};
export const setDeleteUserTableApi = () => {
  return api.delete(API.USER.photo);
};
export const setCheckEmail = (payload) => {
  return api.post(API.USER.checkEmail, payload);
};
export const getCSInfoApi = () => {
  return api.get(API.META.getCSInfo);
};
export const getPersonalDataProvinceApi = (payload) => {
  return api.get(`v1/meta/getProvinsi/${payload.lang}`);
};
export const getPersonalDataCityApi = (payload) => {
  return api.get(`v1/meta/getCityById/${payload.provinceCode}/${payload.lang}`);
};
export const getPersonalDataDistrictApi = (payload) => {
  return api.get(
    `/v1/meta/getDistrictById/${payload.cityCode}/${payload.lang}`,
  );
};
export const getPersonalDataSubDistrictApi = (payload) => {
  return api.get(
    `/v1/meta/getSubDistrictById/${payload.districtCode}/${payload.lang}`,
  );
};
export const getUserIdentityApi = (payload) => {
  return api.post(API.USER.identity, payload);
};

// OTP
export const setProfileRequestOtpApi = (payload) => {
  return api.post(API.AUTH.requestOtpByToken, payload);
};

// OTP NO LOGIN
export const setProfileRequestOtpNoLoginApi = (payload) => {
  return api.post(API.AUTH.requestOtp, payload);
};

// VERIFY OTP
export const setProfileVerifyOtpApi = (payload) => {
  return api.post(API.AUTH.verifyOtp, payload);
};

// VERIFY OTP NO LOGIN
export const setProfileVerifyOtpNoLoginApi = (payload) => {
  return api.post(API.AUTH.verifyOtpNoLogin, payload);
};

// FAQ
export const setProfileFaqApi = (payload) => {
  return api.post(API.USER.faq, payload);
};

// NOLOGINFAQ
export const setProfileNoLoginFaqApi = (payload) => {
  return api.post(API.USER.noLoginFaq, payload);
};
export const setPersonalDataApi = (payload) => {
  return api.put(API.USER.user, payload);
};

export const getSubscriptionsApi = () => {
  return api.get(`${API.SUBS.getSubscriptions}?page=0&limit=100`);
};

export const getSubscriptionDetailApi = (payload) => {
  return api.get(`${API.SUBS.getSubscriptionDetail}/${payload}`);
};

export const setResubscribeApi = (payload) => {
  return api.post(API.SUBS.setCancelUnsubscribe, payload);
};
// OTP
export const setDeleteAccountRequestOtpApi = (payload) => {
  return api.post(API.AUTH.requestOtpByToken, payload);
};

// VERIFY OTP
export const setDeleteAccountVerifyOtpApi = (payload) => {
  return api.post(API.AUTH.verifyOtp, payload);
};

export const getBillsApi = (payload) => {
  return api.get(
    `${API.SUBS.getBills}/${payload.policyNo}?page=${payload.page}&limit=${payload.limit}`,
  );
};

// ADDRESS LIST
export const getAddressListApi = (payload) => {
  return api.get(API.USER.address, payload);
};

// SAVE ADDRESS
export const setSaveAddressApi = (payload) => {
  return api.post(API.USER.address, payload);
};

// UPDATE ADDRESS
export const setUpdateAddressApi = (payload) => {
  return api.put(API.USER.address, payload);
};

// DELETE ADDRESS
export const setDeleteAddressApi = (payload) => {
  return api.delete(`${API.USER.address}/${payload.id}`);
};

// userParty
export const getProfileUserPartyApi = () => {
  return api.get(API.CUSTOMER.PRODUCT.userParty);
};

// GET REFERRAL
export const getProfileReferralApi = (payload) => {
  return api.get(API.USER.referral, payload);
};

// GET CONTACT
export const getContactApi = (payload) => {
  return api.get(`${API.USER.getContact}?language=${payload.lang}`,);
};
