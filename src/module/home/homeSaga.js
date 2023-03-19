import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/home/homeConstant';
import {
  getPolicySuccess,
  getPolicyFailed,
  setLinkPolicySuccess,
  setLinkPolicyFailed,
  getPoliciesSuccess,
  getPoliciesFailed,
  getCheckPolisSuccess,
  getCheckPolisFailed,
  getNotifCountSuccess,
  getNotifCountFailed,
  getWidgetManfaatSuccess,
  getWidgetManfaatFailed,
  getProductPricesFitSuccess,
  getProductPricesFitFailed,
  getProductPricesFitPlusSuccess,
  getProductPricesFitPlusFailed,
  getProductBannerSuccess,
  getProductBannerFailed,
  getIsUserEligibleSuccess,
  getIsUserEligibleFailed,
  getPolicyWidgetHomeSuccess,
  getPolicyWidgetHomeFailed,
  setCallTimeSuccess,
  setCallTimeFailed,
  getPendingInvitesSuccess,
  getPendingInvitesFailed,
  getPolicyProposalSuccess,
  getPolicyProposalFailed,
  getPolicyWidgetHomePublicSuccess,
  getPolicyWidgetHomePublicFailed,
  getWidgetImageSuccess,
  getWidgetImageFailed,
  getFaqContentSuccess,
  getFaqContentFailed,
  getImportantForYouImageSuccess,
  getImportantForYouImageFailed,
} from '@cp-module/home/homeAction';
import {
  getPolicyApi,
  setLinkPolicyApi,
  getPoliciesApi,
  getCheckPolisApi,
  getNotifCountApi,
  getWidgetManfaatApi,
  getProductPricesFitApi,
  getProductPricesFitPlusApi,
  getProductBannerApi,
  getIsUserEligibleApi,
  getPolicyWidgetHomeApi,
  setCallTimeApi,
  getPendingInvitesApi,
  getPolicyProposalApi,
  getPolicyWidgetHomePublicApi,
  getFaqContentApi,
} from '@cp-module/home/homeApi';

function* getPolicy(params) {
  try {
    const response = yield call(getPolicyApi, params.payload);
    yield put(getPolicySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyFailed(error?.response?.data));
        break;
      default:
        yield put(getPolicyFailed(error?.response?.data));
    }
  }
}

function* setLinkPolicy(params) {
  try {
    const response = yield call(setLinkPolicyApi, params.payload);
    yield put(setLinkPolicySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLinkPolicyFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLinkPolicyFailed(error?.response?.data));
        break;
      default:
        yield put(setLinkPolicyFailed(error?.response?.data));
    }
  }
}

function* getPolicies(params) {
  try {
    const response = yield call(getPoliciesApi, params.payload);
    yield put(getPoliciesSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPoliciesFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPoliciesFailed(error?.response?.data));
        break;
      default:
        yield put(getPoliciesFailed(error?.response?.data));
    }
  }
}

function* getCheckPolis(params) {
  try {
    const response = yield call(getCheckPolisApi, params.payload);
    yield put(getCheckPolisSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCheckPolisFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckPolisFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getNotifCount(params) {
  try {
    const response = yield call(getNotifCountApi, params.payload);
    yield put(getNotifCountSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getNotifCountFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getNotifCountFailed(error?.response?.data));
        break;
      default:
        yield put(getNotifCountFailed(error?.response?.data));
    }
  }
}

function* getWidgetManfaat(params) {
  try {
    const response = yield call(getWidgetManfaatApi, params.payload);
    yield put(getWidgetManfaatSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getWidgetManfaatFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getWidgetManfaatFailed(error?.response?.data));
        break;
      default:
        yield put(getWidgetManfaatFailed(error?.response?.data));
    }
  }
}

function* getProductPricesFit(params) {
  try {
    const response = yield call(getProductPricesFitApi, params.payload);
    yield put(getProductPricesFitSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProductPricesFitFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProductPricesFitFailed(error?.response?.data));
        break;
      default:
        yield put(getProductPricesFitFailed(error?.response?.data));
    }
  }
}

function* getProductPricesFitPlus(params) {
  try {
    const response = yield call(getProductPricesFitPlusApi, params.payload);
    yield put(getProductPricesFitPlusSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProductPricesFitPlusFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProductPricesFitPlusFailed(error?.response?.data));
        break;
      default:
        yield put(getProductPricesFitPlusFailed(error?.response?.data));
    }
  }
}

function* getProductBanner(params) {
  try {
    const response = yield call(getProductBannerApi, params.payload);
    yield put(getProductBannerSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProductBannerFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProductBannerFailed(error?.response?.data));
        break;
      default:
        yield put(getProductBannerFailed(error?.response?.data));
    }
  }
}

