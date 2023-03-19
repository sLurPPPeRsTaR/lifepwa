import { connect } from 'react-redux';
import { setUpdataSelfie } from '@cp-module/updata/updataAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
});

const mapDispatchToProps = {
  setUpdataSelfie: (payload) => setKycSelfie(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
