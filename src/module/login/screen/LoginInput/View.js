import Icon from 'react-icons-kit';
import axios from 'axios';
import Image from 'next/image';
import GoogleLogin from 'react-google-login';
import { useCallback, useEffect, useState } from 'react';
import { close } from 'react-icons-kit/ionicons';
import { trans } from '@cp-util/trans';
import { useRouter } from 'next/router';
import { Button, Container, Input, Modal } from '@cp-component';
import { setInternalServerError } from '@cp-bootstrap/bootstrapAction';
import { DefaultBackground } from '@cp-config/Images';
import clsx from 'classnames';

import LoginTnc from '../LoginTnc';
import LoginPrivacyPolicy from '../LoginPrivacyPolicy';

import {
  getBrowser,
  regexEmail,
  regexGlobalPhoneNumber,
  regexMobile,
  useInterval,
} from '@cp-util/common';
import {
  GOOGLE_PEOPLE_API,
  NAVIGATION,
  DEVICE_PLATFORM,
} from '@cp-util/constant';
import {
  Account,
  BtnBack,
  Eye1,
  EyeOff1,
  Google1,
  Lock1,
  pCall,
  pChat,
  pMail,
  TimeLogin,
} from '@cp-config/Svgs';

import locale from './locale';
import {
  SET_LOGIN_FAILED,
  SET_LOGIN_SOCIAL_FAILED,
  SET_LOGIN_SOCIAL_SUCCESS,
  SET_LOGIN_SUCCESS,
} from '@cp-module/login/loginConstant';
import {
  AccountNotFound,
  IconIfgGray,
  IconRegister,
  lifeIdRed,
  ShieldBig,
} from '@cp-config/Images';

