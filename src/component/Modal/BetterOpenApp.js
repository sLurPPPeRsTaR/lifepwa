import { useEffect, useState } from 'react';
import { trans } from '@cp-util/trans';
import { Button } from '@cp-component';
import { Close } from '@cp-config/Svgs';
import locale from './locale';

export default function Component({ lang, isOpen, setClose }) {
  const [hostname, setHostname] = useState();

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
    isOpen && (
      <div className="relative z-[999] bg-white top-0 left-0 w-full px-[5%] md:px-[10%] py-3 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-3 md:gap-5">
          <img
            src={Close}
            className="w-8 cursor-pointer"
            onClick={() => setClose(false)}
          />
          <p className="text-[11px] xm:text-xs md:text-sm font-bold">
            {trans(locale, lang, 'titleBukaApp')}
          </p>
        </div>
        <a href={hostname} target="_blank">
          <Button
            type="linear-gradient"
            className="text-sm h-7 w-20 xm:h-8 xm:w-24 md:w-32 md:h-9">
            <p className="text-[10px] xm:text-xs">
              {trans(locale, lang, 'bukaApp')}
            </p>
          </Button>
        </a>
      </div>
    )
  );
}
