import * as CONST from './constant'

export const checkBmi = (payload) => ({
    type: CONST.CHECK_BMI,
    payload,
});
export const checkBmiSuccess = (payload) => ({
    type: CONST.CHECK_BMI_SUCCESS,
    payload,
});
export const checkBmiFailed = (payload) => ({
    type: CONST.CHECK_BMI_FAILED,
    payload,
})