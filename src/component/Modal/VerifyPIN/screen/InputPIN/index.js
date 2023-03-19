import {
  setLoading,
  setInternalServerError,
} from '@cp-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import {
  setAuthVerifyPIN,
  setAuthVerifyPINClear,
  setAuthRequestOTP,
  setAuthRequestOTPClear,
} from '@cp-module/auth/authAction';
import View from './View';

const mapStateToProps = (state) => {
  return {
    lang: state.auth.lang,
    authAction: state.auth.action,
    setAuthVerifyPINFailed: state.auth.setAuthVerifyPINFailed,
    setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
    userData: state.auth.userData,
    profileAction: state.profile.action,
  };
};

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setInternalServerError: (payload) => setInternalServerError(payload),
  setAuthVerifyPIN: (payload) => setAuthVerifyPIN(payload),
  setAuthVerifyPINClear: () => setAuthVerifyPINClear(),
  setAuthRequestOTP: (payload) => setAuthRequestOTP(payload),
  setAuthRequestOTPClear: (payload) => setAuthRequestOTPClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
