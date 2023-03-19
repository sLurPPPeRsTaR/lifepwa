import {
  setAvailableOnMobile,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import {
  getPersonalDataCity,
  getPersonalDataDistrict,
  getPersonalDataProvince,
  getPersonalDataSubDistrict,
} from '@cp-module/profile/profileAction';
import View from './View';
import { setOtherInformation } from '@cp-module/persist/persistAction';
import { setLang } from '@cp-module/auth/authAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getPersonalDataProvinceResponse:
    state.profile.getPersonalDataProvinceResponse,
  getPersonalDataCityResponse: state.profile.getPersonalDataCityResponse,
  getPersonalDataDistrictResponse:
    state.profile.getPersonalDataDistrictResponse,
  getPersonalDataSubDistrictResponse:
    state.profile.getPersonalDataSubDistrictResponse,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  setLoading: (payload) => setLoading(payload),
  getPersonalDataProvince: (payload) => getPersonalDataProvince(payload),
  getPersonalDataCity: (payload) => getPersonalDataCity(payload),
  getPersonalDataDistrict: (payload) => getPersonalDataDistrict(payload),
  getPersonalDataSubDistrict: (payload) => getPersonalDataSubDistrict(payload),

  setOtherInformation: (payload) => setOtherInformation(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
