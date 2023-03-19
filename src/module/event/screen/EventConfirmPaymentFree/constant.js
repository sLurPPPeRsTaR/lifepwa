import { formatCurrency } from '@cp-util/numbro';
import moment from 'moment';
import { trans } from '@cp-util/trans';
import locale from './locale';

export const productData = (data, lang) => {
  console.log(data)
  const productPrice = `Rp${formatCurrency({
    value: Number(data?.price) || 0,
    mantissa: 0,
  })},-`;
  return [
    {
      title: 'product',
      data: `${productPrice}/${trans(locale, lang, 'bulan')}`,
    },
    {
      title: trans(locale, lang, 'durasiProteksi'),
      data: trans(locale, lang, 'durasiProteksiValue'),
    },
    {
      title: trans(locale, lang, 'jatuhTempoBerikutnya'),
      data: moment().add(1, 'month').format('DD MMM YYYY'),
    },
  ];
};

export const userInfoData = (data, lang) => [
  {
    title: trans(locale, lang, 'nik'),
    data: data?.idCardNo,
  },
  {
    title: trans(locale, lang, 'tglLahir'),
    data: moment(data?.dob, 'DD-MM-YYYY').format('DD MMM YYYY'),
  },
];

export const totalHarga = (data, lang) => {
  return[
    {
      title: trans(locale, lang, "gratisProduk"),
      value: `Rp.${data?.price}`
    },
    {
      title: trans(locale, lang, "potonganHarga"),
      value: `-Rp.${data?.discount}`
    }
  ]
}
