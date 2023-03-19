import { setLoading, setToastMsg } from '@cp-bootstrap/bootstrapAction';
import {
  setClearKkpm,
  setKkpmDataKk,
  setKkpmTemp,
  setUpdataTempState,
} from '@cp-module/persist/persistAction';
import {
  getUpdataLastKKInfo,
  getUpdataLastKKInfoClear,
  getUpdataLastKTPInfo,
  getUpdataLastKTPInfoClear,
  setUpdataCheckKKKTP,
  setUpdataCheckKKKTPClear,
} from '@cp-module/updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  isKKSame: state.persist.isKKSame,
  kkpmTempState: state.persist.kkpmTempState,
  updataAction: state.updata.action,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
  getUpdataLastKKInfoResponse: state.updata.getUpdataLastKKInfoResponse,
  getUpdataLastKTPInfoFailed: state.updata.getUpdataLastKTPInfoFailed,
  getUpdataLastKKInfoFailed: state.updata.getUpdataLastKKInfoFailed,
  setUpdataKTPResponse: state.updata.setUpdataKTPResponse,
  setUpdataKKResponse: state.updata.setUpdataKKResponse,
  setUpdataCheckKKKTPResponse: state.updata.setUpdataCheckKKKTPResponse,
  setUpdataCheckKKKTPFailed: state.updata.setUpdataCheckKKKTPFailed,
  kkpmDataKkState: state.persist.kkpmDataKkState,
});

const mapDispatchToProps = {
  getUpdataLastKTPInfo: (payload) => getUpdataLastKTPInfo(payload),
  getUpdataLastKTPInfoClear: (payload) => getUpdataLastKTPInfoClear(payload),
  getUpdataLastKKInfo: (payload) => getUpdataLastKKInfo(payload),
  getUpdataLastKKInfoClear: (payload) => getUpdataLastKKInfoClear(payload),
  setUpdataCheckKKKTP: (payload) => setUpdataCheckKKKTP(payload),
  setUpdataCheckKKKTPClear: (payload) => setUpdataCheckKKKTPClear(payload),
  setLoading: (payload) => setLoading(payload),
  setToastMsg: (payload) => setToastMsg(payload),
  setUpdataTempState: (payload) => setUpdataTempState(payload),
  setKkpmTemp: (payload) => setKkpmTemp(payload),
  setKkpmDataKk: (payload) => setKkpmDataKk(payload),
  setClearKkpm: (payload) => setClearKkpm(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
