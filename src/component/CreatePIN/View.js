import { toast } from 'react-toastify';
import Image from 'next/image';
import locale from './locale';
import { trans } from '@cp-util/trans';
import { Button, Container, Input, Modal } from '@cp-component';
import { SET_SUBMISSION_SUCCESS } from '@cp-module/lifesaver/lifesaverConstant';
import { BadgeTick, Eye1, EyeOff1 } from '@cp-config/Svgs';
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  SET_KYC_PIN_FAILED,
  SET_KYC_PIN_SUCCESS,
} from '@cp-module/kyc/kycConstant';
import Icon from 'react-icons-kit';
import { checkmarkCircled } from 'react-icons-kit/ionicons';
import { closeCircled } from 'react-icons-kit/ionicons';
import {
  SET_CREATE_PIN_FAILED,
  SET_CREATE_PIN_SUCCESS,
} from '@cp-module/profile/profileConstant';

export default function Page({
  lang,
  kycAction,
  setUserData,
  setCreatePin,
  setCreatePinClear,
  setCreatePinFailed,
  profileAction,
  setCreatePinResponse,
  setActive,
}) {
  const firstUpdate = useRef(true);
  const [pin, setPin] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [confirmPin, setConfirmPin] = useState();
  const [isModalSuccessActive, setModalSuccessActive] = useState(false);
  const [pinMessage, setPinMessage] = useState(null);
  const [pinConfMessage, setPinConfMessage] = useState(null);
  const [isValidPin, setValidPin] = useState(false);
  const [isValidPinConf, setValidPinConf] = useState(false);
  const [pinVisible, setPinVisible] = useState(false);
  const [confirmPinVisible, setConfirmPinVisible] = useState(false);

  useEffect(() => {
    setCreatePinResult(profileAction);
  }, [profileAction, setCreatePinResult]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidPin(validatePin(pin));
    setValidPinConf(validatePinConf(confirmPin));
  }, [confirmPin, pin, validatePin, validatePinConf]);

  const validatePin = useCallback(
    (text) => {
      const regexNumber = /^[0-9]*$/;
      if (!text) {
        return false;
      }
      if (text?.length < 1) {
        setPinMessage({ error: trans(locale, lang, 'newPINRequired') });
        return false;
      }
      if (!regexNumber.test(text) && text) {
        setPinMessage({ error: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      if (text?.length < 6) {
        setPinMessage({ error: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      if (text?.length > 6) {
        setPinMessage({ error: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      setPinMessage(null);
      return true;
    },
    [lang],
  );

  const validatePinConf = useCallback(
    (text) => {
      if (!text) {
        return false;
      }
      if (text?.length < 1) {
        setPinConfMessage({ error: trans(locale, lang, 'confPINRequired') });
        return false;
      }
      if (text !== pin) {
        setPinConfMessage({
          error: trans(locale, lang, 'confPINInvalid'),
        });
        return false;
      }
      setPinConfMessage(null);
      return true;
    },
    [lang, pin],
  );

  const setCreatePinResult = useCallback(
    (act) => {
      console.log('comp -->',act)
      if (act === SET_CREATE_PIN_SUCCESS) {
        setUserData({
          userData: {
            alreadySetPin: true,
            alreadySetMPin: true,
          },
        });
        setModalSuccessActive(true);
        setCreatePinClear();
      }
      if (act === SET_CREATE_PIN_FAILED) {
        if (setCreatePinFailed?.message == 'BAD_REQUEST') {
          toast.error('Bad Request!');
        }
        setCreatePinClear();
      }
      setIsSubmit(false);
    },
    [setCreatePinClear, setCreatePinFailed?.message, setUserData],
  );

  // const getKycResult = useCallback(
  //   (act) => {
  //     if (act === SET_KYC_PIN_SUCCESS) {
  //       setModalSuccessActive(true);
  //       setUserData({
  //         userData: {
  //           alreadySetPin: true,
  //           alreadySetMPin: true,
  //         },
  //       });
  //       setCreatePinClear();
  //     }
  //     if (act === SET_KYC_PIN_FAILED) {
  //       setCreatePinClear();
  //       if (setCreatePinFailed?.message !== 'INTERNAL_SERVER_ERROR') {
  //         toast.error('INTERNAL_SERVER_ERROR');
  //         return;
  //       }
  //       toast.error('INTERNAL_SERVER_ERROR');
  //     }
  //   },
  //   [setCreatePinClear, setCreatePinFailed?.message, setUserData],
  // );

  // useEffect(() => {
  //   getKycResult(kycAction);
  // }, [getKycResult, kycAction]);

  // useEffect(() => {
  //   lifesaverResult(profileAction);
  // }, [profileAction, lifesaverResult]);

  // useEffect(() => {
  //   if (setCreatePinResponse?.transactionId && isSubmit) {
  //     setIsSubmit(false);
  //     setActive(false);
  //   }
  // }, [setCreatePinResponse, isSubmit]);

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative h-14 flex items-center border-b-2">
        <div className="absolute w-full text-center text-body1 font-bold">
          {trans(locale, lang, 'title')}
        </div>
      </div>
    );
  }

  function renderInput() {
    return (
      <div className="mb-16">
        <div className="text-body2 text-neutral-dark-neutral60 font-medium mb-8">
          {trans(locale, lang, 'buatPinUntuk')}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-2 sm:mb-0">
          <Input
            type={!pinVisible ? 'password' : 'number'}
            className="w-full mb-4"
            value={pin}
            inputMode="numeric"
            label={trans(locale, lang, 'buatPinForm')}
            placeholder={trans(locale, lang, 'masukkanPin')}
            message={pinMessage}
            suffixIcon={
              <div className="flex space-x-3">
                {pin?.length > 5 && (
                  <Icon
                    icon={isValidPin ? checkmarkCircled : closeCircled}
                    size={24}
                    className={
                      isValidPin ? 'text-green-700' : 'text-red-dark-red90'
                    }
                  />
                )}
                <div
                  role="button"
                  onClick={() => setPinVisible(!pinVisible)}
                  className="flex items-center w-6">
                  <img src={!pinVisible ? EyeOff1 : Eye1} />
                </div>
              </div>
            }
            handleOnChange={(val) => {
              if (val.length < 7) {
                setPin(val.replace(/[^0-9]/g, ''));
              }
            }}
            required
          />
          <Input
            type={!confirmPinVisible ? 'password' : 'number'}
            className="w-full mb-4"
            value={confirmPin}
            inputMode="numeric"
            label={trans(locale, lang, 'konfirmasiUlangPin')}
            placeholder={trans(locale, lang, 'konfirmasiPin')}
            message={pinConfMessage}
            suffixIcon={
              <div className="flex space-x-3">
                {confirmPin?.length > 5 && (
                  <Icon
                    icon={isValidPinConf ? checkmarkCircled : closeCircled}
                    size={24}
                    className={
                      isValidPinConf ? 'text-green-700' : 'text-red-dark-red90'
                    }
                  />
                )}
                <div
                  role="button"
                  onClick={() => setConfirmPinVisible(!confirmPinVisible)}
                  className="flex items-center w-6">
                  <img src={!confirmPinVisible ? EyeOff1 : Eye1} />
                </div>
              </div>
            }
            handleOnChange={(val) => {
              if (val.length < 7) {
                setConfirmPin(val.replace(/[^0-9]/g, ''));
              }
            }}
            required
          />
        </div>
      </div>
    );
  }

  function renderButton() {
    return (
      <div className="flex md:mt-40 flex-col gap-4">
        <Button
          type="linear-gradient"
          disabled={!isValidPin || !isValidPinConf}
          onButtonClick={() => {
            setCreatePin({
              pin: pin,
              pinConfirmation: confirmPin,
            });
          }}
          shadow
          full>
          {trans(locale, lang, 'buatPinBtn')}
        </Button>
      </div>
    );
  }

  function renderModalSuccess() {
    return (
      <Modal
        size='sm'
        className="relative"
        isOpen={isModalSuccessActive}
        toggle={() => setModalSuccessActive(false)}>
        <div className="absolute -ml-4 -mt-28 w-full flex justify-center mb-6">
          <img src={BadgeTick} width={146} height={146} />
        </div>
        <div className="text-center text-h6 text-neutral-light-neutral90 font-bold mt-16 mb-4">
          {trans(locale, lang, 'titleModalSukses')}
        </div>
        <div className="text-center text-sm mb-4 sm:mb-8">
          {trans(locale, lang, 'subTitleModalSukses')}
        </div>
        <Button
          className="mb-4"
          type="linear-gradient"
          onButtonClick={() => {
            setActive(false);
          }}
          shadow
          full>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </Modal>
    );
  }

  return (
    <>
      {/* <Container className="relative" fullScreen noBackground>
        <div className="hidden sm:block absolute w-full h-40 border bg-gradient-to-r from-[#FE684D] to-[#ED1C24] rounded-b-[100px]" />
        <div className="w-full flex justify-center sm:px-4 sm:p-4 mb-12">
          <div className="z-10 w-full sm:max-w-[640px] bg-white shadow-md sm:mt-10 sm:rounded-2xl">
          </div>
        </div>
      </Container> */}
      <div className="px-3 py-8 md:px-6 w-full">
        {renderInput()}
        {renderButton()}
      </div>
      {renderModalSuccess()}
    </>
  );
}
