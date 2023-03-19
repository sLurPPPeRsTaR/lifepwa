import { setUserData } from '@cp-module/auth/authAction';
import {
  getPersonalData,
  getUserIdentity,
  getPersonalDataCity,
  getPersonalDataDistrict,
  getPersonalDataProvince,
  setPersonalData,
  setPersonalDataClear,
  setProfileRequestOtp,
  setProfileRequestOtpClear,
  setProfileVerifyOtp,
  setProfileVerifyOtpClear,
} from '@cp-module/profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  profileAction: state.profile.action,
  deviceId: state.auth.userData.deviceId,
  userId: state.auth.userData.userId,
  userData: state.auth.userData,
  setPersonalDataFailed: state.profile.setPersonalDataFailed,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
  getUserIdentityResponse: state.profile.getUserIdentityResponse,
  getPersonalDataProvinceResponse:
    state.profile.getPerzsonalDataProvinceResponse,
  setPersonalDataProvinceParam: state.profile.setPersonalDataProvinceParam,
  getPersonalDataCityResponse: state.profile.getPersonalDataCityResponse,
  setPersonalDataCityParam: state.profile.setPersonalDataCityParam,
  getPersonalDataDistrictResponse:
    state.profile.getPersonalDataDistrictResponse,
  setPersonalDataDistrictParam: state.profile.setPersonalDataDistrictParam,
  getPersonalDataFailed: state.profile.getPersonalDataFailed,
  getUserIdentityFailed: state.profile.getUserIdentityFailed,
  alreadySetPin: state.auth.userData.alreadySetPin,
  alreadyKYC: state.auth.userData.alreadyKYC,
  alreadyLivenessTest: state.auth.userData.alreadyLivenessTest,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
  setProfileVerifyOtpFailed: state.profile.setProfileVerifyOtpFailed,
});

const mapDispatchToProps = {
  setUserData: (payload) => setUserData(payload),
  getPersonalData: (payload) => getPersonalData(payload),
  getUserIdentity: (payload) => getUserIdentity(payload),
  setPersonalData: (payload) => setPersonalData(payload),
  getPersonalDataProvince: (payload) => getPersonalDataProvince(payload),
  setPersonalDataProvinceClear: () => setPersonalDataProvinceClear(),
  getPersonalDataCity: (payload) => getPersonalDataCity(payload),
  setPersonalDataCityClear: () => setPersonalDataCityClear(),
  getPersonalDataDistrict: (payload) => getPersonalDataDistrict(payload),
  setPersonalDataDistrictClear: () => setPersonalDataDistrictClear(),
  setPersonalData: (payload) => setPersonalData(payload),
  setPersonalDataClear: () => setPersonalDataClear(),
  setUserData: (payload) => setUserData(payload),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: (payload) => {
    return setProfileRequestOtpClear(payload);
  },
  setProfileVerifyOtp: (payload) => setProfileVerifyOtp(payload),
  setProfileVerifyOtpClear: (payload) => {
    return setProfileVerifyOtpClear(payload);
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
