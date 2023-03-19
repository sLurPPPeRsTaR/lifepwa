
import { connect } from 'react-redux';
import { 
  getPolicyWidgetHome,
  getPolicyWidgetHomeSuccess,
  getPolicyWidgetHomeFailed,
  getPolicyWidgetHomeClear,
} from '@cp-module/home/homeAction';
import {
  getLifetagListOrder,
  getLifetagFlag,
  getLifetagLinkedList,
  getLifetagCurrentSetting,
} from '@cp-module/lifetag/lifetagAction';
import {
  getSubscriptions
} from '@cp-module/subs/subsAction';
import { setLoading } from '@cp-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  userId: state.auth.userData.userId,
  
  homeAction: state.home.action,
  lifetagAction: state.lifetag.action,
  lifesaverAction: state.lifesaver.action,

  getPolicyWidgetHomeFetch: state.home.getPolicyWidgetHomeFetch,
  getPolicyWidgetHomeResponse: state.home.getPolicyWidgetHomeResponse,
  getPolicyWidgetHomeError: state.home.getPolicyWidgetHomeError,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,

  getLifetagListOrderFailed: state.lifetag.getLifetagListOrderFailed,
  getLifetagListOrderResponse: state.lifetag.getLifetagListOrderResponse,
  getLifetagFlagResponse: state.lifetag.getLifetagFlagResponse,
  getLifetagLinkedListResponse: state.lifetag.getLifetagLinkedListResponse,
  getLifetagCurrentSettingResponse: state.lifetag.getLifetagCurrentSettingResponse,

  getSubscriptionsResponse: state.subs.getSubscriptionsResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPolicyWidgetHome: (payload) => getPolicyWidgetHome(payload),
  getPolicyWidgetHomeSuccess: (payload) => getPolicyWidgetHomeSuccess(payload),
  getPolicyWidgetHomeFailed: (payload) => getPolicyWidgetHomeFailed(payload),
  getPolicyWidgetHomeClear: (payload) => getPolicyWidgetHomeClear(payload),

  getLifetagListOrder: () => getLifetagListOrder(),
  getLifetagFlag: () => getLifetagFlag(),
  getLifetagLinkedList: () => getLifetagLinkedList(),
  getLifetagCurrentSetting: (payload) => getLifetagCurrentSetting(payload),

  getSubscriptions: (payload) => getSubscriptions(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
