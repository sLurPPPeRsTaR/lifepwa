import { setLoading } from '@cp-bootstrap/bootstrapAction';
import {
  setOtherInformation,
  setUpdataTempState,
} from '@cp-module/persist/persistAction';
import {
  getUpdataListBank,
  getUpdataListBankClear,
  setUpdataBankUpload,
  setUpdataInquiryBankAccount,
  setUpdataInquiryBankAccountClear,
  setUpdataBankUploadClear,
} from '@cp-module/updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  otherInformation: state.persist.otherInformation,
  getUpdataLastOtherInfoResponse: state.updata.getUpdataLastOtherInfoResponse,
  updataAction: state.updata.action,
  getUpdataListBankResponse: state.updata.getUpdataListBankResponse,
  setUpdataInquiryBankAccountResponse:
    state.updata.setUpdataInquiryBankAccountResponse,
  setUpdataInquiryBankAccountFailed:
    state.updata.setUpdataInquiryBankAccountFailed,
  currentScreen: state.activity.currentScreen,
  alreadySetPin: state.auth.userData.alreadySetPin,
  alreadySetMPin: state.auth.userData.alreadySetMPin,
  updataTempState: state.persist.tempState,
  isKTPSame: state.persist.isKTPSame,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
  setUpdataBankUploadFailed: state.updata.setUpdataBankUploadFailed,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setOtherInformation: (payload) => setOtherInformation(payload),
  getUpdataListBank: (payload) => getUpdataListBank(payload),
  getUpdataListBankClear: () => getUpdataListBankClear(),
  setUpdataInquiryBankAccount: (payload) =>
    setUpdataInquiryBankAccount(payload),
  setUpdataInquiryBankAccountClear: () => setUpdataInquiryBankAccountClear(),
  setUpdataBankUpload: (payload) => setUpdataBankUpload(payload),
  setUpdataTempState: (payload) => setUpdataTempState(payload),
  setUpdataBankUploadClear: () => setUpdataBankUploadClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
