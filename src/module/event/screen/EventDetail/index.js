import { connect } from 'react-redux'
import { setLoading } from '@cp-bootstrap/bootstrapAction'
import { 
    getUserEventInvoiceId, 
    setEventParam, 
    setModalAksesKode, 
    getEventQuota, 
    setEventBuyTicket,
    getEventDetail,
    setEventAccessCodeBuyTicket
} from '@cp-module/event/eventAction'
import { setAvailableOnMobile, setInternalServerError } from '@cp-bootstrap/bootstrapAction'
import { getCurrentSubs } from '@cp-module/lifesaver/lifesaverAction'
import View from './View'

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    userData: state.auth.userData,
    accessCode: state.event.accessCode,
    getUserEventInvoiceIdResponse: state.event.getUserEventInvoiceIdResponse,
    getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
    getEventQuotaResponse: state.event.getEventQuotaResponse,
    eventAction: state.event.action,
    event: state.event.getEventDetailResponse,
    screen: state.event.screen,
})

const mapDispatchToProps = {
    setLoading: (payload) => setLoading(payload),
    setEventParam: (payload) => setEventParam(payload),
    setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
    setModalAksesKode: (payload) => setModalAksesKode(payload),
    setInternalServerError: (payload) => setInternalServerError(payload),
    getUserEventInvoiceId: (payload) => getUserEventInvoiceId(payload),
    getCurrentSubs: (payload) => getCurrentSubs(payload),
    getEventQuota: (payload) => getEventQuota(payload),
    setEventBuyTicket: (payload) => setEventBuyTicket(payload),
    setEventAccessCodeBuyTicket: (payload) => setEventAccessCodeBuyTicket(payload),
    getEventDetail: (payload) => getEventDetail(payload)
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
