import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const updateSubmissionApi = (payload) => {
  return api.put(API.LIFECOVER.setSubmission, payload);
};
