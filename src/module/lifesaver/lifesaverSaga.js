import { codeLifesaver, RESPONSE_STATUS } from '@cp-util/constant';
import { setProgressWatcher, setUploader } from '@cp-util/uploader';

import { call, put, takeLatest, fork } from 'redux-saga/effects';
import * as CONST from '@cp-module/lifesaver/lifesaverConstant';
import {
  getBajoRunProductFailed,
  getBajoRunProductSuccess,
  getCurrentSubsFailed,
  getCurrentSubsSuccess,
  getInvitationListFriendFailed,
  getInvitationListFriendSuccess,
  getIsUserEligibleBajoRunFailed,
  getIsUserEligibleBajoRunSuccess,
  getListRsFailed,
  getListRsSuccess,
  getPersonalRiplayFailed,
  getPersonalRiplaySuccess,
  getProductFailed,
  getProductsFailed,
  getProductsSuccess,
  getProductSuccess,
  setSubmissionFailed,
  setSubmissionSuccess,
  setSubmissionOldSuccess,
  setSubmissionOldFailed,
  setSubmissionForOtherFailed,
  setSubmissionForOtherSuccess,
  setWaitingFailed,
  setWaitingSuccess,
  getPendingInvitesSuccess,
  getPendingInvitesFailed,
  getCampaignSuccess,
  getCampaignFailed,
  getEligibleSubmissionSuccess,
  getEligibleSubmissionFailed,
  getEligibleSubmissionClear,
  getCheckMaxInviteSuccess,
  getCheckMaxInviteFailed,
  getEligibleLiteSuccess,
  getEligibleLiteFailed,
  getProductLifetagSuccess,
  getProductLifetagFailed,
  getEligiblePosSuccess,
  getEligiblePosFailed,
  getTotalClaimSuccess,
  getTotalClaimFailed,
  getIDCardDataOCRSuccess,
  getIDCardDataOCRFailed,
} from './lifesaverAction';
import {
  getBajoRunProductApi,
  getCurrentSubsApi,
  getInvitationListFriendApi,
  getIsUserEligibleBajoRunApi,
  getListRsApi,
  getPersonalRiplayApi,
  getProductApi,
  setSubmissionApi,
  setSubmissionForOtherApi,
  setWaitingApi,
  getPendingInvitesApi,
  getCampaignApi,
  getIsUserEligibleApi,
  getCheckMaxInviteApi,
  getEligibleLiteApi,
  getProductLifetagApi,
  getEligiblePosApi,
  getTotalClaimApi,
  setSubmissionApiOld,
  getIDCardDataOCRApi,
} from './lifesaverApi';

function* getProduct(params) {
  try {
    const response = yield call(getProductApi, params.payload);
    yield put(getProductSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProductFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProductFailed(error?.response?.data));
        break;
      default:
        yield put(getProductFailed(error?.response?.data));
    }
  }
}

function* getProducts() {
  try {
    const resLifesaver = yield call(getProductApi, {
      productCode: codeLifesaver?.productCode,
      planCode: codeLifesaver?.['lifesaver']?.planCode,
    });
    const resLifesaverplus = yield call(getProductApi, {
      productCode: codeLifesaver?.productCode,
      planCode: codeLifesaver?.['lifesaverplus']?.planCode,
    });
    yield put(
      getProductsSuccess({
        lifesaver: resLifesaver?.data?.data,
        lifesaverplus: resLifesaverplus?.data?.data,
      }),
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProductsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProductsFailed(error?.response?.data));
        break;
      default:
        yield put(getProductsFailed(error?.response?.data));
    }
  }
}

function* getListRs(params) {
  try {
    const response = yield call(getListRsApi, params.payload);
    yield put(getListRsSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getListRsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getListRsFailed(error?.response?.data));
        break;
      default:
        yield put(getListRsFailed(error?.response?.data));
    }
  }
}

function* getPersonalRiplay(params) {
  try {
    const response = yield call(getPersonalRiplayApi, params.payload);
    yield put(getPersonalRiplaySuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalRiplayFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalRiplayFailed(error?.response?.data));
        break;
      default:
        yield put(getPersonalRiplayFailed(error?.response?.data));
    }
  }
}

