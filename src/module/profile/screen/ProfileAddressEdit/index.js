import {
  setAvailableOnMobile,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import { setLang } from '@cp-module/auth/authAction';
import {
    getAddressList,
  getPersonalDataCity,
  getPersonalDataDistrict,
  getPersonalDataProvince,
  getPersonalDataSubDistrict,
  setSaveAddress,
  setSaveAddressClear,
  setUpdateAddress,
  setUpdateAddressClear,
} from '@cp-module/profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  profileAction: state.profile.action,
  alreadyKYC: state.auth.userData.alreadyKYC,
  getPersonalDataProvinceResponse:
    state.profile.getPersonalDataProvinceResponse,
  getPersonalDataCityResponse: state.profile.getPersonalDataCityResponse,
  getPersonalDataDistrictResponse:
    state.profile.getPersonalDataDistrictResponse,
  getPersonalDataSubDistrictResponse:
    state.profile.getPersonalDataSubDistrictResponse,
  setSaveAddressFailed: state.profile.setSaveAddressFailed,
  setUpdateAddressFailed: state.profile.setUpdateAddressFailed,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  setLoading: (payload) => setLoading(payload),
  getPersonalDataProvince: (payload) => getPersonalDataProvince(payload),
  getPersonalDataCity: (payload) => getPersonalDataCity(payload),
  getPersonalDataDistrict: (payload) => getPersonalDataDistrict(payload),
  getPersonalDataSubDistrict: (payload) => getPersonalDataSubDistrict(payload),
  setSaveAddress: (payload) => setSaveAddress(payload),
  setSaveAddressClear: (payload) => setSaveAddressClear(payload),
  setUpdateAddress: (payload) => setUpdateAddress(payload),
  setUpdateAddressClear: (payload) => setUpdateAddressClear(payload),
  getAddressList: (payload) => getAddressList(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
