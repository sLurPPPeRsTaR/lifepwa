import { setLang } from '@cp-module/auth/authAction';
import { connect } from 'react-redux';
import View from './View';
import { setCustomerCare } from '@cp-bootstrap/bootstrapAction';
import { getListRs, getListRsClear } from '@cp-module/lifesaver/lifesaverAction';

const mapStateToProps = (state) => ({
    lang: state.auth.lang,
    getListRsResponse: state.lifesaver.getListRsResponse,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  getListRs: (payload) => getListRs(payload),
  getListRsClear: () => getListRsClear(),
  setCustomerCare: (payload) => setCustomerCare(payload)
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
