import {
  setChangePin,
  setChangePinClear,
} from '@cp-module/profile/profileAction';
import { setAvailableOnMobile } from '@cp-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import View from './View';
import { setUserData } from '@cp-module/auth/authAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  profileAction: state.profile.action,
  deviceId: state.auth.userData.deviceId,
  setChangePinFailed: state.profile.setChangePinFailed,
});

const mapDispatchToProps = {
  setUserData: (payload) => setUserData(payload),
  setChangePin: (payload) => setChangePin(payload),
  setChangePinClear: () => setChangePinClear(),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
