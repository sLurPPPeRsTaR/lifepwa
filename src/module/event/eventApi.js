import _ from 'lodash';
import { API } from '@cp-util/constant';
import { api, api_customer } from '@cp-bootstrap/bootstrapApi';

// EVENT DETAIL
export const getEventDetailApi = (payload) => {
  return api.get(
    `${API.EVENT.getEventDetail}${payload.eventId}?language=${payload.lang}`,
    {
      headers: {
        'X-Access-Code': payload.accessCode,
      },
    },
  );
};

// EVENT DETAIL
export const getEventDetailPublicApi = (payload) => {
  return api.get(
    `${API.EVENT.getEventDetailPublic}/${payload.eventId}?language=${payload.lang}`,
    {
      headers: {
        'X-Access-Code': payload.accessCode,
      },
    },
  );
};

// EVENT DETAIL SSR
export const getEventDetailApiSSR = (payload) => {
  return api.get(
    `${API.EVENT.getEventDetail}${payload.eventId}?language=${payload.lang}`,
    {
      headers: {
        'X-Access-Code': payload.accessCode,
        authorization: `Bearer ${payload.token}`,
      },
    },
  );
};

// EVENT DETAIL SSR
export const getEventDetailPublicApiSSR = (payload) => {
  return api.get(
    `${API.EVENT.getEventDetailPublic}/${payload.eventId}?language=${payload.lang}`,
    {
      headers: {
        'X-Access-Code': payload.accessCode,
        authorization: `Bearer ${payload.token}`,
      },
    },
  );
};

// EVENT QUOTA (LEFTOVER TICKET)
export const getEventQuotaApi = (payload) => {
  return api.post(API.EVENT.getEventQuota, payload);
};

// EVENT UPCOMING
export const getEventUpcomingApi = (payload) => {
  const query = new URLSearchParams();
  if (payload.lang) {
    query.append('language', payload.lang);
  }
  if (payload.category) {
    query.append('category', payload.category);
  }
  if (_.isEmpty(query?.params)) {
    return api.get(`${API.EVENT.getEventUpcoming}language=${payload}`, payload);
  }
  return api.get(`${API.EVENT.getEventUpcoming}${query.toString()}`);
};

// EVENT UPCOMING
export const getEventUpcomingPublicApi = (payload) => {
  return api.get(
    `${API.EVENT.getEventUpcomingPublic}language=${payload}`,
    payload,
  );
};

// EVENT ADD FAV
export const setEventAddFavoriteApi = (payload) => {
  return api.post(
    `${API.EVENT.setEventAddFavorite}/${payload.eventId}`,
    payload,
  );
};

// EVENT RM FAV
export const setEventRmvFavoriteApi = (payload) => {
  return api.delete(
    `${API.EVENT.setEventRmvFavorite}/${payload.eventId}`,
    payload,
  );
};

// EVENT FAV
export const getEventFavoriteApi = (payload) => {
  return api.get(
    `${API.EVENT.getEventFavorite}language=${payload.lang}`,
    payload,
  );
};

// EVENT USERTICKET
export const getEventUserTicketApi = (payload) => {
  return api.get(
    `${API.EVENT.getEventUserTicket}language=${payload.lang}`,
    payload,
  );
};

// EVENT BUYTICKET
export const setEventBuyTicketApi = (payload) => {
  return api.post(API.EVENT.setEventBuyTicket, payload, {
    headers: {
      'X-Access-Code': payload.accessCode,
    },
  });
};

// EVENT accessCode
export const setEventAccessCodeTicketApi = (payload) => {
  return api.post(API.EVENT.setEventAccessCodeTicket, payload, {
    headers: {
      'X-Access-Code': payload.accessCode,
    },
  });
};

// EVENT referrall
export const setReferralValidationApi = (payload, header) => {
  // return api_customer.post(API.EVENT.referralCodeValidation, payload, {
  return api.post(API.EVENT.referralCodeValidation, payload, {
    headers: {
      'X-Consumer-Custom-ID': header?.ekYCAndPhoneNumber,
    },
  });
};

// EVENT CATEGORIES
export const getEventCategoriesAPI = () => {
  return api.get(`${API.EVENT.eventCategories}`);
};

// USER EVENT INVOICE ID
export const getUserEventInvoiceIdApi = (payload) => {
  return api.post(API.EVENT.getUserEventInvoiceId, payload);
};

// USER EVENT PAYMENT
export const setPaymentEventApi = (payload) => {
  return api.post(API.EVENT.setPaymentEvent, payload);
};

// REFERRALCODE
export const setValidateReferralCodeApi = (payload) => {
  return api.post(API.EVENT.referralCodeValidation, payload);
};
// VOUCHER CODE
export const setValidateVoucherCodeApi = (payload) => {
  return api.post(API.EVENT.setValidateVoucherCode, payload);
};
