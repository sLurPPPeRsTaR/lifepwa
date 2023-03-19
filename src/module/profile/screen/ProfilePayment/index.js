import { setIsOnlyAddCard } from '@cp-bootstrap/bootstrapAction';
import { setInvoiceId, setLang, setPaymentId } from '@cp-module/auth/authAction';
import { deletePaymentMethod, deletePaymentMethodClear, getPaymentMethod, getPaymentMethodClear, orderPaymentMethod, orderPaymentMethodClear, setCreateBill, setCreateBillClear } from '@cp-module/payments/paymentsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getPaymentMethodResponse: state.payments.getPaymentMethodResponse,
  userData: state.auth.userData,
  userId: state.auth.userData.userId,
  paymentsAction: state.payments.action,
  setCreateBillError: state.payments.setCreateBillError,
  setCreateBillResponse: state.payments.setCreateBillResponse,
  isOnlyAddCard: state.bootstrap.isOnlyAddCard,
  setCreateBillParam: state.payments.setCreateBillParam,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  getPaymentMethod: (payload) => getPaymentMethod(payload),
  getPaymentMethodClear: () => getPaymentMethodClear(),
  orderPaymentMethod: (payload) => orderPaymentMethod(payload),
  orderPaymentMethodClear: () => orderPaymentMethodClear(),
  deletePaymentMethod: (payload) => deletePaymentMethod(payload),
  deletePaymentMethodClear: () => deletePaymentMethodClear(),
  setCreateBill: (payload) => setCreateBill(payload),
  setCreateBillClear: () => setCreateBillClear(),
  setIsOnlyAddCard: (payload) => setIsOnlyAddCard(payload),
  setInvoiceId: (payload) => setInvoiceId(payload),
  setPaymentId: (payload) => setPaymentId(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
