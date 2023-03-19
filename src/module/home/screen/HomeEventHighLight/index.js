import { connect } from 'react-redux';
import View from './View';
import {
  getEventUpcoming,
  setEventParam,
} from '@cp-module/event/eventAction';
import {
  setAvailableOnMobile,
} from '@cp-bootstrap/bootstrapAction';
import {
  getLifetagFlag,
  getLifetagLinkedList,
} from '@cp-module/lifetag/lifetagAction';
import {
  getPolicyWidgetHome,
  getPolicyWidgetHomePublic,
} from '@cp-module/home/homeAction';

const mapStateToProps = (state) => ({
  token: state.auth.token.access_token,
  lang: state.auth.lang,
  userData: state.auth.userData,
  homeAction: state.home.action,
  getEventUpcomingResponse: state.event.getEventUpcomingResponse,
  getLifetagFlagResponse: state.lifetag.getLifetagFlagResponse,
  getLifetagLinkedListResponse: state.lifetag.getLifetagLinkedListResponse,
  getPolicyWidgetHomeResponse: state.home.getPolicyWidgetHomeResponse,
  getPolicyWidgetHomePublicError: state.home.getPolicyWidgetHomePublicError,
});

const mapDispatchToProps = {
  getEventUpcoming: (payload) => getEventUpcoming(payload),
  setAvailableOnMobile: (payload) => setAvailableOnMobile(payload),
  getLifetagFlag: () => getLifetagFlag(),
  getLifetagLinkedList: () => getLifetagLinkedList(),
  getPolicyWidgetHome: (payload) => getPolicyWidgetHome(payload),
  getPolicyWidgetHomePublic: (payload) => getPolicyWidgetHomePublic(payload),
  setEventParam: (payload) => setEventParam(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
