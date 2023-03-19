import { connect } from 'react-redux';
import { setLoading, setToastMsg } from '@cp-bootstrap/bootstrapAction';
import {
  setRegisterSocial,
  setRegisterSocialClear,
  setRequestOtpClear,
} from '@cp-module/register/registerAction';
import {
  setLogin,
  setLoginClear,
  setLoginSocial,
  setLoginSocialClear,
} from '@cp-module/login/loginAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  registerAction: state.register.action,
  setRegisterSocialFailed: state.register.setRegisterSocialFailed,
  loginAction: state.login.action,
});

const mapDispatchToProps = {
  setLogin: (payload) => setLogin(payload),
  setLoginClear: () => setLoginClear(),
  setLoading: (payload) => setLoading(payload),
  setRegisterSocial: (payload) => setRegisterSocial(payload),
  setRegisterSocialClear: (payload) => setRegisterSocialClear(payload),
  setLoginSocial: (payload) => setLoginSocial(payload),
  setLoginSocialClear: (payload) => setLoginSocialClear(payload),
  setToastMsg: (payload) => setToastMsg(payload),
  setRequestOtpClear: () => setRequestOtpClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
