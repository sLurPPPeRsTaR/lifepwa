/**
 * Add an object to url.
 * @param url { string }
 * @param objectParams { string }
 */

export const addQueryStringUrl = (url, objectParams) => {
  return (
    url +
    '?' +
    Object.keys(objectParams)
      .map((key) => key + '=' + objectParams[key])
      .join('&')
  );
};
