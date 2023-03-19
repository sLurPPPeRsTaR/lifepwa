import { setClearAuth } from '@cp-module/auth/authAction';
import {
  getBajoRunStep,
  getCurrentSubsClear,
  getCurrentSubs,
} from '@cp-module/lifesaver/lifesaverAction';
import { setLoginClear } from '@cp-module/login/loginAction';
import { getPoliciesClear } from '@cp-module/polis/polisAction';
import {
  getPersonalDataClear,
  getProfileReferral,
} from '@cp-module/profile/profileAction';
import { setBuyForOthersState, setWidgetHome } from '@cp-module/persist/persistAction';
import { connect } from 'react-redux';
import View from './View';
import { getFaqContentClear } from '@cp-module/home/homeAction';
import { setReferral } from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  userData: state.auth.userData,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getProfileReferralResponse: state.profile.getProfileReferralResponse,
});

const mapDispatchToProps = {
  setClearAuth: (payload) => setClearAuth(payload),
  setLoginClear: (payload) => setLoginClear(payload),
  getBajoRunStep: (payload) => getBajoRunStep(payload),
  getPoliciesClear: () => getPoliciesClear(),
  getCurrentSubsClear: () => getCurrentSubsClear(),
  getCurrentSubs: () => getCurrentSubs(),
  getPersonalDataClear: (payload) => getPersonalDataClear(payload),
  getCurrentSubs: (payload) => getCurrentSubs(payload),
  getCurrentSubsClear: () => getCurrentSubsClear(),
  getProfileReferral: (payload) => getProfileReferral(payload),
  setWidgetHome: (payload) => setWidgetHome(payload),
  getFaqContentClear: () => getFaqContentClear(),
  setBuyForOthersState: (payload)=> setBuyForOthersState(payload),
  setReferral: (payload) => setReferral(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
