import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  deviceId: state?.auth?.userData?.deviceId,
  lang: state.auth.lang,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(View);
