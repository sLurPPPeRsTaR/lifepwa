import Image from 'next/image';
import locale from './locale';
import { trans } from '@cp-util/trans';
import { lifeIdRed } from '@cp-config/Images';
import { useRouter } from 'next/router';
import { regexPassword } from '@cp-util/common';
import { NAVIGATION } from '@cp-util/constant';
import { Button, Container, Input, Modal } from '@cp-component';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BadgeTick,
  BtnBack,
  Close,
  Eye1,
  EyeOff1,
  Lock1,
} from '@cp-config/Svgs';
import {
  SET_RESET_PASS_FAILED,
  SET_RESET_PASS_SUCCESS,
} from '@cp-module/forpass/forpassConstant';

export default function Page({
  forpassAction,
  lang,
  setResetPassword,
  setResetPasswordFailed,
  setProfileRequestOtpParam,
  setResetPasswordClear,
}) {
  const router = useRouter();

  const {
    query: { uniqueLink },
  } = router;

  const firstUpdate = useRef(true);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [passVisibility, setPassVisibility] = useState(true);
  const [confPassVisibility, setConfPassVisibility] = useState(true);
  const [isValidPassword, setValidPassword] = useState(false);
  const [isValidConfPassword, setValidConfPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [confPasswordMessage, setConfPasswordMessage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModalSuccessActive, setModalSuccessActive] = useState(false);
  const [isExpiredModalVisible, setIsExpiredModalVisible] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const setResetPasswordResult = useCallback(
    (act) => {
      if (act === SET_RESET_PASS_SUCCESS) {
        setIsSubmit(false);
        setModalSuccessActive(true);
        setResetPasswordClear();
      }
      if (act === SET_RESET_PASS_FAILED) {
        setIsSubmit(false);
        const message = setResetPasswordFailed?.message;
        setResetPasswordClear();
        if (message.match('UNIQUE_LINK_EXPIRED')) {
          setIsExpiredModalVisible(true);
          setIsExpired(true);
          return;
        }
        if (message.match('INVALID_UNIQUE_LINK')) {
          setIsExpiredModalVisible(true);
          setIsExpired(false);
          return;
        }
        if (message.match('BAD_REQUEST')) {
          setValidPassword(false);
          setPasswordMessage({
            error: trans(locale, lang, 'sandiBadRequest'),
          });
          return;
        }
      }
    },
    [lang, setResetPasswordClear, setResetPasswordFailed?.message],
  );

  // Validation
  function validatePassword(text) {
    if (text === null) {
      return null;
    }
    if (text.length < 1) {
      setPasswordMessage({ error: trans(locale, lang, 'sandiRequired') });
      return false;
    }
    if (!regexPassword.test(text)) {
      setPasswordMessage({
        error: trans(locale, lang, 'sandiInvalid'),
      });
      return false;
    }
    setPasswordMessage(null);
    return true;
  }

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
    [password],
  );

  useEffect(() => {
    setResetPasswordResult(forpassAction);
  }, [forpassAction, setResetPasswordResult]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidPassword(validatePassword(password));
    setValidConfPassword(validateConfPassword(confPassword));
  }, [password, confPassword, validateConfPassword]);

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative flex items-center justify-between px-[5%] pt-5 md:pt-0">
        <div className="flex items-center">
          <div role="button" onClick={() => router.back()}>
            <img src={BtnBack} className="w-5" />
          </div>
          <p className="font-bold text-h6 pl-4">
            {trans(locale, lang, 'lupaSandi')}
          </p>
        </div>
        <img src={lifeIdRed} className="h-16 md:h-20" />
      </div>
    );
  }

  function renderHeaderContainer() {
    return (
      <div className="py-6">
        <p className="text-body1 text-neutral-light-neutral60 font-bold pb-1">
          {trans(locale, lang, 'title')}
        </p>
        <p className="text-body2 text-mediumGray-light-mediumGray font-medium">
          {trans(locale, lang, 'subtitle')}
        </p>
      </div>
    );
  }

  function renderInputCard() {
    return (
      <div>
        <div className="mt-2 mb-6">
          <Input
            className="mb-5"
            type={passVisibility ? 'password' : 'text'}
            value={password || ''}
            label={trans(locale, lang, 'kataSandiTitle')}
            placeholder={trans(locale, lang, 'kataSandiPlaceholder')}
            prefixIcon={<Image src={Lock1} width={24} height={24} />}
            suffixIcon={
              <div
                role="button"
                onClick={() => setPassVisibility(!passVisibility)}
                className="flex items-center">
                <Image
                  src={passVisibility ? EyeOff1 : Eye1}
                  width={24}
                  height={24}
                />
              </div>
            }
            handleOnChange={(val) => {
              setPassword(val);
              setValidPassword(validatePassword(val));
            }}
            message={passwordMessage}
          />
          <Input
            className="mb-5"
            type={confPassVisibility ? 'password' : 'text'}
            value={confPassword || ''}
            label={trans(locale, lang, 'confirmSandiLabel')}
            placeholder={trans(locale, lang, 'confirmSandiPlaceholder')}
            prefixIcon={<Image src={Lock1} width={24} height={24} />}
            suffixIcon={
              <div
                role="button"
                onClick={() => setConfPassVisibility(!confPassVisibility)}
                className="flex items-center">
                <Image
                  src={confPassVisibility ? EyeOff1 : Eye1}
                  width={24}
                  height={24}
                />
              </div>
            }
            handleOnChange={(val) => {
              setConfPassword(val);
              setValidConfPassword(validateConfPassword(val));
            }}
            message={confPasswordMessage}
          />
        </div>
      </div>
    );
  }

  function renderButtonContainer() {
    return (
      <div className="mb-5">
        <Button
          type="linear-gradient"
          disabled={!isValidPassword || !isValidConfPassword || isSubmit}
          onButtonClick={() => {
            setIsSubmit(true);
            setResetPassword({
              id: setProfileRequestOtpParam?.data?.id,
              newPassword: password,
              newPasswordConfirmation: confPassword,
            });
          }}
          shadow
          full>
          {trans(locale, lang, 'submit')}
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
              router.push({ pathname: NAVIGATION.LOGIN.Login });
            }}>
            <Image src={Close} width={32} height={32} />
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center mb-6">
            <img src={BadgeTick} className="w-24" />
          </div>
          <div className="text-h6 text-neutral-light-neutral80 font-bold text-center mb-1">
            {trans(locale, lang, 'successChanged')}
          </div>
          <div className="text-body2 text-mediumGray-light-mediumGray font-medium text-center mb-8">
            {trans(locale, lang, 'successMsg')}
          </div>
          <Button
            type="linear-gradient"
            onButtonClick={() => {
              setModalSuccessActive(false);
              router.push({
                pathname: NAVIGATION.LOGIN.Login,
              });
            }}
            shadow
            full>
            {trans(locale, lang, 'login')}
          </Button>
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
    </>
  );
}
