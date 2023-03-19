import { HeaderEvent, CardEvent, Container } from '@cp-component'
import { BigCalender } from '@cp-config/Svgs'
import { trans } from '@cp-util/trans'
import { NAVIGATION } from '@cp-util/constant'
import locale from './locale'
import localeMain from '@cp-module/event/screen/EventMain/locale'
import { getEventDetailApi } from '@cp-module/event/eventApi'
import { setEventRmvFavoriteApi, setEventAddFavoriteApi } from '@cp-module/event/eventApi'
import { useRouter } from 'next/router'
import { ModalAccessCode } from '@cp-module/event/components'
import { useState } from 'react'

export default function Page({
  lang,
  userData,
  getEventUpcomingResponse,
  setEventDetail,
  setModalAksesKode,
  setInternalServerError,
  setEventUpcoming,
  setEventParam,
}) {
  const router = useRouter()
  const cards = getEventUpcomingResponse?.data?.filter(item => item.watchlist)
  const [modalAccessCode, setOpenModalAccessCode] = useState(false);
  const [eventId, setEventId] = useState('');
  const [accessCode, setAccessCode] = useState('')
  const [errMsgAccessCode, setErrMsgAccessCode] = useState(null)
  const [slugId, setSlugId] = useState('')

  const redirectToDetail = (id) => {
    router.push({
      pathname: `${NAVIGATION.EVENT.EventDetail}/${id}`,
      query: {
        to: NAVIGATION.EVENT.EventFavorite
      }
    })
  }

  const toPublicDetail = (params) => {
    getEventDetailApi({
      eventId: params?.slugId,
      lang: lang
    })
      .then(({data}) => {
        setEventDetail(data)
        redirectToDetail(data?.data?.slugId || data?.data?.id)
      })
      .catch(() => {
        setInternalServerError({ isOpen: true, lang: lang })
      })
  }

  const addFavourite = (item) => {
    if (userData?.userId === '') {
      router.push(NAVIGATION.LOGIN.Login)
    } else {
      if (item.watchlist) {
        setEventRmvFavoriteApi({ eventId: item.id })
          .then(() => {
            let data = getEventUpcomingResponse?.data?.map(event => {
              if (event.watchlist && item.id === event.id) {
                return {
                  ...event,
                  watchlist: false
                }
              } else {
                return event
              }
            })
            setEventUpcoming({ data: data })
          })
          .catch(() => {
            setInternalServerError({ isOpen: true, lang: lang })
          })
      } else {
        setEventAddFavoriteApi({ eventId: item.id })
          .then(() => {
            let data = getEventUpcomingResponse?.data?.map(event => {
              if (!event.watchlist && item.id === event.id) {
                return {
                  ...event,
                  watchlist: true
                }
              } else {
                return event
              }
            })
            setEventUpcoming({ data: data })
          })
          .catch(() => {
            setInternalServerError({ isOpen: true, lang: lang })
          })
      }
    }
  }

  const onChangeAccessCode = (value) => {
    setAccessCode(value)
    setErrMsgAccessCode(null)
  }

  const onCloseModalAccessCode = () => {
    setOpenModalAccessCode(false)
    setErrMsgAccessCode(null)
    setEventId('')
    setSlugId('')
    setEventParam({
      screen: '',
      accessCode: '',
      eventId: '',
    });
  }

  const onSubmitAccessCode = () => {
    const payload = {
      screen: router.pathname,
      accessCode: accessCode,
      eventId: slugId || eventId,
      lang: lang,
    }

    getEventDetailApi(payload)
      .then(({data}) => {
        setEventParam(payload);
        redirectToDetail(data?.data?.slugId || data?.data?.id)
      })
      .catch(() => {
        setErrMsgAccessCode({
          error: trans(localeMain, lang, 'errMsgAccessCode')
        })
      })
  }


  const BlankRender = () => {
    return (
      <div className='flex items-center justify-center absolute top-1/2 left-1/2' style={{ transform: "translate(-50%, 50%)" }}>
        <div>
          <div className='mb-5 flex justify-center'>
            <div>
              <img src={BigCalender} />
            </div>
          </div>
          <div className='mb-3'>
            <h1 className='font-bold text-2xl text-center'>Oops!</h1>
          </div>
          <div className=''>
            <p className='text-center text-sm text-[#6B7580]' style={{ maxWidth: "450px" }}>{trans(locale, lang, 'messageEmptyRender')}</p>
          </div>
        </div>
      </div>
    )
  }

  const PageRender = () => {
    if (cards?.length > 0) {
      return (
        <div>
          <div className='my-5'>
            <h1 className='text-sm md:text-md xl:text-lg font-bold mb-2 xl:mb-3'>{trans(locale, lang, 'titlePage')}</h1>
          </div>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
            {
              cards?.map((item, index) => {
                if (item?.watchlist) {
                  return (
                    <div key={index}>
                      <CardEvent
                        name={item?.name}
                        quotaEvent={item?.quotaEvent - item?.userRegistered}
                        userRegistered={item?.userRegistered}
                        type={item?.type}
                        city={item?.location?.city}
                        thumb={item?.detail?.highlightImage}
                        price={item?.price}
                        startDate={item?.startDateTime}
                        endDate={item?.endDateTime}
                        isClosed={item?.closed}
                        watchlist={item?.watchlist}
                        alreadyBought={item?.alreadyBought}
                        isClosedRegister={item?.isClosedRegister}
                        onButtonClick={() => {
                          if (item?.type === 'PRIVATE' && !item?.alreadyBought) {
                            setEventId(item?.id);
                            setOpenModalAccessCode(true);
                            setSlugId(item?.slugId)
                          } else {
                            toPublicDetail(item);
                          }
                        }}
                        lang={lang}
                        onClickFavourite={() => {
                          addFavourite(item)
                        }}
                      />
                    </div>
                  );
                }
              })
            }
          </div>
        </div>
      )
    } else {
      return <BlankRender />
    }
  }

  return (
    <div>
      <HeaderEvent title={trans(locale, lang, 'titleHeader')} pathname={NAVIGATION.EVENT.EventMain} />
      <Container className="py-4 px-[5%]" fullScreen noBackground>
        <div className='relative'>
          <PageRender />
          <ModalAccessCode
            lang={lang}
            onChange={onChangeAccessCode}
            onClose={onCloseModalAccessCode}
            onSubmit={onSubmitAccessCode}
            isOpen={modalAccessCode}
            errMsg={errMsgAccessCode}
          />
        </div>
      </Container>
    </div>
  )
}