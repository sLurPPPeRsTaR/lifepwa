import View from './View';
import { connect } from 'react-redux';
import { setIsComingFromScreen } from '@cp-module/persist/persistAction';
import { setLoading, setCustomerCare } from '@cp-bootstrap/bootstrapAction';
import {
  getLifetagDetailOrder,
  getLifetagListOrder,
} from '@cp-module/lifetag/lifetagAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  lifetagAction: state.lifetag.action,
  getLifetagDetailOrderResponse: state.lifetag.getLifetagDetailOrderResponse,
  getLifetagProductDetailFailed: state.lifetag.getLifetagProductDetailFailed,
  isComingFromScreen: state.persist.isComingFromScreen,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setCustomerCare: (payload) => setCustomerCare(payload),
  getLifetagListOrder: (payload) => getLifetagListOrder(payload),
  getLifetagDetailOrder: (payload) => getLifetagDetailOrder(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
