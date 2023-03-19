import * as STATE from '@cp-module/lifesaver/lifesaverInitialState';
import * as CONST from '@cp-module/lifesaver/lifesaverConstant';

const lifesaverInitialState = {
  ...STATE.getProductInitialState,
  ...STATE.getProductsInitialState,
  ...STATE.getListRsInitialState,
  ...STATE.getPersonalRiplayInitialState,
  ...STATE.setSubmissionInitialState,
  ...STATE.getCurrentSubsInitialState,
  ...STATE.getInvitationListFriendState,
  ...STATE.getIsUserEligibleBajoRunState,
  ...STATE.getBajoRunStep,
  ...STATE.setWaitingInitialState,
  ...STATE.getPendingInvitesState,
  ...STATE.getCampaignInitialState,
  ...STATE.getEligibleSubmissionInitialState,
  ...STATE.getCheckMaxInviteState,
  ...STATE.getEligibleLiteInitialState,
  ...STATE.getProductLifetagInitialState,
  ...STATE.getEligiblePosInitialState,
  ...STATE.getTotalClaimInitialState,
  ...STATE.setSubmissionForOtherInitialState,
  ...STATE.getIDCardDataOCRInitialState,
  action: '',
};

export const lifesaverReducer = (state = lifesaverInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.GET_PRODUCT]: () => ({
      ...state,
      getProductParam: payload,
      getProductFetch: true,
      action: type,
    }),
    [CONST.GET_PRODUCT_SUCCESS]: () => ({
      ...state,
      getProductResponse: payload,
      getProductFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_FAILED]: () => ({
      ...state,
      getProductError: payload,
      getProductFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_CLEAR]: () => ({
      ...state,
      getProductResponse: lifesaverInitialState.getProductResponse,
      getProductError: lifesaverInitialState.getProductError,
      action: type,
    }),

    [CONST.GET_PRODUCTS]: () => ({
      ...state,
      getProductsParam: payload,
      getProductsFetch: true,
      action: type,
    }),
    [CONST.GET_PRODUCTS_SUCCESS]: () => ({
      ...state,
      getProductsResponse: payload,
      getProductsFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCTS_FAILED]: () => ({
      ...state,
      getProductsError: payload,
      getProductsFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCTS_CLEAR]: () => ({
      ...state,
      getProductsResponse: lifesaverInitialState.getProductsResponse,
      getProductsError: lifesaverInitialState.getProductsError,
      action: type,
    }),

    [CONST.GET_LIST_RS]: () => ({
      ...state,
      getListRsParam: payload,
      getListRsFetch: true,
      action: type,
    }),
    [CONST.GET_LIST_RS_SUCCESS]: () => ({
      ...state,
      getListRsResponse: payload,
      getListRsFetch: false,
      action: type,
    }),
    [CONST.GET_LIST_RS_FAILED]: () => ({
      ...state,
      getListRsError: payload,
      getListRsFetch: false,
      action: type,
    }),
    [CONST.GET_LIST_RS_CLEAR]: () => ({
      ...state,
      getListRsResponse: lifesaverInitialState.getListRsResponse,
      getListRsError: lifesaverInitialState.getListRsError,
      action: type,
    }),

    [CONST.GET_PERSONAL_RIPLAY]: () => ({
      ...state,
      getPersonalRiplayParam: payload,
      getPersonalRiplayFetch: true,
      action: type,
    }),
    [CONST.GET_PERSONAL_RIPLAY_SUCCESS]: () => ({
      ...state,
      getPersonalRiplayResponse: payload,
      getPersonalRiplayFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_RIPLAY_FAILED]: () => ({
      ...state,
      getPersonalRiplayError: payload,
      getPersonalRiplayFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_RIPLAY_CLEAR]: () => ({
      ...state,
      getPersonalRiplayResponse:
        lifesaverInitialState.getPersonalRiplayResponse,
      getPersonalRiplayError: lifesaverInitialState.getPersonalRiplayError,
      action: type,
    }),

    [CONST.SET_SUBMISSION]: () => ({
      ...state,
      setSubmissionParam: payload,
      setSubmissionFetch: true,
      action: type,
    }),
    [CONST.SET_SUBMISSION_SUCCESS]: () => ({
      ...state,
      setSubmissionResponse: payload,
      setSubmissionFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMISSION_FAILED]: () => ({
      ...state,
      setSubmissionError: payload,
      setSubmissionFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMISSION_CLEAR]: () => ({
      ...state,
      setSubmissionResponse: lifesaverInitialState.setSubmissionResponse,
      setSubmissionError: lifesaverInitialState.setSubmissionError,
      action: type,
    }),

    [CONST.SET_SUBMISSION_OLD]: () => ({
      ...state,
      setSubmissionOldParam: payload,
      setSubmissionOldFetch: true,
      action: type,
    }),
    [CONST.SET_SUBMISSION_OLD_SUCCESS]: () => ({
      ...state,
      setSubmissionOldResponse: payload,
      setSubmissionOldFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMISSION_OLD_FAILED]: () => ({
      ...state,
      setSubmissionOldError: payload,
      setSubmissionOldFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMISSION_OLD_CLEAR]: () => ({
      ...state,
      setSubmissionOldResponse: lifesaverInitialState.setSubmissionOldResponse,
      setSubmissionOldError: lifesaverInitialState.setSubmissionOldError,
      action: type,
    }),

    [CONST.GET_CURRENT_SUBS]: () => ({
      ...state,
      getCurrentSubsParam: payload,
      getCurrentSubsFetch: true,
      action: type,
    }),
    [CONST.GET_CURRENT_SUBS_SUCCESS]: () => ({
      ...state,
      getCurrentSubsResponse: payload,
      getCurrentSubsFetch: false,
      action: type,
    }),
    [CONST.GET_CURRENT_SUBS_FAILED]: () => ({
      ...state,
      getCurrentSubsError: payload,
      getCurrentSubsFetch: false,
      action: type,
    }),
    [CONST.GET_CURRENT_SUBS_CLEAR]: () => ({
      ...state,
      getCurrentSubsResponse: lifesaverInitialState.getCurrentSubsResponse,
      getCurrentSubsError: lifesaverInitialState.getCurrentSubsError,
      action: type,
    }),

    // get invitation list friend
    [CONST.GET_INVITATION_LIST_FRIEND]: () => ({
      ...state,
      getInvitationListFriendParam: payload,
      getInvitationListFriendFetch: true,
      action: type,
    }),
    [CONST.GET_INVITATION_LIST_FRIEND_SUCCESS]: () => ({
      ...state,
      getInvitationListFriendResponse: payload,
      getInvitationListFriendFetch: false,
      action: type,
    }),
    [CONST.GET_INVITATION_LIST_FRIEND_FAILED]: () => ({
      ...state,
      getInvitationListFriendError: payload,
      getInvitationListFriendFetch: false,
      action: type,
    }),
    [CONST.GET_INVITATION_LIST_FRIEND_CLEAR]: () => ({
      ...state,
      getInvitationListFriendResponse:
        lifesaverInitialState.getInvitationListFriendResponse,
      getInvitationListFriendError:
        lifesaverInitialState.getInvitationListFriendError,
      action: type,
    }),
    [CONST.GET_IS_USER_ELIGIBLE_BAJO_RUN]: () => ({
      ...state,
      getIsUserEligibleBajoRunParam: payload,
      getIsUserEligibleBajoRunFetch: true,
      action: type,
    }),
    [CONST.GET_IS_USER_ELIGIBLE_BAJO_RUN_SUCCESS]: () => ({
      ...state,
      getIsUserEligibleBajoRunResponse: payload,
      getIsUserEligibleBajoRunFetch: false,
      action: type,
    }),
    [CONST.GET_IS_USER_ELIGIBLE_BAJO_RUN_FAILED]: () => ({
      ...state,
      getIsUserEligibleBajoRunError: payload,
      getIsUserEligibleBajoRunFetch: false,
      action: type,
    }),
    [CONST.GET_IS_USER_ELIGIBLE_BAJO_RUN_CLEAR]: () => ({
      ...state,
      getIsUserEligibleBajoRunResponse:
        lifesaverInitialState.getIsUserEligibleBajoRunResponse,
      getIsUserEligibleBajoRunError:
        lifesaverInitialState.getIsUserEligibleBajoRunError,
      action: type,
    }),
    [CONST.GET_BAJO_RUN_STEP]: () => ({
      ...state,
      isBajoRunProgress: payload.isBajoRunProgress,
      isBajoRunFirstAccess: payload.isBajoRunFirstAccess,
    }),

    [CONST.GET_BAJO_RUN_PRODUCT]: () => ({
      ...state,
      getBajoRunProductParam: payload,
      getBajoRunProductFetch: true,
      action: type,
    }),
    [CONST.GET_BAJO_RUN_PRODUCT_SUCCESS]: () => ({
      ...state,
      getBajoRunProductResponse: payload,
      getBajoRunProductFetch: false,
      action: type,
    }),
    [CONST.GET_BAJO_RUN_PRODUCT_FAILED]: () => ({
      ...state,
      getBajoRunProductError: payload,
      getBajoRunProductFetch: false,
      action: type,
    }),

    // get pending invites
    [CONST.GET_PENDING_INVITES]: () => ({
      ...state,
      getPendingInvitesParam: payload,
      getPendingInvitesFetch: true,
      action: type,
    }),
    [CONST.GET_PENDING_INVITES_SUCCESS]: () => ({
      ...state,
      getPendingInvitesResponse: payload,
      getPendingInvitesFetch: false,
      action: type,
    }),
    [CONST.GET_PENDING_INVITES_FAILED]: () => ({
      ...state,
      getPendingInvitesError: payload,
      getPendingInvitesFetch: false,
      action: type,
    }),
    [CONST.GET_PENDING_INVITES_CLEAR]: () => ({
      ...state,
      getPendingInvitesResponse:
        invitationInitialState.getPendingInvitesResponse,
      getPendingInvitesError: invitationInitialState.getPendingInvitesError,
      action: type,
    }),
    [CONST.GET_CAMPAIGN]: () => ({
      ...state,
      getCampaignParam: payload,
      getCampaignFetch: true,
      action: type,
    }),
    [CONST.GET_CAMPAIGN_SUCCESS]: () => ({
      ...state,
      getCampaignResponse: payload,
      getCampaignFetch: false,
      action: type,
    }),
    [CONST.GET_CAMPAIGN_FAILED]: () => ({
      ...state,
      getCampaignError: payload,
      getCampaignFetch: false,
      action: type,
    }),
    [CONST.GET_CAMPAIGN_CLEAR]: () => ({
      ...state,
      getCampaignResponse: lifesaverInitialState.getCampaignResponse,
      getCampaignError: lifesaverInitialState.getCampaignError,
      action: type,
    }),
    [CONST.SET_WAITING]: () => ({
      ...state,
      setWaitingParam: payload,
      setWaitingFetch: true,
      action: type,
    }),
    [CONST.SET_WAITING_SUCCESS]: () => ({
      ...state,
      setWaitingResponse: payload,
      setWaitingFetch: false,
      action: type,
    }),
    [CONST.SET_WAITING_FAILED]: () => ({
      ...state,
      setWaitingError: payload,
      setWaitingFetch: false,
      action: type,
    }),
    [CONST.SET_WAITING_CLEAR]: () => ({
      ...state,
      setWaitingResponse: {},
      setWaitingError: { message: '' },
      action: type,
    }),
    [CONST.GET_ELIGIBLE_SUBMISSION]: () => ({
      ...state,
      getEligibleSubmissionParam: payload,
      getEligibleSubmissionFetch: true,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_SUBMISSION_SUCCESS]: () => ({
      ...state,
      getEligibleSubmissionResponse: payload,
      getEligibleSubmissionFetch: false,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_SUBMISSION_FAILED]: () => ({
      ...state,
      getEligibleSubmissionError: payload,
      getEligibleSubmissionFetch: false,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_SUBMISSION_CLEAR]: () => ({
      ...state,
      getEligibleSubmissionResponse:
        lifesaverInitialState.getEligibleSubmissionResponse,
      getEligibleSubmissionError:
        lifesaverInitialState.getEligibleSubmissionError,
    }),

    // get check maximum invite
    [CONST.GET_CHECK_MAX_INVITE]: () => ({
      ...state,
      getCheckMaxInviteParam: payload,
      getCheckMaxInviteFetch: true,
      action: type,
    }),
    [CONST.GET_CHECK_MAX_INVITE_SUCCESS]: () => ({
      ...state,
      getCheckMaxInviteResponse: payload,
      getCheckMaxInviteFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_MAX_INVITE_FAILED]: () => ({
      ...state,
      getCheckMaxInviteError: payload,
      getCheckMaxInviteFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_MAX_INVITE_CLEAR]: () => ({
      ...state,
      getCheckMaxInviteResponse:
        invitationInitialState.getCheckMaxInviteResponse,
      getCheckMaxInviteError: invitationInitialState.getCheckMaxInviteError,
      action: type,
    }),

    [CONST.GET_ELIGIBLE_LITE]: () => ({
      ...state,
      getEligibleLiteParam: payload,
      getEligibleLiteFetch: true,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_LITE_SUCCESS]: () => ({
      ...state,
      getEligibleLiteResponse: payload,
      getEligibleLiteFetch: false,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_LITE_FAILED]: () => ({
      ...state,
      getEligibleLiteError: payload,
      getEligibleLiteFetch: false,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_LITE_CLEAR]: () => ({
      ...state,
      ...STATE.getEligibleLiteInitialState,
      action: type,
    }),

    [CONST.GET_PRODUCT_LIFETAG]: () => ({
      ...state,
      getProductLifetagParam: payload,
      getProductLifetagFetch: true,
      action: type,
    }),
    [CONST.GET_PRODUCT_LIFETAG_SUCCESS]: () => ({
      ...state,
      getProductLifetagResponse: payload,
      getProductLifetagFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_LIFETAG_FAILED]: () => ({
      ...state,
      getProductLifetagError: payload,
      getProductLifetagFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_LIFETAG_CLEAR]: () => ({
      ...state,
      ...STATE.getProductLifetagInitialState,
    }),
    [CONST.GET_ELIGIBLE_POS]: () => ({
      ...state,
      getEligiblePosParam: payload,
      getEligiblePosFetch: true,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_POS_SUCCESS]: () => ({
      ...state,
      getEligiblePosResponse: payload,
      getEligiblePosFetch: false,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_POS_FAILED]: () => ({
      ...state,
      getEligiblePosError: payload,
      getEligiblePosFetch: false,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_POS_CLEAR]: () => ({
      ...state,
      ...STATE.getEligiblePosInitialState,
      action: type,
    }),

    [CONST.GET_TOTAL_CLAIM]: () => ({
      ...state,
      getTotalClaimParam: payload,
      getTotalClaimFetch: true,
      action: type,
    }),
    [CONST.GET_TOTAL_CLAIM_SUCCESS]: () => ({
      ...state,
      getTotalClaimResponse: payload,
      getTotalClaimFetch: false,
      action: type,
    }),
    [CONST.GET_TOTAL_CLAIM_FAILED]: () => ({
      ...state,
      getTotalClaimError: payload,
      getTotalClaimFetch: false,
      action: type,
    }),
    [CONST.GET_TOTAL_CLAIM_CLEAR]: () => ({
      ...state,
      ...STATE.getTotalClaimInitialState,
      action: type,
    }),
    [CONST.SET_SUBMISSION_FOR_OTHER]: () => ({
      ...state,
      setSubmissionForOtherParam: payload,
      setSubmissionForOtherFetch: true,
      action: type,
    }),
    [CONST.SET_SUBMISSION_FOR_OTHER_SUCCESS]: () => ({
      ...state,
      setSubmissionForOtherResponse: payload,
      setSubmissionForOtherFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMISSION_FOR_OTHER_FAILED]: () => ({
      ...state,
      setSubmissionForOtherError: payload,
      setSubmissionForOtherFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMISSION_FOR_OTHER_CLEAR]: () => ({
      ...state,
      setSubmissionForOtherResponse:
        lifesaverInitialState.setSubmissionForOtherResponse,
      setSubmissionForOtherError:
        lifesaverInitialState.setSubmissionForOtherError,
      action: type,
    }),
    [CONST.GET_ID_CARD_DATA_OCR]: () => ({
      ...state,
      getIDCardDataOCRParam: payload,
      getIDCardDataOCRFetch: true,
      action: type,
    }),
    [CONST.GET_ID_CARD_DATA_OCR_SUCCESS]: () => ({
      ...state,
      getIDCardDataOCRResponse: payload,
      getIDCardDataOCRFetch: false,
      action: type,
    }),
    [CONST.GET_ID_CARD_DATA_OCR_FAILED]: () => ({
      ...state,
      getIDCardDataOCRError: payload,
      getIDCardDataOCRFetch: false,
      action: type,
    }),
    [CONST.GET_ID_CARD_DATA_OCR_CLEAR]: () => ({
      ...state,
      ...STATE.getIDCardDataOCRInitialState,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
