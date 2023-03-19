import moment from 'moment';
import 'moment/locale/id';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'react-icons-kit';
import { Button } from '@cp-component';
import { trans } from '@cp-util/trans';
import { ic_west } from 'react-icons-kit/md';
import { chevronCircleDown } from 'react-icons-kit/fa';
import {
  DefaultBackground,
  LifeTagDummy,
  LifetagLogo,
} from '@cp-config/Images';
import { NAVIGATION } from '@cp-util/constant';
import { setRupiah, setRupiahEn } from '@cp-util/common';
import locale from './locale';
import {
  GET_LIFETAG_DETAIL_ORDER,
  GET_LIFETAG_DETAIL_ORDER_FAILED,
  GET_LIFETAG_DETAIL_ORDER_SUCCESS,
} from '@cp-module/lifetag/lifetagConstant';

export default function View(props) {
  const {
    lang,
    userData,
    setLoading,
    lifetagAction,
    setCustomerCare,
    getLifetagDetailOrderResponse,
    getLifetagDetailOrder,
    setIsComingFromScreen,
    isComingFromScreen,
  } = props;

  const router = useRouter();
  const { orderId } = router;
  const [isActiveBtn, setActiveBtn] = useState(true);

  const translate = (val) => trans(locale, lang, val);

  useEffect(() => {
    getLifetagDetailOrder(router?.query?.orderId);
  }, [router?.query?.orderId]);

  // useEffect(() => {
  //   if (isComingFromScreen?.fromDetailOrder) {
  //     setIsComingFromScreen({ fromDetailOrder: false });
  //   }
  // }, []);

  const resultLifetagAction = useCallback(
    (act) => {
      if (act === GET_LIFETAG_DETAIL_ORDER) {
        setLoading(true);
      }
      if (act === GET_LIFETAG_DETAIL_ORDER_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_LIFETAG_DETAIL_ORDER_FAILED) {
        setLoading(false);
      }
    },
    [setLoading],
  );

  useEffect(() => {
    moment.locale(lang);
  }, [lang]);

  useEffect(() => {
    resultLifetagAction(lifetagAction);
  }, [lifetagAction, resultLifetagAction]);

  useEffect(() => {
    if (getLifetagDetailOrderResponse?.data?.status !== 'ON_PROCESS') {
      setActiveBtn(false);
    }
  }, [getLifetagDetailOrderResponse]);

  const statusOrder = useMemo(() => {
    return getLifetagDetailOrderResponse?.data?.status;
  }, [getLifetagDetailOrderResponse?.data]);

  const renderHeader = () => {
    return (
      <div className="relative z-10 w-full flex justify-between items-center shadow-sm bg-white h-16 px-5 lg:h-20 lg:px-[5%]">
        <div className="w-5" role="button">
          <Icon
            icon={ic_west}
            size={20}
            onClick={() => {
              if (router?.query?.fromNotification) {
                router.push(
                  {
                    pathname: NAVIGATION.NOTIFICATION.NotificationMain,
                    query: { activeTab: 'transaksi' },
                  },
                  NAVIGATION.NOTIFICATION.NotificationMain,
                );
              } else {
                router.back();
              }
            }}
            className="cursor-pointer"
          />
        </div>
        <p className="font-bold text-sm md:text-lg">{translate('mainTitle')}</p>
        <div className="w-5"></div>
      </div>
    );
  };

  const renderStatus = () => {
    return (
      <div className="pb-5">
        <div
          className={`flex items-center justify-center border rounded-2xl py-1 sm:py-2
          ${
            statusOrder == 'ON_PROCESS'
              ? 'text-yellow-500 border-yellow-500'
              : ''
          }
          ${
            statusOrder == 'ON_DELIVERY' ? 'text-blue-500 border-blue-500' : ''
          }`}>
          <Icon icon={chevronCircleDown} size={20} className="mr-3 leading-3" />
          <p className="leading-none text-sm md:text-base">
            {translate(statusOrder)}
          </p>
        </div>
      </div>
    );
  };

  const renderProduct = () => {
    return (
      <div className="border rounded-2xl shadow-sm px-2 py-3 sm:p-4">
        {getLifetagDetailOrderResponse?.data?.product?.map((item, idx) => (
          <div idx={idx} className="mb-8">
            <div className="flex items-start justify-between pb-4">
              <div className="flex h-full items-start">
                <img
                  src={
                    item?.productColour?.image
                      ? item?.productColour?.image
                      : LifeTagDummy
                  }
                  className="h-16 md:h-20"
                />
                <div className="font-bold pl-3">
                  <p className="pb-1 text-sm sm:text-base md:text-lg">
                    {item?.productName}
                  </p>
                  {item?.productDiscount && (
                    <p className="pb-1 text-gray-400 line-through text-[11px] md:text-xs">
                      {lang == 'id'
                        ? setRupiah(item?.productPrice * item?.productQuantity)
                        : setRupiahEn(
                            item?.productPrice * item?.productQuantity,
                          )}
                    </p>
                  )}
                  <p className="text-red-500 text-sm md:text-lg">
                    {lang == 'id'
                      ? setRupiah(
                          item?.productPrice * item?.productQuantity -
                            (item?.productDiscount || 0),
                        )
                      : setRupiahEn(
                          item?.productPrice * item?.productQuantity -
                            (item?.productDiscount || 0),
                        )}
                  </p>
                </div>
              </div>
              <div className="py-2">
                <img src={LifetagLogo} />
              </div>
            </div>
            <div className="w-full text-xs">
              <div className="flex justify-between mb-2">
                <p>{trans(locale, lang, 'kuantitas')}</p>
                <p>
                  {item?.productQuantity ? `x${item?.productQuantity}` : '-'}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p>{trans(locale, lang, 'warna')}</p>
                <p>
                  {item?.productColour?.name
                    ? trans(locale, lang, item.productColour.name.toLowerCase())
                    : '-'}
                </p>
              </div>
            </div>
          </div>
        ))}
        <Button
          full
          // disabled={isActiveBtn}
          className="text-sm h-10 sm:!h-11"
          type="linear-gradient"
          onButtonClick={() => {
            router.push(NAVIGATION.LIFETAG.LifetagDetailProduct);
            setIsComingFromScreen({
              fromDetailOrder: true,
              orderId: router?.query?.orderId,
            });
          }}>
          {translate('beliLagi')}
        </Button>
      </div>
    );
  };

  const renderDetailOrder = () => {
    return (
      <div className="py-5 px-1">
        <div className="flex justify-between items-center text-[11px] xm:text-sm">
          <p>{translate('noPesanan')}</p>
          <p className="font-bold opacity-75">
            {getLifetagDetailOrderResponse?.data?.orderNumber}
          </p>
        </div>
        <div className="flex mt-2 justify-between items-center text-[11px] xm:text-sm">
          <p>{translate('noResi')}</p>
          <p className="font-bold opacity-75">
            {getLifetagDetailOrderResponse?.data?.trackingNumber !== null
              ? getLifetagDetailOrderResponse?.data?.trackingNumber
              : '-'}
          </p>
        </div>
        <div className="flex mt-2 justify-between items-center text-[11px] xm:text-sm">
          <p>{translate('kurir')}</p>
          <p className="font-bold opacity-75">
            {getLifetagDetailOrderResponse?.data?.courierProvider !== null
              ? getLifetagDetailOrderResponse?.data?.courierProvider
              : '-'}
          </p>
        </div>
        <div className="flex mt-2 justify-between items-center text-[11px] xm:text-sm">
          <p>{trans(locale, lang, 'tanggalPesan')}</p>
          <p className="font-bold opacity-75">
            {moment(getLifetagDetailOrderResponse?.data?.orderDate).format(
              'LL',
            )}
          </p>
        </div>
      </div>
    );
  };

  const renderDataPenerima = () => {
    const data = getLifetagDetailOrderResponse?.data;
    const address = getLifetagDetailOrderResponse?.data?.address;
    const jalan = address?.street || '',
      rt = address?.rt || '',
      rw = address?.rw || '',
      desa = address?.subDistrict,
      kecamatan = address?.district,
      kota = address?.city || 0,
      provinsi = address?.province,
      kodePos = address?.postcode;

    const stringAddress = `${jalan}, ${
      rt && rw ? `RT${rt}/RW${rw}` : ''
    }, ${desa}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
      .replace(/ ,/g, '')
      .trim()
      .replace(/^, /g, '')
      .trim()
      .replace(/,$/g, '');

    return (
      <div className="py-5 border-t">
        <p className="pl-1 text-xs font-bold pb-3 xm:text-sm capitalize">
          {translate('dataPenerima')}
        </p>
        <div className="border p-4 rounded-2xl shadow-sm">
          <p className="border-b text-xs font-bold pb-3 sm:text-sm capitalize">
            {data?.address?.title || data?.name}
          </p>
          <div className="flex pt-2 justify-between">
            <p className="text-xs pb-2 xm:text-sm">{data?.name}</p>
            <p className="font-bold text-xs">{data?.phoneNumber}</p>
          </div>
          <div className="pt-1">
            <p className="text-sm pb-2 hidden md:block">{stringAddress}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderCustomerCare = () => {
    return (
      <div className="relative z-10 px-2 mb-8">
        <div className="p-2 mx-auto bg-neutral-200 text-center w-full max-w-2xl rounded-3xl text-[11px] sm:text-xs">
          <p className="text-gray-700 pb-1">{translate('butuhBantuan')}</p>
          <div
            role="button"
            onClick={() => setCustomerCare(true)}
            className="font-bold text-red-500 underline hover:no-underline">
            Customer Care
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      <img
        src={DefaultBackground}
        className="absolute z-0 top-0 left-0 w-full hidden md:block"
      />
      {renderHeader()}
      <div className="relative z-10 flex items-center justify-center w-full h-full md:pt-10 md:pb-5 ">
        <div className="w-full max-w-2xl bg-white rounded-xl md:border md:shadow-sm p-3 sm:p-5">
          {renderStatus()}
          {renderProduct()}
          {renderDetailOrder()}
          {renderDataPenerima()}
        </div>
      </div>
      {renderCustomerCare()}
    </div>
  );
}
