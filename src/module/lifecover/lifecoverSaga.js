import getAgePublicSaga from '@cp-module/lifecover/redux/getAgePublic/saga';
import getPremiPublicSaga from '@cp-module/lifecover/redux/getPremiPublic/saga';
import getPremiPrivateSaga from '@cp-module/lifecover/redux/getPremiPrivate/saga';
import checkBmiSaga from '@cp-module/lifecover/redux/checkBmi/saga';
import getUserConfirmationDetailSaga from '@cp-module/lifecover/redux/getUserConfirmationDetail/saga';
import getBeneficiarySaga from '@cp-module/lifecover/redux/getBeneficiary/saga';
import addBeneficiarySaga from '@cp-module/lifecover/redux/addBeneficiary/saga';
import updateSubmissionSaga from '@cp-module/lifecover/redux/updateSubmission/saga';
import createBillingSaga from '@cp-module/lifecover/redux/createBilling/saga';
import getQuestionsSaga from '@cp-module/lifecover/redux/getQuestion/saga';
import setSubmission from '@cp-module/lifecover/redux/setSubmission/saga';
import getCurrentSubsSaga from '@cp-module/lifecover/redux/getCurrentSubs/saga';
import checkReferralSaga from '@cp-module/lifecover/redux/checkReferral/saga';

export default [
  ...getAgePublicSaga,
  ...getPremiPublicSaga,
  ...getPremiPrivateSaga,
  ...checkBmiSaga,
  ...getBeneficiarySaga,
  ...getUserConfirmationDetailSaga,
  ...addBeneficiarySaga,
  ...updateSubmissionSaga,
  ...createBillingSaga,
  ...getQuestionsSaga,
  ...setSubmission,
  ...getCurrentSubsSaga,
  ...checkReferralSaga,
];
