import locale from './locale';
import { trans } from '@cp-util/trans';
import { Alert, Modal } from '@cp-component';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import Icon from 'react-icons-kit';
import {
  SET_AUTH_REQUEST_OTP_SUCCESS,
  SET_AUTH_REQUEST_OTP_FAILED,
  SET_AUTH_VERIFY_OTP_SUCCESS,
  SET_AUTH_VERIFY_OTP_FAILED,
} from '@cp-module/auth/authConstant';
import { chevronRight } from 'react-icons-kit/ionicons';
import { x } from 'react-icons-kit/feather';
import { Handphone, Message } from '@cp-config/Svgs';
import { ModalTooFrequently } from '@cp-component';
import { Otp } from '@cp-config/Images';
import { useInterval } from '@cp-util/common';
import Image from 'next/image';
import { REQUEST_OTP_SECONDS } from '@cp-util/constant';

const REMAINING_SECONDS = REQUEST_OTP_SECONDS;

const View = (props) => {
  const {
    lang,
    isOpen,
    callBack,
    callBackAction,
    setLoading,
    authAction,
    size = 'sm',
    userData,
    setAuthRequestOTPFailed,
    setAuthRequestOTP,
    setAuthRequestOTPClear,
    setAuthVerifyOTPFailed,
    setAuthVerifyOTP,
    setAuthVerifyOTPClear,
    deviceId,
    hide,
    titleModal,
    setUserData,
  } = props;

  const translate = (val) => trans(locale, lang, val);

  const [remainingSeconds, setRemainingSeconds] = useState(REMAINING_SECONDS);
  const [isTooFrequentlyModalVisible, setIsTooFrequentlyModalVisible] =
    useState(false);
  const [showOTPConfirmation, setShowOTPConfirmation] = useState(false);
  const [isWrongOTP, setIsWrongOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [requestOTP, setRequestOTP] = useState('');
  const [lapsedTime, setLapsedTime] = useState(REMAINING_SECONDS);

  useInterval(() => {
    if (lapsedTime > 0 && lapsedTime <= REMAINING_SECONDS) {
      setLapsedTime(lapsedTime - 1);
    } else {
      setLapsedTime(0);
    }
  }, 1000);

  const authApiResult = useCallback(
    (action) => {
      if (action === SET_AUTH_REQUEST_OTP_SUCCESS) {
        setLoading(false);
        setAuthRequestOTPClear();
        setShowOTPConfirmation(true);
        return;
      }
      if (action === SET_AUTH_REQUEST_OTP_FAILED) {
        setAuthRequestOTPClear();
        if (setAuthRequestOTPFailed?.message?.match('TOO_FREQUENTLY_')) {
          setRemainingSeconds(
            Number(setAuthRequestOTPFailed?.message?.substring(15)),
          );
          setIsTooFrequentlyModalVisible(true);
        }
        return;
      }
      if (action === SET_AUTH_VERIFY_OTP_SUCCESS) {
        setLoading(false);
        setAuthVerifyOTPClear();
        callBack({ success: true, callBackAction: callBackAction });
        setUserData({
          userData: {
            alreadySetPin: false,
            alreadySetMPin: false,
          },
        });
        hide();
        return;
      }
      if (action === SET_AUTH_VERIFY_OTP_FAILED) {
        setLoading(false);
        setAuthVerifyOTPClear();
        if (setAuthVerifyOTPFailed?.message?.match('TOO_FREQUENTLY_')) {
          setRemainingSeconds(
            Number(setAuthVerifyOTPFailed?.message?.substring(15)),
          );
          setIsTooFrequentlyModalVisible(true);
          return;
        }
        if (setAuthVerifyOTPFailed?.message === 'WRONG_OTP') {
          setIsWrongOTP(true);
          return;
        }
        setIsWrongOTP(true);
      }
    },
    [
      callBack,
      callBackAction,
      hide,
      setAuthRequestOTPClear,
      setAuthRequestOTPFailed?.message,
      setAuthVerifyOTPClear,
      setAuthVerifyOTPFailed?.message,
      setLoading,
      setUserData,
    ],
  );

  useEffect(() => {
    authApiResult(authAction);
  }, [authApiResult, authAction]);

  const listOption = [
    {
      id: 'email',
      icon: Message,
      title: userData?.email,
      link: 'https://api.whatsapp.com/send/?phone=628111372848',
    },
    {
      id: 'nomorHp',
      icon: Handphone,
      title: userData?.mobilePhoneNumber,
      link: 'tel:1500176',
    },
  ];

  const renderModalTooFrequently = () => {
    const closeModal = () => {
      setIsTooFrequentlyModalVisible(false);
    };

    return (
      isTooFrequentlyModalVisible && (
        <ModalTooFrequently
          title={trans(locale, lang, 'andaTerlaluSering')}
          subTitle={trans(locale, lang, 'untukSementaraWaktu')}
          isOpen={isTooFrequentlyModalVisible}
          setClose={closeModal}
          remainingSeconds={remainingSeconds}
        />
      )
    );
  };

  const inputOTP = useRef(null);

  useEffect(() => {
    if (otp.length === 6) {
      setLoading(true);
      inputOTP.current.blur();
      setAuthVerifyOTP({
        id: requestOTP.title,
        action: 'RESET_PIN',
        otp: otp,
        deviceId: deviceId,
      });
      setIsWrongOTP(false);
    }
  }, [requestOTP, deviceId, otp, setAuthVerifyOTP, setLoading]);

  const handleInputPIN = (e) => {
    e.preventDefault();
    const pattern = /^[0-9]*$/;
    let inputValue = e.target?.value;

    if (!pattern.test(inputValue)) {
      inputValue = inputValue.slice(0, -1);
    } else if (inputValue.length <= 6) {
      setIsWrongOTP(false);
      setOTP(inputValue);
    }
  };

  const renderModalOTPConfirmation = () => {
    const closeModal = () => {
      setShowOTPConfirmation(false);
    };
    return (
      <Modal isOpen={showOTPConfirmation} toggle={closeModal} size={size}>
        <div className="flex pb-6 items-center">
          <Icon
            icon={x}
            size={20}
            className="cursor-pointer"
            onClick={() => hide()}
          />
          <p className="text-sm xm:text-base w-full text-center font-bold mt-1">
            {titleModal ? titleModal : trans(locale, lang, 'title')}
          </p>
          <div className="w-10"></div>
        </div>

        <div className="pt-5 md:px-5 mb-10">
          <img src={Otp} className="w-1/2 mx-auto" />
          <p className="text-sm text-center">
            {translate('masukkanKodeOtp')}
            {translate(requestOTP?.id)}
            <span className="text-red-500 font-bold">{requestOTP?.title}</span>
          </p>

          <div className="w-full flex justify-between gap-1 relative">
            {Array(6)
              .fill()
              .map((_, i) => (
                <div key={`modalInputOtp[${i}]`} className="px-2 w-full">
                  <div
                    className={`px-1 w-full h-16 border-b-2 flex justify-center items-center text-neutral-light-neutral90 font-semibold text-h6 ${
                      isWrongOTP ? 'border-primary-light-primary90' : ''
                    }`}>
                    {otp[i] || ''}
                  </div>
                </div>
              ))}
            <input
              className="absolute z-10 w-full h-full pb-4 top-0 bg-transparent left-0 outline-none opacity-0"
              ref={inputOTP}
              type="text"
              value={otp}
              autoComplete="off"
              inputMode="numeric"
              onChange={(e) => handleInputPIN(e)}
            />
          </div>
          {isWrongOTP && (
            <p className="text-body2 pt-3 text-medium font-semibold text-primary-light-primary90 px-[8%] text-center">
              {trans(locale, lang, 'wrongInputPIN')}
            </p>
          )}
          <div className="relative"></div>
        </div>

        <Alert className="mb-2">
          <p className="pl-2 text-caption1 font-semibold">
            {trans(locale, lang, 'info')}
          </p>
        </Alert>
        {renderOtpTime()}
      </Modal>
    );
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
        <div className="text-body2 font-semibold">
          {lapsedTime > 0 ? getRemainingTime() : ''}
        </div>
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

  const onClickResendOtp = () => {
    if (lapsedTime) {
      // console.log({ lapsedTime });
    } else {
      setOTP('');
      setAuthRequestOTPClear();
      setAuthRequestOTP({
        id: requestOTP.title,
        action: 'RESET_PIN',
      });
      setLapsedTime(REMAINING_SECONDS);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen && !showOTPConfirmation} toggle={hide} size={size}>
        <div className="flex pb-6 items-center">
          <Icon
            icon={x}
            size={18}
            className="cursor-pointer"
            onClick={() => hide()}
          />
          <p className="text-sm xm:text-base w-full text-center font-bold mt-1">
            {titleModal ? titleModal : trans(locale, lang, 'title')}
          </p>
          <div className="w-10"></div>
        </div>

        <div className="flex flex-col pb-3">
          {listOption.map((item, idx) =>
            item.title ? (
              <div
                key={idx}
                role="button"
                onClick={() => {
                  setLoading(true);
                  setRequestOTP(item);
                  setAuthRequestOTP({
                    id: item.title,
                    action: 'RESET_PIN',
                  });
                }}
                className="group flex items-center justify-between rounded-md duration-500 px-4 py-5 hover:bg-red-100 border shadow-md rounded-3xl mt-4">
                <div className="flex gap-5 items-center">
                  <Image src={item.icon} width={24} height={24} alt="" />
                  <div className="text-body2 font-semibold text-[#202021]">
                    {trans(locale, lang, item.title)}
                  </div>
                </div>
                <Icon
                  icon={chevronRight}
                  className="text-gray-300 duration-500 group-hover:text-red-dark-red90"
                />
              </div>
            ) : null,
          )}
        </div>
        <Alert className="mb-2">
          <p className="pl-2 text-caption1 font-semibold">
            {trans(locale, lang, 'info')}
          </p>
        </Alert>
      </Modal>
      {renderModalOTPConfirmation()}
      {renderModalTooFrequently()}
    </>
  );
};

export default View;
