import * as CONST from '@cp-module/unsubscribe/unsubscribeConstant';
export const setUnsubscribeNewsletter = (payload) => ({
  type: CONST.SET_UNSUBSCRIBE_NEWS_LETTER,
  payload,
});
export const setUnsubscribeNewsletterSuccess = (payload) => ({
  type: CONST.SET_UNSUBSCRIBE_NEWS_LETTER_SUCCESS,
  payload,
});
export const setUnsubscribeNewsletterFailed = (payload) => ({
  type: CONST.SET_UNSUBSCRIBE_NEWS_LETTER_FAILED,
  payload,
});
