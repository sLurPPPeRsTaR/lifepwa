import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { POLICY_STATUS, RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/profile/profileConstant';
import {
  setPersonalDataSuccess,
  setPersonalDataFailed,
  setUserIdentitySuccess,
  setUserIdentityFailed,
  getProfileDeviceSuccess,
  getProfileDeviceFailed,
  setProfileDeviceSuccess,
  setProfileDeviceFailed,
  getPersonalDataSuccess,
  getPersonalDataFailed,
  getUserIdentitySuccess,
  getUserIdentityFailed,
  setCreatePinSuccess,
  setCreatePinFailed,
  setChangePinSuccess,
  setChangePinFailed,
  getVerifyPinSuccess,
  getVerifyPinFailed,
  setChangePassSuccess,
  setChangePassFailed,
  setPhoneNumberSuccess,
  setPhoneNumberFailed,
  setEmailSuccess,
  setEmailFailed,
  setUploadProfileSuccess,
  setUploadProfileFailed,
  setDeleteFotoProfileSuccess,
  setDeleteFotoProfileFailed,
  getCSInfoSuccess,
  getCSInfoFailed,
  getPersonalDataProvinceSuccess,
  getPersonalDataProvinceFailed,
  getPersonalDataCityFailed,
  getPersonalDataCitySuccess,
  getPersonalDataDistrictSuccess,
  getPersonalDataDistrictFailed,
  setProfileRequestOtpSuccess,
  setProfileRequestOtpFailed,
  setProfileVerifyOtpSuccess,
  setProfileVerifyOtpFailed,
  setProfileFaqSuccess,
  setProfileFaqFailed,
  setProfileNoLoginFaqSuccess,
  setProfileNoLoginFaqFailed,
  getSubscriptionsSuccess,
  getSubscriptionsFailed,
  getSubscriptionDetailSuccess,
  getSubscriptionDetailFailed,
  setResubscribeSuccess,
  setResubscribeFailed,
  setDeleteAccountRequestOtpSuccess,
  setDeleteAccountRequestOtpFailed,
  setDeleteAccountVerifyOtpSuccess,
  setDeleteAccountVerifyOtpFailed,
  getBillsSuccess,
  getBillsFailed,
  getAddressListSuccess,
  getAddressListFailed,
  setUpdateAddressSuccess,
  setUpdateAddressFailed,
  setSaveAddressSuccess,
  setSaveAddressFailed,
  setDeleteAddressSuccess,
  setDeleteAddressFailed,
  getPersonalDataSubDistrictSuccess,
  getPersonalDataSubDistrictFailed,
  getProfileUserPartySuccess,
  getProfileUserPartyFailed,
  getProfileReferralSuccess,
  getProfileReferralFailed,
  getContactSuccess,
  getContactFailed,
} from '@cp-module/profile/profileAction';
import {
  setPersonalDataApi,
  getPersonalDataApi,
  setChangePassApi,
} from '@cp-module/auth/authApi';
import {
  getProfileDeviceApi,
  getVerifyPinApi,
  setChangePinApi,
  setCreatePinApi,
  setProfileDeviceApi,
  setPhoneNumberApi,
  setEmailApi,
  setUploadProfileApi,
  setThumbnailApi,
  setUserFotoApi,
  setDeleteFotoProfileApi,
  setDeleteUserTableApi,
  getCSInfoApi,
  getPersonalDataProvinceApi,
  getPersonalDataCityApi,
  getPersonalDataDistrictApi,
  setProfileRequestOtpApi,
  setProfileVerifyOtpApi,
  setProfileFaqApi,
  setProfileNoLoginFaqApi,
  getSubscriptionsApi,
  getSubscriptionDetailApi,
  getUserIdentityApi,
  setResubscribeApi,
  setDeleteAccountRequestOtpApi,
  setDeleteAccountVerifyOtpApi,
  getBillsApi,
  getAddressListApi,
  setDeleteAddressApi,
  setUpdateAddressApi,
  setSaveAddressApi,
  getPersonalDataSubDistrictApi,
  setProfileRequestOtpNoLoginApi,
  setProfileVerifyOtpNoLoginApi,
  getProfileUserPartyApi,
  getProfileReferralApi,
  getContactApi,
} from '@cp-module/profile/profileApi';
import { setUserData } from '@cp-module/auth/authAction';
import { setProgressWatcher, setUploader } from '@cp-util/uploader';

function* setPersonalData(params) {
  try {
    const response = yield call(setPersonalDataApi, params.payload);
    yield put(
      setUserData({
        userData: {
          name: params?.payload?.name,
        },
      }),
    );
    yield put(setPersonalDataSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setPersonalDataFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setPersonalDataFailed(error?.response?.data));
        break;
      default:
        yield put(setPersonalDataFailed(error?.response?.data));
        break;
    }
  }
}

