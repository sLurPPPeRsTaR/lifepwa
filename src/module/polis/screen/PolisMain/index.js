import {
  setAvailableOnMobile,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import { setClearKkpm } from '@cp-module/persist/persistAction';
import {
  getPolicies,
  getPoliciesClear,
  setSelectedPolicy,
} from '@cp-module/polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  userData: state.auth.userData,
  getPoliciesResponse: state.polis.getPoliciesResponse,
  polisAction: state.polis.action,
  getPoliciesError: state.polis.getPoliciesError,
});

const mapDispatchToProps = {
  getPolicies: (payload) => getPolicies(payload),
  getPoliciesClear: () => getPoliciesClear(),
  setSelectedPolicy: (payload) => setSelectedPolicy(payload),
  setLoading: (payload) => setLoading(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  setClearKkpm: () => setClearKkpm(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
