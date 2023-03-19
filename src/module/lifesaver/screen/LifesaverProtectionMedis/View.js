import Icon from 'react-icons-kit';
import locale from './locale';
import { forwardRef } from 'react';
import { trans } from '@cp-util/trans';
import { Button } from '@cp-component';
import { androidArrowForward } from 'react-icons-kit/ionicons';
import {
  LsMtbIncident,
  LsVector31,
  LsVector32,
  LsVector33,
  LsHill,
  LsHelpYou,
} from '@cp-config/Images';

const Pages = forwardRef((props, ref) => {
  const { lang, setModalProtectionActive } = props;
  const translate = (val) => trans(locale, lang, val);

  return (
    <div ref={ref} className="relative w-full z-20">
      <img src={LsHill} className="absolute bottom-0 right-0 z-20 w-5/6" />
      <img
        src={LsHelpYou}
        className="absolute z-10 left-0 w-full bottom-10 lg:bottom-20 xl:bottom-28 lg:w-[70%]"
      />
      <img
        src={LsVector31}
        className="relative border-b w-full z-0 h-[900px] xl:h-auto"
      />
      <img src={LsVector32} className="absolute w-2/3 bottom-0 left-0 z-0" />
      <img
        src={LsVector33}
        className="absolute top-1 left-0 w-full z-0 transform -translate-y-full h-[100px] md:h-auto"
      />

      <div className="absolute z-30 w-full top-[8%] left-0 text-white">
        <div className="max-w-5xl mx-auto px-[5%] xl:px-0">
          <div className="w-full md:w-1/2 ml-auto">
            <p
              className="text-3xl uppercase font-bold pb-5 sm:text-4xl lg:text-5xl"
              data-aos="fade-up"
              data-aos-delay={150}
              data-aos-duration="1000">
              we'll help
            </p>
            <p
              className="text-3xl uppercase font-bold pb-5 sm:text-4xl lg:text-5xl"
              data-aos="fade-left"
              data-aos-delay={150}
              data-aos-duration="1000">
              you heal.
            </p>
            <p
              className="text-sm md:text-lg"
              data-aos="fade-up"
              data-aos-duration="1000">
              {translate('text1')}
            </p>
            <p
              className="text-sm py-6 md:text-lg"
              data-aos="fade-up"
              data-aos-duration="1000">
              {translate('text2')}
            </p>

            <p
              className="text-sm md:text-base pt-2 italic"
              data-aos="fade-up"
              data-aos-duration="1000">
              {translate('periode')}
            </p>

            <Button
              type="bg-yellow"
              shadow
              onButtonClick={() => setModalProtectionActive(true)}
              className="z-50 flex justify-around sm:gap-10 mt-14 text-black max-w-[400px] text-xs xm:text-sm lg:text-base ">
              {translate('btnTitle')}
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
});

export default Pages;
