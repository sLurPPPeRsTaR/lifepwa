import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import locale from './locale';
import { trans } from '@cp-util/trans';
import { Button } from '@cp-component';
import { LifeSaver, LsBanner, LsBannerMobile } from '@cp-config/Images';
import { useBreakpoints } from '@cp-util/common';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ParallaxBanner, Parallax } from 'react-scroll-parallax';

export default function Page({ lang, scrollToRef }) {
  const router = useRouter();
  const {
    query: { product },
  } = router;

  const [scrollY, setScrollY] = useState(0);

  const onScroll = useCallback((event) => {
    const { pageYOffset } = window;
    setScrollY(pageYOffset);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener('scroll', onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true });
    };
  }, []);

  useEffect(() => {
    if (product?.length > 0) {
      window.scrollTo({
        top: scrollToRef.current?.offsetTop,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  const { isSm } = useBreakpoints();
  
  
  return (
    <>
      <Button
        type="linear-gradient"
        shadow
        onButtonClick={() => {
          window.scrollTo({
            top: scrollToRef.current?.offsetTop,
            left: 0,
            behavior: 'smooth',
          });
        }}
        className={`${
          scrollY > 4000 ? 'hidden' : 'fixed'
        }  mx-auto sm:w-3/4 md:w-2/4  inset-x-0 bottom-[10%] z-[999] rounded-full text-white mx-auto w-[240px] mt-9 xl:mt-12 text-xs xm:text-base`}>
        {trans(locale, lang, 'mulaiBerlangganan')}
      </Button>
      <ParallaxBanner
        layers={[{ image: isSm ?  LsBannerMobile : LsBanner, speed: -3 }]}
        className={`aspect-top-banner`}>
        <Parallax speed={-80} opacity={['2', '0.2']}>
          <div className="relative w-full z-20 mt-[5%]">
            <div className="absolute z-30 w-full left-0 text-white top-[25%] xl:top-[20%]">
              <div className="max-w-5xl mx-auto text-center ">
                <div
                  className="flex items-center justify-center"
                  data-aos="fade-up"
                  data-aos-duration="2000">
                  <img
                    src={LifeSaver}
                    className="lg:w-[605px] md:w-[400px] xm:w-[300px] xs:w-[200px]"
                  />
                </div>
                <div
                  className="flex items-center justify-center"
                  data-aos-duration="2000"
                  data-aos="fade-up">
                  <p className="font-semibold text-black xs:w-[90%] md:w-[600px] pt-8 lg:pt-10 text-lg md:text-xl lg:text-3xl">
                    {trans(locale, lang, 'melindungiKamu')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </ParallaxBanner>
    </>
  );
}
