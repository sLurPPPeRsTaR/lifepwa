import { getCheckLinkPolicyNo, getCheckLinkPolicyNoClear, getInquiryPolicyNo } from '@cp-module/polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    getInquiryPolicyNoResponse: state.polis.getInquiryPolicyNoResponse,
    getCheckLinkPolicyNoResponse: state.polis.getCheckLinkPolicyNoResponse,
    getCheckLinkPolicyNoFailed: state.polis.getCheckLinkPolicyNoFailed,
});

const mapDispatchToProps = {
    getInquiryPolicyNo: (payload) => getInquiryPolicyNo(payload),
    getCheckLinkPolicyNo: (payload) => getCheckLinkPolicyNo(payload),
    getCheckLinkPolicyNoClear: () => getCheckLinkPolicyNoClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
