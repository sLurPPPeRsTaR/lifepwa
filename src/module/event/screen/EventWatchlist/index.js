import { connect } from 'react-redux'
import View from './View'
import { setEventDetail, setEventUpcoming, setModalAksesKode, setEventParam, } from '@cp-module/event/eventAction'
import { setInternalServerError } from '@cp-bootstrap/bootstrapAction'

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    userData: state.auth.userData,
    getEventUpcomingResponse: state.event.getEventUpcomingResponse,
})

const mapDispatchToProps = {
    setEventDetail: (payload) => setEventDetail(payload),
    setModalAksesKode: (payload) => setModalAksesKode(payload),
    setInternalServerError: (payload) => setInternalServerError(payload),
    setEventUpcoming: (payload) => setEventUpcoming(payload),
    setEventParam: (payload) => setEventParam(payload),
}

export default connect(mapStateToProps, mapDispatchToProps)(View)