import { connect } from 'react-redux';
import { setLang } from '@cp-module/auth/authAction';
import View from './View';
import { setFirstLoad, setReferral } from '@cp-bootstrap/bootstrapAction';
import { getListReferral } from '@cp-module/referral/referralAction';
import { getProfileReferral } from '@cp-module/profile/profileAction';

const mapStateToProps = (state) => ({
  deviceId: state?.auth?.userData?.deviceId,
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userId: state.auth.userData.userId,
  getListReferralResponse: state.referral.getListReferralResponse,
  getProfileReferralResponse: state.profile.getProfileReferralResponse,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  setFirstLoad: (payload) => setFirstLoad(payload),
  getListReferral: (payload) => getListReferral(payload),
  setReferral: (payload) => setReferral(payload),
  getProfileReferral: (payload) => getProfileReferral(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