function* getProfileDevice(params) {
  try {
    const response = yield call(getProfileDeviceApi, params.payload);
    yield put(getProfileDeviceSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProfileDeviceFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProfileDeviceFailed(error?.response?.data));
        break;
      default:
        yield put(getProfileDeviceFailed(error?.response?.data));
        break;
    }
  }
}

function* setProfileDevice(params) {
  try {
    const response = yield call(setProfileDeviceApi, params.payload);
    yield put(setProfileDeviceSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setProfileDeviceFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setProfileDeviceFailed(error?.response?.data));
        break;
      default:
        yield put(setProfileDeviceFailed(error?.response?.data));
        break;
    }
  }
}

function* getPersonalData(params) {
  try {
    const response = yield call(getPersonalDataApi, params.payload);
    yield put(getPersonalDataSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalDataFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalDataFailed(error?.response?.data));
        break;
      default:
        yield put(getPersonalDataFailed(error?.response?.data));
        break;
    }
  }
}

function* getUserIdentity(params) {
  try {
    const response = yield call(getUserIdentityApi, params.payload);
    yield put(getUserIdentitySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUserIdentityFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUserIdentityFailed(error?.response?.data));
        break;
      default:
        yield put(getUserIdentityFailed(error?.response?.data));
        break;
    }
  }
}

