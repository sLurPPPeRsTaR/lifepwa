import {
  setAvailableOnMobile,
  setLoading,
  setNotAvailable,
} from '@cp-bootstrap/bootstrapAction';
import {
  getPolicyBenefitClear,
  getPolicyClaimClear,
  getPolicyClaimDetailClear,
  getPolicyDownloadClear,
  getPolicyFundsClear,
  getPolicySelfDataClear,
  getPolicySummaryClear,
} from '@cp-module/polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  selectedPolicy: state.polis.selectedPolicy,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  setNotAvailable: (payload) => setNotAvailable(payload),
  getPolicySummaryClear: () => getPolicySummaryClear(),
  getPolicySelfDataClear: () => getPolicySelfDataClear(),
  getPolicyBenefitClear: () => getPolicyBenefitClear(),
  getPolicyFundsClear: () => getPolicyFundsClear(),
  getPolicyClaimClear: () => getPolicyClaimClear(),
  getPolicyDownloadClear: () => getPolicyDownloadClear(),
  getPolicyClaimDetailClear: () => getPolicyClaimDetailClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
