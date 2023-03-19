import { connect } from 'react-redux';
import { setLoading } from '@cp-bootstrap/bootstrapAction';

import {
  getCheckLinkPolicyNo,
  getCheckLinkPolicyNoClear,
  getInquiryPolicyNo,
  getInquiryPolicyNoClear,
} from '@cp-module/register/registerAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  registerAction: state.register.action,
  userId: state.auth.userData.userId,
  alreadyKYC: state.auth.userData.alreadyKYC,
  getInquiryPolicyNoResponse: state.register.getInquiryPolicyNoResponse,
  getInquiryPolicyNoParam: state.register.getInquiryPolicyNoParam,
  getInquiryPolicyNoFailed: state.register.getInquiryPolicyNoFailed,
  getCheckLinkPolicyNoResponse: state.register.getCheckLinkPolicyNoResponse,
  getCheckLinkPolicyNoFailed: state.register.getCheckLinkPolicyNoFailed,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getInquiryPolicyNo: (payload) => getInquiryPolicyNo(payload),
  getInquiryPolicyNoClear: () => getInquiryPolicyNoClear(),
  getCheckLinkPolicyNo: (payload) => getCheckLinkPolicyNo(payload),
  getCheckLinkPolicyNoClear: () => getCheckLinkPolicyNoClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
