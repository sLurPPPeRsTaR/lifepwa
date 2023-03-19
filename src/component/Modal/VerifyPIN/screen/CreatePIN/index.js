import {
  setLoading,
  setInternalServerError,
} from '@cp-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import {
  setAuthCreatePIN,
  setAuthCreatePINClear,
  setUserData,
} from '@cp-module/auth/authAction';
import View from './View';

const mapStateToProps = (state) => {
  return {
    lang: state.auth.lang,
    authAction: state.auth.action,
    setAuthCreatePINFailed: state.auth.setAuthCreatePINFailed,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setInternalServerError: (payload) => setInternalServerError(payload),
  setAuthCreatePIN: (payload) => setAuthCreatePIN(payload),
  setAuthCreatePINClear: () => setAuthCreatePINClear(),
  setUserData: (payload) => setUserData(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
