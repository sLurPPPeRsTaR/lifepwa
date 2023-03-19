import Slider from 'react-slick';
import moment from 'moment';
import parser from 'html-react-parser';
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
} from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'react-icons-kit';
import { Button, Modal, ModalGroupShare } from '@cp-component';
import { trans } from '@cp-util/trans';
import { ic_west } from 'react-icons-kit/md';
import { androidShareAlt } from 'react-icons-kit/ionicons';
import { CounterAmount } from '@cp-component';
import {
  DefaultBackground,
  Fisioterapi,
  LifesaverLogoWhite,
  LifeTagDummy,
  LiveSaverWhite,
  OutOffStock,
} from '@cp-config/Images';
import { LIFETAG_ID, NAVIGATION } from '@cp-util/constant';
import { setRupiah } from '@cp-util/common';
import locale from './locale';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  SET_LIFETAG_ORDERNO_SUCCESS,
  GET_LIFETAG_PRODUCT_DETAIL_FAILED,
  GET_LIFETAG_PRODUCT_DETAIL_SUCCESS,
} from '@cp-module/lifetag/lifetagConstant';
import {
  ProteksiMedisKecelakaan,
  ProteksiMedisOlahraga,
  TransportasiMedis,
} from '@cp-config/Svgs';
import { chevronDown } from 'react-icons-kit/ionicons';
import { LifesaverRiplay } from '@cp-module/lifesaver/screen';

