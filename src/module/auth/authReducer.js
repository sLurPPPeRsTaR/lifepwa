import * as CONST from '@cp-module/auth/authConstant';
import * as STATE from '@cp-module/auth/authInitialState';
import _ from 'lodash';

const authInitialState = {
  ..._.cloneDeep(STATE.authInitialState),
  ..._.cloneDeep(STATE.setAuthVerifyPINInitialState),
  ..._.cloneDeep(STATE.setAuthRequestOTPInitialState),
  ..._.cloneDeep(STATE.setAuthCreatePINInitialState),
  action: '',
};

export const authReducer = (state = authInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.SET_LANG]: () => ({
      ...state,
      lang: payload,
      action: type,
    }),
    [CONST.SET_AUTH]: () => ({
      ...state,
      userData: {
        ...state.userData,
        ...payload.userData,
      },
      token: {
        ...state.token,
        ...payload.token,
      },
      action: type,
    }),
    [CONST.SET_TOKEN]: () => ({
      ...state,
      token: {
        ...state.token,
        ...payload.token,
      },
      action: type,
    }),
    [CONST.SET_USER_DATA]: () => ({
      ...state,
      userData: {
        ...state.userData,
        ...payload.userData,
      },
      action: type,
    }),
    [CONST.SET_CLEAR_AUTH_SUCCESS]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_CLEAR_AUTH_FAILED]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_LOGOUT_SUCCESS]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_LOGOUT_FAILED]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_CLEAR_REFRESH_TOKEN]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_DEVICE_ID]: () => ({
      ...state,
      userData: {
        ...state.userData,
        deviceId: payload,
      },
      action: type,
    }),
    [CONST.SET_COLOR_SCHEME]: () => ({
      ...state,
      colorScheme: payload,
      action: type,
    }),
    [CONST.SET_DELETE_ACCOUNT_SUCCESS]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_DELETE_ACCOUNT_FAILED]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.GET_CHECK_ISSUED_POLICY]: () => ({
      ...state,
      action: type,
    }),
    [CONST.GET_CHECK_ISSUED_POLICY_SUCCESS]: () => ({
      ...state,
      userData: {
        ...state.userData,
        kkpmFlag: [...payload.data],
      },
      action: type,
    }),
    [CONST.GET_CHECK_ISSUED_POLICY_FAILED]: () => ({
      ...state,
      action: type,
    }),
    [CONST.SET_INVOICE_ID]: () => ({
      ...state,
      userData: {
        ...state.userData,
        ...{
          invoiceId: payload.invoiceId,
          reffNo: payload.reffNo,
          policyNumber: payload.policyNumber,
          invoiceMaster: payload.invoiceMaster,
          onFailed: payload.onFailed,
          planCode: payload.planCode,
          type:payload.type,
          eventId:payload.eventId
        },
      },
      action: type,
    }),
    [CONST.SET_PAYMENT_ID]: () => ({
      ...state,
      userData: {
        ...state.userData,
        paymentId: payload,
      },
      action: type,
    }),
    // SET_AUTH_VERIFY_PIN
    [CONST.SET_AUTH_VERIFY_PIN]: () => ({
      ...state,
      setAuthVerifyPINParam: payload,
      setAuthVerifyPINFetch: true,
      action: type,
    }),
    [CONST.SET_AUTH_VERIFY_PIN_SUCCESS]: () => ({
      ...state,
      setAuthVerifyPINResponse: payload,
      setAuthVerifyPINFetch: false,
      action: type,
    }),
    [CONST.SET_AUTH_VERIFY_PIN_FAILED]: () => ({
      ...state,
      setAuthVerifyPINFailed: payload,
      setAuthVerifyPINFetch: false,
      action: type,
    }),
    [CONST.SET_AUTH_VERIFY_PIN_CLEAR]: () => ({
      ...state,
      ...STATE.setAuthVerifyPINInitialState,
      action: type,
    }),

    // SET_AUTH_REQUEST_OTP
    [CONST.SET_AUTH_REQUEST_OTP]: () => ({
      ...state,
      setAuthRequestOTPParam: payload,
      setAuthRequestOTPFetch: true,
      action: type,
    }),
    [CONST.SET_AUTH_REQUEST_OTP_SUCCESS]: () => ({
      ...state,
      setAuthRequestOTPResponse: payload,
      setAuthRequestOTPFetch: false,
      action: type,
    }),
    [CONST.SET_AUTH_REQUEST_OTP_FAILED]: () => ({
      ...state,
      setAuthRequestOTPFailed: payload,
      setAuthRequestOTPFetch: false,
      action: type,
    }),
    [CONST.SET_AUTH_REQUEST_OTP_CLEAR]: () => ({
      ...state,
      ...STATE.setAuthRequestOTPInitialState,
      action: type,
    }),

    // SET_AUTH_CREATE_PIN
    [CONST.SET_AUTH_CREATE_PIN]: () => ({
      ...state,
      setAuthCreatePINParam: payload,
      setAuthCreatePINFetch: true,
      action: type,
    }),
    [CONST.SET_AUTH_CREATE_PIN_SUCCESS]: () => ({
      ...state,
      setAuthCreatePINResponse: payload,
      setAuthCreatePINFetch: false,
      action: type,
    }),
    [CONST.SET_AUTH_CREATE_PIN_FAILED]: () => ({
      ...state,
      setAuthCreatePINFailed: payload,
      setAuthCreatePINFetch: false,
      action: type,
    }),
    [CONST.SET_AUTH_CREATE_PIN_CLEAR]: () => ({
      ...state,
      ...STATE.setAuthCreatePINInitialState,
      action: type,
    }),

    // SET_AUTH_REQUEST_OTP
    [CONST.SET_AUTH_VERIFY_OTP]: () => ({
      ...state,
      setAuthVerifyOTPParam: payload,
      setAuthVerifyOTPFetch: true,
      action: type,
    }),
    [CONST.SET_AUTH_VERIFY_OTP_SUCCESS]: () => ({
      ...state,
      setAuthVerifyOTPResponse: payload,
      setAuthVerifyOTPFetch: false,
      action: type,
    }),
    [CONST.SET_AUTH_VERIFY_OTP_FAILED]: () => ({
      ...state,
      setAuthVerifyOTPFailed: payload,
      setAuthVerifyOTPFetch: false,
      action: type,
    }),
    [CONST.SET_AUTH_VERIFY_OTP_CLEAR]: () => ({
      ...state,
      ...STATE.setAuthVerifyOTPInitialState,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
