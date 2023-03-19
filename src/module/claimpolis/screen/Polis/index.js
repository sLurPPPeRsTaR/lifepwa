import { connect } from 'react-redux';
import View from './View';
import {
    getPolicyDigital,
    getPolicyDigitalSuccess,
    setPolicyNumber,
    getPolicyDigitalClear,
} from '@cp-module/claimpolis/claimpolisAction';

const mapStateToProps= (state) => ({
    lang: state.auth.lang,
    getPolicyDigitalResponse: state.claimpolis.getPolicyDigitalResponse,
    getPolicyDigitalFetch: state.claimpolis.getPolicyDigitalFetch,
    getPolicyDigitalFetchStatus: state.claimpolis.getPolicyDigitalFetchStatus,
    claimpolisAction: state.claimpolis.action,
})

const mapDispatchToProps = {
    getPolicyDigital: (payload) => getPolicyDigital(payload),
    getPolicyDigitalSuccess: (payload) => getPolicyDigitalSuccess(payload),
    setPolicyNumber: (payload) => setPolicyNumber(payload),
    getPolicyDigitalClear: (payload) => getPolicyDigitalClear(payload),
}

export default connect(mapStateToProps, mapDispatchToProps)(View)