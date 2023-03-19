import React from 'react';
import { IllustrationHospital } from '@cp-config/Images';
import { formatCurrency } from '@cp-util/numbro';
import clsx from 'classnames';

const FLEXI_CONTENT = {
  description: {
    id: (
      <>
        Life<i>COVER</i> melindungi Lorem ipsum todo de atire.
      </>
    ),
    en: (
      <>
        Life<i>COVER</i> melindungi Lorem ipsum todo de atire.
      </>
    ),
  },
};
const PREMI_CONTENT = {
  monthly: {
    description: {
      id: 'Pembayaran berkala setiap bulan.',
      en: 'Monthly Payment.',
    },
  },
  yearly: {
    description: {
      id: 'Pembayaran berkala setiap tahun.',
      en: 'Yearly Payment.',
    },
  },
};

const BoxPremi = ({
  lang = 'id',
  variant = 'monthly', // monthly | yearly
  isLoading = false,
  premi = 0,
  error = '',
}) => {
  const infoClass = clsx(
    'flex flex-col md:flex-row min-h-[115px] -mt-4 gap-6 items-start border rounded-b-[15px] lg:rounded-b-[24px] pt-8 pb-4 px-7',
    {
      'bg-[#F1FBF8] text-success-dark-success60': !error && !isLoading,
      'bg-red-200/50 text-primary-dark-primary90': error,
      'bg-gray-200/50 text-gray-600': isLoading,
    },
  );

  const renderPremi = () => {
    if (isLoading) {
      return (
        <svg
          className="animate-spin mr-3 h-5 w-5 text-inherit"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    }
    return (
      <div className="text-[20px] font-semibold">
        Rp {formatCurrency({ value: premi, mantissa: 0 })},-
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center bg-white border shadow-lg rounded-[15px] lg:rounded-[24px] p-7">
        <div className="flex-initial">
          <img src={IllustrationHospital} width={82} height={82} />
        </div>
        <div className="flex-1">
          <div className="text-[14px] text-[#393939] font-semibold mb-2">
            Flexi<i>COVER</i>
          </div>
          <div className="text-[14px] text-gray-500">
            {FLEXI_CONTENT.description[lang]}
          </div>
        </div>
      </div>
      <div className={infoClass}>
        <div className="flex-1 font-semibold">Premi</div>
        <div className="flex-initial flex flex-col md:items-end text-lef md:text-right">
          {!error && <div className="min-h-[30px]">{renderPremi()}</div>}
          {!error && (
            <div className="text-[14px]">
              {PREMI_CONTENT[variant]['description'][lang]}
            </div>
          )}
          {error && <div className="text-[14px]">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default BoxPremi;
