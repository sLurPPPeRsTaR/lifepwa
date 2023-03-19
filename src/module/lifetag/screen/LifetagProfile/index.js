import View from './View';
import { connect } from 'react-redux';
import {
  setBetterOpenApp,
  setLoading,
  setAvailableOnMobile,
} from '@cp-bootstrap/bootstrapAction';
import {
  getLifetagProfile,
  getLifetagProfileClear,
  getLifetagProfilePublic,
  getLifetagProfilePublicClear,
} from '@cp-module/lifetag/lifetagAction';
import { setIsComingFromScreen } from '@cp-module/persist/persistAction';
import { getCurrentSubs } from '@cp-module/lifesaver/lifesaverAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userId: state.auth.userData.userId,
  alreadyKYC: state.auth.userData.alreadyKYC,
  token: state.auth.token.access_token,
  lifetagAction: state.lifetag.action,
  getLifetagProfileFailed: state.lifetag.getLifetagProfileFailed,
  getLifetagProfilePublicFailed: state.lifetag.getLifetagProfilePublicFailed,
  getLifetagProfileResponse: state.lifetag.getLifetagProfileResponse,
  getLifetagProfilePublicResponse:
    state.lifetag.getLifetagProfilePublicResponse,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  isComingFromScreen: state.persist.isComingFromScreen,
  lifesaverAction: state.lifesaver.action,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setBetterOpenApp: (payload) => setBetterOpenApp(payload),
  getLifetagProfile: (payload) => getLifetagProfile(payload),
  getLifetagProfileClear: () => getLifetagProfileClear(),
  getLifetagProfilePublic: (payload) => getLifetagProfilePublic(payload),
  getLifetagProfilePublicClear: () => getLifetagProfilePublicClear(),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  getCurrentSubs: (payload) => getCurrentSubs(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
