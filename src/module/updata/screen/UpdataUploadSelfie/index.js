import { connect } from 'react-redux';
import {
  getUpdataDetailEKyc,
  getUpdataDetailEKycClear,
  setUpdataLivenessClear,
  setUpdataLiveness,
  setUpdataLivenessFailed,
  setUpdataFaceCompare,
  setUpdataFaceCompareFailed,
  setUpdataFaceCompareClear,
  getUpdataValidationCheck,
} from '@cp-module/updata/updataAction';
import View from './View';
import { setLoading, setToastMsg } from '@cp-bootstrap/bootstrapAction';
import {
  setClearKkpm,
  setIsKTPSame,
  setKkpmTemp,
  setLivenessTemp,
} from '@cp-module/persist/persistAction';
import {
  setKycH5livenessResult,
  setKycH5livenessResultClear,
  setKycH5livenessToken,
  setKycH5livenessTokenClear,
  setKycSelfie,
} from '@cp-module/kyc/kycAction';
import { setUserData } from '@cp-module/auth/authAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  updataAction: state.updata.action,
  getUpdataDetailEKycResponse: state.updata.getUpdataDetailEKycResponse,
  getUpdataDetailEKycFailed: state.updata.getUpdataDetailEKycFailed,
  getUpdataDetailEKycFetch: state.updata.getUpdataDetailEKycFetch,
  setUpdataLivenessResponse: state.updata.setUpdataLivenessResponse,
  getUpdataValidationCheckResponse:
    state.updata.getUpdataValidationCheckResponse,
  setKycH5livenessTokenFailed: state.kyc.setKycH5livenessTokenFailed,
  setKycH5livenessTokenResponse: state.kyc.setKycH5livenessTokenResponse,
  setKycH5livenessResultFailed: state.kyc.setKycH5livenessResultFailed,
  setKycH5livenessResultResponse: state.kyc.setKycH5livenessResultResponse,
  livenessTempState: state.persist.livenessTempState,
  kkpmTempState: state.persist.kkpmTempState,
  kycAction: state.kyc.action,
  token: state.auth.token.access_token,
});

const mapDispatchToProps = {
  setUpdataLiveness: (payload) => setUpdataLiveness(payload),
  setUpdataSelfie: (payload) => setKycSelfie(payload),
  getUpdataDetailEKyc: (payload) => getUpdataDetailEKyc(payload),
  getUpdataDetailEKycClear: () => getUpdataDetailEKycClear(),
  setIsKTPSame: (payload) => setIsKTPSame(payload),
  setUpdataLivenessClear: () => setUpdataLivenessClear(),
  setUpdataFaceCompareFailed: (payload) => setUpdataFaceCompareFailed(payload),
  setUpdataFaceCompareClear: (payload) => setUpdataFaceCompareClear(payload),
  setUpdataLivenessFailed: (payload) => setUpdataLivenessFailed(payload),
  setUpdataFaceCompare: (payload) => setUpdataFaceCompare(payload),
  setLoading: (payload) => setLoading(payload),
  setToastMsg: (payload) => setToastMsg(payload),
  getUpdataValidationCheck: (payload) => getUpdataValidationCheck(payload),
  setKycH5livenessToken: (payload) => setKycH5livenessToken(payload),
  setKycH5livenessTokenClear: () => setKycH5livenessTokenClear(),
  setKycH5livenessResult: (payload) => setKycH5livenessResult(payload),
  setKycH5livenessResultClear: (payload) =>
    setKycH5livenessResultClear(payload),
  setLivenessTemp: (payload) => setLivenessTemp(payload),
  setKkpmTemp: (payload) => setKkpmTemp(payload),
  setUserData: (payload) => setUserData(payload),
  setClearKkpm: () => setClearKkpm(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
