import { setKkpmTemp } from '@cp-module/persist/persistAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userData: state.auth.userData,
  token: state.auth.token.access_token,
  getPoliciesResponse: state.polis.getPoliciesResponse,
  polisAction: state.polis.action,
  getPoliciesError: state.polis.getPoliciesError,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(View);
