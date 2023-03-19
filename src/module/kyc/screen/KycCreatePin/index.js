import { setUserData } from '@cp-module/auth/authAction';
import { setKycPin, setKycPinClear } from '@cp-module/kyc/kycAction';
import { setSubmission } from '@cp-module/lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  eventId: state.event.eventId,
  accessCode: state.event.accessCode,
  isBajoRunProgress: state?.lifesaver?.isBajoRunProgress,
  kycAction: state.kyc.action,
  lifesaverAction: state.lifesaver.action,
  setKycPinFailed: state.kyc.setKycPinFailed,
  setSubmissionResponse: state.lifesaver.setSubmissionResponse,
  getProductsResponse: state.lifesaver.getProductsResponse,
  userId: state.auth.userData.userId,
});

const mapDispatchToProps = {
  setKycPin: (payload) => setKycPin(payload),
  setKycPinClear: () => setKycPinClear(),
  setUserData: (payload) => setUserData(payload),
  setSubmission: (payload) => setSubmission(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
