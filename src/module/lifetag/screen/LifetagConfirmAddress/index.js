import View from './View';
import { connect } from 'react-redux';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import {
  getAddressList,
  getAddressListClear,
  setUpdateAddress,
  setUpdateAddressClear,
} from '@cp-module/profile/profileAction';
import { setAddPostalCodeKycIdCard } from '@cp-module/kyc/kycAction';
import { setIsComingFromScreen } from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userData: state.auth.userData,
  kycAction: state.kyc.kycAction,
  getAddressListFailed: state.profile.getAddressListFailed,
  getAddressListResponse: state.profile.getAddressListResponse,
  isComingFromScreen: state.persist.isComingFromScreen,
  setUpdateAddressFailed: state.profile.setUpdateAddressFailed,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getAddressList: () => getAddressList(),
  getAddressListClear: () => getAddressListClear(),
  setAddPostalCodeKycIdCard: (payload) => setAddPostalCodeKycIdCard(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setUpdateAddress: (payload) => setUpdateAddress(payload),
  setUpdateAddressClear: () => setUpdateAddressClear()
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
