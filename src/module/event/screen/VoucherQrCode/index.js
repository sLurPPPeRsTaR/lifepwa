import { connect } from 'react-redux';
import {
  getEventDetail,
  getEventDetailClear,
  getEventQuota,
  getUserEventInvoiceIdClear,
  setEventBuyTicketClear,
} from '@cp-module/event/eventAction';
import {
  setCustomerCare,
  setAvailableOnMobile,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import { getIsUserEligibleClear } from '@cp-module/home/homeAction';
import { getCurrentSubs } from '@cp-module/lifesaver/lifesaverAction';
import View from './View';
import { getPolicies, setSelectedPolicy } from '@cp-module/polis/polisAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  eventAction: state.event.action,
  userId: state.auth.userData.userId,
  getEventDetailResponse: state.event.getEventDetailResponse,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getEventQuotaResponse: state.event.getEventQuotaResponse,
  getEventUserTicketResponse: state.event.getEventUserTicketResponse,
  getPoliciesResponse: state.polis.getPoliciesResponse,
  getUserEventInvoiceIdResponse: state.event.getUserEventInvoiceIdResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getEventDetail: (payload) => getEventDetail(payload),
  getEventDetailClear: () => getEventDetailClear(),
  getIsUserEligibleClear: () => getIsUserEligibleClear(),
  setCustomerCare: (payload) => setCustomerCare(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  getEventQuota: (payload) => getEventQuota(payload),
  getCurrentSubs: () => getCurrentSubs(),
  getPolicies: () => getPolicies(),
  setSelectedPolicy: (payload) => setSelectedPolicy(payload),
  getUserEventInvoiceIdClear: () => getUserEventInvoiceIdClear(),
  setEventBuyTicketClear: () => setEventBuyTicketClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
