import {
  setAvailableOnMobile,
  setFirstLoad,
  setHospital,
} from '@cp-bootstrap/bootstrapAction';
import { setSelectedPolicy } from '@cp-module/polis/polisAction';
import {
  getCurrentSubs,
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
  getPolicyProposal,
  getPolicyWidgetHome,
  getPolicyWidgetHomeClear,
  getWidgetImage,
} from '@cp-module/home/homeAction';
import { setInvoiceId, setUserData } from '@cp-module/auth/authAction';
import { getSubscriptionDetail } from '@cp-module/profile/profileAction';
import {
  setCreateBill,
  setCreateBillClear,
} from '@cp-module/payments/paymentsAction';
import { getLifetagFlag } from '@cp-module/lifetag/lifetagAction';
import { getEventUserTicket } from '@cp-module/event/eventAction';
import { setKkpmTemp, setWidgetHome } from '@cp-module/persist/persistAction';
const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  userId: state.auth.userData.userId,
  alreadyLivenessTest: state.auth.userData.alreadyLivenessTest,
  token: state.auth.token.access_token,
  isFirstLoad: state.activity.isFirstLoad,
  getNotifCountResponse: state.home.getNotifCountResponse,
  getPolicyWidgetHomeResponse: state.home.getPolicyWidgetHomeResponse,
  getPendingInvitesResponse: state.home.getPendingInvitesStateResponse,
  features: state.bootstrap.appConfig.features,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getSubscriptionDetailResponse: state.profile.getSubscriptionDetailResponse,
  getPolicyProposalResponse: state.home.getPolicyProposalResponse,
  setCreateBillResponse: state.payments.setCreateBillResponse,
  setCreateBillParam: state.payments.setCreateBillParam,
  kkpmTempState: state.persist.kkpmTempState,
  getWidgetImageResponse: state.home.getWidgetImageResponse,

  //lifetag
  getLifetagFlagResponse: state.lifetag.getLifetagFlagResponse,

  // event
  getEventUserTicketResponse: state.event.getEventUserTicketResponse,
  eventAction: state.event.action,

  //homewidgetshown
  homeWidgetShowns: state.persist.shownsWidget,
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
  getCurrentSubs: (payload) => getCurrentSubs(payload),
  getSubscriptionDetail: (payload) => getSubscriptionDetail(payload),
  getPolicyProposal: (payload) => getPolicyProposal(payload),
  setCreateBill: (payload) => setCreateBill(payload),
  setCreateBillClear: () => setCreateBillClear(),
  setInvoiceId: (payload) => setInvoiceId(payload),
  getWidgetImage: (payload) => getWidgetImage(payload),

  setKkpmTemp: (payload) => setKkpmTemp(payload),

  // lifetag
  getLifetagFlag: () => getLifetagFlag(),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),

  // event
  getEventUserTicket: (payload) => getEventUserTicket(payload),

  //action to hide widget
  setWidgetHome: (payload) => setWidgetHome(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
