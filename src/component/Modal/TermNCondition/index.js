import View from './View'
import { connect } from 'react-redux'
import { setModalLsTnc, setModalShowRiplay } from '@cp-bootstrap/bootstrapAction'

const mapStateToProps = (state) => ({
    userId: state.auth.userData.userId,
    getEligiblePosResponse: state.lifesaver.getEligiblePosResponse
})

const mapDispatchToProps = {
    setModalLsTnc: (payload) => setModalLsTnc(payload),
    setModalShowRiplay: (payload) => setModalShowRiplay(payload),
}


export default connect(mapStateToProps, mapDispatchToProps)(View)