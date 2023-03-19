import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';

export const getQuestionApi = (payload) => {
  return api.post(API.LIFECOVER.getQuestions, payload);
};
