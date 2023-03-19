import { setUnsubscribeNewsletter } from '@cp-module/unsubscribe/unsubscribeAction';
import { connect } from 'react-redux';
import View from './View';
import { setInternalServerError } from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  unsubscribeAction: state.unsubscribe.action,
  unsubscribeResponse: state.unsubscribe.setUnsubscribeNewsLetterResponse,
  unsubscribeFailed: state.unsubscribe.setUnsubscribeNewsletterFailed,
});

const mapDispatchToProps = {
  setUnsubscribeNewsletter: (payload) => setUnsubscribeNewsletter(payload),
  setInternalServerError: (payload) => setInternalServerError(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
