import { api } from '@cp-bootstrap/bootstrapApi';
import { Button, Container, HeaderEvent, PanelDropdown } from '@cp-component';
import {
  Fisioterapi,
  GrayCalender,
  GrayClock,
  ProteksiMedisKecelakaan,
  ProteksiMedisOlahraga,
  RedBigPointer,
  RedCalender,
  RedClock,
  RedHandlePhone,
  RedRightLaneSign,
  TransportasiMedis,
  WhiteLifeSaver,
} from '@cp-config/Svgs';
import {
  GET_USER_EVENT_INVOICE_ID_SUCCESS,
  GET_USER_EVENT_INVOICE_ID_FAILED,
  GET_EVENT_DETAIL_SUCCESS,
  GET_EVENT_DETAIL_FAILED,
  SET_EVENT_BUYTICKET_SUCCESS,
  SET_EVENT_BUYTICKET_FAILED,
  SET_EVENT_ACCESSCODE_SUCCESS,
  SET_EVENT_ACCESSCODE_FAILED,
} from '@cp-module/event/eventConstant';
import { getIsUserEligibleApi } from '@cp-module/home/homeApi';
import { API, BASE_URL, NAVIGATION } from '@cp-util/constant';
import { extrakDateEvent, formatRibuan } from '@cp-util/func';
import { trans } from '@cp-util/trans';
import axios from 'axios';
import clsx from 'classnames';
import parser from 'html-react-parser';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { ModalAccessCode } from '@cp-module/event/components';
import locale from './locale';
import { eventAppsflyer } from '@cp-util/func';

