import {call, put, takeLatest} from 'redux-saga/effects';
import { RESPONSE_STATUS } from '@cp-util/constant';
import * as CONST from './constant'
import { checkBmiApi } from './api'; 
import {checkBmiSuccess, checkBmiFailed} from './action' 

function* checkBmi(params) {
    try{
        const response = yield call(checkBmiApi, params.payload);
        yield put(checkBmiSuccess(response?.data));
    } catch (error) {
        switch (error?.response?.status) {
            case RESPONSE_STATUS.BAD_REQUEST:
                yield put(checkBmiFailed(error?.response?.data));
                break;
            case RESPONSE_STATUS.ERROR:
                yield put(checkBmiFailed(error?.response?.data));
                break;
            default:
                yield put(checkBmiFailed(error?.response?.data))
        }
    }
}

export default [takeLatest(CONST.CHECK_BMI, checkBmi)];