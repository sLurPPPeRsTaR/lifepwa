import { connect } from 'react-redux';
import {
  setUpdataRequestOtp,
  setUpdataRequestOtpClear,
} from '@cp-module/updata/updataAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  setUpdataRequestOtpFailed: state.updata.setUpdataRequestOtpFailed,
});

const mapDispatchToProps = {
  setUpdataRequestOtp: (payload) => setUpdataRequestOtp(payload),
  setUpdataRequestOtpClear: () => setUpdataRequestOtpClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
