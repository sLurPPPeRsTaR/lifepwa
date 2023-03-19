import View from './View';
import { connect } from 'react-redux';
import {
  getDocumentMandatory,
  getDocumentMandatoryClear,
  setSubmitDocument,
  setSubmitDocumentClear,
  setUploadDoc,
  setUploadDocClear,
  setUploadDocument,
  setUploadDocumentClear,
} from '@cp-module/claimpolis/claimpolisAction';
import {
  setIsComingFromScreen,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  claimAction: state.claimpolis.action,
  documentUpload: state.claimpolis.documentUpload,
  setUploadDocumentFailed: state.claimpolis.setUploadDocumentFailed,
  userData: state.auth.userData,
  setSubmitDocumentFailed: state.claimpolis.setSubmitDocumentFailed,
  payloadClaimPolis: state.claimpolis.payload,
  getDocumentMandatoryResponse: state.claimpolis.getDocumentMandatoryResponse,
  getDocumentMandatoryFailed: state.claimpolis.getDocumentMandatoryFailed,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setUploadDoc: (payload) => setUploadDoc(payload),
  setUploadDocument: (payload) => setUploadDocument(payload),
  setSubmitDocument: (payload) => setSubmitDocument(payload),
  setUploadDocumentClear: () => setUploadDocumentClear(),
  setUploadDocClear: () => setUploadDocClear(),
  setSubmitDocumentClear: () => setSubmitDocumentClear(),
  getDocumentMandatory: (payload) => getDocumentMandatory(payload),
  getDocumentMandatoryClear: () => getDocumentMandatoryClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
