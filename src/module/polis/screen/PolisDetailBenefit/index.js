import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import View from './View';
import {
  getPolicyBenefit,
  getPolicyDownload,
} from '@cp-module/polis/polisAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  polisAction: state.polis.action,
  getPolicyBenefitResponse: state.polis.getPolicyBenefitResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPolicyBenefit: (payload) => getPolicyBenefit(payload),
  getPolicyDownload: (payload) => getPolicyDownload(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
