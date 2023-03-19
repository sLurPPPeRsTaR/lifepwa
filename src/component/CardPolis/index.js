import { connect } from 'react-redux';
import { setKkpmTemp } from '@cp-module/persist/persistAction';
import { setSelectedPolicy } from '@cp-module/polis/polisAction';
import { setAvailableOnMobile } from '@cp-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  userData: state.auth.userData,
  kkpmTempState: state.persist.kkpmTempState,
});

const mapDispatchToProps = {
  setKkpmTemp: (payload) => setKkpmTemp(payload),
  setSelectedPolicy: (payload) => setSelectedPolicy(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
