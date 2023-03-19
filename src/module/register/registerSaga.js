import { takeLatest, put, call, select } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import {
  getCheckLinkPolicyNoApi,
  getInquiryPolicyNoApi,
  setRegisterApi,
  setRegisterSocialApi,
} from '@cp-module/register/registerApi';
import * as CONST from '@cp-module/register/registerConstant';
import {
  setRequestOtpSuccess,
  setRequestOtpFailed,
  setRegisterSuccess,
  setRegisterFailed,
  setRegisterSocialSuccess,
  setRegisterSocialFailed,
  getInquiryPolicyNoSuccess,
  getInquiryPolicyNoFailed,
  getCheckLinkPolicyNoSuccess,
  getCheckLinkPolicyNoFailed,
} from '@cp-module/register/registerAction';
import { setAuth } from '@cp-module-auth/authAction';
import { setRequestOtpApi } from '@cp-module-auth/authApi';
import { eventAppsflyer } from '@cp-util/func';

function* setRequestOtp(params) {
  try {
    const response = yield call(setRequestOtpApi, params.payload);
    yield put(setRequestOtpSuccess({ message: 'SUCCESS' }));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setRequestOtpFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setRequestOtpFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setRegister(params) {
  const setRequestOtpParam = yield select(
    (state) => state.register.setRequestOtpParam,
  );
  const deviceId = yield select((state) => state.auth.userData.deviceId);
  const { action, ...sendData } = setRequestOtpParam;
  try {
    const response = yield call(setRegisterApi, {
      ...sendData,
      ...params.payload,
      deviceId,
    });
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
    yield put(setRegisterSuccess(response.data));
    yield eventAppsflyer({
      eventName: 'af_complete_registration',
      payload: {
        af_user_id: response?.data?.data?.userData?.userId,
        af_channel: 'pwa',
      },
    });
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setRegisterFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setRegisterFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setRegisterSocial(params) {
  try {
    const response = yield call(setRegisterSocialApi, params.payload);
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
    yield eventAppsflyer({
      eventName: 'af_complete_registration',
      payload: {
        af_user_id: response?.data?.userData?.userId,
        af_channel: 'pwa',
      },
    });
    yield put(setRegisterSocialSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setRegisterSocialFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setRegisterSocialFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getInquiryPolicyNo(params) {
  try {
    const response = yield call(getInquiryPolicyNoApi, params.payload);
    yield put(getInquiryPolicyNoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getInquiryPolicyNoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getInquiryPolicyNoFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getCheckLinkPolicyNo(params) {
  try {
    const response = yield call(getCheckLinkPolicyNoApi, params.payload);
    yield put(getCheckLinkPolicyNoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCheckLinkPolicyNoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckLinkPolicyNoFailed(error?.response?.data));
        break;
      default:
    }
  }
}

export default [
  takeLatest(CONST.SET_REGISTER_OTP, setRequestOtp),
  takeLatest(CONST.SET_REGISTER, setRegister),
  takeLatest(CONST.SET_REGISTER_SOCIAL, setRegisterSocial),
  takeLatest(CONST.GET_INQUIRY_POLICY_NO, getInquiryPolicyNo),
  takeLatest(CONST.GET_CHECK_LINK_POLICY_NO, getCheckLinkPolicyNo),
];
