import View from './View';
import { connect } from 'react-redux';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import {
  getLifetagCurrentSetting,
  getLifetagCurrentSettingClear,
  getLifetagProfile,
  setLifetagSectionSetting,
  setLifetagSectionSettingClear,
  setLifetagUnlink,
  setLifetagUnlinkClear,
  setLifetagUpdate,
  setLifetagUpdateClear,
  getLifetagVerifyPin,
  getLifetagVerifyPinClear,
  setLifetagUnlinkRequestOtp,
  setLifetagUnlinkRequestOtpClear,
  setLifetagUnlinkVerifyOtp,
  setLifetagUnlinkVerifyOtpClear,
  setLifetagCreatePin,
  setLifetagCreatePinClear,
} from '@cp-module/lifetag/lifetagAction';
import {
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from '@cp-module/profile/profileAction';

const mapStateToProps = (state) => {
  return {
    lang: state.auth.lang,
    userId: state.auth.userData.userId,
    lifetagAction: state.lifetag.action,
    profileAction: state.profile.action,
    getLifetagCurrentSettingResponse:
      state.lifetag.getLifetagCurrentSettingResponse,
    getLifetagCurrentSettingFailed: state.lifetag.getLifetagCurrentSettingFailed,
    setLifetagSectionSettingResponse:
      state.lifetag.setLifetagSectionSettingResponse,
    setLifetagSectionSettingFailed: state.lifetag.setLifetagSectionSettingFailed,
    setLifetagUpdateFailed: state.lifetag.setLifetagUpdateFailed,
    setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
    userMobilePhoneNumber: state.auth.userData.mobilePhoneNumber,
    setLifetagUnlinkFailed: state.lifetag.setLifetagUnlinkFailed,
    getLifetagProfileResponse: state.lifetag.getLifetagProfileResponse,
    getLifetagVerifyPinResponse: state.profile.getLifetagVerifyPinResponse,
    getLifetagVerifyPinFailed: state.profile.getLifetagVerifyPinFailed,
    setLifetagUnlinkRequestOtpFailed: state.lifetag.setLifetagUnlinkRequestOtpFailed,
    setLifetagUnlinkVerifyOtpFailed: state.lifetag.setLifetagUnlinkVerifyOtpFailed,
    setLifetagCreatePinFailed: state.profile.setLifetagCreatePinFailed,
    setLifetagCreatePinResponse: state.profile.setLifetagCreatePinResponse,  
    userEmail: state.auth.userData.email,
    userData: state.auth.userData,
  }
};

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getLifetagVerifyPin: (payload) => getLifetagVerifyPin(payload),
  getLifetagVerifyPinClear: (payload) => getLifetagVerifyPinClear(payload),
  getLifetagProfile: (payload) => getLifetagProfile(payload),
  getLifetagCurrentSetting: (payload) => getLifetagCurrentSetting(payload),
  getLifetagCurrentSettingClear: () => getLifetagCurrentSettingClear(),
  setLifetagSectionSetting: (payload) => setLifetagSectionSetting(payload),
  setLifetagSectionSettingClear: () => setLifetagSectionSettingClear(),
  setLifetagUpdate: (payload) => setLifetagUpdate(payload),
  setLifetagUpdateClear: () => setLifetagUpdateClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
  setLifetagUnlink: (payload) => setLifetagUnlink(payload),
  setLifetagUnlinkClear: () => setLifetagUnlinkClear(),
  setLifetagUnlinkRequestOtp: (payload) => setLifetagUnlinkRequestOtp(payload),
  setLifetagUnlinkRequestOtpClear: (payload) => setLifetagUnlinkRequestOtpClear(payload),
  setLifetagUnlinkVerifyOtp: (payload) => setLifetagUnlinkVerifyOtp(payload),
  setLifetagUnlinkVerifyOtpClear: (payload) => setLifetagUnlinkVerifyOtpClear(payload),
  setLifetagCreatePin: (payload) => setLifetagCreatePin(payload),
  setLifetagCreatePinClear: (payload) => setLifetagCreatePinClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
