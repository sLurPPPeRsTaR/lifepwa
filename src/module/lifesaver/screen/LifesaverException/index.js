import { setLang } from '@cp-module/auth/authAction';
import { getTotalClaim } from '@cp-module/lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getTotalClaimResponse: state.lifesaver.getTotalClaimResponse,
  token: state.auth.token.access_token,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  getTotalClaim: (payload) => getTotalClaim(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
