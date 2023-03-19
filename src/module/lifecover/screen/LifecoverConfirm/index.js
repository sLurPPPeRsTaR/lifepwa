import View from './View';
import { connect } from 'react-redux';
import {
  setInternalServerError,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import {
  getUserConfirmationDetail,
  getBeneficiary,
  updateSubmission,
  createBilling,
  checkReferral,
} from '@cp-module/lifecover/lifecoverAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  lifecoverState: state.lifecover,
  authState: state.auth,
});

const mapDispatchToProps = {
  setInternalServerError: (payload) => setInternalServerError(payload),
  setLoading: (payload) => setLoading(payload),
  getUserConfirmationDetail,
  getBeneficiary,
  updateSubmission: (payload) => updateSubmission(payload),
  createBilling: (payload) => createBilling(payload),
  checkReferral: (payload) => checkReferral(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
