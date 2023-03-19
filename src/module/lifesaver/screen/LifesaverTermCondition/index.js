import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { getProducts, setSubmission } from '@cp-module/lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  deviceId: state?.auth?.userData?.deviceId,
  lang: state.auth.lang,
  getProductsResponse: state.lifesaver.getProductsResponse,
  lifesaverAction: state.lifesaver.action,
});

const mapDispatchToProps = {
  getProducts: () => getProducts(),
  setLoading: (payload) => setLoading(payload),
  setSubmission: (payload) => setSubmission(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
