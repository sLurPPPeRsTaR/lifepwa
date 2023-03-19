import CryptoJS from 'crypto-js';

export const BASE_URL = process.env.BASE_URL;
export const STRAPI_URL = process.env.STRAPI_URL;
export const BASE_URL_CUSTOMER_DEV = process.env.BASE_URL_CUSTOMER;
export const BASE_URL_PROD = 'https://life.id/api';
export const BASE_URL_LIVENESS = 'https://api.advance.ai/openapi/liveness';
export const BASE_URL_CUSTOMER = 'https://uat.life.id/api';
export const DEVICE_PLATFORM = 'website';
export const LIFETAG_ID = '7771ea34-24fc-4744-aae8-6850899a1d6d';

export const RESPONSE_STATUS = {
  ERR_NETWORK: 0,
  SUCCESS: 200,
  NEED_ACTION: 300,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  ERROR: 500,
  ERR_BAD_RESPONSE: 502,
  ACCEPTED: 202,
};

export const RESPONSE_STATE = {
  DATA_NOT_EXISTS: 'DATA_NOT_EXISTS',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  ERR_NETWORK: 'ERR_NETWORK',
  USER_BLOCKED_: 'USER_BLOCKED_',
  TOO_FREQUENTLY_: 'TOO_FREQUENTLY_',
  ALREADY_REGISTERED: 'ALREADY_REGISTERED',
  BAD_REQUEST: 'BAD_REQUEST',
  INVALID_EKYC: 'INVALID_EKYC',
  POLICY_IN_SUBMIT_STATUS_NOT_FOUND: 'POLICY_IN_SUBMIT_STATUS_NOT_FOUND',
  ALREADY_SUBSCRIBE: 'ALREADY_SUBSCRIBE',
  ALREADY_BOUGHT: 'ALREADY_BOUGHT',
};

export const BILL_TYPE = {
  premium: 'premium',
};

export const PAYMENT_TYPE = {
  creditDebitCard: 'credit-or-debit-card',
  creditCard: 'credit-card',
};

export const EMERGENCY_PHONE = {
  PHONE: 'tel:08001888188',
};

export const PRODUCT = {
  LIFESAVER: {
    LIFESAVER: 'LifeSAVER',
    LIFESAVER_PLUS: 'LifeSAVER+',
    LIFESAVER_POS: 'LifeSAVER POS',
  },
  LIFECOVER: {
    PACKAGE_DATA: {
      lifecover: {
        id: 'lifecover',
        planCode: '01',
      },
      lifecoverPlus: {
        id: 'lifecoverPlus',
        planCode: '02',
      },
      lifecoverFreeChoice: {
        id: 'lifecoverFreeChoice',
        planCode: '03',
      },
    },
    PACKAGE_OPTION: {
      yearly: 'yearly',
      annually: 'annually',
      monthly: 'monthly',
    },
  },
};

export const GOOGLE_PEOPLE_API =
  'https://people.googleapis.com/v1/people/me?personFields=names,birthdays,emailAddresses&sources=READ_SOURCE_TYPE_PROFILE&access_token=';

export const FACEBOOK_PEOPLE_API =
  'https://graph.facebook.com/v14.0/me?fields=id,name,email,birthday&access_token=';

export const POLICY_STATUS = {
  active: 'ACTIVE',
  terminate: 'TERMINATE',
  lapse: 'LAPSE',
  submit: 'SUBMIT',
  gracePeriod: 'GRACE_PERIOD',
  gracePeriod2: 'GRACE PERIOD',
  inforce: 'INFORCE',
};

