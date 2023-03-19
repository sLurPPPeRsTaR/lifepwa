import { useMemo, useCallback, useState } from 'react';
import { formatCapitalizeEachWord } from '@cp-util/format';
import { Button, HeaderPage, Input, InputOTP, Modal } from '@cp-component';
import { UpdataInformationAddressEdit } from '@cp-module/updata/screen';
import { trans } from '@cp-util/trans';
import clsx from 'classnames';

import locale from './locale';
import { ic_keyboard_backspace } from 'react-icons-kit/md';
import Icon from 'react-icons-kit';
import { androidRadioButtonOn } from 'react-icons-kit/ionicons';
import { androidRadioButtonOff } from 'react-icons-kit/ionicons';

export default function Page({
  lang,
  otherInformation,
  getUpdataLastOtherInfoResponse,
  updataTempState,
  isKTPSame,
  getUpdataLastKTPInfoResponse,
  setOtherInformation,
  selectAddress,
  setCurrentScreen,
}) {
  const [address, setAddress] = useState(null);
  const [addressType, setAddressType] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const lastOtherInfo = useMemo(() => {
    return getUpdataLastOtherInfoResponse?.data;
  }, [getUpdataLastOtherInfoResponse?.data]);

  const tempKTP = useMemo(() => {
    return isKTPSame
      ? getUpdataLastKTPInfoResponse?.data
      : updataTempState?.verifyPengkinianPayload?.user;
  }, [
    getUpdataLastKTPInfoResponse?.data,
    isKTPSame,
    updataTempState?.verifyPengkinianPayload?.user,
  ]);

  const getItemAddress = useCallback(
    (key) => {
      if (key === 'residentAddress') {
        if (tempKTP) {
          return {
            street: tempKTP?.address || '',
            province: tempKTP?.province || '',
            city: tempKTP?.city || '',
            district: tempKTP?.district || '',
            subDistrict: tempKTP?.subDistrict || '',
            neighborhood: tempKTP?.neighborhood || '',
            hamlet: tempKTP?.hamlet || '',
            postalcode: tempKTP?.postalcode || '',
          };
        }
        return lastOtherInfo?.address[key];
      }
      return (
        otherInformation?.data?.address[key] || lastOtherInfo?.address[key]
      );
    },
    [lastOtherInfo?.address, otherInformation?.data?.address, tempKTP],
  );

  const getTextAddress = useCallback(
    (itemAddress, key) => {
      let textAddress;
      if (itemAddress) {
        const namaJalan = itemAddress.street || '';
        const rt = itemAddress.neighborhood || '';
        const rw = itemAddress.hamlet || '';
        const kelurahan = formatCapitalizeEachWord(
          itemAddress.subDistrict || '',
        );
        const kecamatan = formatCapitalizeEachWord(itemAddress.district || '');
        const kota = formatCapitalizeEachWord(itemAddress.city || '');
        const provinsi = formatCapitalizeEachWord(itemAddress.province || '');
        const kodePos = itemAddress.postalcode || '';
        textAddress = `${namaJalan}, ${
          rt && rw ? `RT${rt}/RW${rw}` : ''
        }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
          .replace(/ ,/g, '')
          .trim()
          .replace(/^, /g, '')
          .trim()
          .replace(/,$/g, '');
      } else {
        if (key === 'residentAddress') {
          textAddress = `${trans(locale, lang, 'andaBelumMemasukkan')}${trans(
            locale,
            lang,
            'sesuaiKTP',
          )}`;
        }
        if (key === 'officeAddress') {
          textAddress = `${trans(locale, lang, 'andaBelumMemasukkan')}${trans(
            locale,
            lang,
            'kantor',
          )}`;
        }
        if (key === 'correspondAddress') {
          textAddress = `${trans(locale, lang, 'andaBelumMemasukkan')}${trans(
            locale,
            lang,
            'suratMenyurat',
          )}`;
        }
        if (key === 'billingAddress') {
          textAddress = `${trans(locale, lang, 'andaBelumMemasukkan')}${trans(
            locale,
            lang,
            'penagihan',
          )}`;
        }
      }
      return textAddress;
    },
    [lang],
  );

  const [selectedAddress, setSelectedAddress] = useState({
    key: selectAddress,
    itemAddress: getItemAddress(selectAddress),
  });

  const isButtonDisabled = useMemo(() => {
    console.log('selectedAddress', selectedAddress);
    return (
      selectedAddress === null ||
      !selectedAddress?.key ||
      !selectedAddress?.itemAddress
    );
  }, [selectedAddress]);

  function renderCardContainer() {
    return Object.entries(otherInformation?.data?.address).map(
      ([key, item]) => {
        const addressFlag = lastOtherInfo?.addressFlag[key];
        if (!addressFlag?.isShow) {
          return null;
        }
        const itemAddress = getItemAddress(key);
        const textAddress = getTextAddress(itemAddress, key);

        return (
          <div
            key={key}
            className="border px-3 py-3 md:px-5 divide-y rounded-xl shadow-sm mb-4 "
            onClick={() => setSelectedAddress({ key, itemAddress })}>
            <div className="flex flex-row">
              <div className="grow flex flex-col pb-3 md:pt-2 md:pb-5 text-xs xm:text-sm md:text-base">
                <p className="font-bold text-neutral-light-neutral60">
                  {trans(locale, lang, key)}
                </p>
                <p className="font-medium pt-1 text-gray-500">{textAddress}</p>
              </div>
              <div className="flex ml-2 items-start">
                <Icon
                  icon={
                    selectedAddress?.key === key
                      ? androidRadioButtonOn
                      : androidRadioButtonOff
                  }
                  size={24}
                  className={
                    selectedAddress?.key === key
                      ? 'text-red-500'
                      : 'text-gray-300'
                  }
                />
              </div>
            </div>
            {selectedAddress?.key === key &&
            addressFlag?.isEditable &&
            selectedAddress?.key !== 'residentAddress' ? (
              <div className="pt-3 text-xs xm:text-sm md:text-base">
                <p
                  role="button"
                  className=" text-center text-primary-dark-primary90 font-semibold duration-300 hover:underline"
                  type="linear-gradient"
                  onClick={() => {
                    setAddress(item);
                    setAddressType(key);
                    setIsOpenEdit(true);
                  }}>
                  {trans(locale, lang, 'ubahAlamat')}
                </p>
              </div>
            ) : null}
          </div>
        );
      },
    );
  }

  function renderButton() {
    return (
      <div className="w-full mt-10">
        <Button
          disabled={isButtonDisabled}
          onButtonClick={() => {
            setOtherInformation({
              ...otherInformation,
              data: {
                ...otherInformation.data,
                address: {
                  ...otherInformation.data.address,
                  [selectAddress]: {
                    ...selectedAddress?.itemAddress,
                  },
                },
              },
            });
            setCurrentScreen('');
          }}
          // disabled={!newPhoneValid}
          type="linear-gradient"
          className="mb-4 mt-4 text-sm md:text-base"
          full>
          {trans(locale, lang, 'pilihAlamat')}
        </Button>
      </div>
    );
  }

  const renderHeaderBody = () => {
    return (
      <div className="flex pb-2 mb-5 justify-between items-center border-b">
        <div role="button">
          <Icon
            icon={ic_keyboard_backspace}
            size={18}
            onClick={() => setCurrentScreen('')}
            className="cursor-pointer px-1 ml-1 rounded-sm duration-300 hover:bg-red-50"
          />
        </div>
        <p className="text-xs font-bold text-gray-600 xm:text-sm">
          {trans(locale, lang, 'ubahAlamat')}
        </p>
        <div className="w-6"></div>
      </div>
    );
  };

  return (
    <>
      {renderHeaderBody()}
      {!isOpenEdit && (
        <div>
          {renderCardContainer()}
          {renderButton()}
        </div>
      )}

      {isOpenEdit && (
        <UpdataInformationAddressEdit
          address={address}
          addressType={addressType}
          otherInformation={otherInformation}
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </>
  );
}
