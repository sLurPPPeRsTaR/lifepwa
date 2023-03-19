import View from './View';
import { connect } from 'react-redux';
import {
  getPremiPublic,
  getPremiPrivate,
  getUserConfirmationDetail,
  getCurrentSubs,
} from '@cp-module/lifecover/lifecoverAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  authState: state.auth,
  lifecoverState: state.lifecover,
});

const mapDispatchToProps = {
  getPremiPublic,
  getPremiPrivate,
  getUserConfirmationDetail,
  getCurrentSubs,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
