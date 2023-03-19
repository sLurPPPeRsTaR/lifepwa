import _ from 'lodash';
import * as STATE from '@cp-module/home/homeInitialState';
import * as CONST from '@cp-module/home/homeConstant';
import { SET_CLEAR_AUTH } from '@cp-module/auth/authConstant';

const homeInitialState = {
  ...STATE.getPolicyInitialState,
  ...STATE.getPoliciesInitialState,
  ...STATE.setLinkPolicyInitialState,
  ...STATE.getCheckPolisInitialState,
  ...STATE.getNotifCountInitialState,
  ...STATE.getWidgetManfaatInitialState,
  ...STATE.getProductPricesFitState,
  ...STATE.getProductPricesFitPlusState,
  ...STATE.getProductBannerState,
  ...STATE.getPolicyWidgetHomeInitialState,
  ...STATE.getPolicyWidgetHomePublicInitialState,
  ...STATE.setCallTimeInitialState,
  ...STATE.getPendingInvitesState,
  ...STATE.getPolicyProposalInitialState,
  ...STATE.setTemporaryHomeStateInitialState,
  ...STATE.getWidgetImageState,
  ...STATE.getFaqContentInitialState,
  ...STATE.getImportantForYouImageState,
  action: '',
};

export const homeReducer = (state = homeInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(homeInitialState),
    }),
    [CONST.GET_POLICY]: () => ({
      ...state,
      setResendPolicyOtp: payload.setResendPolicyOtp,
      getPolicyParam: { ...payload, setResendPolicyOtp: undefined },
      getPolicyFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_SUCCESS]: () => ({
      ...state,
      getPolicyResponse: payload,
      getPolicyFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_FAILED]: () => ({
      ...state,
      getPolicyError: payload,
      getPolicyFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_CLEAR]: () => ({
      ...state,
      setResendPolicyOtp: homeInitialState.setResendPolicyOtp,
      getPolicyResponse: homeInitialState.getPolicyResponse,
      getPolicyError: homeInitialState.getPolicyError,
      action: type,
    }),

    [CONST.SET_LINK_POLICY]: () => ({
      ...state,
      setLinkPolicyParam: payload,
      setLinkPolicyFetch: true,
      action: type,
    }),
    [CONST.SET_LINK_POLICY_SUCCESS]: () => ({
      ...state,
      setLinkPolicyResponse: payload,
      setLinkPolicyFetch: false,
      action: type,
    }),
    [CONST.SET_LINK_POLICY_FAILED]: () => ({
      ...state,
      setLinkPolicyError: payload,
      setLinkPolicyFetch: false,
      action: type,
    }),
    [CONST.SET_LINK_POLICY_CLEAR]: () => ({
      ...state,
      setLinkPolicyParam: homeInitialState.setLinkPolicyParam,
      setLinkPolicyResponse: homeInitialState.setLinkPolicyResponse,
      setLinkPolicyError: homeInitialState.setLinkPolicyError,
      action: type,
    }),

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
      getPoliciesParam: homeInitialState.getPoliciesParam,
      getPoliciesResponse: homeInitialState.getPoliciesResponse,
      getPoliciesError: homeInitialState.getPoliciesError,
      action: type,
    }),

    [CONST.GET_CHECK_POLIS]: () => ({
      ...state,
      setResendPolicyOtp: payload.setResendPolicyOtp,
      getCheckPolisParam: { ...payload, setResendPolicyOtp: undefined },
      action: type,
    }),
    [CONST.GET_CHECK_POLIS_SUCCESS]: () => ({
      ...state,
      getCheckPolisResponse: payload,
      getCheckPolisFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_POLIS_FAILED]: () => ({
      ...state,
      getCheckPolisError: payload,
      getCheckPolisFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_POLIS_CLEAR]: () => ({
      ...state,
      setResendPolicyOtp: homeInitialState.setResendPolicyOtp,
      getCheckPolisResponse: homeInitialState.getCheckPolisResponse,
      getCheckPolisError: homeInitialState.getCheckPolisError,
      action: type,
    }),
    [CONST.GET_NOTIF_COUNT]: () => ({
      ...state,
      getNotifCountParam: { ...payload },
      getNotifCountFetch: true,
      action: type,
    }),
    [CONST.GET_NOTIF_COUNT_SUCCESS]: () => ({
      ...state,
      getNotifCountResponse: payload,
      getNotifCountFetch: false,
      action: type,
    }),
    [CONST.GET_NOTIF_COUNT_FAILED]: () => ({
      ...state,
      getNotifCountError: payload,
      getNotifCountFetch: false,
      action: type,
    }),
    [CONST.GET_NOTIF_COUNT_CLEAR]: () => ({
      ...state,
      getNotifCountResponse: homeInitialState.getNotifCountResponse,
      getNotifCountError: homeInitialState.getNotifCountError,
      action: type,
    }),
    [CONST.GET_WIDGET_MANFAAT]: () => ({
      ...state,
      getWidgetManfaatParam: { ...payload },
      getWidgetManfaatFetch: true,
      action: type,
    }),
    [CONST.GET_WIDGET_MANFAAT_SUCCESS]: () => ({
      ...state,
      getWidgetManfaatResponse: payload,
      getWidgetManfaatFetch: false,
      action: type,
    }),
    [CONST.GET_WIDGET_MANFAAT_FAILED]: () => ({
      ...state,
      getWidgetManfaatError: payload,
      getWidgetManfaatFetch: false,
      action: type,
    }),
    [CONST.GET_WIDGET_MANFAAT_CLEAR]: () => ({
      ...state,
      getWidgetManfaatResponse: homeInitialState.getWidgetManfaatResponse,
      getWidgetManfaatError: homeInitialState.getWidgetManfaatError,
      action: type,
    }),

    [CONST.GET_PRODUCT_PRICES_FIT]: () => ({
      ...state,
      getProductPricesFitParam: payload,
      getProductPricesFitFetch: true,
      action: type,
    }),
    [CONST.GET_PRODUCT_PRICES_FIT_SUCCESS]: () => ({
      ...state,
      getProductPricesFitResponse: payload,
      getProductPricesFitFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_PRICES_FIT_FAILED]: () => ({
      ...state,
      getProductPricesFitError: payload,
      getProductPricesFitFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_PRICES_FIT_CLEAR]: () => ({
      ...state,
      getProductPricesFitResponse: homeInitialState.getProductPricesFitResponse,
      getProductPricesFitError: homeInitialState.getProductPricesFitError,
      action: type,
    }),

    [CONST.GET_PRODUCT_PRICES_FITPLUS]: () => ({
      ...state,
      getProductPricesFitPlusParam: payload,
      getProductPricesFitPlusFetch: true,
      action: type,
    }),
    [CONST.GET_PRODUCT_PRICES_FITPLUS_SUCCESS]: () => ({
      ...state,
      getProductPricesFitPlusResponse: payload,
      getProductPricesFitPlusFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_PRICES_FITPLUS_FAILED]: () => ({
      ...state,
      getProductPricesFitPlusError: payload,
      getProductPricesFitPlusFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_PRICES_FITPLUS_CLEAR]: () => ({
      ...state,
      getProductPricesFitPlusResponse:
        homeInitialState.getProductPricesFitPlusResponse,
      getProductPricesFitPlusError:
        homeInitialState.getProductPricesFitPlusError,
      action: type,
    }),

    [CONST.GET_PRODUCT_BANNER]: () => ({
      ...state,
      getProductBannerParam: payload,
      getProductBannerFetch: true,
      action: type,
    }),
    [CONST.GET_PRODUCT_BANNER_SUCCESS]: () => ({
      ...state,
      getProductBannerResponse: payload.data,
      getProductBannerFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_BANNER_FAILED]: () => ({
      ...state,
      getProductBannerError: payload,
      getProductBannerFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_BANNER_CLEAR]: () => ({
      ...state,
      getProductBannerResponse: homeInitialState.getProductBannerResponse,
      getProductBannerError: homeInitialState.getProductBannerError,
      action: type,
    }),

    [CONST.GET_IS_USER_ELIGIBLE]: () => ({
      ...state,
      getIsUserEligibleParam: payload,
      getIsUserEligibleFetch: true,
      action: type,
    }),
    [CONST.GET_IS_USER_ELIGIBLE_SUCCESS]: () => ({
      ...state,
      getIsUserEligibleResponse: payload,
      getIsUserEligibleFetch: false,
      action: type,
    }),
    [CONST.GET_IS_USER_ELIGIBLE_FAILED]: () => ({
      ...state,
      getIsUserEligibleError: payload,
      getIsUserEligibleFetch: false,
      action: type,
    }),
    [CONST.GET_IS_USER_ELIGIBLE_CLEAR]: () => ({
      ...state,
      getIsUserEligibleResponse: homeInitialState.getIsUserEligibleResponse,
      getIsUserEligibleError: homeInitialState.getIsUserEligibleError,
      action: type,
    }),

    [CONST.GET_POLICY_WIDGET_HOME]: () => ({
      ...state,
      getPolicyWidgetHomeParam: payload,
      getPolicyWidgetHomeFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_SUCCESS]: () => ({
      ...state,
      getPolicyWidgetHomeResponse: payload,
      getPolicyWidgetHomeFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_FAILED]: () => ({
      ...state,
      getPolicyWidgetHomeError: payload,
      getPolicyWidgetHomeFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyWidgetHomeInitialState,
      action: type,
    }),
    
    [CONST.GET_POLICY_WIDGET_HOME_PUBLIC]: () => ({
      ...state,
      getPolicyWidgetHomePublicParam: payload,
      getPolicyWidgetHomePublicFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_PUBLIC_SUCCESS]: () => ({
      ...state,
      getPolicyWidgetHomePublicResponse: payload,
      getPolicyWidgetHomePublicFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_PUBLIC_FAILED]: () => ({
      ...state,
      getPolicyWidgetHomePublicError: payload,
      getPolicyWidgetHomePublicFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_PUBLIC_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyWidgetHomePublicInitialState,
      action: type,
    }),

    [CONST.SET_CALL_TIME]: () => ({
      ...state,
      setCallTimeParam: payload,
      setCallTimeFetch: true,
      action: type,
    }),
    [CONST.SET_CALL_TIME_SUCCESS]: () => ({
      ...state,
      setCallTimeResponse: payload,
      setCallTimeFetch: false,
      action: type,
    }),
    [CONST.SET_CALL_TIME_FAILED]: () => ({
      ...state,
      setCallTimeError: payload,
      setCallTimeFetch: false,
      action: type,
    }),

    // get pending invites
    [CONST.GET_PENDING_INVITES]: () => ({
      ...state,
      getPendingInvitesStateParam: payload,
      getPendingInvitesStateFetch: true,
      action: type,
    }),
    [CONST.GET_PENDING_INVITES_SUCCESS]: () => ({
      ...state,
      getPendingInvitesStateResponse: payload,
      getPendingInvitesStateFetch: false,
      action: type,
    }),
    [CONST.GET_PENDING_INVITES_FAILED]: () => ({
      ...state,
      getPendingInvitesStateError: payload,
      getPendingInvitesStateFetch: false,
      action: type,
    }),
    [CONST.GET_PENDING_INVITES_CLEAR]: () => ({
      ...state,
      getPendingInvitesStateResponse:
        invitationInitialState.getPendingInvitesStateResponse,
      getPendingInvitesStateError:
        invitationInitialState.getPendingInvitesStateError,
      action: type,
    }),

    [CONST.GET_POLICY_PROPOSAL]: () => ({
      ...state,
      getPolicyProposalParam: payload,
      getPolicyProposalFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_PROPOSAL_SUCCESS]: () => ({
      ...state,
      getPolicyProposalResponse: payload,
      getPolicyProposalFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_PROPOSAL_FAILED]: () => ({
      ...state,
      getPolicyProposalError: payload,
      getPolicyProposalFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_PROPOSAL_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyProposalInitialState,
      action: type,
    }),
    [CONST.SET_TEMPORARY_HOME_STATE]: () => ({
      ...state,
      ...payload,
      action: type,
    }),

    [CONST.GET_WIDGET_IMAGE]: () => ({
      ...state,
      getWidgetImageParam: payload,
      getWidgetImageFetch: true,
      action: type,
    }),
    [CONST.GET_WIDGET_IMAGE_SUCCESS]: () => ({
      ...state,
      getWidgetImageResponse: payload.data,
      getWidgetImageFetch: false,
      action: type,
    }),
    [CONST.GET_WIDGET_IMAGE_FAILED]: () => ({
      ...state,
      getWidgetImageError: payload,
      getWidgetImageFetch: false,
      action: type,
    }),
    [CONST.GET_WIDGET_IMAGE_CLEAR]: () => ({
      ...state,
      getWidgetImageResponse: homeInitialState.getWidgetImageResponse,
      getWidgetImageError: homeInitialState.getWidgetImageError,
      action: type,
    }),

    [CONST.GET_FAQ_CONTENT]: () => ({
      ...state,
      getFaqContentParam: payload,
      getFaqContentFetch: true,
      action: type,
    }),
    [CONST.GET_FAQ_CONTENT_SUCCESS]: () => ({
      ...state,
      getFaqContentResponse: payload.data,
      getFaqContentFetch: false,
      action: type,
    }),
    [CONST.GET_FAQ_CONTENT_FAILED]: () => ({
      ...state,
      getFaqContentError: payload,
      getFaqContentFetch: false,
      action: type,
    }),
    [CONST.GET_FAQ_CONTENT_CLEAR]: () => ({
      ...state,
      ...STATE.getFaqContentInitialState,
      action: type,
    }),

    [CONST.GET_IMPORTANT_FOR_YOU_IMAGE]: () => ({
      ...state,
      getImportantForYouImageParam: payload,
      getImportantForYouImageFetch: true,
      action: type,
    }),
    [CONST.GET_IMPORTANT_FOR_YOU_IMAGE_SUCCESS]: () => ({
      ...state,
      getImportantForYouImageResponse: payload.data,
      getImportantForYouImageFetch: false,
      action: type,
    }),
    [CONST.GET_IMPORTANT_FOR_YOU_IMAGE_FAILED]: () => ({
      ...state,
      getImportantForYouImageError: payload,
      getImportantForYouImageFetch: false,
      action: type,
    }),
    [CONST.GET_IMPORTANT_FOR_YOU_IMAGE_CLEAR]: () => ({
      ...state,
      getImportantForYouImageResponse: homeInitialState.ggetImportantForYouImageResponse,
      getImportantForYouImageError: homeInitialState.getImportantForYouImageError,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
