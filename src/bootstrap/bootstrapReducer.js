import _ from 'lodash';
import moment from 'moment';
import { combineReducers } from 'redux';

import * as CONST from '@cp-bootstrap/bootstrapConstant';
import * as STATE from '@cp-bootstrap/bootstrapInitialState';

// Other Reducers
import { authReducer } from '@cp-module/auth/authReducer';
import { forpassReducer } from '@cp-module/forpass/forpassReducer';
import { loginReducer } from '@cp-module/login/loginReducer';
import { registerReducer } from '@cp-module/register/registerReducer';
import { profileReducer } from '@cp-module/profile/profileReducer';
import { kycReducer } from '@cp-module/kyc/kycReducer';
import { polisReducer } from '@cp-module/polis/polisReducer';
import { lifesaverReducer } from '@cp-module/lifesaver/lifesaverReducer';
import { lifecoverReducer } from '@cp-module/lifecover/lifecoverReducer';
import { homeReducer } from '@cp-module/home/homeReducer';
import { paymentsReducer } from '@cp-module/payments/paymentsReducer';
import { activityPersistConfig } from '@cp-config/Persist';
import { notificationReducer } from '@cp-module/notification/notificationReducer';
import { eventReducer } from '@cp-module/event/eventReducer';
import { subsReducer } from '@cp-module/subs/subsReducer';
import { lifetagReducer } from '@cp-module/lifetag/lifetagReducer';
import { persistReducer } from '@cp-module/persist/persistReducer';
// import { profileReducer } from 'ca-module-profile/profileReducer';
// import { polisReducer } from 'ca-module-polis/polisReducer';
import { updataReducer } from '@cp-module/updata/updataReducer';
// import { notificationReducer } from 'ca-module-notification/notificationReducer';
// import { subsReducer } from 'ca-module-subs/subsReducer';
import { unsubscribeReducer } from '@cp-module/unsubscribe/unsubscribeReducer';
import { articleReducer } from '@cp-module/article/articleReducer';
import { claimpolisReducer } from '@cp-module/claimpolis/claimpolisReducer';
import { referralReducer } from '@cp-module/referral/referralReducer';

