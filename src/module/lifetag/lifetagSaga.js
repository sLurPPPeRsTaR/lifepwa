import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/lifetag/lifetagConstant';
import {
  getLifetagCurrentSettingApi,
  getLifetagFlagApi,
  getLifetagListOrderApi,
  getLifetagProductDetailApi,
  getLifetagProfileApi,
  getLifetagProfilePublicApi,
  setLifetagCreateOrderApi,
  setLifetagSectionSettingApi,
  setLifetagUpdateApi,
  setLinkLifetagApi,
  setLifetagUnlinkApi,
  getLifetagLinkedListApi,
  getLifetagDetailOrderApi,
  setLifetagOrderNoApi,
  setLifetagUpdateOrderApi,
  getLifetagListOtherInfoApi,
  setLifetagUnlinkRequestOtpApi,
  setLifetagUnlinkVerifyOtpApi,
} from '@cp-module/lifetag/lifetagApi';
import {
  setCreatePinApi,
  getVerifyPinApi,
} from '@cp-module/profile/profileApi';
import {
  getLifetagProductDetailSuccess,
  getLifetagProductDetailFailed,
  getLifetagProfileSuccess,
  getLifetagProfileFailed,
  getLifetagProfilePublicSuccess,
  getLifetagProfilePublicFailed,
  setLinkLifetagSuccess,
  setLinkLifetagFailed,
  setLifetagCreateOrderSuccess,
  setLifetagCreateOrderFailed,
  getLifetagCurrentSettingSuccess,
  getLifetagCurrentSettingFailed,
  setLifetagSectionSettingSuccess,
  setLifetagSectionSettingFailed,
  getLifetagListOrderSuccess,
  getLifetagListOrderFailed,
  getLifetagDetailOrderSuccess,
  getLifetagDetailOrderFailed,
  getLifetagFlagSuccess,
  getLifetagFlagFailed,
  getLifetagLinkedListSuccess,
  getLifetagLinkedListFailed,
  setLifetagUpdateSuccess,
  setLifetagUpdateFailed,
  setLifetagUnlinkSuccess,
  setLifetagUnlinkFailed,
  setLifetagOrderNoSuccess,
  setLifetagOrderNoFailed,
  setLifetagUpdateOrderFailed,
  setLifetagUpdateOrderSuccess,
  getLifetagListOtherInfoFailed,
  getLifetagListOtherInfoSuccess,
  getLifetagUnlinkRequestOtpSuccess,
  getLifetagUnlinkRequestOtpFailed,
  getLifetagVerifyPinSuccess,
  getLifetagVerifyPinFailed,
  setLifetagUnlinkRequestOtpSuccess,
  setLifetagUnlinkRequestOtpFailed,
  setLifetagUnlinkVerifyOtpSuccess,
  setLifetagUnlinkVerifyOtpFailed,
  setLifetagCreatePinSuccess,
  setLifetagCreatePinFailed,
} from './lifetagAction';

// LIFETAG PRODUCT DETAIL
function* getLifetagProductDetail(params) {
  try {
    const response = yield call(getLifetagProductDetailApi, params.payload);
    yield put(getLifetagProductDetailSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagProductDetailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagProductDetailFailed(error?.response?.data));
        break;
      default:
        yield put(getLifetagProductDetailFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG PROFILE
function* getLifetagProfile(params) {
  try {
    const response = yield call(getLifetagProfileApi, params.payload);
    yield put(getLifetagProfileSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagProfileFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagProfileFailed(error?.response?.data));
        break;
      default:
        yield put(getLifetagProfileFailed(error?.response?.data));
    }
  }
}

// LIFETAG PROFILE PUBLIC
function* getLifetagProfilePublic(params) {
  try {
    const response = yield call(getLifetagProfilePublicApi, params.payload);
    yield put(getLifetagProfilePublicSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagProfilePublicFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagProfilePublicFailed(error?.response?.data));
        break;
      default:
        yield put(getLifetagProfilePublicFailed(error?.response?.data));
    }
  }
}

// LIFETAG LINK
function* setLinkLifetag(params) {
  try {
    const response = yield call(setLinkLifetagApi, params.payload);
    yield put(setLinkLifetagSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLinkLifetagFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLinkLifetagFailed(error?.response?.data));
        break;
      default:
        yield put(setLinkLifetagFailed(error?.response?.data));
    }
  }
}

