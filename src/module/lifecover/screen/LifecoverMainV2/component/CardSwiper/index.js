import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Mousewheel } from 'swiper';
import {
  LifecoverLandingV2Img1,
  LifecoverLandingV2Img2,
  LifecoverLandingV2Img3,
  LifecoverLogoLg,
  LifecoverLogoDarkLg,
  IllustrationCost,
  IllustrationFlexible,
  IllustrationPractical,
  IllustrationMuchBenefit,
  IllustrationSave,
  IllustrationCoverage,
  IllustrationMedicalCheck,
  IllustrationSuicide,
  IllustrationCriminal,
  IllustrationHospital,
  IllustrationCarCrash,
  IllustrationProtection,
  LsCard2,
} from '@cp-config/Images';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';

const CardSwiper = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, FreeMode, Mousewheel]}
        slidesPerView={2.3}
        spaceBetween={25}
        freeMode
        mousewheel
        pagination={{
          el: '#pagination-lifecover-main',
          clickable: true,
          enabled: true,
        }}
        className="swiper-yt-video">
        {data.map((ytData, idx) => (
          <SwiperSlide key={idx}>
            <div className="overflow-hidden w-full h-[190px] sm:h-[240px] md:h-[280px] lg:h-[376px] rounded-xl md:rounded-3xl">
              {ytData.embed}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        id="pagination-lifecover-main"
        className="swiper-pagination-yt-video mt-5"></div>
    </div>
  );
};

export default CardSwiper;
