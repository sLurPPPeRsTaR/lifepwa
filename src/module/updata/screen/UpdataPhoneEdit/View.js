/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Input } from '@cp-component';
import { regexMobile } from '@cp-util/common';
import clsx from 'classnames';
import { trans } from '@cp-util/trans';
import locale from './locale';

export default function Page({
  lang,
  otherInformation,
  getUpdataLastOtherInfoResponse,
  setIsShowOtp,
  setUpdataRequestOtp,
  handleCloseEdit,
  setOtpSendTo,
  setActionOTP,
  setIsSubmit,
}) {
  const [width, setWidth] = useState(
    typeof window === 'undefined' ? 0 : window.innerWidth,
  );

  // number
  const oldPhone = useMemo(() => {
    return (
      otherInformation?.data?.phoneNumber ||
      getUpdataLastOtherInfoResponse?.data?.phoneNumber
    );
  }, [
    getUpdataLastOtherInfoResponse?.data?.phoneNumber,
    otherInformation?.data?.phoneNumber,
  ]);
  const [newPhone, setNewPhone] = useState(null);
  const [newPhoneValid, setNewPhoneValid] = useState(false);
  const [newPhoneMessage, setNewPhoneMessage] = useState(null);

  // validation number
  const validatePhone = useCallback(
    (text) => {
      if (text === null) {
        setNewPhoneMessage(null);
        return false;
      }
      if (!text) {
        setNewPhoneMessage({ error: trans(locale, lang, 'numberRequired') });
        return false;
      }
      if (!regexMobile.test(text)) {
        setNewPhoneMessage({ error: trans(locale, lang, 'numberInvalid') });
        return false;
      }
      let oldPhoneNumber = oldPhone;
      oldPhoneNumber = oldPhoneNumber
        ?.replace(/^8/, '08')
        .replace(/^0/, '62')
        .replace(/^62/, '+62')
        .trim();
      if (text === oldPhoneNumber) {
        setNewPhoneMessage({
          error: trans(locale, lang, 'numberSameWithOld'),
        });
        return false;
      }
      setNewPhoneMessage(null);
      return true;
    },
    [lang, oldPhone],
  );

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    let isValid = validatePhone(newPhone);
    if (isValid) {
      const formatPhoneNumber = newPhone
        .replace(/^8/, '08')
        .replace(/^0/, '62')
        .replace(/^62/, '+62')
        .trim();
      isValid = validatePhone(formatPhoneNumber);
    }
    setNewPhoneValid(isValid);
  }, [newPhone, validatePhone]);

  // render form edit number
  function renderFormEditPhone() {
    return (
      <div>
        <div className="my-4">
          <Input
            disabled={true}
            inputClassName={clsx(
              'md:placeholder:text-sm',
              width === 280
                ? 'placeholder:text-[8.9px]'
                : 'placeholder:text-[12px]',
            )}
            label={trans(locale, lang, 'nomorHPLama')}
            placeholder={trans(locale, lang, 'nomorHPLama')}
            value={oldPhone}
          />
        </div>
        <div>
          <Input
            handleOnChange={(val) => {
              setNewPhone(val);
              setNewPhoneValid(validatePhone(val));
            }}
            inputMode="number"
            label={trans(locale, lang, 'nomorHPBaru')}
            message={newPhoneMessage}
            placeholder={trans(locale, lang, 'nomorHPBaru')}
            required
            value={newPhone}
          />
        </div>
      </div>
    );
  }

  // render submit
  function renderButton() {
    return (
      <div className="w-full py-10">
        <Button
          className="mb-4 mt-4 text-sm md:text-base"
          disabled={!newPhoneValid}
          full
          onButtonClick={() => {
            setIsSubmit(true);
            handleCloseEdit(false);
            setUpdataRequestOtp({
              id: newPhone,
              action: 'VERIFY_NEW_MOBILE_PHONE_NUMBER_POLICY',
            });
            setOtpSendTo(newPhone);
            setActionOTP('VERIFY_NEW_MOBILE_PHONE_NUMBER_POLICY');
          }}
          type="linear-gradient">
          {trans(locale, lang, 'lanjut')}
        </Button>
      </div>
    );
  }
  return (
    <>
      {renderFormEditPhone()}
      {renderButton()}
    </>
  );
}
