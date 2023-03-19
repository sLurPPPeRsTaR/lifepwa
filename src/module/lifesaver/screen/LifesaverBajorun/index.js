import View from './View';
import { connect } from 'react-redux';
import { getBajoRunStep } from '@cp-module/lifesaver/lifesaverAction';
import { getIsUserEligible } from '@cp-module/home/homeAction';
import {
  setAvailableOnMobile,
  setCustomerCare,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import {
  getBajoRunProduct,
  getCampaign,
  getEligibleSubmission,
  getIsUserEligibleBajoRun,
  setWaiting,
  setWaitingClear,
} from '@cp-module/lifesaver/lifesaverAction';

const mapStateToProps = (state) => ({
  alreadyKYC: state.auth.userData.alreadyKYC,
  alreadyLivenessTest: state.auth.userData.alreadyLivenessTest,
  deviceId: state?.auth?.userData?.deviceId,
  isBajoRunFirstAccess: state?.lifesaver?.isBajoRunFirstAccess,
  lang: state.auth.lang,
  getBajoRunProductResponse: state.lifesaver.getBajoRunProductResponse,
  getIsUserEligibleBajoRunError:
    state?.lifesaver?.getIsUserEligibleBajoRunError,
  getIsUserEligibleBajoRunResponse:
    state?.lifesaver?.getIsUserEligibleBajoRunResponse,
  userId: state.auth.userData.userId,
  getEligibleSubmissionFetch: state.lifesaver.getEligibleSubmissionFetch,
  getEligibleSubmissionError: state.lifesaver.getEligibleSubmissionError,
  getEligibleSubmissionResponse: state.lifesaver.getEligibleSubmissionResponse,
  getCampaignResponse: state.lifesaver.getCampaignResponse,
  lifesaverAction: state.lifesaver.action,
  setWaitingError: state.lifesaver.setWaitingError,
  setWaitingResponse: state.lifesaver.setWaitingResponse,
  getIsUserEligibleResponse: state.home.getIsUserEligibleResponse,
  getIsUserEligibleError: state.home.getIsUserEligibleError,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getBajoRunStep: (payload) => getBajoRunStep(payload),
  getBajoRunProduct: () => getBajoRunProduct(),
  getCampaign: (payload) => getCampaign(payload),
  setWaiting: (payload) => setWaiting(payload),
  setWaitingClear: (payload) => setWaitingClear(payload),
  getEligibleSubmission: (payload) => getEligibleSubmission(payload),
  getIsUserEligible: (payload) => getIsUserEligible(payload),
  setCustomerCare: (payload) => setCustomerCare(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  getIsUserEligibleBajoRun: (payload) => getIsUserEligibleBajoRun(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
