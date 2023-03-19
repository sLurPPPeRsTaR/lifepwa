import { connect } from 'react-redux';
// import {
//   setLinkPolicy,
//   getPolicyClear,
//   getPolicy,
// } from '@cp-modul/home/homeAction';
import View from './View';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import {
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from '@cp-module/profile/profileAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  // homeAction: state.home.action,
  // setLinkPolicyError: state.home.setLinkPolicyError,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  // setLinkPolicy: (payload) => setLinkPolicy(payload),
  // getPolicyClear: (payload) => getPolicyClear(payload),
  // getPolicy: (payload) => getPolicy(payload),
  setLoading: (payload) => setLoading(payload),
  onHandleRequestOTP: (payload) => setProfileRequestOtp(payload),
  onHandleRequestOTPClear: (payload) => {
    return setProfileRequestOtpClear(payload);
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
