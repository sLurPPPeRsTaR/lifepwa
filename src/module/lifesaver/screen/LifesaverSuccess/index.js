import View from './View';
import { connect } from 'react-redux';
import {
  getCurrentSubs,
  getCurrentSubsClear,
} from '@cp-module/lifesaver/lifesaverAction';
import { setSelectedPolicy } from '@cp-module/polis/polisAction';
import { setLoading } from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
  deviceId: state?.auth?.userData?.deviceId,
  lang: state.auth.lang,
  getCurrentSubsError: state.lifesaver.getCurrentSubsError,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  planCode: state.auth.userData.planCode,
  type: state.auth.userData.type,
});
const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getCurrentSubs: (payload) => getCurrentSubs(payload),
  getCurrentSubsClear: () => getCurrentSubsClear(),
  setSelectedPolicy: (payload) => setSelectedPolicy(payload), 


};

export default connect(mapStateToProps, mapDispatchToProps)(View);
