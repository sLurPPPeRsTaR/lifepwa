import * as STATE from '@cp-module/unsubscribe/unsubscribeInitialState';
import * as CONST from '@cp-module/unsubscribe/unsubscribeConstant';
import _ from 'lodash';

const unsubscribeInitialState = {
  ...STATE.setUnsubscribeNewsLetterInitialState,
  action: '',
};

export const unsubscribeReducer = (state = unsubscribeInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.SET_UNSUBSCRIBE_NEWS_LETTER]: () => ({
      ...state,
      setUnsubscribeNewsLetterParam: payload,
      setUnsubscribeNewsLetterFetch: false,
      action: type,
    }),

    [CONST.SET_UNSUBSCRIBE_NEWS_LETTER_SUCCESS]: () => ({
      ...state,
      setUnsubscribeNewsLetterResponse: payload,
      setUnsubscribeNewsLetterFetch: false,
      action: type,
    }),

    [CONST.SET_UNSUBSCRIBE_NEWS_LETTER_FAILED]: () => ({
      ...state,
      setUnsubscribeNewsLetterFailed: payload,
      setUnsubscribeNewsLetterFetch: false,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
