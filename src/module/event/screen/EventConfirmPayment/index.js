import { connect } from 'react-redux';
import {
  setInternalServerError,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import View from './View';
import {
  getEventDetail,
  getUserEventInvoiceId,
  setEventParam,
  setPaymentEvent,
  setEventBuyTicket,
  setValidateReferralCode,
  setValidateVoucherCode,
  setValidateVoucherCodeClear,
  setEventBuyTicketClear,
} from '@cp-module/event/eventAction';
import { getUserIdentity } from '@cp-module/profile/profileAction';
import {
  getCurrentSubs,
  setSubmissionOld,
} from '@cp-module/lifesaver/lifesaverAction';
import {
  setCreateBillEvent,
  setCreateBillEventClear,
} from '@cp-module/payments/paymentsAction';
import { setInvoiceId } from '@cp-module/auth/authAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userData: state.auth.userData,
  getEventDetailResponse: state.event.getEventDetailResponse,
  action: state.event.action,
  getUserEventInvoiceIdResponse: state.event.getUserEventInvoiceIdResponse,
  getUserIdentityResponse: state.profile.getUserIdentityResponse,
  eventAction: state.event.action,
  setPaymentEventResponse: state.event.setPaymentEventResponse,
  event: state.event,
  lifesaverAction: state.lifesaver.action,
  paymentsAction: state.payments.action,
  getPoliciesResponse: state.home.getPoliciesResponse,
  getEventDetailParam: state.event.getEventDetailParam,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  setValidateReferralCodeResponse: state.event.setValidateReferralCodeResponse,
  setSubmissionOldResponse: state.lifesaver.setSubmissionOldResponse,
  setSubmissionOldError: state.lifesaver.setSubmissionOldError,
  setValidateVoucherCodeResponse: state.event.setValidateVoucherCodeResponse,
  setValidateVoucherCodeFailed: state.event.setValidateVoucherCodeFailed,
  setCreateBillEventError: state.event.setCreateBillEventError,
});

const mapDispatchToProps = {
  getUserEventInvoiceId: (payload) => getUserEventInvoiceId(payload),
  getUserIdentity: (payload) => getUserIdentity(payload),
  setLoading: (payload) => setLoading(payload),
  setPaymentEvent: (payload) => setPaymentEvent(payload),
  setEventParam: (payload) => setEventParam(payload),
  getEventDetail: (payload) => getEventDetail(payload),
  setInternalServerError: (payload) => setInternalServerError(payload),
  setEventBuyTicket: (payload) => setEventBuyTicket(payload),
  setEventBuyTicketClear: () => setEventBuyTicketClear(),
  setValidateReferralCode: (payload) => setValidateReferralCode(payload),
  setValidateVoucherCode: (payload) => setValidateVoucherCode(payload),
  setValidateVoucherCodeClear: () => setValidateVoucherCodeClear(),
  setSubmissionOld: (payload) => setSubmissionOld(payload),
  setCreateBillEvent: (payload) => setCreateBillEvent(payload),
  setCreateBillEventClear: () => setCreateBillEventClear(),
  getCurrentSubs: () => getCurrentSubs(),
  setInvoiceId: (payload) => setInvoiceId(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
