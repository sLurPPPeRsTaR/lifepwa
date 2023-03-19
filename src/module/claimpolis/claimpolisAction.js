import * as CONST from './claimpolisConstant';

export const getFaqClaim = (payload) => ({
  type: CONST.GET_FAQ_CLAIM,
  payload,
});

export const getFaqClaimSuccess = (payload) => ({
  type: CONST.GET_FAQ_CLAIM_SUCCESS,
  payload,
});

export const getFaqClaimFailed = (payload) => ({
  type: CONST.GET_FAQ_CLAIM_FAILED,
  payload,
});

export const getFaqClaimDetail = (payload) => ({
  type: CONST.GET_FAQ_CLAIM_DETAIL,
  payload,
});

export const getFaqClaimDetailSuccess = (payload) => ({
  type: CONST.GET_FAQ_CLAIM_DETAIL_SUCCESS,
  payload,
});

export const getFaqClaimDetailFailed = (payload) => ({
  type: CONST.GET_FAQ_CLAIM_DETAIL_FAILED,
  payload,
});

export const getPolicyDigital = (payload) => ({
  type: CONST.GET_POLICY_DIGITAL,
  payload,
});

export const getPolicyDigitalClear = (payload) => ({
  type: CONST.GET_POLICY_DIGITAL_CLEAR,
  payload,
});

export const getPolicyDigitalSuccess = (payload) => ({
  type: CONST.GET_POLICY_DIGITAL_SUCCESS,
  payload,
});

export const getPolicyDigitalFailed = (payload) => ({
  type: CONST.GET_POLICY_DIGITAL_FAILED,
  payload,
});

export const setUploadDoc = (payload) => ({
  type: CONST.SET_UPLOAD_DOC,
  payload,
});

export const setUploadDocClear = (payload) => ({
  type: CONST.SET_UPLOAD_DOC_CLEAR,
  payload,
});

export const getRs = (payload) => ({
    type: CONST.GET_RS,
    payload,
})

export const getRsSuccess = (payload) => ({
    type: CONST.GET_RS_SUCCESS,
    payload,
})

export const getRsFailed = (payload) => ({
    type: CONST.GET_RS_FAILED,
    payload,
})

export const setPolicyNumber = (payload) => ({
    type: CONST.SET_POLICY,
    payload,
})

export const getListBenefitType = (payload) => ({
    type: CONST.GET_LIST_TYPE_BENEFIT,
    payload,
})

export const getListBenefitTypeSuccess = (payload) => ({
    type: CONST.GET_LIST_TYPE_BENEFIT_SUCCESS,
    payload,
})

export const getListBenefitTypeFailed = (payload) => ({
    type: CONST.GET_LIST_TYPE_BENEFIT_FAILED,
    payload,
})
/** Document Mandatory */
export const getDocumentMandatory = (payload) => ({
  type: CONST.GET_DOCUMENT_MANDATORY,
  payload,
});

export const getDocumentMandatorySuccess = (payload) => ({
  type: CONST.GET_DOCUMENT_MANDATORY_SUCCESS,
  payload,
});

export const getDocumentMandatoryFailed = (payload) => ({
  type: CONST.GET_DOCUMENT_MANDATORY_FAILED,
  payload,
});

export const getDocumentMandatoryClear = (payload) => ({
  type: CONST.GET_DOCUMENT_MANDATORY_CLEAR,
  payload,
});
/** upload  document */
export const setUploadDocument = (payload) => ({
  type: CONST.SET_UPLOAD_DOCUMENT,
  payload,
});

export const setUploadDocumentSuccess = (payload) => ({
  type: CONST.SET_UPLOAD_DOCUMENT_SUCCESS,
  payload,
});

export const setUploadDocumentFailed = (payload) => ({
  type: CONST.SET_UPLOAD_DOCUMENT_FAILED,
  payload,
});

export const setUploadDocumentClear = (payload) => ({
  type: CONST.SET_UPLOAD_DOCUMENT_CLEAR,
  payload,
});
/** submit  document */
export const setSubmitDocument = (payload) => ({
  type: CONST.SET_SUBMIT_DOCUMENT,
  payload,
});

export const setSubmitDocumentSuccess = (payload) => ({
  type: CONST.SET_SUBMIT_DOCUMENT_SUCCESS,
  payload,
});

export const setSubmitDocumentFailed = (payload) => ({
  type: CONST.SET_SUBMIT_DOCUMENT_FAILED,
  payload,
});

export const setSubmitDocumentClear = (payload) => ({
  type: CONST.SET_SUBMIT_DOCUMENT_CLEAR,
  payload,
});

export const setDataClaim = (payload) => ({
  type: CONST.SET_DATA_CLAIM,
  payload,
})