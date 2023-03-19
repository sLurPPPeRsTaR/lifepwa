import { regexEmail, useInterval } from '@cp-util/common';
import { useState } from 'react';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { useRef } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { PinSet } from '@cp-config/Images';
import { Button, Modal } from '@cp-component';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/ionicons';
import { TimeLogin } from '@cp-config/Svgs';

const REMAINING_SECONDS = 300;

export default function Component({
  lang,
  deviceId,
  onHandleSubmitPIN,
  onHandleForgotPIN,
  onHandleSubmitPINClear,
  submitPINFailed,
  errorMsg,
  setErrorMsg,
  message,
}) {
  const inputPin = useRef(null);

  const [pin, setPin] = useState('');
  const [lapsedTime, setLapsedTime] = useState(REMAINING_SECONDS);
  const [showModalFiveTimesWrong, setShowModalFiveTimesWrong] = useState(false);

  function renderHeader() {
    return (
      <div className="relative h-14 flex items-center border-b bg-white">
        <div className="absolute w-full text-center text-body1 font-bold">
          {trans(locale, lang, 'pin')}
        </div>
      </div>
    );
  }

  function renderImageContainer() {
    return (
      <div className="flex justify-center items-center pt-5 pb-10">
        <img src={PinSet} className="w-52" />
      </div>
    );
  }

  function renderTitleContainer() {
    return (
      <div className="mb-4 bg-white">
        <p className="text-body1 font-bold text-center px-[8%]">
          {trans(locale, lang, 'masukkanPinKamu')}
        </p>
      </div>
    );
  }

  function renderGroupLine() {
    return (
      <div className="py-5 relative">
        <div
          className="flex justify-center gap-4"
          onClick={() => {
            if (inputPin && inputPin.current) {
              inputPin.current.blur();
              setTimeout(() => {
                if (inputPin && inputPin.current) {
                  inputPin.current.focus();
                }
              }, 100);
            }
          }}>
          {Array(6)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className={`w-12 h-16 border rounded-lg flex justify-center items-center text-neutral-light-neutral90 font-semibold text-h6 ${
                  errorMsg ? 'border-primary-light-primary90' : ''
                }`}>
                {pin[i] ? '*' : ''}
              </div>
            ))}
        </div>
        <input
          className="absolute z-10 w-full h-full pb-4 top-0 bg-transparent left-0 outline-none opacity-0"
          ref={inputPin}
          type="text"
          value={pin}
          inputMode="numeric"
          onChange={(e) => {
            e.preventDefault();
            const pattern = /^[0-9]*$/;
            let inputValue = e.target?.value;
            if (!pattern.test(inputValue)) {
              inputValue = inputValue.slice(0, -1);
            } else if (inputValue.length <= 6) {
              setPin(inputValue);
            }
          }}
        />
        {errorMsg ? (
          <p className="text-body2 pt-3 text-medium font-bold text-primary-light-primary90 px-[8%] text-center">
            {trans(locale, lang, 'pinSalah')}
          </p>
        ) : null}
      </div>
    );
  }

  useEffect(() => {
    if (pin.length === 6) {
      onHandleSubmitPIN({
        pin,
      });
    } else {
      setErrorMsg(false);
    }
  }, [pin]);

  useEffect(() => {
    onHandleSubmitPINClear();
    if (message && message?.match('TOO_FREQUENTLY_')) {
      const timeRemaining = message?.replace('TOO_FREQUENTLY_', '');
      setLapsedTime(+timeRemaining);
      setShowModalFiveTimesWrong(true);
    }
  }, [message]);

  useInterval(() => {
    if (lapsedTime > 0 && lapsedTime <= REMAINING_SECONDS) {
      setLapsedTime(lapsedTime - 1);
    } else {
      setLapsedTime(0);
      setShowModalFiveTimesWrong(false);
    }
  }, 1000);

  //   handle request PIN failed
  useEffect(() => {
    if (submitPINFailed?.message) {
      // toast.error(
      //   trans(locale, lang, submitPINFailed?.message) +
      //     ' ' +
      //     trans(locale, lang, 'warning'),
      // );
    }
  }, [submitPINFailed]);

  const renderOtpTime = () => {
    let minutes = Math.floor(lapsedTime / 60);
    let seconds = `${lapsedTime - minutes * 60}`;
    minutes = `${minutes}`;
    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }
    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }

    return `${minutes} : ${seconds}`;
  };

  const modalFiveTimesWrong = () => {
    return (
      <Modal
        isOpen={showModalFiveTimesWrong}
        toggle={() => setShowModalFiveTimesWrong(false)}
        className="relative max-w-[375px]">
        <div className="relative p-3">
          <Icon
            icon={close}
            size={24}
            className="opacity-20 z-50 cursor-pointer"
            onClick={() => setShowModalFiveTimesWrong(false)}
          />
          <img
            src={TimeLogin}
            className="absolute w-40 s:w-48 top-10 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center my-3">
            {trans(locale, lang, 'andaTerlaluSeringPin')}
          </p>
          <p className="text-base font-medium text-center opacity-60">
            <span>{trans(locale, lang, 'untukSementaraWaktuPin')}</span>
            <span className="text-[#ED1C24] font-bold">
              {' '}
              {renderOtpTime()}{' '}
            </span>
          </p>

          <Button
            className="mt-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setShowModalFiveTimesWrong(false);
              onHandleForgotPIN();
            }}>
            {trans(locale, lang, 'lupaPin')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="bg-white md:shadow-md md:rounded-2xl py-4 px-[6%]">
      {renderHeader()}
      {renderImageContainer()}
      {renderTitleContainer()}
      {renderGroupLine()}
      <p
        onClick={onHandleForgotPIN}
        className="text-body2 text-center text-[#ED1C24] font-semibold pb-8 underline cursor-pointer">
        {trans(locale, lang, 'lupaPin')}
        {' ?'}
      </p>
      {modalFiveTimesWrong()}
    </div>
  );
}
