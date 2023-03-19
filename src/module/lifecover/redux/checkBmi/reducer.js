import * as CONST from './constant'

const checkBmiReducer = (state, action) => {
    const {payload, type} = action;
    return {
        [CONST.CHECK_BMI]: () => ({
            ...state,
            checkBmiParam: payload,
            checkBmiResponse: null,
            checkBmiFailed: null,
            checkBmiFetch: true,
            action: type,
        }),

        [CONST.CHECK_BMI_SUCCESS]: () => ({
            ...state,
            checkBmiResponse: payload,
            checkBmiFailed: null,
            checkBmiFetch: false,
            action: type,
        }),

        [CONST.CHECK_BMI_FAILED]: () => ({
            ...state,
            checkBmiResponse: null,
            checkBmiFailed: payload,
            checkBmiFetch: false,
            action: type,
        }),
    }
}

export default checkBmiReducer;