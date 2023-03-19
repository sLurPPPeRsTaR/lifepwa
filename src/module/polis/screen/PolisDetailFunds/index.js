import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { getPolicyFunds } from '@cp-module/polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  polisAction: state.polis.action,
  getPolicyFundsResponse: state.polis.getPolicyFundsResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPolicyFunds: (payload) => getPolicyFunds(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
