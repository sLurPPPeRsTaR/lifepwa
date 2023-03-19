import _ from 'lodash';
import locale from './locale';
import Icon from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import { useState } from 'react';
import { Button } from '@cp-component';
import { androidArrowForward } from 'react-icons-kit/ionicons';
import { LsVector42, LsVector43, LsAmbulance } from '@cp-config/Images';

export default function Page({ lang, setHospital }) {
  return (
    <div className="relative w-full z-30 bottom-0 right-0">
      <img
        src={LsAmbulance}
        className="absolute z-10 right-0 bottom-0 w-full md:w-[60%]"
        data-aos-delay="150"
        data-aos="fade-left"

      />
      <img
        src={LsVector43}
        className="relative w-full z-0 h-[900px] md:h-[700px]"
      />
      <img
        src={LsVector42}
        className="absolute top-[1px] left-0 w-full z-0 transform -translate-y-full h-[100px] md:h-auto"
      />

      <div className="absolute z-20 w-full top-[8%] md:top-[10%] left-0 text-white">
        <div className="max-w-5xl mx-auto px-[5%] xl:px-0">
          <div className="w-full md:w-1/2" 
           data-aos-delay="150"
           data-aos="fade-right"
          >
            <p className="text-3xl md:text-left xs:text-center uppercase font-bold pb-5 sm:text-4xl lg:text-5xl">
              Fast and easy!
            </p>
            <p className="text-sm lg:text-base pt-2 text-left">
              {trans(locale, lang, 'text1')}
            </p>
            <p className="text-sm lg:text-lg text-left">
              {trans(locale, lang, 'text2')}
              <span className="font-bold pl-1 text-left">
                {trans(locale, lang, 'text3')}
              </span>
            </p>
            <p className="text-sm lg:text-lg py-6 text-left">
              {trans(locale, lang, 'text4')}
            </p>
            <p className="text-sm md:text-base pt-2 italic text-left">
              {trans(locale, lang, 'periode')}
            </p>

            <Button
              type="bg-yellow"
              shadow
              onButtonClick={() => setHospital(true)}
              className="flex sm:gap-10 mt-8 text-black max-w-[400px] pl-2 text-xs xm:text-sm lg:text-base ">
              {trans(locale, lang, 'btnTitle')}
              <Icon
                icon={androidArrowForward}
                size="26"
                className="px-1 sm:px-5"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
