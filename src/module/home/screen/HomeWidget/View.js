import _, { isEmpty } from 'lodash';
import axios from 'axios';
import clsx from 'classnames';
import Icon from 'react-icons-kit';
import Image from 'next/image';
import moment from 'moment';
import Slider from 'react-slick';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { trans } from '@cp-util/trans';
import { getUserFlagApi } from '@cp-module/auth/authApi';
import { infoCircle } from 'react-icons-kit/fa';
import { GET_POLICIES_SUCCESS } from '@cp-module/polis/polisConstant';
import { Button, Modal } from '@cp-component';
import { monthThreeCharacter, setFormatDate, setRupiah } from '@cp-util/common';
import { androidClose } from 'react-icons-kit/ionicons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  API,
  BASE_URL,
  BILL_TYPE,
  NAVIGATION,
  planCodeLifesaver,
  PRODUCT,
} from '@cp-util/constant';
import {
  GET_EVENT_USERTICKET_SUCCESS,
  GET_EVENT_USERTICKET_FAILED,
} from '@cp-module/event/eventConstant';
import {
  Vector2,
  Vector3,
  Widget3,
  Widget4,
  IconProfileActive,
  Widget6,
  Invite,
  LifeTagDummy,
  widgetLifeness,
  WidgetNotLogin,
  NewVector,
  Calendar,
  LifesaverGift,
} from '@cp-config/Images';
import locale from './locale';
import {
  WidgetGracePeriod,
  WidgetRenewal,
  WidgetFreeLs,
} from '@cp-config/Svgs';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ModalTermNCondition } from '@cp-component';
import { getReceiverStatusApi } from '@cp-module/lifesaver/lifesaverApi';

