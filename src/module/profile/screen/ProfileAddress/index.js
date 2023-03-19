import {
  setAvailableOnMobile,
  setIsComingFromScreen,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import { setLang } from '@cp-module/auth/authAction';
import {
  getAddressList,
  getAddressListClear,
  setDeleteAddress,
  setDeleteAddressClear,
} from '@cp-module/profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  profileAction: state.profile.action,
  getAddressListResponse: state.profile.getAddressListResponse,
  getAddressListFailed: state.profile.getAddressListFailed,
  setDeleteAddressFailed: state.profile.setDeleteAddressFailed,
  alreadyKYC: state.auth.userData.alreadyKYC,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  getAddressList: (payload) => getAddressList(payload),
  getAddressListClear: (payload) => getAddressListClear(payload),
  setLoading: (payload) => setLoading(payload),
  setDeleteAddress: (payload) => setDeleteAddress(payload),
  setDeleteAddressClear: () => setDeleteAddressClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
