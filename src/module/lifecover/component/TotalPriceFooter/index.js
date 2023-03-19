import React from 'react';
import { Button } from '@cp-component';
import { formatRupiah } from '@cp-module/lifecover/utils';
import { isEqual } from 'lodash';
import locale from './locale';
import { trans } from '@cp-util/trans';

const TotalPriceFooter = ({
  lang,
  price,
  subPrice,
  handleClickSubmit = () => {},
  paymentType = '',
}) => {
  return (
    <div className="fixed border-t shadow-lg w-full left-0 right-0 bottom-0 z-10 bg-white flex justify-center">
      <div className="w-full max-w-[1440px] py-8 px-4 md:px-[5%] flex flex-col gap-4 sm:gap-0 justify-between items-center sm:flex-row ">
        <div className="flex w-full justify-between flex-row sm:flex-col md:w-auto md:items-start">
          <p className="text-body2 font-bold">Total</p>
          <div className="flex flex-col items-end sm:items-start">
            <p className="text-[#00B76A] text-xl font-bold">
              {isEqual(paymentType, 'annually') && (
                <span className="text-xs md:text-sm lg:text-sm line-through mr-3 text-black">
                  {formatRupiah({ total: subPrice })}
                </span>
              )}
              <span>{price ? formatRupiah({ total: price }) : '-'}</span>
            </p>
            {!isEqual(paymentType, 'annually') && (
              <p className="text-caption1 font-bold text-gray-400 w-[200px] md:w-[300px]">
                {trans(locale, lang, 'pembayaranBerkala')}
              </p>
            )}
          </div>
        </div>
        <div className="w-full md:max-w-xs">
          <Button type="linear-gradient" onButtonClick={handleClickSubmit}>
            {trans(locale, lang, 'bayarSekarang')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TotalPriceFooter;
