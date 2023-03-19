import { call, put, debounce } from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from '@cp-module/lifecover/lifecoverConstant';
import { addBeneficiaryApi } from '@cp-module/lifecover/lifecoverApi';
import {
  addBeneficiarySuccess,
  addBeneficiaryFailed,
} from '@cp-module/lifecover/lifecoverAction';

function* addBeneficiary(params) {
  try {
    const response = yield call(addBeneficiaryApi, params.payload);
    yield put(addBeneficiarySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(addBeneficiaryFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(addBeneficiaryFailed(error?.response?.data));
        break;
      default:
        yield put(addBeneficiaryFailed(error?.response?.data));
    }
  }
}

export default [debounce(1000, CONST.ADD_BENEFICIARY, addBeneficiary)];
