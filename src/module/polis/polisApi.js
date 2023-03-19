import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';
import FormData from 'form-data';

export const getPoliciesApi = (payload) => {
  return api.get(API.POLICY.policy, payload);
};

export const getInquiryPolicyNoApi = (payload) => {
  return api.post(API.POLICY.inquiryPolicyNo, payload);
};

export const getPolicyClaimApi = (payload) => {
  return api.get(
    `${encodeURI(
      `${API.POLICY.claim}?policyNo=${payload?.policyNo}&productCode=`,
    )}${encodeURIComponent(payload?.productCode)}${encodeURI(
      `&source=${payload?.source}&limit=${payload?.limit}&page=${payload?.page}`,
    )}`,
    payload,
  );
};

export const getPolicySelfDataApi = (payload) => {
  return api.get(
    `${encodeURI(
      `${API.POLICY.selfData}?policyNo=${payload?.policyNo}&productCode=`,
    )}${encodeURIComponent(payload?.productCode)}${encodeURI(
      `&source=${payload?.source}`,
    )}`,
    payload,
  );
};

export const getPolicyDownloadApi = (payload) => {
  return api.get(
    `${encodeURI(
      `${API.POLICY.getDownload}/privateDocument?policyNo=${payload?.policyNo}&productCode=`,
    )}${encodeURIComponent(payload?.productCode)}${encodeURI(
      `&source=${payload?.source}`,
    )}`,
    payload,
  );
};

export const getPolicySummaryApi = (payload) => {
  return api.get(
    `${encodeURI(
      `${API.POLICY.getSummary}?policyNo=${payload?.policyNo}&productCode=`,
    )}${encodeURIComponent(payload?.productCode)}${encodeURI(
      `&source=${payload?.source}`,
    )}`,
    payload,
  );
};

export const getCheckLinkPolicyNoApi = (payload) => {
  return api.post(API.POLICY.checkLinkPolicyNo, payload);
};

export const getPolicyBenefitApi = (payload) => {
  return api.get(
    `${encodeURI(
      `${API.POLICY.benefit}?policyNo=${payload?.policyNo}&productCode=`,
    )}${encodeURIComponent(payload?.productCode)}${encodeURI(
      `&source=${payload?.source}`,
    )}`,
    payload,
  );
};

export const getPolicyClaimDetailApi = (payload) => {
  return api.get(
    `${encodeURI(
      `${API.POLICY.getDetailKlaim}?policyNo=${payload?.policyNo}&productCode=`,
    )}${encodeURIComponent(payload?.productCode)}${encodeURI(
      `&source=${payload?.source}&claimNo=${payload?.claimNo}`,
    )}`,
    payload,
  );
};

export const getPolicyFundsApi = (payload) => {
  let { policyNo, productCode, source } = payload;
  policyNo = encodeURIComponent(policyNo);
  productCode = encodeURIComponent(productCode);
  source = encodeURIComponent(source);
  return api.get(
    `${API.POLICY.funds}?policyNo=${policyNo}&productCode=${productCode}&source=${source}`,
  );
};
