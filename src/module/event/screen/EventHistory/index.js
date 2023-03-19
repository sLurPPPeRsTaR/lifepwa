import { connect } from 'react-redux'
import View from './View'
import { 
    setEventUpcoming,
    setEventParam,
} from '@cp-module/event/eventAction'
import { setLoading } from '@cp-bootstrap/bootstrapAction'

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    userData: state.auth.userData,
    getEventUserTicketResponse: state.event.getEventUserTicketResponse,
    action: state.event.action,
})

const mapDispatchToProps = {
    setLoading: (payload) => setLoading(payload),
    setEventUpcoming: (payload) => setEventUpcoming(payload),
    setEventParam: (payload) => setEventParam(payload),
}

export default connect(mapStateToProps, mapDispatchToProps)(View)