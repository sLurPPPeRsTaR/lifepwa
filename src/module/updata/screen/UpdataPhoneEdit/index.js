import { connect } from 'react-redux';
import {
  setUpdataRequestOtp,
  setUpdataRequestOtpFailed,
  setUpdataRequestOtpClear,
  setUpdataVerifyOtp,
  setUpdataVerifyOtpFailed,
  setUpdataVerifyOtpClear,
} from '@cp-module/updata/updataAction';
import View from './View';
import { setOtherInformation } from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  profileAction: state.profile.action,
  updataAction: state.updata.action,
  setUpdataVerifyOtpFailed: state.updata.setUpdataVerifyOtpFailed,
  setUpdataRequestOtpFailed: state.updata.setUpdataRequestOtpFailed,
});

const mapDispatchToProps = {
  setUpdataRequestOtp: (payload) => setUpdataRequestOtp(payload),
  setUpdataRequestOtpClear: () => setUpdataRequestOtpClear(),
  setUpdataVerifyOtp: (payload) => setUpdataVerifyOtp(payload),
  setUpdataVerifyOtpClear: () => setUpdataVerifyOtpClear(),
  setOtherInformation: (payload) => setOtherInformation(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
