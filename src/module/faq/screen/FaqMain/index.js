import {
  setFaqAsk,
  setHospital,
} from '@cp-bootstrap/bootstrapAction';
import { getFaqContent, getFaqContentClear } from '@cp-module/home/homeAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getFaqContentResponse: state.home.getFaqContentResponse,
});

const mapDispatchToProps = {
  setHospital: (payload) => setHospital(payload),
  setFaqAsk: (payload) => setFaqAsk(payload),
  getFaqContent: (payload) => getFaqContent(payload),
  getFaqContentClear: () => getFaqContentClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
