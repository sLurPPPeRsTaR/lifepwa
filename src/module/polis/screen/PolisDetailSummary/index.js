import {
  setAvailableOnMobile,
  setLoading,
  setNotAvailable,
} from '@cp-bootstrap/bootstrapAction';
import { getPolicyWidgetHome } from '@cp-module/home/homeAction';
import {
  getPolicySummary,
  getPolicySummaryClear,
} from '@cp-module/polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  polisAction: state.polis.action,
  getPolicySummaryFailed: state.polis.getPolicySummaryFailed,
  getPolicySummaryResponse: state.polis.getPolicySummaryResponse,
  getPolicyWidgetHomeResponse: state.home.getPolicyWidgetHomeResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPolicySummary: (payload) => getPolicySummary(payload),
  getPolicySummaryClear: () => getPolicySummaryClear(),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  setNotAvailable: (payload) => setNotAvailable(payload),
  getPolicyWidgetHome: (payload) => getPolicyWidgetHome(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
