import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { setUserData } from '@cp-module/auth/authAction';
import {
  setKycFaceCompare,
  setKycFaceCompareClear,
  setKycH5livenessResult,
  setKycH5livenessResultClear,
  setKycH5livenessToken,
  setKycH5livenessTokenClear,
  setKycIdCardClear,
  setKycSelfie,
  setKycSelfieClear,
  setKycVerifyIdCardClear,
} from '@cp-module/kyc/kycAction';
import { setLivenessTemp } from '@cp-module/persist/persistAction';
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
  setKycH5livenessTokenFailed: state.kyc.setKycH5livenessTokenFailed,
  setKycH5livenessTokenResponse: state.kyc.setKycH5livenessTokenResponse,
  setKycH5livenessResultFailed: state.kyc.setKycH5livenessResultFailed,
  setKycH5livenessResultResponse: state.kyc.setKycH5livenessResultResponse,
  livenessTempState: state.persist.livenessTempState,
  token: state.auth.token.access_token,
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
  setKycH5livenessToken: (payload) => setKycH5livenessToken(payload),
  setKycH5livenessTokenClear: () => setKycH5livenessTokenClear(),
  setKycH5livenessResult: (payload) => setKycH5livenessResult(payload),
  setKycH5livenessResultClear: (payload) =>
    setKycH5livenessResultClear(payload),
  setLivenessTemp: (payload) => setLivenessTemp(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
