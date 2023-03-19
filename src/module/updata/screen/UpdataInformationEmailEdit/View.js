/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button, HeaderPage, Input, InputOTP, Modal } from '@cp-component';
import Icon from 'react-icons-kit';
import { regexEmail } from '@cp-util/common';
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

  // email
  const oldEmail =
    otherInformation?.data?.email ||
    getUpdataLastOtherInfoResponse?.data?.email;
  const [newEmail, setNewEmail] = useState('');
  const [newEmailValid, setNewEmailValid] = useState(false);
  const [newEmailMessage, setNewEmailMessage] = useState(null);

  // validation email
  const validateEmail = (text) => {
    if (text.length < 1) {
      setNewEmailMessage({ error: trans(locale, lang, 'emailRequired') });
      return false;
    }
    if (!regexEmail.test(text)) {
      setNewEmailMessage({ error: trans(locale, lang, 'emailInvalid') });
      return false;
    }
    if (text === oldEmail) {
      setNewEmailMessage({
        error: trans(locale, lang, 'emailSameWithOld'),
      });
      return false;
    }
    setNewEmailMessage(null);
    return true;
  };

  // render form edit email
  function renderFormEditEmail() {
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
            label={trans(locale, lang, 'emailLama')}
            placeholder={trans(locale, lang, 'emailLama')}
            value={
              otherInformation?.data?.email ||
              getUpdataLastOtherInfoResponse?.data?.email
            }
          />
        </div>
        <div>
          <Input
            handleOnChange={(val) => {
              setNewEmail(val);
              setNewEmailValid(validateEmail(val));
            }}
            inputMode="email"
            label={trans(locale, lang, 'emailBaru')}
            message={newEmailMessage}
            placeholder={trans(locale, lang, 'emailBaru')}
            required
            value={newEmail}
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
          disabled={!newEmailValid}
          full
          onButtonClick={() => {
            setIsSubmit(true);
            handleCloseEdit(false);
            setUpdataRequestOtp({
              id: newEmail,
              action: 'VERIFY_NEW_EMAIL_POLICY',
            });
            setOtpSendTo(newEmail);
            setActionOTP('VERIFY_NEW_EMAIL_POLICY');
          }}
          type="linear-gradient">
          {trans(locale, lang, 'lanjut')}
        </Button>
      </div>
    );
  }
  return (
    <>
      {renderFormEditEmail()}
      {renderButton()}
    </>
  );
}
