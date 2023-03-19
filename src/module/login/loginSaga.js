import { takeLatest, put, call } from 'redux-saga/effects';
import { setAuth } from '@cp-module/auth/authAction';
import { setLoginApi } from '@cp-module/auth/authApi';
import * as CONST from '@cp-module/login/loginConstant';
import {
  setLoginSuccess,
  setLoginFailed,
  setLoginSocialSuccess,
  setLoginSocialFailed,
} from '@cp-module/login/loginAction';
import { setLoginSocialApi } from '@cp-module/login/loginApi';
import { RESPONSE_STATUS } from '@cp-util/constant';
import { eventAppsflyer } from '@cp-util/func';

function* setLogin(params) {
  try {
    const response = yield call(setLoginApi, params.payload);

    yield put(
      setAuth({
        userData: {
          userId: response?.data?.data?.userData?.userId,
          email: response?.data?.data?.userData?.email,
          name: response?.data?.data?.userData?.name,
          thumbnailPhotoKey: response?.data?.data?.userData?.thumbnailPhotoKey,
          isEmailVerified: response?.data?.data?.userData?.isEmailVerified,
          alreadySetPin: response?.data?.data?.userData?.alreadySetPin,
          authType: response?.data?.data?.userData?.authType,
          alreadyKYC: response?.data?.data?.userData?.alreadyKYC,
          alreadyLivenessTest:
            response?.data?.data?.userData?.alreadyLivenessTest,
          isIssuedPolicy: response?.data?.data?.userData?.isIssuedPolicy,
          issuedPolicyLastDate:
            response?.data?.data?.userData?.issuedPolicyLastDate,
          isUploadedKKAndKTP:
            response?.data?.data?.userData?.isUploadedKKAndKTP,
          mobilePhoneNumber: response?.data?.data?.userData?.mobilePhoneNumber,
          userParty: response?.data?.data?.userData?.userParty,
          ekycId: response?.data?.data?.userData?.ekycId,
          alreadySetMPin: response?.data?.data?.userData?.alreadySetMPin,
          isReKYC: response?.data?.data?.userData?.isReKYC,
          isReLivenessTest: response?.data?.data?.userData?.isReLivenessTest,
          isReUploadIdCard: response?.data?.data?.userData?.isReUploadIdCard,
          isReLivenessTestAndReUploadIdCard:
            response?.data?.data?.userData?.isReLivenessTestAndReUploadIdCard,
          registerDate: response?.data?.data?.userData?.registerDate,
        },
        token: response?.data?.data?.token,
      }),
    );
    yield put(setLoginSuccess(response.data));
    yield eventAppsflyer({
      eventName: 'af_login',
      payload: {
        af_user_id: response?.data?.data?.userData?.userId,
        af_channel: 'pwa',
      },
    });
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLoginFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLoginFailed(error?.response?.data));
        break;
      default:
        yield put(setLoginFailed(error?.response?.data));
        break;
    }
  }
}

function* setLoginSocial(params) {
  try {
    const response = yield call(setLoginSocialApi, params.payload);
    yield put(
      setAuth({
        userData: {
          userId: response?.data?.userData?.userId,
          email: response?.data?.userData?.email,
          name: response?.data?.userData?.name,
          thumbnailPhotoKey: response?.data?.userData?.thumbnailPhotoKey,
          isEmailVerified: response?.data?.userData?.isEmailVerified,
          alreadySetPin: response?.data?.userData?.alreadySetPin,
          authType: response?.data?.userData?.authType,
          alreadyKYC: response?.data?.userData?.alreadyKYC,
          alreadyLivenessTest: response?.data?.userData?.alreadyLivenessTest,
          isIssuedPolicy: response?.data?.userData?.isIssuedPolicy,
          issuedPolicyLastDate: response?.data?.userData?.issuedPolicyLastDate,
          isUploadedKKAndKTP: response?.data?.userData?.isUploadedKKAndKTP,
          mobilePhoneNumber: response?.data?.userData?.mobilePhoneNumber,
          userParty: response?.data?.userData?.userParty,
          ekycId: response?.data?.userData?.ekycId,
          alreadySetMPin: response?.data?.userData?.alreadySetMPin,
          isReKYC: response?.data?.userData?.isReKYC,
          isReLivenessTest: response?.data?.userData?.isReLivenessTest,
          isReUploadIdCard: response?.data?.userData?.isReUploadIdCard,
          isReLivenessTestAndReUploadIdCard:
            response?.data?.userData?.isReLivenessTestAndReUploadIdCard,
          registerDate: response?.data?.userData?.registerDate,
        },
        token: response?.data?.token,
      }),
    );
    yield put(setLoginSocialSuccess(response.data));
    yield eventAppsflyer({
      eventName: 'af_login',
      payload: {
        af_user_id: response?.data?.userData?.userId,
        af_channel: 'pwa',
      },
    });
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLoginSocialFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLoginSocialFailed(error?.response?.data));
        break;
      default:
        yield put(setLoginSocialFailed(error?.response?.data));
        break;
    }
  }
}

export default [
  takeLatest(CONST.SET_LOGIN, setLogin),
  takeLatest(CONST.SET_LOGIN_SOCIAL, setLoginSocial),
];
