import { setLang } from '@cp-module/auth/authAction';
import { connect } from 'react-redux';
import View from './View';
import { setHospital } from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    getListRsResponse: state.lifesaver.getListRsResponse,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  setHospital: (payload) => setHospital(payload)
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
