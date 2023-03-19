import { setLoading, setToastMsg } from '@cp-bootstrap/bootstrapAction';
import {
  setClearKkpm,
  setKkpmDataKk,
  setKkpmTemp,
} from '@cp-module/persist/persistAction';
import { getUpdataValidationCheck } from '@cp-module/updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  updataAction: state.updata.action,
  kkpmTempState: state.persist.kkpmTempState,
  getUpdataValidationCheckFailed: state.updata.getUpdataValidationCheckFailed,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setToastMsg: (payload) => setToastMsg(payload),
  setKkpmTemp: (payload) => setKkpmTemp(payload),
  setKkpmDataKk: (payload) => setKkpmDataKk(payload),
  getUpdataValidationCheck: (payload) => getUpdataValidationCheck(payload),
  setClearKkpm: () => setClearKkpm(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
