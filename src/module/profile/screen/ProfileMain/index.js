import {
  getPersonalData,
  getProfileUserParty,
} from '@cp-module/profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  userData: state.auth.userData,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
});

const mapDispatchToProps = {
  getPersonalData: (payload) => getPersonalData(payload),
  getProfileUserParty: () => getProfileUserParty(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
