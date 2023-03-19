export const authInitialState = {
  lang: 'id',
  colorScheme: 'light',
  userData: {
    userId: '',
    email: '',
    isEmailVerified: false,
    mobilePhoneNumber: '',
    isMobilePhoneNumberVerified: false,
    name: '',
    gender: null,
    dob: null,
    photoKey: null,
    thumbnailPhotoKey: null,
    deviceId: '',
    authType: '',
    alreadySetPin: false,
    alreadySetMPin: false,
    referralCode: null,
    ekycId: '',
    isReKYC: false,
    isReLivenessTest: false,
    isReUploadIdCard: false,
    alreadyKYC: false,
    alreadyLivenessTest: false,
    kkpmFlag: [],
    address: {
      province: {
        code: '',
        value: '',
      },
      city: {
        code: '',
        value: '',
      },
      district: {
        code: '',
        value: '',
      },
      street: '',
      postcode: '',
      rt: '',
      rw: '',
    },
    userParty: null,
    isIssuedPolicy: false,
    issuedPolicyLastDate: '',
    isUploadedKKAndKTP: false,
    identityCard: {},
    isLastAlterSuccess: null,
    invoiceId: '',
    paymentId: '',
    reffNo: '',
    invoiceMaster: '',
    onFailed: undefined,
    type:'',
  },
  token: {
    refresh_token: '',
    token_type: 'bearer',
    access_token: '',
    expires_in: 0,
    error_description: null,
    error: null,
  },
};

export const setAuthVerifyPINInitialState = {
  setAuthVerifyPINFetch: false,
  setAuthVerifyPINParam: {},
  setAuthVerifyPINResponse: {},
  setAuthVerifyPINFailed: {
    message: '',
  },
};
export const setAuthRequestOTPInitialState = {
  setAuthRequestOTPFetch: false,
  setAuthRequestOTPParam: {},
  setAuthRequestOTPResponse: {},
  setAuthRequestOTPFailed: {
    message: '',
  },
};
export const setAuthCreatePINInitialState = {
  setAuthCreatePINFetch: false,
  setAuthCreatePINParam: {},
  setAuthCreatePINResponse: {},
  setAuthCreatePINFailed: {
    message: '',
  },
};
export const setAuthVerifyOTPInitialState = {
  setAuthVerifyOTPFetch: false,
  setAuthVerifyOTPParam: {},
  setAuthVerifyOTPResponse: {},
  setAuthVerifyOTPFailed: {
    message: '',
  },
};
