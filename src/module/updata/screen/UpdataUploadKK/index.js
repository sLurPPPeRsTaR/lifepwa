import { connect } from 'react-redux';
import { setUpdataKK, setUpdataKKClear } from '@cp-module/updata/updataAction';
import {
  setLoading,
  setInternalServerError,
} from '@cp-bootstrap/bootstrapAction';
import View from './View';
import {
  setClearKkpm,
  setIsKKSame,
  setKkpmDataKk,
  setKkpmTemp,
} from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  kkpmTempState: state.persist.kkpmTempState,
  updataAction: state.updata.action,
  setUpdataKKResponse: state.updata.setUpdataKKResponse,
  setUpdataKKFailed: state.updata.setUpdataKKFailed,
  kkpmDataKkState: state.updata.kkpmDataKkState,
});

const mapDispatchToProps = {
  setUpdataKK: (payload) => setUpdataKK(payload),
  setUpdataKKClear: (payload) => setUpdataKKClear(payload),
  setLoading: (payload) => setLoading(payload),
  setIsKKSame: (payload) => setIsKKSame(payload),
  setKkpmTemp: (payload) => setKkpmTemp(payload),
  setKkpmDataKk: (payload) => setKkpmDataKk(payload),
  setClearKkpm: () => setClearKkpm(),
  setInternalServerError: (payload) => setInternalServerError(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
