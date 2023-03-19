import moment from "moment";
import propTypes from 'prop-types';
import {
    Swiper,
    SwiperSlide,
} from 'swiper/react';
import {
    Pagination,
    EffectFade
} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";

export default function Component({ data, lang, onClick }) {
    const HightLightArticle = ({ item }) => {
        moment.locale(lang)
        const { attributes } = item

        return (
            <button
                className="w-full my-3"
            >
                <div
                    className='relative rounded-2xl overflow-hidden bg-black h-44 md:h-56'
                >
                    <div style={{
                        position: "absolute",
                        left: "0",
                        top: "0",
                        zIndex: "0",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#080808"
                    }}>
                        <div className="">
                            <img src={attributes?.ImageLarge} width="100%" style={{ filter: "brightness(70%)" }} />
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 py-2 px-3 md:px-4'>
                        <div className='rounded-lg bg-[#FDE8EB] text-[#FF8694] p-1 sm:p-2 text-[9px] sm:text-xs'>
                            <p>{attributes?.category?.data?.attributes?.name}</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 text-white py-2 px-3 md:px-4 text-start">
                        <h1 className="font-bold text-sm multiline-ellipsis">{attributes?.Title}</h1>
                        <p className="text-xs mb-2 multiline-ellipsis">{attributes?.ShortArticle}</p>
                        <p className="text-[9px]">{moment(attributes?.publishedAt).format('YYYY, DD MMMM')}</p>
                    </div>
                </div>
            </button>
        )
    }

    return (
        <Swiper 
            slidesPerView={1} 
            modules={[Pagination, EffectFade]}
            effect={"fade"}
            pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-sorotan-pagination-bullet-active',
                type: 'bullets',
                modifierClass: 'swiper-topartikel-pagination-position-',
                bulletClass: 'swiper-topartikel-pagination-bullets',
            }}
        >
            {
                data?.map((item, index) => {
                    return(
                        <SwiperSlide key={index} onClick={() => {
                            onClick(item)
                        }}>
                            <HightLightArticle item={item} />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

const defaultProps = {
    data: [],
    lang: "id",
    onClick: () => {}
}

const proptype = {
    data: propTypes.array,
    lang: propTypes.oneOf(["id", "en"]),
    onClick: propTypes.func,
}

Component.defaultProps = defaultProps
Component.propTypes = proptype