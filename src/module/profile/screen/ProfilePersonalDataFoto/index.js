import {
  setPersonalData,
  setPersonalDataClear,
  setUploadProfile,
  setDeleteFotoProfile,
  setUploadProfileClear,
  getPersonalData,
} from '@cp-module/profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  profileAction: state.profile.action,
  setPersonalDataFailed: state.profile.setPersonalDataFailed,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
  setUploadProfileSuccess: state.profile.setUploadProfileSuccess,
});

const mapDispatchToProps = {
  setUploadProfile: (payload) => setUploadProfile(payload),
  setPersonalData: (payload) => setPersonalData(payload),
  setDeleteFotoProfile: (payload) => setDeleteFotoProfile(payload),
  setPersonalData: (payload) => setPersonalData(payload),
  setPersonalDataClear: () => setPersonalDataClear(),
  setUploadProfileClear: () => setUploadProfileClear(),
  getPersonalData: () => getPersonalData()
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
