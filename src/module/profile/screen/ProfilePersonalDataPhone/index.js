import { setUserData } from '@cp-module/auth/authAction';
import {
  getPersonalData,
  setPersonalData,
  setPhoneNumber,
  setPhoneNumberClear,
  setProfileRequestOtp,
  setProfileRequestOtpClear
} from '@cp-module/profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  phone: state.auth.userData.mobilePhoneNumber,
  deviceId: state.auth.userData.deviceId,
  setPersonalDataFailed: state.profile.setPersonalDataFailed,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
  getPersonalDataFailed: state.profile.getPersonalDataFailed,
  profileAction: state.profile.action,
  setPhoneNumberFailed: state.profile.setPhoneNumberFailed,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
});

const mapDispatchToProps = {
  setUserData: (payload) => setUserData(payload),
  getPersonalData: (payload) => getPersonalData(payload),
  setPersonalData: (payload) => setPersonalData(payload),
  setPhoneNumber: (payload) => setPhoneNumber(payload),
  setPhoneNumberClear: () => setPhoneNumberClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
