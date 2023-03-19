import _ from 'lodash';
import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { trans } from '@cp-util/trans';
import { generateAddress, setRupiah, setRupiahEn } from '@cp-util/common';
import { ic_west, ic_location_on } from 'react-icons-kit/md';
import { Input, Button, Alert, Modal } from '@cp-component';
import {
  LifeTagIcon,
  VectorBackground,
  LifeTagGray,
  LifetagLogoWhite,
} from '@cp-config/Images';
import { DEVICE_PLATFORM, LIFETAG_ID, NAVIGATION } from '@cp-util/constant';
import { ProfileAddressForm } from '@cp-module/profile/screen';
import locale from './locale';
import {
  GET_LIFETAG_PRODUCT_DETAIL_FAILED,
  GET_LIFETAG_PRODUCT_DETAIL_SUCCESS,
  SET_LIFETAG_CREATE_ORDER_FAILED,
  SET_LIFETAG_CREATE_ORDER_SUCCESS,
} from '@cp-module/lifetag/lifetagConstant';
import { plus, androidArrowBack } from 'react-icons-kit/ionicons';
import LifetagConfirmAddress from '../LifetagConfirmAddress';
import {
  GET_ADDRESS_LIST_FAILED,
  GET_ADDRESS_LIST_SUCCESS,
} from '@cp-module/profile/profileConstant';

