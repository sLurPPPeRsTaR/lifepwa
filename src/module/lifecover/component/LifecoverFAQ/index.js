import { setFaqAsk, setHospital } from '@cp-bootstrap/bootstrapAction';
import { setLang } from '@cp-module/auth/authAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  setFaqAsk: (payload) => setFaqAsk(payload),
  setHospital: (payload) => setHospital(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
