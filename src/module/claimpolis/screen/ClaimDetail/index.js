import { setLoading } from '@cp-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import View from './View';
const mapStateToProps = (state) => ({
  lang: state.auth.lang,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
