import axios from 'axios';
import {
  API,
  BASE_URL,
  BASE_URL_LIVENESS,
  DEVICE_PLATFORM,
  RESPONSE_STATUS,
  TOAST,
  BASE_URL_CUSTOMER_DEV
} from '@cp-util/constant';
import { store } from '@cp-config/Store';
import { setToken, setClearRefreshToken } from '@cp-module/auth/authAction';
// import crashlytics from '@react-native-firebase/crashlytics';
import {
  setInternalServerError,
  setLoading,
  setToastMsg,
} from '@cp-bootstrap/bootstrapAction';
import _ from 'lodash';

export const api = axios.create({
  timeout: 35000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-store',
  },
  baseURL: BASE_URL,
});

export const api_customer = axios.create({
  timeout: 35000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-store',
  },
  baseURL: BASE_URL_CUSTOMER_DEV || BASE_URL,
});

export const apiLiveness = axios.create({
  timeout: 10000,
  headers: {
    'X-ADVAI-KEY': 'c73bebba7464e149',
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-store',
  },
  baseURL: BASE_URL_LIVENESS,
});

api.interceptors.request.use(
  (request) => {
    if ('__DEV__') {
      // console.log('<<< request: ', request);
    }
    const token = store.getState().auth.token.access_token;
    const { lang } = store.getState().auth;
    request.headers.Language = lang;
    if (token !== '') {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    if ('__DEV__') {
      //console.log('>>> error: ', error);
    }
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    if ('__DEV__') {
      if (response.config.url != '/v1/user/checkPhoneNumberAndEmail') {
        // console.log('<<< Response: ', response);
      }
    }
    return response;
  },
  (error) => {
    if ('__DEV__') {
      //console.log('>>> error: ', error);
    }
    const { isLoading } = store.getState().bootstrap;
    if (isLoading) {
      store.dispatch(setLoading(false));
    }
    const originalRequest = error.config;
    if (error?.response?.status === RESPONSE_STATUS.ERR_NETWORK) {
      store.dispatch(
        setToastMsg({
          type: TOAST.type.error,
          text1: 'Internet Kamu sedang bermasalah',
        }),
      );
    }
    if (
      error?.response?.status === RESPONSE_STATUS.ERROR ||
      error?.response?.status === RESPONSE_STATUS.ERR_BAD_RESPONSE
    ) {
      // store.dispatch('');
      // store.dispatch(setInternalServerError(true));
    }
    if (
      error?.response?.status === RESPONSE_STATUS.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const { mobilePhoneNumber, email, deviceId } =
        store.getState().auth.userData;
      const refreshToken = store.getState().auth.token.refresh_token;
      const payload = {
        id: mobilePhoneNumber || email,
        refreshToken: refreshToken,
        deviceId: deviceId,
      };
      // crashlytics().setAttribute(
      //   API.USER.refreshToken,
      //   JSON.stringify(payload),
      // );
      const isPayloadNotEmpty = _.values(payload).every((item) => item);
      if (!isPayloadNotEmpty) {
        setTimeout(() => {
          store.dispatch(setClearRefreshToken());
        }, 1000);
        return null;
      }

      return api
        .post(`${BASE_URL}${API.USER.refreshToken}`, payload, {
          headers: {
            'x-no-retry': true,
          },
        })
        .then((res) => {
          if (res?.status === RESPONSE_STATUS.SUCCESS) {
            store.dispatch(
              setToken({
                token: res?.data?.data?.token,
              }),
            );
            return api(originalRequest);
          }
          return null;
        })
        .catch(() => {
          setTimeout(() => {
            store.dispatch(setClearRefreshToken());
          }, 1000);
          return null;
        });
    }
    return Promise.reject(error);
  },
);
