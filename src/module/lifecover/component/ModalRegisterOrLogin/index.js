import View from './View';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userData: state.auth.userData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(View);
