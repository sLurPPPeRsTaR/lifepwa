import locale from './locale';
import { Icon } from 'react-icons-kit';
import { useState, useEffect } from 'react';
import { trans } from '@cp-util/trans';
import { ActivitySpecial, ActivitySpecialEng } from '@cp-config/Images';
import { chevronDown, check } from 'react-icons-kit/feather';

import {
  LsHill2,
  LsBicycle,
  LsCloud,
  LsDiving,
  LsFlag,
  LsMtb,
  LsSkateBoard,
  LsSnorkeling,
  LsVector21,
  LsVector22,
  LsBgMobile,
  LsBgDesktop,
} from '@cp-config/Images';
import { Parallax } from 'react-scroll-parallax';

export default function Page(props) {
  const { width, setShowDetailListProtectMain, lang } = props;
  const [showDetailListProtect, setShowDetailListProtect] = useState({
    list: [],
    status: false,
  });

  const translate = (val) => trans(locale, lang, val);

  const listProtect = [
    {
      title: 'darat',
      icon: LsBicycle,
      list: [
        'atletik',
        'badminton',
        'basketball',
        'baseball',
        'berkuda',
        'BMX',
        'bowling',
        'bungeeJumping',
        'cheerleading',
        'golf',
        'hiking',
        'lompatTinggi',
        'marathon',
        'mendakiGunung',
        'olahragaBermotor',
        'panjatTebing',
        'running',
        'sepakbola',
        'sepatuRoda',
        'sepeda',
        'skateboarding',
        'softball',
        'squash',
        'tenisLapangan',
        'tenisMeja',
        'trampolining',
        'triathlon',
        'voli',
        'quadBikeRiding',
      ],
    },
    {
      title: 'udara',
      icon: LsCloud,
      list: [
        'baseJumping',
        'hangGliding',
        'paragliding',
        'paramotor',
        'skyDiving',
        'wingsuitFlying',
      ],
    },
    {
      title: 'other',
      icon: LsFlag,
      list: ['berkendara', 'naikKendaraanUmum'],
    },
    {
      title: 'air',
      icon: LsSnorkeling,
      special: true,
      list: [
        'arumJeram',
        'berenang',
        'cliffDiving',
        'flyboarding',
        'freeDiving',
        'jetski',
        'kano',
        'kayak',
        'memancing',
        'parasailing',
        'poloAir',
        'scubaDiving',
        'skiAir',
        'snorkeling',
        'speedBoat',
        'surfing',
        'windSurfing',
        'powerBoat',
      ],
    },
  ];

  const renderModalListProtect = (object) => {
    return (
      <div
        className={`relative px-3 py-4 border-2 border-red-500 mt-2 bg-white rounded-tr-[40px] rounded-bl-[40px]`}>
        <div className="overflow-y-auto h-full max-h-[230px] w-56 ">
          {object.list?.map((e, i) => (
            <div key={i} className="flex gap-3 py-1">
              <Icon icon={check} size={20} className="text-red-dark-red90" />
              <p className="text-body2 text-black">{translate(e)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Parallax speed={40} translateY={['0', '-30']}>
      <div className="relative w-full z-10">
        <Parallax
          speed={10}
          translateY={['0', '40']}
          easing="easeInQuad"
          className="hidden md:block absolute z-10  left-0 bottom-0 w-full"
          endScroll={10}>
          <img src={LsBgDesktop} className="w-full" />
        </Parallax>
        <Parallax
          speed={10}
          translateY={['0', '40']}
          easing="easeInQuad"
          className="block md:hidden absolute z-10 left-0 bottom-0 w-full"
          endScroll={10}>
          <img src={LsBgMobile} className="w-full" />
        </Parallax>

        <img
          src={LsVector21}
          className="relative w-full z-0 h-[900px] md:h-[1200px] lg:h-[1300px] xl:h-auto"
        />

        <div className="absolute z-50 w-full top-[12%] left-0 text-white lg:top-[15%]">
          <div className="max-w-5xl mx-auto px-[5%] xl:px-0">
            <div className="w-full md:w-2/5">
              <p 
                className="text-4xl uppercase font-bold pb-8 lg:text-5xl" 
                data-aos="fade-down"
                data-aos-delay="150">
                One For All
              </p>
              <p
                className="font-semibold text-sm lg:text-lg pt-2"
                data-aos="fade-up"
                data-aos-delay="150">
                {translate('text1')}
              </p>
              <p
                data-aos="fade-up"
                data-aos-delay="150"
                className="text-sm lg:text-lg pt-2">
                {translate('text2')}
              </p>
              <p
                data-aos="fade-up"
                data-aos-delay="150"
                className="text-sm lg:text-lg pt-10 md:pt-14 pb-8">
                {translate('aktivitasTerproteksi')}
              </p>
            </div>

            <div className="relative flex justify-center md:justify-start gap-1 sm:gap-2 md:gap-3">
              {listProtect.map((item, idx) => (
                <div
                  key={idx}
                  role="button"
                  className="group relative"
                  data-aos="fade-up"
                  data-aos-delay={150 * idx}
                  onMouseEnter={() =>
                    setShowDetailListProtect({
                      id: idx,
                      status: true,
                      list: item.list,
                      title: item.title,
                    })
                  }>
                  <div
                    onClick={() => {
                      width < 768 &&
                        setShowDetailListProtectMain({
                          id: idx,
                          status: true,
                          list: item.list,
                          title: item.title,
                        });
                    }}
                    className="bg-white flex flex-col justify-center items-center border-2 shadow-lg w-16 h-16 rounded-lg xm:w-20 xm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xm:rounded-xl md:rounded-2xl group-hover:shadow-none group-hover:border-red-dark-red90">
                    <img src={item.icon} className="h-3/5 pt-2 pb-1" />
                    {item.special && (
                      <img
                        src={
                          lang == 'id' ? ActivitySpecial : ActivitySpecialEng
                        }
                        className="absolute -top-1 w-4/5 left-1/2 transform -translate-x-1/2 md:-top-2"
                      />
                    )}
                    <p className="text-center font-bold text-black leading-none text-[8px] xm:leading-4 md:pt-2 xs:text-[7px] xm:text-[8px] md:text-xs">
                      {translate(item.title)}
                    </p>
                    <Icon
                      icon={chevronDown}
                      size={20}
                      className="text-gray-300 pb-1 leading-3 group-hover:text-red-dark-red90"
                    />

                    <div className="absolute hidden top-32 left-0 group-hover:block">
                      {width >= 768 &&
                        showDetailListProtect.status == true &&
                        showDetailListProtect.id == idx &&
                        renderModalListProtect(showDetailListProtect)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  );
}
