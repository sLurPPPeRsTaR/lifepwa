import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getFaqClaimApi = (payload) => {
  return api.get(API.CLAIMPOLIS.getFaq, payload);
};

export const getFaqClaimDetailApi = (payload) => {
  return api.get(API.CLAIMPOLIS.getFaqDetail, payload);
};

export const getPolicyDigitalApi = (payload) => {
  return api.post(API.CLAIMPOLIS.getPolicyDigital, payload);
};

export const getDocumentMandatoryApi = (payload) => {
  return api.get(
    `${API.CLAIMPOLIS.getDocumentMandatory}/documentType?benefitType=${payload.benefitType}&productCode=${payload.productCode}`,
    payload,
  );
};

export const setUploadDocumentApi = (payload) => {
  return api.post(
    `${API.CLAIMPOLIS.document}/upload?policyNumber=${payload.data.policyNumber}`,
    payload.data.data,
  );
};

export const setSubmitDocumentApi = (payload) => {
  return api.post(API.CLAIMPOLIS.document, payload);
};

export const getRsApi = (payload) => {
  return api.get(API.CLAIMPOLIS.getRs, payload);
};

export const getListTypeBenefitApi = (payload) => {
  return api.post(API.CLAIMPOLIS.getListTypeBenefit, payload);
};

export const setPartialUploadDocumentApi = (payload) => {
  return api.post(
    `${API.CLAIMPOLIS.document}/upload-partial?policyNumber=${payload.policyNumber}`,
    payload.data,
  );
};

export const getPartialUploadDocumentApi = (payload) => {
  return api.get(
    `${API.CLAIMPOLIS.document}/upload-partial?path=${payload.documentKey}`,
    payload,
  );
};
