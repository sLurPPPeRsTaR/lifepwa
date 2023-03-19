import { setOtherInformation } from '@cp-module/persist/persistAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  otherInformation: state.persist.otherInformation,
  getUpdataLastOtherInfoResponse: state.updata.getUpdataLastOtherInfoResponse,
  updataTempState: state.persist.tempState,
  isKTPSame: state.persist.isKTPSame,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
});

const mapDispatchToProps = {
  setOtherInformation: (payload) => setOtherInformation(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
