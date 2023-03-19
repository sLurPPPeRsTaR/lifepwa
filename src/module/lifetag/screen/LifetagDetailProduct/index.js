import View from './View';
import { connect } from 'react-redux';
import {
  setIsComingFromScreen,
  setLifetagTempState,
  setLifetagTempStateClear,
  setLifetagTempOrderState,
} from '@cp-module/persist/persistAction';
import {
  setLoading,
  setIsComingFromDeepLink,
  setLifetagOutOffStock,
} from '@cp-bootstrap/bootstrapAction';
import {
  getLifetagFlag,
  getLifetagProductDetail,
  setLifetagOrderNo,
} from '@cp-module/lifetag/lifetagAction';
import { getCurrentSubs } from '@cp-module/lifesaver/lifesaverAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  lifetagAction: state.lifetag.action,
  getLifetagProductDetailResponse:
    state.lifetag.getLifetagProductDetailResponse,
  getLifetagProductDetailFailed: state.lifetag.getLifetagProductDetailFailed,
  getLifetagFlagResponse: state.lifetag.getLifetagFlagResponse,
  lifetagTempState: state.persist.lifetagTempState,
  isComingFromDeepLink: state.persist.isComingFromDeepLink,
  userData: state.auth.userData,
  lifetagTempOrderState: state.persist.lifetagTempOrderState,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  isComingFromScreen: state.persist.isComingFromScreen,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getLifetagProductDetail: (payload) => getLifetagProductDetail(payload),
  getLifetagFlag: (payload) => getLifetagFlag(payload),
  setLifetagTempState: (payload) => setLifetagTempState(payload),
  setLifetagTempStateClear: () => setLifetagTempStateClear(),
  setLifetagOrderNo: () => setLifetagOrderNo(),
  getCurrentSubs: () => getCurrentSubs(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setIsComingFromDeepLink: (payload) => setIsComingFromDeepLink(payload),
  setLifetagTempOrderState: (payload) => setLifetagTempOrderState(payload),
  setLifetagOutOffStock: (payload) => setLifetagOutOffStock(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
