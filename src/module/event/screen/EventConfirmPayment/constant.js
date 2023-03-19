import { formatCurrency } from '@cp-util/numbro';
import moment from 'moment';
import { trans } from '@cp-util/trans';
import locale from './locale';
import _ from 'lodash';
export const eventData = (data, dataEvent, lang) => {
  const totalPrice = `Rp${formatCurrency({
    value: data?.event?.price || 0,
    mantissa: 0,
  })},-`;
  const isSameDay = moment(data?.event?.startDateTime).isSame(
    data?.event?.endDateTime,
    'day',
  );
  return [
    {
      title: trans(locale, lang, 'hargaTiket'),
      data: data?.event?.price > 0 ? totalPrice : trans(locale, lang, 'free'),
    },
    {
      title: trans(locale, lang, 'tanggalEvent'),
      data: isSameDay
        ? moment(data?.event?.startDateTime).format('DD MMM YYYY')
        : `${moment(data?.event?.startDateTime).format('DD')}-${moment(
            data?.event?.endDateTime,
          ).format('DD MMMM YYYY')}`,
    },
    {
      title: trans(locale, lang, 'waktuEvent'),
      data: `${moment(data?.event?.startDateTime).format('HH.mm')} - ${moment(
        data?.event?.endDateTime,
      ).format('HH.mm')} WIB`,
    },
    {
      title: trans(locale, lang, 'lokasiEvent'),
      data: dataEvent?.location?.name,
    },
    {
      title: '',
      data: dataEvent?.location?.city,
    },
  ];
};

export const productData = (data, lang) => {
  const totalProductPrice = !_.isEmpty(data?.product)
    ? data?.product?.productPrice - data?.product?.productDiscount
    : 0;

  const totalPrice = `Rp${formatCurrency({
    value: !_.isEmpty(data?.product) ? data?.product?.productPrice : 0,
    mantissa: 0,
  })},-`;
  const finalPrice = `Rp${formatCurrency({
    value: totalProductPrice || 0,
    mantissa: 0,
  })},-`;
  const firstType = `${moment(data?.product?.nextBillingDate)
    .subtract(1, 'month')
    .format('DD MMM YYYY')} - ${moment(data?.product?.nextBillingDate).format(
    'DD MMM YYYY',
  )}`;
  const thirdType = `${moment(data?.product?.nextBillingDate)
    .subtract(1, 'months')
    .format('DD MMM YYYY')} - ${moment(data?.product?.nextBillingDate).format(
    'DD MMM YYYY',
  )}`;
  return [
    {
      primary: '*',
      title: 'product',
      data: `Rp${formatCurrency({
        value: !_.isEmpty(data?.product) ? data?.product?.productPrice : 0,
        mantissa: 0,
      })},-`,
      finalPrice: finalPrice,
    },
    {
      primary: '**',
      title: trans(locale, lang, 'durasiProteksi'),
      data: data?.policy?.orderType === 1 ? firstType : thirdType,
    },
    {
      title: trans(locale, lang, 'jatuhTempoBerikutnya'),
      data:
        data?.policy?.orderType === 1
          ? moment(data?.product?.nextBillingDate)
              .subtract(1, 'month')
              .add(1, 'month')
              .add(7, 'hour')
              .format('DD MMM YYYY')
          : moment(data?.product?.nextBillingDate).format('DD MMM YYYY'),
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

export const totalSummaryData = (data, lang, dataVoucher) => {
  const eventPrice = data?.event?.price || 0;
  const productPrice = data?.product?.productPrice || 0;
  const discountEventPrice = data?.event?.discountTicket || 0;
  const productDiscount = data?.product?.productDiscount || 0;
  const dataVoucherNominal = dataVoucher?.discount || 0;
  return [
    {
      key: 'header',
      title: trans(locale, lang, 'ringkasanPembayaran'),
      data: '',
    },
    {
      title: `${trans(locale, lang, 'tiket')}  ${data?.event?.name}`,
      data: `Rp${formatCurrency({
        value: eventPrice,
        mantissa: 0,
      })},-`,
    },
    {
      key: 'product ',
      title:
        productPrice === 0 || data?.policy?.orderType === 2
          ? ''
          : trans(
              locale,
              lang,
              data?.policy?.gracePeriod
                ? 'perpanjangan'
                : data?.product?.productName || data?.product?.planName,
            ),
      title2: data?.policy?.gracePeriod
        ? data?.product?.productName || data?.product?.planName
        : '',

      data:
        data?.policy?.orderType === 2 || productPrice === 0
          ? ''
          : `Rp${formatCurrency({
              value: productPrice,
              mantissa: 0,
            })},-`,
    },
    {
      title:
        discountEventPrice === 0 ? '' : `${trans(locale, lang, 'diskonTiket')}`,
      type: ' discount ',
      data:
        discountEventPrice === 0
          ? ''
          : `-Rp${formatCurrency({
              value: discountEventPrice,
              mantissa: 0,
            })},-`,
    },
    {
      title:
        productDiscount === 0
          ? ''
          : `${trans(locale, lang, 'diskon')} ${
              data?.product?.productName || data?.product?.planName
            } `,
      type: ' diskonProduc ',
      data:
        productDiscount === 0
          ? ''
          : `-Rp${formatCurrency({
              value: productDiscount,
              mantissa: 0,
            })},-`,
    },
    {
      title:
        dataVoucherNominal === 0
          ? ''
          : `${trans(locale, lang, 'diskonVoucher')}`,
      type: 'discountVoucher',
      data:
        dataVoucherNominal === 0
          ? ''
          : `-Rp${formatCurrency({
              value: dataVoucherNominal,
              mantissa: 0,
            })},-`,
    },
    // {
    //   key: 'info',
    //   title: `${trans(
    //     locale,
    //     lang,
    //     data?.policy?.orderType === 2 ? 'discountLS' : 'discountHasntLS'
    //   )}`,
    //   // type: 'discount',
    //   // data: `-Rp${formatCurrency({
    //   //   value: discountEventPrice,
    //   //   mantissa: 0,
    //   // })},-`,
    // },
  ].filter((value) => {
    if (data?.policy?.orderType === 2) {
      return value?.key !== 'product';
    }
    return value;
  });
};

export const infoData = (data, lang) => {
  const productPrice = data?.product?.productPrice;
  const infoFirstType = [
    {
      content: trans(locale, lang, 'periodeProteksi'),
    },
  ];
  const infoThirdType = [
    {
      content: trans(locale, lang, 'pastikanUntuk'),
    },
    {
      content: trans(locale, lang, 'apabilaKamu'),
    },
  ];
  return [
    {
      primary: '*',
      show:
        (data?.policy?.orderType === 1 && data?.product?.hasPolicy) ||
        data?.policy?.orderType === 3,
      title: trans(locale, lang, 'informasiPolis'),
      details: [
        {
          content: `${trans(locale, lang, 'kamuAkan')} Rp${formatCurrency({
            value: productPrice,
            mantissa: 0,
          })},- ${trans(locale, lang, 'perpanjanganPolis')}`,
        },
        {
          content: trans(locale, lang, 'proteksiMedis'),
        },
        {
          content: trans(locale, lang, 'proteksiMedisCedera'),
        },
      ],
    },
    {
      primary: '**',
      show:
        (data?.policy?.orderType === 1 && data?.product?.hasPolicy) ||
        data?.policy?.orderType === 3,
      title: trans(
        locale,
        lang,
        data?.policy?.orderType === 1 ? 'infoPeriode' : 'infoPerpanjangan',
      ),
      details: data?.policy?.orderType === 1 ? infoFirstType : infoThirdType,
    },
  ];
};
