import View from './View';
import { connect } from 'react-redux';
import { setAvailableOnMobile, setNotAvailable } from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token
});

const mapDispatchToProps = {
  setNotAvailable: (payload) =>setNotAvailable(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
