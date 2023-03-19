import View from './View';
import { connect } from 'react-redux';
import { setCustomerCare, setLoading } from '@cp-bootstrap/bootstrapAction';
import { setLifetagPaymentCheck } from '@cp-module/payments/paymentsAction';
import { setLifetagUpdateOrder } from '@cp-module/lifetag/lifetagAction';
import { setIsComingFromScreen } from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  paymentsAction: state.payments.action,
  lifetagAction: state.lifetag.action,
  setLifetagCreateOrderResponse: state.lifetag.setLifetagCreateOrderResponse,
  setLifetagPaymentCheckResponse: state.payments.setLifetagPaymentCheckResponse,
  isComingFromScreen: state.persist.isComingFromScreen,
});

const mapDispatchToProps = {
  setLifetagPaymentCheck: (payload) => setLifetagPaymentCheck(payload),
  setLifetagUpdateOrder: (payload) => setLifetagUpdateOrder(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setCustomerCare: (payload) => setCustomerCare(payload)
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
