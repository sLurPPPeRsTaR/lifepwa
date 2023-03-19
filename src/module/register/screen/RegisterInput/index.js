import { connect } from 'react-redux';
import {
  setRequestOtp,
  setRegisterClear,
  setRequestOtpClear,
} from '@cp-module/register/registerAction';
import { setBetterOpenApp, setLoading } from '@cp-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  registerAction: state.register.action,
  setRequestOtpFailed: state.register.setRequestOtpFailed,
  setResendRegisterOtp: state.register.setResendRegisterOtp,
  isBajoRunProgress: state?.lifesaver?.isBajoRunProgress,
  deviceId: state.auth.userData.deviceId,
});

const mapDispatchToProps = {
  setRequestOtp: (payload) => setRequestOtp(payload),
  setRegisterClear: (payload) => setRegisterClear(payload),
  setRequestOtpClear: (payload) => setRequestOtpClear(payload),
  setLoading: (payload) => setLoading(payload),
  setBetterOpenApp: (payload) => setBetterOpenApp(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
