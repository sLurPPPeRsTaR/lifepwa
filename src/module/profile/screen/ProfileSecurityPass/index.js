import { connect } from 'react-redux';
import { setLogout, setUserData } from '@cp-module/auth/authAction';
import {
  setChangePass,
  setChangePassClear,
} from '@cp-module/profile/profileAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  profileAction: state.profile.action,
  setChangePassResponse: state.profile.setChangePassResponse,
  setChangePassFailed: state.profile.setChangePassFailed,
});

const mapDispatchToProps = {
  setLogout: () => setLogout(),
  setUserData: (payload) => setUserData(payload),
  setChangePass: (payload) => setChangePass(payload),
  setChangePassClear: () => setChangePassClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
