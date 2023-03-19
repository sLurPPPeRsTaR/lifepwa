import View from './View';
import { connect } from 'react-redux';
import {
  setIsComingFromScreen,
  setLifetagTempOrderState,
} from '@cp-module/persist/persistAction';
import {
  setLoading,
  setLifetagOutOffStock,
} from '@cp-bootstrap/bootstrapAction';
import {
  getLifetagProductDetail,
  setLifetagCreateOrder,
  setLifetagCreateOrderClear,
} from '@cp-module/lifetag/lifetagAction';
import {
  getAddressList,
  getAddressListClear,
} from '@cp-module/profile/profileAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userData: state.auth.userData,
  lifetagAction: state.lifetag.action,
  profileAction: state.profile.action,
  getLifetagProductDetailResponse:
    state.lifetag.getLifetagProductDetailResponse,
  lifetagTempOrderState: state.persist.lifetagTempOrderState,
  getLifetagProductDetailFailed: state.lifetag.getLifetagProductDetailFailed,
  setLifetagCreateOrderFailed: state.lifetag.setLifetagCreateOrderFailed,
  setLifetagOrderNoResponse: state.lifetag.setLifetagOrderNoResponse,
  setLifetagCreateOrderResponse: state.lifetag.setLifetagCreateOrderResponse,
  getAddressListFailed: state.profile.getAddressListFailed,
  getAddressListResponse: state.profile.getAddressListResponse,
  isComingFromScreen: state.persist.isComingFromScreen,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getLifetagProductDetail: (payload) => getLifetagProductDetail(payload),
  setLifetagCreateOrder: (payload) => setLifetagCreateOrder(payload),
  setLifetagCreateOrderClear: () => setLifetagCreateOrderClear(),
  getAddressList: () => getAddressList(),
  getAddressListClear: () => getAddressListClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setLifetatOutOffStock: (payload) => setLifetagOutOffStock(payload),
  setLifetagTempOrderState: (payload) => setLifetagTempOrderState(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
