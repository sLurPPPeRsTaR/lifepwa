import View from './View';
import { connect } from 'react-redux';
import {
  setAvailableOnMobile,
  setBetterOpenApp,
  setLifetagAccessFailed,
  setLifetagNotActive,
  setLoading,
  setNotAvailable,
} from '@cp-bootstrap/bootstrapAction';
import {
  getLifetagListOtherInfo,
  getLifetagProfile,
  getLifetagProfileClear,
  getLifetagProfilePublic,
  getLifetagProfilePublicClear,
} from '@cp-module/lifetag/lifetagAction';
import { getCurrentSubs } from '@cp-module/lifesaver/lifesaverAction';
import {
  setIsComingFromScreen,
  setLifetagOtherInfo,
} from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userId: state.auth.userData.userId,
  token: state.auth.token.access_token,
  lifetagAction: state.lifetag.action,
  lifesaverAction: state.lifesaver.action,
  alreadyKYC: state.auth.userData.alreadyKYC,
  getLifetagProfileFailed: state.lifetag.getLifetagProfileFailed,
  getLifetagProfilePublicFailed: state.lifetag.getLifetagProfilePublicFailed,
  getLifetagProfileResponse: state.lifetag.getLifetagProfileResponse,
  getLifetagProfilePublicResponse:
    state.lifetag.getLifetagProfilePublicResponse,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getLifetagListOtherInfoResponse:
    state.lifetag.getLifetagListOtherInfoResponse,
  getLifetagListOtherInfoFailed: state.lifetag.getLifetagListOtherInfoFailed,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setBetterOpenApp: (payload) => setBetterOpenApp(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  getLifetagProfile: (payload) => getLifetagProfile(payload),
  getLifetagProfileClear: () => getLifetagProfileClear(),
  getLifetagProfilePublic: (payload) => getLifetagProfilePublic(payload),
  getLifetagProfilePublicClear: () => getLifetagProfilePublicClear(),
  setNotAvailable: (payload) => setNotAvailable(payload),
  getCurrentSubs: (payload) => getCurrentSubs(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  getLifetagListOtherInfo: (payload) => getLifetagListOtherInfo(payload),
  setLifetagAccessFailed: (payload) => setLifetagAccessFailed(payload),
  setLifetagNotActive: (payload) => setLifetagNotActive(payload),
  setLifetagOtherInfo: (payload) => setLifetagOtherInfo(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