export default function Page(props) {
  const {
    lang,
    userData,
    kkpmFlag,
    alreadyLivenessTest,
    token,
    getNotifCount,
    setInvoiceId,
    getPolicyWidgetHome,
    getPolicyWidgetHomeResponse,
    getPendingInvites,
    getPendingInvitesResponse,
    setUserData,
    features,
    getCurrentSubs,
    getCurrentSubsResponse,
    getSubscriptionDetail,
    getSubscriptionDetailResponse,
    getPolicyProposal,
    getPolicyProposalResponse,
    setCreateBill,
    setCreateBillResponse,
    setCreateBillParam,
    setCreateBillClear,
    getLifetagFlag,
    getLifetagFlagResponse,
    setAvailableOnMobile,
    getEventUserTicket,
    getEventUserTicketResponse,
    eventAction,
    anuitasPrimaFlag,
    anuitasRetailFlag,
    kkpmTempState,
    setKkpmTemp,
    homeWidgetShowns,
    setWidgetHome,
    getWidgetImage,
    getWidgetImageResponse,
  } = props;

  moment.locale(lang);
  const router = useRouter();
  const widgetSlider = useRef(null);
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : '',
  );
  const [inviteePhoto, setInviteePhoto] = useState('');
  const [isLoad, setIsLoad] = useState(true);
  const [wCount, setWCount] = useState(0);
  const [nextBenefit, setNextBenefit] = useState({});
  const [modalBenefit, setModalBenefit] = useState(false);
  const [showLifetag, setShowLifetag] = useState(false);
  const [showGetLifetag, setShowGetLifetag] = useState(false);
  const [showConnectLifetag, setShowConnectLifetag] = useState(false);
  const [showLiveness, setShowLiveness] = useState(false);
  const [showNotLogin, setShowNotLogin] = useState(false);
  const [showAlreadyKyc, setShowAlreadyKyc] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFreeLs, setShowFreeLs] = useState(false);
  const [showKkpmAnuitasPrima, setShowKkpmAnuitasPrima] = useState(false);
  const [showKkpmAnuitasRetail, setShowKkpmAnuitasRetail] = useState(false);
  const [ticketFreeLs, setTicketFreeLs] = useState(null);
  const [isOpenModalTnc, setIsOpenModalTnc] = useState(false);
  const [widgetImage, setWidgetImage] = useState({
    widget1: '',
    widget2: '',
    widget3: '',
    widget4: '',
    widget5: '',
    widget6: '',
    widget7: '',
    widget8: '',
    widget9: '',
    widget10: '',
    widget11: '',
    widget12: '',
    widget13: '',
    widget14: '',
    widget15: '',
  });

  const translate = (val) => trans(locale, lang, val);
  const [receiverStatusResponse, setReceiverStatusResponse] = useState();
  useEffect(() => {
    getReceiverStatusApi()
      .then((response) => {
        setReceiverStatusResponse(response.data);
      })
      .catch((err) => {});
    getWidgetImage({ position: 'Popup', lang });
  }, []);

  const getImage = (attr) => {
    if (attr) {
      return attr;
    } else {
      return '';
    }
  };

  // useEffect(() => {
  //   if (getWidgetImageResponse?.length > 0) {
  //     setWidgetImage({
  //       ...widgetImage,
  //       widget1: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '1',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget2: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '2',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget3: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '3',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget4: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '4',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget5: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '5',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget6: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '6',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget7: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '7',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget8: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '8',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget9: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '9',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget10: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '10',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget11: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '11',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget12: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '12',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget13: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '13',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget14: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '14',
  //         )[0].attributes?.Image?.url,
  //       ),
  //       widget15: getImage(
  //         getWidgetImageResponse?.filter(
  //           (item) => item?.attributes?.Urutan === '15',
  //         )[0].attributes?.Image?.url,
  //       ),
  //     });
  //   }
  // }, [getWidgetImageResponse]);

  useEffect(() => {
    if (token) {
      getNotifCount();
      getPolicyWidgetHome();
      getPendingInvites();
      getEventUserTicket({ lang: lang });

      if (userData.alreadyKYC) {
        getCurrentSubs();
        getPolicyProposal();
      }

      getUserFlagApi()
        .then((res) => {
          // FYI behavior flag, less than 24 hours still true.
          const is24Hours = res?.data?.data?.alreadyLivenessTest;
          if (!is24Hours) {
            setUserData({
              userData: {
                alreadyLivenessTest: false,
              },
            });
          }
        })
        .catch((error) => {
          throw error;
        });
    }
    setIsLoad(false);
  }, []);

  useEffect(() => {
    if (
      getCurrentSubsResponse?.planName !== 'LifeSAVER' &&
      getCurrentSubsResponse?.planName !== 'LifeSAVER+' &&
      getCurrentSubsResponse?.planName !== 'LifeSAVER POS'
    ) {
      if (getEventUserTicketResponse?.data?.length > 0) {
        const getAllTicket = getEventUserTicketResponse?.data;
        const sortTicketByLastTransactionDate = getAllTicket?.sort(
          (a, b) =>
            new Date(b?.ticket?.dateTime).getTime() -
            new Date(a?.ticket?.dateTime).getTime(),
        );
        const getTicketHasFreeLs = sortTicketByLastTransactionDate?.filter(
          (item) => item?.ticket?.isFreeLifeSaver,
        );
        if (getTicketHasFreeLs.length > 0) {
          setShowFreeLs(true);
          setTicketFreeLs(getTicketHasFreeLs[0]);
        }
      }
    }
  }, [getCurrentSubsResponse, getEventUserTicketResponse]);

  useEffect(() => {
    if (
      setCreateBillResponse?.redirectUrl &&
      setCreateBillResponse?.invoiceId
    ) {
      setInvoiceId({
        invoiceMaster: setCreateBillResponse?.invoiceId,
        reffNo: setCreateBillParam?.data.reffNo,
        policyNumber: getCurrentSubsResponse?.policyNo,
        planCode: setCreateBillResponse?.planCode,
        onFailed: '/',
      });
      router.push(setCreateBillResponse?.redirectUrl);
      setCreateBillClear();
    }
  }, [setCreateBillResponse]);

  useEffect(() => {
    if (token) {
      getLifetagFlag();
      setShowNotLogin(false);
    } else {
      setShowNotLogin(true);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      if (userData?.alreadyKYC) {
        setShowAlreadyKyc(false);
      } else {
        setShowAlreadyKyc(true);
      }
    }
  }, [userData, token]);

  useEffect(() => {
    if (
      getLifetagFlagResponse?.data?.hasLifeSaver &&
      getLifetagFlagResponse?.data?.alreadyOrderLifeTag &&
      !getLifetagFlagResponse?.data?.alreadyLinkLifeTag
    ) {
      setShowLifetag(true);
    }
    if (getLifetagFlagResponse?.data?.hasLifeSaver) {
      setShowLifetag(true);
    }
    if (getLifetagFlagResponse?.data?.alreadyLinkLifeTag) {
      setShowLifetag(false);
    }
  }, [getLifetagFlagResponse]);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  // GET RENEWAL WIDGET
  useEffect(() => {
    if (getCurrentSubsResponse?.policyNo) {
      getSubscriptionDetail(getCurrentSubsResponse?.policyNo);
    }
  }, [getCurrentSubsResponse?.policyNo, getSubscriptionDetail]);

  // liveness
  useEffect(() => {
    if (
      !userData?.alreadyLivenessTest &&
      userData?.alreadyKYC &&
      token &&
      getSubscriptionDetailResponse?.status === 'ACTIVE'
    ) {
      setShowLiveness(true);
    }
  }, [
    userData?.alreadyLivenessTest,
    userData?.alreadyKYC,
    token,
    getSubscriptionDetailResponse?.status,
  ]);

  //kkpm
  useEffect(() => {
    if (
      (anuitasPrimaFlag?.isLastAlterSuccess === null ||
        anuitasPrimaFlag?.isLastAlterSuccess === undefined) &&
      userData.alreadyKYC &&
      anuitasPrimaFlag?.isIssuedPolicy
    ) {
      setShowKkpmAnuitasPrima(true);
    }
  }, [anuitasPrimaFlag, userData.alreadyKYC]);
  useEffect(() => {
    if (
      (anuitasRetailFlag?.isLastAlterSuccess === null ||
        anuitasRetailFlag?.isLastAlterSuccess === undefined) &&
      userData.alreadyKYC &&
      anuitasRetailFlag?.isIssuedPolicy
    ) {
      setShowKkpmAnuitasRetail(true);
    }
  }, [anuitasRetailFlag, userData.alreadyKYC]);

  // Next Benefit
  const nextBenefitArray = useMemo(() => {
    const res = getPolicyWidgetHomeResponse?.data;
    if (!res) {
      return [];
    }

    let dataArray = [];
    if (res?.mantapWidget) {
      dataArray = [...dataArray, ...res?.mantapWidget];
    }
    if (res?.anuitasWidget) {
      dataArray = [...dataArray, ...res?.anuitasWidget];
    }

    if (_.isEmpty(dataArray)) {
      return [];
    } else if (_.isArray(dataArray)) {
      setNextBenefit(dataArray[0]);
    } else {
      setNextBenefit(dataArray);
    }

    return dataArray.sort((a, b) => moment(a.date).diff(moment(b.date)));
  }, [getPolicyWidgetHomeResponse?.data]);

  const LifeSaverText = useCallback((normal) => {
    return (
      <span className={clsx(normal ? 'font-medium' : 'font-semibold')}>
        Life
        <span className={clsx('italic', normal ? 'font-medium' : 'font-bold ')}>
          SAVER
        </span>
      </span>
    );
  }, []);

  // widget template component
  const CardWidget = ({
    onClick,
    onClickSecondary,
    className,
    content1,
    btnTitle,
    btnSecondaryTitle,
    img,
    children,
    freeLsImg,
    classNoLogin,
    classNoLoginImg,
    vectorBenefit,
  }) => {
    return (
      <div className={`h-full my-1 ${className} `}>
        <div
          role="button"
          onClick={onClick}
          className={`h-full relative overflow-hidden w-full bg-white flex justify-between items-center rounded-xl py-3 lg:py-4 md:rounded-2xl p-2 md:p-4 hover:shadow-md min-h-[110px] xm:min-h-[125px] md:min-h-[140px] 
        ${classNoLogin}`}>
          {token && (
            <img
              src={NewVector}
              className="absolute z-0 top-0 left-0 h-3/5 w-full opacity-5"
            />
          )}

          {freeLsImg && (
            <img
              src={WidgetFreeLs}
              className="absolute top-0 -left-7 xm:-left-6 md:left-0 h-full "
            />
          )}
          <div className="w-full flex justify-between items-center">
            <div
              className={`flex items-center ${
                wCount == 1
                  ? 'w-[25%] lg:w-[20%]'
                  : 'w-[25%] md:w-[20%] lg:w-[25%]'
              }`}>
              {img && (
                <img
                  src={img}
                  className={`z-40 h-12 xm:h-14 mx-auto md:h-20 ${classNoLoginImg}`}
                />
              )}
            </div>

            <div
              // className={`flex flex-col justify-between h-fit ${freeLsImg ? 'pl-2 w-[65%] lg:pl-2 lg:w-[75%]'  : 'w-[75%] lg:w-[75%]'}`}
              className={` ${
                wCount == 1
                  ? 'w-[75%] lg:w-[80%] flex items-left justify-around flex-col lg:items-center lg:flex-row '
                  : 'w-[75%] lg:w-[75%] flex flex-col justify-between h-fit'
              }`}>
              <p
                //className="ml-2 text-[11px] xm:text-xs md:text-base"
                className={`text-[9px] xm:text-[11px] ml-2 pr-2 
              ${wCount == 1 ? 'md:text-sm lg:text-base' : 'md:text-sm'}
              `}>
                {content1 && content1}
                {children && children}
              </p>
              <div className="flex flex-column gap-x-2 justify-end">
                {btnSecondaryTitle && (
                  <div className="flex justify-end">
                    <Button
                      outline
                      full
                      className="text-[10px] rounded-lg border-red-300 px-4 w-fit min-w-[120px] mt-2 md:mt-3 !h-6 xm:!h-7 md:!h-8 md:rounded-xl md:text-[11px] md:min-w-[140px]"
                      onButtonClick={(e) => {
                        e?.stopPropagation();
                        onClickSecondary();
                      }}>
                      {btnSecondaryTitle}
                    </Button>
                  </div>
                )}
                {btnTitle && (
                  <div className="flex justify-end">
                    <Button
                      shadow
                      full
                      type="linear-gradient"
                      className="text-[10px] rounded-lg  px-4 w-fit min-w-[120px] mt-2 md:mt-3 !h-6 xm:!h-7 md:!h-8 md:rounded-xl md:text-[11px] md:min-w-[140px]"
                      onButtonClick={onClick}>
                      {btnTitle}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // manfaat
  const renderWidgetBenefit = () => {
    if (_.isEmpty(nextBenefitArray)) {
      return null;
    }
    const totalBenefit = nextBenefitArray.reduce(
      (accum, item) => accum + item.benefit,
      0,
    );

    return (
      <SwiperSlide className="w-full">
        <CardWidget img={Widget3} vectorBenefit>
          <div>
            <div className="flex flex-col w-[70%] md:w-[80%] lg:w-[70%] text-sm md:text-md">
              <p className="font-medium">{translate('manfaatSelanjutnya')}</p>
              <p className="font-bold">
                {'Rp.' +
                  totalBenefit.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
              </p>
              <p className="my-2 ">
                {setFormatDate(nextBenefitArray[0]?.date, lang, true)}
              </p>
            </div>
            <Icon
              icon={infoCircle}
              size={width < 640 ? 16 : 20}
              className="cursor-pointer absolute right-4 top-3 duration-300 text-orange-300 hover:text-orange-200 "
              onClick={() => setModalBenefit(true)}
            />
          </div>
        </CardWidget>
      </SwiperSlide>
    );
  };

  const renderModalBenefit = () => {
    const totalBenefit = nextBenefitArray.reduce(
      (accum, item) => accum + item.benefit,
      0,
    );

    return (
      <Modal isOpen={modalBenefit} size="md">
        <div className="md:px-2 pb-1 text-sm min-h-0">
          <div className="flex items-center pb-5">
            <Icon
              size={16}
              icon={androidClose}
              className="cursor-pointer"
              onClick={() => setModalBenefit(false)}
            />
            <p className="text-sm font-bold pl-2">
              {trans(locale, lang, 'nextBenefit')}
            </p>
          </div>
          <div className="max-h-[40vh] overflow-y-auto">
            {nextBenefitArray.map((item) => (
              <div className="border-b-2">
                <p className="text-xs pt-4 font-bold xm:text-sm md:text-base">
                  {item.productName}
                </p>
                <p className="font-bold text-xs xm:text-sm md:text-base">
                  {item.policyNo}
                </p>
                <div className="font-bold mb-2 flex justify-between text-xs xm:text-sm md:text-base">
                  <p className="text-gray-400">
                    {setFormatDate(item?.date, lang, true)}
                  </p>
                  <p className="text-green-500">
                    {'Rp.' +
                      item.benefit.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    );
  };

  useEffect(() => {
    if (getPendingInvitesResponse?.listInviting?.length) {
      const data = getPendingInvitesResponse?.listInviting[0].inviteePhoto;

      if (data !== null) {
        axios
          .get(`${BASE_URL}${API.USER.photoThumbnail}/${data}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
          })
          .then((response) => {
            setInviteePhoto(response.data);
          });
      }
    }
  }, [getPendingInvitesResponse]);

  const renderWidgetInvited = () => {
    if (
      token &&
      getCurrentSubsResponse?.status !== 'ACTIVE' &&
      getPendingInvitesResponse?.listInviting?.length > 0
    ) {
      return (
        <SwiperSlide className="w-full">
          <CardWidget
            img={
              inviteePhoto !== '' && inviteePhoto !== null
                ? URL.createObjectURL(inviteePhoto)
                : IconProfileActive
            }
            onClick={() => {
              router.push({
                pathname: NAVIGATION.LIFESAVER.LifesaverMain,
              });
            }}
            btnTitle={trans(locale, lang, 'mulaiSekarang')}>
            <p
              className={`text-sm ml-2 ${
                wCount == 1 ? 'md:text-lg' : 'md:text-md'
              }`}>
              {!_.isEmpty(getPendingInvitesResponse?.listInviting)
                ? getPendingInvitesResponse?.listInviting[0].inviteeName
                : null}{' '}
              {trans(locale, lang, 'mengundangUntukTerproteksi')}{' '}
              <LifeSaverText normal />
            </p>
          </CardWidget>
        </SwiperSlide>
      );
    }
    return null;
  };

  //payment
  const renderWidgetPayment = () => {
    if (token === null && token === '') {
      return null;
    }
    if (
      !getCurrentSubsResponse?.policyNo &&
      getPolicyProposalResponse?.data?.invoiceMaster
      // getSubscriptionDetailResponse?.isNewInvoic
    ) {
      return (
        <SwiperSlide className="w-full">
          <CardWidget
            img={Widget6}
            btnTitle={trans(locale, lang, 'lihatPembayaran')}
            onClick={() => {
              setCreateBill({
                isProposal: true,
                data: {
                  applicationId: 'customerapps-pwa-v2',
                  billType: BILL_TYPE.premium,
                  invoiceMaster: getPolicyProposalResponse?.data?.invoiceMaster,
                  language: lang,
                },
              });
            }}>
            <p
              className={`text-sm ml-2 font-medium ${
                wCount == 1 ? 'md:text-lg' : 'md:text-md'
              }`}>
              {trans(locale, lang, 'selesaikanPembayaran')}{' '}
              <span className="whitespace-nowrap">
                <LifeSaverText normal />.
              </span>
            </p>
          </CardWidget>
        </SwiperSlide>
      );
    }
  };

  const renderWidgetRenewal = () => {
    if (!features.lifesaver || (token === null && token === '')) {
      return null;
    }

    if (getCurrentSubsResponse?.isSubscribe === false) return null;

    if (
      getSubscriptionDetailResponse?.status === 'ACTIVE' &&
      getSubscriptionDetailResponse?.isWidgetRenewal
    ) {
      return (
        <SwiperSlide className="w-full">
          <CardWidget
            img={WidgetRenewal}
            // content1={trans(locale, lang, 'titleAjakTeman')}
            btnTitle={trans(locale, lang, 'renewal_button')}
            onClick={() =>
              setCreateBill({
                isRenewal: true,
                data: {
                  applicationId: 'customerapps-pwa-renew',
                  billType: BILL_TYPE.premium,
                  reffNo: getCurrentSubsResponse?.policyNo,
                  language: lang,
                },
              })
            }>
            <div
              className={`text-[9px] xm:text-[11px] ml-2 pr-2 
          ${wCount == 1 ? 'md:text-sm lg:text-base' : 'md:text-sm'}`}>
              <p>
                {lang === 'en' && (
                  <>
                    Your <LifeSaverText normal /> will end soon, complete
                    payment before{' '}
                    {getSubscriptionDetailResponse?.policyDueDate
                      ?.split('-')
                      ?.reverse()
                      ?.map((_e, _i) =>
                        _i === 1 ? monthThreeCharacter?.[lang]?.[_e - 1] : _e,
                      )
                      ?.join(' ')}{' '}
                    23:59
                  </>
                )}
              </p>
              <p>
                {lang === 'id' && (
                  <>
                    <LifeSaverText normal />
                    -mu akan segera berakhir, lakukan pembayaran sebelum tanggal{' '}
                    {getSubscriptionDetailResponse?.policyDueDate
                      ?.split('-')
                      ?.reverse()
                      ?.map((_e, _i) =>
                        _i === 1 ? monthThreeCharacter?.[lang]?.[_e - 1] : _e,
                      )
                      ?.join(' ')}{' '}
                    23:59
                  </>
                )}
              </p>
            </div>
          </CardWidget>
        </SwiperSlide>
      );
    }
  };

  const renderWidgetGracePeriod = () => {
    if (!features.lifesaver || (token === null && token === '')) {
      return null;
    }

    if (
      getSubscriptionDetailResponse?.status === 'GRACE_PERIOD' &&
      getSubscriptionDetailResponse?.isWidgetRenewal
    ) {
      return (
        <SwiperSlide className="w-full">
          <CardWidget
            img={WidgetGracePeriod}
            btnTitle={trans(locale, lang, 'renewal_button')}
            onClick={() =>
              setCreateBill({
                isRenewal: true,
                data: {
                  applicationId: 'customerapps-pwa-renew',
                  billType: BILL_TYPE.premium,
                  reffNo: getCurrentSubsResponse?.policyNo,
                  language: lang,
                },
              })
            }>
            <div
              className={`text-[9px] xm:text-[11px] ml-2 pr-2 
          ${wCount == 1 ? 'md:text-sm lg:text-base' : 'md:text-sm'}`}>
              <p>
                {lang === 'en' && (
                  <>
                    Complete payment now to reactive your{' '}
                    <span className="whitespace-nowrap">
                      <LifeSaverText normal /> !
                    </span>
                  </>
                )}
              </p>
              <p>
                {lang === 'id' && (
                  <>
                    Lakukan pembayaran sekarang agar{' '}
                    <span className="whitespace-nowrap">
                      <LifeSaverText normal />
                      -mu
                    </span>{' '}
                    aktif kembali!
                  </>
                )}
              </p>
            </div>
          </CardWidget>
        </SwiperSlide>
      );
    }
  };

  // not login
  const renderNotLogin = () => {
    return (
      <CardWidget
        img={WidgetNotLogin}
        className="max-w-6xl w-full"
        classNoLogin="!min-h-[70px]"
        classNoLoginImg="!h-16 lg:!h-20">
        <div>
          {translate('silahkan')}{' '}
          <span
            role="button"
            className="font-bold text-red-500 hover:underline"
            onClick={() => router.push(NAVIGATION.LOGIN.Login)}>
            Login
          </span>{' '}
          {translate('atau')}{' '}
          <span
            role="button"
            className="font-bold text-red-500 hover:underline"
            onClick={() => router.push(NAVIGATION.REGISTER.Register)}>
            Register
          </span>{' '}
          {translate('menikmatiFitur')}
        </div>
      </CardWidget>
    );
  };

  //ajak teman
  const renderAlertReferral = () => {
    if (userData?.userId === '') {
      return null;
    }
    //condition if render widget has to shown
    console.log('getcurrent', homeWidgetShowns);
    if (
      getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER ||
      getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER_PLUS ||
      getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER_POS ||
      !isEmpty(userData?.userParty)
    ) {
      //condition to hide and shown widget
      if (homeWidgetShowns?.renderWidgetInvitation) {
        return (
          <SwiperSlide className="w-full">
            <CardWidget
              img={Invite}
              content1={trans(locale, lang, 'titleAjakTeman')}
              btnTitle={trans(locale, lang, 'ajakTeman2')}
              btnSecondaryTitle={trans(locale, lang, 'nanti')}
              onClickSecondary={() => {
                setWidgetHome({
                  ...homeWidgetShowns,
                  renderWidgetInvitation: false,
                });
              }}
              onClick={() =>
                router.push({
                  pathname: NAVIGATION.LIFESAVER.LifesaverInviteFriends,
                })
              }></CardWidget>
          </SwiperSlide>
        );
      }
      return null;
    }
  };

  // lifetag
  const renderWidgetLifetag = () => {
    if (getLifetagFlagResponse?.data?.alreadyLinkLifeTag) {
      return null;
    }

    if (
      getLifetagFlagResponse?.data?.hasLifeSaver &&
      getLifetagFlagResponse?.data?.alreadyOrderLifeTag &&
      !getLifetagFlagResponse?.data?.alreadyLinkLifeTag
    ) {
      return (
        <SwiperSlide className="w-full">
          <CardWidget
            img={LifeTagDummy}
            content1={trans(locale, lang, 'siapDihubungkan')}
            btnTitle={trans(locale, lang, 'hubungkanLifetag')}
            onClick={() =>
              router.push({ pathname: NAVIGATION.LIFETAG.LifetagScanner })
            }></CardWidget>
        </SwiperSlide>
      );
    }
  };

  // belum kyc
  const renderNotYetKyc = () => {
    return (
      <SwiperSlide className="w-full">
        <CardWidget
          img={Widget4}
          content1={trans(locale, lang, 'yukSegera')}
          btnTitle={trans(locale, lang, 'btnVerifikasiSekarang')}
          onClick={() =>
            router.push({ pathname: NAVIGATION.KYC.KycMain })
          }></CardWidget>
      </SwiperSlide>
    );
  };

  // liveness
  const renderLiveness = () => {
    return (
      <SwiperSlide className="w-full">
        <CardWidget
          img={widgetLifeness}
          content1={trans(locale, lang, 'titleWidgetLiveness')}
          btnTitle={trans(locale, lang, 'mulaiSekarang')}
          onClick={
            () =>
              router.push(
                {
                  pathname: NAVIGATION.KYC.KycUploadSelfie,
                  query: { fromWidget: true },
                },
                NAVIGATION.KYC.KycUploadSelfie,
              )
            // setAvailableOnMobile(true)
          }></CardWidget>
      </SwiperSlide>
    );
  };

  // claim free ls polis
  const RenderFreeLs = () => {
    return (
      <SwiperSlide className="w-full">
        <CardWidget
          freeLsImg
          content1={trans(locale, lang, 'contentTextWidgetFreeLs')}
          btnTitle={trans(locale, lang, 'textBtnWidgetFreeLs')}
          onClick={() => {
            setIsOpenModalTnc(true);
          }}></CardWidget>
      </SwiperSlide>
    );
  };

  // kkpm
  const RenderAnuitasPrima = () => {
    const policyName = 'IFG Anuitas Prima';
    const date = anuitasPrimaFlag?.issuedPolicyLastDate?.slice(0, 10);

    const handleClick = () => {
      setKkpmTemp({
        navFrom: NAVIGATION.HOME.Home,
        category: 'reminder',
        source: anuitasPrimaFlag?.source,
        isUploadedKKAndKTP: anuitasPrimaFlag?.isUploadedKKAndKTP,
      });
      setTimeout(() => {
        router.push(NAVIGATION.UPDATA.Updata);
      }, 500);
    };

    return (
      <SwiperSlide className="w-full">
        <CardWidget img={Calendar} onClick={handleClick}>
          {anuitasPrimaFlag?.issuedPolicyLastDate !== null ? (
            <p>
              {trans(locale, lang, 'pengkinianTerakhir')}{' '}
              <span className="font-bold">
                {policyName} {setFormatDate(date, lang)}.
              </span>{' '}
              {trans(locale, lang, 'lakukanPengkinianData')}
            </p>
          ) : (
            <p>
              {trans(locale, lang, 'kamuBelumMelakukan')}{' '}
              <span className="font-semibold">{policyName}</span>
              {trans(locale, lang, 'kamuTetapBerlanjut')}
            </p>
          )}
        </CardWidget>
      </SwiperSlide>
    );
  };

  const RenderAnuitasRetail = () => {
    const policyName = 'IFG Anuitas ';
    const date = anuitasRetailFlag?.issuedPolicyLastDate?.slice(0, 10);

    const handleClick = () => {
      setKkpmTemp({
        navFrom: NAVIGATION.HOME.Home,
        category: 'reminder',
        source: anuitasRetailFlag?.source,
        isUploadedKKAndKTP: anuitasRetailFlag?.isUploadedKKAndKTP,
      });
      setTimeout(() => {
        router.push(NAVIGATION.UPDATA.Updata);
      }, 500);
    };

    return (
      <SwiperSlide className="w-full">
        <CardWidget img={Calendar} onClick={handleClick}>
          {anuitasRetailFlag?.issuedPolicyLastDate !== null ? (
            <p>
              {trans(locale, lang, 'pengkinianTerakhir')}{' '}
              <span className="font-bold">
                {policyName} {setFormatDate(date, lang)}.
              </span>{' '}
              {trans(locale, lang, 'lakukanPengkinianData')}
            </p>
          ) : (
            <p>
              {trans(locale, lang, 'kamuBelumMelakukan')} {policyName}
              {trans(locale, lang, 'kamuTetapBerlanjut')}
            </p>
          )}
        </CardWidget>
      </SwiperSlide>
    );
  };

  useEffect(() => {
    const gridLength =
      +!_.isEmpty(nextBenefitArray) +
      +(
        token &&
        !getCurrentSubsResponse?.isSubscribe &&
        getCurrentSubsResponse?.status !== 'ACTIVE' &&
        getPendingInvitesResponse?.listInviting?.length > 0
      ) +
      +showLifetag +
      +showLiveness +
      +showAlreadyKyc +
      +showFreeLs +
      +showKkpmAnuitasPrima +
      +showKkpmAnuitasRetail +
      +(
        getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER ||
        getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER_PLUS ||
        getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER_POS ||
        !isEmpty(userData?.userParty)
      ) +
      +(
        (
          isEmpty(getCurrentSubsResponse) &&
          getPolicyProposalResponse?.data?.invoiceMaster
        )
        // getSubscriptionDetailResponse?.isNewInvoice
      ) +
      +(
        getSubscriptionDetailResponse?.status === 'ACTIVE' &&
        getSubscriptionDetailResponse?.isWidgetRenewal &&
        getCurrentSubsResponse?.isSubscribe === true
      ) +
      +(
        getSubscriptionDetailResponse?.status === 'GRACE_PERIOD' &&
        getSubscriptionDetailResponse?.isWidgetRenewal
      ) +
      receiverStatusResponse?.isOpen;
    setWCount(gridLength);
  }, [nextBenefitArray, getPendingInvitesResponse, getPendingInvitesResponse]);

  const swiperOption = {
    slidesPerView: 1.01,
    spaceBetween: 10,
    breakpoints: {
      640: {
        slidesPerView: 1.4,
        spaceBetween: 10,
      },
      770: {
        slidesPerView: 1.6,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
    },
  };

  const renderWidgetReceiverStatus = () => {
    if (receiverStatusResponse?.isOpen) {
      return (
        <SwiperSlide className="w-full">
          <CardWidget
            img={LifesaverGift}
            content1={
              'Kamu Mendapatkan Proteksi ' +
              planCodeLifesaver[receiverStatusResponse?.planCode]?.planName +
              ' Dari ' +
              receiverStatusResponse?.payorName
            }
            btnTitle={'Check Sekarang'}
            onClick={() => {
              setInvoiceId({
                type: 'receiver',
                planCode: receiverStatusResponse?.planCode,
              });
              router.push({
                pathname: NAVIGATION.LIFESAVER.LifesaverSuccess,
              });
            }}></CardWidget>
        </SwiperSlide>
      );
    }
  };

  const handleWidgetRender = () => {
    if (!token) {
      return showNotLogin && renderNotLogin();
    } else {
      if (wCount < 3 && window.innerWidth > 1024) {
        return (
          <div
            className={clsx(
              'w-full max-w-6xl grid grid-cols-1 lg:grid-flow-rows gap-3 lg:gap-4',
              wCount === 2 ? 'lg:grid-cols-2' : '',
            )}>
            {renderAlertReferral()}
            {renderWidgetRenewal()}
            {renderWidgetGracePeriod()}
            {renderWidgetPayment()}
            {renderWidgetReceiverStatus()}
            {/* {renderWidgetLifetag()} */}
            {/* {showFreeLs && RenderFreeLs()} */}
            {!_.isEmpty(nextBenefitArray) && renderWidgetBenefit()}
            {showLiveness && renderLiveness()}
            {showAlreadyKyc && renderNotYetKyc()}
            {!_.isEmpty(getPendingInvitesResponse?.listInviting) &&
              getPendingInvitesResponse?.listInviting[0].inviteeUserId !==
                null &&
              renderWidgetInvited()}
            {showKkpmAnuitasPrima && RenderAnuitasPrima()}
            {showKkpmAnuitasRetail && RenderAnuitasRetail()}
          </div>
        );
      } else {
        return (
          <div className="w-full max-w-6xl">
            <Swiper
              {...swiperOption}
              pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-sorotan-pagination-bullet-active',
                type: 'bullets',
                modifierClass:
                  'widget-home swiper-sorotan-pagination-position-',
                bulletClass: 'swiper-sorotan-pagination-bullets',
              }}
              className={
                wCount < 3 && window.innerWidth > 1024 ? '!pb-0' : '!pb-7'
              }
              modules={[Pagination]}>
              {showKkpmAnuitasPrima && RenderAnuitasPrima()}
              {showKkpmAnuitasRetail && RenderAnuitasRetail()}
              {renderWidgetPayment()}
              {renderWidgetRenewal()}
              {renderWidgetGracePeriod()}
              {renderWidgetReceiverStatus()}
              {renderAlertReferral()}
              {/* {renderWidgetLifetag()} */}
              {!_.isEmpty(getPendingInvitesResponse?.listInviting) &&
                getPendingInvitesResponse?.listInviting[0].inviteeUserId !==
                  null &&
                renderWidgetInvited()}
              {!_.isEmpty(nextBenefitArray) && renderWidgetBenefit()}
              {/* {showFreeLs && RenderFreeLs()} */}
              {showAlreadyKyc && renderNotYetKyc()}
              {showLiveness && renderLiveness()}
            </Swiper>
          </div>
        );
      }
    }
  };

  return (
    <div className="md:pt-5">
      {renderModalBenefit()}
      <div className={`flex justify-center ${wCount > 0 && 'mb-6'}`}>
        {handleWidgetRender()}
      </div>
      <ModalTermNCondition
        lang={lang}
        isOpen={isOpenModalTnc}
        onAgree={() => {
          const query = {
            eventCode: ticketFreeLs?.event?.eventCode,
            ...ticketFreeLs?.ticket?.product,
          };

          router.push(
            {
              pathname: NAVIGATION.EVENT.EventConfirmClaim,
              query: query,
            },
            NAVIGATION.EVENT.EventConfirmClaim,
          );
        }}
        onClose={() => {
          setIsOpenModalTnc(false);
        }}
      />
    </div>
  );
}
