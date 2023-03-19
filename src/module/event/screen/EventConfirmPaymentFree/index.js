import { connect } from 'react-redux'
import { setLoading, setInternalServerError } from '@cp-bootstrap/bootstrapAction'
import View from './View'
import { setEventBuyTicket, setPaymentEvent, setValidateReferralCode } from '@cp-module/event/eventAction'
import { setCreateBill } from '@cp-module/payments/paymentsAction'
import { getSubscriptions, getUserIdentity } from '@cp-module/profile/profileAction'
import { getCurrentSubs, setSubmission, setSubmissionOld } from '@cp-module/lifesaver/lifesaverAction'
import { getPolicies, setSelectedPolicy } from '@cp-module/polis/polisAction'

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    getUserEventInvoiceIdResponse: state.event.getUserEventInvoiceIdResponse,
    getUserIdentityResponse: state.profile.getUserIdentityResponse,
    lsAction: state.lifesaver.action,
    setSubmissionResponse: state.lifesaver.setSubmissionResponse,
    paymentAction: state.payments.action,
    getPoliciesResponse: state.polis.getPoliciesResponse,
    getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
    eventAction: state.event.action,
    accessCode: state.event.accessCode,
    eventId: state.event.eventId,
    userData: state.auth.userData
})

const mapDispatchToProps = {
    getUserIdentity: (payload) => getUserIdentity(payload),
    setLoading: (payload) => setLoading(payload),
    setPaymentEvent: (payload) => setPaymentEvent(payload),
    setCreateBill: (payload) => setCreateBill(payload),
    setSubmissionOld: (payload) => setSubmissionOld(payload),
    setInternalServerError: (payload) => setInternalServerError(payload),
    getCurrentSubs: () => getCurrentSubs(),
    getPolicies: () => getPolicies(),
    setSelectedPolicy: (payload) => setSelectedPolicy(payload),
    setEventBuyTicket: (payload) => setEventBuyTicket(payload),
    getSubscriptions: (payload) => getSubscriptions(payload),
    setValidateReferralCode: (payload) => setValidateReferralCode(payload)
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
