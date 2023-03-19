import { connect } from 'react-redux';
import {
  getUpdataLastKTPInfo,
  getUpdataLastOtherInfo,
  getUpdataLastOtherInfoClear,
  setUpdataAlterPolicies,
  setUpdataAlterPoliciesClear,
  setUpdataVerifyPengkinian,
  setUpdataVerifyPengkinianClear,
} from '@cp-module/updata/updataAction';
import {
  getVerifyPin,
  getVerifyPinClear,
} from '@cp-module/profile/profileAction';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import View from './View';
import {
  setClearKkpm,
  setKkpmTemp,
  setOtherInformationClear,
  setUpdataTempStateClear,
} from '@cp-module/persist/persistAction';
import { setTemporaryHomeState } from '@cp-module/home/homeAction';
import { setUserData } from '@cp-module/auth/authAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  updataAction: state.updata.action,
  getUpdataLastOtherInfoFailed: state.updata.getUpdataLastOtherInfoFailed,
  getUpdataLastOtherInfoFetch: state.updata.getUpdataLastOtherInfoFetch,
  isKTPSame: state.persist.isKTPSame,
  isKKSame: state.persist.isKKSame,
  getUpdataLastOtherInfoResponse: state.updata.getUpdataLastOtherInfoResponse,
  setUpdataKTPResponse: state.updata.setUpdataKTPResponse,
  setUpdataKKResponse: state.updata.setUpdataKKResponse,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
  getUpdataLastKKInfoResponse: state.updata.getUpdataLastKKInfoResponse,
  setUpdataCheckKKKTPParam: state.updata.setUpdataCheckKKKTPParam,
  otherInformation: state.persist.otherInformation,
  deviceId: state.auth.userData.deviceId,
  setUpdataAlterPoliciesResponse: state.updata.setUpdataAlterPoliciesResponse,
  setUpdataAlterPoliciesFailed: state.updata.setUpdataAlterPoliciesFailed,
  setUpdataVerifyPengkinianResponse:
    state.updata.setUpdataVerifyPengkinianResponse,
  setUpdataVerifyPengkinianFailed: state.updata.setUpdataVerifyPengkinianFailed,
  getPoliciesResponse: state.home.getPoliciesResponse,
  alreadySetPin: state.auth.userData.alreadySetPin,
  alreadySetMPin: state.auth.userData.alreadySetMPin,
  getVerifyPinResponse: state.profile.getVerifyPinResponse,
  profileAction: state.profile.action,
  getVerifyPinFailed: state.profile.getVerifyPinFailed,
  kkpmTempState: state.persist.kkpmTempState,
  getUpdataValidationCheckResponse:
    state.updata.getUpdataValidationCheckResponse,
  kkpmFlag: state.auth.userData.kkpmFlag,
  updataTempState: state.persist.tempState,
  token: state.auth.token.access_token,
});

const mapDispatchToProps = {
  getUpdataLastOtherInfo: (payload) => getUpdataLastOtherInfo(payload),
  getUpdataLastOtherInfoClear: (payload) =>
    getUpdataLastOtherInfoClear(payload),
  setLoading: (payload) => setLoading(payload),
  setUpdataAlterPolicies: (payload) => setUpdataAlterPolicies(payload),
  setUpdataAlterPoliciesClear: (payload) =>
    setUpdataAlterPoliciesClear(payload),
  setUserData: (payload) => setUserData(payload),
  setUpdataVerifyPengkinian: (payload) => setUpdataVerifyPengkinian(payload),
  setUpdataVerifyPengkinianClear: (payload) =>
    setUpdataVerifyPengkinianClear(payload),
  getUpdataLastKTPInfo: (payload) => getUpdataLastKTPInfo(payload),
  setOtherInformationClear: () => setOtherInformationClear(),
  setUpdataTempStateClear: () => setUpdataTempStateClear(),
  setTemporaryHomeState: (payload) => setTemporaryHomeState(payload),
  getVerifyPin: (payload) => getVerifyPin(payload),
  getVerifyPinClear: (payload) => getVerifyPinClear(payload),
  setKkpmTemp: (payload) => setKkpmTemp(payload),
  setClearKkpm: () => setClearKkpm(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
