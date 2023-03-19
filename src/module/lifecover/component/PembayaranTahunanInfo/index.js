import React from 'react';
import { Close } from '@cp-config/Svgs';
import { Modal } from '@cp-component';
import Image from 'next/image';
import locale from './locale';
import { trans } from '@cp-util/trans';

const PembayaranTahunanInfo = ({
  isClicked = false,
  className,
  lang,
  modalClassName = '',
  setIsClicked = () => {},
}) => {
  return (
    <>
      {isClicked && (
        <>
          {/* Mobile */}
          <Modal isOpen={isClicked} mainClassname="md:hidden">
            <div
              className={
                'p-2 w-full flex gap-2 items-center text-start text-body1 font-bold mb-4 border-b ' +
                modalClassName
              }>
              <div
                className="flex items-center"
                role="button"
                onClick={setIsClicked}>
                <Image src={Close} width={28} height={28} />
              </div>
              {trans(locale, lang, 'pembayaranTahunan')}
            </div>
            <div
              className="mb-4 text-base text-left"
              dangerouslySetInnerHTML={{
                __html: trans(locale, lang, 'masaPembayaran'),
              }}></div>
          </Modal>
          {/* Desktop */}
          <div
            className={
              'hidden md:block absolute top-2 left-40 shadow-md bg-white rounded-2xl rounded-tl-none p-4 z-50 text-caption1 text-neutral-light-neutral80 w-[400px] font-medium' +
              className
            }>
            <div className="flex border-b pb-2">
              <div
                className="flex items-center w-[10%]"
                role="button"
                onClick={setIsClicked}>
                <Image src={Close} width={28} height={28} />
              </div>
              <p className="font-bold mb-auto mt-auto text-sm text-center w-[90%]">
                {trans(locale, lang, 'pembayaranTahunan')}
              </p>
            </div>

            <p
              className="text-sm text-left"
              dangerouslySetInnerHTML={{
                __html: trans(locale, lang, 'masaPembayaran'),
              }}></p>
          </div>
        </>
      )}
    </>
  );
};

export default PembayaranTahunanInfo;
