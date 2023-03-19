import { Button } from '@cp-component';
import Image from 'next/image';
import React from 'react';
import clsx from 'classnames';
import { Google1, Present } from '@cp-config/Svgs';

function ButtonProduct({
  translate,
  trans,
  lang,
  getCurrentSubsResponse,
  setSelectedPackage,
  showBenefitPos,
  onSubscribeOther,
  setShowModalBenefit,
  setAvailableOnMobile,
  productActive,
  idx,
  item,
  locale,
  handleClickSubscribe
}) {
  return (
    <div className="hidden md:block">
      {getCurrentSubsResponse?.planName == 'LifeSAVER' ? (
        <div className="grid grid-cols-1 gap-4 mt-4 md:mt-6">
          <Button
            type={
              showBenefitPos
                ? idx != 0 || idx != 1
                  ? 'linear-gradient'
                  : 'bg-light'
                : idx != 0
                ? 'linear-gradient'
                : 'bg-light'
            }
            disabled={
              showBenefitPos
                ? productActive == 0 || productActive == 1
                  ? true
                  : false
                : productActive == 0
                ? true
                : false
            }
            className="w-[70%] h-8 text-caption1 mt-4 mx-auto md:h-10 md:text-body1 md:mt-6"
            onButtonClick={() => {
              setAvailableOnMobile(true);
            }}>
            {showBenefitPos
              ? idx == 0 || idx == 1
                ? translate('pilih')
                : 'Upgrade'
              : idx == 0
              ? translate('pilih')
              : 'Upgrade'}
          </Button>
          <div
            className={clsx(
              `
                          ${item.plan === 'lifesaverpos' ? 'opacity-[0]' : ''}
                          ${
                            idx !== productActive ? 'opacity-40' : ''
                          }  grid place-content-center w-[70%] h-8 text-caption1 md:text-caption1 mx-auto md:h-10 border rounded-2xl font-semibold text-center text-primary-light-primary90 border-primary-light-primary90`,
            )}
            onClick={(e) => {
              e?.stopPropagation();
              setSelectedPackage(item?.plan);

              onSubscribeOther();
            }}>
            {item.plan !== 'lifesaverpos' && (
              <div className="flex flex-row">
                <span className="mr-2">{translate('beliUntukKerabat')}</span>
                <Image src={Present} alt="" width={18} height={18} />
              </div>
            )}
          </div>
        </div>
      ) : getCurrentSubsResponse?.planName == 'LifeSAVER POS' ? (
        <div className="grid grid-cols-1 gap-4 mt-4 md:mt-6">
          <Button
            type={idx != 0 ? 'linear-gradient' : 'bg-light'}
            disabled={productActive == 0 ? true : false}
            className="w-[70%] h-8 text-caption1 mt-4 mx-auto md:h-10 md:text-body1 md:mt-6"
            onButtonClick={() => {
              setAvailableOnMobile(true);
            }}>
            {idx == 0 ? translate('pilih') : 'Upgrade'}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4 md:mt-6">
          <Button
            type={
              productActive == idx &&
              getCurrentSubsResponse?.length == undefined
                ? 'linear-gradient'
                : 'bg-light'
            }
            className="w-[70%] h-8 text-caption1 mx-auto md:h-10 md:text-body1"
            disabled={getCurrentSubsResponse?.planName == 'LifeSAVER+'}
            onButtonClick={() => {
              handleClickSubscribe(item?.plan);
            }}>
            {translate('pilih')}
          </Button>
          {item?.plan !== 'lifesaverpos' ? (
            <div
              className={clsx(
                `${
                  productActive === idx ? '' : 'opacity-40'
                } grid place-content-center w-[70%] h-8 text-caption1 md:text-caption1 mx-auto md:h-10 border rounded-2xl font-semibold text-center text-primary-light-primary90 border-primary-light-primary90 `,
              )}
              onClick={(e) => {
                e?.stopPropagation();
                setSelectedPackage(item?.plan);
                onSubscribeOther();
              }}>
              <div className="flex flex-row">
                {translate('beliUntukKerabat')}
                <Image src={Present} alt="" width={18} height={18} />
              </div>
            </div>
          ) : (
            <div className="p-5"></div>
          )}
        </div>
      )}

      <div
        role={productActive == idx ? 'button' : 'presentation'}
        onClick={() =>
          setShowModalBenefit({
            id: idx,
            status: true,
            pos: showBenefitPos,
          })
        }
        className={`${
          productActive == idx
            ? 'text-red-dark-red90 hover:no-underline'
            : 'text-red-200'
        } mx-auto py-4 text-[9px] font-bold text-center underline md:text-caption1 w-[90%] md:w-44 `}>
        {trans(locale, lang, 'manfaatLebihLengkap')}
      </div>
    </div>
  );
}

export default ButtonProduct;
