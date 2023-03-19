import { connect } from 'react-redux';
import {
  setLogin,
  setLoginClear,
  setLoginSocial,
  setLoginSocialClear,
} from '@cp-module/login/loginAction';
import { setLoading, setToastMsg } from '@cp-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  isBajoRunProgress: state?.lifesaver?.isBajoRunProgress,
  loginAction: state.login.action,
  setLoginFailed: state.login.setLoginFailed,
  setLoginSocialFailed: state.login.setLoginSocialFailed,
  alreadyKYC: state.auth.userData.alreadyKYC,
  userId: state.auth.userData.userId,
});

const mapDispatchToProps = {
  setLogin: (payload) => setLogin(payload),
  setLoginClear: () => setLoginClear(),
  setLoginSocial: (payload) => setLoginSocial(payload),
  setLoginSocialClear: (payload) => setLoginSocialClear(payload),
  setLoading: (payload) => setLoading(payload),
  setToastMsg: (payload) => setToastMsg(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
