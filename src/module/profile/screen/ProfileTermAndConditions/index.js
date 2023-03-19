import { connect } from 'react-redux';

import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  registerDate: state.auth.userData.registerDate,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(View);
