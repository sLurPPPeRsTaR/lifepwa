import { connect } from 'react-redux';
import {
  setIsComingFromScreen,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import {
  getLifetagFlag,
  getLifetagLinkedList,
} from '@cp-module/lifetag/lifetagAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  token: state.auth.token.access_token,
  getLifetagLinkedListResponse: state.lifetag.getLifetagLinkedListResponse,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getLifetagFlagResponse: state.lifetag.getLifetagFlagResponse,
  getPoliciesResponse: state.home.getPoliciesResponse,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  getLifetagFlag: () => getLifetagFlag(),
  setLoading: (payload) => setLoading(payload),
  getLifetagLinkedList: () => getLifetagLinkedList(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
