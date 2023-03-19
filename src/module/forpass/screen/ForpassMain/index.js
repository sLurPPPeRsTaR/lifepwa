import { connect } from 'react-redux';
import {
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from '@cp-module/profile/profileAction';
import View from './View';
import { setLoading } from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
});

const mapDispatchToProps = {
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
