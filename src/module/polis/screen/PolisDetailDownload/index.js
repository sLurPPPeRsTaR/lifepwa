import { setLoading, setToastMsg } from '@cp-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import View from './View';
import { getPolicyDownload } from '@cp-module/polis/polisAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  polisAction: state.polis.action,
  getPolicyDownloadResponse: state.polis.getPolicyDownloadResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPolicyDownload: (payload) => getPolicyDownload(payload),
  setToastMsg: (payload) => setToastMsg(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
