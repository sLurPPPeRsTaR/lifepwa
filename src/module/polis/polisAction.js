import * as CONST from './polisConstant';

export const getPolicies = (payload) => ({
  type: CONST.GET_POLICIES,
  payload,
});
export const getPoliciesSuccess = (payload) => ({
  type: CONST.GET_POLICIES_SUCCESS,
  payload,
});
export const getPoliciesFailed = (payload) => ({
  type: CONST.GET_POLICIES_FAILED,
  payload,
});
export const getPoliciesClear = (payload) => ({
  type: CONST.GET_POLICIES_CLEAR,
  payload,
});

export const getInquiryPolicyNo = (payload) => ({
  type: CONST.GET_INQUIRY_POLICY_NO,
  payload,
});
export const getInquiryPolicyNoSuccess = (payload) => ({
  type: CONST.GET_INQUIRY_POLICY_NO_SUCCESS,
  payload,
});
export const getInquiryPolicyNoFailed = (payload) => ({
  type: CONST.GET_INQUIRY_POLICY_NO_FAILED,
  payload,
});
export const getInquiryPolicyNoClear = (payload) => ({
  type: CONST.GET_INQUIRY_POLICY_NO_CLEAR,
  payload,
});

export const setSelectedPolicy = (payload) => ({
  type: CONST.SET_SELECTED_POLICY,
  payload,
});
export const setSelectedPolicyClear = (payload) => ({
  type: CONST.SET_SELECTED_POLICY_CLEAR,
  payload,
});

export const getPolicyClaim = (payload) => ({
  type: CONST.GET_POLICY_CLAIM,
  payload,
});
export const getPolicyClaimSuccess = (payload) => ({
  type: CONST.GET_POLICY_CLAIM_SUCCESS,
  payload,
});
export const getPolicyClaimFailed = (payload) => ({
  type: CONST.GET_POLICY_CLAIM_FAILED,
  payload,
});
export const getPolicyClaimClear = (payload) => ({
  type: CONST.GET_POLICY_CLAIM_CLEAR,
  payload,
});

export const getPolicySelfData = (payload) => ({
  type: CONST.GET_POLICY_SELF_DATA,
  payload,
});
export const getPolicySelfDataSuccess = (payload) => ({
  type: CONST.GET_POLICY_SELF_DATA_SUCCESS,
  payload,
});
export const getPolicySelfDataFailed = (payload) => ({
  type: CONST.GET_POLICY_SELF_DATA_FAILED,
  payload,
});
export const getPolicySelfDataClear = (payload) => ({
  type: CONST.GET_POLICY_SELF_DATA_CLEAR,
  payload,
});

export const getPolicyDownload = (payload) => ({
  type: CONST.GET_POLICY_DOWNLOAD,
  payload,
});
export const getPolicyDownloadSuccess = (payload) => ({
  type: CONST.GET_POLICY_DOWNLOAD_SUCCESS,
  payload,
});
export const getPolicyDownloadFailed = (payload) => ({
  type: CONST.GET_POLICY_DOWNLOAD_FAILED,
  payload,
});
export const getPolicyDownloadClear = (payload) => ({
  type: CONST.GET_POLICY_DOWNLOAD_CLEAR,
  payload,
});

export const getPolicySummary = (payload) => ({
  type: CONST.GET_POLICY_SUMMARY,
  payload,
});
export const getPolicySummarySuccess = (payload) => ({
  type: CONST.GET_POLICY_SUMMARY_SUCCESS,
  payload,
});
export const getPolicySummaryFailed = (payload) => ({
  type: CONST.GET_POLICY_SUMMARY_FAILED,
  payload,
});
export const getPolicySummaryClear = (payload) => ({
  type: CONST.GET_POLICY_SUMMARY_CLEAR,
  payload,
});

export const getCheckLinkPolicyNo = (payload) => ({
  type: CONST.GET_CHECK_LINK_POLICY_NO,
  payload,
});
export const getCheckLinkPolicyNoSuccess = (payload) => ({
  type: CONST.GET_CHECK_LINK_POLICY_NO_SUCCESS,
  payload,
});
export const getCheckLinkPolicyNoFailed = (payload) => ({
  type: CONST.GET_CHECK_LINK_POLICY_NO_FAILED,
  payload,
});
export const getCheckLinkPolicyNoClear = (payload) => ({
  type: CONST.GET_CHECK_LINK_POLICY_NO_CLEAR,
  payload,
});

export const getPolicyBenefit = (payload) => ({
  type: CONST.GET_POLICY_BENEFIT,
  payload,
});
export const getPolicyBenefitSuccess = (payload) => ({
  type: CONST.GET_POLICY_BENEFIT_SUCCESS,
  payload,
});
export const getPolicyBenefitFailed = (payload) => ({
  type: CONST.GET_POLICY_BENEFIT_FAILED,
  payload,
});
export const getPolicyBenefitClear = (payload) => ({
  type: CONST.GET_POLICY_BENEFIT_CLEAR,
  payload,
});

export const getPolicyClaimDetail = (payload) => ({
  type: CONST.GET_POLICY_CLAIM_DETAIL,
  payload,
});
export const getPolicyClaimDetailSuccess = (payload) => ({
  type: CONST.GET_POLICY_CLAIM_DETAIL_SUCCESS,
  payload,
});
export const getPolicyClaimDetailFailed = (payload) => ({
  type: CONST.GET_POLICY_CLAIM_DETAIL_FAILED,
  payload,
});
export const getPolicyClaimDetailClear = (payload) => ({
  type: CONST.GET_POLICY_CLAIM_DETAIL_CLEAR,
  payload,
});

export const getPolicyFunds = (payload) => ({
  type: CONST.GET_POLICY_FUNDS,
  payload,
});
export const getPolicyFundsSuccess = (payload) => ({
  type: CONST.GET_POLICY_FUNDS_SUCCESS,
  payload,
});
export const getPolicyFundsFailed = (payload) => ({
  type: CONST.GET_POLICY_FUNDS_FAILED,
  payload,
});
export const getPolicyFundsClear = (payload) => ({
  type: CONST.GET_POLICY_FUNDS_CLEAR,
  payload,
});

