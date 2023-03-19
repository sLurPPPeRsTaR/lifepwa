import { setLang } from '@cp-module/auth/authAction';
import { connect } from 'react-redux';
import View from './View';
import { getListRs, getListRsClear } from '@cp-module/lifesaver/lifesaverAction';

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    getListRsResponse: state.lifesaver.getListRsResponse,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  getListRs: (payload) => getListRs(payload),
  getListRsClear: () => getListRsClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
