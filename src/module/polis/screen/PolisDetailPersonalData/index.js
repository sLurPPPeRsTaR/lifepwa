import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { getPolicySelfData } from '@cp-module/polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  polisAction: state.polis.action,
  getPolicySelfDataResponse: state.polis.getPolicySelfDataResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPolicySelfData: (payload) => getPolicySelfData(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
