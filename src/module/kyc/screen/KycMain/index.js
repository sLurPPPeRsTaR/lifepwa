import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { setUserData } from '@cp-module/auth/authAction';
import {
  setKycIdCard,
  setKycIdCardClear,
  setKycSelfieClear,
  setKycVerifyDukcapilClear,
  setKycVerifyIdCardClear,
} from '@cp-module/kyc/kycAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userId: state.auth.userData.userId,
  kycAction: state.kyc.action,
  setKycIdCardFailed: state.kyc.setKycIdCardFailed,
  alreadyLivenessTest: state.auth.userData.alreadyLivenessTest,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setKycSelfieClear: () => setKycSelfieClear(),
  setKycIdCard: (payload) => setKycIdCard(payload),
  setKycIdCardClear: () => setKycIdCardClear(),
  setUserData: (payload) => setUserData(payload),
  setKycVerifyIdCardClear: (payload) => setKycVerifyIdCardClear(payload),
  setKycVerifyDukcapilClear: (payload) => setKycVerifyDukcapilClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