export const NAVIGATION = {
  AUTH: {
    Auth: '/auth',
    AuthLanding: 'AuthLanding',
    AuthLoad: 'Load',
    LoginInput: 'LoginInput',
    PrivacyPolicy: '/auth/kebijakan-dan-privasi',
    TermOfService: '/auth/syarat-dan-ketentuan',
  },
  REGISTER: {
    Register: '/register',
    RegisterInput: '/register/form',
    RegisterOtp: '/register/otp',
    RegisterNextStep: '/register/nextstep',
    RegisterMain: 'RegisterMain',
    RegisterPolis: 'RegisterPolis',
    RegisterPolisOtp: 'RegisterPolisOtp',
    RegisterSertifikat: 'RegisterSertifikat',
    RegisterPin: 'RegisterPin',
    RegisterTerms: 'RegisterTerms',
  },
  LOGIN: {
    Login: '/login',
    LoginMain: 'LoginMain',
    LoginInput: 'LoginInput',
  },
  FORPASS: {
    Forpass: '/forgotpassword',
    ForpassUat: '/forgotpassword-uat',
    ForpassMain: '/forgot-password',
    ForpassForm: '/forget-password/form',
    ForpassInput: 'ForpassInput',
  },
  HOME: {
    Home: '/',
    HomeListProduct: '/home/products',
    HomeMain: 'HomeMain',
    HomePolisJiwasraya: 'HomePolisJiwasraya',
    HomePengalihanPolis: 'HomePengalihanPolis',
    HomeLanding: 'HomeLanding',
  },

  PROFILE: {
    Profile: '/profile',
    ProfileMain: 'ProfileMain',
    ProfileLanguage: 'ProfileLanguage',
    ProfileSecurity: 'ProfileSecurity',
    ProfileHelp: 'ProfileHelp',
    ProfileHelpCenter: 'ProfileHelpCenter',
    ProfilePayment: 'ProfilePayment',
    ProfilePersonalData: 'ProfilePersonalData',
    ProfileCreatePin: 'ProfileCreatePin',
    ProfileCreateNewPin: 'ProfileCreateNewPin',
    ProfileChangeNewPin: 'ProfileChangeNewPin',
    ProfileDevice: 'ProfileDevice',
    ProfileInputPin: 'ProfileInputPin',
    ProfileChangePass: 'ProfileChangePassword',
    ProfileMobileNumber: 'ProfileMobileNumber',
    ProfileNewMobileNumber: 'ProfileNewMobileNumber',
    ProfileMobileNumberOtp: 'ProfileMobileNumberOtp',
    ProfileEmailEdit: 'ProfileEmailEdit',
    ProfileEmailEditOtp: 'ProfileEmailEditOtp',
    ProfilePersonalProvince: 'ProfilePersonalProvince',
    ProfilePersonalCity: 'ProfilePersonalCity',
    ProfilePersonalDistrict: 'ProfilePersonalDistrict',
    ProfileDeleteAccount: 'ProfileDeleteAccount',
    ProfileOtp: 'ProfileOtp',
    ProfileFaqFeedback: 'ProfileFaqFeedback',
  },
  TABMAIN: {
    TabMain: 'TabMain',
  },
  POLICY: {
    Polis: '/polis',
    PolisMain: 'PolisMain',
    PolisDetail: '/polis/detail',
    PolisPengkinian: '/polis/pengkinian',
    PolisPengkinianOtp: '/polis/pengkinianOtp',
    PolisKlaimProgress: 'PolisKlaimProgress',
    PolisDanaStatus: 'PolisDanaStatus',
    PolisLifeCard: '/polis/lifecard',
  },
  KYC: {
    KycMain: '/kyc',
    KycUploadSelfie: '/kyc/upload-selfie',
    KycUploadKTP: '/kyc/upload-ktp',
    KycForm: '/kyc/form',
    KycConfPin: '/kyc/create-pin',
    KycUploadSelfieCam: 'KycUploadSelfieCam',
    KycUploadKTPCam: 'KycUploadKTPCam',
    KycCreatePin: '/kyc/create-pin',
  },
  LIVENESS: {
    Liveness: '/liveness',
  },
  UPDATA: {
    Updata: '/updata',
    UpdataForm: '/updata/form',
    UpdataUploadKK: '/updata/upload-kk',
    UpdataUploadSelfie: '/updata/upload-selfie',
    UpdataInformation: '/updata/information',

    UpdataSelfCam: 'UpdataSelfCam',
    UpdataKTP: 'UpdataKTP',
    UpdataKTPCam: 'UpdataKTPCam',
    UpdataKK: 'UpdataKK',
    UpdataKKCam: 'UpdataKKCam',
    UpdataReview: 'UpdataReview',
    UpdataPhone: '/updata/updata-phone',
    UpdataPhoneEdit: 'UpdataPhoneEdit',
    UpdataEmail: 'UpdataEmail',
    UpdataEmailEdit: 'UpdataEmailEdit',
    UpdataBank: 'UpdataBank',
    UpdataBankEdit: 'UpdataBankEdit',
    UpdataAddress: 'UpdataAddress',
    UpdataAddressEdit: 'UpdataAddressEdit',
    UpdataOtp: 'UpdataOtp',
  },
  LIFECOVER: {
    LifecoverMain: '/lifecover',
    LifecoverAddBeneficiary: '/lifecover/add-beneficiary',
    LifecoverSelectPackage: '/lifecover/select-package',
    LifecoverDetailPolis: '/lifecover/detail-polis',
    LifecoverMedicalStatement: '/lifecover/medical-statement',
    LifecoverDetailConfirm: '/lifecover/confirm',
    LifecoverPayment: '/lifecover/payment',
    LifecoverConfirm: '/lifecover/confirm',
    LifecoverComponent: '/lifecover/component',
    LifecoverFAQ: '/lifecover/faq',
  },
  LIFESAVER: {
    LifesaverMain: '/lifesaver',
    LifesaverSuccess: '/lifesaver/success',
    LifesaverCheckPayment: '/lifesaver/check-payment',
    LifesaverConfirm: '/lifesaver/confirm',
    LifesaverConfirmOther: '/lifesaver/confirm-other',
    LifesaverTermCondition: '/lifesaver/term-and-condition',
    LifesaverCreditCard: '/lifesaver/credit-card',
    LifesaverPayment: '/lifesaver/payment',
    DetailProduct: 'DetailProduct',
    LifesaverSyaratKetentuan: '/lifesaver/syarat-dan-ketentuan',
    LifesaverRiplay: '/lifesaver/riplay',
    CheckReferalCode: 'CheckReferalCode',
    CheckReferalCodeV2: 'CheckReferalCodeV2',
    LifesaverInviteFriends: '/lifesaver/invite-friends',
    LifesaverBajoRun: '/bajorun',
  },
  REFERRAL: {
    ReferralMain: '/referral',
  },
  NOTIFICATION: {
    NotificationMain: '/notification',
  },
  SUBS: {
    SubsMain: 'SubsMain',
    SubsDetail: 'SubsDetail',
    SubsUnSubscribe: 'SubsUnSubscribe',
    SubsListBilling: 'SubsListBilling',
    SubsUnSubscribe: '/subs/unsubscribe',
  },
  FAQ: {
    FaqMain: '/faq',
  },
  LIFETAG: {
    LifetagMain: '/lifetag',
    LifetagForm: '/lifetag/form',
    LifetagSteps: '/lifetag/step',
    LifetagOrder: '/lifetag/order',
    LifetagBanner: '/lifetag/banner',
    LifetagConfirm: '/lifetag/confirm',
    LifetagPayment: '/lifetag/payment',
    LifetagScanner: '/lifetag/scanner',
    LifetagSuccess: '/lifetag/Success',
    LifetagSetting: '/lifetag/setting',
    LifetagDetailOrder: '/lifetag/detail-order',
    LifetagDetailProduct: '/lifetag/product',
    LifetagCheckPayment: '/lifetag/check-payment',
    LifetagConfirmAddress: '/lifetag/select-address',
  },
  TNC: {
    TNCMain: '/syarat-dan-ketentuan',
    TNCPortalMain: '/portal/syarat-dan-ketentuan',
  },
  EVENT: {
    EventMain: '/event',
    EventDetail: '/event/detail',
    EventConfirmPayment: '/event/confirm-payment',
    EventPayment: '/event/payment',
    EventPaymentCheck: '/event/payment-check',
    EventVoucher: '/event/voucher',
    EventVoucherQrCode: '/event/voucher-qrcode',
    EventSuccess: '/event/success',
    EventFavorite: '/event/favorite',
    EventHistory: '/event/history',
    EventConfirmClaim: '/event/confirm-claim',
  },
  UNSUBSCRIBE: {
    UnsubscribeNewletter: '/unsubscribe',
  },
  ARTICLE: {
    ArticleMain: '/article',
    ArticleDetail: '/article/d',
  },
  CLAIMPOLIS: {
    main: '/claim-polis',
    ClaimDetail: '/claim-polis/claim-detail',
    claimUpload: '/claim-polis/claim-upload',
    polis: '/claim-polis/polis',
    document: '/claim-polis/document',
  },
};

