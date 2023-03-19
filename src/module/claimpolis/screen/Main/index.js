import View from './View';
import { connect } from 'react-redux';
import {
    getFaqClaim,
    getFaqClaimSuccess,
    getFaqClaimDetail,
} from '@cp-module/claimpolis/claimpolisAction';
import {
    setLoading,
} from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    getFaqClaimResponse: state.claimpolis.getFaqClaimResponse,
    userData: state.auth.userData,
    getFaqClaimFetch: state.claimpolis.getFaqClaimFetch,
})

const mapDispatchToProps = {
    getFaqClaim: (payload) => getFaqClaim(payload),
    getFaqClaimSuccess: (payload) => getFaqClaimSuccess(payload),
    getFaqClaimDetail: (payload) => getFaqClaimDetail(payload),
    setLoading: (payload) => setLoading(payload),
}

export default connect(mapStateToProps, mapDispatchToProps)(View)