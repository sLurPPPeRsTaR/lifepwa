import * as CONST from '@cp-module/lifesaver/lifesaverConstant';

export const getProduct = (payload) => ({
  type: CONST.GET_PRODUCT,
  payload,
});
export const getProductSuccess = (payload) => ({
  type: CONST.GET_PRODUCT_SUCCESS,
  payload,
});
export const getProductFailed = (payload) => ({
  type: CONST.GET_PRODUCT_FAILED,
  payload,
});
export const getProductClear = (payload) => ({
  type: CONST.GET_PRODUCT_CLEAR,
  payload,
});

export const getProducts = (payload) => ({
  type: CONST.GET_PRODUCTS,
  payload,
});
export const getProductsSuccess = (payload) => ({
  type: CONST.GET_PRODUCTS_SUCCESS,
  payload,
});
export const getProductsFailed = (payload) => ({
  type: CONST.GET_PRODUCTS_FAILED,
  payload,
});
export const getProductsClear = (payload) => ({
  type: CONST.GET_PRODUCTS_CLEAR,
  payload,
});

export const getListRs = (payload) => ({
  type: CONST.GET_LIST_RS,
  payload,
});
export const getListRsSuccess = (payload) => ({
  type: CONST.GET_LIST_RS_SUCCESS,
  payload,
});
export const getListRsFailed = (payload) => ({
  type: CONST.GET_LIST_RS_FAILED,
  payload,
});
export const getListRsClear = (payload) => ({
  type: CONST.GET_LIST_RS_CLEAR,
  payload,
});

export const getPersonalRiplay = (payload) => ({
  type: CONST.GET_PERSONAL_RIPLAY,
  payload,
});
export const getPersonalRiplaySuccess = (payload) => ({
  type: CONST.GET_PERSONAL_RIPLAY_SUCCESS,
  payload,
});
export const getPersonalRiplayFailed = (payload) => ({
  type: CONST.GET_PERSONAL_RIPLAY_FAILED,
  payload,
});
export const getPersonalRiplayClear = (payload) => ({
  type: CONST.GET_PERSONAL_RIPLAY_CLEAR,
  payload,
});

export const setSubmission = (payload) => ({
  type: CONST.SET_SUBMISSION,
  payload,
});

export const setSubmissionSuccess = (payload) => ({
  type: CONST.SET_SUBMISSION_SUCCESS,
  payload,
});
export const setSubmissionFailed = (payload) => ({
  type: CONST.SET_SUBMISSION_FAILED,
  payload,
});
export const setSubmissionClear = (payload) => ({
  type: CONST.SET_SUBMISSION_CLEAR,
  payload,
});


export const getCurrentSubs = (payload) => ({
  type: CONST.GET_CURRENT_SUBS,
  payload,
});
export const getCurrentSubsSuccess = (payload) => ({
  type: CONST.GET_CURRENT_SUBS_SUCCESS,
  payload,
});
export const getCurrentSubsFailed = (payload) => ({
  type: CONST.GET_CURRENT_SUBS_FAILED,
  payload,
});
export const getCurrentSubsClear = (payload) => ({
  type: CONST.GET_CURRENT_SUBS_CLEAR,
  payload,
});

export const getInvitationListFriend = (payload) => ({
  type: CONST.GET_INVITATION_LIST_FRIEND,
  payload,
});
export const getInvitationListFriendSuccess = (payload) => ({
  type: CONST.GET_INVITATION_LIST_FRIEND_SUCCESS,
  payload,
});
export const getInvitationListFriendFailed = (payload) => ({
  type: CONST.GET_INVITATION_LIST_FRIEND_FAILED,
  payload,
});
export const getInvitationListFriendClear = (payload) => ({
  type: CONST.GET_INVITATION_LIST_FRIEND_CLEAR,
  payload,
});

