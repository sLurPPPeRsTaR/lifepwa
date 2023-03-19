import { setCreateBill } from '@cp-module/payments/paymentsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  deviceId: state?.auth?.userData?.deviceId,
  lang: state.auth.lang,
  setCreateBillResponse: state.payments.setCreateBillResponse
});

const mapDispatchToProps = {
  setCreateBill: (payload) => setCreateBill(payload)
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
