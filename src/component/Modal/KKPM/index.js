import { setLang } from '@cp-module/auth/authAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
