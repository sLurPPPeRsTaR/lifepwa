import { getSubscriptions } from '@cp-module/profile/profileAction';
import { setUnsubscribe } from '@cp-module/subs/subsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getSubscriptionDetailResponse: state.profile.getSubscriptionDetailResponse,
  subsAction: state.subs.action,
});

const mapDispatchToProps = {
  setUnsubscribe: (payload) => setUnsubscribe(payload),
  getSubscriptions: (payload) => getSubscriptions(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
