import { connect } from 'react-redux';
import {
  getIsUserEligible,
  getIsUserEligibleClear,
} from '@cp-module/home/homeAction';
import {
  getCurrentSubs,
  getEligibleSubmission,
  getListRs,
  getListRsClear,
  getProducts,
  setSubmission,
  setWaiting,
  setSubmissionClear,
  getEligibleLite,
  getEligiblePos,
} from '@cp-module/lifesaver/lifesaverAction';
import {
  setLoginSocial,
  setLoginSocialClear,
} from '@cp-module/login/loginAction';
import { setRequestOtpClear } from '@cp-module/register/registerAction';
import {
  setInternalServerError,
  setLoading,
  setCustomerCare,
  setAvailableOnMobile,
  setAppsflyerData,
} from '@cp-bootstrap/bootstrapAction';
import View from './View';
import { setBuyForOthersState } from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  loginAction: state.login.action,
  userId: state.auth.userData.userId,
  alreadyKYC: state.auth.userData.alreadyKYC,
  deviceId: state?.auth?.userData?.deviceId,
  getCurrentSubsError: state.lifesaver.getCurrentSubsError,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getIsUserEligibleResponse: state.home.getIsUserEligibleResponse,
  getIsUserEligibleError: state.home.getIsUserEligibleError,
  getListRsError: state.lifesaver.getListRsResponse,
  getListRsResponse: state.lifesaver.getListRsResponse,
  getProductsResponse: state.lifesaver.getProductsResponse,
  isBajoRunProgress: state?.lifesaver?.isBajoRunProgress,
  lifesaverAction: state.lifesaver.action,
  setSubmissionError: state.lifesaver.setSubmissionError,
  setSubmissionResponse: state.lifesaver.setSubmissionResponse,
  setWaitingError: state.lifesaver.setWaitingError,
  setWaitingResponse: state.lifesaver.setWaitingResponse,
  getEligibleSubmissionFetch: state.lifesaver.getEligibleSubmissionFetch,
  getEligibleSubmissionError: state.lifesaver.getEligibleSubmissionError,
  getEligibleSubmissionResponse: state.lifesaver.getEligibleSubmissionResponse,
  getEligibleLiteResponse: state.lifesaver.getEligibleLiteResponse,
  getEligiblePosResponse: state.lifesaver.getEligiblePosResponse,
  buyForOthersFormState: state.persist.buyForOthersFormState,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getCurrentSubs: (payload) => getCurrentSubs(payload),
  getIsUserEligible: (payload) => getIsUserEligible(payload),
  getIsUserEligibleClear: (payload) => getIsUserEligibleClear(payload),
  getListRs: (payload) => getListRs(payload),
  getListRsClear: () => getListRsClear(),
  getProducts: () => getProducts(),
  setSubmission: (payload) => setSubmission(payload),
  setWaiting: (payload) => setWaiting(payload),
  getEligibleSubmission: (payload) => getEligibleSubmission(payload),
  setLoginSocial: (payload) => setLoginSocial(payload),
  setLoginSocialClear: (payload) => setLoginSocialClear(payload),
  setRequestOtpClear: () => setRequestOtpClear(),
  setSubmissionClear: () => setSubmissionClear(),
  setCustomerCare: (payload) => setCustomerCare(payload),
  setInternalServerError: (payload) => setInternalServerError(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  getEligibleLite: (payload) => getEligibleLite(payload),
  getEligiblePos: (payload) => getEligiblePos(payload),
  setAppsflyerData: (payload) => setAppsflyerData(payload),
  setBuyForOthersState : (payload) => setBuyForOthersState(payload)
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
