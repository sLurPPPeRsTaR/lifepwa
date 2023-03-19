export const faqClaim = {
  getFaqClaimFetch: false,
  getFaqClaimResponse: [],
};

export const faqClaimDetail = {
  getFaqClaimDetailFetch: false,
  getFaqClaimDetailResponse: [],
}

export const policyDigital = {
  getPolicyDigitalFetch: false,
  getPolicyDigitalResponse: [],
  getPolicyDigitalFetchStatus: -1,
};

export const rs = {
  getRsFetch: false,
  getRsResponse: []
};

export const policyNumber = {
  selectedPolicyNumber: {}
}

export const listTypeBenefit = {
  getListTypeBenefitFetch: false,
  getListTypeBenefitResponse: []
}


export const setUploadDocInitialState = {
  documentUpload: [],
};

/** Document Mandatory */
export const getDocumentMandatoryInitialState = {
  getDocumentMandatoryFetch: false,
  getDocumentMandatoryParam: {},
  getDocumentMandatoryResponse: {},
  getDocumentMandatoryFailed: {
    message: '',
  },
};

/** upload document */
export const setUploadDocumentInitialState = {
  setUploadDocumentFetch: false,
  setUploadDocumentParam: {},
  setUploadDocumentResponse: {},
  setUploadDocumentFailed: {
    message: '',
  },
};

/** submit document */
export const setSubmitDocumentInitialState = {
  setSubmitDocumentFetch: false,
  setSubmitDocumentParam: {},
  setSubmitDocumentResponse: {},
  setSubmitDocumentFailed: {
    message: '',
  },
};

export const dataClaim = {
  payload: {
    benefitValue: "Meninggal Dunia",
    typeClaim: {
      label: '',
      value: '',
    },
    name: '',
    hospital: {
      label: '',
      value: '',
      type: '',
    },
    dateOfHospitalized: null,
    dateAccident: null,
    fullName: '',
    relation: '',
    bank: {
      label: '',
      value: '',
    },
    nameOfOwnerAcount: '',
    rekNumber: '',
    nik: '',
    insuredName: '',
    dob: '',
    policyNumber: '',
    productName: '',
    productCode: '',
    planCode: '',
    benefitType: '',
    causeCode: '',
  }
}
