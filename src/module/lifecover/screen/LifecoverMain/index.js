import View from './View';
import { connect } from 'react-redux';
import { getPremiPublic } from '@cp-module/lifecover/lifecoverAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  // lang: 'en',
  lifecoverState: state.lifecover,
});

const mapDispatchToProps = {
  getPremiPublic,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
