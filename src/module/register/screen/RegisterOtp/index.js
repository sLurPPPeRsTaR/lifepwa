import { connect } from 'react-redux';
import {
  setRegister,
  setRegisterClear,
  setRegisterSocial,
  setRegisterSocialClear,
  setRequestOtp,
  setRequestOtpClear,
} from '@cp-module/register/registerAction';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import {
  setProfileRequestOtp,
  setProfileVerifyOtp,
  setProfileVerifyOtpClear,
} from '@cp-module/profile/profileAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  registerAction: state.register.action,
  deviceId: state.auth.userData.deviceId,
  setRequestOtpSuccess: state.register.setRequestOtpSuccess,
  setRequestOtpFailed: state.register.setRequestOtpFailed,
  setRequestOtpParam: state.register.setRequestOtpParam,
  setResendRegisterOtp: state.register.setResendRegisterOtp,
  setRegisterFailed: state.register.setRegisterFailed,
  setRegisterSocialFailed: state.register.setRegisterSocialFailed,
  userData: state.auth.userData,
  setProfileRequestOtpParam: state.profile.setProfileRequestOtpParam,
  setProfileVerifyOtpFailed: state.profile.setProfileVerifyOtpFailed,
  profileAction: state.profile.action,
});

const mapDispatchToProps = {
  setRegister: (payload) => setRegister(payload),
  setRequestOtp: (payload) => setRequestOtp(payload),
  setRequestOtpClear: () => setRequestOtpClear(),
  setRegisterClear: () => setRegisterClear(),
  setLoading: (payload) => setLoading(payload),
  setRegisterSocial: (payload) => setRegisterSocial(payload),
  setRegisterSocialClear: () => setRegisterSocialClear(),
  setProfileVerifyOtp: (payload) => setProfileVerifyOtp(payload),
  setProfileVerifyOtpClear: () => setProfileVerifyOtpClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
