import { Icon } from 'react-icons-kit';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { trans } from '@cp-util/trans';
import { ic_error } from 'react-icons-kit/md';
import { ShieldBig } from '@cp-config/Images';
import { Eye1, EyeOff1 } from '@cp-config/Svgs';
import { regexPassword } from '@cp-util/common';
import { Input, Button, Modal } from '@cp-component';
import locale from './locale';
import {
  SET_CHANGE_PASS_FAILED,
  SET_CHANGE_PASS_SUCCESS,
} from '@cp-module/profile/profileConstant';
import { NAVIGATION } from '@cp-util/constant';

export default function View(props) {
  const {
    lang,
    setLogout,
    profileAction,
    setChangePass,
    setChangePassClear,
    setChangePassFailed,
    setChangePassResponse,
  } = props;
  const router = useRouter();
  const [oldPass, setOldPass] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [newPassConf, setNewPassConf] = useState(null);

  const [oldPassVisibility, setOldPassVisibility] = useState(false);
  const [passVisibility, setPassVisibility] = useState(false);
  const [passConfVisibility, setPassConfVisibility] = useState(false);

  const [oldPassMessage, setOldPassMessage] = useState(null);
  const [passMessage, setPassMessage] = useState(null);
  const [passConfMessage, setPassConfMessage] = useState(null);

  const [isValidOldPass, setValidOldPass] = useState(false);
  const [isValidPass, setValidPass] = useState(false);
  const [isValidPassConf, setValidPassConf] = useState(false);

  const [modalSuccess, setModalSuccess] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const setChangePassResult = useCallback(
    (act) => {
      if (act === SET_CHANGE_PASS_SUCCESS) {
        setModalSuccess(true);
        setChangePassClear();
        // setLogout();
      }
      if (act === SET_CHANGE_PASS_FAILED) {
        if (setChangePassFailed?.message === 'WRONG_OLD_PASSWORD') {
          setValidOldPass(false);
          setOldPassMessage({
            error: trans(locale, lang, 'oldPassWrong'),
          });
          return;
        }
        if (setChangePassFailed?.message === 'BAD_REQUEST') {
          setValidPass(false);
          setPassMessage({
            error: trans(locale, lang, 'passBadRequest'),
          });
          return;
        }
        toast.error(setChangePassFailed?.message);
      }
      setIsSubmit(false);
    },
    [lang, setChangePassClear, setChangePassFailed],
  );

  useEffect(() => {
    setChangePassResult(profileAction);
  }, [profileAction, setChangePassResult]);

  const validateOldPass = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text?.length < 1) {
        setOldPassMessage({
          error: trans(locale, lang, 'oldPassRequired'),
        });
        return false;
      }
      setOldPassMessage(null);
      return true;
    },
    [lang],
  );

  const validatePass = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text?.length < 1) {
        setPassMessage({ error: trans(locale, lang, 'passRequired') });
        return false;
      }
      if (!regexPassword.test(text)) {
        setPassMessage({
          error: trans(locale, lang, 'passInvalid'),
        });
        return false;
      }
      if (text === oldPass) {
        setPassMessage({
          warning: trans(locale, lang, 'passSame'),
        });
        return false;
      }
      setPassMessage(null);
      return true;
    },
    [lang, oldPass],
  );

  const validatePassConf = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text?.length < 1) {
        setPassConfMessage({
          error: trans(locale, lang, 'confPassRequired'),
        });
        return false;
      }
      if (text !== newPass) {
        setPassConfMessage({
          error: trans(locale, lang, 'confPassNotSame'),
        });
        return false;
      }
      setPassConfMessage(null);
      return true;
    },
    [lang, newPass],
  );

  const renderModalSuccess = () => {
    return (
      <Modal isOpen={modalSuccess} size="sm">
        <div className="relative p-3">
          <img
            src={ShieldBig}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-lg font-bold text-center my-3">
            {trans(locale, lang, 'successMsg')}
          </p>
          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setLogout();
              router.push({ pathname: NAVIGATION.LOGIN.Login });
              setModalSuccess(false);
            }}>
            {trans(locale, lang, 'login')}
          </Button>
        </div>
      </Modal>
    );
  };

  const handleChangePass = () => {
    setChangePass({
      oldPassword: oldPass,
      newPassword: newPass,
      newPasswordConfirmation: newPassConf,
    });
  };

  return (
    <>
      {renderModalSuccess()}
      <div className="bg-white w-[85%] mx-auto divide-y pt-12 pb-20">
        <div className="w-full h-auto flex flex-col">
          <div className="flex items-center rounded-xl my-4 bg-[rgba(255,185,94,0.30)] md:p-4 xs:p-3">
            <Icon icon={ic_error} size={20} className="text-[#ffaa3a]" />
            <p className="text-xs pl-2 font-bold text-gray-600">
              {trans(locale, lang, 'pastikanKataSandi')}
            </p>
          </div>

          <div className="mt-4 mb-2">
            <Input
              type={oldPassVisibility ? 'text' : 'password'}
              value={oldPass}
              label={trans(locale, lang, 'passOldLabel')}
              message={trans(locale, lang, oldPassMessage)}
              placeholder={trans(locale, lang, 'passOldPlaceHolder')}
              suffixIcon={
                <div
                  role="button"
                  onClick={() => setOldPassVisibility(!oldPassVisibility)}
                  className="flex items-center">
                  <img src={oldPassVisibility ? Eye1 : EyeOff1} />
                </div>
              }
              handleOnChange={(val) => {
                setOldPass(val);
                setValidOldPass(validateOldPass(val));
              }}
            />
          </div>

          <div className="mt-4 mb-2">
            <Input
              type={passVisibility ? 'text' : 'password'}
              value={newPass}
              label={trans(locale, lang, 'passLabel')}
              message={trans(locale, lang, passMessage)}
              placeholder={trans(locale, lang, 'passPlaceholder')}
              suffixIcon={
                <div
                  role="button"
                  onClick={() => setPassVisibility(!passVisibility)}
                  className="flex items-center">
                  <img src={passVisibility ? Eye1 : EyeOff1} />
                </div>
              }
              handleOnChange={(val) => {
                setNewPass(val);
                setValidPass(validatePass(val));
              }}
            />
          </div>

          <div className="mt-4 mb-2">
            <Input
              type={passConfVisibility ? 'text' : 'password'}
              value={newPassConf}
              label={trans(locale, lang, 'passConfLabel')}
              message={trans(locale, lang, passConfMessage)}
              placeholder={trans(locale, lang, 'passConfPlaceholder')}
              suffixIcon={
                <div
                  role="button"
                  onClick={() => setPassConfVisibility(!passConfVisibility)}
                  className="flex items-center">
                  <img src={passConfVisibility ? Eye1 : EyeOff1} />
                </div>
              }
              handleOnChange={(val) => {
                setNewPassConf(val);
                setValidPassConf(validatePassConf(val));
              }}
            />
          </div>
        </div>

        <Button
          className="mt-12"
          type="linear-gradient"
          shadow
          full
          disabled={
            !isValidOldPass || !isValidPass || !isValidPassConf || isSubmit
          }
          onButtonClick={handleChangePass}>
          {trans(locale, lang, 'update')}
        </Button>
      </div>
    </>
  );
}