export const API = {
  CONFIG: {
    customerapps: '/v1/config/customerapps/version1',
  },
  AUTH: {
    logout: '/v1/auth/logout',
    requestOtp: '/v1/auth/requestOtp',
    requestOtpByToken: '/v1/auth/private/requestOtp',
    login: '/v1/auth/login',
    resetSandi: '/v1/auth/resetPassword',
    changeSandi: '/v1/auth/changePassword',
    loginChannel: '/v1/auth/loginChannel',
    delete: '/v2/auth/delete',
    verifyOtp: '/v1/auth/verifyOtp',
    verifyOtpNoLogin: '/v1/auth/public/verifyOtp',
  },
  USER: {
    user: '/v1/user',
    session: '/v1/user/session',
    changeMobilePhoneNumber: '/v1/user/changeMobilePhoneNumber',
    photo: '/v1/user/photo',
    photoThumbnail: '/v1/user/photoThumbnail',
    photoThumbnailPublic: '/v1/user/public/photoThumbnail',
    thumbnail: '/v1/user/photo/thumbnail',
    channel: '/v1/user/channel',
    changeEmail: '/v1/user/changeEmail',
    checkEmail: '/v1/user/checkEmail',
    checkPhoneEmail: '/v1/user/checkPhoneNumberAndEmail',
    refreshToken: '/v1/auth/refreshToken',
    faq: '/v1/feedback',
    noLoginFaq: '/v1/feedback/guest',
    rating: '/v1/feedback/rating',
    address: '/v1/customer/user/address',
    identity: '/v1/eKyc/getUserIdentityCardInfo',
    userFlag: '/v1/user/flag',
    referral: '/v1/customer/referral',
    getContact: '/v1/content/contacts',
  },
  POLICY: {
    policy: '/v1/policy',
    link: '/v1/policy/link',
    inquiry: '/v1/policy/inquiry',
    checkpolis: '/v1/policy/checkpolis',
    selfData: '/v1/policy/selfData',
    benefit: '/v2/policy-detail/benefit',
    funds: '/v1/policy/funds',
    claim: '/v1/policy/claim',
    // checkIssuedPolicy: '/v1/policy/checkIssuedPolicy',
    checkIssuedPolicy: '/v2/policy-alter/checkIssuedPolicy',
    getLastKTPInformation: '/v1/policy/getLastKTPInformation',
    getLastKKInformation: '/v1/policy/getLastKKInformation',
    getLastOtherInformation: '/v1/policy/getLastOtherInformation',
    checkKKAndKTP: '/v1/policy/checkKKAndKTP',
    getListBank: '/v1/policy/getListBank',
    getWidgetManfaat: '/v1/policy/closestBenefit',
    inquiryBankAccount: '/v1/policy/inquiryBankAccount',
    inquiryPolicyNo: '/v1/policy/inquiryPolicyNo',
    checkLinkPolicyNo: '/v1/policy/checkLinkPolicyNo',
    getDetailKlaim: '/v1/policy-detail/detailClaim',
    getSummary: '/v1/policy-detail/summary',
    getDownload: '/v1/policy-detail/download',
    getPolicyProposal: '/v1/transaction/invoiceMaster',
    policyWidgetHome: '/v1/policy-widget/home',
    policyWidgetHomePublic: '/v1/policy-widget/home/public',
    validationCheck: '/v1/policy-alter/validationCheck',
    bankUpload: '/v1/eKyc/bookAccount',
  },
  PIN: {
    pin: '/v1/mpin',
    verify: '/v1/mpin/verify',
  },
  META: {
    getCSInfo: '/v1/meta/getCSInfo',
    getProvinsi: '/v1/meta/getProvinsi',
    getCityById: '/v1/meta/getCityById',
    getDistrictById: '/v1/meta/getDistrictById',
    getSubDistrictById: '/v1/meta/getSubDistrictById',
  },
  KYC: {
    h5livenessToken: '/v1/eKyc/faceLiveness/h5livenessToken',
    h5livenessResult: '/v1/eKyc/faceLiveness/h5livenessResult',
    // selfie: '/v1/eKyc/faceLiveness',
    selfie: '/v1/eKyc/faceLivenessVida',
    idCard: '/v1/eKyc/idCard',
    verifyIdCard: '/v1/eKyc/verify/E_KYC_LIFE_PLUS',
    familyCard: '/v1/eKyc/familyCard',
    verifyUpdata: '/v1/eKyc/verify/E_KYC_UPDATE_DATA',
    livenessLicense: 'https://api.advance.ai/openapi/liveness/v1/auth-license',
    livenessResult:
      'https://api.advance.ai/openapi/liveness/v3/detection-result',
    verifyDukcapil: '/v1/eKyc/verify',
    faceCompare: '/v1/eKyc/faceCompare',
    getDetailEKyc: '/v1/eKyc/getDetailEKyc',
    getUserIdentityCardInfo: '/v1/eKyc/getUserIdentityCardInfo',
  },
  LIFECOVER: {
    addBeneficiary: '/v1/customer/product/lifeCover/beneficiary/save',
    beneficiary: '/v1/customer/product/lifeCover/beneficiary/data',
    getAgePublic: '/v1/customer/product/lifeCoverPublic/getAge',
    checkReferral: '/api/v1/customer/product/lifeCover/referral',
    createBilling: '/v1/product/payment/savePaymentRequest',
    getPremiPublic: 'v1/customer/product/lifeCoverPublic/calculatePremi',
    getPremiPrivate: 'v1/customer/product/lifeCover/calculatePremi',
    getCurrentSubs: 'v2/product/getActiveProductByProductCode?productCode=002',
    checkBmi: 'v1/customer/product/lifeCover/checkBmi',
    getUserConfirmationDetail:
      '/v1/customer/product/lifeCover/getUserConfirmationDetail',
    getQuestions: '/v1/customer/product/lifeCover/sio/questions',
    setSubmission: 'v1/customer/product/lifeCover/subscribe',
  },
  LIFESAVER: {
    getProduct: '/v1/product/detail',
    getListRs: '/v1/provider/hospital',
    getPersonalTnc:
      '/v1/public/assets/f5ea1b03-beb5-4e62-b70e-94e63cbaa7e6.pdf',
    getPersonalFaq:
      '/v1/public/assets/cfc6e784-0b82-4565-9d8f-d8f61883abe3.pdf',
    getPersonalRiplay:
      '/v1/public/assets/e2d2c3b9-e8b4-4003-b903-43bcafd72b7a.pdf',
    getRiplayLifeSaver:
      '/v1/public/assets/feb76d0c-51dd-4abd-9e8d-281761126bb5.pdf',
    setSubmission: '/v2/submission/subscribe',
    setSubmissionOld: '/v1/submission/subscribe',
    setCallTime: '/v1/product/emergency/addTime',
    getCurrentSubs: '/v2/product/getActiveProduct',
    setWaiting: '/v1/product/waiting',
    getBajoRunProduct: '/v1/product/campaign?eventCode=BAJO2022',
    getPendingInvites: '/v1/product/invitation/listInviting',
    getCampaign: '/v1/product/campaign',
    getEligibleLite: '/v1/product/lifesaverlite',
    getProductLifetag:
      '/v1/customer/product/7771ea34-24fc-4744-aae8-6850899a1d6d?language=',
    getEligiblePos: '/v1/product/partner/lifeSAVERPOS',
    getTotalClaim: '/v1/product/claim/report/totalClaim',
    setSubmissionForOther: 'v1/transaction/subscribe',
    getBulkReceiver: '/v1/product/policy/summary',
    getRelationType: '/v1/product/detail/relationType',
    getIDCardDatOCRApi: '/api/v1/eKyc/idCardOther',
    getReceiverStatus: 'v1/customer/product/widget/receiverStatus',
    getSubscribeForOther: 'v2/product/subsbased/other',
  },
  PAYMENT: {
    inquiryDomesticAccount:
      'https://inquirypayment-aws.ifg-life.id/v1/bca/?/BcaApi/inquiry_domestic_account',
    getPaymentMethod: '/v1/product/payment/paymentMethod',
    setCreateBill: '/v1/product/payment/createBilling',
    setCreateBillEvent: '/v1/product/payment/paymentRequestEvent',
    setCreateBillProposal: '/v1/transaction/payment/paymentRequest',
    setCreateBillSinglePayment: '/v1/product/payment/savePaymentRequest',
    setCreateBillRenewal: '/v1/product/payment/paymentRequest/renewal',
    setCreateBillBundling: '/v1/transaction/payment/billing',
    getPaymentStatus: '/v1/product/payment/checkPayment',
    getPaymentStatusv2: '/v2/product/payment/checkPayment',
    getPaymentStatusv3: '/v3/product/payment/checkPayment',
    orderPaymentMethod: '/v1/product/payment/orderPayment',
    getPaymentEventStatus: '/v1/customer/event/payment/check',
    getPaymentEventVoucher: '/v1/customer/event/voucher',
    setCreateBillInvoiceMaster: '/v1/transaction/payment/paymentRequest',
    saveEkyc: '/v2/submission/saveEkyc',
    setCreateBillBulk: 'v2/submission/subscribe/forOther',
  },
  NOTIFICATION: {
    getNotif: '/v1/user/notification/info',
    getNotifTransaction: '/v1/user/notification/transaction',
    getNotifCount: '/v1/user/notification/count',
    readNotif: '/v1/user/notification',
  },
  SUBS: {
    getSubscriptions: '/v2/product/subsbased',
    getSubscriptionDetail: '/v2/product/detailPolicy',
    getBills: '/v1/product/billing',
    getActiveProduct: '/v2/product/getActiveProduct',
    setCancelUnsubscribe: '/v1/submission/cancelUnsubscribe',
    setUnsubscribe: '/v1/submission/unsubscribe',
    getSubscribeForOther: 'v2/product/subsbased/other',
  },
  UNSUBSCRIBE: {
    UnsubscribeNewletter: '/v1/user/notification/newsletter/unsubscribe',
  },
  LANDING: {
    getFitPrices: '/v1/product/fit',
    getFitPlusPrices: '/v1/product/fitplus',
    getProductBanner: '/v1/content/banners',
    getFaqContent: '/v1/content/faqs',
  },
  REFERRAL: {
    getReferral: '/v1/product/referral',
    getShareCount: '/v1/product/referral/countShare', // salah nama
    getTotalRegister: '/v1/product/referral/countRegister',
    getTotalSubscribe: '/v1/product/referral/countSubs',
    getIsUserEligible: '/v1/product/eligible',
    getIsUserEligibleBajoRun: 'v1/product/eligible?channel=bajoRun',
    getCheckAlreadyInvite: '/v1/product/invitation/checkPhoneNo',
    getCheckAlreadySubscribe: '/v1/product/eligible/subsByPhoneNo',
    getAddLink: '/v1/product/invitation/addLink',
    getInvitationLink: '/v1/product/invitation',
    getInvitationListFriend: '/v1/product/invitation/listFriends',
    getIsUserEligible: '/v1/product/eligible',
    getCheckMaxInvite: '/v1/product/role',
    getListReferral: '/v1/content/event/referrals',
  },

  EVENT: {
    getEventDetail: '/v1/customer/event/',
    getEventDetailPublic: '/v1/customer/public/event',
    getEventQuota: '/v1/customer/event/remainingQuota',
    getEventUpcoming: '/v1/customer/event?',
    getEventUpcomingPublic: '/v1/customer/public/event?',
    setEventCode: '/v1/customer/event/code',
    setEventAddFavorite: 'v1/customer/event/favorite',
    setEventRmvFavorite: 'v1/customer/event/favorite',
    getEventFavorite: '/v1/customer/event/favorite?',
    getEventUserTicket: '/v1/customer/event/ticket?',
    setEventBuyTicket: 'v1/customer/event/ticket',
    setEventAccessCodeTicket: 'v1/customer/event/accesscode',
    eventCategories: 'v1/customer/event/category',
    getUserEventInvoiceId: 'v1/customer/event/register',
    setPaymentEvent: 'v1/customer/event/payment',
    // referralCodeValidation: 'v1/customer/referral/validation'
    referralCodeValidation: 'v1/customer/event/invitation/referral/validation',
    setValidateVoucherCode: 'v1/customer/event/voucher',
  },
  CUSTOMER: {
    PRODUCT: {
      product: '/v1/customer/product',
      order: '/v1/customer/product/order',
      lifeTagPublic: '/v1/customer/product/merchandise/public', // merchandise
      lifeTag: '/v1/customer/product/merchandise',
      lifeTagFlag: '/v1/customer/product/merchandise/flag',
      userParty: '/v1/customer/userParty',
    },
  },
  ARTICLE: {
    getArticle: '/v1/content/articles',
    getArticleCategories: '/v1/content/categories',
  },
  CLAIMPOLIS: {
    getFaq: '/v1/content/faqs',
    getFaqDetail: '/v1/content/faqs/details',
    getPolicyDigital: '/v1/policy-claim/reimbursement/inquiryPolicyDigital',
    getRs: '/v1/policy-claim/provider/hospital',
    getListTypeBenefit: '/v1/policy-claim/benefit-claims',
    getDocumentMandatory: '/v1/policy-claim/master',
    document: '/v1/policy-claim/reimbursement',
  },
};

