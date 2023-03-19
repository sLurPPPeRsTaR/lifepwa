import { Icon } from 'react-icons-kit';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

import locale from './locale';
import ProfileOtp from '../ProfileOtp';
import { trans } from '@cp-util/trans';
import { regexGlobalPhoneNumber, regexMobile } from '@cp-util/common';
import { ShieldBig } from '@cp-config/Images';
import { arrowLeft } from 'react-icons-kit/feather';
import { Button, Input, Modal, Alert } from '@cp-component';
import {
  SET_PROFILE_REQUEST_OTP_SUCCESS,
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PHONE_NUMBER_SUCCESS,
  SET_PHONE_NUMBER_FAILED,
} from '@cp-module/profile/profileConstant';

export default function Page(props) {
  const {
    setEditPhoneActive,
    lang,
    phone,
    setUserData,
    setPhoneNumber,
    setPhoneNumberClear,
    setPhoneNumberFailed,
    profileAction,
    setProfileRequestOtp,
    setProfileRequestOtpClear,
    setRequestOtpFailed,
    getPersonalData,
    getPersonalDataResponse,
    setProfileRequestOtpFailed,
  } = props;

  // new
  const router = useRouter();
  const oldPhone = phone;
  const [newPhone, setNewPhone] = useState('');
  const [newPhoneValid, setNewPhoneValid] = useState(false);
  const [newNumberMessage, setNewNumberMessage] = useState(null);
  const [errorOtpMessage, setErrorOtpMessage] = useState(null);

  const [otpValue, setOtpValue] = useState();
  const [showFormOtp, setShowFormOtp] = useState();
  const [modalSuccess, setModalSuccess] = useState();

  const setProfileResult = useCallback(
    (act) => {
      if (act === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setShowFormOtp(true);
        setErrorOtpMessage(false);
        setProfileRequestOtpClear();
      }
    },
    [setRequestOtpFailed?.message, newPhone],
  );

  const setNewNumberResult = useCallback(
    (act) => {
      if (act === SET_PHONE_NUMBER_SUCCESS) {
        setUserData({
          userData: {
            mobilePhoneNumber:
              newPhone?.charAt(0) !== '+' ? `+${newPhone}` : newPhone,
          },
        });
        setShowFormOtp(false);
        setModalSuccess(true);
        setNewPhone('');
        setPhoneNumberClear();
        getPersonalData();
      }
      if (act === SET_PHONE_NUMBER_FAILED) {
        if (!showFormOtp) {
          setNewPhone('');
        } else {
          if (setPhoneNumberFailed?.message !== 'INTERNAL_SERVER_ERROR') {
            setErrorOtpMessage(true);
          }
        }
        setPhoneNumberClear();
      }
      if (act === SET_PROFILE_REQUEST_OTP_FAILED) {
        if (setProfileRequestOtpFailed?.message?.match('ALREADY_REGISTERED')) {
          setNewNumberMessage({
            error: trans(locale, lang, 'alreadyRegistered'),
          });
        }
        setProfileRequestOtpClear();
      }
    },
    [
      setPhoneNumberFailed?.message,
      newPhone,
      setProfileRequestOtpFailed?.message,
    ],
  );

  const setSubmitNewNumber = () => {
    if (otpValue?.length == 6) {
      setPhoneNumber({
        mobilePhoneNumber:
          newPhone?.charAt(0) !== '+' ? `+${newPhone}` : newPhone,
        otp: otpValue,
      });
    } else {
      setErrorOtpMessage(false);
    }
  };

  const validatePhoneNumber = (text) => {
    if (text.length < 1) {
      setNewNumberMessage({ error: trans(locale, lang, 'numberRequired') });
      return false;
    }
    if (!regexMobile.test(text)) {
      setNewNumberMessage({ error: trans(locale, lang, 'numberInvalid') });
      return false;
    }
    const newNumberTemp = text.charAt(0) !== '+' ? `+${text}` : text;
    if (newNumberTemp === oldPhone || oldPhone == text) {
      setNewNumberMessage({
        error: trans(locale, lang, 'numberSameWithOld'),
      });
      return false;
    }
    setNewNumberMessage(null);
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
          <p className="pt-12 px-[5%] md:px-[10%] text-lg font-bold text-center mx-auto my-3 md:text-xl">
            {trans(locale, lang, 'updateSukses')}
          </p>
          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setEditPhoneActive(false);
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
    setNewNumberResult(profileAction);
    setProfileResult(profileAction);
  }, [profileAction]);

  const renderHeader = () => {
    return (
      <div className="flex px-[4%] justify-between border-b-4 w-full text-center">
        <div className="mb-5">
          <Icon
            icon={arrowLeft}
            size={24}
            onClick={() => setEditPhoneActive(false)}
            className="cursor-pointer
                text-gray-600 hover:text-red-dark-red90"
          />
        </div>
        <text className="text-sm md:text-base font-bold">
          {trans(locale, lang, 'ubahPhone')}
        </text>
        <div className="mr-5"></div>
      </div>
    );
  };

  const renderFormEditPhone = () => {
    return (
      <>
        <div className="px-[5%] pt-10">
          <p className="text-base pb-5">{trans(locale, lang, 'formTitle')}</p>

          <Input
            className="mt-5"
            disabled
            value={oldPhone}
            label={trans(locale, lang, 'nomorLama')}
          />
          <Input
            type="number"
            className="mt-8"
            value={newPhone}
            inputMode="tel"
            prefixIcon={'+'}
            label={trans(locale, lang, 'nomorBaru')}
            placeholder={trans(locale, lang, 'placeholder')}
            handleOnChange={(val) => {
              const re = /^[0-9\b]+$/;
              if (val === '' || re.test(val)) {
                setNewPhone(val);
                setNewPhoneValid(validatePhoneNumber(val));
              }
            }}
            message={newNumberMessage}
          />

          <Button
            type="linear-gradient"
            shadow
            full
            className="mt-32"
            disabled={!newPhoneValid}
            onButtonClick={() => {
              setProfileRequestOtp({
                id: newPhone?.charAt(0) !== '+' ? `+${newPhone}` : newPhone,
                action: 'CHANGE_MOBILE_PHONE_NUMBER',
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
            phoneNumber={newPhone}
            type="phone"
            action="CHANGE_MOBILE_PHONE_NUMBER"
            header={false}
            errorMsg={errorOtpMessage}
          />
        ) : (
          renderFormEditPhone()
        )}
      </div>
    </>
  );
}
