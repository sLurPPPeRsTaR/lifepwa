import {
  setAvailableOnMobile,
  setFirstLoad,
  setHospital,
} from '@cp-bootstrap/bootstrapAction';
import { getPolicies, setSelectedPolicy } from '@cp-module/polis/polisAction';
import {
  getListRs,
  getListRsClear,
} from '@cp-module/lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import View from './View';
import {
  getNotifCount,
  getNotifCountClear,
  getPendingInvites,
  getPendingInvitesClear,
  getPolicyWidgetHome,
  getPolicyWidgetHomeClear,
} from '@cp-module/home/homeAction';
import { setUserData } from '@cp-module/auth/authAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  userId: state.auth.userData.userId,
  alreadyLivenessTest: state.auth.userData.alreadyLivenessTest,
  token: state.auth.token.access_token,
  polisAction: state.polis.action,
  isFirstLoad: state.activity.isFirstLoad,
  getPoliciesError: state.polis.getPoliciesError,
  getPoliciesResponse: state.polis.getPoliciesResponse,
  getNotifCountResponse: state.home.getNotifCountResponse,
  getPolicyWidgetHomeResponse: state.home.getPolicyWidgetHomeResponse,
  getPendingInvitesResponse: state.home.getPendingInvitesStateResponse,
});

const mapDispatchToProps = {
  setFirstLoad: (payload) => setFirstLoad(payload),
  getPolicies: (payload) => getPolicies(payload),
  getNotifCount: (payload) => getNotifCount(payload),
  getNotifCountClear: () => getNotifCountClear(),
  getPolicyWidgetHome: (payload) => getPolicyWidgetHome(payload),
  getPolicyWidgetHomeClear: () => getPolicyWidgetHomeClear(),
  getPendingInvites: (payload) => getPendingInvites(payload),
  getPendingInvitesClear: () => getPendingInvitesClear(),
  setSelectedPolicy: (payload) => setSelectedPolicy(payload),
  setUserData: (payload) => setUserData(payload),
  setHospital: (payload) => setHospital(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
