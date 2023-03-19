import {
  setChangePin,
  setChangePinClear,
  setCreatePin,
  setCreatePinClear,
} from '@cp-module/profile/profileAction';
import { setAvailableOnMobile } from '@cp-bootstrap/bootstrapAction';
import { setUserData } from '@cp-module/auth/authAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  profileAction: state.profile.action,
  alreadySetPin: state.auth.userData.alreadySetPin,
  alreadySetMPin: state.auth.userData.alreadySetMPin,
  setCreatePinFailed: state.profile.setCreatePinFailed,
  setCreatePinResponse: state.profile.setCreatePinResponse,
  setChangePinFailed: state.profile.setChangePinFailed,
  setChangePinResponse: state.profile.setChangePinResponse,
});

const mapDispatchToProps = {
  setUserData: (payload) => setUserData(payload),
  setCreatePin: (payload) => setCreatePin(payload),
  setCreatePinClear: () => setCreatePinClear(),
  setChangePin: (payload) => setChangePin(payload),
  setChangePinClear: () => setChangePinClear(),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
