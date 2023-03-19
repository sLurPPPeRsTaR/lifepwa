import * as STATE from '@cp-module/subs/subsInitialState';
import * as CONST from '@cp-module/subs/subsConstant';
import { SET_CLEAR_AUTH } from '@cp-module/auth/authConstant';
import _ from 'lodash';

const subsInitialState = {
  ...STATE.setUnsubscribeInitialState,
  ...STATE.getSubscriptionsOtherInitialState,
  action: '',
};

export const subsReducer = (state = subsInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(subsInitialState),
    }),
    [CONST.GET_SUBSCRIPTIONS]: () => ({
      ...state,
      getSubscriptionsParam: payload,
      getSubscriptionsFetch: true,
      action: type,
    }),
    [CONST.GET_SUBSCRIPTIONS_SUCCESS]: () => ({
      ...state,
      getSubscriptionsResponse: payload,
      getSubscriptionsFetch: false,
      action: type,
    }),
    [CONST.GET_SUBSCRIPTIONS_FAILED]: () => ({
      ...state,
      getSubscriptionsError: payload,
      getSubscriptionsFetch: false,
      action: type,
    }),
    [CONST.GET_SUBSCRIPTIONS_CLEAR]: () => ({
      ...state,
      getSubscriptionsResponse: subsInitialState.getSubscriptionsResponse,
      getSubscriptionsError: subsInitialState.getSubscriptionsError,
      action: type,
    }),

    [CONST.GET_SUBSCRIPTION_DETAIL]: () => ({
      ...state,
      getSubscriptionDetailParam: payload,
      getSubscriptionDetailFetch: true,
      action: type,
    }),
    [CONST.GET_SUBSCRIPTION_DETAIL_SUCCESS]: () => ({
      ...state,
      getSubscriptionDetailResponse: payload,
      getSubscriptionDetailFetch: false,
      action: type,
    }),
    [CONST.GET_SUBSCRIPTION_DETAIL_FAILED]: () => ({
      ...state,
      getSubscriptionDetailError: payload,
      getSubscriptionDetailFetch: false,
      action: type,
    }),
    [CONST.GET_SUBSCRIPTION_DETAIL_CLEAR]: () => ({
      ...state,
      getSubscriptionDetailResponse:
        subsInitialState.getSubscriptionDetailResponse,
      getSubscriptionDetailError: subsInitialState.getSubscriptionDetailError,
      action: type,
    }),

    [CONST.GET_BILLS]: () => ({
      ...state,
      getBillsParam: payload,
      getBillsFetch: true,
      action: type,
    }),
    [CONST.GET_BILLS_SUCCESS]: () => ({
      ...state,
      getBillsResponse: payload,
      getBillsFetch: false,
      action: type,
    }),
    [CONST.GET_BILLS_FAILED]: () => ({
      ...state,
      getBillsError: payload,
      getBillsFetch: false,
      action: type,
    }),
    [CONST.GET_BILLS_CLEAR]: () => ({
      ...state,
      getBillsResponse: subsInitialState.getBillsResponse,
      getBillsError: subsInitialState.getBillsError,
      action: type,
    }),

    [CONST.SET_RESUBSCRIBE]: () => ({
      ...state,
      setResubscribeParam: payload,
      setResubscribeFetch: true,
      action: type,
    }),
    [CONST.SET_RESUBSCRIBE_SUCCESS]: () => ({
      ...state,
      setResubscribeResponse: payload,
      setResubscribeFetch: false,
      action: type,
    }),
    [CONST.SET_RESUBSCRIBE_FAILED]: () => ({
      ...state,
      setResubscribeError: payload,
      setResubscribeFetch: false,
      action: type,
    }),

    [CONST.SET_UNSUBSCRIBE]: () => ({
      ...state,
      setUnsubscribeParam: payload,
      setUnsubscribeFetch: true,
      action: type,
    }),
    [CONST.SET_UNSUBSCRIBE_SUCCESS]: () => ({
      ...state,
      setUnsubscribeUnsponse: payload,
      setUnsubscribeFetch: false,
      action: type,
    }),
    [CONST.SET_UNSUBSCRIBE_FAILED]: () => ({
      ...state,
      setUnsubscribeError: payload,
      setUnsubscribeFetch: false,
      action: type,
    }),

    [CONST.GET_SUBSCRIPTIONS_OTHER]: () => ({
      ...state,
      getSubscriptionsOtherParam: payload,
      getSubscriptionsOtherFetch: true,
      action: type,
    }),
    [CONST.GET_SUBSCRIPTIONS_OTHER_SUCCESS]: () => ({
      ...state,
      getSubscriptionsOtherResponse: payload,
      getSubscriptionsOtherFetch: false,
      action: type,
    }),
    [CONST.GET_SUBSCRIPTIONS_OTHER_FAILED]: () => ({
      ...state,
      getSubscriptionsOtherError: payload,
      getSubscriptionsOtherFetch: false,
      action: type,
    }),
    [CONST.GET_SUBSCRIPTIONS_OTHER_CLEAR]: () => ({
      ...state,
      getSubscriptionsOtherResponse: subsInitialState.getSubscriptionsOtherResponse,
      getSubscriptionsOtherError: subsInitialState.getSubscriptionsOtherError,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