export default function View(props) {
  const {
    lang,
    setLoading,
    lifetagAction,
    getLifetagProductDetail,
    getLifetagProductDetailResponse,
    getLifetagProductDetailFailed,
    setLifetagTempState,
    setLifetagTempStateClear,
    lifetagTempState,
    setLifetagOrderNo,
    setIsComingFromDeepLink,
    isComingFromDeepLink,
    isComingFromScreen,
    setIsComingFromScreen,
    userData,
    getCurrentSubs,
    lifetagTempOrderState,
    getCurrentSubsResponse,
    setLifetagTempOrderState,
    setLifetagOutOffStock,
  } = props;

  moment.locale(lang);
  const router = useRouter();
  const [hostname, setHostname] = useState(1);
  const [imgActive, setImgActive] = useState(0);
  const [slideActive, setSlideActive] = useState(1);
  const [isGroupShare, setIsGroupShare] = useState(false);
  const [openBenefit, setOpenBenefit] = useState(false);
  const [showModalLsRiplay, setShowModalLsRiplay] = useState(false);

  const firstUpdate = useRef(true);
  const sliderRef = useRef();

  const { fromOrder } = router?.query;

  const translate = (val) => trans(locale, lang, val);

  useEffect(() => {
    if (window.location.hostname == 'www.life.id') {
      setHostname(
        'https://lifecustomer.page.link/?link=https%3A%2F%2Flife.id%2Flifetagdetailproduct&apn=id.lifecustomer&isi=1627986095&ibi=id.life.customer',
      );
    } else if (window.location.hostname == 'uat.life.id') {
      setHostname(
        'https://lifecustomer.page.link/?link=https%3A%2F%2Fuat.life.id%2Flifetagdetailproduct&apn=id.lifecustomer.uat&isi=1627986095&ibi=id.life.customer.uat',
      );
    } else {
      setHostname(
        'https://lifecustomer.page.link/?link=https%3A%2F%2Fuat.life.id%2Flifetagdetailproduct&apn=id.lifecustomer.uat&isi=1627986095&ibi=id.life.customer.uat',
      );
    }
  }, []);

  useLayoutEffect(() => {
    if (isComingFromDeepLink && userData?.userId === '') {
      setIsComingFromScreen({
        screen: NAVIGATION.LIFETAG.LifetagDetailProduct,
      });
      router.push(NAVIGATION.LOGIN.Login);
    }
    if (userData?.userId !== '') {
      getCurrentSubs();
    }
  }, [
    userData?.userId,
    getCurrentSubs,
    isComingFromDeepLink,
    setIsComingFromScreen,
  ]);

  // init from back btn order
  useEffect(() => {
    if (fromOrder && lifetagTempOrderState?.length !== 0) {
      setLifetagTempState({ tempOrder: lifetagTempOrderState });
    }
  }, [fromOrder]);

  // get product detail
  useEffect(() => {
    setLoading(true);
    getLifetagProductDetail({
      id: LIFETAG_ID,
      lang,
    });
  }, [getLifetagProductDetail, lang, setLoading]);

  const productDetail = useMemo(() => {
    return getLifetagProductDetailResponse?.data?.product;
  }, [getLifetagProductDetailResponse?.data?.product]);

  const isDisabledAdd = useMemo(() => {
    const filterResult = productDetail?.colourList?.filter(
      (i) =>
        !lifetagTempState?.tempOrder?.some(
          (b) => b?.lifetagColorId === i?.id,
        ) && i?.stock > 0,
    );
    if (filterResult?.length === 0) {
      return true;
    }
  }, [lifetagTempState?.tempOrder, productDetail?.colourList]);

  const paymentTotalDiscount = useMemo(() => {
    return lifetagTempState?.tempOrder?.reduce(
      (acc, i) => acc + i.totalDiscount,
      0,
    );
  }, [lifetagTempState?.tempOrder]);

  const lifetagResultAction = useCallback(
    (act) => {
      if (act === GET_LIFETAG_PRODUCT_DETAIL_SUCCESS) {
        setLoading(false);
        if (firstUpdate.current) {
          firstUpdate.current = false;
          const res = getLifetagProductDetailResponse?.data?.product;

          const filterResult = res?.colourList?.filter((item) => {
            if (item?.stock !== 0) {
              return item;
            }
          });

          if (filterResult?.length !== 0) {
            setLifetagTempState({
              tempOrder: [
                {
                  productId: res?.id,
                  productName: res?.name,
                  lifetagColor: filterResult[0]?.codeList[0],
                  lifetagColorId: filterResult[0]?.id,
                  lifetagColorName: filterResult[0]?.name,
                  lifetagProductImg: filterResult[0]?.productImage,
                  productQty: 1,
                  totalPrice: res?.price * 1,
                  totalDiscount: res?.discount * 1,
                },
              ],
            });
          } else {
            setLifetagOutOffStock(true);
          }
          return;
        }
      }
      if (act === GET_LIFETAG_PRODUCT_DETAIL_FAILED) {
        setLoading(false);
        if (
          getLifetagProductDetailFailed?.message !== 'INTERNAL_SERVER_ERROR'
        ) {
          console.log(getLifetagProductDetailFailed?.message);
        }
      }
      if (act === SET_LIFETAG_ORDERNO_SUCCESS) {
        setLoading(false);
        setLifetagTempOrderState(lifetagTempState?.tempOrder);
        router.push({ pathname: NAVIGATION.LIFETAG.LifetagConfirm });
      }
    },
    [
      setLoading,
      getLifetagProductDetailResponse?.data?.product,
      setLifetagTempState,
      getLifetagProductDetailFailed?.message,
      lifetagTempState?.tempOrder,
    ],
  );

  useEffect(() => {
    lifetagResultAction(lifetagAction);
  }, [lifetagAction, lifetagResultAction]);

  const renderHeader = () => {
    // click arrow back
    const onClickBack = () => {
      setLoading(true);
      if (isComingFromScreen?.fromProfile) {
        router.push(
          {
            pathname: NAVIGATION.LIFETAG.LifetagMain,
            query: {
              lifetagId: isComingFromScreen?.lifetagId,
            },
          },
          NAVIGATION.LIFETAG.LifetagMain,
        );
        setLoading(false);
        setIsComingFromScreen({ fromProfile: false });
      } else if (isComingFromScreen?.fromDetailOrder) {
        router.push(
          {
            pathname: NAVIGATION.LIFETAG.LifetagDetailOrder,
            query: {
              orderId: isComingFromScreen?.orderId,
            },
          },
          NAVIGATION.LIFETAG.LifetagDetailOrder,
        );
        setLoading(false);
        setIsComingFromScreen({ fromDetailOrder: false });
      } else {
        router.push(NAVIGATION.HOME.Home);
        setLoading(false);
      }
    };

    return (
      <div className="relative z-10 w-full flex justify-between items-center shadow-sm bg-white h-16 px-5 lg:h-20 lg:px-[5%]">
        <div className="w-5" role="button">
          <Icon
            icon={ic_west}
            size={20}
            onClick={onClickBack}
            className="cursor-pointer"
          />
        </div>
        <p className="font-bold text-sm md:text-lg">{translate('mainTitle')}</p>
        <div
          role="button"
          className="w-5"
          onClick={() => setIsGroupShare(true)}>
          <Icon
            icon={androidShareAlt}
            size={20}
            className="cursor-pointer duration-500 hover:text-red-500"
            // onClick={() => window.open(hostname, '_blank')}
          />
        </div>
      </div>
    );
  };

  const ImageSlider = () => {
    const settings = {
      arrows: false,
      dots: true,
      // infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // autoplay: true,
      // autoplaySpeed: 5000,
      afterChange: (current) => setSlideActive(current + 1),
    };

    return (
      <div className="relative h-fit mb-5">
        <Slider {...settings} ref={sliderRef}>
          {productDetail?.bannerList?.map((item, idx) => (
            <div key={idx} className="h-64 md:h-[460px]">
              <img
                src={item?.imageUrl}
                className="h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </Slider>
        <div className="absolute bottom-8 right-5 py-1 text-center rounded-md bg-white w-10 text-xs md:text-sm md:w-12">
          {slideActive} / {productDetail?.bannerList?.length}
        </div>
      </div>
    );
  };

  const renderTitleProduct = () => {
    return (
      <div className="p-3 pt-5 xm:p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-full items-start">
            <div className="font-bold">
              <p className="pb-1 text-base md:text-lg">{productDetail?.name}</p>
              {productDetail?.discount > 0 && (
                <p className="pb-1 text-gray-400 line-through text-[11px] md:text-xs">
                  {setRupiah(productDetail?.price, lang)}
                </p>
              )}
              <p className="text-red-500 text-sm md:text-lg">
                {setRupiah(productDetail?.price - productDetail?.discount || 0, lang)}
              </p>
            </div>
          </div>
          <div className="flex py-1 h-full flex-col items-end justify-between">
            {productDetail?.isNew && (
              <p className="px-2 py-1 w-fit rounded-md bg-red-500 text-white text-[11px] md:text-xs">
                New
              </p>
            )}
          </div>
        </div>
        <div className="pt-5 pb-2">
          <p className="pb-2 font-bold text-xs md:text-sm">
            {translate('deskripsi')}
          </p>
          <div className="!text-xl text-gray-500 lifetag-detail-product">
            {productDetail?.description && parser(productDetail?.description)}
          </div>
        </div>
      </div>
    );
  };

  const renderProductColor = () => {
    const onColorPress = ({ color, colorIndex, price, discount }) => {
      const filterResult = lifetagTempState?.tempOrder?.filter((i) => {
        return color?.id === i?.lifetagColorId;
      });

      if (color?.stock === 0) {
        setLifetagOutOffStock(true);
      } else if (filterResult?.length === 0) {
        const tempArray = [...lifetagTempState?.tempOrder];
        tempArray[colorIndex] = {
          ...tempArray[colorIndex],
          lifetagColorId: color?.id,
          lifetagColor: color?.codeList?.join(' '),
          lifetagColorName: color?.name,
          lifetagProductImg: color?.productImage,
          productQty: 1,
          totalPrice: price,
          totalDiscount: discount,
        };
        setLifetagTempState({
          ...lifetagTempState,
          tempOrder: tempArray,
        });
      }
    };

    const onPlusQtyPress = ({ qty, colorIndex, price, discount, item }) => {
      const filterResult = productDetail?.colourList?.filter((i) => {
        return i?.id === item?.lifetagColorId;
      });
      if (item?.productQty < filterResult[0]?.stock) {
        const tempArray = [...lifetagTempState?.tempOrder];
        tempArray[colorIndex] = {
          ...tempArray[colorIndex],
          productQty: qty + 1,
          totalPrice: price * (qty + 1),
          totalDiscount: discount * (qty + 1),
        };
        setLifetagTempState({
          ...lifetagTempState,
          tempOrder: tempArray,
        });
      }
    };

    const onMinusQtyPress = ({ qty, colorIndex, price, discount }) => {
      if (qty - 1 < 1) {
        if (colorIndex !== 0) {
          const tempArray = [...lifetagTempState?.tempOrder];
          tempArray.splice(colorIndex, 1);
          setLifetagTempState({
            ...lifetagTempState,
            tempOrder: tempArray,
          });

          const tempArrays = [...lifetagTempState?.tempOrder];
          const findBannerPosition = productDetail?.colourList?.find((b) => {
            return b?.id === tempArrays[colorIndex - 1].lifetagColorId;
          });
          const isIndexBanner = productDetail?.bannerList?.findIndex((c) => {
            return c?.position === findBannerPosition?.position;
          });

          sliderRef.current.slickGoTo(
            isIndexBanner < productDetail?.bannerList?.length - 1
              ? isIndexBanner + 1
              : isIndexBanner,
          );
        }

        return;
      }
      const tempArray = [...lifetagTempState?.tempOrder];
      tempArray[colorIndex] = {
        ...tempArray[colorIndex],
        productQty: qty - 1,
        totalPrice: price * (qty - 1),
        totalDiscount: discount * (qty - 1),
      };
      setLifetagTempState({ ...lifetagTempState, tempOrder: tempArray });
    };

    const disabled =
      productDetail?.colourList?.length ===
        lifetagTempState?.tempOrder?.length || productDetail?.stock < 1;

    const isColorDisabled = ({ color, colorIndex }) => {
      const isColorSelected = lifetagTempState?.tempOrder?.find((i) => {
        return color?.id === i?.lifetagColorId;
      });

      const isColorSelectedNow =
        lifetagTempState?.tempOrder[colorIndex]?.lifetagColorId !== color?.id;
      return isColorSelected && isColorSelectedNow;
    };

    return (
      <div className="p-3 xm:px-5">
        {lifetagTempState?.tempOrder?.map((item, idx) => (
          <div key={idx} className="pb-6 flex justify-between items-center">
            <div className="">
              <div className="flex items-center">
                <p className="font-bold text-xs xm:text-sm md:text-base">
                  {translate('pilihWarna')}
                </p>
                <p className="text-xs pl-4 text-gray-600 xm:text-sm">
                  {item?.lifetagColorName}
                </p>
              </div>
              <div className="flex py-2 gap-1 mx:gap-2">
                {productDetail?.colourList?.map((i, id) => (
                  <button
                    key={id}
                    onClick={() => {
                      sliderRef.current.slickGoTo(id + 1);
                      onColorPress({
                        color: i,
                        colorIndex: idx,
                        price: productDetail?.price,
                        discount: productDetail?.discount,
                      });
                    }}
                    className={`border-2 rounded-full  
                    ${
                      i?.stock &&
                      !isColorDisabled({
                        color: i,
                        colorIndex: idx,
                      })
                        ? 'hover:border-red-400'
                        : 'cursor-auto'
                    }
                    ${
                      item?.lifetagColor === i?.codeList[0]
                        ? 'border-red-500'
                        : 'border-transparent'
                    }
                    `}
                    disabled={disabled}>
                    <div
                      className="rounded-full border-2 border-white w-5 h-5 xm:w-6 xm:h-6 md:w-8 md:h-8 "
                      style={{
                        background:
                          i?.stock &&
                          !isColorDisabled({
                            color: i,
                            colorIndex: idx,
                          })
                            ? i.codeList[0]
                            : 'gray',
                      }}></div>
                  </button>
                ))}
              </div>
            </div>
            <CounterAmount
              amount={item?.productQty}
              index={idx}
              setMin={() =>
                onMinusQtyPress({
                  qty: item?.productQty,
                  colorIndex: idx,
                  price: productDetail?.price,
                  discount: productDetail?.discount,
                })
              }
              setPlus={() =>
                onPlusQtyPress({
                  qty: item?.productQty,
                  colorIndex: idx,
                  item: item,
                  price: productDetail?.price,
                  discount: productDetail?.discount,
                })
              }
            />
          </div>
        ))}
      </div>
    );
  };

  const renderAddColor = () => {
    if (
      productDetail?.colourList?.length === lifetagTempState?.tempOrder?.length
    ) {
      return <div className="border-b mb-8"></div>;
    }

    const onPressAdd = () => {
      const filterResult = productDetail?.colourList?.find(
        (i) =>
          !lifetagTempState?.tempOrder?.some(
            (b) => b?.lifetagColorId === i?.id,
          ) && i?.stock > 0,
      );

      if (filterResult?.stock !== 0) {
        const bannerPos = productDetail?.colourList.find((i) => {
          return i?.id === filterResult?.id;
        });

        const indexBanner = productDetail?.bannerList?.findIndex((i) => {
          return i?.position === bannerPos?.position;
        });

        const tempOrder = [...lifetagTempState?.tempOrder];
        tempOrder.push({
          productId: productDetail?.id,
          productName: productDetail?.name,
          lifetagColor: filterResult?.codeList?.join(' '),
          lifetagColorId: filterResult?.id,
          lifetagColorName: filterResult?.name,
          lifetagProductImg: filterResult?.productImage,
          productQty: 1,
          totalPrice: productDetail?.price * 1,
          totalDiscount: productDetail?.discount * 1,
        });

        sliderRef.current.slickGoTo(
          indexBanner < productDetail?.bannerList?.length - 1
            ? indexBanner + 1
            : indexBanner,
        );

        setLifetagTempState({
          ...lifetagTempState,
          tempOrder,
        });
      } else {
        setLifetagOutOffStock(true);
      }
    };

    if (isDisabledAdd) {
      return null;
    }

    return (
      <div className="pb-8 px-5">
        <button
          role="button"
          onClick={onPressAdd}
          disabled={isDisabledAdd}
          className="flex justify-center w-full py-5 border-t border-b text-red-500 hover:underline font-bold text-xs md:text-sm">
          {translate('tambah')}
        </button>
      </div>
    );
  };

  const renderBodyProduct = () => {
    return (
      <div className="px-5">
        <p className="text-center text-sm xm:text-base font-bold md:text-lg">
          {translate('infoProduk')}
        </p>
        <div className="py-5 flex justify-between border-b text-[11px] xm:text-xs md:text-sm ">
          <div className="font-bold">
            <p className="pb-2">{translate('berat')}</p>
            <p className="pr-5">{translate('kompatibelDengan')}</p>
          </div>
          <div className="text-right text-gray-500 font-bold">
            <p className="pb-2">{productDetail?.weight} g</p>
            <p className="">{productDetail?.compatibility}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderBenefit = () => {
    return (
      <div className="my-6 px-5">
        <div
          role="button"
          className="flex justify-between p-5 rounded-t-3xl"
          style={{
            background:
              'linear-gradient(169deg, rgba(251,176,76,1) 0%, rgba(237,28,36,1) 50%)',
          }}>
          <img src={LifesaverLogoWhite} className="h-6" />
          <div></div>
        </div>

        <div className={`border overflow-hidden duration-500`}>
          <div>
            <div className="flex p-3 md:px-4 md:py-5 border-b">
              <div className="w-[18%] pr-1 xm:pr-3">
                <img
                  src={ProteksiMedisKecelakaan}
                  className="mx-auto h-12 md:h-14"
                />
              </div>
              <div className="w-[82%] pl-1">
                <h1 className="pb-1 font-bold text-xs xm:text-sm md:text-base">
                  {trans(locale, lang, 'proteksiMedisAkibat')}
                </h1>
                <p className="text-[11px] text-gray-600 xm:text-xs md:text-sm">
                  {parser(trans(locale, lang, 'descProteksiMedisAkibat'))}
                </p>
              </div>
            </div>

            <div
              className={`relative duration-300 ${
                openBenefit ? 'h-full' : 'h-0'
              }`}>
              <div className="flex p-3 md:px-4 md:py-5 border-b">
                <div className="w-[18%] pr-1 xm:pr-3">
                  <img
                    src={ProteksiMedisOlahraga}
                    className="mx-auto h-12 md:h-14"
                  />
                </div>
                <div className="w-[82%] pl-1">
                  <h1 className="pb-1 font-bold text-xs xm:text-sm md:text-base">
                    {parser(trans(locale, lang, 'proteksiMedisCedera'))}
                  </h1>
                  <p className="text-[11px] text-gray-600 xm:text-xs md:text-sm">
                    {parser(trans(locale, lang, 'descProteksiMedisCedera'))}
                  </p>
                </div>
              </div>

              <div className="flex p-3 md:px-4 md:py-5 border-b">
                <div className="w-[18%] pr-1 xm:pr-3">
                  <img src={Fisioterapi} className="mx-auto h-fit md:h-14" />
                </div>
                <div className="w-[82%] pl-1">
                  <h1 className="pb-1 font-bold text-xs xm:text-sm md:text-base">
                    {trans(locale, lang, 'fisioterapi')}
                  </h1>
                  <p className="text-[11px] text-gray-600 xm:text-xs md:text-sm">
                    {parser(trans(locale, lang, 'descFisioterapi'))}
                  </p>
                </div>
              </div>

              <div className="flex p-3 md:px-4 md:py-5 border-b">
                <div className="w-[18%] pr-1 xm:pr-3">
                  <img
                    src={TransportasiMedis}
                    className="mx-auto h-12 md:h-14"
                  />
                </div>
                <div className="w-[82%] pl-1">
                  <h1 className="pb-1 font-bold text-xs xm:text-sm md:text-base">
                    {trans(locale, lang, 'transportasiMedis')}
                  </h1>
                  <p className="text-[11px] text-gray-600 xm:text-xs md:text-sm">
                    {parser(trans(locale, lang, 'descTransportasiMedis'))}
                  </p>
                </div>
              </div>

              <div className="py-5 px-3 md:p-5">
                <div
                  role="button"
                  onClick={() => setShowModalLsRiplay(true)}
                  className="font-bold pb-2 text-red-500 text-xs cursor-pointer underline hover:no-underline md:text-sm">
                  {trans(locale, lang, 'lihatRingkasanInformasi')}
                </div>
                <div>
                  <p className="text-xs pb-1 md:text-sm">
                    {parser(trans(locale, lang, 'berlakuInnerLimit'))}
                  </p>
                  <p className="text-xs md:text-sm">
                    {parser(trans(locale, lang, 'selamaPeriodePromosi'))}
                  </p>
                </div>
              </div>
            </div>

            <div
              role="button"
              className="relative z-10 w-full flex justify-between items-center border px-4 py-2 bg-white hover:bg-red-50"
              onClick={() => setOpenBenefit(!openBenefit)}>
              <p className="font-bold text-xs text-red-500">
                {translate('lihatManfaatLainnya')}
              </p>
              <Icon
                size={18}
                icon={chevronDown}
                className={`text-red-500 duration-300 ${
                  openBenefit ? '-rotate-180' : ''
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <div className="p-5 border-b border-t">
        <p className="font-bold text-sm md:text-base">
          {translate('ringkasanPembayaran')}
        </p>

        <div className="pt-3 pb-2 text-sm flex flex-col justify-between text-gray-600">
          {lifetagTempState?.tempOrder?.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center pb-1 text-[11px] xm:text-xs md:text-sm md:pb-2">
              <p className="">
                {item?.productName?.slice(0, 7)} - {item?.lifetagColorName}
              </p>
              <p className="">
                {item?.totalDiscount > 0 && (
                  <span className="line-through">
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
            <p className="">{setRupiah(paymentTotalDiscount, lang)}</p>
          </div>
        )}
      </div>
    );
  };

  const renderButton = () => {
    let isDisable = false;

    if (productDetail?.stock < 1) {
      isDisable = true;
    }

    const onBtnPress = () => {
      if (
        !getCurrentSubsResponse?.isSubscribe ||
        !userData.alreadyKYC ||
        getCurrentSubsResponse?.planName === ''
      ) {
        setIsComingFromDeepLink(false);
        router.push(NAVIGATION.LIFESAVER.LifesaverMain);
      } else {
        setLifetagOrderNo();
        setLoading(true);
      }
    };

    const totalPrice = lifetagTempState?.tempOrder?.reduce(
      (acc, i) => acc + i.totalPrice - i.totalDiscount,
      0,
    );

    return (
      <div className="p-5 border-t">
        <div className="flex pb-3 justify-between">
          <p className="pb-2 text-sm font-bold md:text-base">Total</p>
          <div className="">
            <p className="pb-2 text-sm font-bold text-green-500 xm:text-base md:text-lg">
              {setRupiah(totalPrice, lang)}
            </p>
            <p className="text-right line-through text-xs font-bold text-gray-400 md:text-base">
              {setRupiah(totalPrice + paymentTotalDiscount, lang)}
            </p>
          </div>
        </div>
        <Button
          type="linear-gradient"
          className="text-xs mt-3 !h-10 md:mt-5 md:!h-11 md:text-sm"
          full
          disabled={isDisable}
          onButtonClick={() => onBtnPress()}>
          {translate('beli')}
        </Button>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={DefaultBackground}
        className="absolute z-0 top-0 left-0 w-full hidden md:block"
      />
      {renderHeader()}
      <div className="relative z-10 flex items-center justify-center w-full h-full pt-10 md:py-10">
        <div className="w-full max-w-2xl bg-white pb-5 rounded-3xl overflow-hidden md:border md:shadow-sm">
          {ImageSlider()}
          {renderTitleProduct()}
          {renderProductColor()}
          {renderAddColor()}
          {renderBodyProduct()}
          {renderBenefit()}
          {renderSummary()}
          {renderButton()}
        </div>
      </div>

      <LifesaverRiplay
        showModalLsRiplay={showModalLsRiplay}
        setShowModalLsRiplay={setShowModalLsRiplay}
      />
      <ModalGroupShare
        lang={lang}
        isOpen={isGroupShare}
        title={translate('titleGroupShare')}
        setClose={setIsGroupShare}
        linkWhatsApp={'https://lifecustomer.page.link/WR9Y'}
        linkFacebook={'https://lifecustomer.page.link/WR9Y'}
        linkTelegram={'https://lifecustomer.page.link/WR9Y'}
        linkTwitter={'https://lifecustomer.page.link/WR9Y'}
        linkEmail={'https://lifecustomer.page.link/WR9Y'}
        copyLink={'https://lifecustomer.page.link/WR9Y'}
      />
    </div>
  );
}
