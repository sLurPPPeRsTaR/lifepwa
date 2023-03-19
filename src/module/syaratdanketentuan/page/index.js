import { connect } from 'react-redux';
import { setBetterOpenApp } from '@cp-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
});

const mapDispatchToProps = {
  setBetterOpenApp: (payload) => setBetterOpenApp(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
