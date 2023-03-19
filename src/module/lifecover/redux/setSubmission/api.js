import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const setSubmissionApi = (payload) => {
  return api.post(API.LIFECOVER.setSubmission, payload);
};
