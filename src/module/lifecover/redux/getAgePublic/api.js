import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';
import { addQueryStringUrl } from '@cp-util/addQueryStringUrl';

export const getAgePublicApi = (payload) => {
  return api.get(
    addQueryStringUrl(API.LIFECOVER.getAgePublic, { dob: payload }),
  );
};
