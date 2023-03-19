import View from './View';
import { connect } from 'react-redux';
import {
  getBeneficiary,
  addBeneficiary,
  getBeneficiaryClear,
} from '@cp-module/lifecover/lifecoverAction';
import {
  setLoading,
  setInternalServerError,
} from '@cp-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  lifecoverState: state.lifecover,
  lifeCoverAction: state.lifecover.action,
});

const mapDispatchToProps = {
  getBeneficiary: (payload) => getBeneficiary(payload),
  addBeneficiary: (payload) => addBeneficiary(payload),
  setLoading: (payload) => setLoading(payload),
  setInternalServerError: (payload) => setInternalServerError(payload),
  getBeneficiaryClear: (payload) => getBeneficiaryClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
