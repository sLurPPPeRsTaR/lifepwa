import * as CONST from './claimpolisConstant';
import * as STATE from './claimpolisInitialState';
const initialState = {
  ...STATE.faqClaim,
  ...STATE.policyDigital,
  ...STATE.setUploadDocInitialState,
  ...STATE.policyNumber,
  ...STATE.listTypeBenefit,
  ...STATE.rs,
  ...STATE.getDocumentMandatoryInitialState,
  ...STATE.setUploadDocumentInitialState,
  ...STATE.setSubmitDocumentInitialState,
  ...STATE.dataClaim,
  ...STATE.faqClaimDetail,
  action: '',
};

export const claimpolisReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const actions = {
    [CONST.GET_FAQ_CLAIM]: () => ({
      ...state,
      getFaqClaimFetch: true,
      action: type,
    }),
    [CONST.GET_FAQ_CLAIM_SUCCESS]: () => ({
      ...state,
      getFaqClaimFetch: false,
      getFaqClaimResponse: payload,
      action: type,
    }),
    [CONST.GET_FAQ_CLAIM_FAILED]: () => ({
      ...state,
      getFaqClaimFetch: false,
      action: type,
    }),
    [CONST.GET_FAQ_CLAIM_DETAIL]: () => ({
      ...state,
      getFaqClaimDetailFetch: true,
      action: type,
    }),
    [CONST.GET_FAQ_CLAIM_DETAIL_SUCCESS]: () => ({
      ...state,
      getFaqClaimDetailFetch: false,
      getFaqClaimDetailResponse: payload,
      action: type,
    }),
    [CONST.GET_FAQ_CLAIM_DETAIL_FAILED]: () => ({
      ...state,
      getFaqClaimDetailFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_DIGITAL]: () => ({
      ...state,
      getPolicyDigitalFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_DIGITAL_CLEAR]: () => ({
      ...state,
      getPolicyDigitalResponse: initialState.getPolicyDigitalResponse,
      action: type,
    }),
    [CONST.GET_POLICY_DIGITAL_SUCCESS]: () => ({
      ...state,
      getPolicyDigitalFetch: false,
      getPolicyDigitalResponse: payload?.data,
      getPolicyDigitalFetchStatus: payload?.status,
      action: type,
    }),
    [CONST.GET_POLICY_DIGITAL_FAILED]: () => ({
      ...state,
      getPolicyDigitalFetch: false,
      getPolicyDigitalFetchStatus: payload?.status,
      action: type,
    }),
    [CONST.SET_UPLOAD_DOC]: () => ({
      ...state,
      documentUpload: payload,
    }),
    [CONST.SET_UPLOAD_DOC_CLEAR]: () => ({
      ...state,
      documentUpload: state.documentUpload,
    }),
    [CONST.GET_RS]: () => ({
      ...state,
      getRsFetch: true,
      action: type,
    }),
    [CONST.GET_RS_SUCCESS]: () => ({
      ...state,
      getRsFetch: false,
      getRsResponse: payload,
      action: type,
    }),
    [CONST.GET_RS_FAILED]: () => ({
      ...state,
      getRsFetch: false,
      action: type,
    }),
    [CONST.SET_POLICY]: () => ({
      ...state,
      selectedPolicyNumber: payload,
    }),
    [CONST.GET_LIST_TYPE_BENEFIT]: () => ({
      ...state,
      getListTypeBenefitFetch: true,
      action: type,
    }),
    [CONST.GET_LIST_TYPE_BENEFIT_SUCCESS]: () => ({
      ...state,
      getListTypeBenefitFetch: true,
      getListTypeBenefitResponse: payload,
      action: type,
    }),
    [CONST.GET_LIST_TYPE_BENEFIT_FAILED]: () => ({
      ...state,
      getListTypeBenefitFetch: false,
      action: type,
    }),
    /** Document Mandatory */
    [CONST.GET_DOCUMENT_MANDATORY]: () => ({
      ...state,
      getDocumentMandatoryParam: payload,
      getDocumentMandatoryFetch: true,
      action: type,
    }),
    [CONST.GET_DOCUMENT_MANDATORY_SUCCESS]: () => ({
      ...state,
      getDocumentMandatoryResponse: payload,
      getDocumentMandatoryFetch: false,
      action: type,
    }),
    [CONST.GET_DOCUMENT_MANDATORY_FAILED]: () => ({
      ...state,
      getDocumentMandatoryFailed: payload,
      getDocumentMandatoryFetch: false,
      action: type,
    }),
    [CONST.GET_DOCUMENT_MANDATORY_CLEAR]: () => ({
      ...state,
      ...STATE.getDocumentMandatoryInitialState,
      action: type,
    }),
    /** upload document */
    [CONST.SET_UPLOAD_DOCUMENT]: () => ({
      ...state,
      setUploadDocumentParam: payload,
      setUploadDocumentFetch: true,
      action: type,
    }),
    [CONST.SET_UPLOAD_DOCUMENT_SUCCESS]: () => ({
      ...state,
      setUploadDocumentResponse: payload,
      setUploadDocumentFetch: false,
      action: type,
    }),
    [CONST.SET_UPLOAD_DOCUMENT_FAILED]: () => ({
      ...state,
      setUploadDocumentFailed: payload,
      setUploadDocumentFetch: false,
      action: type,
    }),
    [CONST.SET_UPLOAD_DOCUMENT_CLEAR]: () => ({
      ...state,
      ...STATE.setUploadDocumentInitialState,
      action: type,
    }),
    /** submit document */
    [CONST.SET_SUBMIT_DOCUMENT]: () => ({
      ...state,
      setSubmitDocumentParam: payload,
      setSubmitDocumentFetch: true,
      action: type,
    }),
    [CONST.SET_SUBMIT_DOCUMENT_SUCCESS]: () => ({
      ...state,
      setSubmitDocumentResponse: payload,
      setSubmitDocumentFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMIT_DOCUMENT_FAILED]: () => ({
      ...state,
      setSubmitDocumentFailed: payload,
      setSubmitDocumentFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMIT_DOCUMENT_CLEAR]: () => ({
      ...state,
      ...STATE.setSubmitDocumentInitialState,
      action: type,
    }),
    [CONST.SET_DATA_CLAIM]: () => ({
      ...state,
      payload: payload,
      action: type,
    }),
    DEFAULT: () => state,
  }

  return (actions[type] || actions.DEFAULT)();
};
