import {
  setAvailableOnMobile,
  setFirstLoad,
  setHospital,
} from '@cp-bootstrap/bootstrapAction';
import { setSelectedPolicy } from '@cp-module/polis/polisAction';
import {
  getListRs,
  getListRsClear,
} from '@cp-module/lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import {
  getNotifCount,
  getNotifCountClear,
  getPendingInvites,
  getPendingInvitesClear,
  getPolicyWidgetHome,
  getPolicyWidgetHomeClear,
  setTemporaryHomeState,
} from '@cp-module/home/homeAction';
import { setUserData, setInvoiceId } from '@cp-module/auth/authAction';
import { getProfileUserParty } from '@cp-module/profile/profileAction';
import View from './View';
import { setClearKkpm, setKkpmTemp } from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  userId: state.auth.userData.userId,
  kkpmFlag: state.auth.userData.kkpmFlag,
  alreadyLivenessTest: state.auth.userData.alreadyLivenessTest,
  token: state.auth.token.access_token,
  polisAction: state.polis.action,
  isFirstLoad: state.activity.isFirstLoad,
  getNotifCountResponse: state.home.getNotifCountResponse,
  getPolicyWidgetHomeResponse: state.home.getPolicyWidgetHomeResponse,
  getPendingInvitesResponse: state.home.getPendingInvitesStateResponse,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  isUpdataModalAlreadyShowed: state.home.isUpdataModalAlreadyShowed,
});

const mapDispatchToProps = {
  setFirstLoad: (payload) => setFirstLoad(payload),
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
  setTemporaryHomeState: (payload) => setTemporaryHomeState(payload),
  getProfileUserParty: () => getProfileUserParty(),
  setKkpmTemp: (payload) => setKkpmTemp(payload),
  setClearKkpm: () => setClearKkpm(),
  setInvoiceId: (payload) => setInvoiceId(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
