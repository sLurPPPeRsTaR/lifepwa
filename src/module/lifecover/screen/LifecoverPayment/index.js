import View from './View';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
});

export default connect(mapStateToProps, {})(View);
