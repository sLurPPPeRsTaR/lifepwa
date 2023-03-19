import * as CONST from '@cp-module/polis/polisConstant';
import * as STATE from '@cp-module/polis/polisInitialState';

const polisInitialState = {
  ...STATE.getPoliciesInitialState,
  ...STATE.getInquiryPolicyNoInitialState,
  ...STATE.setSelectedPolicyInitialState,
  ...STATE.getPolicyClaimInitialState,
  ...STATE.getPolicySelfDataInitialState,
  ...STATE.getPolicyDownloadInitialState,
  ...STATE.getPolicySummaryInitialState,
  ...STATE.getCheckLinkPolicyNoInitialState,
  ...STATE.getPolicyBenefitInitialState,
  ...STATE.getPolicyClaimDetailInitialState,
  ...STATE.getPolicyFundsInitialState,
  action: '',
};

export const polisReducer = (state = polisInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.GET_POLICIES]: () => ({
      ...state,
      getPoliciesParam: payload,
      getPoliciesFetch: true,
      action: type,
    }),
    [CONST.GET_POLICIES_SUCCESS]: () => ({
      ...state,
      getPoliciesResponse: payload,
      getPoliciesFetch: false,
      action: type,
    }),
    [CONST.GET_POLICIES_FAILED]: () => ({
      ...state,
      getPoliciesError: payload,
      getPoliciesFetch: false,
      action: type,
    }),
    [CONST.GET_POLICIES_CLEAR]: () => ({
      ...state,
      getPoliciesParam: polisInitialState.getPoliciesParam,
      getPoliciesResponse: polisInitialState.getPoliciesResponse,
      getPoliciesError: polisInitialState.getPoliciesError,
      action: type,
    }),

    [CONST.GET_INQUIRY_POLICY_NO]: () => ({
      ...state,
      getInquiryPolicyNoParam: payload,
      getInquiryPolicyNoFetch: true,
      action: type,
    }),
    [CONST.GET_INQUIRY_POLICY_NO_SUCCESS]: () => ({
      ...state,
      getInquiryPolicyNoResponse: payload,
      getInquiryPolicyNoFetch: false,
      action: type,
    }),
    [CONST.GET_INQUIRY_POLICY_NO_FAILED]: () => ({
      ...state,
      getInquiryPolicyNoFailed: payload,
      getInquiryPolicyNoFetch: false,
      action: type,
    }),
    [CONST.GET_INQUIRY_POLICY_NO_CLEAR]: () => ({
      ...state,
      getInquiryPolicyNoFailed: polisInitialState.getInquiryPolicyNoFailed,
      getInquiryPolicyNoFetch: polisInitialState.getInquiryPolicyNoFetch,
      action: type,
    }),

    [CONST.SET_SELECTED_POLICY]: () => ({
      ...state,
      selectedPolicy: payload,
    }),
    [CONST.SET_SELECTED_POLICY_CLEAR]: () => ({
      ...state,
      ...STATE.setSelectedPolicyInitialState,
    }),

    [CONST.GET_POLICY_CLAIM]: () => ({
      ...state,
      getPolicyClaimParam: payload,
      getPolicyClaimFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_SUCCESS]: () => ({
      ...state,
      getPolicyClaimResponse: payload,
      getPolicyClaimFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_FAILED]: () => ({
      ...state,
      getPolicyClaimFailed: payload,
      getPolicyClaimFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyClaimInitialState,
      action: type,
    }),

    [CONST.GET_POLICY_SELF_DATA]: () => ({
      ...state,
      getPolicySelfDataParam: payload,
      getPolicySelfDataFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_SELF_DATA_SUCCESS]: () => ({
      ...state,
      getPolicySelfDataResponse: payload,
      getPolicySelfDataFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_SELF_DATA_FAILED]: () => ({
      ...state,
      getPolicySelfDataFailed: payload,
      getPolicySelfDataFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_SELF_DATA_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicySelfDataInitialState,
      action: type,
    }),

    [CONST.GET_POLICY_DOWNLOAD]: () => ({
      ...state,
      getPolicyDownloadParam: payload,
      getPolicyDownloadFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_DOWNLOAD_SUCCESS]: () => ({
      ...state,
      getPolicyDownloadResponse: payload,
      getPolicyDownloadFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_DOWNLOAD_FAILED]: () => ({
      ...state,
      getPolicyDownloadFailed: payload,
      getPolicyDownloadFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_DOWNLOAD_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyDownloadInitialState,
      action: type,
    }),

    [CONST.GET_POLICY_SUMMARY]: () => ({
      ...state,
      getPolicySummaryParam: payload,
      getPolicySummaryFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_SUMMARY_SUCCESS]: () => ({
      ...state,
      getPolicySummaryResponse: payload,
      getPolicySummaryFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_SUMMARY_FAILED]: () => ({
      ...state,
      getPolicySummaryFailed: payload,
      getPolicySummaryFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_SUMMARY_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicySummaryInitialState,
      action: type,
    }),

    [CONST.GET_CHECK_LINK_POLICY_NO]: () => ({
      ...state,
      getCheckLinkPolicyNoParam: payload,
      getCheckLinkPolicyNoFetch: true,
      action: type,
    }),
    [CONST.GET_CHECK_LINK_POLICY_NO_SUCCESS]: () => ({
      ...state,
      getCheckLinkPolicyNoResponse: payload,
      getCheckLinkPolicyNoFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_LINK_POLICY_NO_FAILED]: () => ({
      ...state,
      getCheckLinkPolicyNoFailed: payload,
      getCheckLinkPolicyNoFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_LINK_POLICY_NO_CLEAR]: () => ({
      ...state,
      ...STATE.getCheckLinkPolicyNoInitialState,
      action: type,
    }),

    // Benefit
    [CONST.GET_POLICY_BENEFIT]: () => ({
      ...state,
      getPolicyBenefitParam: payload,
      getPolicyBenefitFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_BENEFIT_SUCCESS]: () => ({
      ...state,
      getPolicyBenefitResponse: payload,
      getPolicyBenefitFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_BENEFIT_FAILED]: () => ({
      ...state,
      getPolicyBenefitFailed: payload,
      getPolicyBenefitFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_BENEFIT_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyBenefitInitialState,
      action: type,
    }),
    // Claim Detail
    [CONST.GET_POLICY_CLAIM_DETAIL]: () => ({
      ...state,
      getPolicyClaimDetailParam: payload,
      getPolicyClaimDetailFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_DETAIL_SUCCESS]: () => ({
      ...state,
      getPolicyClaimDetailResponse: payload,
      getPolicyClaimDetailFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_DETAIL_FAILED]: () => ({
      ...state,
      getPolicyClaimDetailFailed: payload,
      getPolicyClaimDetailFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_DETAIL_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyClaimDetailInitialState,
      action: type,
    }),
    // Funds
    [CONST.GET_POLICY_FUNDS]: () => ({
      ...state,
      getPolicyFundsParam: payload,
      getPolicyFundsFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_FUNDS_SUCCESS]: () => ({
      ...state,
      getPolicyFundsResponse: payload,
      getPolicyFundsFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_FUNDS_FAILED]: () => ({
      ...state,
      getPolicyFundsFailed: payload,
      getPolicyFundsFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_FUNDS_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyFundsInitialState,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
