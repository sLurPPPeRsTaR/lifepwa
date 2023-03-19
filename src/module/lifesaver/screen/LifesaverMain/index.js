import { connect } from 'react-redux';
import { setEventCode, setLoading } from '@cp-bootstrap/bootstrapAction';
import { getIsUserEligible } from '@cp-module/home/homeAction';
import {
  getCurrentSubs,
  getListRs,
  getListRsClear,
  getProducts,
  setSubmission,
  setSubmissionClear,
} from '@cp-module/lifesaver/lifesaverAction';
import View from './View';

const mapStateToProps = (state) => ({
  alreadyKYC: state.auth.userData.alreadyKYC,
  deviceId: state?.auth?.userData?.deviceId,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getIsUserEligibleResponse: state.home.getIsUserEligibleResponse,
  getIsUserEligibleError: state.home.getIsUserEligibleError,
  getListRsError: state.lifesaver.getListRsResponse,
  getListRsResponse: state.lifesaver.getListRsResponse,
  getProductsResponse: state.lifesaver.getProductsResponse,
  lang: state.auth.lang,
  lifesaverAction: state.lifesaver.action,
  setSubmissionResponse: state.lifesaver.setSubmissionResponse,
  userId: state.auth.userData.userId,
});

const mapDispatchToProps = {
  getCurrentSubs: (payload) => getCurrentSubs(payload),
  getIsUserEligible: (payload) => getIsUserEligible(payload),
  getListRs: (payload) => getListRs(payload),
  getListRsClear: () => getListRsClear(),
  getProducts: () => getProducts(),
  setLoading: (payload) => setLoading(payload),
  setSubmission: (payload) => setSubmission(payload),
  setSubmissionClear: () => setSubmissionClear(),
  setEventCode: (payload) => setEventCode(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