function* setCreatePin(params) {
  try {
    const response = yield call(setCreatePinApi, params.payload);
    yield put(setCreatePinSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setCreatePinFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setCreatePinFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setChangePin(params) {
  try {
    const response = yield call(setChangePinApi, params.payload);
    yield put(setChangePinSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setChangePinFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setChangePinFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getVerifyPin(params) {
  try {
    const response = yield call(getVerifyPinApi, params.payload);
    yield put(getVerifyPinSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getVerifyPinFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getVerifyPinFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setPhoneNumber(params) {
  try {
    const response = yield call(setPhoneNumberApi, params.payload);
    yield put(setPhoneNumberSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setPhoneNumberFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setPhoneNumberFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// email
function* setEmail(params) {
  try {
    const response = yield call(setEmailApi, params.payload);
    yield put(setEmailSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setEmailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setEmailFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// -- Upload Profile -- //
function* setUploadProfile(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload,
      setUploadProfileApi,
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    if (response?.data?.data?.userMetadata?.key) {
      const setThumbnailRes = yield call(setThumbnailApi, {
        fileName: response?.data?.data?.userMetadata?.fileName,
        key: response?.data?.data?.userMetadata?.key,
        height: '300',
        width: '300',
        directory: 'thumbnail',
        isPublic: 'false',
      });
      const setUserFotoRes = yield call(setUserFotoApi, {
        photoKey: response?.data?.data?.userMetadata?.key,
        thumbnailPhotoKey: setThumbnailRes?.data?.data?.userMetadata?.key,
      });
      if (setUserFotoRes.status === RESPONSE_STATUS.SUCCESS) {
        yield put(
          setUserData({
            userData: {
              thumbnailPhotoKey: setThumbnailRes?.data?.data?.userMetadata?.key,
            },
          }),
        );
        yield put(setUploadProfileSuccess(response.data));
      }
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUploadProfileFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUploadProfileFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setDeleteFotoProfile(params) {
  try {
    const res = yield call(setDeleteFotoProfileApi, params.payload);
    if (res.status === RESPONSE_STATUS.SUCCESS) {
      yield put(
        setUserData({
          userData: {
            thumbnailPhotoKey: '',
          },
        }),
      );
      yield call(setDeleteUserTableApi);
      yield put(setDeleteFotoProfileSuccess());
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setDeleteFotoProfileFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setDeleteFotoProfileFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getCSInfo(params) {
  try {
    const response = yield call(getCSInfoApi, params.payload);
    yield put(getCSInfoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCSInfoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCSInfoFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPersonalDataProvince(params) {
  try {
    const response = yield call(getPersonalDataProvinceApi, params.payload);
    yield put(getPersonalDataProvinceSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalDataProvinceFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalDataProvinceFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPersonalDataCity(params) {
  try {
    const response = yield call(getPersonalDataCityApi, params.payload);
    yield put(getPersonalDataCitySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalDataCityFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalDataCityFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPersonalDataDistrict(params) {
  try {
    const response = yield call(getPersonalDataDistrictApi, params.payload);
    yield put(getPersonalDataDistrictSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalDataDistrictFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalDataDistrictFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPersonalDataSubDistrict(params) {
  try {
    const response = yield call(getPersonalDataSubDistrictApi, params.payload);
    yield put(getPersonalDataSubDistrictSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalDataSubDistrictFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalDataSubDistrictFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Request OTP
function* setProfileRequestOtp(params) {
  try {
    if (params?.payload?.isNoLogin) {
      const response = yield call(
        setProfileRequestOtpNoLoginApi,
        params.payload.data,
      );
      yield put(setProfileRequestOtpSuccess(response.data));
    } else {
      const response = yield call(setProfileRequestOtpApi, params.payload);
      yield put(setProfileRequestOtpSuccess(response.data));
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setProfileRequestOtpFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setProfileRequestOtpFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Verify OTP
function* setProfileVerifyOtp(params) {
  try {
    if (params?.payload?.isNoLogin) {
      const response = yield call(
        setProfileVerifyOtpNoLoginApi,
        params.payload.data,
      );
      yield put(setProfileVerifyOtpSuccess(response.data));
    } else {
      const response = yield call(setProfileVerifyOtpApi, params.payload);
      yield put(setProfileVerifyOtpSuccess(response.data));
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setProfileVerifyOtpFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setProfileVerifyOtpFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// FAQ
function* setProfileFaq(params) {
  try {
    const response = yield call(setProfileFaqApi, params.payload);
    yield put(setProfileFaqSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setProfileFaqFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setProfileFaqFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// NOLOGINFAQ
function* setProfileNoLoginFaq(params) {
  try {
    const response = yield call(setProfileNoLoginFaqApi, params.payload);
    yield put(setProfileNoLoginFaqSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setProfileNoLoginFaqFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setProfileNoLoginFaqFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setChangePass(params) {
  try {
    const response = yield call(setChangePassApi, params.payload);
    yield put(setChangePassSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setChangePassFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setChangePassFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getSubscriptions(params) {
  try {
    const response = yield call(getSubscriptionsApi, params.payload);
    const getActiveSubs = response?.data?.data?.filter((element) => {
      return (
        element?.status === POLICY_STATUS.active ||
        element?.status === POLICY_STATUS.gracePeriod
      );
    });
    const getInActiveSubs = response?.data?.data?.filter((element) => {
      return element?.status === POLICY_STATUS.lapse;
    });
    yield put(
      getSubscriptionsSuccess({
        getActiveSubs,
        getInActiveSubs,
      }),
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getSubscriptionsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getSubscriptionsFailed(error?.response?.data));
        break;
      default:
        yield put(getSubscriptionsFailed(error?.response?.data));
    }
  }
}

function* getSubscriptionDetail(params) {
  try {
    const response = yield call(getSubscriptionDetailApi, params.payload);
    yield put(
      getSubscriptionDetailSuccess({
        ...response?.data?.data,
        planName: response?.data?.data?.planName?.replace(/ /g, ''),
      }),
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getSubscriptionDetailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getSubscriptionDetailFailed(error?.response?.data));
        break;
      default:
        yield put(getSubscriptionDetailFailed(error?.response?.data));
    }
  }
}

function* setResubscribe(params) {
  try {
    const response = yield call(setResubscribeApi, params.payload);
    yield put(setResubscribeSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setResubscribeFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setResubscribeFailed(error?.response?.data));
        break;
      default:
        yield put(setResubscribeFailed(error?.response?.data));
    }
  }
}

function* setDeleteAccountRequestOtp(params) {
  try {
    const response = yield call(setDeleteAccountRequestOtpApi, params.payload);
    yield put(setDeleteAccountRequestOtpSuccess(response.data));
  } catch (error) {
    yield put(setDeleteAccountRequestOtpFailed(error?.response?.data));
  }
}

function* setDeleteAccountVerifyOtp(params) {
  try {
    const response = yield call(setDeleteAccountVerifyOtpApi, params.payload);
    yield put(setDeleteAccountVerifyOtpSuccess(response.data));
  } catch (error) {
    yield put(setDeleteAccountVerifyOtpFailed(error?.response?.data));
  }
}

function* getBills(params) {
  try {
    const response = yield call(getBillsApi, params.payload);
    yield put(getBillsSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getBillsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getBillsFailed(error?.response?.data));
        break;
      default:
        yield put(getBillsFailed(error?.response?.data));
    }
  }
}

// ADDRESS LIST
function* getAddressList(params) {
  try {
    const response = yield call(getAddressListApi, params.payload);
    yield put(getAddressListSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getAddressListFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getAddressListFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// SAVE ADDRESS
function* setSaveAddress(params) {
  try {
    const response = yield call(setSaveAddressApi, params.payload);
    yield put(setSaveAddressSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setSaveAddressFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setSaveAddressFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// UPDATE ADDRESS
function* setUpdateAddress(params) {
  try {
    const response = yield call(setUpdateAddressApi, params.payload);
    yield put(setUpdateAddressSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdateAddressFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdateAddressFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// DELETE ADDRESS
function* setDeleteAddress(params) {
  try {
    const response = yield call(setDeleteAddressApi, params.payload);
    yield put(setDeleteAddressSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setDeleteAddressFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setDeleteAddressFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// userPArty
function* getProfileUserParty(params) {
  try {
    const response = yield call(getProfileUserPartyApi, params.payload);
    yield put(getProfileUserPartySuccess(response.data));
    yield put(
      setUserData({
        userData: {
          userParty: response?.data?.data,
        },
      }),
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProfileUserPartyFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProfileUserPartyFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// GET REFERRAL
function* getProfileReferral(params) {
  try {
    const response = yield call(getProfileReferralApi, params.payload);
    yield put(getProfileReferralSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProfileReferralFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProfileReferralFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// GET CONTACT
function* getContact(params) {
  try {
    const response = yield call(getContactApi, params.payload);
    yield put(getContactSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getContactFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getContactFailed(error?.response?.data));
        break;
      default:
    }
  }
}

export default [
  takeLatest(CONST.SET_PERSONAL_DATA, setPersonalData),
  takeLatest(CONST.GET_PERSONAL_DATA, getPersonalData),
  takeLatest(CONST.GET_USER_IDENTITY, getUserIdentity),
  takeLatest(CONST.GET_PROFILEDEVICE, getProfileDevice),
  takeLatest(CONST.SET_PROFILEDEVICE, setProfileDevice),
  takeLatest(CONST.SET_CREATE_PIN, setCreatePin),
  takeLatest(CONST.SET_CHANGE_PIN, setChangePin),
  takeLatest(CONST.GET_VERIFY_PIN, getVerifyPin),
  takeLatest(CONST.SET_CHANGE_PASS, setChangePass),
  takeLatest(CONST.SET_PHONE_NUMBER, setPhoneNumber),
  takeLatest(CONST.SET_EMAIL, setEmail),
  takeLatest(CONST.SET_UPLOAD_PROFILE, setUploadProfile),
  takeLatest(CONST.SET_DELETE_FOTO_PROFILE, setDeleteFotoProfile),
  takeLatest(CONST.GET_CS_INFO, getCSInfo),
  takeLatest(CONST.GET_PERSONAL_DATA_PROVINCE, getPersonalDataProvince),
  takeLatest(CONST.GET_PERSONAL_DATA_CITY, getPersonalDataCity),
  takeLatest(CONST.GET_PERSONAL_DATA_DISTRICT, getPersonalDataDistrict),
  takeLatest(CONST.GET_PERSONAL_DATA_SUB_DISTRICT, getPersonalDataSubDistrict),
  takeLatest(CONST.SET_PROFILE_REQUEST_OTP, setProfileRequestOtp),
  takeLatest(CONST.SET_PROFILE_VERIFY_OTP, setProfileVerifyOtp),
  takeLatest(CONST.SET_PROFILE_FAQ, setProfileFaq),
  takeLatest(CONST.SET_PROFILE_NOLOGINFAQ, setProfileNoLoginFaq),
  takeLatest(CONST.SET_PERSONAL_DATA, setPersonalData),
  takeLatest(CONST.GET_SUBSCRIPTIONS, getSubscriptions),
  takeLatest(CONST.GET_SUBSCRIPTION_DETAIL, getSubscriptionDetail),
  takeLatest(CONST.SET_RESUBSCRIBE, setResubscribe),
  takeLatest(CONST.SET_DELETE_ACCOUNT_REQUEST_OTP, setDeleteAccountRequestOtp),
  takeLatest(CONST.SET_DELETE_ACCOUNT_VERIFY_OTP, setDeleteAccountVerifyOtp),
  takeLatest(CONST.GET_BILLS, getBills),
  takeLatest(CONST.GET_ADDRESS_LIST, getAddressList),
  takeLatest(CONST.SET_SAVE_ADDRESS, setSaveAddress),
  takeLatest(CONST.SET_UPDATE_ADDRESS, setUpdateAddress),
  takeLatest(CONST.SET_DELETE_ADDRESS, setDeleteAddress),
  takeLatest(CONST.GET_PROFILE_USER_PARTY, getProfileUserParty),
  takeLatest(CONST.GET_PROFILE_REFERRAL, getProfileReferral),
  takeLatest(CONST.GET_CONTACT, getContact),
];
