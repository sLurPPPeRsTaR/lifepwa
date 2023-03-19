import {
  LifecoverLogoDark,
  LifecoverPlusLogoDark,
  MyLifecoverLogoDark,
} from '@cp-config/Images';
import {
  LifecoverMyCardPackageDecV2,
  LifecoverPlusCardPackageDecV2,
  LifecoverCardPackageDecV2,
} from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import clsx from 'classnames';
import { useMemo } from 'react';
import locale from '../../locale';

const PACKAGE_DATA = {
  lifecover: {
    img: LifecoverLogoDark,
    content: {
      id: (
        <>
          <div className="text-[14px] font-bold">500 Jt</div>
          <div className="text-[12px] font-medium">Uang Pertanggungan</div>
        </>
      ),
      en: (
        <>
          <div className="text-[14px] font-bold">500 Million</div>
          <div className="text-[12px] font-medium">Sum Assured</div>
        </>
      ),
    },
  },
  lifecoverPlus: {
    img: LifecoverPlusLogoDark,
    content: {
      id: (
        <>
          <div className="text-[14px] font-bold">1 Milliar</div>
          <div className="text-[12px] font-medium">Uang Pertanggungan</div>
        </>
      ),
      en: (
        <>
          <div className="text-[14px] font-bold">1 Billion</div>
          <div className="text-[12px] font-medium">Sum Assured</div>
        </>
      ),
    },
  },
  lifecoverFreechoice: {
    img: MyLifecoverLogoDark,
    content: {
      id: (
        <>
          <div className="text-[14px] font-bold">Tentukan Sendiri</div>
          <div className="text-[12px] font-medium">Uang Pertanggungan</div>
        </>
      ),
      en: (
        <>
          <div className="text-[14px] font-bold">Choose your own</div>
          <div className="text-[12px] font-medium">Sum Assured</div>
        </>
      ),
    },
  },
};

const CardPackage = ({
  lang,
  variant = 'lifecover', // lifecover | lifecoverPlus
  cardVariant = 'default', // default | button
  active = false,
  className,
  onClick = (value = null) => {},
  onButtonClick = (value = null) => {},
}) => {
  const rootClass = clsx(
    'group w-full relative rounded-[24px] overflow-hidden border-2 transition duration-500 hover:border-[#ED1C24]/30 hover:scale-105',
    className,
  );
  const btnClassDesktop = clsx(
    'flex gap-2 justify-center items-center rounded-2xl font-semibold bg-gradient-to-r from-[#F25D63] to-[#ED1C24] text-white max-w-[320px] w-full h-10 xm:h-12 mt-3',
  );
  const imgSrc = useMemo(() => {
    if (variant === 'lifecover') {
      return LifecoverCardPackageDecV2;
    }
    if (variant === 'lifecoverPlus') {
      return LifecoverPlusCardPackageDecV2;
    }
    return LifecoverMyCardPackageDecV2;
  }, [variant]);

  const handleClick = () => {
    const value = variant === 'lifecover' ? 500 * 1e6 : 1000 * 1e6;
    if (onClick) {
      onClick(value);
    }
  };
  const handleButtonClick = () => {
    const value = variant === 'lifecover' ? 500 * 1e6 : 1000 * 1e6;
    if (onButtonClick) {
      onButtonClick(value);
    }
  };

  return (
    <div role="button" className={rootClass} onClick={handleClick}>
      {/* decoration */}
      <img
        src={imgSrc}
        className="absolute bottom-0 left-0 w-full object-contain"
        alt=""
      />

      <div className="relative flex flex-col min-h-[118px] md:min-h-[224px] h-full items-center justify-center py-[20px] px-[32px] z-10">
        <div className="flex-initial flex-shrink-0 text-center">
          <img
            src={PACKAGE_DATA[variant]['img']}
            alt=""
            width={131}
            height={28}
            className="flex-shrink-0"
          />
        </div>

        <div className="flex-initial flex-shrink-0 self-stretch">
          <hr className="border-[#ED1C24] mt-2 mb-2" />
        </div>

        <div className="text-[#FD5545] text-center mb-[10px] md:mb-[30px]">
          {PACKAGE_DATA[variant]['content'][lang]}
        </div>

        {cardVariant === 'button' && (
          <button
            type="button"
            className={btnClassDesktop}
            onClick={handleButtonClick}>
            {trans(locale, lang, 'pilihPaket')}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardPackage;
