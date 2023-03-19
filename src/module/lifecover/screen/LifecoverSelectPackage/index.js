import View from './View';
import { connect } from 'react-redux';
import {
  getAgePublic,
  getPremiPublic,
  getPremiPrivate,
  getUserConfirmationDetail,
  getCurrentSubs,
} from '@cp-module/lifecover/lifecoverAction';
import { getUserIdentity } from '@cp-module/profile/profileAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  authState: state.auth,
  profileState: state.profile,
  lifecoverState: state.lifecover,
});

const mapDispatchToProps = {
  getAgePublic,
  getPremiPublic,
  getPremiPrivate,
  getUserIdentity,
  getUserConfirmationDetail,
  getCurrentSubs,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
