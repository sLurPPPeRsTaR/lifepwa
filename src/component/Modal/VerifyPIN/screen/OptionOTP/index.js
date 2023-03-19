import {
  setLoading,
  setInternalServerError,
} from '@cp-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import {
  setAuthRequestOTP,
  setAuthRequestOTPClear,
  setAuthVerifyOTP,
  setAuthVerifyOTPClear,
  setUserData,
} from '@cp-module/auth/authAction';
import View from './View';

const mapStateToProps = (state) => {
  return {
    lang: state.auth.lang,
    authAction: state.auth.action,
    setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
    userData: state.auth.userData,
    setAuthRequestOTPFailed: state.auth.setAuthRequestOTPFailed,
    deviceId: state.auth.userData.deviceId,
  };
};

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setInternalServerError: (payload) => setInternalServerError(payload),
  setAuthRequestOTP: (payload) => setAuthRequestOTP(payload),
  setAuthRequestOTPClear: (payload) => setAuthRequestOTPClear(payload),
  setAuthVerifyOTP: (payload) => setAuthVerifyOTP(payload),
  setAuthVerifyOTPClear: (payload) => setAuthVerifyOTPClear(payload),
  setUserData: (payload) => setUserData(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
