import { Button, Container, Input, Modal, SyaratPrivasi } from '@cp-component';
import { BadgeTick, BtnBack, Close, Logo } from '@cp-config/Svgs';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { useCallback, useEffect, useState } from 'react';
import {
  SET_REGISTER_OTP_FAILED,
  SET_REGISTER_OTP_SUCCESS,
  SET_REGISTER_SOCIAL_FAILED,
  SET_REGISTER_SOCIAL_SUCCESS,
} from '@cp-module/register/registerConstant';
import {
  getBrowser,
  regexEmail,
  regexGlobalPhoneNumber,
  regexMobile,
  regexName,
  useInterval,
} from '@cp-util/common';
import { toast } from 'react-toastify';
import { NAVIGATION } from '@cp-util/constant';
import {
  IconRegister,
  lifeIdRed,
  IconIfgGray,
  ClockOTP,
  IfgLifeRed,
} from '@cp-config/Images';
import { checkCircle } from 'react-icons-kit/fa';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';

export default function Page({
  deviceId,
  lang,
  registerAction,
  setLoading,
  setRegisterSocial,
  setRegisterSocialClear,
  setRegisterSocialFailed,
  setUserData,
  setRequestOtp,
  setRequestOtpResponse,
  setRequestOtpFailed,
  setRequestOtpClear,
  setBetterOpenApp,
}) {
  const router = useRouter();
  const {
    query: {
      name,
      email,
      token,
      channelType,
      channelUid,
      product,
      callbackUrl,
    },
  } = router;

  const [fullName, setFullName] = useState(name);
  const [isValidFullName, setValidFullName] = useState(!!fullName);
  const [isValidPhone, setValidPhone] = useState(false);
  const [isModalSuccessActive, setModalSuccessActive] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [fullNameMessage, setFullNameMessage] = useState(null);
  const [isSubmitRequestOtp, setIsSubmitRequestOtp] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [onConfirm, setConfirm] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState(null);
  const [phone, setPhone] = useState('');

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);
  const [lapsedTime, setLapsedTime] = useState(0);

  // Set seconds and minutes
  useEffect(() => {
    const min = Math.floor(lapsedTime / 60);
    const sec = lapsedTime - min * 60;
    setMinutes(min);
    setSeconds(sec);
  }, [lapsedTime]);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Time String
  function showRemainingTime() {
    let min = minutes;
    let sec = seconds;
    if (minutes < 10) {
      min = `0${minutes}`;
    }
    if (seconds < 10) {
      sec = `0${seconds}`;
    }
    return `${min}:${sec}`;
  }

  const setRequestOtpCallback = useCallback(() => {
    if (!isSubmitRequestOtp) {
      setRequestOtp({
        id: phone,
        name: fullName,
        dob: null,
        channelUid,
        channelType,
        token,
        action: 'REGISTER',
        setResendRegisterOtp: false,
        deviceId,
        deviceType: getBrowser(),
        deviceLocation: null,
      });
      setIsSubmitRequestOtp(true);
    }
  }, [fullName, phone, isSubmitRequestOtp, setRequestOtp]);

  useEffect(() => {
    if (setRequestOtpResponse?.message === 'SUCCESS') {
      setLoading(false);
      setIsSubmitRequestOtp(false);
      setIsShowModalCounter(false);
      setShowPrivacy(true);
    }
  }, [setRequestOtpResponse]);

  useEffect(() => {
    setBetterOpenApp(!showPrivacy);
  }, [showPrivacy]);

  useEffect(() => {
    if (setRequestOtpFailed?.message) {
      setLoading(false);
      setIsSubmitRequestOtp(false);

      if (setRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')) {
        const timeRemaining = setRequestOtpFailed?.message?.replace(
          'TOO_FREQUENTLY_',
          '',
        );
        setLapsedTime(+timeRemaining);
        setIsShowModalCounter(true);
      } else if (setRequestOtpFailed?.message?.match('ALREADY_REGISTERED')) {
        setPhoneMessage({
          error: trans(locale, lang, 'ALREADY_REGISTERED'),
        });
        setValidPhone(false);
      } else {
        toast.error(
          trans(locale, lang, setRequestOtpFailed?.message) +
            ' ' +
            trans(locale, lang, 'warning'),
        );
      }
    }
  }, [setRequestOtpFailed]);

  useEffect(() => {
    if (isTermsAccepted) {
      setLoading(true);
      setIsTermsAccepted(false);
      setRequestOtpCallback();
    }
  }, [
    fullName,
    email,
    channelUid,
    isTermsAccepted,
    setLoading,
    setRegisterSocial,
    setRequestOtpCallback,
  ]);

  // Validation
  const validateFullName = useCallback(
    (text) => {
      if (text?.length < 1) {
        setFullNameMessage({ error: trans(locale, lang, 'nameRequired') });
        return false;
      }
      if (!regexName.test(text)) {
        setFullNameMessage({ error: trans(locale, lang, 'nameInvalid') });
        return false;
      }
      if (text?.length > 100) {
        setFullNameMessage({
          error: trans(locale, lang, 'nameLengthTooLong'),
        });
        return false;
      }
      setFullNameMessage(null);
      return true;
    },
    [lang],
  );

  useEffect(() => {
    setValidFullName(validateFullName(fullName));
  }, []);

  const validatePhone = (text) => {
    if (text.length < 1) {
      setPhoneMessage({ error: trans(locale, lang, 'phoneRequired') });
      return false;
    }
    if (!regexMobile.test(text)) {
      setPhoneMessage({ error: trans(locale, lang, 'phoneInvalid') });
      return false;
    }
    setPhoneMessage(null);
    return true;
  };

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative flex items-center justify-between mb-5 xm:mb-10 pt-5 px-[5%]">
        <div className="flex items-center">
          <div role="button" onClick={() => router.back()}>
            <img src={BtnBack} className="w-5" />
          </div>
          <p className="font-bold text-h6 pl-4">
            {trans(locale, lang, 'registrasi')}
          </p>
        </div>
        <img src={lifeIdRed} className="h-14 md:h-20" />
      </div>
    );
  }

  const handleOnChangePhone = (value) => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      setPhone(value);
      setValidPhone(validatePhone(value));
    }
  };

  function renderInputCard() {
    return (
      <div>
        <div className="w-full flex flex-col">
          <Input
            className="mb-4 mt-3"
            value={fullName}
            label={trans(locale, lang, 'namaLengkap')}
            placeholder={trans(locale, lang, 'namaLengkapAnda')}
            message={fullNameMessage}
            handleOnChange={(val) => {
              setFullName(val);
              setValidFullName(validateFullName(val));
            }}
            required
          />
        </div>
        <Input
          className="mb-4"
          value={phone}
          inputMode="tel"
          label={trans(locale, lang, 'nomorHp')}
          placeholder={trans(locale, lang, 'noHpAnda')}
          message={phoneMessage}
          prefixIcon={<text>+</text>}
          handleOnChange={(val) => {
            handleOnChangePhone(val);
          }}
          required
        />
      </div>
    );
  }

  function renderModalSuccess() {
    return (
      <Modal
        isOpen={isModalSuccessActive}
        toggle={() => setModalSuccessActive(false)}>
        <div className="relative w-full flex gap-2 items-center text-start text-body1 font-bold mb-4">
          <div
            role="button"
            className="absolute inset-0"
            onClick={() => setModalSuccessActive(false)}>
            <Image src={Close} width={32} height={32} />
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center mb-6">
            <img src={BadgeTick} width={146} height={146} />
          </div>
          <div className="text-h6 text-neutral-light-neutral80 font-bold text-center mb-1">
            {trans(locale, lang, 'andaBerhasilTerdaftar')}
          </div>
          <div className="text-body2 text-mediumGray-light-mediumGray font-medium text-center mb-8">
            {trans(locale, lang, 'lanjutKeProsesSelanjutnya')}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              bordered="primary-light-primary90"
              onButtonClick={() => {
                if (callbackUrl) {
                  router.push(callbackUrl);
                } else if (product) {
                  router.push(
                    {
                      pathname: NAVIGATION.LIFESAVER.LifesaverMain,
                      query: { product },
                    },
                    NAVIGATION.LIFESAVER.LifesaverMain,
                  );
                } else {
                  router.push(
                    {
                      pathname: NAVIGATION.HOME.Home,
                      query: {
                        isLogin: true,
                      },
                    },
                    NAVIGATION.HOME.Home,
                  );
                }
              }}
              outline
              shadow
              full>
              {trans(locale, lang, 'lewati')}
            </Button>
            <Button type="linear-gradient" shadow full>
              {trans(locale, lang, 'verifikasiDataDiri')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  const handleButtonRegister = () => {
    setUserData({
      userData: {
        isSkipKycFromRegister: true,
      },
    });
    setIsTermsAccepted(true);
  };

  function renderFooterContainer() {
    return (
      <div className="grid place-items-center mt-32 mb-10 lg:mt-40">
        <div className="w-[90%]">
          <div className="mb-20">
            <Button
              type="linear-gradient"
              disabled={!isValidFullName || !isValidPhone}
              onButtonClick={() => {
                handleButtonRegister();
              }}
              shadow
              full>
              <img
                src={
                  !isValidFullName || !isValidPhone ? IconIfgGray : IconRegister
                }
                className="h-4"
              />
              <span className="mr-2">{trans(locale, lang, 'daftar')}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const renderSyaratDanKetentuan = () => {
    return (
      <div className="w-full bg-white">
        <div className="ml-5">
          <img src={lifeIdRed} className="h-14" />
        </div>
        <div className="relative w-full h-full bg-white">
          <div className="w-full border-b py-5 flex flex-row relative bg-white">
            <div
              role="button"
              onClick={() => setShowPrivacy(false)}
              className="ml-5 flex justify-center items-center">
              <Image src={BtnBack} width={24} height={24} />
            </div>
            <p className="flex justify-center items-center mr-10 w-full text-xl font-bold">
              {trans(locale, lang, 'syaratDanKetentuan')}
            </p>
          </div>

          <div className="relative -full flex justify-center overflow-y-auto max-h-[70%] pt-10 px-[4%] md:pt-0 ">
            <div className="z-10 w-full h-full bg-gray-50">
              <div className="w-full h-full flex justify-center">
                <div className="w-screen from-[#FDFDFD] to-[#F1F1F1] bg-white sm:rounded-2xl">
                  <SyaratPrivasi />
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-white px-[5%] pt-5 pb-2">
            <div className="flex items-center flex-row-reverse pb-4">
              <p className="basis-11/12 text-sm font-semibold md:text-body1 ml-2 s:ml-0">
                <span>{trans(locale, lang, 'sayaMenyatakan')}</span>
                <span className="text-red-500">
                  {trans(locale, lang, 'syaratKetentuan')}
                </span>
              </p>
              <div
                className="basis-1/12"
                role="button"
                onClick={() => setConfirm(!onConfirm)}>
                {onConfirm ? (
                  <Icon icon={checkCircle} size={24} className="text-red-500" />
                ) : (
                  <Icon
                    icon={checkCircle}
                    size={24}
                    className="text-gray-500"
                  />
                )}
              </div>
            </div>

            <Button
              shadow
              full
              type="linear-gradient"
              disabled={!onConfirm}
              onButtonClick={() => {
                setRequestOtpClear();
                router.push(
                  {
                    pathname: NAVIGATION.REGISTER.RegisterOtp,
                    query: {
                      otpSendTo: phone,
                      previousRoute: 'RegisterNextStep',
                      name: fullName,
                      token,
                      channelType,
                      channelUid,
                      product,
                      callbackUrl,
                    },
                  },
                  NAVIGATION.REGISTER.RegisterOtp,
                );
                setShowPrivacy(false);
              }}>
              {trans(locale, lang, 'setuju')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const [isShowModalCounter, setIsShowModalCounter] = useState(false);

  // useInterval(() => {
  //   if (lapsedTime > 0) {
  //     setLapsedTime(lapsedTime - 1);
  //   } else {
  //     setLapsedTime(0);
  //     setIsShowModalCounter(false);
  //   }
  // }, 1000);

  const renderModalCounter = () => {
    return (
      <Modal isOpen={isShowModalCounter} className="relative max-w-[375px]">
        <div className="relative p-3">
          <Icon
            icon={close}
            size={24}
            className="opacity-20 z-50 cursor-pointer"
            onClick={() => setIsShowModalCounter(false)}
          />
          <img
            src={ClockOTP}
            className="absolute w-40 s:w-48 top-5 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center my-3">
            {trans(locale, lang, 'terlaluSeringMeminta')}
          </p>
          <p className="text-base font-medium text-center opacity-50">
            {trans(locale, lang, 'andaTelahMeminta')}
            <span className="text-red-500">{showRemainingTime()}</span>
          </p>

          <Button
            className="mt-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => handleButtonRegister()}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <Container
        title={trans(locale, lang, 'registrasi')}
        className="shadow-xl md:my-20 h-screen md:h-auto flex flex-col justify-between">
        {showPrivacy ? renderSyaratDanKetentuan() : null}
        {!showPrivacy ? renderHeader() : null}
        <div className="px-4 md:px-8">
          {!showPrivacy ? renderInputCard() : null}
        </div>
        {!showPrivacy ? renderFooterContainer() : null}
        {renderModalCounter()}
      </Container>
      {renderModalSuccess()}
    </>
  );
}
