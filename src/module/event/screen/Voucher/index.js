import { connect } from 'react-redux';
import {
  getEventDetail,
  getEventDetailClear,
  getEventQuota,
} from '@cp-module/event/eventAction';
import {
  setCustomerCare,
  setLoading,
  setInternalServerError,
} from '@cp-bootstrap/bootstrapAction';
import { getIsUserEligibleClear } from '@cp-module/home/homeAction';
import { getCurrentSubs } from '@cp-module/lifesaver/lifesaverAction'
import { setSelectedPolicy, getPolicies } from '@cp-module/polis/polisAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  eventAction: state.event.action,
  userId: state.auth.userData.userId,
  getEventDetailResponse: state.event.getEventDetailResponse,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getEventQuotaResponse: state.event.getEventQuotaResponse,
  accessCode: state.event.accessCode,
  getPoliciesResponse: state.polis.getPoliciesResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getEventDetail: (payload) => getEventDetail(payload),
  getEventDetailClear: () => getEventDetailClear(),
  getIsUserEligibleClear: () => getIsUserEligibleClear(),
  setCustomerCare: (payload) => setCustomerCare(payload),
  getCurrentSubs: (payload) => getCurrentSubs(payload),
  getEventQuota: (payload) => getEventQuota(payload),
  setInternalServerError: (payload) => setInternalServerError(payload),
  setSelectedPolicy: (payload) => setSelectedPolicy(payload),
  getPolicies: () => getPolicies(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
