import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'react-icons-kit';
import { Button } from '@cp-component';
import { trans } from '@cp-util/trans';
import { arrowLeft } from 'react-icons-kit/feather';
import {
  LTStep1,
  LTStep2,
  LTStep3,
  LTStep4,
  DefaultBackground,
} from '@cp-config/Images';
import locale from './locale';
import { NAVIGATION } from '@cp-util/constant';

export default function View({ lang, token, setNotAvailable }) {
  const router = useRouter();
  const [hostname, setHostname] = useState();

  const listSteps = [
    { img: LTStep1, title: trans(locale, lang, 'step1') },
    { img: LTStep2, title: trans(locale, lang, 'step2') },
    { img: LTStep3, title: trans(locale, lang, 'step3') },
    { img: LTStep4, title: trans(locale, lang, 'step4') },
  ];

  useEffect(() => {
    if (window.location.hostname == 'www.life.id') {
      setHostname('https://qr.life.id/home');
    } else if (window.location.hostname == 'uat.life.id') {
      setHostname('https://qr.life.id/home-uat');
    } else {
      setHostname('https://qr.life.id/home-uat');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <img
        src={DefaultBackground}
        className="absolute z-0 top-0 left-0 w-full hidden md:block"
      />

      <div className="relative z-10 w-full flex justify-between items-center shadow-sm bg-white h-16 px-5 lg:h-20 lg:px-[5%]">
        <div className="w-5 xm:w-10 md:w-20" role="button">
          <Icon
            icon={arrowLeft}
            size={20}
            onClick={() => router.push(NAVIGATION.HOME.Home)}
            className="cursor-pointer"
          />
        </div>
        <p className="font-bold text-sm md:text-base lg:text-lg">
          {trans(locale, lang, 'mainTitle')}
        </p>
        <div className="w-0 xm:w-10 md:w-20"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center w-full h-full py-10 px-2">
        <div className="w-full max-w-2xl bg-white px-[5%] py-10 rounded-xl border shadow-sm text-xs xm:text-sm lg:text-base">
          <p className="text-center pb-5">{trans(locale, lang, 'subTitle')}</p>
          <div className="divide-y">
            {listSteps.map((item, idx) => (
              <div key={idx} className="flex items-center py-4 md:py-5">
                <img src={item.img} className="h-16 xm:h-20 md:h-32" />
                <p className="text-left pl-3">{item.title}</p>
              </div>
            ))}
          </div>
          <Button
            type="linear-gradient"
            full
            className="mt-5"
            onButtonClick={() => {
              token
                ? setNotAvailable(true)
                : router.push(NAVIGATION.REGISTER.Register);
            }}>
            {token
              ? trans(locale, lang, 'btnHubungkan')
              : trans(locale, lang, 'btnDownload')}
          </Button>
        </div>
      </div>
    </div>
  );
}
