import * as CONST from '@cp-module/persist/persistConstant';
import * as STATE from '@cp-module/persist/persistInitialState';
import _ from 'lodash';

const persistInitialState = {
  ...STATE.persistInitialState,
  ...STATE.lifetagInitialState,
  ...STATE.lifetagInitialOrderState,
  ...STATE.lifetagOtherInfoState,
  ...STATE.livenessTempState,
  ...STATE.kkpmTempState,
  ...STATE.kkpmDataKkState,
  ...STATE.updataInitialState,
  ...STATE.buyForOthersFormState,
  ...STATE.widgetsShown,
  action: '',
};

export const persistReducer = (state = persistInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    // LIFETAG INITIALSTATE
    [CONST.SET_LIFETAG_TEMP_STATE]: () => ({
      ...state,
      lifetagTempState: payload,
    }),
    [CONST.SET_LIFETAG_TEMP_STATE_CLEAR]: () => ({
      ...state,
      tempState: persistInitialState.lifetagTempState,
    }),
    [CONST.SET_LIFETAG_TEMP_ORDER_STATE]: () => ({
      ...state,
      lifetagTempOrderState: payload,
    }),
    [CONST.SET_LIFETAG_TEMP_ORDER_STATE_CLEAR]: () => ({
      ...state,
      ...STATE.lifetagInitialOrderState.lifetagTempOrderState,
    }),

    [CONST.SET_IS_COMING_FROM_SCREEN]: () => ({
      ...state,
      isComingFromScreen: payload,
      action: type,
    }),
    [CONST.SET_IS_COMING_FROM_DEEPLINK]: () => ({
      ...state,
      isComingFromDeepLink: payload,
      action: type,
    }),
    [CONST.SET_LIFETAG_OTHER_INFO]: () => ({
      ...state,
      lifetagOtherInfoState: payload,
      action: type,
    }),
    [CONST.SET_LIVENESS_TEMP]: () => ({
      ...state,
      livenessTempState: payload,
      action: type,
    }),
    [CONST.SET_KKPM_TEMP]: () => ({
      ...state,
      kkpmTempState: payload,
      action: type,
    }),
    [CONST.SET_KKPM_DATA_KK]: () => ({
      ...state,
      kkpmDataKkState: payload,
      action: type,
    }),
    [CONST.SET_CLEAR_KKPM]: () => ({
      ...state,
      kkpmTempState: persistInitialState.kkpmTempState,
      kkpmDataKkState: persistInitialState.kkpmDataKkState,
      isKKSame: persistInitialState.isKKSame,
      isKTPSame: persistInitialState.isKTPSame,
      otherInformation: persistInitialState.otherInformation,
      tempState: persistInitialState.tempState,
      action: type,
    }),
    [CONST.SET_IS_KTP_SAME]: () => ({
      ...state,
      isKTPSame: payload,
    }),
    [CONST.SET_IS_KK_SAME]: () => ({
      ...state,
      isKKSame: payload,
    }),
    // OTHERINFORMATION
    [CONST.SET_UPDATA_OTHERINFORMATION]: () => ({
      ...state,
      otherInformation: payload,
    }),
    [CONST.SET_UPDATA_OTHERINFORMATION_CLEAR]: () => ({
      ...state,
      otherInformation: persistInitialState.otherInformation,
    }),
    // TEMP_STATE
    [CONST.SET_UPDATA_TEMP_STATE]: () => ({
      ...state,
      tempState: {
        ...state.tempState,
        ...payload,
      },
    }),
    [CONST.SET_UPDATA_TEMP_STATE_CLEAR]: () => ({
      ...state,
      tempState: persistInitialState.tempState,
    }),
    // BUY FOR OTHERS FORM
    [CONST.SET_BUY_OTHERS_TEMP]: () => ({
      ...state,
      buyForOthersFormState: payload,
    }),
    [CONST.SET_CLEAR_BUY_OTHERS]: () => ({
      ...state,
      buyForOthersFormState: persistInitialState.buyForOthersFormState,
    }),
    [CONST.SET_WIDGET_HOME]: () => {
      return {
        ...state,
        shownsWidget: payload,
      };
    },
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
