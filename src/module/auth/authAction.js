import * as CONST from '@cp-module/auth/authConstant';

export const setDeviceId = (payload) => ({
  type: CONST.SET_DEVICE_ID,
  payload,
});
export const setColorScheme = (payload) => ({
  type: CONST.SET_COLOR_SCHEME,
  payload,
});
export const setLang = (payload) => ({
  type: CONST.SET_LANG,
  payload,
});
export const setAuth = (payload) => ({
  type: CONST.SET_AUTH,
  payload,
});
export const setToken = (payload) => ({
  type: CONST.SET_TOKEN,
  payload,
});
export const setUserData = (payload) => ({
  type: CONST.SET_USER_DATA,
  payload,
});

export const setClearAuth = (payload) => ({
  type: CONST.SET_CLEAR_AUTH,
  payload,
});
export const setClearAuthSuccess = (payload) => ({
  type: CONST.SET_CLEAR_AUTH_SUCCESS,
  payload,
});
export const setClearAuthFailed = (payload) => ({
  type: CONST.SET_CLEAR_AUTH_FAILED,
  payload,
});

export const setLogout = (payload) => ({
  type: CONST.SET_LOGOUT,
  payload,
});
export const setLogoutSuccess = (payload) => ({
  type: CONST.SET_LOGOUT_SUCCESS,
  payload,
});
export const setLogoutFailed = (payload) => ({
  type: CONST.SET_LOGOUT_FAILED,
  payload,
});

export const setClearRefreshToken = (payload) => ({
  type: CONST.SET_CLEAR_REFRESH_TOKEN,
  payload,
});

export const setDeleteAccount = (payload) => ({
  type: CONST.SET_DELETE_ACCOUNT,
  payload,
});
export const setDeleteAccountSuccess = (payload) => ({
  type: CONST.SET_DELETE_ACCOUNT_SUCCESS,
  payload,
});
export const setDeleteAccountFailed = (payload) => ({
  type: CONST.SET_DELETE_ACCOUNT_FAILED,
  payload,
});

export const getCheckIssuedPolicy = (payload) => ({
  type: CONST.GET_CHECK_ISSUED_POLICY,
  payload,
});
export const getCheckIssuedPolicySuccess = (payload) => ({
  type: CONST.GET_CHECK_ISSUED_POLICY_SUCCESS,
  payload,
});
export const getCheckIssuedPolicyFailed = (payload) => ({
  type: CONST.GET_CHECK_ISSUED_POLICY_FAILED,
  payload,
});

export const setInvoiceId = (payload) => ({
  type: CONST.SET_INVOICE_ID,
  payload,
});

export const setPaymentId = (payload) => ({
  type: CONST.SET_PAYMENT_ID,
  payload,
});

export const setAuthVerifyPIN = (payload) => ({
  type: CONST.SET_AUTH_VERIFY_PIN,
  payload,
});
export const setAuthVerifyPINSuccess = (payload) => ({
  type: CONST.SET_AUTH_VERIFY_PIN_SUCCESS,
  payload,
});
export const setAuthVerifyPINFailed = (payload) => ({
  type: CONST.SET_AUTH_VERIFY_PIN_FAILED,
  payload,
});
export const setAuthVerifyPINClear = (payload) => ({
  type: CONST.SET_AUTH_VERIFY_PIN_CLEAR,
  payload,
});

export const setAuthRequestOTP = (payload) => ({
  type: CONST.SET_AUTH_REQUEST_OTP,
  payload,
});
export const setAuthRequestOTPSuccess = (payload) => ({
  type: CONST.SET_AUTH_REQUEST_OTP_SUCCESS,
  payload,
});
export const setAuthRequestOTPFailed = (payload) => ({
  type: CONST.SET_AUTH_REQUEST_OTP_FAILED,
  payload,
});
export const setAuthRequestOTPClear = (payload) => ({
  type: CONST.SET_AUTH_REQUEST_OTP_CLEAR,
  payload,
});

export const setAuthCreatePIN = (payload) => ({
  type: CONST.SET_AUTH_CREATE_PIN,
  payload,
});
export const setAuthCreatePINSuccess = (payload) => ({
  type: CONST.SET_AUTH_CREATE_PIN_SUCCESS,
  payload,
});
export const setAuthCreatePINFailed = (payload) => ({
  type: CONST.SET_AUTH_CREATE_PIN_FAILED,
  payload,
});
export const setAuthCreatePINClear = (payload) => ({
  type: CONST.SET_AUTH_CREATE_PIN_CLEAR,
  payload,
});

export const setAuthVerifyOTP = (payload) => ({
  type: CONST.SET_AUTH_VERIFY_OTP,
  payload,
});
export const setAuthVerifyOTPSuccess = (payload) => ({
  type: CONST.SET_AUTH_VERIFY_OTP_SUCCESS,
  payload,
});
export const setAuthVerifyOTPFailed = (payload) => ({
  type: CONST.SET_AUTH_VERIFY_OTP_FAILED,
  payload,
});
export const setAuthVerifyOTPClear = (payload) => ({
  type: CONST.SET_AUTH_VERIFY_OTP_CLEAR,
  payload,
});
