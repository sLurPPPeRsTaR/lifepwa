import { setAvailableOnMobile, setLoading } from '@cp-bootstrap/bootstrapAction';
import { setInvoiceId, setLang } from '@cp-module/auth/authAction';
import {
  getPaymentMethod,
  setCreateBill,
  setCreateBillClear,
} from '@cp-module/payments/paymentsAction';
import { setSelectedPolicy } from '@cp-module/polis/polisAction';
import { connect } from 'react-redux';
import {
  getBills,
  getBillsClear,
  setResubscribe,
  setResubscribeClear,
} from '@cp-module/profile/profileAction';
import View from './View';
import { getCurrentSubs } from '@cp-module/lifesaver/lifesaverAction';
import { getSubscriptionDetail, getSubscriptions, getSubscriptionsOther } from '@cp-module/subs/subsAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getSubscriptionsResponse: state.subs.getSubscriptionsResponse,
  getSubscriptionDetailResponse: state.subs.getSubscriptionDetailResponse,
  profileAction: state.profile.action,
  getBillsResponse: state.profile.getBillsResponse,
  getPaymentMethodResponse: state.payments.getPaymentMethodResponse,
  setCreateBillResponse: state.payments.setCreateBillResponse,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getSubscriptionsOtherResponse: state.subs.getSubscriptionsOtherResponse
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  getSubscriptions: (payload) => getSubscriptions(payload),
  getSubscriptionDetail: (payload) => getSubscriptionDetail(payload),
  setSelectedPolicy: (payload) => setSelectedPolicy(payload),
  setResubscribe: (payload) => setResubscribe(payload),
  setResubscribeClear: () => setResubscribeClear(),
  getBills: (payload) => getBills(payload),
  getBillsClear: () => getBillsClear(),
  getPaymentMethod: (payload) => getPaymentMethod(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  setCreateBill: (payload) => setCreateBill(payload),
  setCreateBillClear: () => setCreateBillClear(),
  setInvoiceId: (payload) => setInvoiceId(payload),
  getCurrentSubs: (payload) => getCurrentSubs(payload),
  setLoading: (payload) => setLoading(payload),
  getSubscriptionsOther: () => getSubscriptionsOther()
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
