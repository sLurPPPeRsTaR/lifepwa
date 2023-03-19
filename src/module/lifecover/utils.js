import { setRupiah } from '@cp-util/common';

export const formatRupiah = ({ total, lang = 'id' }) => {
  const floatNumber = Number(parseFloat(total).toFixed(2));
  return setRupiah(floatNumber, lang);
};

export const UW = 'UW';
export const FRAUD_DETECTED = 'FRAUD_DETECTED';
export const FRAUD = 'FRAUD';
export const DRAFT = 'DRAFT';
export const SUBMIT = 'SUBMIT';
export const PAID = 'PAID';