export const TOAST = {
  type: {
    error: 'error',
    warning: 'warning',
    success: 'success',
    info: 'info',
  },
};

export const REQUEST_OTP_SECONDS = 120;

export const APP = {
  header: {
    height: 56,
  },
};

export const APPLICATION_PAYMENT_ID_V2 = 'customerapps-pwa-v2';
export const APPLICATION_PAYMENT_ID = 'customerapps-pwa';
export const APPLICATION_PAYMENT_ID_RENEWAL = 'customerapps-pwa-renew';

export const codeLifesaver = {
  productCode: '001',
  lifesaverpos: {
    planCode: '01',
    planName: 'LifeSAVER POS',
    planNameAlt: 'LifeSAVERPOS',
  },
  lifesaver: {
    planCode: '02',
    planName: 'LifeSaverStandar',
  },
  lifesaverplus: {
    planCode: '03',
    planName: 'LifeSaverPlus',
  },
  subsType: {
    start: 'subscription',
  },
  status: {
    active: 'ACTIVE',
    terminate: 'TERMINATE',
    lapse: 'LAPSE',
    submit: 'SUBMIT',
  },
  paymentMethod: {
    recurring: 'RECURRING',
    nonrecurring: 'NON_RECURRING',
  },
};

export const STATUS_CODE = {
  [POLICY_STATUS.active]: 'active',
  [POLICY_STATUS.gracePeriod]: 'active',
  [POLICY_STATUS.gracePeriod2]: 'active',
  [POLICY_STATUS.inforce]: 'active',
  [POLICY_STATUS.terminate]: 'non-active',
  [POLICY_STATUS.lapse]: 'non-active',
};

