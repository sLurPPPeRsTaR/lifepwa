import * as CONST from './constant';

const getUserConfirmationDetailReducer = (state, action) => {
  const { payload, type } = action;
  return {
    [CONST.GET_USER_CONFIRMATION]: () => ({
      ...state,
      getUserConfirmationDetailFetch: true,
      getUserConfirmationDetailParam: payload,
      getUserConfirmationDetailResponse: null,
      getUserConfirmationDetailFailed: null,
      action: type,
    }),

    [CONST.GET_USER_CONFIRMATION_SUCCESS]: () => ({
      ...state,
      getUserConfirmationDetailResponse: payload,
      getUserConfirmationDetailFailed: null,
      getUserConfirmationDetailFetch: false,
      action: type,
    }),

    [CONST.GET_USER_CONFIRMATION_FAILED]: () => ({
      ...state,
      getUserConfirmationDetailResponse: null,
      getUserConfirmationDetailFailed: payload,
      getUserConfirmationDetailFetch: false,
      action: type,
    }),
  };
};

export default getUserConfirmationDetailReducer;
