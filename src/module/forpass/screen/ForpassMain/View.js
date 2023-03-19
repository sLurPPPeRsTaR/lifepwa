import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  Button,
  Container,
  Input,
  Modal,
  ModalTooFrequently,
} from '@cp-component';
import { LupaSandi, lifeIdRed } from '@cp-config/Images';
import { Account, BtnBack, Close, Terkirim } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import locale from './locale';
import {
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PROFILE_REQUEST_OTP_SUCCESS,
} from '@cp-module/profile/profileConstant';
import {
  regexEmail,
  regexGlobalPhoneNumber,
  regexMobile,
} from '@cp-util/common';
import { NAVIGATION, REQUEST_OTP_SECONDS } from '@cp-util/constant';

const REMAINING_SECONDS = REQUEST_OTP_SECONDS;

export default function Page({
  lang,
  setProfileRequestOtpFailed,
  setProfileRequestOtpClear,
  setProfileRequestOtp,
  profileAction,
  setLoading,
}) {
  const router = useRouter();

  const {
    query: { uniqueLink },
  } = router;

  const firstUpdate = useRef(true);
  const [emailNo, setEmailNo] = useState('');
  const [isValidEmail, setValidEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModalSuccessActive, setModalSuccessActive] = useState(false);
  const [isTooFrequentlyModalVisible, setIsTooFrequentlyModalVisible] =
    useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(REMAINING_SECONDS);
  const [reqOtpSendTo, setReqOtpSendTo] = useState('');

  // TOO FREQUENTLY ERROR
  const [isUserBlocked, setIsUserBlocked] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // TOO FREQUENTLY HANDLING
  useEffect(() => {
    if (isUserBlocked) {
      setEmailMessage({
        error: `${trans(locale, lang, 'silahkanMenunggu')} ${seconds} ${trans(
          locale,
          lang,
          'detik',
        )}`,
      });
    }
  }, [isUserBlocked, lang, seconds]);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Clear User Block
  useEffect(() => {
    if (seconds === 0) {
      setIsUserBlocked(false);
      setEmailMessage(null);
    }
  }, [seconds]);

  const setProfileSecurityResult = useCallback(
    (action) => {
      if (action === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setModalSuccessActive(true);
        setProfileRequestOtpClear();
      }
      if (action === SET_PROFILE_REQUEST_OTP_FAILED) {
        setIsSubmit(false);
        setLoading(false);
        setProfileRequestOtpClear();
        const message = setProfileRequestOtpFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          if (message?.match('TOO_FREQUENTLY_')) {
            setRemainingSeconds(Number(message?.substring(15)));
            setIsTooFrequentlyModalVisible(true);
            return;
          }
          if (message === 'NOT_REGISTERED') {
            setEmailMessage({ error: trans(locale, lang, 'maafEmailAtau') });
            return;
          }
          alert('Error', message);
        }
      }
    },
    [
      lang,
      setLoading,
      setProfileRequestOtpClear,
      setProfileRequestOtpFailed?.message,
    ],
  );

  useEffect(() => {
    setProfileSecurityResult(profileAction);
  }, [profileAction, setProfileSecurityResult]);

  const validateEmail = useCallback(
    (text) => {
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
    },
    [lang],
  );

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidEmail(validateEmail(emailNo));
  }, [validateEmail, emailNo]);

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative flex items-center justify-between px-[5%] pt-5 md:pt-0">
        <div className="flex items-center">
          <div role="button" onClick={() => router.back()}>
            <img src={BtnBack} className="w-5" />
          </div>
          <p className="font-bold md:text-h6 pl-4">
            {trans(locale, lang, 'forpass')}
          </p>
        </div>
        <img src={lifeIdRed} className="h-16 md:h-20" />
      </div>
    );
  }

  function renderHeaderContainer() {
    return (
      <div className="pt-10">
        <div className="flex justify-center items-center">
          <img src={LupaSandi} className="w-[60%]" />
        </div>
        <div className="text-body2 text-mediumGray-light-mediumGray font-medium mb-6">
          {trans(locale, lang, 'subtitle')}
        </div>
      </div>
    );
  }

  function renderInputCard() {
    return (
      <div>
        <Input
          label={trans(locale, lang, 'emailLabel')}
          value={emailNo}
          inputMode="email"
          placeholder={trans(locale, lang, 'emailPlaceholder')}
          prefixIcon={<Image src={Account} width={24} height={24} />}
          message={emailMessage}
          handleOnChange={(val) => {
            setEmailNo(val);
          }}
        />
      </div>
    );
  }

  function renderButtonContainer() {
    return (
      <div className="mt-14 mb-4">
        <Button
          type="linear-gradient"
          disabled={!isValidEmail || isSubmit || isUserBlocked}
          onButtonClick={() => {
            if (!isSubmit) {
              setIsSubmit(true);
              setReqOtpSendTo(emailNo);
              setProfileRequestOtp({
                isNoLogin: true,
                data: {
                  id: emailNo,
                  action: 'VERIFY_RESET_PASSWORD',
                },
              });
            }
          }}
          shadow
          full>
          {trans(locale, lang, 'confirm')}
        </Button>
      </div>
    );
  }

  function renderModalSuccess() {
    return (
      <Modal isOpen={isModalSuccessActive}>
        <div className="relative w-full flex gap-2 items-center text-start text-body1 font-bold mb-4">
          <div
            role="button"
            className="absolute inset-0"
            onClick={() => {
              setModalSuccessActive(false);
              router.push({ pathname: NAVIGATION.HOME.Home });
            }}>
            <Image src={Close} width={32} height={32} />
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center mb-6">
            <img src={Terkirim} width={146} height={146} />
          </div>
          <div className="text-body2 text-mediumGray-light-mediumGray font-medium text-center mb-8">
            {`${trans(locale, lang, 'successMsg1')} ${trans(
              locale,
              lang,
              regexEmail.test(emailNo) ? 'email' : 'nomorHP',
            )} `}
            <span className="text-primary-dark-primary90">{emailNo}</span>
            {regexEmail.test(emailNo)
              ? trans(locale, lang, 'successMsg2')
              : trans(locale, lang, 'successMsgPhone')}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="linear-gradient"
              onButtonClick={() => {
                setModalSuccessActive(false);
                router.push(
                  {
                    pathname: NAVIGATION.REGISTER.RegisterOtp,
                    query: {
                      isNoLogin: true,
                      action: 'VERIFY_RESET_PASSWORD',
                      callbackUrl: NAVIGATION.FORPASS.Forpass,
                      otpSendTo: reqOtpSendTo,
                    },
                  },
                  NAVIGATION.REGISTER.RegisterOtp,
                );
              }}
              full>
              {trans(locale, lang, 'confirm')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <Container className="bg-transparent">
        <div className="relative w-full flex justify-center rounded-2xl bg-white top-1/2 transform translate-y-[-50%] h-full md:h-auto sm:py-4 sm:px-4 md:border md:shadow-lg ">
          <div className="w-full">
            {renderHeader()}
            <div className="relative top-1/3 px-[5%] transform translate-y-[-50%] md:top-0 md:translate-y-0">
              {renderHeaderContainer()}
              {renderInputCard()}
              {renderButtonContainer()}
            </div>
          </div>
        </div>
      </Container>
      {renderModalSuccess()}
      <ModalTooFrequently
        title={trans(locale, lang, 'andaTerlaluSering')}
        subTitle={trans(locale, lang, 'untukSementaraWaktu')}
        isOpen={isTooFrequentlyModalVisible}
        setClose={() => setIsTooFrequentlyModalVisible(false)}
        remainingSeconds={remainingSeconds}
      />
    </>
  );
}