export const planCodeLifesaver = {
  '01': {
    planName: 'LifeSAVER POS',
    planNameAlt: 'LifeSAVERPOS',
  },
  '02': {
    planName: 'LifeSAVER',
  },
  '03': {
    planName: 'LifeSAVER+',
  },
};

export const LIFETAG_ENV = {
  id: '12345678123456781234567812345678',
  iv: '1234567812345678',
};

export const LIVENESS_UI = {
  locale: 'en',
  mobileTipsPage: {
    titleText: 'Verifikasi Wajah',
    titleDescText: 'Silakan ikuti petunjuk untuk melakukan deteksi wajah',
    titleTextColor: '#000000',
    tipsTextColor: '#000000',
    startButtonTextColor: '#ffffff',
    tipsAreaBackgroundColor: '#ffffff',
    backgroundColor: '#ffffff',
    startButtonText: 'Mulai',
    startButtonBackgroundColor: '#ee282f',
  },
  mobileLoadingPage: {
    progressColor: '#ee282f',
  },
  mobileErrorDialog: {
    confirmButtonText: 'Konfirmasi',
    confirmButtonTextColor: '#ffffff',
    confirmButtonBackgroundColor: '#ee282f',
    messageTextColor: '#000000',
    backgroundColor: '#ffffff',
  },
  mobileResultPage: {
    successDesc: 'Verifikasi Wajah Berhasil',
    failedDesc: 'Verifikasi Wajah Gagal!',
    isShow: true,
    showScore: true,
    livenessResultTextColor: '#000000',
    nextStepButtonText: 'Lanjut',
    nextStepButtonTextColor: '#ffffff',
    nextStepButtonBackgroundColor: '#ee282f',
    tryAgainButtonText: 'Coba Lagi',
    tryAgainButtonTextColor: '#ffffff',
    tryAgainButtonBackgroundColor: '#ee282f',
  },
  pcTipsPage: {
    titleText: 'Verifikasi Wajah',
    titleDescText: 'Silakan ikuti petunjuk untuk melakukan deteksi wajah',
    startButtonText: 'Mulai',
    startButtonBackgroundColor: '#ee282f',
    titleTextColor: '#000000',
    titleDescTextColor: '#000000',
    tipsTextColor: '#000000',
    startButtonTextColor: '#ffffff',
    backgroundColor: '#ffffff',
    tips: [
      {
        iconLink:
          'https://cicd.ifg-life.id/static/f860323b/images/svgs/logo.svg',
        text: 'Harap ambil foto wajah yang jelas',
      },
      {
        iconLink:
          'https://cicd.ifg-life.id/static/f860323b/images/svgs/logo.svg',
        text: 'Pastikan wajah dalam bingkai',
      },
      {
        iconLink:
          'https://cicd.ifg-life.id/static/f860323b/images/svgs/logo.svg',
        text: 'Wajah tidak boleh ditutup',
      },
      {
        iconLink:
          'https://cicd.ifg-life.id/static/f860323b/images/svgs/logo.svg',
        text: 'Harap lakukan pengujian di lingkungan yang cukup terang',
      },
    ],
  },
  pcLoadingPage: {
    progressColor: '#ee282f',
  },
  pcCameraPage: {
    titleText: 'Verifikasi Wajah',
    descText: 'Silakan ambil foto wajah yang jelas',
    titleTextColor: '#000000',
    descTextColor: '#000000',
    takePhotoIconLink:
      'https://www.iconsdb.com/icons/preview/red/slr-camera-xxl.png',
  },
  pcErrorDialog: {
    confirmButtonText: 'Konfirmasi',
    confirmButtonBackgroundColor: '#ee282f',
  },
  pcResultPage: {
    successDesc: 'Verifikasi Wajah Berhasil',
    failedDesc: 'Verifikasi Wajah Gagal!',
    isShow: true,
    showScore: true,
    titleTextColor: '#000000',
    livenessResultTextColor: '#000000',
    tryAgainButtonText: 'Coba Lagi',
    tryAgainButtonTextColor: '#ffffff',
    tryAgainButtonBackgroundColor: '#ee282f',
    nextStepButtonText: 'Lanjut',
    nextStepButtonTextColor: '#ffffff',
    nextStepButtonBackgroundColor: '#ee282f',
  },
};
