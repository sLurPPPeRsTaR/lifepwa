import { connect } from 'react-redux'
import View from './View'
import { setEventDetail } from '@cp-module/event/eventAction'

const mapStateToProps = (state) => ({
    token: state.auth.token.access_token,
})

const mapDispatchToProps  = {
    setModalAksesKode: (payload) => setModalAksesKode(payload),
    setEventDetail: (payload) => setEventDetail(payload),
}

export default connect(mapStateToProps, mapDispatchToProps)(View)