import * as CONST from '@cp-module/lifetag/lifetagConstant';
import * as STATE from '@cp-module/lifetag/lifetagInitialState';
import { getLifetagUnlinkRequestOtpSuccess } from './lifetagAction';

const lifetagInitialState = {
  ...STATE.getLifetagProductDetailInitialState,
  ...STATE.getLifetagProfileInitialState,
  ...STATE.getLifetagProfilePublicInitialState,
  ...STATE.setLinkLifetagInitialState,
  ...STATE.setLifetagCreateOrderInitialState,
  ...STATE.getLifetagCurrentSettingInitialState,
  ...STATE.setLifetagSectionSettingInitialState,
  ...STATE.getLifetagListOrderInitialState,
  ...STATE.getLifetagDetailOrderInitialState,
  ...STATE.getLifetagFlagInitialState,
  ...STATE.getLifetagLinkedListInitialState,
  ...STATE.setLifetagUpdateInitialState,
  ...STATE.lifetagInitialState,
  ...STATE.lifetagInitialOrderState,
  ...STATE.setLifetagOrderNoInitialState,
  ...STATE.setLifetagUpdateOrderInitialState,
  ...STATE.getLifetagListOtherInfoInitialState,
  ...STATE.getLifetagVerifyPinInitialState,
  ...STATE.setLifetagUnlinkVerifyOtpInitialState,
  ...STATE.setLifetagUnlinkRequestOtpInitialState,
  action: '',
};

