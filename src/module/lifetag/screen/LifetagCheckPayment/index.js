import View from './View';
import { connect } from 'react-redux';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { getPaymentStatusv2 } from '@cp-module/payments/paymentsAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userId: state.auth.userData.userId,
  token: state.auth.token.access_token,
  reffNo: state.auth.userData.reffNo,
  userData: state.auth.userData,
  paymentId: state.payments.paymentId,
  getPaymentStatusv2Response: state.payments.getPaymentStatusv2Response,
  getPaymentStatusv2Failed: state.payments.getPaymentStatusv2Failed,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPaymentStatusV2: (payload) => getPaymentStatusv2(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
