import {
  setAvailableOnMobile,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import { getPolicyClaim } from '@cp-module/polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  polisAction: state.polis.action,
  getPolicyClaimResponse: state.polis.getPolicyClaimResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPolicyClaim: (payload) => getPolicyClaim(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