function* getIsUserEligible(params) {
  try {
    const response = yield call(getIsUserEligibleApi, params.payload);
    yield put(
      getIsUserEligibleSuccess({
        data: response.data,
        status: true,
      }),
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getIsUserEligibleFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getIsUserEligibleFailed(error?.response?.data));
        break;
      default:
        yield put(getIsUserEligibleFailed(error?.response?.data));
    }
  }
}

function* getPolicyWidgetHome(params) {
  try {
    const response = yield call(getPolicyWidgetHomeApi, params.payload);
    yield put(getPolicyWidgetHomeSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyWidgetHomeFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyWidgetHomeFailed(error?.response?.data));
        break;
      default:
        yield put(getPolicyWidgetHomeFailed(error?.response?.data));
    }
  }
}

function* getPolicyWidgetHomePublic(params) {
  try {
    const response = yield call(getPolicyWidgetHomePublicApi, params.payload);
    yield put(getPolicyWidgetHomePublicSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyWidgetHomePublicFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyWidgetHomePublicFailed(error?.response?.data));
        break;
      default:
        yield put(getPolicyWidgetHomePublicFailed(error?.response?.data));
    }
  }
}

function* setCallTime(params) {
  try {
    const response = yield call(setCallTimeApi, params.payload);
    yield put(setCallTimeSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setCallTimeFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setCallTimeFailed(error?.response?.data));
        break;
      default:
        yield put(setCallTimeFailed(error?.response?.data));
    }
  }
}

function* getPendingInvites(params) {
  try {
    const newParams = { mobilePhoneNumber: params?.payload };
    const response = yield call(getPendingInvitesApi, newParams);
    yield put(getPendingInvitesSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPendingInvitesFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPendingInvitesFailed(error?.response?.data));
        break;
      default:
        yield put(getPendingInvitesFailed(error?.response?.data));
    }
  }
}

function* getPolicyProposal(params) {
  try {
    const response = yield call(getPolicyProposalApi, params.payload);
    yield put(getPolicyProposalSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyProposalFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyProposalFailed(error?.response?.data));
        break;
      default:
        yield put(getPolicyProposalFailed(error?.response?.data));
    }
  }
}

function* getWidgetImage(params) {
  try {
    const response = yield call(getProductBannerApi, params.payload);
    yield put(getWidgetImageSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getWidgetImageFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProductBannerFailed(error?.response?.data));
        break;
      default:
        yield put(getProductBannerFailed(error?.response?.data));
    }
  }
}

function* getFaqContent(params) {
  try {
    const response = yield call(getFaqContentApi, params.payload);
    yield put(getFaqContentSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getFaqContentFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProductBannerFailed(error?.response?.data));
        break;
      default:
        yield put(getProductBannerFailed(error?.response?.data));
    }
  }
}

function* getImportantForYouImage(params) {
  try {
    const response = yield call(getProductBannerApi, params.payload);
    yield put(getImportantForYouImageSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getImportantForYouImageFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getImportantForYouImageFailed(error?.response?.data));
        break;
      default:
        yield put(getImportantForYouImageFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.GET_POLICY, getPolicy),
  takeLatest(CONST.SET_LINK_POLICY, setLinkPolicy),
  takeLatest(CONST.GET_POLICIES, getPolicies),
  takeLatest(CONST.GET_CHECK_POLIS, getCheckPolis),
  takeLatest(CONST.GET_NOTIF_COUNT, getNotifCount),
  takeLatest(CONST.GET_WIDGET_MANFAAT, getWidgetManfaat),
  takeLatest(CONST.GET_PRODUCT_PRICES_FIT, getProductPricesFit),
  takeLatest(CONST.GET_PRODUCT_PRICES_FITPLUS, getProductPricesFitPlus),
  takeLatest(CONST.GET_PRODUCT_BANNER, getProductBanner),
  takeLatest(CONST.GET_IS_USER_ELIGIBLE, getIsUserEligible),
  takeLatest(CONST.GET_POLICY_WIDGET_HOME, getPolicyWidgetHome),
  takeLatest(CONST.GET_POLICY_WIDGET_HOME_PUBLIC, getPolicyWidgetHomePublic),
  takeLatest(CONST.SET_CALL_TIME, setCallTime),
  takeLatest(CONST.GET_PENDING_INVITES, getPendingInvites),
  takeLatest(CONST.GET_POLICY_PROPOSAL, getPolicyProposal),
  takeLatest(CONST.GET_WIDGET_IMAGE, getWidgetImage),
  takeLatest(CONST.GET_FAQ_CONTENT, getFaqContent),
  takeLatest(CONST.GET_IMPORTANT_FOR_YOU_IMAGE, getImportantForYouImage),
];
