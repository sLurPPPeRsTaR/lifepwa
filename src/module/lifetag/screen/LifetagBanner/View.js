import Slider from 'react-slick';
import { Icon } from 'react-icons-kit';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Alert } from '@cp-component';
import { trans } from '@cp-util/trans';
import { ic_west } from 'react-icons-kit/md';
import { NAVIGATION } from '@cp-util/constant';
import {
  LifeTagBanner1Mobile,
  LifeTagBanner1Desktop,
  LifeTagBanner2Mobile,
  LifeTagBanner2Desktop,
  LifeTagBanner3Mobile,
  LifeTagBanner3Desktop,
} from '@cp-config/Images';
import locale from './locale';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { androidAlert } from 'react-icons-kit/ionicons';

export default function View({ lang }) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings1 = {
    autoplay: true,
    fade: true,
    dots: true,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    beforeChange: (prev, next) => {
      setCurrentSlide(next);
    },
    appendDots: (dots) => (
      <ul className="m-0 flex gap-1">
        {dots.map((e, i) => (
          <li
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`!h-2 md:!h-2 rounded-full duration-500 ${
              i == currentSlide
                ? '!w-10 md:!w-12 bg-red-500'
                : '!w-5 md:!w-8 bg-white'
            }`}>
            {e.props.children}
          </li>
        ))}
      </ul>
    ),
    customPaging: (i) => (
      <div
        className={`h-full w-full rounded-full ${
          i == currentSlide ? 'bg-red-500' : 'bg-white'
        }`}></div>
    ),
  };

  const dataSlider = [
    {
      imgDesktop: LifeTagBanner1Desktop,
      imgMobile: LifeTagBanner1Mobile,
      title: trans(locale, lang, 'step1'),
    },
    {
      imgDesktop: LifeTagBanner2Desktop,
      imgMobile: LifeTagBanner2Mobile,
      title: trans(locale, lang, 'step2'),
    },
    {
      imgDesktop: LifeTagBanner3Desktop,
      imgMobile: LifeTagBanner3Mobile,
      title: trans(locale, lang, 'step3'),
    },
  ];

  return (
    <div className="relative">
      <div className="absolute z-20 top-6 md:top-10 px-0 md:px-[5%] w-full flex justify-between">
        <div className="pl-4 w-10" role="button">
          <Icon
            icon={ic_west}
            size={22}
            onClick={() => router.push(NAVIGATION.HOME.Home)}
            className="cursor-pointer text-white"
          />
        </div>
      </div>
      <div className="lifetag relative bg-black h-screen overflow-hidden">
        <div className="relative w-screen h-screen overflow-hidden">
          <img
            src={LifeTagBanner3Desktop}
            className="absolute top-0 left-0 z-0 w-full h-full object-cover object-center !hidden md:!block"
          />
          <img
            src={LifeTagBanner3Mobile}
            className="absolute bottom-[20%] -left-[8%] z-0 w-full h-full object-cover object-center !block md:!hidden"
          />
          <div className="absolute top-0 left-0 z-10 w-full h-full bg-black/40"></div>

          <div className="z-20 absolute w-full bottom-[8%] left-0">
            <div className="text-white px-4 mx-auto max-w-2xl w-full">
              {/* <p className="font-bold text-center text-base xm:text-lg md:text-2xl">
                {trans(locale, lang, 'judulLink')}
              </p>
              */}
              <p className="font-bold text-center text-sm xm:text-lg md:text-xl">
                {trans(locale, lang, 'subtitle')}
              </p>
              <p className="text-center text-[11px] pt-4 sm:py-4 md:py-6 xm:text-sm md:text-base">
                {trans(locale, lang, 'keterangan')}
              </p>

              <div className="flex justify-center mt-5">
                <Icon icon={androidAlert} size={20} className="relative -top-[2px] text-white pr-[2px] sm:pr-0 " />
                <p className="text-[10px] text-center xm:text-xs md:text-sm">
                  {trans(locale, lang, 'lifetagNote')}
                </p>
              </div>

              <Button
                type="linear-gradient"
                className="mt-4 text-xs w-full mx-auto !h-10 md:mt-8 md:!h-11 md:text-sm md:px-16"
                onButtonClick={() =>
                  router.push(
                    { pathname: NAVIGATION.LIFESAVER.LifesaverMain },
                    NAVIGATION.LIFESAVER.LifesaverMain,
                  )
                }>
                {trans(locale, lang, 'hubungkanLifetag')}
              </Button>
            </div>
          </div>
        </div>
        {/* <Slider {...settings1}>
          {dataSlider.map((item, idx) => (
            <div
              key={idx}
              className="relative w-screen h-screen overflow-hidden">
              <img
                src={item.imgDesktop}
                className="absolute top-0 left-0 z-0 w-full h-full object-cover object-center !hidden md:!block"
              />
              <img
                src={item.imgMobile}
                className="absolute top-0 left-0 z-0 w-full h-full object-cover object-center !block md:!hidden"
              />
              <div className="absolute top-0 left-0 z-10 w-full h-full bg-black/40"></div>

              <div className="z-20 absolute h-[300px] w-full bottom-[90px] xm:bottom-[120px] md:bottom-[160px]">
                <div className="text-white px-4 mx-auto max-w-xl w-full">
                  <p className="font-bold text-center text-base xm:text-lg md:text-2xl">
                    {trans(locale, lang, 'judulLink')}
                  </p>
                  <p className="text-center text-xs pt-4 xm:pt-6 xm:text-sm md:text-lg">
                    {trans(locale, lang, 'keterangan')}
                  </p>
                  <p className="text-center pb-16 pt-6 text-xs h-10 xm:pb-20 md:pb-28 md:pt-8 xm:text-sm md:text-lg">
                    {item.title}
                  </p>

                  <Alert
                    className="bg-transparent !items-start text-center"
                    iconColor="text-white">
                    {trans(locale, lang, 'lifetagNote')}
                  </Alert>

                  <Button
                    type="linear-gradient"
                    className="mt-4 text-xs w-fit mx-auto px-10 !h-10 md:mt-8 md:!h-11 xm:text-sm"
                    onButtonClick={() => console.log('')}>
                    {trans(locale, lang, 'hubungkanLifetag')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Slider> */}
      </div>
    </div>
  );
}
