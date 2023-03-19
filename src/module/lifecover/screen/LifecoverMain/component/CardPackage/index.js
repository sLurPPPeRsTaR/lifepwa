import { Button } from '@cp-component';
import { LifecoverLogoDark, LifecoverLogoDarkPlus } from '@cp-config/Images';
import { LifecoverCardPackageDec } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import classNames from 'classnames';
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
          <div className="text-[14px] font-bold">IDR 500 Million</div>
          <div className="text-[12px] font-medium">Sum Insured</div>
        </>
      ),
    },
  },
  lifecoverPlus: {
    img: LifecoverLogoDarkPlus,
    content: {
      id: (
        <>
          <div className="text-[14px] font-bold">1 Milliar</div>
          <div className="text-[12px] font-medium">Uang Pertanggungan</div>
        </>
      ),
      en: (
        <>
          <div className="text-[14px] font-bold">IDR 1 Billion</div>
          <div className="text-[12px] font-medium">Sum Insured</div>
        </>
      ),
    },
  },
};

const CardPackage = ({
  lang = 'id',
  variant = 'lifecover', // lifecover | lifecoverPlus
  cardVariant = 'default', // default | button
  active = false,
  className,
  onClick = (value = null) => {},
  onButtonClick = (value = null) => {},
}) => {
  const rootClass = classNames(
    'w-full relative min-h-[96px] rounded-[24px] overflow-hidden border-2 transition duration-500 hover:border-[#ED1C24]/30',
    {
      'border-[#DADADA]/30': !active,
      'border-[#ED1C24]': active,
    },
    className,
  );

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
        src={LifecoverCardPackageDec}
        className="absolute bottom-0 left-0 w-full object-contain"
        alt=""
      />

      <div className="relative flex flex-col items-center justify-center py-[12px] px-[32px] z-10">
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

        <div className="text-[#FD5545] text-center">
          {PACKAGE_DATA[variant]['content'][lang]}
        </div>

        {cardVariant === 'button' && (
          <Button
            type="linear-gradient"
            disabled={!active}
            className="mt-3"
            onButtonClick={handleButtonClick}>
            {trans(locale, lang, 'pilihPaket')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardPackage;