// LIFETAG CREATE
function* setLifetagCreateOrder(params) {
  try {
    const response = yield call(setLifetagCreateOrderApi, params.payload);
    yield put(setLifetagCreateOrderSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagCreateOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagCreateOrderFailed(error?.response?.data));
        break;
      default:
        yield put(setLifetagCreateOrderFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG CURRENT SETTING
function* getLifetagCurrentSetting(params) {
  try {
    const response = yield call(getLifetagCurrentSettingApi, params.payload);
    yield put(getLifetagCurrentSettingSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagCurrentSettingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagCurrentSettingFailed(error?.response?.data));
        break;
      default:
        yield put(getLifetagCurrentSettingFailed(error?.response?.data));
    }
  }
}

// LIFETAG CHANGE SETTING
function* setLifetagSectionSetting(params) {
  try {
    const response = yield call(setLifetagSectionSettingApi, params.payload);
    yield put(setLifetagSectionSettingSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagSectionSettingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagSectionSettingFailed(error?.response?.data));
        break;
      default:
        yield put(setLifetagSectionSettingFailed(error?.response?.data));
    }
  }
}

// LIFETAG LIST ORDER
function* getLifetagListOrder(params) {
  try {
    const response = yield call(getLifetagListOrderApi, params.payload);
    yield put(getLifetagListOrderSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagListOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagListOrderFailed(error?.response?.data));
        break;
      default:
        yield put(getLifetagListOrderFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG DETAIL ORDER
function* getLifetagDetailOrder(params) {
  try {
    const response = yield call(getLifetagDetailOrderApi, params.payload);
    yield put(getLifetagDetailOrderSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagDetailOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagDetailOrderFailed(error?.response?.data));
        break;
      default:
        yield put(getLifetagDetailOrderFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG FLAG
function* getLifetagFlag(params) {
  try {
    const response = yield call(getLifetagFlagApi, params.payload);
    yield put(getLifetagFlagSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagFlagFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagFlagFailed(error?.response?.data));
        break;
      default:
        yield put(getLifetagFlagFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG UPDATE
function* setLifetagUpdate(params) {
  try {
    const response = yield call(setLifetagUpdateApi, params.payload);
    yield put(setLifetagUpdateSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagUpdateFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagUpdateFailed(error?.response?.data));
        break;
      default:
        yield put(setLifetagUpdateFailed(error?.response?.data));
    }
  }
}

// PRODUCT LIFETAG
function* getLifetagLinkedList(params) {
  try {
    const response = yield call(getLifetagLinkedListApi, params.payload);
    yield put(getLifetagLinkedListSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagLinkedListFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagLinkedListFailed(error?.response?.data));
        break;
      default:
        yield put(getLifetagLinkedListFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG UNLINK
function* setLifetagUnlink(params) {
  try {
    const response = yield call(setLifetagUnlinkApi, params.payload);
    yield put(setLifetagUnlinkSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagUnlinkFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagUnlinkFailed(error?.response?.data));
        break;
      default:
        yield put(setLifetagUnlinkFailed(error?.response?.data));
    }
  }
}

// LIFETAG ORDER NO
function* setLifetagOrderNo(params) {
  try {
    const response = yield call(setLifetagOrderNoApi, params.payload);
    yield put(setLifetagOrderNoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagOrderNoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagOrderNoFailed(error?.response?.data));
        break;
      default:
        yield put(setLifetagOrderNoFailed(error?.response?.data));
    }
  }
}

// LIFETAG UPDATE ORDER
function* setLifetagUpdateOrder(params) {
  try {
    const response = yield call(setLifetagUpdateOrderApi, params.payload);
    yield put(setLifetagUpdateOrderSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagUpdateOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagUpdateOrderFailed(error?.response?.data));
        break;
      default:
        yield put(setLifetagUpdateOrderFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG OTHER INFO
function* getLifetagListOtherInfo(params) {
  try {
    const response = yield call(getLifetagListOtherInfoApi, params.payload);
    yield put(getLifetagListOtherInfoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagListOtherInfoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagListOtherInfoFailed(error?.response?.data));
        break;
      default:
        yield put(getLifetagListOtherInfoFailed(error?.response?.data));
        break;
    }
  }
}

// VERIFY PIN
function* getLifetagVerifyPin(params) {
  try {
    const response = yield call(getVerifyPinApi, params.payload);
    yield put(getLifetagVerifyPinSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagVerifyPinFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagVerifyPinFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// REQUEST OTP
function* setLifetagUnlinkRequestOtp(params) {
  try {
    const response = yield call(setLifetagUnlinkRequestOtpApi, params.payload);
    yield put(setLifetagUnlinkRequestOtpSuccess(response.data));
  } catch (error) {
    yield put(setLifetagUnlinkRequestOtpFailed(error?.response?.data));
  }
}

// Verify OTP
function* setLifetagUnlinkVerifyOtp(params) {
  try {
    const response = yield call(setLifetagUnlinkVerifyOtpApi, params.payload);
    yield put(setLifetagUnlinkVerifyOtpSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagUnlinkVerifyOtpFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagUnlinkVerifyOtpFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setLifetagCreatePin(params) {
  try {
    const response = yield call(setCreatePinApi, params.payload);
    yield put(setLifetagCreatePinSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagCreatePinFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagCreatePinFailed(error?.response?.data));
        break;
      default:
    }
  }
}

export default [
  takeLatest(CONST.GET_LIFETAG_PRODUCT_DETAIL, getLifetagProductDetail),
  takeLatest(CONST.GET_LIFETAG_PROFILE, getLifetagProfile),
  takeLatest(CONST.GET_LIFETAG_PROFILE_PUBLIC, getLifetagProfilePublic),
  takeLatest(CONST.SET_LINK_LIFETAG, setLinkLifetag),
  takeLatest(CONST.SET_LIFETAG_CREATE_ORDER, setLifetagCreateOrder),
  takeLatest(CONST.GET_LIFETAG_CURRENT_SETTING, getLifetagCurrentSetting),
  takeLatest(CONST.SET_LIFETAG_SECTION_SETTING, setLifetagSectionSetting),
  takeLatest(CONST.GET_LIFETAG_LIST_ORDER, getLifetagListOrder),
  takeLatest(CONST.GET_LIFETAG_DETAIL_ORDER, getLifetagDetailOrder),
  takeLatest(CONST.GET_LIFETAG_FLAG, getLifetagFlag),
  takeLatest(CONST.GET_LIFETAG_LINKED_LIST, getLifetagLinkedList),
  takeLatest(CONST.SET_LIFETAG_UPDATE, setLifetagUpdate),
  takeLatest(CONST.SET_LIFETAG_UNLINK, setLifetagUnlink),
  takeLatest(CONST.SET_LIFETAG_ORDERNO, setLifetagOrderNo),
  takeLatest(CONST.SET_LIFETAG_UPDATE_ORDER, setLifetagUpdateOrder),
  takeLatest(CONST.GET_LIFETAG_LIST_OTHER_INFO, getLifetagListOtherInfo),
  takeLatest(CONST.GET_LIFETAG_VERIFY_PIN, getLifetagVerifyPin),
  takeLatest(CONST.SET_LIFETAG_UNLINK_REQUEST_OTP, setLifetagUnlinkRequestOtp),
  takeLatest(CONST.SET_LIFETAG_UNLINK_VERIFY_OTP, setLifetagUnlinkVerifyOtp),
  takeLatest(CONST.SET_LIFETAG_CREATE_PIN, setLifetagCreatePin),
];
