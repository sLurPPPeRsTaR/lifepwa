import { call, put, debounce } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/lifecover/lifecoverConstant';
import { getBeneficiaryApi } from '@cp-module/lifecover/lifecoverApi';
import {
  getBeneficiarySuccess,
  getBeneficiaryFailed,
} from '@cp-module/lifecover/lifecoverAction';

function* getBeneficiary(params) {
  try {
    const response = yield call(getBeneficiaryApi, params.payload);
    yield put(getBeneficiarySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getBeneficiaryFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getBeneficiaryFailed(error?.response?.data));
        break;
      default:
        yield put(getBeneficiaryFailed(error?.response?.data));
    }
  }
}

export default [debounce(1000, CONST.GET_BENEFICIARY, getBeneficiary)];
