import { connect } from 'react-redux';
import {
  setRegisterSocial,
  setRegisterSocialClear,
  setRequestOtp,
  setRequestOtpClear,
} from '@cp-module/register/registerAction';
import { setBetterOpenApp, setLoading } from '@cp-bootstrap/bootstrapAction';
import { setUserData } from '@cp-module/auth/authAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  registerAction: state.register.action,
  setRegisterSocialFailed: state.register.setRegisterSocialFailed,
  setRequestOtpFailed: state.register.setRequestOtpFailed,
  setRequestOtpResponse: state.register.setRequestOtpResponse,
});

const mapDispatchToProps = {
  setRegisterSocial: (payload) => setRegisterSocial(payload),
  setLoading: (payload) => setLoading(payload),
  setRegisterSocialClear: () => setRegisterSocialClear(),
  setUserData: (payload) => setUserData(payload),
  setRequestOtp: (payload) => setRequestOtp(payload),
  setRequestOtpClear: () => setRequestOtpClear(),
  setBetterOpenApp: (payload) => setBetterOpenApp(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
