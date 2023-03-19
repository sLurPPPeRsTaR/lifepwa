import { connect } from 'react-redux';
import { setUserData } from '@cp-module/auth/authAction';
import { setKycPin, setKycPinClear } from '@cp-module/kyc/kycAction';
import { setSubmission } from '@cp-module/lifesaver/lifesaverAction';
import {
  setCreatePin,
  setCreatePinClear,
} from '@cp-module/profile/profileAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  profileAction: state.profile.action,
  setCreatePinFailed: state.profile.setCreatePinFailed,
  setCreatePinResponse: state.profile.setCreatePinResponse,

  eventId: state.event.eventId,
  accessCode: state.event.accessCode,
  isBajoRunProgress: state?.lifesaver?.isBajoRunProgress,
  kycAction: state.kyc.action,
  lifesaverAction: state.lifesaver.action,
  setKycPinFailed: state.kyc.setKycPinFailed,
  setSubmissionResponse: state.lifesaver.setSubmissionResponse,
  getProductsResponse: state.lifesaver.getProductsResponse,
});

const mapDispatchToProps = {
  setUserData: (payload) => setUserData(payload),
  setCreatePin: (payload) => setCreatePin(payload),
  setCreatePinClear: () => setCreatePinClear(),

  setKycPin: (payload) => setKycPin(payload),
  setKycPinClear: () => setKycPinClear(),
  setSubmission: (payload) => setSubmission(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
