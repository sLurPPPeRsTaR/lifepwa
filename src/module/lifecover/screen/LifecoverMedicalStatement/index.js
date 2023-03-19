import View from './View';
import { connect } from 'react-redux';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import {
  getPremiPrivate,
  getUserConfirmationDetail,
  checkBmi,
  getQuestions,
  setSubmission,
} from '@cp-module/lifecover/lifecoverAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  authState: state.auth,
  lifecoverState: state.lifecover,
});

const mapDispatchToProps = {
  getPremiPrivate,
  getUserConfirmationDetail,
  checkBmi,
  getQuestions,
  setLoading: (payload) => setLoading(payload),
  setSubmission,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
