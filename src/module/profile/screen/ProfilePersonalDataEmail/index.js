import { setUserData } from '@cp-module/auth/authAction';
import {
  getPersonalData,
  setPersonalData,
  setEmail,
  setEmailClear,
  setProfileRequestOtp,
  setProfileRequestOtpClear,
  setProfileRequestOtpFailed,
} from '@cp-module/profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  email: state.auth.userData.email,
  deviceId: state.auth.userData.deviceId,
  setPersonalDataFailed: state.profile.setPersonalDataFailed,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
  getPersonalDataFailed: state.profile.getPersonalDataFailed,
  profileAction: state.profile.action,
  setEmailFailed: state.profile.setEmailFailed,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
});

const mapDispatchToProps = {
  setUserData: (payload) => setUserData(payload),
  getPersonalData: (payload) => getPersonalData(payload),
  setPersonalData: (payload) => setPersonalData(payload),
  setEmail: (payload) => setEmail(payload),
  setEmailClear: () => setEmailClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
