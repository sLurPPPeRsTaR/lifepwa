import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { setUserData } from '@cp-module/auth/authAction';
import {
  setKycFaceCompare,
  setKycFaceCompareClear,
  setKycIdCardClear,
  setKycSelfie,
  setKycSelfieClear,
  setKycVerifyIdCardClear,
} from '@cp-module/kyc/kycAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  kycAction: state.kyc.action,
  userData: state.auth.userData,
  setKycSelfieResponse: state.kyc.setKycSelfieResponse,
  setKycSelfieFailed: state.kyc.setKycSelfieFailed,
  setKycFaceCompareFailed: state.kyc.setKycFaceCompareFailed,
});

const mapDispatchToProps = {
  setKycSelfie: (payload) => setKycSelfie(payload),
  setKycSelfieClear: () => setKycSelfieClear(),
  setLoading: (payload) => setLoading(payload),
  setUserData: (payload) => setUserData(payload),
  setKycFaceCompare: (payload) => setKycFaceCompare(payload),
  setKycFaceCompareClear: () => setKycFaceCompareClear(),
  setKycIdCardClear: (payload) => setKycIdCardClear(payload),
  setKycVerifyIdCardClear: (payload) => setKycVerifyIdCardClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
