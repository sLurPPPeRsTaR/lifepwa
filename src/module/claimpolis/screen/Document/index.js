import { setUploadDocClear } from '@cp-module/claimpolis/claimpolisAction';
import { connect } from 'react-redux';
import View from './View';
import {
  getUpdataListBank,
  setUpdataInquiryBankAccount,
} from '@cp-module/updata/updataAction';
import {
  setIsComingFromScreen,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import {
  getRs,
  getListBenefitType,
  setDataClaim,
} from '@cp-module/claimpolis/claimpolisAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getUpdataListBankResponse: state.updata.getUpdataListBankResponse,
  getUpdataListBankFetch: state.updata.getUpdataListBankFetch,
  updataAction: state.updata.action,
  getRsResponse: state.claimpolis.getRsResponse,
  selectedPolicyNumber: state.claimpolis.selectedPolicyNumber,
  getListTypeBenefitResponse: state.claimpolis.getListTypeBenefitResponse,
  claimpolisAction: state.claimpolis.action,
  setUpdataInquiryBankAccountResponse:
    state.updata.setUpdataInquiryBankAccountResponse,
  claimpolisPayload: state.claimpolis.payload,
});

const mapDispatchToProps = {
  getUpdataListBank: (payload) => getUpdataListBank(payload),
  setLoading: (payload) => setLoading(payload),
  getRs: (payload) => getRs(payload),
  getListBenefitType: (payload) => getListBenefitType(payload),
  setUpdataInquiryBankAccount: (payload) =>
    setUpdataInquiryBankAccount(payload),
  setDataClaim: (payload) => setDataClaim(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
