import View from './View';
import { connect } from 'react-redux';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import {
  getLifetagCurrentSetting,
  getLifetagCurrentSettingClear,
  getLifetagProfile,
  getLifetagListOtherInfo,
  setLifetagSectionSetting,
  setLifetagSectionSettingClear,
  setLifetagUnlink,
  setLifetagUnlinkClear,
  setLifetagUpdate,
  setLifetagUpdateClear,
  setLinkLifetag,
  setLinkLifetagClear,
} from '@cp-module/lifetag/lifetagAction';
import {
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from '@cp-module/profile/profileAction';
import { setLifetagOtherInfo } from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userData: state.auth.userData,
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
  setLinkLifetagResponse: state.lifetag.setLinkLifetagResponse,
  setLinkLifetagFailed: state.lifetag.setLinkLifetagFailed,
  getLifetagListOtherInfoResponse:
    state.lifetag.getLifetagListOtherInfoResponse,
  getLifetagListOtherInfoFailed: state.lifetag.getLifetagListOtherInfoFailed,
  lifetagOtherInfoState: state.persist.lifetagOtherInfoState,
  userName: state.auth.userData.name,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getLifetagProfile: (payload) => getLifetagProfile(payload),
  getLifetagCurrentSetting: (payload) => getLifetagCurrentSetting(payload),
  getLifetagCurrentSettingClear: () => getLifetagCurrentSettingClear(),
  getLifetagListOtherInfo: (payload) => getLifetagListOtherInfo(payload),
  setLifetagSectionSetting: (payload) => setLifetagSectionSetting(payload),
  setLifetagSectionSettingClear: () => setLifetagSectionSettingClear(),
  setLifetagUpdate: (payload) => setLifetagUpdate(payload),
  setLifetagUpdateClear: () => setLifetagUpdateClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
  setLifetagUnlink: (payload) => setLifetagUnlink(payload),
  setLifetagUnlinkClear: () => setLifetagUnlinkClear(),
  setLinkLifetag: (payload) => setLinkLifetag(payload),
  setLinkLifetagClear: () => setLinkLifetagClear(),
  setLifetagOtherInfo: (payload) => setLifetagOtherInfo(payload)
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
