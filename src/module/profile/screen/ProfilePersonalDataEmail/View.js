import { Icon } from 'react-icons-kit';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

import locale from './locale';
import ProfileOtp from '../ProfileOtp';
import { trans } from '@cp-util/trans';
import { regexEmail } from '@cp-util/common';
import { ShieldBig } from '@cp-config/Images';
import { arrowLeft } from 'react-icons-kit/feather';
import { Button, Input, Modal, Alert } from '@cp-component';
import {
  SET_PROFILE_REQUEST_OTP_SUCCESS,
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_EMAIL_SUCCESS,
  SET_EMAIL_FAILED,
} from '@cp-module/profile/profileConstant';

export default function Page(props) {
  const {
    setEditEmailActive,
    lang,
    email,
    setEmail,
    setEmailClear,
    setEmailFailed,
    profileAction,
    setUserData,
    setProfileRequestOtp,
    setProfileRequestOtpClear,
    setRequestOtpFailed,
    getPersonalData,
    setProfileRequestOtpFailed,
  } = props;

  // new
  const router = useRouter();
  const [oldEmail, setOldEmail] = useState(email);
  const [newEmail, setNewEmail] = useState('');
  const [newEmailValid, setNewEmailValid] = useState(false);
  const [newEmailMessage, setNewEmailMessage] = useState(null);

  const [otpValue, setOtpValue] = useState(0);
  const [showFormOtp, setShowFormOtp] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [errorOtpMessage, setErrorOtpMessage] = useState(null);

  const setProfileResult = useCallback(
    (act) => {
      if (act === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setShowFormOtp(true);
        setErrorOtpMessage(false);
        setProfileRequestOtpClear();
      }
    },
    [setRequestOtpFailed?.message, newEmail],
  );

  const setNewEmailResult = useCallback(
    (act) => {
      if (act === SET_EMAIL_SUCCESS) {
        setUserData({ userData: { email: newEmail } });
        setShowFormOtp(false);
        setModalSuccess(true);
        setNewEmail('');
        setEmailClear();
        getPersonalData();
      }
      if (act === SET_EMAIL_FAILED) {
        if (!showFormOtp) {
          setNewEmail('');
        } else {
          if (setEmailFailed?.message !== 'INTERNAL_SERVER_ERROR') {
            setErrorOtpMessage(true);
          }
        }
        setEmailClear();
      }
      if (act === SET_PROFILE_REQUEST_OTP_FAILED) {
        if (setProfileRequestOtpFailed?.message?.match('ALREADY_REGISTERED')) {
          setNewEmailMessage({
            error: trans(locale, lang, 'alreadyRegistered'),
          });
        }
        setProfileRequestOtpClear();
      }
    },
    [setEmailFailed?.message, newEmail, setProfileRequestOtpFailed?.message],
  );

  const setSubmitNewNumber = () => {
    if (otpValue?.length == 6) {
      setEmail({
        email: newEmail,
        otp: otpValue,
      });
    } else {
      setErrorOtpMessage(false);
    }
  };

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

  const renderModalSuccess = () => {
    return (
      <Modal isOpen={modalSuccess} size="sm" className="relative">
        <div className="relative p-3">
          <img
            src={ShieldBig}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          {oldEmail ? (
            <p className="pt-12 px-[5%] md:px-[10%] text-lg font-bold text-center mx-auto my-3 md:text-xl">
              {trans(locale, lang, 'updateSukses')}
            </p>
          ) : (
            <>
              <p className="pt-12 px-[5%] md:px-[10%] text-lg font-bold text-center mx-auto my-3 md:text-xl">
                {trans(locale, lang, 'addSukses')}
              </p>
              <p className="text-sm text-center text-gray-500">
                {trans(locale, lang, 'saatIniKamu')}
              </p>
            </>
          )}

          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setEditEmailActive(false);
              setModalSuccess(false);
            }}>
            OK
          </Button>
        </div>
      </Modal>
    );
  };

  useEffect(() => {
    setSubmitNewNumber();
  }, [otpValue]);

  useEffect(() => {
    setNewEmailResult(profileAction);
    setProfileResult(profileAction);
  }, [profileAction]);

  const renderHeader = () => {
    return (
      <div className="flex px-[4%] justify-between border-b-4 w-full text-center">
        <div className="mb-5">
          <Icon
            icon={arrowLeft}
            size={24}
            onClick={() => setEditEmailActive(false)}
            className="cursor-pointer
                text-gray-600 hover:text-red-dark-red90"
          />
        </div>
        <p className="text-sm md:text-base font-bold">
          {trans(locale, lang, email ? 'ubahEmail' : 'tambahEmail')}
        </p>
        <div className="mr-5"></div>
      </div>
    );
  };

  const renderFormEditEmail = () => {
    return (
      <>
        <div className="px-[5%] pt-10">
          <p className="text-xs xm:text-sm md:text-base pb-2">{trans(locale, lang, 'formTitle')}</p>
          {oldEmail && (
          <div className='pt-5'>
            <Input
              disabled
              value={oldEmail}
              label={trans(locale, lang, 'emailLama')}
            />
          </div>
          )}
          <div className='pt-5'>
            <Input
              required
              value={newEmail}
              inputMode="email"
              label={trans(locale, lang, 'emailBaru')}
              placeholder={trans(locale, lang, 'placeholder')}
              handleOnChange={(val) => {
                setNewEmail(val);
                setNewEmailValid(validateEmail(val));
              }}
              message={newEmailMessage}
            />
          </div>

          <Button
            type="linear-gradient"
            shadow
            full
            className="mt-32"
            disabled={!newEmailValid}
            onButtonClick={() => {
              setProfileRequestOtp({
                id: newEmail,
                action: 'CHANGE_EMAIL',
              });
            }}>
            {trans(locale, lang, 'lanjut')}
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      {renderModalSuccess()}
      <div className="pb-5">
        {renderHeader()}
        {showFormOtp ? (
          <ProfileOtp
            setOtpValue={setOtpValue}
            email={newEmail}
            type="email"
            action="CHANGE_EMAIL"
            header={false}
            errorMsg={errorOtpMessage}
          />
        ) : (
          renderFormEditEmail()
        )}
      </div>
    </>
  );
}
