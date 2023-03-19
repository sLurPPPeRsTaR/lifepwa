import { setAvailableOnMobile } from '@cp-bootstrap/bootstrapAction';
import { getCheckMaxInvite, getInvitationListFriend } from '@cp-module/lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  deviceId: state?.auth?.userData?.deviceId,
  lang: state.auth.lang,
  getInvitationListFriendResponse: state.lifesaver.getInvitationListFriendResponse,
  appConfig: state.bootstrap.appConfig,
  token: state.auth.token.access_token,
  userData: state.auth.userData,
  getCheckMaxInviteResponse: state.lifesaver.getCheckMaxInviteResponse,
});

const mapDispatchToProps = {
  getInvitationListFriend: (payload) => getInvitationListFriend(payload),
  getCheckMaxInvite: () => getCheckMaxInvite(),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
