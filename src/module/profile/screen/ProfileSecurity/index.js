import {
  getProfileDevice,
  setChangePass,
  setChangePassClear,
  setCreatePin,
  getVerifyPin,
  setProfileDevice,
  setProfileRequestOtp,
  setDeleteAccountRequestOtp,
  setDeleteAccountRequestOtpClear,
  setDeleteAccountVerifyOtp,
  setDeleteAccountVerifyOtpClear,
  getVerifyPinClear,
  getPersonalDataClear,
} from '@cp-module/profile/profileAction';
import {
  setClearAuth,
  setDeleteAccount,
  setUserData,
} from '@cp-module/auth/authAction';
import { connect } from 'react-redux';
import View from './View';
import { setLoginClear } from '@cp-module/login/loginAction';
import { getPoliciesClear } from '@cp-module/polis/polisAction';
import { getBajoRunStep } from '@cp-module/lifesaver/lifesaverAction';
import { setAvailableOnMobile } from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  userData: state.auth.userData,
  authAction: state.auth.action,
  profileAction: state.profile.action,
  setChangePassResponse: state.profile.setChangePassResponse,
  setChangePassFailed: state.profile.setChangePassFailed,

  setChangePinResponse: state.profile.setChangePinResponse,
  getVerifyPinResponse: state.profile.getVerifyPinResponse,
  getVerifyPinFailed: state.profile.getVerifyPinFailed,
  setCreatePinFailed: state.profile.setCreatePinFailed,
  setCreatePinResponse: state.profile.setCreatePinResponse,

  getProfileDeviceResponse: state.profile.getProfileDeviceResponse,
  setProfileDeviceResponse: state.profile.setProfileDeviceResponse,
  setProfileDeviceFailed: state.profile.setProfileDeviceFailed,

  setProfileRequestOtpResponse: state.profile.setProfileRequestOtpResponse,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,

  setDeleteAccountRequestOtpFailed:
    state.profile.setDeleteAccountRequestOtpFailed,
  setDeleteAccountRequestOtpResponse:
    state.profile.setDeleteAccountRequestOtpResponse,
  setDeleteAccountVerifyOtpFailed:
    state.profile.setDeleteAccountVerifyOtpFailed,
  setDeleteAccountVerifyOtpParam: state.profile.setDeleteAccountVerifyOtpParam,
});

const mapDispatchToProps = {
  setUserData: (payload) => setUserData(payload),
  setChangePass: (payload) => setChangePass(payload),
  setCreatePin: (payload) => setCreatePin(payload),
  getVerifyPin: (payload) => getVerifyPin(payload),
  getVerifyPinClear: (payload) => getVerifyPinClear(payload),
  getProfileDevice: (payload) => getProfileDevice(payload),
  setProfileDevice: (payload) => setProfileDevice(payload),
  setDeleteAccount: (payload) => setDeleteAccount(payload),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setChangePassClear: (payload) => setChangePassClear(payload),
  setDeleteAccountRequestOtp: (payload) => setDeleteAccountRequestOtp(payload),
  setDeleteAccountRequestOtpClear: (payload) => {
    return setDeleteAccountRequestOtpClear(payload);
  },
  setDeleteAccountVerifyOtp: (payload) => setDeleteAccountVerifyOtp(payload),
  setDeleteAccountVerifyOtpClear: (payload) => {
    return setDeleteAccountVerifyOtpClear(payload);
  },
  setClearAuth: (payload) => setClearAuth(payload),
  setLoginClear: (payload) => setLoginClear(payload),
  getBajoRunStep: (payload) => getBajoRunStep(payload),
  getPoliciesClear: () => getPoliciesClear(),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  getPersonalDataClear: (payload) => getPersonalDataClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