export default function Page({
  lang,
  event,
  userData,
  setEventParam,
  setModalAksesKode,
  getUserEventInvoiceId,
  eventAction,
  getUserEventInvoiceIdResponse,
  getCurrentSubs,
  getEventQuota,
  getEventQuotaResponse,
  getCurrentSubsResponse,
  setLoading,
  setEventBuyTicket,
  setEventAccessCodeBuyTicket,
  getEventDetail,
  accessCode,
  setInternalServerError,
  screen,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [urlToShare, setUrlToShare] = useState('');
  const [errMsg, setErrMsg] = useState(null);
  const [isOpenModalAccessCode, setIsOpenModalAccessCode] = useState(false);
  const location = typeof window !== 'undefined' && window.location;
  const slugId = location?.pathname?.split('/')[3];
  const API_FIREBASE = 'AIza\\SyBuo0PQKVjM740b\\HQhg0XrUlmhep1E\\alJM';
  const windowLocal = typeof window !== 'undefined' && window;

  const { to } = router.query;

  useEffect(() => {
    const handleBack = () => {
      // logic untuk menangani back browser
      // misalnya mengarahkan user ke halaman sebelumnya
      const locationBack = to ? '/' : '/event';

      router.push(locationBack);
    };

    windowLocal.addEventListener('popstate', handleBack);
    return () => {
      windowLocal.removeEventListener('popstate', handleBack);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    getCurrentSubs();
    if (slugId) {
      getEventDetail({
        eventId: slugId,
        lang: lang,
        accessCode: accessCode || '',
        userId: userData?.userId,
      });
    }
  }, []);

  const eventResult = useCallback(
    (act) => {
      // invoice watch
      if (act === GET_USER_EVENT_INVOICE_ID_SUCCESS) {
        router.push({
          pathname: NAVIGATION.EVENT.EventConfirmPayment,
        });
      }
      if (act == GET_USER_EVENT_INVOICE_ID_FAILED) {
        setInternalServerError(true);
      }
      // event detail watch
      if (act === GET_EVENT_DETAIL_SUCCESS) {
        getEventQuota({ eventId: event?.data?.id });
      }
      if (act === GET_EVENT_DETAIL_FAILED) {
        setInternalServerError(true);
        router.push(NAVIGATION.EVENT.EventMain);
      }

      // buytiket watch
      if (act === SET_EVENT_BUYTICKET_SUCCESS) {
        setModalAksesKode(false);
        router.push(
          {
            pathname: NAVIGATION.EVENT.EventConfirmPayment,
            query: {
              eventId: event?.data?.id,
            },
          },
          NAVIGATION.EVENT.EventConfirmPayment,
        );
      }
      if (act === SET_EVENT_BUYTICKET_FAILED) {
        setErrMsg({
          error: trans(locale, lang, 'errMsgAccessCode'),
        });
        setInternalServerError(true);
      }

      // accesscode watch
      if (act === SET_EVENT_ACCESSCODE_SUCCESS) {
        setModalAksesKode(false);
        console.log(accessCode);
        // alert(accessCode);
        return router.push({
          pathname: NAVIGATION.EVENT.EventConfirmClaim,
          query: {
            eventCode: event?.data?.eventCode,
            ...event?.data?.product,
            planName: getCurrentSubsResponse?.planName,
            accessCode: accessCode,
            eventId: event?.data?.id,
          },
        });
      }
      if (act === SET_EVENT_ACCESSCODE_FAILED) {
        setErrMsg({
          error: trans(locale, lang, 'errMsgAccessCode'),
        });
        setInternalServerError(true);
      }

      setIsLoading(false);
      setLoading(false);
    },
    [getUserEventInvoiceIdResponse?.data?.id, event?.data?.id],
  );

  useEffect(() => {
    eventResult(eventAction);
  }, [eventAction, eventResult]);

  const toLocation = () => {
    const separate = '%2C';
    const latitude = event?.data?.location?.latitude;
    const longitude = event?.data?.location?.longitude;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude}${separate}${longitude}`;
    window.open(url);
  };

  const contactUs = () => {
    api.post(BASE_URL + '/v1/product/emergency/addTime');
    window.location.href = `tel:${event?.data?.pic[0].mobilePhoneNo}`;
  };

  const trigerAppsfLyer = () => {
    eventAppsflyer({
      eventName: 'af_event_tile',
      payload: {
        af_user_id: userData?.userId,
        af_channel: 'website',
        af_event_name: event?.data?.name,
        af_prev_page: screen,
        af_current_page: window.location.pathname,
      },
    });
  };

  const _handleRegister = () => {
    trigerAppsfLyer();
    setIsLoading(true);
    if (userData?.userId === '') {
      router.push({
        query: {
          eventId: slugId,
        },
        pathname: NAVIGATION.LOGIN.Login,
      });
      return;
    }

    if (!userData?.alreadyKYC && !userData?.alreadySetPin) {
      router.push(NAVIGATION.KYC.KycMain);
      return;
    }

    if (userData?.alreadyKYC && !userData?.alreadySetPin) {
      setIsLoading(false);
      router.push(NAVIGATION.KYC.KycCreatePin);
      return;
    }

    if (event?.data?.type === 'EXTPUBLIC') {
      // setIsLoading(true);
      // getUserEventInvoiceId({
      //   eventId: event?.data?.id
      // })
      setIsLoading(false);
      router.push({
        pathname: NAVIGATION.EVENT.EventConfirmPayment,
      });

      return;
    }

    getIsUserEligibleApi().then(() => {
      setEventParam({
        screen: router.pathname,
        accessCode: accessCode,
        eventId: event?.data?.id,
      });

      if (event?.data?.type === 'SEMIPVT') {
        setIsOpenModalAccessCode(true);
        return;
      }

      if (event?.data?.type !== 'EXTPUBLIC') {
        return router.push({
          pathname: NAVIGATION.EVENT.EventConfirmPayment,
          query: {
            eventCode: event?.data?.eventCode,
            ...event?.data?.product,
            planName: getCurrentSubsResponse?.planName,
            accessCode: accessCode,
            eventId: event?.data?.id,
          },
        });
      }

      // if (event?.data?.type === 'SEMIPVT') {
      //   setIsOpenModalAccessCode(true)
      //   return
      // }

      // if(event?.data?.type === 'PUBLIC'){
      //   buyTiket()
      // }

      // if(event?.data?.type === 'PRIVATE'){
      //   buyTiket()
      // }
    });
  };

  const buyTiket = () => {
    setLoading(true);
    // if (getEventQuotaResponse?.data?.remainingQuotaEvent > 0) {
    //   if (
    //     getCurrentSubsResponse?.planName === 'LifeSAVER' ||
    //     getCurrentSubsResponse?.planName === 'LifeSAVER+'
    //   ) {
    //     setEventBuyTicket({
    //       eventId: event?.data?.id,
    //       haveLifeSaver: true,
    //       accessCode: accessCode
    //     })
    //   } else {
    //     setEventBuyTicket({
    //       eventId: event?.data?.id,
    //       haveLifeSaver: false,
    //       accessCode: accessCode
    //     })
    //   }
    // }

    setEventAccessCodeBuyTicket({
      eventId: event?.data?.id,
      accessCode: accessCode,
    });
  };

  const getShortLink = () => {
    // const bannerUrl = event?.data?.banner?.filter(item => item.position === 1)[0].url;
    // const TYPE = process.env.BASE_URL === 'https://uat.life.id/api' ? '-uat' : '-prod'
    // const afl = {
    //   '-prod': `https://life.id/event/detail/${slugId}`,
    //   '-uat': `https://uat.life.id/event/detail/${slugId}`,
    // };
    // const deepLink = {
    //   '-prod': `&apn=id.lifecustomer&isi=1627986095&ibi=id.life.customer&isi=1627986095&afl=${afl[TYPE]}&ifl=${afl[TYPE]}`,
    //   '-uat': `&apn=id.lifecustomer.uat&isi=1627986095&ibi=id.life.customer.uat&isi=1627986095&afl=${afl[TYPE]}&ifl=${afl[TYPE]}`,
    // };
    // const content = `&st=${event?.data?.name.replace(/&/g, 'dan')}&sd=Ayo ikut event ${event?.data?.name?.replace(/&/g, 'dan')} . Banyak kegiatan seru dan akan ada live performance.&si=${bannerUrl}`;
    // const linkPrefix = {
    //   '-prod':
    //     encodeURIComponent(`https://life.id/event/detail/${slugId}`) +
    //     deepLink[TYPE] +
    //     content,
    //   '-uat':
    //     encodeURIComponent(`https://uat.life.id/event/detail/${slugId}`) +
    //     deepLink[TYPE] +
    //     content
    // };
    // const bodyReq = {
    //   longDynamicLink: `https://qr.life.id/?link=${linkPrefix[TYPE]}`,
    //   suffix: {
    //     option: 'SHORT',
    //   },
    // };
    // const url = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${API_FIREBASE.replace(/\\/g, '')}`;
    // axios.post(url, bodyReq)
    //   .then((res) => {
    //     setUrlToShare(res?.data?.shortLink)
    //     trigerAppsfLyer()
    //   })
    //   .catch((err) => {
    //     setInternalServerError(true)
    //   });
    setUrlToShare(event?.data?.shortLink);
  };

  // component
  const LayoutSection = ({ children }) => {
    return (
      <div className="rounded-2xl bg-white shadow w-full md:w-1/2 p-4 mb-5">
        {children}
      </div>
    );
  };

  const PannelProduct = () => {
    const viewRiplay = () => {
      const riplayFile =
        BASE_URL === 'https://uat.life.id/api'
          ? API.LIFESAVER.getRiplayLifeSaver
          : API.LIFESAVER.getPersonalRiplay;
      const url = `${BASE_URL}${riplayFile}`;
      window.open(url);
    };

    return (
      <PanelDropdown titleImage={WhiteLifeSaver} openPanel={true}>
        <div>
          <div>
            <div className="flex p-4">
              <div className="w-[5em] sm:w-[80px] lg:mr-3">
                <img src={ProteksiMedisKecelakaan} />
              </div>
              <div className="w-[320px] sm:w-[400px] md:w-[300px] lg:w-[900px]">
                <h1 className="text-md font-bold">
                  {trans(locale, lang, 'proteksiMedisAkibat')}
                </h1>
                <p className="text-caption1 text-neutral-dark-neutral200">
                  {parser(trans(locale, lang, 'descProteksiMedisAkibat'))}
                </p>
              </div>
            </div>
            <hr />
          </div>
          <div>
            <div className="flex p-4">
              <div className="w-[5em] sm:w-[80px] lg:mr-3">
                <img src={ProteksiMedisOlahraga} />
              </div>
              <div className="w-[320px] sm:w-[400px] md:w-[300px] lg:w-[900px]">
                <h1 className="text-md font-bold">
                  {parser(trans(locale, lang, 'proteksiMedisCedera'))}
                </h1>
                <p className="text-caption1 text-neutral-dark-neutral200">
                  {parser(trans(locale, lang, 'descProteksiMedisCedera'))}
                </p>
              </div>
            </div>
            <hr />
          </div>
          <div>
            <div className="flex p-4">
              <div className="w-[5em] sm:w-[80px] lg:mr-3">
                <img src={Fisioterapi} />
              </div>
              <div className="w-[320px] sm:w-[400px] md:w-[300px] lg:w-[900px]">
                <h1 className="text-md font-bold">
                  {trans(locale, lang, 'fisioterapi')}
                </h1>
                <p className="text-caption1 text-neutral-dark-neutral200">
                  {parser(trans(locale, lang, 'descFisioterapi'))}
                </p>
              </div>
            </div>
            <hr />
          </div>
          <div>
            <div className="flex p-4">
              <div className="w-[5em] sm:w-[80px] lg:mr-3">
                <img src={TransportasiMedis} />
              </div>
              <div className="w-[320px] sm:w-[400px] md:w-[300px] lg:w-[900px]">
                <h1 className="text-md font-bold">
                  {trans(locale, lang, 'transportasiMedis')}
                </h1>
                <p className="text-caption1 text-neutral-dark-neutral200">
                  {parser(trans(locale, lang, 'descTransportasiMedis'))}
                </p>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="p-4">
          <div className="mb-5">
            <a
              className="font-bold text-[#ED1C24] text-xs cursor-pointer underline"
              onClick={viewRiplay}>
              {trans(locale, lang, 'lihatRingkasanInformasi')}
            </a>
          </div>
          <div>
            <p className="text-xs text-neutral-dark-neutral200">
              {parser(trans(locale, lang, 'berlakuInnerLimit'))}
            </p>
            <p className="text-xs text-neutral-dark-neutral200">
              {parser(trans(locale, lang, 'selamaPeriodePromosi'))}
            </p>
          </div>
        </div>
      </PanelDropdown>
    );
  };

  const CardHeader = ({
    name,
    type,
    thumb,
    startDate,
    endDate,
    lang,
    isClosed,
  }) => {
    const tiketState = ['PRIVATE', 'SEMIPVT'].includes(type)
      ? 'Limited Event'
      : 'Public Event';
    const date = extrakDateEvent(startDate, endDate, lang);

    let typeButtonText;

    if (lang === 'id') {
      typeButtonText = {
        registered: 'Terdaftar',
        closed: 'Tutup',
        avail: 'Daftar',
        messageLifeSaver:
          'Kamu berkesempatan mendapatkan GRATIS LifeSAVER untuk satu bulan',
      };
    }

    if (lang === 'en') {
      typeButtonText = {
        registered: 'Registered',
        closed: 'Closed',
        avail: 'Register',
        messageLifeSaver: 'You have chance to get FREE LifeSAVER for one month',
      };
    }

    return (
      <div>
        <div
          style={{
            borderRadius: '30px',
          }}
          className="p-3 shadow-lg">
          <div
            className="rounded-2xl overflow-hidden flex justify-center items-center h-60 md:h-96"
            style={{
              background: 'black',
            }}>
            <div>
              <img
                src={thumb}
                style={{ width: '100%' }}
                className={clsx({ ['disable-img']: isClosed })}
              />
            </div>
          </div>
          <div className="bg-white rounded-[20px] py-3">
            <div className="px-3">
              <h1
                className={clsx('text-body2 md:text-lg lg:text-2xl font-bold', {
                  ['text-[#6B7580]']: isClosed,
                })}>
                {name}
              </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex justify-between">
                <div className="p-3">
                  <div className="flex mb-3">
                    <div className="mr-4">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <img src={isClosed ? GrayCalender : RedCalender} />
                        </div>
                        <p className="text-caption1 text-neutral-dark-neutral200">
                          {date?.text}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2">
                        <img src={isClosed ? GrayClock : RedClock} />
                      </div>
                      <p className="text-caption1 text-neutral-dark-neutral200">
                        {date?.stDate?.time} - {date?.endDate?.time}
                      </p>
                    </div>
                  </div>
                  {isClosed ? (
                    <button className="rounded-lg p-3 bg-[#F9B4B6]">
                      <p className="text-[#C33025] text-xs font-bold">
                        {trans(locale, lang, 'statusEvent')}
                      </p>
                    </button>
                  ) : (
                    <p
                      className={clsx('font-bold text-caption1', {
                        ['text-[#FAAF4C]']: ['PRIVATE', 'SEMIPVT'].includes(
                          type,
                        ),
                        ['text-success-light-success60']: [
                          'PUBLIC',
                          'EXTPUBLIC',
                        ].includes(type),
                        ['text-[#6B7580]']: isClosed,
                      })}>
                      {tiketState}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LocationEvent = () => {
    return (
      <LayoutSection>
        <h1 className="text-xl font-bold mb-3">
          {trans(locale, lang, 'detailLokasi')}
        </h1>
        <div className="mb-5 flex">
          <div className="mr-2">
            <img src={RedBigPointer} />
          </div>
          <h3 className="text-md text-neutral-dark-neutral200">
            {event?.data?.location?.name}
          </h3>
        </div>
        <p className="text-caption1 text-neutral-dark-neutral200 mb-3">
          {event?.data?.location?.address}
        </p>
        <div className="flex">
          {event?.data?.location?.latitude &&
          event?.data?.location?.longitude ? (
            <button className="mr-3 rounded-lg shadow p-3" onClick={toLocation}>
              <div className="mb-2">
                <img src={RedRightLaneSign} className="mx-auto" />
              </div>
              <p className="font-bold text-xs text-center">
                {trans(locale, lang, 'maps')}
              </p>
            </button>
          ) : null}
          <button className="mr-3 rounded-lg shadow p-3" onClick={contactUs}>
            <div className="mb-2">
              <img src={RedHandlePhone} className="mx-auto" />
            </div>
            <p className="font-bold text-xs text-center">
              {trans(locale, lang, 'hubungiKami')}
            </p>
          </button>
        </div>
      </LayoutSection>
    );
  };

  const AboutEvent = () => {
    return (
      <LayoutSection>
        <h1 className="text-xl font-bold mb-5">
          {trans(locale, lang, 'tentangEvent')}
        </h1>
        <div className="listInformation text-caption1 text-neutral-dark-neutral200">
          {event?.data?.detail?.description
            ? parser(event?.data?.detail?.description)
            : null}
        </div>
      </LayoutSection>
    );
  };

  const HightLightEvent = () => {
    return (
      <LayoutSection>
        <h1 className="text-xl font-bold mb-5">
          {trans(locale, lang, 'highLight')}
        </h1>
        <div className="listInformation text-caption1 text-neutral-dark-neutral200">
          {event?.data?.detail?.highlight
            ? parser(event?.data?.detail?.highlight)
            : null}
        </div>
      </LayoutSection>
    );
  };

  const GuestStartEvent = () => {
    if (event?.data?.guestStar?.length > 0) {
      return (
        <div className="mb-5">
          <h1 className="text-xl font-bold mb-5">
            {trans(locale, lang, 'bintangTamu')}
          </h1>
          <div className="flex w-full md:w-1/2 overflow-auto">
            {event?.data?.guestStar?.map((item, index) => {
              return (
                <div key={index} className="text-center mr-3">
                  <div style={{ width: '90px' }}>
                    <div className="mb-2 rounded-full overflow-hidden">
                      <div
                        style={{
                          height: '90px',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          background: 'black',
                        }}>
                        <div>
                          <img src={item?.profilePhoto} />
                        </div>
                      </div>
                    </div>
                    <p className="text-caption1 text-neutral-dark-neutral200">
                      {item?.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const ProductEvent = () => {
    if (event?.data?.price === 0) {
      return (
        <div className="mb-5 w-full md:w-1/2">
          <h1>{parser(trans(locale, lang, 'gratisKeuntungan'))}</h1>
          <PannelProduct />
          <p className="mt-3">
            {parser(
              trans(locale, lang, 'messageQuotaLs').replace(
                '3%C',
                event?.data?.quotaLifesaver?.toString(),
              ),
            )}
          </p>
        </div>
      );
    } else {
      return (
        <div className="mb-5 w-full md:w-1/2">
          <h1>{parser(trans(locale, lang, 'keuntungan'))}</h1>
          <PannelProduct />
        </div>
      );
    }
  };

  const OtherInformation = () => {
    return (
      <div className="w-full md:w-1/2">
        {event?.data?.otherInformation?.map((item, index) => {
          return (
            <div key={index} className="mb-5">
              <PanelDropdown title={item?.title}>
                <div className="p-4">
                  <div className="listInformation text-caption1 text-neutral-dark-neutral200">
                    {item?.description ? parser(item?.description) : null}
                  </div>
                </div>
              </PanelDropdown>
            </div>
          );
        })}
      </div>
    );
  };

  const ButtonRegister = () => {
    return (
      <div className="bg-white shadow py-3 px-[5%] w-full fixed left-0 bottom-0 md:rounded-[16px] md:px-5 md:w-1/3 md:sticky md:float-right md:top-5 md:bottom-auto z-50">
        <div className="flex justify-between mb-2">
          <p className="text-sm font-bold text-[#666B6F]">Total</p>
          <div>
            <span className="text-success-light-success60 font-bold text-caption1">
              {formatRibuan(event?.data?.price, 'Rp. ', '.-') === 'Rp. 0.-'
                ? 'FREE'
                : formatRibuan(event?.data?.price, 'Rp. ', '.-')}{' '}
            </span>
          </div>
        </div>
        {event?.data?.type !== 'EXTPUBLIC' ? (
          <div className="px-10">
            {parser(trans(locale, lang, 'messageLifeSaver'))}
          </div>
        ) : null}
        <div>
          <Button
            disabled={
              event?.data?.isClosedRegister ||
              event?.data?.alreadyBought ||
              event?.data?.closed
            }
            full
            type="linear-gradient"
            className="text-sm px-7"
            onButtonClick={_handleRegister}>
            {isLoading
              ? trans(locale, lang, 'loadAvail')
              : trans(locale, lang, buttonText)}
          </Button>
        </div>
      </div>
    );
  };
  // ----------------

  const buttonText = event?.data?.alreadyBought
    ? 'registered'
    : event?.data?.isClosedRegister || event?.data?.closed
    ? 'closed'
    : 'avail';

  const titleWatoShare = `Ayo ikut event ${event?.data?.name}. Banyak kegiatan seru lho, jangan sampai ketinggalan!.`;

  return (
    <div>
      <HeaderEvent
        title={trans(locale, lang, 'titleHeader')}
        activeShareFitur
        urlToShare={urlToShare}
        lang={lang}
        titleWatoShare={titleWatoShare}
        getShortLink={getShortLink}
        pathname={to || ''}
      />
      <Container className="pt-4 px-[5%] pb-40 md:pb-4" fullScreen noBackground>
        <div className="mb-5">
          <CardHeader
            name={event?.data?.name}
            startDate={event?.data?.startDateTime}
            endDate={event?.data?.endDateTime}
            type={event?.data?.type}
            thumb={event?.data?.detail?.highlightImage}
            price={event?.data?.price}
            isClosedRegister={event?.data?.isClosedRegister}
            alreadyBought={event?.data?.alreadyBought}
            lang={lang}
            isClosed={event?.data?.closed}
          />
        </div>
        <ButtonRegister />
        <LocationEvent />
        <AboutEvent />
        <HightLightEvent />
        <GuestStartEvent />
        <ProductEvent />
        <OtherInformation />
        <ModalAccessCode
          isOpen={isOpenModalAccessCode}
          lang={lang}
          errMsg={errMsg}
          onSubmit={() => {
            buyTiket();
            // return router.push({
            //   pathname: NAVIGATION.EVENT.EventConfirmClaim,
            //   query: {
            //     eventCode: event?.data?.eventCode, ...event?.data?.product,
            //     planName: getCurrentSubsResponse?.planName,
            //     accessCode: accessCode,
            //     eventId: event?.data?.id,
            //   },
            // })
          }}
          onClose={() => {
            setIsOpenModalAccessCode(false);
            setErrMsg(null);
          }}
          onChange={(value) => {
            setEventParam({
              screen: router.pathname,
              accessCode: value,
              eventId: event?.data?.id,
            });
          }}
        />
      </Container>
    </div>
  );
}
