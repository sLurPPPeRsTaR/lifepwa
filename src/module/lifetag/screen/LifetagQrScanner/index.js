
import { connect } from 'react-redux';
import {
  setLoading,
  setAvailableOnMobile,
} from '@cp-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  stateHomeAction: state.home.action,
  getPolicyWidgetHomeFetch: state.home.getPolicyWidgetHomeFetch,
  getPolicyWidgetHomeResponse: state.home.getPolicyWidgetHomeResponse,
  getPolicyWidgetHomeError: state.home.getPolicyWidgetHomeError,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
