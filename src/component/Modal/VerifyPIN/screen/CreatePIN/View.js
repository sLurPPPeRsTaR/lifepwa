import locale from './locale';
import { trans } from '@cp-util/trans';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PinSet } from '@cp-config/Images';
import { arrowLeft } from 'react-icons-kit/feather';
import Icon from 'react-icons-kit';
import {
  SET_AUTH_CREATE_PIN_SUCCESS,
  SET_AUTH_CREATE_PIN_FAILED,
} from '@cp-module/auth/authConstant';
import { Button } from '@cp-component';
import { Modal } from '@cp-component';
// import { BadgeTick } from '@cp-config/Svgs';
import { Input } from '@cp-component';
import { EyeOff1 } from '@cp-config/Svgs';
import { Eye1 } from '@cp-config/Svgs';
import { closeCircled } from 'react-icons-kit/ionicons';
import { checkmarkCircled } from 'react-icons-kit/ionicons';
import { ModalSuccess } from '@cp-component';

const View = (props) => {
  const {
    lang,
    isOpen,
    hide,
    setLoading,
    authAction,
    setAuthCreatePIN,
    setAuthCreatePINClear,
    size = 'sm',
    callBackAction,
    callBack,
    setUserData,
  } = props;

  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [pinVisible, setPinVisible] = useState(false);
  const [pinMessage, setPinMessage] = useState('');
  const [pinConfMessage, setPinConfMessage] = useState('');
  const [confirmPinVisible, setConfirmPinVisible] = useState(false);
  const [isValidPin, setValidPin] = useState(false);
  const [isValidPinConf, setValidPinConf] = useState(false);

  const authApiResult = useCallback(
    (action) => {
      if (action === SET_AUTH_CREATE_PIN_SUCCESS) {
        setAuthCreatePINClear();
        setPin('');
        setConfirmPin('');
        setLoading(false);
        setShowModalSuccess(true);
        setUserData({
          userData: {
            alreadySetPin: true,
            alreadySetMPin: true,
          },
        });
        return;
      } else if (action === SET_AUTH_CREATE_PIN_FAILED) {
        setPin('');
        setConfirmPin('');
        setLoading(false);
        return;
      }
    },
    [setAuthCreatePINClear, setLoading, setUserData],
  );

  useEffect(() => {
    authApiResult(authAction);
  }, [authApiResult, authAction]);

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

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidPin(validatePin(pin));
    setValidPinConf(validatePinConf(confirmPin));
  }, [confirmPin, pin, validatePin, validatePinConf]);

  function renderInput() {
    return (
      <div className="mb-10">
        <div className="text-body2 text-neutral-dark-neutral60 font-medium mb-8">
          {trans(locale, lang, 'buatPinUntuk')}
        </div>
        <div className="w-full">
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
                  <img src={!pinVisible ? EyeOff1 : Eye1} alt="" />
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
                  <img src={!confirmPinVisible ? EyeOff1 : Eye1} alt="" />
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
      <div className="flex flex-col gap-4 w-full">
        <Button
          type="linear-gradient"
          disabled={!isValidPin || !isValidPinConf}
          onButtonClick={() => {
            setLoading(true);
            setAuthCreatePIN({
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
      <ModalSuccess
        btnTitle={trans(locale, lang, 'lanjut')}
        isOpen={showModalSuccess}
        setClose={() => {
          setShowModalSuccess(false);
          hide();
          callBack({ success: true, callBackAction });
        }}
        title={trans(locale, lang, 'titleModalSukses')}
      />
    );
  }

  return (
    <>
      <Modal
        size={size}
        isOpen={isOpen && !showModalSuccess}
        className="relative"
        // isOpen={isOpen}
        imageSrc={PinSet}
        imageClassName="w-[210px] h-[210px] mt-[-160px]"
        // isOverlapImage
      >
        <div className="flex justify-between items-center mb-5 w-full">
          <Icon
            icon={arrowLeft}
            size={20}
            className="opacity-50 pb-1 z-50 cursor-pointer"
            onClick={() => {
              hide();
            }}
          />
          <p className="text-sm font-bold ">{trans(locale, lang, 'title')}</p>
          <div className="w-4"></div>
        </div>
        {renderInput()}
        {renderButton()}
      </Modal>
      {renderModalSuccess()}
    </>
  );
};

export default View;
