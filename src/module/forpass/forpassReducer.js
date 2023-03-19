import * as CONST from '@cp-module/forpass/forpassConstant';
import * as STATE from '@cp-module/forpass/forpassInitialState';

const forpassInitialState = {
  ...STATE.getResetPasswordInitialState,
  ...STATE.setResetPasswordInitialState,
  action: '',
};

export const forpassReducer = (state = forpassInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.GET_RESET_PASS]: () => ({
      ...state,
      getResetPasswordParam: payload,
      getResetPasswordFetch: true,
      action: type,
    }),
    [CONST.GET_RESET_PASS_SUCCESS]: () => ({
      ...state,
      getResetPasswordResponse: payload,
      getResetPasswordFetch: false,
      action: type,
    }),
    [CONST.GET_RESET_PASS_FAILED]: () => ({
      ...state,
      getResetPasswordFailed: payload,
      getResetPasswordFetch: false,
      action: type,
    }),
    [CONST.GET_RESET_PASS_CLEAR]: () => ({
      ...state,
      ...STATE.getResetPasswordInitialState,
      action: type,
    }),

    [CONST.SET_RESET_PASS]: () => ({
      ...state,
      setResetPasswordParam: payload,
      setResetPasswordFetch: true,
      action: type,
    }),
    [CONST.SET_RESET_PASS_SUCCESS]: () => ({
      ...state,
      setResetPasswordResponse: payload,
      setResetPasswordFetch: false,
      action: type,
    }),
    [CONST.SET_RESET_PASS_FAILED]: () => ({
      ...state,
      setResetPasswordFailed: payload,
      setResetPasswordFetch: false,
      action: type,
    }),
    [CONST.SET_RESET_PASS_CLEAR]: () => ({
      ...state,
      ...STATE.setResetPasswordInitialState,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