function* setSubmission(params) {
  try {
    const response = yield call(setSubmissionApi, params.payload);
    yield put(setSubmissionSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setSubmissionFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setSubmissionFailed(error?.response?.data));
        break;
      default:
        yield put(setSubmissionFailed(error?.response?.data));
    }
  }
}

function* getCurrentSubs(params) {
  try {
    const response = yield call(getCurrentSubsApi, params.payload);
    yield put(
      getCurrentSubsSuccess(
        response.data.data.find(
          (item) =>
            item.planName === 'LifeSAVER+' || item.planName === 'LifeSAVER',
        ),
      ),
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCurrentSubsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCurrentSubsFailed(error?.response?.data));
        break;
      default:
        yield put(getCurrentSubsFailed(error?.response?.data));
    }
  }
}

function* getInvitationListFriend(params) {
  try {
    const response = yield call(getInvitationListFriendApi, params?.payload);
    yield put(getInvitationListFriendSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getInvitationListFriendFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getInvitationListFriendFailed(error?.response?.data));
        break;
      default:
        yield put(getInvitationListFriendFailed(error?.response?.data));
    }
  }
}

function* getIsUserEligibleBajoRun(params) {
  try {
    const response = yield call(getIsUserEligibleBajoRunApi, params.payload);
    yield put(
      getIsUserEligibleBajoRunSuccess({
        data: response.data,
        status: true,
      }),
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getIsUserEligibleBajoRunFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getIsUserEligibleBajoRunFailed(error?.response?.data));
        break;
      default:
        yield put(getIsUserEligibleBajoRunFailed(error?.response?.data));
    }
  }
}

function* setWaiting() {
  try {
    const response = yield call(setWaitingApi);
    yield put(setWaitingSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setWaitingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setWaitingFailed(error?.response?.data));
        break;
      default:
        yield put(setWaitingFailed(error?.response?.data));
    }
  }
}

function* getBajoRunProduct() {
  try {
    const response = yield call(getBajoRunProductApi);
    yield put(getBajoRunProductSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getBajoRunProductFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getBajoRunProductFailed(error?.response?.data));
        break;
      default:
        yield put(getBajoRunProductFailed(error?.response?.data));
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

function* getCampaign(params) {
  try {
    const response = yield call(getCampaignApi, params.payload);
    yield put(getCampaignSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCampaignFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCampaignFailed(error?.response?.data));
        break;
      default:
        yield put(getCampaignFailed(error?.response?.data));
    }
  }
}

function* getEligibleSubmission(params) {
  try {
    const getCurrentSubsResponse = yield call(getCurrentSubsApi);
    const getEligibleResponse = yield call(
      getIsUserEligibleApi,
      params.payload,
    );
    yield put(
      getEligibleSubmissionSuccess({
        eligible: getEligibleResponse?.data,
        getCurrentSubs: getCurrentSubsResponse?.data?.data?.planName,
      }),
    );
  } catch (error) {
    yield put(getEligibleSubmissionClear());
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getEligibleSubmissionFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getEligibleSubmissionFailed(error?.response?.data));
        break;
      default:
        yield put(getEligibleSubmissionFailed(error?.response?.data));
    }
  }
}

function* getCheckMaxInvite() {
  try {
    const response = yield call(getCheckMaxInviteApi);
    yield put(getCheckMaxInviteSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCheckMaxInviteFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckMaxInviteFailed(error?.response?.data));
        break;
      default:
        yield put(getCheckMaxInviteFailed(error?.response?.data));
    }
  }
}

function* getEligibleLite(params) {
  try {
    const response = yield call(getEligibleLiteApi, params.payload);
    yield put(getEligibleLiteSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getEligibleLiteFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getEligibleLiteFailed(error?.response?.data));
        break;
      default:
        yield put(getEligibleLiteFailed(error?.response?.data));
    }
  }
}

