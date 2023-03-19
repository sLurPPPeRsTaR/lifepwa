import {
  getNotif,
  getNotifTransaction,
  getNotifClear,
  getNotifTransactionClear,
  readNotif,
} from '@cp-module/notification/notificationAction';
import {
  setCreateBill,
  setCreateBillClear,
} from '@cp-module/payments/paymentsAction';
import { setInvoiceId } from '@cp-module/auth/authAction';
import { connect } from 'react-redux';
import View from './View';
import { setIsComingFromScreen } from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userData: state.auth.userData,
  token: state.auth.token.access_token,
  getNotifResponse: state.notification.getNotifResponse,
  getNotifTransactionResponse: state.notification.getNotifTransactionResponse,
  getNotifTransactionFetch: state.notification.getNotifTransactionFetch,
  readNotifResponse: state.notification.readNotifResponse,
  setCreateBillResponse: state.payments.setCreateBillResponse,
  setCreateBillParam: state.payments.setCreateBillParam,
  setCreateBillFailed: state.payments.setCreateBillFailed,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  getNotif: (payload) => getNotif(payload),
  getNotifClear: () => getNotifClear(),
  getNotifTransaction: (payload) => getNotifTransaction(payload),
  getNotifTransactionClear: (payload) => getNotifTransactionClear(payload),
  readNotif: (payload) => readNotif(payload),
  setInvoiceId: (payload) => setInvoiceId(payload),
  setCreateBill: (payload) => setCreateBill(payload),
  setCreateBillClear: () => setCreateBillClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
