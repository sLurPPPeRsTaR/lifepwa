import { connect } from 'react-redux';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { setRequestOtpClear } from '@cp-module/register/registerAction';
import { setLoginSocial } from '@cp-module/login/loginAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setLoginSocial: (payload) => setLoginSocial(payload),
  setRequestOtpClear: () => setRequestOtpClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
