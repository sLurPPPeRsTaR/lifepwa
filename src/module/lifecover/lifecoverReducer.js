import * as STATE from '@cp-module/lifecover/lifecoverInitialState';
import getAgePublicReducer from '@cp-module/lifecover/redux/getAgePublic/reducer';
import getPremiPublicReducer from '@cp-module/lifecover/redux/getPremiPublic/reducer';
import getPremiPrivateReducer from '@cp-module/lifecover/redux/getPremiPrivate/reducer';
import checkBmiReducer from '@cp-module/lifecover/redux/checkBmi/reducer';
import getUserConfirmationDetailReducer from '@cp-module/lifecover/redux/getUserConfirmationDetail/reducer';
import getBeneficiaryReducer from '@cp-module/lifecover/redux/getBeneficiary/reducer';
import addBeneficiaryReducer from '@cp-module/lifecover/redux/addBeneficiary/reducer';
import updateSubmissionReducer from '@cp-module/lifecover/redux/updateSubmission/reducer';
import createBillingReducer from '@cp-module/lifecover/redux/createBilling/reducer';
import getQuestionReducer from '@cp-module/lifecover/redux/getQuestion/reducer';
import setSubmissionReducer from '@cp-module/lifecover/redux/setSubmission/reducer';
import getCurrentSubsReducer from '@cp-module/lifecover/redux/getCurrentSubs/reducer';
import checkReferralReducer from '@cp-module/lifecover/redux/checkReferral/reducer';

const lifecoverInitialState = {
  ...STATE.getAgePublicInitialState,
  ...STATE.getPremiPublicInitialState,
  ...STATE.getPremiPrivateInitialState,
  ...STATE.checkBmiInitialState,
  ...STATE.getUserConfirmationDetailInitialState,
  ...STATE.getBeneficiaryInitialState,
  ...STATE.addBeneficiaryInitialState,
  ...STATE.updateSubmissionInitialState,
  ...STATE.createBillingInitialState,
  ...STATE.getQuestionInitialState,
  ...STATE.setSubmissionInitialState,
  ...STATE.getCurrentSubsLifecoverInitialState,
  ...STATE.checkReferralInitialState,
  action: '',
};

export const lifecoverReducer = (state = lifecoverInitialState, action) => {
  const { type } = action;
  const actions = {
    ...getAgePublicReducer(state, action),
    ...getPremiPublicReducer(state, action),
    ...getPremiPrivateReducer(state, action),
    ...checkBmiReducer(state, action),
    ...getUserConfirmationDetailReducer(state, action),
    ...getBeneficiaryReducer(state, action),
    ...addBeneficiaryReducer(state, action),
    ...updateSubmissionReducer(state, action),
    ...createBillingReducer(state, action),
    ...getQuestionReducer(state, action),
    ...setSubmissionReducer(state, action),
    ...getCurrentSubsReducer(state, action),
    ...checkReferralReducer(state, action),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
