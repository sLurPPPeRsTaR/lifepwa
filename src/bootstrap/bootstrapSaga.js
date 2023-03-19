import { all } from 'redux-saga/effects';

// Other Sagas
import auth from '@cp-module/auth/authSaga';
import forpass from '@cp-module/forpass/forpassSaga';
import login from '@cp-module/login/loginSaga';
import register from '@cp-module/register/registerSaga';
import profile from '@cp-module/profile/profileSaga';
import polis from '@cp-module/polis/polisSaga';
import kyc from '@cp-module/kyc/kycSaga';
import lifesaver from '@cp-module/lifesaver/lifesaverSaga';
import lifecover from '@cp-module/lifecover/lifecoverSaga';
import home from '@cp-module/home/homeSaga';
import payments from '@cp-module/payments/paymentsSaga';
import notification from '@cp-module/notification/notificationSaga';
import event from '@cp-module/event/eventSaga';
import subs from '@cp-module/subs/subsSaga';
import lifetag from '@cp-module/lifetag/lifetagSaga';
// import polis from 'ca-module-polis/polisSaga';
import updata from '@cp-module/updata/updataSaga';
// import notification from 'ca-module-notification/notificationSaga';
// import subs from 'ca-module-subs/subsSaga';'
import unsubscribe from '@cp-module/unsubscribe/unsubscribeSaga';
import article from '@cp-module/article/articleSaga';
import claimpolis from '@cp-module/claimpolis/claimpolisSaga';
import referral from '@cp-module/referral/referralSaga';

function* bootstrapSaga() {
  yield all([
    ...auth,
    ...forpass,
    ...login,
    ...register,
    ...profile,
    ...polis,
    ...home,
    ...payments,
    // ...profile,
    // ...kyc,
    ...kyc,
    // ...home,
    // ...profile,
    // ...polis,
    ...updata,
    ...lifesaver,
    ...lifecover,
    ...notification,
    ...event,
    ...subs,
    ...lifetag,
    ...unsubscribe,
    ...article,
    ...claimpolis,
    ...referral,
  ]);
}

export default bootstrapSaga;