function* getProductLifetag(params) {
  try {
    const response = yield call(getProductLifetagApi, params.payload);
    yield put(getProductLifetagSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProductLifetagFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProductLifetagFailed(error?.response?.data));
        break;
      default:
        yield put(getProductLifetagFailed(error?.response?.data));
    }
  }
}

function* getEligiblePos(params) {
  try {
    const response = yield call(getEligiblePosApi, params.payload);
    yield put(getEligiblePosSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getEligiblePosFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getEligiblePosFailed(error?.response?.data));
        break;
      default:
        yield put(getEligiblePosFailed(error?.response?.data));
    }
  }
}

function* getTotalClaim(params) {
  try {
    const response = yield call(getTotalClaimApi, params.payload);
    yield put(getTotalClaimSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getTotalClaimFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getTotalClaimFailed(error?.response?.data));
        break;
      default:
        yield put(getTotalClaimFailed(error?.response?.data));
    }
  }
}

function* setSubmissionForOther(params) {
  try {
    const response = yield call(setSubmissionForOtherApi, params.payload);
    yield put(setSubmissionForOtherSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setSubmissionForOtherFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setSubmissionForOtherFailed(error?.response?.data));
        break;
      default:
        yield put(setSubmissionForOtherFailed(error?.response?.data));
    }
  }
}

function* setSubmissionOld(params) {
  try {
    const response = yield call(setSubmissionApiOld, params.payload);
    yield put(setSubmissionOldSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setSubmissionOldFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setSubmissionOldFailed(error?.response?.data));
        break;
      default:
        yield put(setSubmissionOldFailed(error?.response?.data));
    }
  }
}

// ID CARD
function* getIDCardDataOCR(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload.file,
      getIDCardDataOCRApi,
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    yield put(
      getIDCardDataOCRSuccess({
        data: response.data,
        index: params?.payload?.index,
      }),
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getIDCardDataOCRFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getIDCardDataOCRFailed(error?.response?.data));
        break;
      default:
        yield put(getIDCardDataOCRFailed(error?.response?.data));
        break;
    }
  }
}

const lifesaverSaga = [
  takeLatest(CONST.GET_PRODUCT, getProduct),
  takeLatest(CONST.GET_PRODUCTS, getProducts),
  takeLatest(CONST.GET_LIST_RS, getListRs),
  takeLatest(CONST.SET_WAITING, setWaiting),
  takeLatest(CONST.GET_PERSONAL_RIPLAY, getPersonalRiplay),
  takeLatest(CONST.SET_SUBMISSION, setSubmission),
  takeLatest(CONST.GET_CURRENT_SUBS, getCurrentSubs),
  takeLatest(CONST.GET_INVITATION_LIST_FRIEND, getInvitationListFriend),
  takeLatest(CONST.GET_IS_USER_ELIGIBLE_BAJO_RUN, getIsUserEligibleBajoRun),
  takeLatest(CONST.GET_BAJO_RUN_PRODUCT, getBajoRunProduct),
  takeLatest(CONST.GET_PENDING_INVITES, getPendingInvites),
  takeLatest(CONST.GET_CAMPAIGN, getCampaign),
  takeLatest(CONST.GET_ELIGIBLE_SUBMISSION, getEligibleSubmission),
  takeLatest(CONST.GET_CHECK_MAX_INVITE, getCheckMaxInvite),
  takeLatest(CONST.GET_ELIGIBLE_LITE, getEligibleLite),
  takeLatest(CONST.GET_PRODUCT_LIFETAG, getProductLifetag),
  takeLatest(CONST.GET_ELIGIBLE_POS, getEligiblePos),
  takeLatest(CONST.GET_TOTAL_CLAIM, getTotalClaim),
  takeLatest(CONST.SET_SUBMISSION_FOR_OTHER, setSubmissionForOther),
  takeLatest(CONST.SET_SUBMISSION_OLD, setSubmissionOld),
  takeLatest(CONST.GET_ID_CARD_DATA_OCR, getIDCardDataOCR),
];

export default lifesaverSaga;