export default function View(props) {
  const {
    lang,
    userData,
    setLoading,
    lifetagAction,
    profileAction,
    getLifetagProductDetail,
    getLifetagProductDetailFailed,
    setLifetagCreateOrderResponse,
    setLifetagCreateOrder,
    setLifetagCreateOrderFailed,
    setLifetagOrderNoResponse,
    lifetagTempOrderState,
    setLifetagTempOrderState,
    getAddressList,
    getAddressListClear,
    getAddressListFailed,
    getAddressListResponse,
    isComingFromScreen,
    setIsComingFromScreen,
    setLifetagOutOffStock,
  } = props;
  const router = useRouter();

  const [tempProduct, setTempProduct] = useState([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showListAddress, setShowListAddress] = useState(false);

  const [username, setUsername] = useState(userData?.name);
  const [phoneNumber, setPhoneNumber] = useState(userData?.mobilePhoneNumber);

  const [contact, setContact] = useState(null);
  const [addressSelected, setAddressSelected] = useState(null);
  const [warningAddAddress, setWarningAddAddress] = useState(false);

  const translate = (val) => trans(locale, lang, val);

  useEffect(() => {
    setLoading(true);
    getAddressList();
    getLifetagProductDetail({
      lang,
      id: LIFETAG_ID,
    });
    setTempProduct(lifetagTempOrderState);
  }, [lang, getAddressList, setLoading, getLifetagProductDetail]);

  // profile
  const profileResult = useCallback(
    (act) => {
      setLoading(false);
      if (act === GET_ADDRESS_LIST_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_ADDRESS_LIST_FAILED) {
        setLoading(false);
        if (getAddressListFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          // console.log('Warning', getAddressListFailed?.message);
        }
        getAddressListClear();
      }
    },
    [getAddressListClear, getAddressListFailed?.message, setLoading],
  );

  useEffect(() => {
    profileResult(profileAction);
  }, [profileAction, profileResult]);

  useEffect(() => {
    const havePostalCode = getAddressListResponse?.data?.eKYCAddress?.postcode;
    const eKYCAddress = getAddressListResponse?.data?.eKYCAddress;
    const address = isComingFromScreen?.addressSelected;
    const contact = isComingFromScreen?.contact;

    if (!_.isEmpty(address)) {
      setAddressSelected(address);
      setContact(contact);
    } else if (havePostalCode) {
      setAddressSelected(eKYCAddress);
      setContact({
        username,
        phoneNumber,
        title: translate('alamatSesuaiKtp'),
        stringAddress: generateAddress(eKYCAddress),
      });
    }
  }, [getAddressListResponse]);

  useEffect(() => {
    if (!_.isEmpty(isComingFromScreen?.addressSelected)) {
      setWarningAddAddress(false);
    }
  }, [isComingFromScreen?.addressSelected]);

  // lifetag
  const lifetagResultAction = useCallback(
    (act) => {
      setLoading(false);
      if (act === GET_LIFETAG_PRODUCT_DETAIL_SUCCESS) {
      }
      if (act === GET_LIFETAG_PRODUCT_DETAIL_FAILED) {
        if (
          getLifetagProductDetailFailed?.message !== 'INTERNAL_SERVER_ERROR'
        ) {
          console.log(getLifetagProductDetailFailed?.message);
        }
      }
      if (act === SET_LIFETAG_CREATE_ORDER_SUCCESS) {
        router.push(setLifetagCreateOrderResponse?.data?.payment?.redirectUrl);
        
        setIsComingFromScreen({
          lifetagPayment: {
            invoiceId: setLifetagCreateOrderResponse?.data?.invoiceId,
            orderId:setLifetagCreateOrderResponse?.data?.orderId,
          },
        });

        // setTimeout(() => {
        //   setLifetagTempOrderState([]);
        // }, 2000);
      }
      if (act === SET_LIFETAG_CREATE_ORDER_FAILED) {
        if (setLifetagCreateOrderFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setLifetagCreateOrderFailed?.message === 'OUT_OF_STOCK') {
            setLifetagOutOffStock(true);
          } else {
            console.log(setLifetagCreateOrderFailed?.message);
          }
        }
      }
    },
    [
      getLifetagProductDetailFailed?.message,
      setLifetagCreateOrderFailed?.message,
      setLifetagCreateOrderResponse?.data?.invoiceId,
      setLifetagCreateOrderResponse?.data?.payment?.eventCode,
      setLifetagCreateOrderResponse?.data?.payment?.redirectUrl,
      setLifetagCreateOrderResponse?.data?.payment?.reffNo,
      setLoading,
    ],
  );

  useEffect(() => {
    lifetagResultAction(lifetagAction);
  }, [lifetagAction, lifetagResultAction]);

  const paymentTotalDiscount = useMemo(() => {
    return tempProduct?.reduce((acc, i) => acc + i.totalDiscount, 0);
  }, [tempProduct]);

  const paymentTotalPrice = useMemo(() => {
    return tempProduct?.reduce((acc, i) => acc + i.totalPrice, 0);
  }, [tempProduct]);

  // render
  const renderHeader = () => {
    const onBackClick = () => {
      setLoading(true);
      router.push(
        {
          pathname: NAVIGATION.LIFETAG.LifetagDetailProduct,
          query: { fromOrder: true },
        },
        NAVIGATION.LIFETAG.LifetagDetailProduct,
      );
      setTempProduct([]);
      setLoading(false);
    };

    return (
      <>
        <div
          role="button"
          onClick={onBackClick}
          className="absolute items-center left-4 md:left-6 z-10 hidden lg:flex">
          <Icon icon={ic_west} size={22} className="w-5 md:w-6" />
        </div>

        <div className="relative w-full rounded-none md:rounded-t-3xl flex justify-center bg-[#D71920] pt-6 pb-16 md:pb-20">
          <div
            role="button"
            onClick={onBackClick}
            className="absolute flex items-center left-4 md:left-6 z-10 text-white lg:hidden">
            <Icon icon={ic_west} size={20} className="w-5 md:w-6" />
          </div>
          <div className="text-white font-bold text-sm md:text-base">
            {translate('title')}
          </div>
        </div>
      </>
    );
  };

  const renderLifetagDetail = () => {
    return (
      <div className="relative border-b-8 flex items-end -top-9 border-gray-100 md:-top-10">
        <div className="mb-4 px-3 md:px-10 w-full ">
          <div className="text-body2 flex justify justify-between p-5 bg-gradient-to-br from-[#FBB04C] via-[#F43036] to-[#ED1C24] rounded-t-2xl md:rounded-t-3xl">
            <img className="h-4 xm:h-6 md:h-8" src={LifetagLogoWhite} />
          </div>

          <div className="mb-5 rounded-b-2xl divide-y px-5 shadow md:rounded-b-3xl">
            {tempProduct?.map((item, idx) => (
              <div key={idx}>
                <div className="flex py-4 items-start justify-between h-24 md:h-32">
                  <div className="flex h-full items-start">
                    <img
                      src={item?.lifetagProductImg}
                      className="h-full w-24 border"
                    />
                    <div className="pl-3 font-bold md:pl-4">
                      <p className="pb-1 text-xs xm:text-sm md:text-lg">
                        {item?.productName}
                      </p>
                      <p className="pb-1 text-[11px] text-gray-400 line-through md:text-xs">
                        {lang === 'id'
                          ? setRupiah(item?.totalPrice, lang)
                          : setRupiahEn(item?.totalPrice)}
                      </p>
                      <p className="text-sm md:text-base text-red-500">
                        {lang === 'id'
                          ? setRupiah(item?.totalPrice - item?.totalDiscount, lang)
                          : setRupiahEn(item?.totalPrice - item?.totalDiscount)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-2 pb-4 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <p className="pb-1">{translate('jumlah')}</p>
                    <p className="pb-1">
                      x <span className="text-base">{item?.productQty}</span>
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="pb-1">{translate('warna')}</p>
                    <p className="pb-1">{item?.lifetagColorName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAddAddress = () => {
    return (
      <div className="relative">
        <div className="flex w-full py-6 px-[5%] justify-between items-center border">
          <div
            role="button"
            onClick={() => setShowAddAddress(false)}
            className="">
            <Icon icon={androidArrowBack} size={24} />
          </div>
          <p className="text-body1 font-bold">{translate('tambahAlamat')}</p>
          <div className="w-10"></div>
        </div>
        <div className="max-w-3xl bg-white px-5 shadow-md border rounded-3xl my-6 pt-6 mx-auto">
          <ProfileAddressForm
            currentAction="add"
            handleSuccess={() => setShowAddAddress(false)}
          />
        </div>
      </div>
    );
  };

  const renderShippingAddress = () => {
    return (
      <div className="px-4 pb-5 md:px-10 w-full border-b-8 border-gray-100">
        <div className="flex items-center justify-between">
          <p className="font-bold text-xs xm:text-sm">
            {translate('alamatPengirim')}
          </p>
          {addressSelected && (
            <div
              role="button"
              className="pl-5 flex items-center"
              onClick={() => {
                setIsComingFromScreen({
                  addressSelected,
                  addressContact: contact,
                });

                router.push(
                  {
                    pathname: NAVIGATION.LIFETAG.LifetagConfirmAddress,
                    query: {},
                  },
                  NAVIGATION.LIFETAG.LifetagConfirmAddress,
                );
              }}>
              <Icon
                icon={ic_location_on}
                size={18}
                className="text-red-500 pb-1"
              />
              <p className="font-bold text-[11px] xm:text-xs pl-1 text-gray-400 hover:text-gray-600">
                {translate('pilihAlamatLain')}
              </p>
            </div>
          )}
        </div>

        <div
          className={`p-4 my-3 rounded-2xl border shadow-md ${
            warningAddAddress ? 'border-red-500' : 'border-gray-300'
          }`}>
          {addressSelected ? (
            <>
              <p className="border-b text-[11px] font-bold pb-3 xm:text-sm capitalize">
                {addressSelected?.title
                  ? addressSelected?.title
                  : translate('alamatSesuaiKtp')}
              </p>
              <div className="flex pt-2 justify-between">
                <p className="text-xs pb-2 xm:text-sm capitalize">
                  {contact?.username ? contact?.username : username}
                </p>
                <p className="font-bold text-xs">
                  {contact?.phoneNumber ? contact?.phoneNumber : phoneNumber}
                </p>
              </div>
              <div className="flex pt-1 justify-between">
                <p className="text-sm pb-2 hidden md:block">
                  {translate('alamat')}
                </p>
                <p className="text-[11px] w-full md:w-1/2 text-right capitalize text-gray-600 xm:text-xs md:font-bold">
                  {contact?.stringAddress
                    ? contact?.stringAddress
                    : generateAddress(addressSelected)}
                </p>
              </div>
            </>
          ) : (
            <div className="font-bold text-red-400 flex justify-center py-10 text-xs md:text-sm">
              <div
                role="button"
                onClick={() =>
                  // setShowListAddress(true)
                  router.push({
                    pathname: NAVIGATION.LIFETAG.LifetagConfirmAddress,
                  })
                }
                className="flex items-center  hover:text-red-600">
                {translate('pilihAlamat')}
                <Icon
                  icon={plus}
                  size={12}
                  className="leading-none ml-2 h-4 w-4 scale-75 text-center bg-red-200"
                />
              </div>
            </div>
          )}
        </div>
        {warningAddAddress && (
          <p className="text-red-500 text-[11px] pb-2 font-bold md:text-xs">
            {translate('tambahkanAlamatTerlebih')}
          </p>
        )}

        <div className="text-gray-600 text-xs pl-1 py-3 md:text-sm">
          <p>
            <span className="text-red-500">*</span>
            {translate('informasi')}:
          </p>
          <ul className="list-disc pl-5 pt-1">
            <li>{translate('info1')}</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderTotalPayment = () => {
    return (
      <div className="px-4 md:px-10 pt-6 pb-10">
        <div className="flex justify-between items-center font-bold">
          <p className="text-xs md:text-base">
            {translate('ringkasanPembayaran')}
          </p>
          <p className="text-green-500 text-sm md:text-xl">
            {lang === 'id'
              ? setRupiah(paymentTotalPrice - paymentTotalDiscount, lang)
              : setRupiahEn(paymentTotalPrice - paymentTotalDiscount)}
          </p>
        </div>

        <div className="pt-4 pb-2 text-sm flex flex-col justify-between text-gray-600">
          {tempProduct?.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center pb-1 text-[11px] xm:text-xs md:text-sm md:pb-2">
              <p className="">
                {item?.productName?.slice(0, 7)} - {item?.lifetagColorName}
              </p>
              <p className="font-semibold">
                {item?.totalDiscount > 0 && (
                  <span className="line-through text-gray-400">
                    {setRupiah(item?.totalPrice, lang)}
                  </span>
                )}
                {' - '}
                {item?.totalDiscount > 0
                  ? setRupiah(item?.totalPrice - item?.totalDiscount, lang)
                  : setRupiah(item?.totalPrice, lang)}
              </p>
            </div>
          ))}
        </div>

        {paymentTotalDiscount > 0 && (
          <div className="text-right text-gray-600 flex justify-between items-center text-xs md:text-sm">
            <p className="">{translate('diskon')}</p>
            <p className="font-semibold">{setRupiah(paymentTotalDiscount, lang)}</p>
          </div>
        )}
      </div>
    );
  };

  const renderFooter = () => {
    const onClickBuy = () => {
      setLoading(true);

      if (
        getAddressListResponse?.data?.eKYCAddress?.postcode === null &&
        !addressSelected
      ) {
        setWarningAddAddress(true);
        setLoading(false);
      } else {
        const resultFilterCreateOrder = tempProduct?.map((item) => {
          return {
            productId: item?.productId,
            productColourId: item?.lifetagColorId,
            quantity: item?.productQty,
          };
        });
        setLifetagCreateOrder({
          product: [...resultFilterCreateOrder],
          userAddressId: addressSelected?.id || userData?.ekycId,
          name: contact?.username || userData?.name,
          orderNumber: setLifetagOrderNoResponse?.data?.orderNumber,
          phoneNumber: contact?.phoneNumber || userData?.mobilePhoneNumber,
          devicePlatform: DEVICE_PLATFORM,
        });
        setLoading(true);
      }
    };

    return (
      <div className="fixed border-t shadow-lg w-full bottom-0 z-10 bg-white flex justify-center">
        <div className="w-full max-w-[1440px] pt-5 pb-6 px-4 md:px-[5%] flex flex-col gap-4 sm:gap-0 justify-between items-center md:py-6 sm:flex-row">
          <div className="flex w-full justify-between items-center flex-row md:flex-col md:w-auto md:items-start">
            <p className="text-sm font-bold">Total</p>
            <div className="flex flex-col items-end md:items-start">
              <p className="text-[#00B76A] font-bold text-base xm:text-lg md:text-2xl">
                {lang === 'id'
                  ? setRupiah(paymentTotalPrice - paymentTotalDiscount, lang)
                  : setRupiahEn(paymentTotalPrice - paymentTotalDiscount)}
              </p>
              <p className="text-xs line-through font-medium text-gray-400 xm:text-sm md:text-base">
                {lang === 'id'
                  ? setRupiah(paymentTotalPrice + paymentTotalDiscount, lang)
                  : setRupiahEn(paymentTotalPrice + paymentTotalDiscount)}
              </p>
            </div>
          </div>
          <div className="w-full md:max-w-xs">
            {['hidden sm:flex', 'sm:hidden']?.map((classes, i) => (
              <Button
                key={i}
                type="linear-gradient"
                className={`${classes} max-w-full ml-auto text-sm md:text-base`}
                onButtonClick={onClickBuy}
                // disabled={
                //   !addressSelected &&
                //   !contact?.username &&
                //   !contact?.phoneNumber
                // }
              >
                {translate('buyNow')}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen h-full">
      <img
        src={VectorBackground}
        className="absolute bottom-0 left-0 w-full h-2/3 z-0 hidden md:block"
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full md:pt-10 pb-36">
        <div className="w-full max-w-4xl bg-white rounded-xl border shadow-sm">
          {renderHeader()}
          {renderLifetagDetail()}
          {renderShippingAddress()}
          {renderTotalPayment()}
        </div>
      </div>
      {renderFooter()}
    </div>
  );
}