export default function Page({
  alreadyKYC,
  deviceId,
  isBajoRunProgress,
  lang,
  token,
  loginAction,
  setLoading,
  setLogin,
  setLoginClear,
  setLoginFailed,
  setLoginSocial,
  setLoginSocialClear,
  setLoginSocialFailed,
  userId,
}) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isUserBlocked, setIsUserBlocked] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(900);
  const [isLoginSocialFailed, setIsLoginSocialFailed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerm, setShowTerm] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showModalFiveTimesWrong, setShowModalFiveTimesWrong] = useState(false);
  const [showModalCallCenter, setShowModalCallCenter] = useState(false);
  const [lapsedTime, setLapsedTime] = useState(0);
  const [width, setWidth] = useState(
    typeof window === 'undefined' ? 0 : window.innerWidth,
  );

  const {
    query: {
      product,
      deleted,
      eventId,
      accessCode,
      lifetagId,
      callbackUrl,
      isFromClaimPolis,
    },
  } = router;

  useEffect(() => {
    if (deleted == 'success') {
      setShowDeleteAccount(true);
    }
  }, [deleted, router, userId]);

  const responseGoogle = async (response) => {
    const {
      data: { names, emailAddresses },
    } = await axios.get(GOOGLE_PEOPLE_API + response?.accessToken);

    setLoginSocial({
      name: names?.length ? names[0].displayName : '',
      dob: null,
      email: emailAddresses[0].value,
      channelUid: emailAddresses[0].metadata.source.id,
      token: response?.accessToken,
      channelType: 'GOOGLE',
      deviceId,
      deviceType: getBrowser(),
      deviceLocation: null,
      devicePlatform: DEVICE_PLATFORM,
    });
  };

  // Validation
  function validateEmail(text) {
    if (text === null) {
      return null;
    }
    if (text.length < 1) {
      setEmailMessage({ error: trans(locale, lang, 'emailRequired') });
      return false;
    }
    if (!regexEmail.test(text) && !regexMobile.test(text)) {
      setEmailMessage({ error: trans(locale, lang, 'emailInvalid') });
      return false;
    }
    setEmailMessage(null);
    return true;
  }

  function validatePassword(text) {
    if (text.length < 1) {
      setPasswordMessage({ error: trans(locale, lang, 'sandiRequired') });
      return false;
    }
    setPasswordMessage(null);
    return true;
  }

  const setBothLoginResult = useCallback(
    (act) => {
      if (act === SET_LOGIN_SOCIAL_SUCCESS || act === SET_LOGIN_SUCCESS) {
        setLoading(false);
        if (isBajoRunProgress) {
          router.push(
            {
              pathname: NAVIGATION.LIFESAVER.LifesaverBajoRun,
              query: {
                isBajoRunAccess: true,
              },
            },
            NAVIGATION.LIFESAVER.LifesaverBajoRun,
          );
        } else if (eventId) {
          return router.push({
            pathname: `${NAVIGATION.EVENT.EventDetail}/${eventId}`,
          });
        } else if (isFromClaimPolis) {
          return router.push({
            pathname: `${NAVIGATION.CLAIMPOLIS.main}`,
          });
        } else if (lifetagId) {
          return router.push(
            {
              pathname: NAVIGATION.LIFETAG.LifetagMain,
              query: { lifetagId },
            },
            NAVIGATION.LIFETAG.LifetagMain,
          );
        } else if (product?.length) {
          router.push(
            {
              pathname: NAVIGATION.LIFESAVER.LifesaverMain,
              query: { product },
            },
            NAVIGATION.LIFESAVER.LifesaverMain,
          );
        } else {
          const pathname = callbackUrl || NAVIGATION.HOME.Home;
          router.push({ pathname, query: { isLogin: true } }, pathname);
        }
        setLoginClear();
        setLoginSocialClear();
      }
      if (act === SET_LOGIN_SOCIAL_FAILED) {
        setLoading(false);
        setIsLoginSocialFailed(true);
        if (setLoginSocialFailed?.message?.match('USER_BLOCKED_')) {
          const timeRemaining = setLoginSocialFailed?.message?.replace(
            'USER_BLOCKED_',
            '',
          );
          setLapsedTime(+timeRemaining);
          setShowModalFiveTimesWrong(true);
          setLoginSocialClear();
          return;
          // setLMVisible(true);
        } else {
          // setFMVisible(true);
        }
        setLoginSocialClear();
        setShowModalFailed(true);
      }
      if (act === SET_LOGIN_FAILED) {
        setLoading(false);
        setIsLoginSocialFailed(false);
        if (setLoginFailed?.message?.match('USER_BLOCKED_')) {
          setLoginClear();
          const timeRemaining = setLoginFailed?.message?.replace(
            'USER_BLOCKED_',
            '',
          );
          setLapsedTime(+timeRemaining);
          setShowModalFiveTimesWrong(true);
          return;
          // setLMVisible(true);
        } else if (setLoginFailed?.message?.match('INTERNAL_SERVER_ERROR')) {
          setInternalServerError(true);
          // setLMVisible(true);
        }
        {
          // setFMVisible(true);
        }
        setLoginClear();
        setShowModalFailed(true);
      }
      setIsSubmit(false);
    },
    [
      alreadyKYC,
      setLoading,
      setLoginClear,
      setLoginFailed?.message,
      setLoginSocialClear,
    ],
  );

  const updateDimensions = () => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    setBothLoginResult(loginAction);
  }, [loginAction, setBothLoginResult]);

  // Banner Content
  const renderHeader = () => {
    return (
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <div role="button" onClick={() => router.back()}>
            <img src={BtnBack} className="w-4 md:w-5" />
          </div>
          <p className="font-bold pl-4 text-sm md:text-base">
            {trans(locale, lang, 'login')}
          </p>
        </div>
        <img src={lifeIdRed} className="h-16 md:h-20" />
      </div>
    );
  };

  const renderHeaderTitle = () => {
    return (
      <div className="py-2 flex">
        <div className="text-xs text-black font-medium xm:text-sm">
          {trans(locale, lang, 'masukkanEmail')}
        </div>
      </div>
    );
  };

  const renderInputCard = () => {
    return (
      <div className="mt-8 mb-6">
        <div className="mb-5">
          <Input
            inputClassName={clsx(
              'md:placeholder:text-sm',
              width === 280
                ? 'placeholder:text-[8.9px]'
                : 'placeholder:text-[12px]',
            )}
            value={email}
            inputMode="email"
            placeholder={trans(locale, lang, 'emailPlaceholder')}
            message={emailMessage}
            label={trans(locale, lang, 'emailLabel')}
            prefixIcon={<Image src={Account} width={24} height={24} />}
            isBajoRun={isBajoRunProgress}
            handleOnChange={(val) => {
              setEmail(val);
              setValidEmail(validateEmail(val));
            }}
          />
        </div>

        <div>
          <Input
            inputClassName={clsx(
              'md:placeholder:text-sm',
              width === 280
                ? 'placeholder:text-[8.9px]'
                : 'placeholder:text-[12px]',
            )}
            type={passwordVisibility ? 'text' : 'password'}
            value={password}
            message={passwordMessage}
            label={trans(locale, lang, 'kataSandiTitle')}
            placeholder={trans(locale, lang, 'kataSandiPlaceholder')}
            prefixIcon={<Image src={Lock1} width={24} height={24} />}
            suffixIcon={
              <div
                role="button"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
                className="flex items-center">
                <Image
                  src={passwordVisibility ? Eye1 : EyeOff1}
                  width={24}
                  height={24}
                />
              </div>
            }
            handleOnChange={(val) => {
              setPassword(val);
              setValidPassword(validatePassword(val));
            }}
          />
        </div>
      </div>
    );
  };

  const renderForgotPass = () => {
    return (
      <div className="flex justify-end items-center py-1 mb-6 mt-2">
        <div
          role="button"
          onClick={() =>
            router.push({
              pathname: NAVIGATION.FORPASS.ForpassMain,
            })
          }
          className="text-red-500 font-semibold text-xs xm:text-sm">
          {trans(locale, lang, 'lupaSandi')}
        </div>
      </div>
    );
  };

  const renderGroupButton = () => {
    return (
      <div className="mt-8">
        <div className="mb-5">
          <Button
            type="linear-gradient"
            className="text-xs xm:text-sm lg:text-base"
            disabled={!isValidEmail || !isValidPassword || isUserBlocked}
            onButtonClick={() => {
              setLoading(true);
              setLogin({
                id: email,
                password,
                deviceId,
                deviceType: getBrowser(),
                deviceLocation: null,
                devicePlatform: DEVICE_PLATFORM,
              });
            }}
            shadow
            full>
            <img
              className="h-4 xm:h-5 mr-1"
              src={
                !isValidEmail || !isValidPassword || isUserBlocked
                  ? IconIfgGray
                  : IconRegister
              }
            />
            {trans(locale, lang, 'loginLewatIfgId')}
          </Button>
        </div>

        <div className="w-full text-body2 font-normal text-mediumGray-light-mediumGray text-center mb-5">
          <h2
            style={{
              borderBottom: '1px solid #DCDBDD',
              lineHeight: '2px',
              margin: '10px 0 20px',
            }}>
            <span style={{ background: '#fff', padding: '0 10px' }}>
              {trans(locale, lang, 'atau')}
            </span>
          </h2>
        </div>

        <GoogleLogin
          clientId={process.env.GOOGLE_DEVICE_ID}
          render={(renderProps) => (
            <Button
              className="!text-darkGray-light-darkGray mb-8 text-xs xm:text-sm lg:text-base"
              onButtonClick={() => renderProps.onClick()}
              disabled={renderProps.disabled}
              prefixIcon={<Image src={Google1} width={24} height={24} />}
              shadow
              full>
              {trans(locale, lang, 'loginLewatGoogle')}
            </Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <div className="pb-8 flex text-center justify-center">
          <p className="text-sm text-[#84818A] font-semibold">
            {trans(locale, lang, 'belumPunyaAkun')}
          </p>
          <p
            role="button"
            className="text-body2 text-[#ED1C24] font-semibold ml-1"
            onClick={() =>
              router.push({
                pathname: NAVIGATION.REGISTER.Register,
              })
            }>
            {trans(locale, lang, 'register')}
          </p>
        </div>
      </div>
    );
  };

  const renderModalFailed = () => {
    return (
      <Modal isOpen={showModalFailed}>
        <div className="relative flex flex-col justify-center pt-10">
          <div className="absolute -top-36 w-48 left-1/2 translate-x-[-50%]">
            <img src={AccountNotFound} className="w-full" />
          </div>
          <text className="text-lg pt-3 font-bold text-center my-2">
            {trans(locale, lang, 'modalErrorTitle')}
          </text>
          <text className="text-md font-medium text-center mb-5 sm:mx-10 opacity-70">
            {trans(
              locale,
              lang,
              isLoginSocialFailed
                ? 'silahkanLakukanRegistrasiPada'
                : 'modalErrorText',
            )}
          </text>
          <Button
            outline
            className="border-2 border-[#ED1C24]"
            onButtonClick={() => setShowModalFailed(false)}
            full>
            {trans(locale, lang, 'kembali')}
          </Button>

          {isLoginSocialFailed && (
            <Button
              type="linear-gradient"
              className="mt-2"
              onButtonClick={() => {
                setShowModalFailed(false);
                router.push({
                  pathname: NAVIGATION.REGISTER.Register,
                });
              }}
              full>
              {trans(locale, lang, 'registrasiAkun')}
            </Button>
          )}
        </div>
      </Modal>
    );
  };

  const modalDeleteSuccess = () => {
    return (
      <Modal isOpen={showDeleteAccount} className="relative max-w-[600px]">
        <div className="relative p-3">
          <img
            src={ShieldBig}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center mx-auto my-3 max-w-[240px]">
            {trans(locale, lang, 'hapusSukses')}
          </p>
          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setShowDeleteAccount(false);
            }}>
            OK!
          </Button>
        </div>
      </Modal>
    );
  };

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
            className="absolute w-40 s:w-48 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-6 text-xl font-bold text-center my-3">
            {trans(locale, lang, 'fiveTimeTitle')}
          </p>
          <p className="text-base font-medium text-center opacity-50">
            <span>{trans(locale, lang, 'fiveTimeSubTitle')}</span>
            <span className="text-[#ED1C24]"> {renderOtpTime()} </span>
            <span>{trans(locale, lang, 'menit')}</span>
          </p>

          <Button
            className="mt-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => setShowModalCallCenter(true)}>
            {trans(locale, lang, 'hubungiCS')}
          </Button>
        </div>
      </Modal>
    );
  };

  const renderContact = () => {
    const listContact = [
      {
        title: 'WhatsApp Lifia',
        icon: pChat,
        link: 'https://wa.me/628111372848?text=Hi Lifia, saya perlu bantuan',
      },
      { title: 'Call Center 1500176', icon: pCall, link: 'tel:1500176' },
      {
        title: 'customer_care@ifg-life.id',
        icon: pMail,
        link: 'mailto:customer_care@ifg-life.id?Subject=',
      },
    ];

    return (
      <div className="divide-y">
        {listContact.map((val, idx) => (
          <div key={idx} className="group flex flex-col">
            <a
              href={val.link}
              target="_blank"
              className={`w-full p-4 flex flex-row justify-between my-1 s:my-4 duration-500 text-gray-600 rounded-md`}>
              <div className="flex">
                <img src={val.icon} />
                <span className="font-black md:text-base pl-4 xs:text-sm mr-2">
                  {val.title}
                </span>
              </div>
            </a>
            <div></div>
          </div>
        ))}
      </div>
    );
  };

  const renderModalContact = () => {
    return (
      <Modal
        className="relative"
        isOpen={showModalCallCenter}
        toggle={() => setShowModalCallCenter(false)}>
        <div className="w-full h-full">
          <div className="relative pb-2">
            <Icon
              icon={close}
              size={20}
              onClick={() => setShowModalCallCenter(false)}
              className="absolute top-0 cursor-pointer"
            />
            <p className="font-bold text-xl ml-2 text-center">
              {trans(locale, lang, 'pusatBantuan')}
            </p>
          </div>
          {renderContact()}
        </div>
      </Modal>
    );
  };

  // useInterval(() => {
  //   if (lapsedTime > 0) {
  //     setLapsedTime(lapsedTime - 1);
  //   } else {
  //     setLapsedTime(0);
  //     setShowModalFiveTimesWrong(false);
  //   }
  // }, 1000);

  return (
    !token && (
      <div>
        <img
          src={DefaultBackground}
          className="absolute z-0 top-0 left-0 w-full h-full hidden md:block"
        />
        <div className="relative z-10 w-full flex justify-center items-center min-h-screen md:min-h-[90vh]">
          {showTerm && <LoginTnc setShowTerm={setShowTerm} />}
          {showPrivacy && (
            <LoginPrivacyPolicy setShowPrivacy={setShowPrivacy} />
          )}
          {showTerm || showPrivacy ? (
            false
          ) : (
            <div className="relative z-10 w-full max-w-lg">
              <div className="bg-white rounded-2xl p-4 md:p-5 md:border md:shadow-md">
                {renderHeader()}
                {renderHeaderTitle()}
                {renderInputCard()}
                {renderForgotPass()}
                {renderGroupButton()}
              </div>
            </div>
          )}
        </div>

        {renderModalFailed()}
        {modalDeleteSuccess()}
        {modalFiveTimesWrong()}
        {renderModalContact()}
      </div>
    )
  );
}
