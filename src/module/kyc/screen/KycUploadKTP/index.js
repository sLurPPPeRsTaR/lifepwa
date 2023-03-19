import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { setUserData } from '@cp-module/auth/authAction';
import {
  setKycFaceCompare,
  setKycFaceCompareClear,
  setKycIdCard,
  setKycIdCardClear,
  setKycVerifyDukcapilClear,
  setKycVerifyIdCardClear,
} from '@cp-module/kyc/kycAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  kycAction: state.kyc.action,
  setKycIdCardFailed: state.kyc.setKycIdCardFailed,
  setKycFaceCompareFailed: state.kyc.setKycFaceCompareFailed,
  alreadyLivenessTest: state.auth.userData.alreadyLivenessTest,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setKycFaceCompare: (payload) => setKycFaceCompare(payload),
  setKycIdCard: (payload) => setKycIdCard(payload),
  setKycIdCardClear: () => setKycIdCardClear(),
  setUserData: (payload) => setUserData(payload),
  setKycFaceCompareClear: () => setKycFaceCompareClear(),
  setKycVerifyIdCardClear: (payload) => setKycVerifyIdCardClear(payload),
  setKycVerifyDukcapilClear: (payload) => setKycVerifyDukcapilClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
