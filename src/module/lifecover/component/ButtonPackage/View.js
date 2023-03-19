import { motion } from 'framer-motion';
import {
  LifecoverMyBgPackageV2,
  LifecoverPlusBgPackageV2,
  LifecoverBgPackageV2,
  LifecoverSelectPackageDec,
} from '@cp-config/Svgs';
import {
  LifecoverLogoDark,
  LifecoverPlusLogoDark,
  LifecoverFreechoiceLogoDark,
  MyLifecoverLogoDark,
} from '@cp-config/Images';
import { useMemo } from 'react';
import { formatCurrency } from '@cp-util/numbro';
import clsx from 'classnames';
import { SliderCustom } from '..';
import { trans } from '@cp-util/trans';
import locale from './locale';

const PREMI_CONTENT = {
  monthly: {
    description: {
      id: 'Pembayaran berkala setiap bulan',
      en: 'Monthly Payment',
    },
  },
  annually: {
    description: {
      id: 'Pembayaran berkala setiap tahun',
      en: 'Annually Payment',
    },
  },
};

const animateInfoVariants = {
  show: {
    opacity: 1,
    display: 'block',
    y: 0,
  },
  hide: {
    opacity: 0,
    y: -25,
    display: 'none',
    transition: {
      ease: [0.1, 0.25, 0.3, 1],
      duration: 1,
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
};

const ButtonPackage = ({
  variant = 'lifecover', // lifecover | lifecoverPlus | lifecoverFreeChoice
  lang,
  premi = 0,
  premiVariant = 'monthly', // monthly | annually
  content = '',
  checked = false,
  valueSlider = 0,
  isLoading = false,
  onChange = (e) => {},
  onChangeSlider = (value) => {},
  error = '',
}) => {
  const infoClass = clsx(
    'flex flex-col md:flex-row w-full gap-3 md:gap-6 items-start border rounded-b-[15px] lg:rounded-b-[24px] pb-4 px-4 md:px-7',
    {
      'bg-[#F1FBF8] text-success-dark-success60': !error && !isLoading,
      'bg-red-200/50 text-primary-dark-primary90': error,
      'bg-gray-200/50 text-gray-600': isLoading,
      'pt-7': variant !== 'lifecoverFreeChoice',
      'pt-4': variant === 'lifecoverFreeChoice',
    },
  );
  const groupClass = clsx(
    'w-full relative z-20 h-[50px] shadow shadow-md border s:h-[60px] sm:h-[70px] md:h-[90px] active:shadow-xl hover:shadow-lg transition-all rounded-2xl overflow-hidden flex cursor-pointer delay-150 ease-in-out duration-300 hover:scale-105',
    {
      'border-primary-dark-primary90': checked,
    },
  );

  const sliderWrapperClass = clsx('border-t border-x pt-7 pb-4 px-7');
  const renderPremi = () => {
    if (isLoading) {
      return (
        <div className="flex items-center gap-2 pt-2">
          <div className="animate-pulse bg-gray-400/50 w-[120px] h-[10px] rounded-full"></div>
        </div>
      );
    }
    return (
      <div className="text-[14px] md:text-[16px] lg:text-[20px] font-semibold">
        Rp {formatCurrency({ value: premi, mantissa: 0 })},-
      </div>
    );
  };
  const renderRadioIndicator = () => {
    return (
      <>
        <div className="absolute w-[12px] md:w-[16px] h-[12px] md:h-[16px] rounded-full border border-primary-dark-primary90" />
        <div className="absolute w-[8px] md:w-[11px] h-[8px] md:h-[11px] rounded-full bg-transparent peer-checked:bg-primary-dark-primary90" />
      </>
    );
  };
  const imgSrc = useMemo(() => {
    if (variant === 'lifecover') {
      return {
        background: LifecoverBgPackageV2,
        logo: LifecoverLogoDark,
      };
    }
    if (variant === 'lifecoverPlus') {
      return {
        background: LifecoverPlusBgPackageV2,
        logo: LifecoverPlusLogoDark,
      };
    }
    return {
      background: LifecoverMyBgPackageV2,
      logo: MyLifecoverLogoDark,
    };
  }, [variant]);

  return (
    <div className="relative">
      <label htmlFor={variant} className={groupClass}>
        <img
          src={imgSrc.background}
          className="absolute left-0 h-full w-full top-0 bottom-0 object-cover"
          alt=""
        />
        <img
          src={LifecoverSelectPackageDec}
          className="absolute z-10 right-0 bottom-0 h-full object-cover"
          alt=""
        />

        <div className="relative w-full z-20">
          <div className="flex w-full h-full justify-between gap-3 pr-4 md:pr-7 pl-2">
            <div className="flex-initial flex-shrink-0 lg:flex-1 flex items-center">
              <img
                src={imgSrc.logo}
                alt="lifecoverLogo"
                className="lg:w-44 sm:w-28 w-20 lg:h-8 h-5 object-contain xm:mb-1 md:mb-3"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-start text-neutral-800">
              {content}
            </div>
            <div className="flex-initial self-start relative mt-5 sm:mr-1 lg:mr-0 flex items-center justify-center">
              <input
                type="radio"
                id={variant}
                name={variant}
                className="peer hidden"
                checked={checked}
                onChange={onChange}
              />
              {renderRadioIndicator()}
            </div>
          </div>
        </div>
      </label>

      <motion.div
        variants={animateInfoVariants}
        animate={checked ? 'show' : 'hide'}
        initial="hide"
        className="relative w-full z-10 -mt-4">
        {variant === 'lifecoverFreeChoice' && (
          <div className={sliderWrapperClass}>
            <div className="text-center">
              <div className="text-[#232425] text-[12px] sm:text-[14px] md:text-[16px] font-semibold mb-1">
                "{trans(locale, lang, 'sayaIngin')}"
              </div>
              <div className="text-[#ED1C24] text-[14px] md:text-[20px] font-semibold underline">
                Rp {formatCurrency({ value: valueSlider, mantissa: 0 })},-
              </div>
            </div>

            <label className="block mt-1">
              <div className="text-[12px] text-[#828282] text-center mb-3">
                {trans(locale, lang, 'aturUang')}
              </div>
              <SliderCustom
                value={valueSlider}
                onChange={(value) => onChangeSlider(value)}
              />
            </label>
          </div>
        )}
        <div className={infoClass}>
          <div className="flex-1 font-semibold text-[12px] sm:text-[14px] md:text-[16px]">
            {trans(locale, lang, 'premi')}
          </div>
          <div className="flex-initial flex flex-col md:items-end text-lef md:text-right">
            {!error && <div className="min-h-[30px]">{renderPremi()}</div>}
            {!error && !isLoading && (
              <div className="text-[12px] md:text-[14px]">
                {PREMI_CONTENT[premiVariant]['description'][lang]}
              </div>
            )}
            {isLoading && (
              <div className="text-[12px]">
                {lang === 'id'
                  ? 'Menghitung total premi'
                  : 'Calculating total premi'}
              </div>
            )}
            {error && (
              <>
                <div className="text-[10px] md:text-[12px]">
                  {lang === 'id'
                    ? 'Gagal memuat total premi'
                    : 'Failed to load total premi'}
                </div>
                <div className="text-[12px] md:text-[14px] font-semibold">
                  {error === 'RATE_TRANSACTION_NOT_FOUND'
                    ? lang === 'id'
                      ? 'Pilih uang pertanggungan kamu kembali'
                      : 'Please select your protection again'
                    : error}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ButtonPackage;
