import { HeaderEvent, TiketEvent, Container } from '@cp-component'
import locale from './locale'
import { trans } from '@cp-util/trans'
import { useRouter } from 'next/router'
import { BigTiket } from '@cp-config/Svgs'
import { NAVIGATION } from '@cp-util/constant'

export default function Page({
    lang,
    userData,
    getEventUserTicketResponse,
    setEventParam,
}) {
    const router = useRouter()
    const activeTickets = getEventUserTicketResponse?.data?.filter(item => !item?.event?.closed)
    const inActiveTickets = getEventUserTicketResponse?.data?.filter(item => item?.event?.closed)
    const isNothingTicketsToRender = userData?.userId === '' ? true : activeTickets?.length === 0 && inActiveTickets?.length === 0 ? true : false

    const onDetailTiket = (item) => {
        setEventParam({
            screen: NAVIGATION?.EVENT?.EventMain,
            eventId: item?.event?.id,
        });
        router.push({
            pathname: `${NAVIGATION.EVENT.EventDetail}/${item?.event?.slugId || item?.event?.id}`,
            query: {
                to: "/event/history/"
            }
        })
    }

    // Component
    const BlankPage = () => {
        return (
            <div className='flex items-center justify-center absolute top-1/2 left-1/2' style={{ transform: "translate(-50%, 50%)" }}>
                <div>
                    <div className='mb-5 flex justify-center'>
                        <div>
                            <img src={BigTiket} />
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

    const RenderTickets = ({ tickets }) => {
        return (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {
                    tickets?.length > 0 ?
                        tickets.map((item, index) => {
                            const thumb = item?.event?.banner.filter(item => item.position === 1)[0]?.url
                            return (
                                <div key={index} className="mb-2">
                                    <TiketEvent
                                        toDetail
                                        lang={lang}
                                        name={item?.event?.name}
                                        city={item?.event?.location?.city}
                                        thumb={thumb}
                                        startDate={item?.event?.startDateTime}
                                        endDate={item?.event?.endDateTime}
                                        isClosed={item?.event?.closed}
                                        onDetailTiket={() => {
                                            onDetailTiket(item)
                                        }}
                                    />
                                </div>
                            )
                        }) : null
                }
            </div>
        )
    }

    const ActiveTicketsRender = () => {
        if (activeTickets?.length > 0) {
            return (
                <div className='mb-3'>
                    <h1 className='text-sm md:text-md xl:text-lg font-bold mb-2 xl:mb-3'>{trans(locale, lang, 'eventOnGoing')}</h1>
                    <RenderTickets tickets={activeTickets} />
                </div>
            )
        } else {
            return null
        }
    }

    const InActiveTicketsRender = () => {
        if (inActiveTickets?.length > 0) {
            return (
                <div className='mb-3'>
                    <h1 className='text-sm md:text-md xl:text-lg font-bold mb-2 xl:mb-3'>{trans(locale, lang, 'eventEnd')}</h1>
                    <RenderTickets tickets={inActiveTickets} />
                </div>
            )
        } else {
            return null
        }
    }

    const PageRender = () => {
        return (
            <div>
                <ActiveTicketsRender />
                <InActiveTicketsRender />
            </div>
        )
    }
    // end Component

    return (
        <div>
            <HeaderEvent title={trans(locale, lang, 'headerTitle')} pathname={NAVIGATION.EVENT.EventMain} />
            <Container className="py-4 px-[5%]" fullScreen noBackground>
                <div className='relative'>
                    {
                        isNothingTicketsToRender ? <BlankPage /> : <PageRender />
                    }
                </div>
            </Container>
        </div>

    )
}