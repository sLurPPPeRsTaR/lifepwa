import * as CONST from './claimpolisConstant';
import {
  getFaqClaimSuccess,
  getFaqClaimFailed,
  getPolicyDigitalSuccess,
  getPolicyDigitalFailed,
  getDocumentMandatorySuccess,
  getDocumentMandatoryFailed,
  setUploadDocumentSuccess,
  setUploadDocumentFailed,
  setSubmitDocumentSuccess,
  setSubmitDocumentFailed,
  getRsSuccess,
  getRsFailed,
  getListBenefitTypeSuccess,
  getListBenefitTypeFailed,
  getFaqClaimDetailSuccess,
  getFaqClaimDetailFailed,
} from './claimpolisAction';
import { takeLatest, put, call } from 'redux-saga/effects';
import {
  getFaqClaimApi,
  getPolicyDigitalApi,
  getRsApi,
  getListTypeBenefitApi,
  getDocumentMandatoryApi,
  setSubmitDocumentApi,
  setUploadDocumentApi,
  getFaqClaimDetailApi,
  setPartialUploadDocumentApi,
} from './claimpolisApi';
import { RESPONSE_STATUS } from '@cp-util/constant';
import { store } from '@cp-config/Store';

function* getFaqClaim(params) {
  try {
    let questions = [];
    const response = yield call(getFaqClaimApi, params.payload);
    for (let i = 0; i < response?.data?.data.length; i++) {
      const subQuestions = yield call(getFaqClaimDetailApi, {
        params: { id: response?.data?.data[i]?.id },
      });
      questions.push({
        ...response?.data?.data[i],
        attributes: {
          ...response?.data?.data[i]?.attributes,
          subQuestion: {
            data: subQuestions?.data?.data,
          },
        },
      });
    }
    yield put(getFaqClaimSuccess(questions));
  } catch (error) {
    yield put(getFaqClaimFailed());
    console.log(error);
  }
}

function* getFaqClaimDetail(params) {
  try {
    const response = yield call(getFaqClaimDetailApi, params.payload);
    yield put(getFaqClaimDetailSuccess(response?.data?.data));
  } catch (error) {
    yield put(getFaqClaimDetailFailed());
    console.log(error);
  }
}

function* getPolicyDigital(params) {
  try {
    let qualifiedPolicy = [];
    const response = yield call(getPolicyDigitalApi, params.payload);
    const activePolicies = response?.data?.data?.filter((item) =>
      ['GRACE PERIOD', 'GRACE_PERIOD', 'ACTIVE'].includes(item?.status),
    );
    for (let i = 0; i < activePolicies?.length; i++) {
      try {
        const benefits = yield call(getListTypeBenefitApi, {
          policyNumber: activePolicies[i]?.policyNo,
        });
        const deathBenefits = benefits?.data?.data?.filter(
          (item) => item?.benefitName === 'DEATH_ACCIDENT',
        );

        if (deathBenefits?.length > 0) {
          qualifiedPolicy.push(activePolicies[i]);
        }
      } catch (err) {}
    }
    yield put(
      getPolicyDigitalSuccess({
        data: qualifiedPolicy,
        status: response?.status,
      }),
    );
  } catch (error) {
    yield put(getPolicyDigitalFailed({ status: error?.response.status }));
    console.log(error);
  }
}

function* getRs(params) {
  try {
    const response = yield call(getRsApi, params.payload);
    const dataMap = response?.data?.data?.providerList?.map((item) => {
      return {
        ...item,
        value: item?.providerNetworkId,
        label: item?.providerName,
      };
    });

    yield put(getRsSuccess(dataMap));
  } catch (error) {
    yield put(getRsFailed());
    console.log(error);
  }
}

function* getListBenefitType(params) {
  try {
    const response = yield call(getListTypeBenefitApi, params.payload);
    const dataMap = response?.data?.data
      ?.filter((item) => item?.benefitName === 'DEATH_ACCIDENT')
      .map((item) => ({
        label: CONST.benefitTypeTranslation(item?.benefitName),
        value: item?.benefitId,
      }));
    yield put(getListBenefitTypeSuccess(dataMap));
  } catch (error) {
    yield put(getListBenefitTypeFailed());
    console.log(error);
  }
}

function* getDocumentMandatory(params) {
  try {
    const response = yield call(getDocumentMandatoryApi, params.payload);
    yield put(getDocumentMandatorySuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getDocumentMandatoryFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getDocumentMandatoryFailed(error?.response?.data));
        break;
      default:
        yield put(getDocumentMandatoryFailed(error?.response?.data));
    }
  }
}

function* setUploadDocument(params) {
  try {
    const { indexDocCategory, indexListFilterResult } = params.payload.params;
    const response = yield call(
      setPartialUploadDocumentApi,
      params.payload.data,
    );
    yield put(
      setUploadDocumentSuccess(
        response?.data?.data?.map((item) => {
          const documentUpload = store.getState().claimpolis?.documentUpload;
          let tempDocumentUpload = [...documentUpload];

          tempDocumentUpload[indexDocCategory].data[indexListFilterResult] = {
            ...tempDocumentUpload[indexDocCategory].data[indexListFilterResult],
            documentKey: item?.documentKey?.toString(),
          };

          return item?.documentKey;
        }),
      ),
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUploadDocumentFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUploadDocumentFailed(error?.response?.data));
        break;
      default:
        yield put(setUploadDocumentFailed(error?.response?.data));
    }
  }
}

function* setSubmitDocument(params) {
  try {
    const response = yield call(setSubmitDocumentApi, params.payload);
    yield put(setSubmitDocumentSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setSubmitDocumentFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setSubmitDocumentFailed(error?.response?.data));
        break;
      default:
        yield put(setSubmitDocumentFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.GET_FAQ_CLAIM, getFaqClaim),
  takeLatest(CONST.GET_FAQ_CLAIM_DETAIL, getFaqClaimDetail),
  takeLatest(CONST.GET_POLICY_DIGITAL, getPolicyDigital),
  takeLatest(CONST.GET_DOCUMENT_MANDATORY, getDocumentMandatory),
  takeLatest(CONST.SET_UPLOAD_DOCUMENT, setUploadDocument),
  takeLatest(CONST.SET_SUBMIT_DOCUMENT, setSubmitDocument),
  takeLatest(CONST.GET_RS, getRs),
  takeLatest(CONST.GET_LIST_TYPE_BENEFIT, getListBenefitType),
];
