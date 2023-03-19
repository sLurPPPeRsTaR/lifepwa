import { connect } from 'react-redux';
import { setFaqAsk, setInternalServerError, setLoading } from '@cp-bootstrap/bootstrapAction';
import View from './View';
import {
  setProfileFaq,
  setProfileFaqClear,
  setProfileNoLoginFaq,
  setProfileNoLoginFaqClear,
} from '@cp-module/profile/profileAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userData: state.auth.userData,
  faqAction: state.profile.action,
  token: state.auth.token.access_token,
  setProfileFaqFailed: state.profile.setProfileFaqFailed,
  setProfileFaqResponse: state.profile.setProfileFaqResponse,
  setProfileNoLoginFaqFailed: state.profile.setProfileNoLoginFaqFailed,
  setProfileNoLoginFaqResponse: state.profile.setProfileNoLoginFaqResponse,
});

const mapDispatchToProps = {
  setFaqAsk: (payload) => setFaqAsk(payload),
  setProfileFaq: (payload) => setProfileFaq(payload),
  setProfileFaqClear: () => setProfileFaqClear(),
  setProfileNoLoginFaq: (payload) => setProfileNoLoginFaq(payload),
  setProfileNoLoginFaqClear: () => setProfileNoLoginFaqClear(),
  setInternalServerError: (payload) => setInternalServerError(payload),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
