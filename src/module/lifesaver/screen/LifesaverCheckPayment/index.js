import { connect } from 'react-redux';
import { setIsOnlyAddCard, setLoading } from '@cp-bootstrap/bootstrapAction';
import {
  getPaymentHistory,
  getPaymentStatus,
  getPaymentStatusv2,
  getPaymentStatusv3,
  setCreateBillClear,
} from '@cp-module/payments/paymentsAction';
import View from './View';
import { setBuyForOthersState } from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  paymentId: state.payments.paymentId,
  inviteeUserId: state.payments.inviteeUserId,
  getPaymentStatusResponse: state.payments.getPaymentStatusResponse,
  getPaymentStatusFailed: state.payments.getPaymentStatusFailed,
  getPaymentStatusv2Response: state.payments.getPaymentStatusv2Response,
  getPaymentStatusv2Failed: state.payments.getPaymentStatusv2Error,
  getPaymentStatusv3Response: state.payments.getPaymentStatusv3Response,
  getPaymentStatusv3Failed: state.payments.getPaymentStatusv3Error,
  setCreateBillParam: state.payments.setCreateBillParam,
  setCreateBillResponse: state.payments.setCreateBillResponse,
  invoiceId: state.auth.userData.invoiceId,
  reffNo: state.auth.userData.reffNo,
  policyNumber: state.auth.userData.policyNumber,
  paymentsAction: state.payments.paymentsAction,
  from: state.payments.from,
  product: state.payments.product,
  isOnlyAddCard: state.bootstrap.isOnlyAddCard,
  paymentId: state.auth.userData.paymentId,
  appsflyerData: state.bootstrap.appsflyerData,
  onFailed: state.auth.userData.onFailed,
  invoiceMaster: state.auth.userData.invoiceMaster,
  type: state.auth.userData.type,
  eventId: state.auth.userData.eventId,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPaymentStatus: (payload) => getPaymentStatus(payload),
  getPaymentStatusV2: (payload) => getPaymentStatusv2(payload),
  getPaymentHistory: (payload) => getPaymentHistory(payload),
  setIsOnlyAddCard: (payload) => setIsOnlyAddCard(payload),
  setCreateBillClear: () => setCreateBillClear(),
  getPaymentStatusV3: (payload) => getPaymentStatusv3(payload),
  setBuyForOthersState: (payload) => setBuyForOthersState(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
