import classNames from 'classnames';
import {
    Swiper,
    SwiperSlide,
} from 'swiper/react';

export default function Components({ data, onClick }) {
    const swiperOption = {
        slidesPerView: 3,
        spaceBetween: 15,
    };

    return (
        <Swiper {...swiperOption}>
            {
                data?.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <button
                                className={classNames('text-xs sm:text-xs px-2 sm:py-1 sm:text-xs rounded-2xl text-[#FB909C] py-2 w-full', { "bg-[#FDE8EB]": item?.isActive })}
                                onClick={() => {
                                    onClick(item)
                                }}
                            >
                                {item?.name}
                            </button>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}