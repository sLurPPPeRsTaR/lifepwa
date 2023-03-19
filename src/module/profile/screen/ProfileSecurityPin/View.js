import { toast } from 'react-toastify';
import { Icon } from 'react-icons-kit';
import { useEffect, useState, useCallback } from 'react';

import locale from './locale';

import { trans } from '@cp-util/trans';
import { Eye1, EyeOff1 } from '@cp-config/Svgs';
import { ProfileAddress, ShieldBig } from '@cp-config/Images';
import { Button, Input, Modal, Alert, ModalNotAvailable } from '@cp-component';

import {
  closeRound,
  closeCircled,
  androidArrowBack,
  checkmarkCircled,
  androidRadioButtonOff,
} from 'react-icons-kit/ionicons';
import {
  SET_CHANGE_PIN_SUCCESS,
  SET_CHANGE_PIN_FAILED,
} from '@cp-module/profile/profileConstant';
import { profile } from 'react-icons-kit/icomoon';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';

export default function Page(props) {
  const {
    lang,
    setUserData,
    profileAction,
    setChangePin,
    setChangePinClear,
    setChangePinFailed,
    handleSuccess,
  } = props;

  const [oldPin, setOldPin] = useState(null);
  const [pin, setPin] = useState(null);
  const [pinConf, setPinConf] = useState(null);

  const [oldPinMessage, setOldPinMessage] = useState(null);
  const [pinMessage, setPinMessage] = useState(null);
  const [pinConfMessage, setPinConfMessage] = useState(null);

  const [isValidOldPin, setValidOldPin] = useState(false);
  const [isValidPin, setValidPin] = useState(false);
  const [isValidPinConf, setValidPinConf] = useState(false);

  const [oldPinVisibility, setOldPinVisibility] = useState(true);
  const [pinVisibility, setPinVisibility] = useState(true);
  const [pinConfVisibility, setPinConfVisibility] = useState(true);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setChangePinResult(profileAction);
  }, [profileAction, setChangePinResult]);

  const setChangePinResult = useCallback(
    (act) => {
      if (act === SET_CHANGE_PIN_SUCCESS) {
        setUserData({
          userData: {
            alreadySetPin: true,
            alreadySetMPin: true,
          },
        });
        setModalSuccess(true);
      }
      if (act === SET_CHANGE_PIN_FAILED) {
        if (setChangePinFailed?.message === 'OLD_PIN_NOT_MATCH') {
          setValidOldPin(false);
          setOldPinMessage({ error: trans(locale, lang, 'pinLamaSalah') });
        } else {
          toast.error(setChangePinFailed?.message);
        }
      }
      setIsSubmit(false);
      setChangePinClear();
    },
    [lang, setChangePinClear, setChangePinFailed?.message],
  );

  // Validate Old Pin, Pin & Pin Confirmation
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidOldPin(validateOldPin(oldPin));
    setValidPin(validatePin(pin));
    setValidPinConf(validatePinConf(pinConf));
  }, [oldPin, pin, pinConf, validateOldPin, validatePin, validatePinConf]);

  const validateOldPin = useCallback(
    (text) => {
      const regexNumber = /^[0-9]*$/;
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setOldPinMessage({ error: trans(locale, lang, 'oldPinRequired') });
        return false;
      }
      if (!regexNumber.test(text)) {
        setOldPinMessage({ error: trans(locale, lang, 'oldPinIsNumber') });
        return false;
      }
      if (text.length < 6) {
        setOldPinMessage({ error: trans(locale, lang, 'validationOldPin') });
        return false;
      }
      if (text.length > 6) {
        setOldPinMessage({ error: trans(locale, lang, 'oldPinLength') });
        return false;
      }
      setOldPinMessage(null);
      return true;
    },
    [lang],
  );

  const validatePin = useCallback(
    (text) => {
      const regexNumber = /^[0-9]*$/;
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setPinMessage({ error: trans(locale, lang, 'pinRequired') });
        return false;
      }
      if (!regexNumber.test(text)) {
        setPinMessage({ error: trans(locale, lang, 'pinIsNumber') });
        return false;
      }
      if (text.length < 6) {
        setPinMessage({ error: trans(locale, lang, 'validationPin') });
        return false;
      }
      if (text === oldPin) {
        setPinMessage({ error: trans(locale, lang, 'pinSameWithOld') });
        return false;
      }
      if (text.length > 6) {
        setPinMessage({ error: trans(locale, lang, 'pinLength') });
        return false;
      }
      setPinMessage(null);
      return true;
    },
    [lang, oldPin],
  );

  const validatePinConf = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setPinConfMessage({ error: trans(locale, lang, 'confirmPinRequired') });
        return false;
      }
      if (text !== pin) {
        setPinConfMessage({
          error: trans(locale, lang, 'pinNotSame'),
        });
        return false;
      }
      setPinConfMessage(null);
      return true;
    },
    [lang, pin],
  );

  const renderFormCreatePin = () => {
    return (
      <>
        <div className="w-full min-h-[40vh] h-full flex flex-col">
          <p className="text-body2 pb-4">
            {trans(locale, lang, 'contentTitle')}
          </p>
          <div className="flex justify-between flex-col md:flex-row">
            <div className="mt-4 mb-2 w-full">
              <Input
                maxLength={6}
                required
                value={oldPin}
                inputMode="numeric"
                type={!oldPinVisibility ? 'number' : 'password'}
                label={trans(locale, lang, 'inputLabel1')}
                placeholder={trans(locale, lang, 'inputPlaceholder1')}
                suffixIcon={
                  <div className="flex space-x-3">
                    {/* {oldPin?.length > 5 && (
                      <Icon
                        icon={isValidOldPin ? checkmarkCircled : closeCircled}
                        size={24}
                        className={
                          isValidOldPin
                            ? 'text-green-700'
                            : 'text-red-dark-red90'
                        }
                      />
                    )} */}

                    <div
                      role="button"
                      onClick={() => setOldPinVisibility(!oldPinVisibility)}
                      className="flex items-center w-6">
                      <img src={!oldPinVisibility ? Eye1 : EyeOff1} />
                    </div>
                  </div>
                }
                message={oldPinMessage}
                handleOnChange={(text) =>
                  setOldPin(text.replace(/[^0-9]/g, ''))
                }
              />
              <div className="mt-2 mb-2">
                <Input
                  maxLength={6}
                  required
                  value={pin}
                  inputMode="numeric"
                  type={!pinVisibility ? 'number' : 'password'}
                  label={trans(locale, lang, 'inputLabel2')}
                  placeholder={trans(locale, lang, 'inputPlaceholder2')}
                  suffixIcon={
                    <div className="flex space-x-3">
                      {pin?.length > 5 && (
                        <Icon
                          icon={isValidPin ? checkmarkCircled : closeCircled}
                          size={24}
                          className={
                            isValidPin
                              ? 'text-green-700'
                              : 'text-red-dark-red90'
                          }
                        />
                      )}

                      <div
                        role="button"
                        onClick={() => setPinVisibility(!pinVisibility)}
                        className="flex items-center w-6">
                        <img src={!pinVisibility ? Eye1 : EyeOff1} />
                      </div>
                    </div>
                  }
                  handleOnChange={(text) => setPin(text.replace(/[^0-9]/g, ''))}
                  message={pinMessage}
                />
              </div>
              <Input
                maxLength={6}
                required
                value={pinConf}
                inputMode="numeric"
                type={!pinConfVisibility ? 'text' : 'password'}
                label={trans(locale, lang, 'inputLabel3')}
                placeholder={trans(locale, lang, 'inputPlaceholder3')}
                suffixIcon={
                  <div className="flex space-x-3">
                    {pinConf?.length > 5 && (
                      <Icon
                        icon={isValidPinConf ? checkmarkCircled : closeCircled}
                        size={24}
                        className={
                          isValidPinConf
                            ? 'text-green-700'
                            : 'text-red-dark-red90'
                        }
                      />
                    )}

                    <div
                      role="button"
                      onClick={() => setPinConfVisibility(!pinConfVisibility)}
                      className="flex items-center w-6">
                      <img src={!pinConfVisibility ? Eye1 : EyeOff1} />
                    </div>
                  </div>
                }
                handleOnChange={(text) =>
                  setPinConf(text.replace(/[^0-9]/g, ''))
                }
                message={pinConfMessage}
              />
            </div>
          </div>
          {/* <Alert>
            <p className="text-caption1 pl-2 font-bold text-gray-500">
              {trans(locale, lang, 'pinNote')}
            </p>
          </Alert> */}
        </div>

        <Button
          className="mt-20"
          type="linear-gradient"
          shadow
          full
          disabled={
            !isValidOldPin || !isValidPin || !isValidPinConf || isSubmit
          }
          onButtonClick={() => {
            setIsSubmit(true);
            setChangePin({
              oldPin,
              newPin: pin,
              newPinConfirmation: pinConf,
            });
          }}>
          {trans(locale, lang, 'btnLabel')}
        </Button>
      </>
    );
  };

  // modal success
  const renderModalSuccess = () => {
    return (
      <Modal isOpen={modalSuccess} className="relative" size="sm">
        <div className="relative p-3">
          <img
            src={ShieldBig}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center mx-auto my-3">
            {trans(locale, lang, 'successChanged')}
          </p>
          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setModalSuccess(false);
              handleSuccess();
            }}>
            {trans(locale, lang, 'successBtnLabel')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="bg-white w-[90%] mx-auto divide-y py-10">
      {renderModalSuccess()}
      {renderFormCreatePin()}
    </div>
  );
}