export const lifetagReducer = (state = lifetagInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    // LIFETAG INITIALSTATE
    [CONST.SET_LIFETAG_TEMP_STATE]: () => ({
      ...state,
      lifetagTempState: payload,
    }),
    [CONST.SET_LIFETAG_TEMP_STATE_CLEAR]: () => ({
      ...state,
      tempState: lifetagInitialState.lifetagTempState,
    }),
    [CONST.SET_LIFETAG_TEMP_ORDER_STATE]: () => ({
      ...state,
      lifetagTempOrderState: payload,
    }),
    [CONST.SET_LIFETAG_TEMP_ORDER_STATE_CLEAR]: () => ({
      ...state,
      ...STATE.lifetagInitialOrderState.lifetagTempOrderState,
    }),

    // LIFETAG PRODUCT DETAIL
    [CONST.GET_LIFETAG_PRODUCT_DETAIL]: () => ({
      ...state,
      getLifetagProductDetailParam: payload,
      getLifetagProductDetailFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_PRODUCT_DETAIL_SUCCESS]: () => ({
      ...state,
      getLifetagProductDetailResponse: payload,
      getLifetagProductDetailFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PRODUCT_DETAIL_FAILED]: () => ({
      ...state,
      getLifetagProductDetailFailed: payload,
      getLifetagProductDetailFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PRODUCT_DETAIL_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagProductDetailInitialState,
      action: type,
    }),

    // LIFETAG PROFILE
    [CONST.GET_LIFETAG_PROFILE]: () => ({
      ...state,
      getLifetagProfileParam: payload,
      getLifetagProfileFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_SUCCESS]: () => ({
      ...state,
      getLifetagProfileResponse: payload,
      getLifetagProfileFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_FAILED]: () => ({
      ...state,
      getLifetagProfileFailed: payload,
      getLifetagProfileFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagProfileInitialState,
      action: type,
    }),

    // LIFETAG PROFILE PUBLIC
    [CONST.GET_LIFETAG_PROFILE_PUBLIC]: () => ({
      ...state,
      getLifetagProfilePublicParam: payload,
      getLifetagProfilePublicFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_PUBLIC_SUCCESS]: () => ({
      ...state,
      getLifetagProfilePublicResponse: payload,
      getLifetagProfilePublicFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_PUBLIC_FAILED]: () => ({
      ...state,
      getLifetagProfilePublicFailed: payload,
      getLifetagProfilePublicFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_PUBLIC_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagProfilePublicInitialState,
      action: type,
    }),

    // LIFETAG LINK
    [CONST.SET_LINK_LIFETAG]: () => ({
      ...state,
      setLinkLifetagParam: payload,
      setLinkLifetagFetch: true,
      action: type,
    }),
    [CONST.SET_LINK_LIFETAG_SUCCESS]: () => ({
      ...state,
      setLinkLifetagResponse: payload,
      setLinkLifetagFetch: false,
      action: type,
    }),
    [CONST.SET_LINK_LIFETAG_FAILED]: () => ({
      ...state,
      setLinkLifetagFailed: payload,
      setLinkLifetagFetch: false,
      action: type,
    }),
    [CONST.SET_LINK_LIFETAG_CLEAR]: () => ({
      ...state,
      ...STATE.setLinkLifetagInitialState,
      action: type,
    }),

    // LIFETAG CREATE ORDER
    [CONST.SET_LIFETAG_CREATE_ORDER]: () => ({
      ...state,
      setLifetagCreateOrderParam: payload,
      setLifetagCreateOrderFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_CREATE_ORDER_SUCCESS]: () => ({
      ...state,
      setLifetagCreateOrderResponse: payload,
      setLifetagCreateOrderFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_CREATE_ORDER_FAILED]: () => ({
      ...state,
      setLifetagCreateOrderFailed: payload,
      setLifetagCreateOrderFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_CREATE_ORDER_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagCreateOrderInitialState,
      action: type,
    }),

    // LIFETAG CURRENT SETTING
    [CONST.GET_LIFETAG_CURRENT_SETTING]: () => ({
      ...state,
      getLifetagCurrentSettingParam: payload,
      getLifetagCurrentSettingFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_CURRENT_SETTING_SUCCESS]: () => ({
      ...state,
      getLifetagCurrentSettingResponse: payload,
      getLifetagCurrentSettingFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_CURRENT_SETTING_FAILED]: () => ({
      ...state,
      getLifetagCurrentSettingFailed: payload,
      getLifetagCurrentSettingFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_CURRENT_SETTING_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagCurrentSettingInitialState,
      action: type,
    }),

    // LIFETAG SECTION SETTING
    [CONST.SET_LIFETAG_SECTION_SETTING]: () => ({
      ...state,
      setLifetagSectionSettingParam: payload,
      setLifetagSectionSettingFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_SECTION_SETTING_SUCCESS]: () => ({
      ...state,
      setLifetagSectionSettingResponse: payload,
      setLifetagSectionSettingFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_SECTION_SETTING_FAILED]: () => ({
      ...state,
      setLifetagSectionSettingFailed: payload,
      setLifetagSectionSettingFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_SECTION_SETTING_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagSectionSettingInitialState,
      action: type,
    }),

    // LIFETAG LIST ORDER
    [CONST.GET_LIFETAG_LIST_ORDER]: () => ({
      ...state,
      getLifetagListOrderParam: payload,
      getLifetagListOrderFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_ORDER_SUCCESS]: () => ({
      ...state,
      getLifetagListOrderResponse: payload,
      getLifetagListOrderFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_ORDER_FAILED]: () => ({
      ...state,
      getLifetagListOrderFailed: payload,
      getLifetagListOrderFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_ORDER_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagListOrderInitialState,
      action: type,
    }),

    // LIFETAG DETAIL ORDER
    [CONST.GET_LIFETAG_DETAIL_ORDER]: () => ({
      ...state,
      getLifetagDetailOrderParam: payload,
      getLifetagDetailOrderFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_DETAIL_ORDER_SUCCESS]: () => ({
      ...state,
      getLifetagDetailOrderResponse: payload,
      getLifetagDetailOrderFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_DETAIL_ORDER_FAILED]: () => ({
      ...state,
      getLifetagDetailOrderFailed: payload,
      getLifetagDetailOrderFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_DETAIL_ORDER_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagDetailOrderInitialState,
      action: type,
    }),

    // LIFETAG FLAG
    [CONST.GET_LIFETAG_FLAG]: () => ({
      ...state,
      getLifetagFlagParam: payload,
      getLifetagFlagFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_FLAG_SUCCESS]: () => ({
      ...state,
      getLifetagFlagResponse: payload,
      getLifetagFlagFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_FLAG_FAILED]: () => ({
      ...state,
      getLifetagFlagFailed: payload,
      getLifetagFlagFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_FLAG_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagFlagInitialState,
    }),

    // LIFETAG UPDATE
    [CONST.SET_LIFETAG_UPDATE]: () => ({
      ...state,
      setLifetagUpdateParam: payload,
      setLifetagUpdateFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_SUCCESS]: () => ({
      ...state,
      setLifetagUpdateResponse: payload,
      setLifetagUpdateFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_FAILED]: () => ({
      ...state,
      setLifetagUpdateFailed: payload,
      setLifetagUpdateFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagUpdateInitialState,
      action: type,
    }),

    // PRODUCT LIFETAG
    [CONST.GET_LIFETAG_LINKED_LIST]: () => ({
      ...state,
      getLifetagLinkedListParam: payload,
      getLifetagLinkedListFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_LINKED_LIST_SUCCESS]: () => ({
      ...state,
      getLifetagLinkedListResponse: payload,
      getLifetagLinkedListFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LINKED_LIST_FAILED]: () => ({
      ...state,
      getLifetagLinkedListFailed: payload,
      getLifetagLinkedListFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LINKED_LIST_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagLinkedListInitialState,
      action: type,
    }),

    // LIFETAG UNLINK
    [CONST.SET_LIFETAG_UNLINK]: () => ({
      ...state,
      setLifetagUnlinkParam: payload,
      setLifetagUnlinkFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_SUCCESS]: () => ({
      ...state,
      setLifetagUnlinkResponse: payload,
      setLifetagUnlinkFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_FAILED]: () => ({
      ...state,
      setLifetagUnlinkFailed: payload,
      setLifetagUnlinkFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagUnlinkInitialState,
      action: type,
    }),

    // LIFETAG ORDER NO
    [CONST.SET_LIFETAG_ORDERNO]: () => ({
      ...state,
      setLifetagOrderNoParam: payload,
      setLifetagOrderNoFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_ORDERNO_SUCCESS]: () => ({
      ...state,
      setLifetagOrderNoResponse: payload,
      setLifetagOrderNoFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_ORDERNO_FAILED]: () => ({
      ...state,
      setLifetagOrderNoFailed: payload,
      setLifetagOrderNoFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_ORDERNO_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagOrderNoInitialState,
      action: type,
    }),

    // LIFETAG UPDATE ORDER
    [CONST.SET_LIFETAG_UPDATE_ORDER]: () => ({
      ...state,
      setLifetagUpdateOrderParam: payload,
      setLifetagUpdateOrderFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_ORDER_SUCCESS]: () => ({
      ...state,
      setLifetagUpdateOrderResponse: payload,
      setLifetagUpdateOrderFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_ORDER_FAILED]: () => ({
      ...state,
      setLifetagUpdateOrderFailed: payload,
      setLifetagUpdateOrderFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_ORDER_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagUpdateOrderInitialState,
      action: type,
    }),

    // LIFETAG OTHER INFO
    [CONST.GET_LIFETAG_LIST_OTHER_INFO]: () => ({
      ...state,
      getLifetagListOtherInfoParam: payload,
      getLifetagListOtherInfoFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_OTHER_INFO_SUCCESS]: () => ({
      ...state,
      getLifetagListOtherInfoResponse: payload,
      getLifetagListOtherInfoFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_OTHER_INFO_FAILED]: () => ({
      ...state,
      getLifetagListOtherInfoFailed: payload,
      getLifetagListOtherInfoFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_OTHER_INFO_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagListOtherInfoInitialState,
      action: type,
    }),

    // VERIFY PIN
    [CONST.GET_LIFETAG_VERIFY_PIN]: () => ({
      ...state,
      getLifetagVerifyPinParam: payload,
      getLifetagVerifyPinFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_VERIFY_PIN_SUCCESS]: () => ({
      ...state,
      getLifetagVerifyPinResponse: payload,
      getLifetagVerifyPinFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_VERIFY_PIN_FAILED]: () => ({
      ...state,
      getLifetagVerifyPinFailed: payload,
      getLifetagVerifyPinFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_VERIFY_PIN_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagVerifyPinInitialState,
      action: type,
    }),
    // REQUEST OTP
    [CONST.SET_LIFETAG_UNLINK_REQUEST_OTP]: () => ({
      ...state,
      setLifetagUnlinkResendRequestOtp: payload.setLifetagUnlinkResendRequestOtp,
      setLifetagUnlinkRequestOtpParam: {
        ...payload,
        setLifetagUnlinkResendRequestOtp: undefined,
      },
      setLifetagUnlinkRequestOtpFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_REQUEST_OTP_SUCCESS]: () => ({
      ...state,
      setRequestOtpResponse: payload,
      setLifetagUnlinkRequestOtpFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_REQUEST_OTP_FAILED]: () => ({
      ...state,
      setLifetagUnlinkRequestOtpFailed: payload,
      setLifetagUnlinkRequestOtpFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_REQUEST_OTP_CLEAR]: () => ({
      ...state,
      setLifetagUnlinkRequestOtpFailed:
        lifetagInitialState.setLifetagUnlinkRequestOtpFailed,
      setLifetagUnlinkRequestOtpFetch: lifetagInitialState.setLifetagUnlinkRequestOtpFetch,
      setLifetagUnlinkResendRequestOtp:
        lifetagInitialState.setLifetagUnlinkResendRequestOtp,
      action: type,
    }),
    // VERIFY OTP
    [CONST.SET_LIFETAG_UNLINK_VERIFY_OTP]: () => ({
      ...state,
      setLifetagUnlinkResendVerifyOtp: payload.setLifetagUnlinkResendVerifyOtp,
      setLifetagUnlinkVerifyOtpParam: {
        ...payload,
        setLifetagUnlinkResendVerifyOtp: undefined,
      },
      setLifetagUnlinkVerifyOtpFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_VERIFY_OTP_SUCCESS]: () => ({
      ...state,
      setRequestOtpResponse: payload,
      setLifetagUnlinkVerifyOtpFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_VERIFY_OTP_FAILED]: () => ({
      ...state,
      setLifetagUnlinkVerifyOtpFailed: payload,
      setLifetagUnlinkVerifyOtpFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_VERIFY_OTP_CLEAR]: () => ({
      ...state,
      setLifetagUnlinkVerifyOtpFailed: lifetagInitialState.setLifetagUnlinkVerifyOtpFailed,
      setLifetagUnlinkVerifyOtpFetch: lifetagInitialState.setLifetagUnlinkVerifyOtpFetch,
      setLifetagUnlinkResendVerifyOtp: lifetagInitialState.setLifetagUnlinkResendVerifyOtp,
      action: type,
    }),
    [CONST.SET_LIFETAG_CREATE_PIN]: () => ({
      ...state,
      setLifetagCreatePinParam: payload,
      setLifetagCreatePinFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_CREATE_PIN_SUCCESS]: () => ({
      ...state,
      setLifetagCreatePinResponse: payload,
      setLifetagCreatePinFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_CREATE_PIN_FAILED]: () => ({
      ...state,
      setLifetagCreatePinFailed: payload,
      setLifetagCreatePinFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_CREATE_PIN_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagCreatePinInitialState,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
