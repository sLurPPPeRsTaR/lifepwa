import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { setUserData } from '@cp-module/auth/authAction';
import {
  setKycVerifyIdCard,
  setKycVerifyIdCardClear,
  setKycVerifyDukcapil,
  setKycVerifyDukcapilClear,
} from '@cp-module/kyc/kycAction';
import {
  getPersonalDataCity,
  getPersonalDataDistrict,
  getPersonalDataProvince,
} from '@cp-module/profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  kycAction: state.kyc.action,
  setKycVerifyIdCardFailed: state.kyc.setKycVerifyIdCardFailed,
  setKycIdCardResponse: state.kyc.setKycIdCardResponse,
  setKycVerifyDukcapilResponse: state.kyc.setKycVerifyDukcapilResponse,
  setKycVerifyDukcapilFailed: state.kyc.setKycVerifyDukcapilFailed,
  getPersonalDataProvinceResponse:
    state.profile.getPersonalDataProvinceResponse,
  getPersonalDataCityResponse: state.profile.getPersonalDataCityResponse,
  getPersonalDataDistrictResponse:
    state.profile.getPersonalDataDistrictResponse,
});

const mapDispatchToProps = {
  setKycVerifyIdCard: (payload) => setKycVerifyIdCard(payload),
  setLoading: (payload) => setLoading(payload),
  setUserData: (payload) => setUserData(payload),
  setKycVerifyDukcapil: (payload) => setKycVerifyDukcapil(payload),
  setKycVerifyIdCardClear: () => setKycVerifyIdCardClear(),
  setKycVerifyDukcapilClear: () => setKycVerifyDukcapilClear(),
  getPersonalDataProvince: (payload) => getPersonalDataProvince(payload),
  getPersonalDataCity: (payload) => getPersonalDataCity(payload),
  getPersonalDataDistrict: (payload) => getPersonalDataDistrict(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
