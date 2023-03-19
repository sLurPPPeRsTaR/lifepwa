import { useRouter } from 'next/router'
import {
    Swiper,
    SwiperSlide,
} from 'swiper/react';
import {
    Pagination
} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import {
    NAVIGATION,
} from '@cp-util/constant';
import moment from 'moment';
import {
    useEffect,
} from 'react';
import proptypes from 'prop-types'
import { eventAppsflyer } from '@cp-util/func';

export default function Component({ data, lang, swiperOption, userId }) { 
    useEffect(() => {
        moment.locale(lang)
    }, [lang])
    
    const router = useRouter()

    const CardArticle = ({ data, onClick }) => {
        const { attributes } = data
        return (
            <button
                className="w-full pb-1"
                onClick={onClick}
            >
                <div
                    className='relative overflow-hidden rounded-xl sm:rounded-2xl border'
                >
                    <div className='h-[109px] md:h-[144px] overflow-hidden' style={{ backgroundImage: `url(${attributes?.ImageMedium})`, backgroundSize: "cover" }}>
                    </div>
                    <div className='absolute top-0 left-0 p-2'>
                        <div className='rounded-lg bg-[#FDE8EB] text-[#FF8694] p-1 sm:p-2 text-[9px] sm:text-xs'>
                            <p>{attributes?.category?.data?.attributes?.name}</p>
                        </div>
                    </div>
                    <div className='p-2 md:p-3 bg-white'>
                        <div className="relative h-20 md:h-28">
                            <div className="text-left">
                                <h1 className="font-bold text-[10px] md:text-sm mb-1 multiline-ellipsis">{attributes?.Title}</h1>
                                <p className="text-[9px] mb-4 md:text-xs multiline-ellipsis">{
                                    attributes?.ShortArticle
                                }</p>
                                <div className='absolute bottom-0 left-0'>
                                    <p className="text-[8px] sm:text-xs mb-1">{moment(attributes?.publishedAt).format('YYYY, DD MMMM')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        )
    }

    return (
        <Swiper
            {...swiperOption}
            pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-sorotan-pagination-bullet-active',
                type: 'bullets',
                modifierClass: 'swiper-article-pagination-position-',
                bulletClass: 'swiper-sorotan-pagination-bullets',
            }}
            modules={[Pagination]}>
            {
                data?.map((item, index) => {
                    return (
                        <SwiperSlide key={index} className="pb-5">
                            <CardArticle data={item} onClick={() => {
                                eventAppsflyer({
                                    eventName: 'af_article_detail',
                                    payload: { 
                                      af_user_id: userId,
                                      af_channel: "website",
                                      af_category_name: item?.attributes?.category?.data?.attributes?.name,
                                      af_article_title: item?.attributes?.Title,
                                      af_article_section: 'List Home',
                                      af_current_page: 1,
                                    },
                                });
                                router.push({ 
                                    pathname: `${NAVIGATION.ARTICLE.ArticleDetail}/${item?.attributes?.Slug}`
                                })
                            }} />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

const defaultProps = {
    data: [],
    lang: 'id',
    swiperOption:  {
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
            640: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    }
}

const propTypes = {
    data: proptypes.array,
    lang: proptypes.oneOf(['id', 'en'])
}

Component.defaultProps = defaultProps
Component.propTypes = propTypes