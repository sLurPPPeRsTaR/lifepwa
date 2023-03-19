import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/auth/authConstant';
import {
  getCheckIssuedPolicyApi,
  setAuthCreatePINApi,
  setAuthRequestOTPApi,
  setAuthVerifyOTPApi,
  setAuthVerifyPINApi,
  setClearAuthApi,
  setDeleteAccountApi,
  setLogoutApi,
} from '@cp-module/auth/authApi';
import {
  getCheckIssuedPolicyFailed,
  getCheckIssuedPolicySuccess,
  setClearAuthFailed,
  setClearAuthSuccess,
  setDeleteAccountFailed,
  setDeleteAccountSuccess,
  setLogoutFailed,
  setLogoutSuccess,
  setAuthVerifyPINSuccess,
  setAuthVerifyPINFailed,
  setAuthRequestOTPSuccess,
  setAuthRequestOTPFailed,
  setAuthCreatePINSuccess,
  setAuthCreatePINFailed,
  setAuthVerifyOTPSuccess,
  setAuthVerifyOTPFailed,
} from '@cp-module/auth/authAction';

function* setClearAuth(params) {
  try {
    const response = yield call(setClearAuthApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(setClearAuthSuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(setClearAuthFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setClearAuthFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    yield put(setClearAuthFailed(error.response));
  }
}

function* setLogout(params) {
  try {
    const response = yield call(setLogoutApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(setLogoutSuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(setLogoutFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLogoutFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    yield put(setLogoutFailed(error.response));
  }
}

function* setDeleteAccount(params) {
  try {
    const response = yield call(setDeleteAccountApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(setDeleteAccountSuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(setDeleteAccountFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setDeleteAccountFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    yield put(setDeleteAccountFailed(error.response));
  }
}

function* getCheckIssuedPolicy(params) {
  try {
    const response = yield call(getCheckIssuedPolicyApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(getCheckIssuedPolicySuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(getCheckIssuedPolicyFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckIssuedPolicyFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    yield put(getCheckIssuedPolicyFailed(error.response));
  }
}

// setAuthVerifyPIN
function* setAuthVerifyPIN(params) {
  try {
    const response = yield call(setAuthVerifyPINApi, params.payload);
    yield put(setAuthVerifyPINSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setAuthVerifyPINFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setAuthVerifyPINFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// setAuthRequestOTP
function* setAuthRequestOTP(params) {
  try {
    const response = yield call(setAuthRequestOTPApi, params.payload);
    yield put(setAuthRequestOTPSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setAuthRequestOTPFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setAuthRequestOTPFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// setAuthCreatePIN
function* setAuthCreatePIN(params) {
  try {
    const response = yield call(setAuthCreatePINApi, params.payload);
    yield put(setAuthCreatePINSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setAuthCreatePINFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setAuthCreatePINFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// setAuthVerifyPIN
function* setAuthVerifyOTP(params) {
  try {
    const response = yield call(setAuthVerifyOTPApi, params.payload);
    yield put(setAuthVerifyOTPSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setAuthVerifyOTPFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setAuthVerifyOTPFailed(error?.response?.data));
        break;
      default:
    }
  }
}

export default [
  takeLatest(CONST.SET_CLEAR_AUTH, setClearAuth),
  takeLatest(CONST.SET_LOGOUT, setLogout),
  takeLatest(CONST.SET_DELETE_ACCOUNT, setDeleteAccount),
  takeLatest(CONST.GET_CHECK_ISSUED_POLICY, getCheckIssuedPolicy),
  takeLatest(CONST.SET_AUTH_VERIFY_PIN, setAuthVerifyPIN),
  takeLatest(CONST.SET_AUTH_REQUEST_OTP, setAuthRequestOTP),
  takeLatest(CONST.SET_AUTH_CREATE_PIN, setAuthCreatePIN),
  takeLatest(CONST.SET_AUTH_VERIFY_OTP, setAuthVerifyOTP),
];
