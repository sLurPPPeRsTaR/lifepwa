import React, { useEffect, useState } from 'react';
import { CreditCard } from '@cp-config/Images';

const ListPayment = () => {
  return (
    <div className="flex flex-col p-4 shadow-md border rounded-2xl mt-2">
      <div className="flex flex-row">
        <div className="basis-2/12 w-full h-full grid place-items-center">
          <img src={CreditCard} className="pl-2 w-16" />
        </div>
        <div className="basis-8/12 w-full h-full flex-col flex justify-center ml-2">
          <p className="font-bold text-xs xm:text-sm xl:text-base">VISA</p>
          <p className="font-medium text-xs xs:leading-4 xm:text-sm xl:text-sm">
            **** **** **** 1212
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListPayment;