export const activity = (state = _.cloneDeep(STATE.userActivity), action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.SET_ACTIVITY]: () => ({
      userActivity: {
        type: payload.type,
        value: payload.value,
        date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        dateDiff: moment(new Date()).diff(state.userActivity.date),
      },
      currentScreen: payload.type === 'CHANGE_SCREEN' ? payload.value : '',
      action: type,
    }),
    [CONST.SET_FIRST_LOAD]: () => ({
      ...state,
      isFirstLoad: payload,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};

export const bootstrap = (
  state = _.cloneDeep(STATE.bootstrapInitialState),
  action,
) => {
  const { payload, type } = action;
  const actions = {
    [CONST.SET_LOCATION]: () => ({
      ...state,
      latitude: payload.latitude,
      longitude: payload.longitude,
      action: type,
    }),
    [CONST.SET_IS_LOCATION_PERMISSION_GRANTED]: () => ({
      ...state,
      isLocationPermissionGranted: payload,
      action: type,
    }),
    [CONST.SET_IS_SHOW_MODAL_COMING_SOON]: () => ({
      ...state,
      isShowModalComingSoon: payload,
      action: type,
    }),
    [CONST.SET_IS_MODAL_TERM_N_CONDITION]: () => ({
      ...state,
      isModalTermNCondition: payload,
      action: type,
    }),
    [CONST.SET_IS_MODAL_LS_TNC]: () => ({
      ...state,
      isModalLsTnc: payload,
      action: type,
    }),
    [CONST.SET_IS_MODAL_SHOW_LS_RIPLAY]: () => ({
      ...state,
      isModalShowRiplay: payload,
      action: type,
    }),
    [CONST.SET_PAYLOAD_SUB_SUBSCRIBE]: () => ({
      ...state,
      payloadSubSubscrib: payload,
      action: type,
    }),
    [CONST.SET_UPLOAD_IMAGE_PROGRESS]: () => ({
      ...state,
      setUploadImageProgress: payload,
    }),
    [CONST.SET_TOASTMSG]: () => ({
      ...state,
      toastMsg: payload,
    }),
    [CONST.SET_ISPROGRESS_CODEPUSH]: () => ({
      ...state,
      isProgressCodePush: payload,
    }),
    [CONST.SET_DIMENSIONS]: () => ({
      ...state,
      dimensions: payload,
      action: type,
    }),
    [CONST.SET_APP_CONFIG]: () => ({
      ...state,
      appConfig: payload,
      action: type,
    }),
    [CONST.SET_LOADING]: () => ({
      ...state,
      isLoading: payload,
      action: type,
    }),
    [CONST.SET_INTERNAL_SERVER_ERROR]: () => ({
      ...state,
      isInternalServerError: payload,
      action: type,
    }),
    [CONST.SET_BETTER_OPEN_APP]: () => ({
      ...state,
      isBetterOpenApp: payload,
      action: type,
    }),
    [CONST.SET_CUSTOMER_CARE]: () => ({
      ...state,
      isCustomerCare: payload,
      action: type,
    }),
    [CONST.SET_HOSPITAL]: () => ({
      ...state,
      isHospital: payload,
      action: type,
    }),
    [CONST.SET_FAQ_ASK]: () => ({
      ...state,
      isFaqAsk: payload,
      action: type,
    }),
    [CONST.SET_NOT_AVAILABLE]: () => ({
      ...state,
      isNotAvailable: payload,
      action: type,
    }),
    [CONST.SET_AVAILABLE_ON_MOBILE]: () => ({
      ...state,
      isAvailableOnMobile: payload,
      action: type,
    }),
    [CONST.SET_EVENT_CODE]: () => ({
      ...state,
      eventCode: payload,
      action: type,
    }),
    [CONST.SET_IS_COMING_FROM_SCREEN]: () => ({
      ...state,
      isComingFromScreen: payload,
      action: type,
    }),
    [CONST.SET_IS_COMING_FROM_DEEPLINK]: () => ({
      ...state,
      isComingFromDeepLink: payload,
      action: type,
    }),
    [CONST.SET_IS_ONLY_ADD_CARD]: () => ({
      ...state,
      isOnlyAddCard: payload,
      action: type,
    }),

    // modal lifetag
    [CONST.SET_LIFETAG_ACCESS_FAILED]: () => ({
      ...state,
      isLifetagAccessFailed: payload,
      action: type,
    }),
    [CONST.SET_LIFETAG_NOT_ACTIVE]: () => ({
      ...state,
      isLifetagNotActive: payload,
      action: type,
    }),
    [CONST.SET_LIFETAG_OUT_OFF_STOCK]: () => ({
      ...state,
      isLifetagOutOffStock: payload,
      action: type,
    }),
    [CONST.SET_LIFETAG_PAIRING_FAILED]: () => ({
      ...state,
      isLifetagPairingFailed: payload,
      action: type,
    }),
    [CONST.SET_LIFETAG_READY_TO_CONNECT]: () => ({
      ...state,
      isLifetagReadyToConnect: payload,
      action: type,
    }),
    [CONST.SET_APPSFLYER_DATA]: () => ({
      ...state,
      appsflyerData: payload,
      action: type,
    }),
    [CONST.SET_REFERRAL]: () => ({
      ...state,
      isReferral: payload,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};

const bootstrapReducer = combineReducers({
  activity,
  bootstrap,
  auth: authReducer,
  forpass: forpassReducer,
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  polis: polisReducer,
  kyc: kycReducer,
  lifesaver: lifesaverReducer,
  lifecover: lifecoverReducer,
  home: homeReducer,
  payments: paymentsReducer,
  notification: notificationReducer,
  event: eventReducer,
  subs: subsReducer,
  lifetag: lifetagReducer,
  unsubscribe: unsubscribeReducer,
  persist: persistReducer,
  // profile: profileReducer,
  // polis: polisReducer,
  updata: updataReducer,
  // subs: subsReducer,
  article: articleReducer,
  claimpolis: claimpolisReducer,
  referral: referralReducer,
});

export default bootstrapReducer;
