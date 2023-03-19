import { connect } from 'react-redux';
import { setLang } from '@cp-module/auth/authAction';
import View from './View';
import { setFirstLoad } from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
  deviceId: state?.auth?.userData?.deviceId,
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userId: state.auth.userData.userId,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  setFirstLoad: (payload) => setFirstLoad(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
