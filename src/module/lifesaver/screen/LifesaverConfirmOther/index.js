import View from './View';
import { connect } from 'react-redux';
import {
  setInternalServerError,
  setLoading,
} from '@cp-bootstrap/bootstrapAction';
import { setInvoiceId } from '@cp-module/auth/authAction';
import {
  getPendingInvites,
  getProduct,
  getProductClear,
  getProductLifetag,
  setSubmission,
  setWaiting,
  setSubmissionClear,
  setSubmissionForOther,
  setSubmissionForOtherClear,
  getIDCardDataOCR,
  getIDCardDataOCRClear,
} from '@cp-module/lifesaver/lifesaverAction';
import {
  getPaymentHistory,
  getPaymentMethod,
  getPaymentMethodClear,
  getPaymentStatus,
  getCheckPaymentParam,
  setCreateBill,
  setCreateBillClear,
} from '@cp-module/payments/paymentsAction';
import {
  getAddressList,
  getAddressListClear,
} from '@cp-module/profile/profileAction';
import {
  setBuyForOthersState,
  setBuyForOthersStateClear,
} from '@cp-module/persist/persistAction';

const mapStateToProps = (state) => ({
  deviceId: state?.auth?.userData?.deviceId,
  getPaymentMethodResponse: state.payments.getPaymentMethodResponse,
  getPaymentMethodError: state.payments.getPaymentMethodError,
  getPaymentStatusResponse: state.payments.getPaymentStatusResponse,
  getProductResponse: state.lifesaver.getProductResponse,
  lang: state.auth.lang,
  paymentsAction: state.payments.action,
  setCreateBillParam: state.payments.setCreateBillParam,
  setCreateBillError: state.payments.setCreateBillError,
  setCreateBillResponse: state.payments.setCreateBillResponse,
  userData: state.auth.userData,
  lifesaverAction: state.lifesaver.action,
  setSubmissionResponse: state.lifesaver.setSubmissionResponse,
  setSubmissionError: state.lifesaver.setSubmissionError,
  getPendingInvitesResponse: state.lifesaver.getPendingInvitesResponse,
  setWaitingError: state.lifesaver.setWaitingError,
  setWaitingResponse: state.lifesaver.setWaitingResponse,
  token: state.auth.token.access_token,
  eventCode: state.bootstrap.eventCode,
  getEventDetailResponse: state.event.getEventDetailResponse,
  getProductLifetagResponse: state.lifesaver.getProductLifetagResponse,
  getAddressListFailed: state.profile.getAddressListFailed,
  getAddressListResponse: state.profile.getAddressListResponse,
  setSubmissionForOtherResponse: state.lifesaver.setSubmissionForOtherResponse,
  setSubmissionForOtherError: state.lifesaver.setSubmissionForOtherError,
  buyForOthersFormState: state.persist.buyForOthersFormState,
  getIDCardDataOCRResponse: state.lifesaver.getIDCardDataOCRResponse,
});

const mapDispatchToProps = {
  setCreateBill: (payload) => setCreateBill(payload),
  setCreateBillClear: () => setCreateBillClear(),
  setLoading: (payload) => setLoading(payload),
  getPaymentMethod: (payload) => getPaymentMethod(payload),
  getPaymentMethodClear: () => getPaymentMethodClear(),
  getPaymentStatus: (payload) => getPaymentStatus(payload),
  getProduct: (payload) => getProduct(payload),
  getProductClear: () => getProductClear(),
  setInvoiceId: (payload) => setInvoiceId(payload),
  getPendingInvites: (payload) => getPendingInvites(payload),
  getPaymentHistory: (payload) => getPaymentHistory(payload),
  setSubmission: (payload) => setSubmission(payload),
  setSubmissionClear: () => setSubmissionClear(),
  setWaiting: (payload) => setWaiting(payload),
  getCheckPaymentParam: (payload) => getCheckPaymentParam(payload),
  setInternalServerError: (payload) => setInternalServerError(payload),
  getProductLifetag: (payload) => getProductLifetag(payload),
  getAddressList: () => getAddressList(),
  getAddressListClear: () => getAddressListClear(),
  setSubmissionForOther: (payload) => setSubmissionForOther(payload),
  setSubmissionForOtherClear: () => setSubmissionForOtherClear(),
  setBuyForOthersState: (payload) => setBuyForOthersState(payload),
  setBuyForOthersStateClear: () => setBuyForOthersStateClear(),
  getIDCardDataOCR: (payload) => getIDCardDataOCR(payload),
  getIDCardDataOCRClear: (payload) => getIDCardDataOCRClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
