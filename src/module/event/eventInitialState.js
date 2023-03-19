// EVENT DETAIL
export const getEventDetailInitialState = {
  getEventDetailFetch: false,
  getEventDetailParam: {},
  getEventDetailResponse: {
    id: '',
    name: '',
    startDateTime: '',
    endDateTime: '',
    startRegisterDateTime: '',
    endRegisterDateTime: '',
    type: '',
    price: 0,
    quotaEvent: 0,
    eventCode: '',
    quotaLifesaver: 0,
    userRegistered: 0,
    closed: false,
    isClosedRegister: false,
    isNotShown: false,
    watchlist: false,
    alreadyBought: false,
    banner: [],
    location: {
      name: '',
      city: '',
      address: '',
      latitude: '',
      longitude: '',
      image: null,
    },
    detail: {
      description: '',
      highlight: '',
      highlightImage: null,
      category: '',
    },
  },
  getEventDetailFailed: {
    message: '',
  },
};

// EVENT QUOTA (LEFTOVER TICKET)
export const getEventQuotaInitialState = {
  getEventQuotaFetch: false,
  getEventQuotaParam: {},
  getEventQuotaResponse: {},
  getEventQuotaFailed: {
    message: '',
  },
};

// EVENT UPCOMING
export const getEventUpcomingInitialState = {
  getEventUpcomingFetch: false,
  getEventUpcomingParam: {},
  getEventUpcomingResponse: {},
  getEventUpcomingFailed: {
    message: '',
  },
};

// EVENT ADD FAV
export const setEventAddFavoriteInitialState = {
  setEventAddFavoriteFetch: false,
  setEventAddFavoriteParam: {},
  setEventAddFavoriteResponse: {},
  setEventAddFavoriteFailed: {
    message: '',
  },
};

// EVENT RM FAV
export const setEventRmvFavoriteInitialState = {
  setEventRmvFavoriteFetch: false,
  setEventRmvFavoriteParam: {},
  setEventRmvFavoriteResponse: {},
  setEventRmvFavoriteFailed: {
    message: '',
  },
};

// EVENT FAV
export const getEventFavoriteInitialState = {
  getEventFavoriteFetch: false,
  getEventFavoriteParam: {},
  getEventFavoriteResponse: {},
  getEventFavoriteFailed: {
    message: '',
  },
};

// EVENT USERTICKET
export const getEventUserTicketInitialState = {
  getEventUserTicketFetch: false,
  getEventUserTicketParam: {},
  getEventUserTicketResponse: {},
  getEventUserTicketFailed: {
    message: '',
  },
};

// EVENT BUYTICKET
export const setEventBuyTicketInitialState = {
  setEventBuyTicketFetch: false,
  setEventBuyTicketParam: {},
  setEventBuyTicketResponse: {},
  setEventBuyTicketFailed: {
    message: '',
  },
};

// EVENT ACCESSCODE
export const setEventAccessCodeBuyTicketInitialState = {
  setEventAccessCodeBuyTicketFetch: false,
  setEventAccessCodeBuyTicketParam: {},
  setEventAccessCodeBuyTicketResponse: {},
  setEventAccessCodeBuyTicketFailed: {
    message: '',
  },
};

// EVENT CATEGORIES
export const getEventCategoriesInitialState = {
  getEventCategoriesFetch: false,
  getEventCategoriesParam: {},
  getEventCategoriesResponse: {},
  getEventCategoriesFailed: {
    message: '',
  },
};

// USER EVENT INVOICE ID
export const getUserEventInvoiceIdInitialState = {
  getUserEventInvoiceIdFetch: false,
  getUserEventInvoiceIdParam: {},
  getUserEventInvoiceIdResponse: {},
  getUserEventInvoiceIdFailed: {
    message: '',
  },
};

// CREATE PAYMENT EVENT
export const setPaymentEventInitialState = {
  setPaymentEventFetch: false,
  setPaymentEventParam: {},
  setPaymentEventResponse: {},
  setPaymentEventFailed: {
    message: '',
  },
};

// SET VALIDATE REFERRAL CODE
export const setValidateReferralCodeInitialState = {
  setValidateReferralCodeFetch: false,
  setValidateReferralCodeParam: {},
  setValidateReferralCodeResponse: {},
  setValidateReferralCodeFailed: {
    message: '',
  },
};

// SET VALIDATE VOUCHER CODE
export const setValidateVoucherCodeInitialState = {
  setValidateVoucherCodeFetch: false,
  setValidateVoucherCodeParam: {},
  setValidateVoucherCodeResponse: {},
  setValidateVoucherCodeFailed: {
    message: '',
  },
};

// EVENT UTILITIES
export const eventParam = {
  eventId: '',
  accessCode: '',
  screen: '',
  /** for event payment */
  isFromEvent: false,
  url: '',
  invoiceId: '',
  reffNo: '',
  eventId: '',
};

export const modal = {
  isOpenModalAksesKode: false,
};