export const getIsUserEligibleBajoRun = (payload) => ({
  type: CONST.GET_IS_USER_ELIGIBLE_BAJO_RUN,
  payload,
});
export const getIsUserEligibleBajoRunSuccess = (payload) => ({
  type: CONST.GET_IS_USER_ELIGIBLE_BAJO_RUN_SUCCESS,
  payload,
});
export const getIsUserEligibleBajoRunFailed = (payload) => ({
  type: CONST.GET_IS_USER_ELIGIBLE_BAJO_RUN_FAILED,
  payload,
});
export const getIsUserEligibleBajoRunClear = (payload) => ({
  type: CONST.GET_IS_USER_ELIGIBLE_BAJO_RUN_CLEAR,
  payload,
});

export const getBajoRunStep = (payload) => ({
  type: CONST.GET_BAJO_RUN_STEP,
  payload,
});

export const setWaiting = (payload) => ({
  type: CONST.SET_WAITING,
  payload,
});
export const setWaitingSuccess = (payload) => ({
  type: CONST.SET_WAITING_SUCCESS,
  payload,
});
export const setWaitingFailed = (payload) => ({
  type: CONST.SET_WAITING_FAILED,
  payload,
});
export const setWaitingClear = (payload) => ({
  type: CONST.SET_WAITING_CLEAR,
  payload,
});

export const getBajoRunProduct = (payload) => ({
  type: CONST.GET_BAJO_RUN_PRODUCT,
  payload,
});

export const getBajoRunProductSuccess = (payload) => ({
  type: CONST.GET_BAJO_RUN_PRODUCT_SUCCESS,
  payload,
});
export const getBajoRunProductFailed = (payload) => ({
  type: CONST.GET_BAJO_RUN_PRODUCT_FAILED,
  payload,
});

export const getPendingInvites = (payload) => ({
  type: CONST.GET_PENDING_INVITES,
  payload,
});
export const getPendingInvitesSuccess = (payload) => ({
  type: CONST.GET_PENDING_INVITES_SUCCESS,
  payload,
});
export const getPendingInvitesFailed = (payload) => ({
  type: CONST.GET_PENDING_INVITES_FAILED,
  payload,
});
export const getPendingInvitesClear = (payload) => ({
  type: CONST.GET_PENDING_INVITES_CLEAR,
  payload,
});

export const getCampaign = (payload) => ({
  type: CONST.GET_CAMPAIGN,
  payload,
});
export const getCampaignSuccess = (payload) => ({
  type: CONST.GET_CAMPAIGN_SUCCESS,
  payload,
});
export const getCampaignFailed = (payload) => ({
  type: CONST.GET_CAMPAIGN_FAILED,
  payload,
});
export const getCampaignClear = (payload) => ({
  type: CONST.GET_CAMPAIGN_CLEAR,
  payload,
});

export const getEligibleSubmission = (payload) => ({
  type: CONST.GET_ELIGIBLE_SUBMISSION,
  payload,
});
export const getEligibleSubmissionSuccess = (payload) => ({
  type: CONST.GET_ELIGIBLE_SUBMISSION_SUCCESS,
  payload,
});
export const getEligibleSubmissionFailed = (payload) => ({
  type: CONST.GET_ELIGIBLE_SUBMISSION_FAILED,
  payload,
});
export const getEligibleSubmissionClear = (payload) => ({
  type: CONST.GET_ELIGIBLE_SUBMISSION_CLEAR,
});

export const getCheckMaxInvite = (payload) => ({
  type: CONST.GET_CHECK_MAX_INVITE,
  payload,
});
export const getCheckMaxInviteSuccess = (payload) => ({
  type: CONST.GET_CHECK_MAX_INVITE_SUCCESS,
  payload,
});
export const getCheckMaxInviteFailed = (payload) => ({
  type: CONST.GET_CHECK_MAX_INVITE_FAILED,
  payload,
});
export const getCheckMaxInviteClear = (payload) => ({
  type: CONST.GET_CHECK_MAX_INVITE_CLEAR,
  payload,
});

