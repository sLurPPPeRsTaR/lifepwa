import locale from './locale';
import { trans } from '@cp-util/trans';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PinSet } from '@cp-config/Images';
import { arrowLeft } from 'react-icons-kit/feather';
import Icon from 'react-icons-kit';
import {
  SET_AUTH_VERIFY_PIN_FAILED,
  SET_AUTH_VERIFY_PIN_SUCCESS,
} from '@cp-module/auth/authConstant';
import OptionOTP from '../OptionOTP';
import CreatePIN from '../CreatePIN';
import { REQUEST_OTP_SECONDS } from '@cp-util/constant';
import { ModalTooFrequently, Modal } from '@cp-component';
const REMAINING_SECONDS = REQUEST_OTP_SECONDS;

const View = (props) => {
  const {
    authAction,
    callBack,
    callbackAction,
    hide,
    isOpen,
    lang,
    setInternalServerError,
    setLoading,
    size = 'sm',
    setAuthVerifyPINClear,
    setAuthVerifyPINFailed,
    setAuthVerifyPIN,
    alreadySetPin = false,
  } = props;

  const [pin, setPin] = useState('');
  const [isWrongPIN, setIsWrongPIN] = useState(false);
  const [showForgotPINOption, setShowForgotPINOption] = useState(false);
  const [showModalCreatePIN, setShowModalCreatePIN] = useState(!alreadySetPin);
  const [isTooFrequentlyModalVisible, setIsTooFrequentlyModalVisible] =
    useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(REMAINING_SECONDS);

  const authApiResult = useCallback(
    (act) => {
      if (act === SET_AUTH_VERIFY_PIN_SUCCESS) {
        setAuthVerifyPINClear();
        setPin('');
        setLoading(false);
        callBack({ success: true, callbackAction });
        hide();
      }
      if (act === SET_AUTH_VERIFY_PIN_FAILED) {
        setAuthVerifyPINClear();
        setPin('');
        setLoading(false);
        const message = setAuthVerifyPINFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          callBack({ success: false, callbackAction });
          setIsWrongPIN(true);
          if (setAuthVerifyPINFailed?.message?.match('TOO_FREQUENTLY_')) {
            setRemainingSeconds(
              Number(setAuthVerifyPINFailed?.message?.substring(15)),
            );
            setIsTooFrequentlyModalVisible(true);
            return;
          }
          return;
        }
        callBack({ success: false, callbackAction });
        setInternalServerError(true);
      }
    },
    [
      callBack,
      callbackAction,
      hide,
      setAuthVerifyPINClear,
      setAuthVerifyPINFailed?.message,
      setInternalServerError,
      setLoading,
    ],
  );

  useEffect(() => {
    authApiResult(authAction);
  }, [authApiResult, authAction]);

  const inputPin = useRef(null);

  const handleInputPIN = (e) => {
    e.preventDefault();
    const pattern = /^[0-9]*$/;
    let inputValue = e.target?.value;

    if (!pattern.test(inputValue)) {
      inputValue = inputValue.slice(0, -1);
    } else if (inputValue.length <= 6) {
      setIsWrongPIN(false);
      setPin(inputValue);
    }
  };

  useEffect(() => {
    if (pin.length === 6) {
      setLoading(true);
      inputPin.current.blur();
      setAuthVerifyPIN({ pin: pin });
      setIsWrongPIN(false);
    }
  }, [pin, setAuthVerifyPIN, setLoading]);

  const renderForgotPIN = () => {
    const closeModal = () => setShowForgotPINOption(false);
    return (
      showForgotPINOption && (
        <OptionOTP
          size={size}
          titleModal={trans(locale, lang, 'resetPin')}
          isOpen={showForgotPINOption}
          hide={closeModal}
          callBack={(res) => {
            if (res.success === true && res.callBackAction === callbackAction) {
              setShowModalCreatePIN(true);
            }
          }}
          callBackAction={callbackAction}
          action="RESET_PIN"
        />
      )
    );
  };

  const renderCreatePIN = () => {
    const closeModal = () => {
      setShowModalCreatePIN(false);
      if (!alreadySetPin) {
        hide();
      }
    };

    return (
      <CreatePIN
        isOpen={showModalCreatePIN}
        size={size}
        hide={closeModal}
        callBack={(res) => {
          if (res.success === true && callbackAction === res.callBackAction) {
            closeModal();
          }
        }}
      />
    );
  };

  const renderTooFrequentlyModal = () => {
    const closeModal = () => {
      setIsTooFrequentlyModalVisible(false);
    };
    return (
      isTooFrequentlyModalVisible && (
        <ModalTooFrequently
          isOpen={isTooFrequentlyModalVisible}
          setClose={closeModal}
          remainingSeconds={remainingSeconds}
        />
      )
    );
  };

  return (
    <>
      <Modal
        size={size}
        isOpen={
          !showForgotPINOption &&
          !isTooFrequentlyModalVisible &&
          !showModalCreatePIN &&
          isOpen
        }
        className="relative">
        <div className="flex justify-between items-center mb-5 w-full">
          <Icon
            icon={arrowLeft}
            size={20}
            className="opacity-50 pb-1 z-50 cursor-pointer"
            onClick={() => {
              setIsWrongPIN(false);
              hide();
            }}
          />
          <p className="text-sm font-bold ">{trans(locale, lang, 'title')}</p>
          <div className="w-4"></div>
        </div>
        <div className="px-1 mb-2 xm:mb-4 md:px-5">
          <img src={PinSet} className="w-1/2 mx-auto" />
          <p className="font-bold text-center w-full pt-5 pb-2 md:py-5">
            {trans(locale, lang, 'text')}
          </p>

          <div className="w-full flex justify-between gap-1 relative">
            {Array(6)
              .fill()
              .map((_, i) => (
                <div key={`modalInputPin[${i}]`} className="px-1 w-full">
                  <div
                    className={`px-1 w-full h-16 border-b-2 flex justify-center items-center text-neutral-light-neutral90 font-semibold text-h6 ${
                      isWrongPIN ? 'border-red-500' : ''
                    }`}>
                    {pin[i] ? '*' : ''}
                  </div>
                </div>
              ))}
            <input
              className="absolute z-10 w-full h-full pb-4 top-0 bg-transparent left-0 outline-none opacity-0"
              ref={inputPin}
              type="text"
              value={pin}
              inputMode="numeric"
              onChange={(e) => handleInputPIN(e)}
            />
          </div>
          {isWrongPIN && (
            <p className="text-body2 pt-3 text-medium font-semibold text-primary-light-primary90 px-[8%] text-center">
              {trans(locale, lang, 'wrongInputPIN')}
            </p>
          )}
          {/* <div className="relative"></div> */}
          <div
            role="button"
            className="text-red-500 pt-5 text-center font-semibold underline duration-300 hover:no-underline text-xs xm:text-sm"
            onClick={() => setShowForgotPINOption(true)}>
            {trans(locale, lang, 'forgotBtnText')}
          </div>
        </div>
      </Modal>
      {renderForgotPIN()}
      {renderCreatePIN()}
      {renderTooFrequentlyModal()}
    </>
  );
};

export default View;
