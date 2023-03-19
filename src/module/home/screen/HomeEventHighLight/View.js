import locale from './locale';
import eventMainLocale from '@cp-module/event/screen/EventMain/locale';
import { trans } from '@cp-util/trans';
import { useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION } from '@cp-util/constant';
import { CardEventHightLighted } from '@cp-component';
import { ModalAccessCode } from '@cp-module/event/components';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import clsx from 'classnames';
import {
  BannerHomeLifetag,
  BannerHomeLifetagEn,
  BannerClaimId,
  BannerClaimEn,
} from '@cp-config/Images';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  getEventDetailApi,
  getEventDetailPublicApi,
} from '@cp-module/event/eventApi';
import {
  GET_POLICY_WIDGET_HOME_PUBLIC_FAILED,
  GET_POLICY_WIDGET_HOME_PUBLIC_SUCCESS,
} from '@cp-module/home/homeConstant';

export default function Page({
  getEventUpcoming,
  getEventUpcomingResponse,
  lang,
  token,
  userData,
  homeAction,
  getLifetagFlag,
  getLifetagFlagResponse,
  getLifetagLinkedList,
  getLifetagLinkedListResponse,
  setAvailableOnMobile,
  getPolicyWidgetHome,
  getPolicyWidgetHomeResponse,
  getPolicyWidgetHomePublic,
  getPolicyWidgetHomePublicError,
  getPolicyWidgetHomePublicResponse,
  setEventParam,
}) {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState('');
  const [eventRender, setEventRender] = useState([]);
  const [modalAccessCode, setOpenModalAccessCode] = useState(false);
  const [eventId, setEventId] = useState('');
  const [slugId, setSlugId] = useState('');
  const [errMsgAccessCode, setErrMsgAccessCode] = useState(null);
  const [showTotalClaim, setShowTotalClaim] = useState(false);
  const [eventBanner, setEventBanner] = useState(false);

  useEffect(() => {
    getEventUpcoming({ lang: lang, userId: userData?.userId });
  }, []);

  // init banner
  const claimBanner = {
    type: 'CLAIM_BANNER',
    banner: [
      {
        url: lang == 'id' ? BannerClaimId : BannerClaimEn,
        position: 0,
      },
    ],
  };
  const lifetagBanner = {
    type: 'LIFETAG_BANNER',
    banner: [
      {
        url: lang == 'id' ? BannerHomeLifetag : BannerHomeLifetagEn,
        position: 0,
      },
    ],
  };

  useEffect(() => {
    if (getEventUpcomingResponse) {
      const data = getEventUpcomingResponse?.data?.filter(
        (item) => item.isHighlighted && !item.closed,
      );
      setEventBanner(data);
    }
  }, [getEventUpcomingResponse]);

  useEffect(() => {
    // getPolicyWidgetHomePublic();
    if (token) {
      // getLifetagFlag();
      // getLifetagLinkedList();

      if (userData?.alreadyKYC) {
        getPolicyWidgetHome();
      }
    }
  }, [token]);

  const setHomeResult = useCallback(
    (act) => {
      if (act === GET_POLICY_WIDGET_HOME_PUBLIC_SUCCESS) {
        setShowTotalClaim(true);
      }
      if (act === GET_POLICY_WIDGET_HOME_PUBLIC_FAILED) {
        if (getPolicyWidgetHomePublicError?.message === 'TOTAL_CLAIM_ERROR') {
          setShowTotalClaim(false);
        }
      }
    },
    [getPolicyWidgetHomePublicError?.message],
  );

  useEffect(() => {
    setHomeResult(homeAction);
  }, [homeAction, setHomeResult]);

  // const lifetagFlag = useMemo(() => {
  //   return getLifetagFlagResponse?.data;
  // }, [getLifetagFlagResponse?.data]);

  // const lifetagLinkedList = useMemo(() => {
  //   return getLifetagLinkedListResponse?.data || [];
  // }, [getLifetagLinkedListResponse?.data]);

  useEffect(() => {
    if (eventBanner?.length) {
      const bannerTemp = [...eventBanner];
      // if (!lifetagFlag?.data?.alreadyOrderLifeTag) {
      //   bannerTemp.push(lifetagBanner);
      // }
      if (showTotalClaim) {
        bannerTemp.push(claimBanner);
      }

      setEventRender(bannerTemp);
    }
  }, [
    eventBanner,
    // lifetagFlag?.alreadyOrderLifeTag,
    userData?.alreadyKYC,
    showTotalClaim,
  ]);

  useEffect(() => {
    if (getEventUpcomingResponse?.data?.length > 0) {
      const eventBanner = getEventUpcomingResponse?.data?.filter(
        (item) => item.isHighlighted && !item.closed,
      );
      setEventRender(eventBanner);
    }
  }, [getEventUpcomingResponse]);

  const onDetail = (params) => {
    if (params?.type === 'PRIVATE') {
      setAvailableOnMobile(true);
    } else {
      router.push({
        pathname: `${NAVIGATION.EVENT.EventDetail}/${params?.slugId}`,
        query: {
          to: '/',
        },
      });
    }
  };

  const onChangeAccessCode = (value) => {
    setAccessCode(value);
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
          router.push({
            pathname: `${NAVIGATION.EVENT.EventDetail}/${slugId || id}`,
          });
        })
        .catch(() => {
          setErrMsgAccessCode({
            error: trans(eventMainLocale, lang, 'errMsgAccessCode'),
          });
        });
    } else {
      getEventDetailPublicApi(payload)
        .then(() => {
          setEventParam(payload);
          router.push({
            pathname: `${NAVIGATION.EVENT.EventDetail}/${slugId || id}`,
            query: {
              to: '/',
            },
          });
        })
        .catch(() => {
          setErrMsgAccessCode({
            error: trans(eventMainLocale, lang, 'errMsgAccessCode'),
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
  };

  const handleLifetag = () => {
    if (token) {
      router.push(NAVIGATION.LIFETAG.LifetagBanner);
    } else {
      router.push(
        { pathname: NAVIGATION.LIFETAG.LifetagBanner },
        NAVIGATION.LIFETAG.LifetagBanner,
      );
    }
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
    },
  };

  // component
  const RenderHighlight = () => {
    if (eventRender?.length > 0) {
      return (
        <div className="mb-5">
          <p className="font-bold text-xs xm:text-sm md:text-body1 mb-2 md:mb-4">
            {trans(locale, lang, 'title')}
          </p>
          {
            <Swiper
              {...swiperOption}
              pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-sorotan-pagination-bullet-active',
                type: 'bullets',
                modifierClass: 'swiper-sorotan-pagination-position-',
                bulletClass: 'swiper-sorotan-pagination-bullets',
              }}
              modules={[Pagination]}>
              {eventRender?.map((item, idx) => {
                return (
                  <SwiperSlide key={idx} className="px-1 pb-4 md:px-0">
                    <CardEventHightLighted
                      payload={item}
                      lang={lang}
                      getPolicyWidgetHomeResponse={getPolicyWidgetHomeResponse}
                      getPolicyWidgetHomePublicResponse={
                        getPolicyWidgetHomePublicResponse
                      }
                      onDetail={() => {
                        if (item?.type === 'LIFETAG_BANNER') {
                          handleLifetag();
                        } else {
                          if (item.type === 'PRIVATE' && !item?.alreadyBought) {
                            setOpenModalAccessCode(true);
                            setEventId(item?.id);
                            setSlugId(item?.slugId);
                          } else {
                            onDetail(item);
                          }
                        }
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          }
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className={clsx(
        'max-w-6xl mx-auto pt-4 mt-3 border-b-2 lg:pt-5 lg:mb-7',
        eventRender?.length > 0 ? 'border-t-2 pb-4' : '',
      )}>
      <RenderHighlight />
      <ModalAccessCode
        lang={lang}
        onChange={onChangeAccessCode}
        onClose={onCloseModalAccessCode}
        onSubmit={onSubmitAccessCode}
        errMsg={errMsgAccessCode}
        isOpen={modalAccessCode}
      />
    </div>
  );
}