export const getEligibleLite = (payload) => ({
  type: CONST.GET_ELIGIBLE_LITE,
  payload,
});
export const getEligibleLiteSuccess = (payload) => ({
  type: CONST.GET_ELIGIBLE_LITE_SUCCESS,
  payload,
});
export const getEligibleLiteFailed = (payload) => ({
  type: CONST.GET_ELIGIBLE_LITE_FAILED,
  payload,
});
export const getEligibleLiteClear = (payload) => ({
  type: CONST.GET_ELIGIBLE_LITE_CLEAR,
  payload,
});

export const getProductLifetag = (payload) => ({
  type: CONST.GET_PRODUCT_LIFETAG,
  payload,
});
export const getProductLifetagSuccess = (payload) => ({
  type: CONST.GET_PRODUCT_LIFETAG_SUCCESS,
  payload,
});
export const getProductLifetagFailed = (payload) => ({
  type: CONST.GET_PRODUCT_LIFETAG_FAILED,
  payload,
});
export const getProductLifetagClear = (payload) => ({
  type: CONST.GET_PRODUCT_LIFETAG_CLEAR,
  payload,
});
export const getEligiblePos = (payload) => ({
  type: CONST.GET_ELIGIBLE_POS,
  payload,
});
export const getEligiblePosSuccess = (payload) => ({
  type: CONST.GET_ELIGIBLE_POS_SUCCESS,
  payload,
});
export const getEligiblePosFailed = (payload) => ({
  type: CONST.GET_ELIGIBLE_POS_FAILED,
  payload,
});
export const getEligiblePosClear = (payload) => ({
  type: CONST.GET_ELIGIBLE_POS_CLEAR,
  payload,
});

//GET TOTAL CLAIM
export const getTotalClaim = (payload) => ({
  type: CONST.GET_TOTAL_CLAIM,
  payload,
});
export const getTotalClaimSuccess = (payload) => ({
  type: CONST.GET_TOTAL_CLAIM_SUCCESS,
  payload,
});
export const getTotalClaimFailed = (payload) => ({
  type: CONST.GET_TOTAL_CLAIM_FAILED,
  payload,
});
export const getTotalClaimClear = (payload) => ({
  type: CONST.GET_TOTAL_CLAIM_CLEAR,
  payload,
});

export const setSubmissionForOther = (payload) => ({
  type: CONST.SET_SUBMISSION_FOR_OTHER,
  payload,
});
export const setSubmissionForOtherSuccess = (payload) => ({
  type: CONST.SET_SUBMISSION_FOR_OTHER_SUCCESS,
  payload,
});
export const setSubmissionForOtherFailed = (payload) => ({
  type: CONST.SET_SUBMISSION_FOR_OTHER_FAILED,
  payload,
});
export const setSubmissionForOtherClear = (payload) => ({
  type: CONST.SET_SUBMISSION_FOR_OTHER_CLEAR,
  payload,
});

export const setSubmissionOld = (payload) => ({
  type: CONST.SET_SUBMISSION_OLD,
  payload,
});

export const setSubmissionOldSuccess = (payload) => ({
  type: CONST.SET_SUBMISSION_OLD_SUCCESS,
  payload,
});
export const setSubmissionOldFailed = (payload) => ({
  type: CONST.SET_SUBMISSION_OLD_FAILED,
  payload,
});
export const setSubmissionOldClear = (payload) => ({
  type: CONST.SET_SUBMISSION_OLD_CLEAR,
  payload,
});

export const getIDCardDataOCR = (payload) => ({
  type: CONST.GET_ID_CARD_DATA_OCR,
  payload,
});

export const getIDCardDataOCRClear = (payload) => ({
  type: CONST.GET_ID_CARD_DATA_OCR_CLEAR,
  payload,
});

export const getIDCardDataOCRSuccess = (payload) => ({
  type: CONST.GET_ID_CARD_DATA_OCR_SUCCESS,
  payload,
});

export const getIDCardDataOCRFailed = (payload) => ({
  type: CONST.GET_ID_CARD_DATA_OCR_FAILED,
  payload,
});
