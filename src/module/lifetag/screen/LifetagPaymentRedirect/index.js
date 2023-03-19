import View from './View';
import { connect } from 'react-redux';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { setCreateBill, setCreateBillClear } from '@cp-module/payments/paymentsAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  paymentAction: state.payments.action,
  setCreateBillFailed: state.payments.setCreateBillFailed,
  setCreateBillResponse: state.payments.setCreateBillResponse
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setCreateBill: (payload) =>setCreateBill(payload),
  setCreateBillClear: () => setCreateBillClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
