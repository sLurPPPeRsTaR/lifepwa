/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, useRef } from 'react';

import { Container, Modal } from '@cp-component';
import { BtnBack, Close, Frame14 } from '@cp-config/Svgs';
import {
  SET_REGISTER_FAILED,
  SET_REGISTER_SOCIAL_FAILED,
  SET_REGISTER_SOCIAL_SUCCESS,
  SET_REGISTER_SUCCESS,
} from '@cp-module/register/registerConstant';

import {
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PROFILE_REQUEST_OTP_SUCCESS,
  SET_PROFILE_VERIFY_OTP_FAILED,
  SET_PROFILE_VERIFY_OTP_SUCCESS,
} from '@cp-module/profile/profileConstant';
import { getBrowser, regexEmail, useInterval } from '@cp-util/common';
import { trans } from '@cp-util/trans';

import locale from './locale';
import { toast } from 'react-toastify';
import {
  DEVICE_PLATFORM,
  NAVIGATION,
  REQUEST_OTP_SECONDS,
} from '@cp-util/constant';
import { Check } from '@cp-config/Images';

const REMAINING_SECONDS = REQUEST_OTP_SECONDS;
const REMAINING_SECONDS_HOMEPAGE = 5;

export default function Page({
  deviceId,
  lang,
  registerAction,
  setLoading,
  setRegister,
  setRegisterClear,
  setRegisterFailed,
  setResendRegisterOtp,
  setRegisterSocial,
  setRegisterSocialClear,
  setRegisterSocialFailed,
  setRequestOtp,
  setRequestOtpFailed,
  setRequestOtpParam,
  setRequestOtpSuccess,
  setRequestOtpClear,
  setProfileVerifyOtp,
  setProfileVerifyOtpClear,
  setProfileVerifyOtpFailed,
  profileAction,
  setProfileRequestOtp,
  setProfileRequestOtpParam,
}) {
  const router = useRouter();
  const inputOtp = useRef(null);

  const {
    query: {
      channelType,
      channelUid,
      name,
      otpSendTo,
      previousRoute,
      token,
      product,
      callbackUrl,
      isNoLogin,
      action,
      userData,
    },
  } = router;

  const [otp, setOtp] = useState('');
  const [lapsedTime, setLapsedTime] = useState(REMAINING_SECONDS);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isModalSuccessActive, setModalSuccessActive] = useState(false);
  const [isSubmitOtp, setIsSubmitOtp] = useState(false);
  const [countDownHomepage, setCountDownHomepage] = useState('');

  useEffect(() => {
    setRequestOtpClear();
  }, [setRequestOtpClear]);

  // const handleFirstLoadFunc = async () => {
  //   await setRequestOtpClear();
  // };

  const setRegisterResult = useCallback(
    (act) => {
      if (!setResendRegisterOtp) {
        if (act === SET_REGISTER_SUCCESS) {
          setIsSubmitOtp(false);
          setLoading(false);
          setErrorMsg(false);
          setRegisterClear();
          setModalSuccessActive(true);
          setRequestOtpClear();
          setCountDownHomepage(REMAINING_SECONDS_HOMEPAGE);
        }
        if (act === SET_REGISTER_FAILED) {
          setIsSubmitOtp(false);
          setLoading(false);
          if (
            setRegisterFailed?.message === 'WRONG_OTP' ||
            setRegisterFailed?.message === 'INVALID_OTP'
          ) {
            setErrorMsg(true);
            // toast.error('WRONG_OTP or INVALID_OTP');
          } else {
            toast.error(
              trans(locale, lang, 'error') +
                ' ' +
                trans(locale, lang, setRegisterFailed?.message),
            );
          }
          setRegisterClear();
        }
        if (act === SET_REGISTER_SOCIAL_SUCCESS) {
          setErrorMsg(false);
          setIsSubmitOtp(false);
          setLoading(false);
          setModalSuccessActive(true);
          setRegisterSocialClear();
          setRequestOtpClear();
          setCountDownHomepage(REMAINING_SECONDS_HOMEPAGE);
        }
        if (act === SET_REGISTER_SOCIAL_FAILED) {
          setIsSubmitOtp(false);
          setLoading(false);
          setErrorMsg(true);
          // toast.error(
          //   trans(locale, lang, 'warning') +
          //     ' ' +
          //     trans(locale, lang, setRegisterSocialFailed?.message),
          // );
          setRegisterSocialClear();
        }
      }
    },
    [
      setResendRegisterOtp,
      setLoading,
      setRegisterClear,
      setRequestOtpClear,
      setRegisterFailed?.message,
      lang,
      setRegisterSocialClear,
    ],
  );

  const setProfileVerifyOtpResult = useCallback(
    (act) => {
      if (act === SET_PROFILE_VERIFY_OTP_SUCCESS) {
        setIsSubmitOtp(false);
        setLoading(false);
        setProfileVerifyOtpClear();
        if (action === 'VERIFY_RESET_PASSWORD') {
          router.replace(callbackUrl);
        }
      }
      if (act === SET_PROFILE_VERIFY_OTP_FAILED) {
        setIsSubmitOtp(false);
        setLoading(false);
        setProfileVerifyOtpClear();
        if (setProfileVerifyOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setProfileVerifyOtpFailed?.message === 'WRONG_OTP') {
            setErrorMsg(true);
            return;
          }
          alert(setProfileVerifyOtpFailed?.message);
        }
      }
      if (
        act === SET_PROFILE_REQUEST_OTP_SUCCESS ||
        act === SET_PROFILE_REQUEST_OTP_FAILED
      ) {
        setLoading(false);
      }
    },
    [
      action,
      setLoading,
      setProfileVerifyOtpClear,
      setProfileVerifyOtpFailed?.message,
    ],
  );

  useEffect(() => {
    setProfileVerifyOtpResult(profileAction);
  }, [setProfileVerifyOtpResult, profileAction]);

  const submitOtpCallback = useCallback(() => {
    if (!isSubmitOtp) {
      setIsSubmitOtp(true);
      setLoading(true);
      inputOtp.current.blur();
      if (previousRoute === 'RegisterNextStep') {
        setRegisterSocial({
          name,
          otp,
          deviceId,
          mobilePhoneNumber: otpSendTo,
          deviceType: getBrowser(),
          deviceLocation: null,
          token,
          channelType,
          channelUid,
          devicePlatform: DEVICE_PLATFORM,
        });
      } else if (isNoLogin) {
        setProfileVerifyOtp({
          isNoLogin: isNoLogin,
          data: {
            id: otpSendTo,
            action: action,
            otp,
            deviceId: userData?.deviceId,
          },
        });
      } else {
        setRegister({
          otp,
          deviceId,
          deviceType: getBrowser(),
          deviceLocation: null,
          devicePlatform: DEVICE_PLATFORM,
        });
      }
    }
  }, [
    isSubmitOtp,
    setLoading,
    previousRoute,
    isNoLogin,
    setRegisterSocial,
    name,
    otp,
    deviceId,
    otpSendTo,
    token,
    channelType,
    channelUid,
    setProfileVerifyOtp,
    action,
    userData?.deviceId,
    setRegister,
  ]);

  useEffect(() => {
    setRegisterResult(registerAction);
  }, [registerAction, setRegisterResult]);

  useEffect(() => {
    if (otp.length === 6) {
      submitOtpCallback();
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
    if (
      countDownHomepage > 0 &&
      countDownHomepage <= REMAINING_SECONDS_HOMEPAGE
    ) {
      setCountDownHomepage((old) => old - 1);
    } else if (countDownHomepage === 0) {
      if (callbackUrl) {
        router.replace(callbackUrl);
      } else if (product) {
        router.replace(
          {
            pathname: NAVIGATION.LIFESAVER.LifesaverMain,
            query: { product },
          },
          NAVIGATION.LIFESAVER.LifesaverMain,
        );
      } else {
        router.replace(
          {
            pathname: NAVIGATION.HOME.Home,
            query: {
              isLogin: true,
            },
          },
          NAVIGATION.HOME.Home,
        );
      }
    }
  }, 1000);

  useEffect(() => {
    if (setRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')) {
      toast.error(
        trans(locale, lang, 'warning') +
          ' ' +
          trans(locale, lang, 'TOO_FREQUENTLY_'),
      );
    } else if (setRequestOtpFailed?.message?.match('ALREADY_REGISTERED')) {
      toast.error(trans(locale, lang, setRequestOtpFailed?.message));
    } else if (setRequestOtpFailed?.message) {
      toast.error(
        trans(locale, lang, setRequestOtpFailed?.message) +
          ' ' +
          trans(locale, lang, 'warning'),
      );
    }
  }, [lang, setRequestOtpFailed]);

  useEffect(() => {
    if (setRequestOtpSuccess?.message === 'SUCCESS') {
      setLapsedTime(REMAINING_SECONDS);
    }
  }, [setRequestOtpSuccess]);

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative h-14 flex items-center border-b bg-white">
        <div
          role="button"
          onClick={() => {
            setRequestOtpClear();
            router.back();
          }}
          className="absolute z-10 w-10 h-10 flex justify-center items-center">
          <Image src={BtnBack} width={24} height={24} />
        </div>
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
        return '+' + otpSendTo;
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

  function renderModalSuccess() {
    const onClick = () => {
      setModalSuccessActive(false);
      if (callbackUrl) {
        router.replace(callbackUrl);
      } else if (product) {
        router.replace(
          {
            pathname: NAVIGATION.LIFESAVER.LifesaverMain,
            query: { product },
          },
          NAVIGATION.LIFESAVER.LifesaverMain,
        );
      } else {
        router.replace(
          {
            pathname: NAVIGATION.HOME.Home,
            query: {
              isLogin: true,
            },
          },
          NAVIGATION.HOME.Home,
        );
      }
    };
    return (
      <Modal isOpen={isModalSuccessActive} size="sm" className="relative ">
        <div role="button" className="absolute top-2 left-2" onClick={onClick}>
          <Image src={Close} width={32} height={32} alt="" />
        </div>
        <div className="flex flex-col pt-24 pb-28 justify-center items-center ">
          <div className="w-32">
            <img src={Check} className="w-full object-center" />
          </div>
          <p className="text-body1 font-bold text-center pt-5">
            {trans(locale, lang, 'registrasiBerhasil')}
          </p>
          {/* <p className="text-xl font-extrabold mt-20">{`0 ${countDownHomepage}`}</p> */}
          <p
            className="text-sm text-[#707478] cursor-pointer"
            onClick={onClick}>
            {trans(locale, lang, 'menujuBeranda')}
          </p>
        </div>
      </Modal>
    );
  }

  function renderGroupLine() {
    return (
      <div className="py-5 relative">
        <div
          className="pb-2"
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
                  className={`w-12 h-16 border rounded-lg flex justify-center items-center text-neutral-light-neutral90 font-semibold text-h6 ${
                    errorMsg ? 'border-primary-light-primary90' : ''
                  }`}>
                  {otp[i]}
                </div>
              ))}
          </div>
        </div>
        <input
          className="absolute z-10 w-full h-full pb-4 top-0 bg-transparent left-0 outline-none opacity-0"
          id="input-otp"
          ref={inputOtp}
          value={otp}
          type="text"
          inputMode="date"
          autoComplete="off"
          onChange={(e) => {
            e.preventDefault();
            if (e.target?.value.length <= 6) {
              setOtp(e.target?.value.replace(/[^0-9]/g, '').substring(0, 6));
            }
          }}
        />

        {errorMsg ? (
          <p className="text-body2 text-medium font-bold text-primary-light-primary90 px-[8%] text-center">
            {trans(locale, lang, 'otpSalah')}
          </p>
        ) : null}
      </div>
    );
  }

  const onClickResendOtp = () => {
    if (lapsedTime > 0) {
      return;
    }
    setOtp('');
    if (isNoLogin) {
      setLoading(true);
      setProfileRequestOtp({
        ...setProfileRequestOtpParam,
      });
    } else {
      setLoading(true);
      setRequestOtp({
        ...setRequestOtpParam,
        id: otpSendTo,
        action: 'REGISTER',
      });
    }
    setLapsedTime(REMAINING_SECONDS);
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
        {lapsedTime > 0 ? (
          <div className="text-body2 font-semibold">{getRemainingTime()}</div>
        ) : (
          <div />
        )}
        <div
          role={lapsedTime == 0 ? 'button' : null}
          onClick={onClickResendOtp}
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

  return (
    <>
      <Container className="relative h-full bg-transparent">
        <div className="relative top-1/2 transform translate-y-[-50%] bg-white md:shadow-md md:rounded-2xl py-4 px-[6%]">
          {renderHeader()}
          {renderImageContainer()}
          {renderTitleContainer()}
          {renderGroupLine()}
          {renderOtpTime()}
        </div>
      </Container>
      {renderModalSuccess()}
    </>
  );
}
