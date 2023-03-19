import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from '@cp-component';
import { PaymentFail } from '@cp-config/Images';
import { trans } from '@cp-util/trans';
import locale from './locale';

export default function Component({ isOpen, setClose, lang, customerCare }) {
  return (
    <Modal isOpen={isOpen} size="sm" className="!px-3 xm:px-4">
      <div className="relative w-full flex gap-2 items-center justify-center mb-12">
        <div className="absolute -mt-16 xm:-mt-24 w-full">
          <img src={PaymentFail} className="w-4/5 mx-auto" />
        </div>
      </div>
      <p className="font-bold text-sm text-center mb-1 xm:text-h6">
        {trans(locale, lang, 'paymentFailTitle')}
      </p>
      <p className="text-center text-xs xm:text-sm">
        {trans(locale, lang, 'paymentFailSubtitle')}
      </p>
      <div className="mt-6 md:mt-10">
        <Button
          type="linear-gradient"
          full
          onButtonClick={setClose}
          className="text-sm md:text-base !h-11">
          {trans(locale, lang, 'Kembali')}
        </Button>
      </div>

      <div className="mt-5 p-2 mx-auto bg-neutral-200 text-center w-full max-w-2xl rounded-3xl text-[11px] sm:text-xs">
        <p className="text-gray-700 pb-1">
          {trans(locale, lang, 'butuhBantuan')}
        </p>
        <div
          role="button"
          onClick={customerCare}
          className="font-bold text-red-500 underline hover:no-underline">
          Customer Care
        </div>
      </div>
    </Modal>
  );
}
