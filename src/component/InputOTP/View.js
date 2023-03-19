import { BtnBack, Frame14 } from '@cp-config/Svgs';
import { regexEmail, useInterval } from '@cp-util/common';
import Image from 'next/image';
import { useState } from 'react';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { useRef } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Alert } from '@cp-component';
import { REQUEST_OTP_SECONDS } from '@cp-util/constant';

const REMAINING_SECONDS = REQUEST_OTP_SECONDS;

export default function Component({
  lang,
  deviceId,
  otpSendTo,
  action,
  onHandleSubmitOTP,
  onHandleRequestOTP,
  onHandleRequestOTPClear,
  errorMsg,
  setErrorMsg,
}) {
  const inputOtp = useRef(null);

  const [otp, setOtp] = useState('');
  const [lapsedTime, setLapsedTime] = useState(REMAINING_SECONDS);

  function renderHeader() {
    return (
      <div className="relative h-14 flex items-center border-b bg-white">
        <div className="absolute w-full text-center text-body1 font-bold">
          {trans(locale, lang, 'otp')}
        </div>
      </div>
    );
  }

  function renderImageContainer() {
    return (
      <div className="flex justify-center items-center pt-10 pb-5">
        <img src={Frame14} className="w-60" />
      </div>
    );
  }

  function renderOtpSendTo() {
    const otpSplit = otpSendTo?.split('');

    if (!regexEmail.test(otpSendTo)) {
      if (otpSplit?.[0] === 0 || otpSplit?.[0] === '0') {
        otpSplit[0] = '+62';
        return `${otpSplit.join('')}`;
      } else {
        return otpSendTo;
      }
    } else {
      return otpSendTo;
    }
  }

  function renderTitleContainer() {
    return (
      <div className="mb-4 bg-white">
        <p className="text-body2 text-mediumGray-light-mediumGray font-medium text-center px-[8%]">
          {trans(locale, lang, 'masukkanKodeOtp')}
          {trans(
            locale,
            lang,
            regexEmail.test(otpSendTo) ? 'email' : 'nomorHp',
          )}
          <span className="font-semibold text-primary-light-primary90">
            {renderOtpSendTo()}
          </span>
        </p>
      </div>
    );
  }

  function renderGroupLine() {
    return (
      <div className="py-5 relative">
        <div
          className="pb-5"
          onClick={() => {
            if (inputOtp && inputOtp.current) {
              inputOtp.current.blur();
              setTimeout(() => {
                if (inputOtp && inputOtp.current) {
                  inputOtp.current.focus();
                }
              }, 100);
            }
          }}>
          <div className="flex justify-center gap-4">
            {Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className={`cursor-pointer duration-400 w-6 s:w-9 h-16 border-b-2 flex justify-center items-center text-neutral-light-neutral90 font-semibold text-h5 hover:border-red-500 md:w-12 ${
                    errorMsg ? 'border-red-500' : ''
                  }`}>
                  {otp[i]}
                </div>
              ))}
          </div>
        </div>
        <input
          id="input-otp"
          className="absolute z-10 w-full h-full pb-4 top-0 bg-transparent left-0 outline-none opacity-0"
          ref={inputOtp}
          type="text"
          inputMode="numeric"
          value={otp}
          autoComplete="off"
          onChange={(e) => {
            e.preventDefault();
            const value = e.target?.value;
            const digit = value.replace(/[^0-9]/g, '').substring(0, 6);
            setOtp(digit);
          }}
        />
        {errorMsg ? (
          <p className="text-body2 text-medium font-bold text-primary-light-primary90 mt-2 px-[8%] text-center">
            {trans(locale, lang, 'otpSalah')}
          </p>
        ) : null}
        {regexEmail.test(otpSendTo) && (
          <Alert className="">
            <p className="pl-2 text-caption1 font-semibold">
              {trans(locale, lang, 'cekJugaFolder')}
            </p>
          </Alert>
        )}
      </div>
    );
  }

  const onClickResendOtp = () => {
    if (lapsedTime) {
      // console.log({ lapsedTime });
    } else {
      setOtp('');
      onHandleRequestOTPClear();
      onHandleRequestOTP({
        id: otpSendTo,
        action,
      });
      setLapsedTime(REMAINING_SECONDS);
    }
  };

  function renderOtpTime() {
    function getRemainingTime() {
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
    }

    return (
      <div className="flex justify-between items-center my-6">
        <div className="text-body2 font-semibold">{getRemainingTime()}</div>
        <div
          role={lapsedTime == 0 ? 'button' : false}
          onClick={() => onClickResendOtp()}
          className={
            lapsedTime == 0
              ? 'text-body2 font-medium underline text-red-500'
              : 'text-body2 font-medium underline text-mediumGray-light-mediumGray'
          }>
          {trans(locale, lang, 'kirimUlangOtp')}
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (otp.length === 6) {
      onHandleSubmitOTP({
        id: otpSendTo,
        action,
        otp,
        deviceId,
      });
    } else {
      setErrorMsg(false);
    }
  }, [otp]);

  useInterval(() => {
    if (lapsedTime > 0 && lapsedTime <= REMAINING_SECONDS) {
      setLapsedTime(lapsedTime - 1);
    } else {
      setLapsedTime(0);
    }
  }, 1000);

  return (
    <div className="bg-white md:shadow-md mx-5 my-4 md:rounded-2xl py-4 px-[6%]">
      {/* {renderHeader()} */}
      {renderImageContainer()}
      {renderTitleContainer()}
      {renderGroupLine()}
      {renderOtpTime()}
    </div>
  );
}
