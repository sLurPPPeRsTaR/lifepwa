import Icon from 'react-icons-kit';
import Image from 'next/image';
import locale from './locale';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { trans } from '@cp-util/trans';
import { useCallback, useEffect, useState } from 'react';
import { BtnBack, Eye1, EyeOff1 } from '@cp-config/Svgs';
import { NAVIGATION } from '@cp-util/constant';
import { info } from 'react-icons-kit/icomoon';
import { checkCircle, close } from 'react-icons-kit/fa';
import { Button, Container, Input, Modal, SyaratPrivasi } from '@cp-component';
import { getCheckPhoneEmail } from '@cp-module/register/registerApi';
import {
  DefaultBackground,
  IconIfgGray,
  IconRegister,
  lifeIdRed,
  tooMany,
  ClockOTP,
} from '@cp-config/Images';
import {
  getBrowser,
  regexEmail,
  regexGlobalPhoneNumber,
  regexMobile,
  regexName,
  regexPassword,
  useInterval,
  regexNickName,
} from '@cp-util/common';
import {
  SET_REGISTER_OTP_FAILED,
  SET_REGISTER_OTP_SUCCESS,
} from '@cp-module/register/registerConstant';

export default function Page({
  deviceId,
  lang,
  registerAction,
  setRegisterClear,
  setLoading,
  setRequestOtp,
  setRequestOtpFailed,
  setResendRegisterOtp,
  isBajoRunProgress,
  setRequestOtpClear,
  setBetterOpenApp,
}) {
  const router = useRouter();
  const {
    query: { product, callbackUrl },
  } = router;

  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [referral, setReferral] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const [phoneNumberMessage, setPhoneNumberMessage] = useState(null);
  const [fullNameMessage, setFullNameMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [confPasswordMessage, setConfPasswordMessage] = useState(null);

  const [isValidPhone, setValidPhone] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidFullName, setValidFullName] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);
  const [isValidConfPassword, setValidConfPassword] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confPasswordVisibility, setConfPasswordVisibility] = useState(true);

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isSubmitRequestOtp, setIsSubmitRequestOtp] = useState(false);
  const [isSubmitCheckPhoneEmail, setIsSubmitCheckPhoneEmail] = useState(false);

  const [isPasswordFilled, setPasswordFilled] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [onConfirm, setConfirm] = useState(false);
  const [showInfoRef, setShowInfoRef] = useState(false);

  const [isShowModalCounter, setIsShowModalCounter] = useState(false);
  const [lapsedTime, setLapsedTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

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

  useInterval(() => {
    if (lapsedTime > 0) {
      setLapsedTime(lapsedTime - 1);
    } else {
      setLapsedTime(0);
      setIsShowModalCounter(false);
    }
  }, 1000);

  const setRequestOtpCallback = useCallback(() => {
    if (!isSubmitRequestOtp) {
      setRequestOtp({
        id: phone?.charAt(0) !== '+' ? `+${phone}` : phone,
        password,
        passwordConfirmation: confPassword,
        name: fullName,
        dob: null,
        action: 'REGISTER',
        setResendRegisterOtp: false,
        referralCode: referral,
        deviceId,
        deviceType: getBrowser(),
        deviceLocation: null,
      });
      setIsSubmitRequestOtp(true);
    }
  }, [
    confPassword,
    phone,
    fullName,
    isSubmitRequestOtp,
    password,
    setRequestOtp,
    referral,
  ]);

  const setRegisterResult = useCallback(
    (act) => {
      if (act === SET_REGISTER_OTP_SUCCESS) {
        setLoading(false);
        setIsSubmitRequestOtp(false);
        setRegisterClear();
        setIsShowModalCounter(false);
        if (callbackUrl) {
          router.push(
            {
              pathname: NAVIGATION.REGISTER.RegisterOtp,
              query: {
                otpSendTo: phone,
                previousRoute: 'RegisterInput',
                callbackUrl,
              },
            },
            NAVIGATION.REGISTER.RegisterOtp,
          );
        } else {
          setShowPrivacy(true);
        }
      }
      if (act === SET_REGISTER_OTP_FAILED) {
        setLoading(false);
        setIsSubmitRequestOtp(false);
        setRegisterClear();
        if (setRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')) {
          const timeRemaining = setRequestOtpFailed?.message?.replace(
            'TOO_FREQUENTLY_',
            '',
          );
          setLapsedTime(+timeRemaining);
          setIsShowModalCounter(true);
        } else if (setRequestOtpFailed?.message?.match('ALREADY_REGISTERED')) {
          setPhoneNumberMessage({
            error: trans(locale, lang, setRequestOtpFailed?.message),
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
    },
    [
      phone,
      lang,
      router,
      setLoading,
      setRegisterClear,
      setRequestOtpFailed?.message,
    ],
  );

  // otp
  useEffect(() => {
    if (isTermsAccepted === true) {
      setLoading(true);
      setIsTermsAccepted(false);
      setRequestOtpCallback();
    }
  }, [isTermsAccepted, setLoading, setRequestOtpCallback]);

  useEffect(() => {
    setBetterOpenApp(!showPrivacy);
  }, [showPrivacy]);

  // callback result
  useEffect(() => {
    if (!setResendRegisterOtp) {
      setRegisterResult(registerAction);
    }
  }, [setResendRegisterOtp, registerAction, setRegisterResult]);

  const checkPhoneAndEmail = () => {
    getCheckPhoneEmail({
      id: phone?.charAt(0) !== '+' ? `+${phone}` : phone,
      deviceId: deviceId,
    })
      .then((res) => {
        setLoading(false);
        setIsSubmitCheckPhoneEmail(false);
        if (res.data.data.exist) {
          setPhoneNumberMessage({
            error: trans(locale, lang, 'ALREADY_REGISTERED'),
          });
          setValidPhone(false);
        }
        if (!res.data.data.exist) {
          setIsTermsAccepted(true);
        }
      })
      .catch(() => {
        setLoading(false);
        setIsSubmitCheckPhoneEmail(false);
        if (res?.code === 'ERR_BAD_REQUEST') {
          setPhoneNumberMessage({
            error: trans(locale, lang, 'kodenegaratidakterdaftar'),
          });
          return;
        }
      });
  };

  useEffect(() => {
    setBetterOpenApp(!showPrivacy);
  }, [showPrivacy]);

  // Validation
  const validatePhone = (text) => {
    if (text.length < 1) {
      setPhoneNumberMessage({
        error: trans(locale, lang, 'phoneNumberRequired'),
      });
      return false;
    }
    if (text.length > 15) {
      setPhoneNumberMessage({
        error: trans(locale, lang, 'phoneNumberInvalid'),
      });
      return false;
    }
    if (!regexGlobalPhoneNumber.test(text)) {
      setPhoneNumberMessage({
        warning: trans(locale, lang, 'phoneNumberInvalid'),
      });
      return false;
    }

    setPhoneNumberMessage(null);
    return true;
  };

  const validateFullName = (text) => {
    if (text.length < 1) {
      setFullNameMessage({ error: trans(locale, lang, 'nameRequired') });
      return false;
    }
    if (!regexNickName.test(text)) {
      setFullNameMessage({ error: trans(locale, lang, 'nameInvalid') });
      return false;
    }
    if (text.length > 100) {
      setFullNameMessage({
        error: trans(locale, lang, 'nameLengthTooLong'),
      });
      return false;
    }
    setFullNameMessage(null);
    return true;
  };

  const validatePassword = (text) => {
    if (text === null) {
      return null;
    }
    if (text.length < 1) {
      setPasswordMessage({ error: trans(locale, lang, 'sandiRequired') });
      return false;
    }
    if (!regexPassword.test(text)) {
      setPasswordMessage({
        warning: trans(locale, lang, 'sandiInvalid'),
      });
      return false;
    }
    setPasswordMessage(null);
    return true;
  };

  const validateConfPassword = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setConfPasswordMessage({
          error: trans(locale, lang, 'confirmSandiRequired'),
        });
        return false;
      }
      if (text !== password) {
        setConfPasswordMessage({
          error: trans(locale, lang, 'confirmSandiNotSame'),
        });
        return false;
      }
      setConfPasswordMessage(null);
      return true;
    },
    [lang, password, confPassword],
  );

  const handleButtonRegister = () => {
    setLoading(true);
    setIsSubmitCheckPhoneEmail(true);
    checkPhoneAndEmail();
  };

  // render
  const renderHeader = () => {
    return (
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <div role="button" onClick={() => router.back()}>
            <img src={BtnBack} className="w-4 md:w-5" />
          </div>
          <p className="font-bold pl-4 text-sm md:text-base">
            {trans(locale, lang, 'registrasi')}
          </p>
        </div>
        <img src={lifeIdRed} className="h-16 md:h-20" />
      </div>
    );
  };

  const renderFormRegister = () => {
    return (
      <div className="pt-5">
        <Input
          required
          type="number"
          inputMode="tel"
          className="mb-4"
          value={phone}
          label={trans(locale, lang, 'emailNoHp')}
          placeholder={trans(locale, lang, 'emailNoHpAnda')}
          message={phoneNumberMessage}
          prefixIcon={<span>+</span>}
          isBajoRun={isBajoRunProgress}
          handleOnChange={(val) => {
            setPhone(val);
            setValidPhone(validatePhone(val));
          }}
        />
        <Input
          className="mb-4"
          value={fullName}
          label={trans(locale, lang, 'namaPanggilan')}
          placeholder={trans(locale, lang, 'namaLengkapAnda')}
          message={fullNameMessage}
          handleOnChange={(val) => {
            setFullName(val);
            setValidFullName(validateFullName(val));
          }}
          required
        />
        <Input
          className="mb-4"
          type={passwordVisibility ? 'password' : 'text'}
          value={password}
          label={trans(locale, lang, 'kataSandi')}
          placeholder={trans(locale, lang, 'buatKataSandi')}
          message={passwordMessage}
          suffixIcon={
            <div
              role="button"
              onClick={() => setPasswordVisibility(!passwordVisibility)}>
              <Image
                src={!passwordVisibility ? Eye1 : EyeOff1}
                width={24}
                height={24}
              />
            </div>
          }
          handleOnChange={(val) => {
            setPassword(val);
            setValidPassword(validatePassword(val));
          }}
          required
        />
        <Input
          className="mb-0"
          type={confPasswordVisibility ? 'password' : 'text'}
          value={confPassword}
          label={trans(locale, lang, 'konfirmasiSandi')}
          placeholder={trans(locale, lang, 'ulangiKataSandi')}
          onFocus={() => setPasswordFilled(true)}
          message={confPasswordMessage}
          suffixIcon={
            <div
              role="button"
              onClick={() =>
                setConfPasswordVisibility(!confPasswordVisibility)
              }>
              <Image
                src={!confPasswordVisibility ? Eye1 : EyeOff1}
                width={24}
                height={24}
              />
            </div>
          }
          handleOnChange={(val) => {
            setConfPassword(val);
            setValidConfPassword(validateConfPassword(val));
          }}
          required
        />

        <div className="relative">
          {showInfoRef && (
            <div
              className={
                'px-4 py-2 bg-white rounded-xl -top-6 shadow-xl absolute w-auto border'
              }>
              <p className="text-sm">{trans(locale, lang, 'tooltipText')}</p>
            </div>
          )}
          <Icon
            size={12}
            icon={info}
            onClick={() => setShowInfoRef(!showInfoRef)}
            className="cursor-pointer relative top-4 text-gray-400 hover:text-gray-500 left-20 lg:left-[85px]"
          />
          <Input
            className="mb-4"
            value={referral}
            maxLength={50}
            label={trans(locale, lang, 'kodeReferral')}
            placeholder={trans(locale, lang, 'kodeReferralAnda')}
            handleOnChange={(val) => {
              setReferral(val);
            }}
          />
        </div>

        <div className="mb-10 mt-8 md:mb-5">
          <Button
            shadow
            full
            type="linear-gradient"
            className="text-sm md:text-base"
            disabled={
              !isValidPhone ||
              !isValidFullName ||
              !isValidPassword ||
              !isValidConfPassword ||
              isSubmitCheckPhoneEmail
            }
            onButtonClick={() => {
              handleButtonRegister();
            }}>
            {/* <img
              className="h-4 mr-1 md:h-5"
              src={
                !isValidPhone ||
                !isValidFullName ||
                !isValidPassword ||
                !isValidConfPassword ||
                isSubmitCheckPhoneEmail
                  ? IconIfgGray
                  : IconRegister
              }
            /> */}
            {trans(locale, lang, 'daftar')}
          </Button>
        </div>
      </div>
    );
  };

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
              onClick={() => {
                setRequestOtpClear();
                setShowPrivacy(false);
              }}
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

          <div className=" relative bg-white px-[5%] pt-5 pb-2">
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
                setRegisterClear();
                router.push(
                  {
                    pathname: NAVIGATION.REGISTER.RegisterOtp,
                    query: {
                      otpSendTo: phone,
                      previousRoute: 'RegisterInput',
                      product,
                    },
                  },
                  NAVIGATION.REGISTER.RegisterOtp,
                );
              }}>
              {trans(locale, lang, 'setuju')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderModalCounter = () => {
    return (
      <Modal isOpen={isShowModalCounter} className="relative max-w-[375px]">
        <div className="relative md:p-3">
          <Icon
            icon={close}
            size={18}
            className="z-50  cursor-pointer text-gray-400"
            onClick={() => setIsShowModalCounter(false)}
          />
          <img
            src={ClockOTP}
            className="absolute w-32 xm:w-36 md:w-40 top-5 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-8 xm:pt-10 md:pt-12 text-base xm:text-lg md:text-xl font-bold text-center my-3">
            {trans(locale, lang, 'terlaluSeringMeminta')}
          </p>
          <p className="text-xs xm:text-sm md:text-base font-medium text-center opacity-50">
            {trans(locale, lang, 'andaTelahMeminta')}
            <span className="text-red-500">{showRemainingTime()}</span>
          </p>

          <Button
            className="mt-5 mb-1 text-sm !h-10 xm:!h-11 md:text-base"
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
    <div>
      <img
        src={DefaultBackground}
        className="absolute z-0 top-0 left-0 w-full h-full hidden md:block"
      />
      <div
        onClick={() => setShowInfoRef(false)}
        className={`absolute top-0 left-0 w-screen h-screen bg-transparent ${
          showInfoRef ? 'z-20' : 'z-0'
        }`}></div>
      <div className="relative z-10 w-full flex justify-center items-center min-h-screen md:min-h-[90vh]">
        <div className="relative z-10 w-full max-w-2xl">
          <div className="bg-white rounded-2xl p-4 md:p-5 md:border md:shadow-md">
            {showPrivacy ? renderSyaratDanKetentuan() : null}
            {showPrivacy ? null : renderHeader()}
            {showPrivacy ? null : renderFormRegister()}
          </div>
        </div>
        {renderModalCounter()}
      </div>
    </div>
  );
}
