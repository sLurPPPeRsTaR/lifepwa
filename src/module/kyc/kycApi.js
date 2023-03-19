import { encryptMpin } from '@cp-util/common';
import { api } from '@cp-bootstrap/bootstrapApi';
import { API } from '@cp-util/constant';
import FormData from 'form-data';

// H5 LIVENESS
export const setKycH5livenessTokenApi = (payload) => {
  return api.post(API.KYC.h5livenessToken, payload);
};
export const setKycH5livenessResultApi = (payload) => {
  return api.post(API.KYC.h5livenessResult, payload);
};

// SELFIE
export const setKycSelfieApi = (payload) => {
  return api.post(API.KYC.selfie, payload);
};

// export const setKycSelfieApi = (payload, onUploadProgress) => {
//   const sendData = new FormData();
//   sendData.append('fileName', payload?.name);
//   sendData.append('file', payload);
//   sendData.append('category', 'E_KYC_LIFE_PLUS');
//   return api.post(API.KYC.selfie, sendData, {
//     onUploadProgress,
//     ...{
//       headers: {
//         Authorization: `Bearer ${payload?.token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//       transformRequest: (data) => data,
//     },
//   });
// };

// ID CARD
export const setKycIdCardApi = (payload, onUploadProgress) => {
  const sendData = new FormData();
  sendData.append('fileName', payload.type || payload.name);
  sendData.append('file', payload);
  sendData.append('category', 'E_KYC_LIFE_PLUS');
  return api.post(API.KYC.idCard, sendData, {
    onUploadProgress,
    ...{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
    },
  });
};

// VERIFY ID CARD
export const setKycVerifyIdCardApi = (payload) => {
  return api.put(API.KYC.verifyIdCard, payload);
};

// PIN
export const setKycPinApi = (payload) => {
  const resultEncrypt = encryptMpin(payload?.pin, payload?.pin, 'CREATE_PIN');
  return api.post(API.PIN.pin, resultEncrypt);
};


// SET LIVENESS LICENSE
export const setLivenessLicenseApi = () => {
  return api.post(
    API.KYC.livenessLicense,
    {},
    {
      headers: {
        'X-ADVAI-KEY': 'c43b4a475f8bf379',
      },
    },
  );
};

// GET LIVENESS RESULT
export const setLivenessResultApi = (payload) => {
  return api.post(API.KYC.livenessResult, payload, {
    headers: {
      'X-ADVAI-KEY': 'c43b4a475f8bf379',
    },
  });
};

// VERIFY DUKCAPIL
export const setKycVerifyDukcapilApi = (payload) => {
  return api.post(API.KYC.verifyDukcapil, payload);
};

// FACECOMPARE
export const setKycFaceCompareApi = (payload, onUploadProgress) => {
  const sendData = new FormData();
  sendData.append('fileName', payload?.name);
  sendData.append('file', payload);
  sendData.append('category', 'E_KYC_LIFE_PLUS');
  return api.post(API.KYC.faceCompare, sendData, {
    onUploadProgress,
    ...{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
    },
  });
};

// RATING
export const setKycRatingApi = (payload) => {
  return api.post(API.USER.rating, payload);
};

// ADD POSTALCODE FOR ID CARD
export const setAddPostalCodeKycIdCardApi = (payload) => {
  return api.put(API.KYC.idCard, payload);
};

// REFACECOMPARE
export const setKycReFaceCompareApi = () => {
  return api.post(`${API.KYC.faceCompare}/retry`);
};

