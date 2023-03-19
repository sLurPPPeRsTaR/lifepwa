import { React, useEffect, useState } from 'react';
import locale from './locale';
import { trans } from '@cp-util/trans';

import {
  Lifesaver1,
  Lifesaver2,
  Lifesaver3,
  Lifesaver4,
} from '@cp-config/Svgs';
import { Claim, LsCard2, LifeSaver, LifeSaverPlus, } from '@cp-config/Images';
import Slider from 'react-slick';
import { setRupiah } from '@cp-util/common';

export default function Page(props) {
  const { lang, getTotalClaim, getTotalClaimResponse, token } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
      getTotalClaim();
  }, []);

  const data = [
    {
      img: LsCard2,
      embed: (
        <iframe
          className="h-full w-[220px] xm:w-[280px] md:w-[450px] lg:w-[550px] xl:w-[680px]  h-[190px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[460px]"
          src="https://www.youtube.com/embed/lowXL5cVtSg"
          title="#NeverGameOver - Bangkit Lebih Kuat (Muhammad Fadli's Story)"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      ),
    },
    {
      img: LsCard2,
      embed: (
        <iframe
          className="h-full w-[220px] xm:w-[280px] md:w-[450px] lg:w-[550px] xl:w-[680px] h-[190px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[460px]"
          src="https://www.youtube.com/embed/9F1t7exW5-o"
          title="#NeverGameOver - Menjadi yang Terdepan untuk Mengulurkan Tangan"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      ),
    },
    {
      img: LsCard2,
      embed: (
        <iframe
          className="h-full w-[220px] xm:w-[280px] md:w-[450px] lg:w-[550px] xl:w-[680px] h-[190px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[460px]"
          src="https://www.youtube.com/embed/68tV4Tj9ai4"
          title="#NeverGameOver - Siapapun Bisa Jadi Life Saver"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      ),
    },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    beforeChange: (prev, next) => {
      setCurrentSlide(next);
    },
    appendDots: (dots) => (
      <div className="!-bottom-10">
        <ul className="m-0 flex gap-2">
          {dots.map((e, i) => (
            <li
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`!h-2 md:!h-3 rounded-full ${
                i == currentSlide
                  ? '!w-16 md:!w-20 bg-red-500'
                  : '!w-2 md:!w-3 bg-white '
              }`}>
              {e.props.children}
            </li>
          ))}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`h-full w-full rounded-full ${
          i == currentSlide ? 'bg-red-500' : 'bg-gray-300'
        }`}></div>
    ),
  };

  const dataException = [
    {
      icon: Lifesaver1,
      title: 'expTitle1',
      subtitle: 'expSubtitle1',
    },
    {
      icon: Lifesaver2,
      title: 'expTitle2',
      subtitle: 'expSubtitle2',
    },
    {
      icon: Lifesaver3,
      title: 'expTitle3',
      subtitle: 'expSubtitle3',
    },
    {
      icon: Lifesaver4,
      title: 'expTitle4',
      subtitle: 'expSubtitle4',
    },
  ];

  return (
    <>
      {getTotalClaimResponse?.totalClaim ? (
        <div className='flex flex-col md:px-16 xs:px-5 xs:py-0 md:pt-2 bg-orange-100'>
          <div className='text-center py-2 font-semibold xs:text-md md:text-h5'>
            {trans(locale, lang, 'totalKlaim')}
          </div>
          <div className='flex flex-row justify-center items-center w-full bg-white py-5 px-10 rounded-lg shadow-md'>
            <img src={Claim} className='md:w-20 xs:w-10' />
            <text className='font-semibold xs:text-xs md:text-h5 whitespace-nowrap ml-2'>
              {setRupiah(getTotalClaimResponse?.totalClaim, lang)}
            </text>
          </div>
          <div className='flex flex-row h-auto p-4 items-center justify-end'>
            <img src={LifeSaver} className="xs:w-20 md:w-40 mr-5" />
            <img src={LifeSaverPlus} className="xs:w-20 md:w-40" />
          </div>
        </div>
      ) : null}
      <div className="max-w-6xl mx-auto px-[5%] lg:px-0 my-10">
        <div className='flex items-center justify-center'>
          <div className="text-center md:w-[40%] font-semibold xs:text-md md:text-h5">
            {trans(locale, lang, 'lanjutkanHobimu')}
          </div>
        </div>
        <div className="text-center font-bold xs:text-md md:text-h5">
          #NeverGameOver
        </div>
        <div className="ml-5 h-[190px] sm:h-[240px] md:h-[280px] lg:h-[360px] xl:h-[460px]">
          <Slider {...settings}>
            {data?.map((item, idx) => (
              <div key={idx} className="pr-5">
                <div className="overflow-hidden w-full  rounded-xl md:rounded-3xl">
                  {item.embed}
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="mt-16 text-center font-bold pb-8 text-h6 md:text-h5 md:pb-12 lg:pb-20">
          {trans(locale, lang, 'pengecualian')}
        </div>
        <div className="w-full grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-4 lg:gap-6">
          {dataException.map((item, idx) => (
            <div
              data-aos="fade-up"
              data-aos-delay={150*idx}
              key={idx}
              className="p-4 bg-white border border-gray-200 shadow-xl rounded-2xl shadow-gray-100 lg:p-5">
              <img src={item.icon} className="mb-3 h-14 md:h-16 lg:h-20" />
              <p className="text-body2 font-bold mb-2 md:text-body1 lg:text-h6 md:mb-3">
                {trans(locale, lang, item.title)}
              </p>
              <p className="text-caption1 text-gray-600 pb-1 md:text-body2 lg:text-body1">
                {trans(locale, lang, item.subtitle)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
