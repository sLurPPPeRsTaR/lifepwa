import { connect } from 'react-redux';
import View from './View';
import {
  setFaqAsk,
  setHospital,
} from '@cp-bootstrap/bootstrapAction';
import { getFaqContent, getFaqContentClear } from '@cp-module/home/homeAction';
import { getContact } from '@cp-module/profile/profileAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getFaqContentResponse: state.home.getFaqContentResponse,
  getContactResponse: state.profile.getContactResponse,
});

const mapDispatchToProps = {
  setFaqAsk: (payload) => setFaqAsk(payload),
  setHospital: (payload) => setHospital(payload),
  getFaqContent: (payload) => getFaqContent(payload),
  getFaqContentClear: () => getFaqContentClear(),
  getContact: (payload) => getContact(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
