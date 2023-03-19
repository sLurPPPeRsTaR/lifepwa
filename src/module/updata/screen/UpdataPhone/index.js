import { connect } from 'react-redux';
import {
  getVerifyPin,
  getVerifyPinClear,
} from '@cp-module/profile/profileAction';
import {
  setUpdataRequestOtp,
  setUpdataRequestOtpClear,
  setUpdataVerifyOtp,
  setUpdataVerifyOtpClear,
} from '@cp-module/updata/updataAction';
import View from './View';
import { setCustomerCare, setLoading } from '@cp-bootstrap/bootstrapAction';
import { setOtherInformation } from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getVerifyPinResponse: state.profile.getVerifyPinResponse,
  profileAction: state.profile.action,
  getVerifyPinFailed: state.profile.getVerifyPinFailed,
  updataAction: state.updata.action,
  setUpdataRequestOtpFailed: state.updata.setUpdataRequestOtpFailed,
  alreadySetPin: state.auth.userData.alreadySetPin,
});

const mapDispatchToProps = {
  getVerifyPin: (payload) => getVerifyPin(payload),
  getVerifyPinClear: (payload) => getVerifyPinClear(payload),
  setUpdataRequestOtp: (payload) => setUpdataRequestOtp(payload),
  setUpdataRequestOtpClear: () => setUpdataRequestOtpClear(),
  setUpdataVerifyOtp: (payload) => setUpdataVerifyOtp(payload),
  setUpdataVerifyOtpClear: () => setUpdataVerifyOtpClear(),
  setCustomerCare: (payload) => setCustomerCare(payload),
  setLoading: (payload) => setLoading(payload),
  setOtherInformation: (payload) => setOtherInformation(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
