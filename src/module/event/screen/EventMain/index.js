import { connect } from 'react-redux'
import { 
    getEventUpcoming, 
    getEventUserTicket, 
    setEventDetail, 
    setEventParam,
    setEventUpcoming
} from '@cp-module/event/eventAction'
import { 
    setLoading, 
    setInternalServerError, 
    } from '@cp-bootstrap/bootstrapAction'
import View from './View'

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
    lang: state.auth.lang,
    getEventUpcomingResponse: state.event.getEventUpcomingResponse,
    getEventUserTicketResponse: state.event.getEventUserTicketResponse,
    getEventDetailResponse: state.event.getEventDetailResponse,
    action: state.event.action,
    accessCode: state.event.accessCode
})

const mapDispatchToProps = {
    getEventUpcoming: (payload) => getEventUpcoming(payload),
    setEventDetail: (payload) => setEventDetail(payload),
    getEventUserTicket: (payload) => getEventUserTicket(payload),
    setLoading: (payload) => setLoading(payload),
    setInternalServerError: (payload) => setInternalServerError(payload),
    setEventParam: (payload) => setEventParam(payload),
    setEventUpcoming: (payload) => setEventUpcoming(payload),
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
