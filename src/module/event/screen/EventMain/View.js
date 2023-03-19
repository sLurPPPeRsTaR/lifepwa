import { Container, CardEvent, HeaderEvent, TiketEvent } from '@cp-component';
import {
  setEventAddFavoriteApi,
  setEventRmvFavoriteApi,
} from '@cp-module/event/eventApi';
import { NAVIGATION } from '@cp-util/constant';
import { Tiket } from '@cp-config/Svgs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { trans } from '@cp-util/trans';
import locale from './locale';
import {
  GET_EVENT_UPCOMING_SUCCESS,
  GET_EVENT_UPCOMING_FAILED,
  GET_EVENT_USERTICKET_SUCCESS,
  GET_EVENT_USERTICKET_FAILED,
} from '@cp-module/event/eventConstant';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { ModalAccessCode } from '@cp-module/event/components';
import {
  getEventDetailApi,
  getEventDetailPublicApi,
} from '@cp-module/event/eventApi';
import { eventAppsflyer } from '@cp-util/func';

export default function Page(props) {
  const {
    userData,
    lang,
    getEventUpcoming,
    getEventUpcomingResponse,
    getEventUserTicketResponse,
    setEventDetail,
    getEventUserTicket,
    action,
    setLoading,
    setInternalServerError,
    setEventParam,
    setEventUpcoming,
  } = props;

  const router = useRouter();

  const mybg = {
    background: '#FDE4C4',
    width: '94px',
    height: '94px',
    borderRadius: '50%',
    position: 'absolute',
    zIndex: '-1',
    left: '-40px',
    top: '-25px',
  };

  const swiperOption = {
    slidesPerView: 1,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      modules: [Autoplay],
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
      },
    },
  };

  const [isGetResponseUpcoming, setIsGetResponseUpcoming] = useState(false);
  const [isGetResponseTiket, setIsGetResponseTiket] = useState(false);
  const [showTickets, setShowTickets] = useState([]);
  const [modalAccessCode, setOpenModalAccessCode] = useState(false);
  const [eventId, setEventId] = useState('');
  const [slugId, setSlugId] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [errMsgAccessCode, setErrMsgAccessCode] = useState('');
  const windowLocal = typeof window !== 'undefined' && window;

  useEffect(() => {
    const handleBack = () => {
      // logic untuk menangani back browser
      // misalnya mengarahkan user ke halaman sebelumnya

      router.push('/');
    };

    windowLocal.addEventListener('popstate', handleBack);
    return () => {
      windowLocal.removeEventListener('popstate', handleBack);
    };
  }, []);

  useEffect(() => {
    console.log(userData?.userId);
    setLoading(true);
    getEventUpcoming({
      userId: userData?.userId,
      lang: lang,
    });

    if (userData?.userId !== '') {
      getEventUserTicket({ lang: lang });
    } else {
      setIsGetResponseTiket(true);
    }
  }, []);

  useEffect(() => {
    if (action) {
      if (action === GET_EVENT_UPCOMING_SUCCESS) {
        setIsGetResponseUpcoming(true);
      }

      if (action === GET_EVENT_UPCOMING_FAILED) {
        setIsGetResponseUpcoming(true);
      }
    }
  }, [getEventUpcomingResponse]);

  useEffect(() => {
    if (action) {
      if (action === GET_EVENT_USERTICKET_SUCCESS) {
        setIsGetResponseTiket(true);
        const tickets = getEventUserTicketResponse?.data?.filter(
          (item) => !item.event.closed,
        );
        setShowTickets(tickets);
      }

      if (action === GET_EVENT_USERTICKET_FAILED) {
        setIsGetResponseTiket(true);
      }
    }
  }, [getEventUserTicketResponse]);

  useEffect(() => {
    if (isGetResponseUpcoming && isGetResponseTiket) {
      setLoading(false);
    }
  }, [isGetResponseUpcoming, isGetResponseTiket]);

  const addFavourite = (item) => {
    if (userData?.userId === '') {
      router.push(NAVIGATION?.LOGIN?.Login);
    } else {
      if (item?.watchlist) {
        setEventRmvFavoriteApi({ eventId: item?.id })
          .then(() => {
            let data = getEventUpcomingResponse?.data?.map((event) => {
              if (event?.watchlist && item?.id === event?.id) {
                return {
                  ...event,
                  watchlist: false,
                };
              } else {
                return event;
              }
            });
            setEventUpcoming({ data: data });
          })
          .catch(() => {
            setInternalServerError({ isOpen: true, lang: lang });
          });
      } else {
        setEventAddFavoriteApi({ eventId: item.id })
          .then(() => {
            let data = getEventUpcomingResponse?.data?.map((event) => {
              if (!event?.watchlist && item?.id === event?.id) {
                return {
                  ...event,
                  watchlist: true,
                };
              } else {
                return event;
              }
            });
            setEventUpcoming({ data: data });
          })
          .catch(() => {
            setInternalServerError({ isOpen: true, lang: lang });
          });
      }
    }
  };

  const onDetailTicket = (item) => {
    setEventParam({
      screen: NAVIGATION?.EVENT?.EventMain,
      eventId: item?.event?.id,
    });

    setEventDetail({ data: item?.event, ticket: item?.ticket });

    if (item?.event?.type === 'EXTPUBLIC') {
      router.push({
        pathname: NAVIGATION?.EVENT?.EventVoucherQrCode,
      });

      return;
    }

    if (['PRIVATE', 'SEMIPVT', 'PUBLIC'].includes(item?.event?.type)) {
      router.push(
        {
          pathname: NAVIGATION?.EVENT?.EventVoucherQrCode,
          query: {
            eventId: item?.event?.id,
          },
        },
        NAVIGATION?.EVENT?.EventVoucherQrCode,
      );

      return;
    }
  };

  const onChangeAccessCode = (value) => {
    setAccessCode(value);
    setErrMsgAccessCode(null);
  };

  const onSubmitAccessCode = () => {
    const payload = {
      screen: router.pathname,
      accessCode: accessCode,
      eventId: eventId,
      lang: lang,
    };

    if (userData.userId !== '') {
      getEventDetailApi(payload)
        .then(() => {
          setEventParam(payload);
          router.push(`${NAVIGATION.EVENT.EventDetail}/${slugId || eventId}`);
        })
        .catch(() => {
          setErrMsgAccessCode({
            error: trans(locale, lang, 'errMsgAccessCode'),
          });
        });
    } else {
      getEventDetailPublicApi(payload)
        .then(() => {
          setEventParam(payload);
          router.push(`${NAVIGATION.EVENT.EventDetail}/${slugId || eventId}`);
        })
        .catch(() => {
          setErrMsgAccessCode({
            error: trans(locale, lang, 'errMsgAccessCode'),
          });
        });
    }
  };

  const onCloseModalAccessCode = () => {
    setEventParam({
      screen: '',
      accessCode: '',
      eventId: '',
    });
    setOpenModalAccessCode(false);
    setErrMsgAccessCode(null);
    setEventId('');
    setSlugId('');
  };

  // Component
  const RenderBlankTicket = () => {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <div className="rounded-2xl shadow-lg flex items-center overflow-hidden py-3 px-3 w-full">
          <div className="relative mr-7">
            <div style={mybg}></div>
            <div>
              <img src={Tiket} />
            </div>
          </div>
          <div>
            <span className="text-[#6B7580] text-xs md:text-sm font-bold">
              {trans(locale, lang, 'textTidakAdaTiket')}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const RenderTickets = () => {
    return (
      <div>
        <Swiper {...swiperOption}>
          {showTickets?.map((item, index) => {
            return (
              <SwiperSlide className="p-1" key={index}>
                <TiketEvent
                  toTiket
                  name={item?.event?.name}
                  city={item?.event?.location?.city}
                  thumb={
                    item?.event?.banner.filter((item) => item.position === 1)[0]
                      ?.url
                  }
                  startDate={item?.event?.startDateTime}
                  endDate={item?.event?.endDateTime}
                  isClosed={item?.event?.closed}
                  lang={lang}
                  onDetailTiket={() => {
                    onDetailTicket(item);
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };

  const RenderCards = () => {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {getEventUpcomingResponse?.data?.map((item, index) => {
          return (
            <div key={index}>
              <CardEvent
                name={item?.name}
                quotaEvent={item?.quotaEvent - item?.userRegistered}
                userRegistered={item?.userRegistered}
                type={item?.type}
                city={item?.location?.city}
                thumb={item?.detail?.highlightImage}
                price={item.price}
                startDate={item?.startDateTime}
                endDate={item?.endDateTime}
                watchlist={item?.watchlist}
                alreadyBought={item?.alreadyBought}
                isClosedRegister={item?.isClosedRegister}
                isClosed={item?.closed}
                onButtonClick={() => {
                  setEventParam({
                    screen: NAVIGATION?.EVENT?.EventMain,
                    eventId: item?.event?.id,
                  });

                  eventAppsflyer({
                    eventName: 'af_event_list_click',
                    payload: {
                      af_user_id: userData.userId,
                      af_channel: 'website',
                      af_event_name: item?.name,
                    },
                  });

                  if (item?.type === 'PRIVATE' && !item?.alreadyBought) {
                    setOpenModalAccessCode(true);
                    setEventId(item?.id);
                    setSlugId(item?.slugId);
                  } else {
                    router.push(
                      `${NAVIGATION?.EVENT?.EventDetail}/${
                        item?.slugId || item?.id
                      }`,
                    );
                  }
                }}
                lang={lang}
                onClickFavourite={() => {
                  addFavourite(item);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <HeaderEvent title="Event" activeRightMenu={true} pathname="/" />
      <Container className="py-4 px-[5%]" fullScreen noBackground>
        <div className="mb-10">
          <h1 className="text-sm md:text-md xl:text-lg font-bold mb-2 xl:mb-3">
            {trans(locale, lang, 'headingTiket')}
          </h1>
          {showTickets?.length ? <RenderTickets /> : <RenderBlankTicket />}
        </div>
        <div>
          <h1 className="text-sm md:text-md xl:text-lg font-bold mb-2 xl:mb-3">
            {trans(locale, lang, 'headingEvent')}
          </h1>
          <RenderCards />
        </div>
        <ModalAccessCode
          lang={lang}
          onChange={onChangeAccessCode}
          onClose={onCloseModalAccessCode}
          onSubmit={onSubmitAccessCode}
          isOpen={modalAccessCode}
          errMsg={errMsgAccessCode}
        />
      </Container>
    </div>
  );
}
