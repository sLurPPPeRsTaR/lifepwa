import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import { toast } from 'react-toastify';
import { Icon } from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import { ShieldBig } from '@cp-config/Images';
import { Eye1, EyeOff1 } from '@cp-config/Svgs';
import { Button, Input, Modal } from '@cp-component';
import { arrowLeft } from 'react-icons-kit/feather';
import { closeCircled, checkmarkCircled } from 'react-icons-kit/ionicons';
import { useRouter } from 'next/router';
import {
  SET_CREATE_PIN_FAILED,
  SET_CREATE_PIN_SUCCESS,
  SET_CHANGE_PIN_FAILED,
  SET_CHANGE_PIN_SUCCESS,
} from '@cp-module/profile/profileConstant';
import locale from './locale';
import { NAVIGATION } from '@cp-util/constant';

export default function Page(props) {
  const {
    lang,
    profileAction,
    setUserData,
    setCreatePin,
    setCreatePinClear,
    setCreatePinFailed,
    setCreatePinResponse,
    setChangePin,
    setChangePinClear,
    setChangePinFailed,
    setChangePinResponse,
    alreadySetPin,
    alreadySetMPin,
    fromTabProps,
    setActiveTab,
    lifetagId,
  } = props;

  const [pin, setPin] = useState(null);
  const [pinConf, setPinConf] = useState(null);
  const [oldPin, setOldPin] = useState(null);

  const [pinMessage, setPinMessage] = useState(null);
  const [pinConfMessage, setPinConfMessage] = useState(null);
  const [oldPinMessage, setOldPinMessage] = useState(null);

  const [isValidPin, setValidPin] = useState(false);
  const [isValidPinConf, setValidPinConf] = useState(false);
  const [isValidOldPin, setValidOldPin] = useState(false);

  const [pinVisibility, setPinVisibility] = useState(true);
  const [pinConfVisibility, setPinConfVisibility] = useState(true);
  const [oldPinVisibility, setOldPinVisibility] = useState(true);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [messageSuccess, setMessageSuccess] = useState('');

  const router = useRouter();

  const setCreatePinResult = useCallback(
    (act) => {
      if (act === SET_CREATE_PIN_SUCCESS) {
        setUserData({
          userData: {
            alreadySetPin: true,
            alreadySetMPin: true,
          },
        });
        setMessageSuccess(trans(locale, lang, 'successCreatePin'));
        setModalSuccess(true);
        setCreatePinClear();
        if (lifetagId) {
          router.push(
            {
              pathname: NAVIGATION.LIFETAG.LifetagSetting,
              query: { lifetagId },
            },
            NAVIGATION.LIFETAG.LifetagSetting,
          )
        }
      }
      if (act === SET_CHANGE_PIN_SUCCESS) {
        setUserData({
          userData: {
            alreadySetPin: true,
            alreadySetMPin: true,
          },
        });
        setMessageSuccess(trans(locale, lang, 'successCreateMPin'));
        setModalSuccess(true);
        setChangePinClear();
      }
      if (act === SET_CREATE_PIN_FAILED) {
        if (setCreatePinFailed?.message == 'BAD_REQUEST') {
          toast.error('Bad Request!');
        }
        toast.error(setCreatePinFailed?.message);
        setCreatePinClear();
      }
      if (act === SET_CHANGE_PIN_FAILED) {
        if (setChangePinFailed?.message === 'OLD_PIN_NOT_MATCH') {
          setValidOldPin(false);
          setOldPinMessage({ error: trans(locale, lang, 'pinLamaSalah') });
        } else if (setChangePinFailed?.message === 'OLD_PIN_NOT_MATCH') {
          toast.error('Bad Request');
        } else {
          toast.error(setChangePinFailed?.message);
        }
        setChangePinClear();
      }
      setIsSubmit(false);
    },
    [
      lang,
      setCreatePinClear,
      setChangePinClear,
      setChangePinFailed?.message,
      setCreatePinFailed?.message,
      setUserData,
    ],
  );

  useEffect(() => {
    setCreatePinResult(profileAction);
  }, [profileAction, setCreatePinResult]);

  // Validate Pin & Pin Confirmation
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidOldPin(validateOldPin(oldPin));
    setValidPin(validatePin(pin));
    setValidPinConf(validatePinConf(pinConf));
  }, [pin, oldPin, pinConf, validatePin, validateOldPin, validatePinConf]);

  const validatePin = useCallback(
    (text) => {
      const regexNumber = /^[0-9]*$/;
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setPinMessage({ error: trans(locale, lang, 'pinRequired') });
        return false;
      }
      if (!regexNumber.test(text)) {
        setPinMessage({ error: trans(locale, lang, 'pinIsNumber') });
        return false;
      }
      if (text.length < 6) {
        setPinMessage({ error: trans(locale, lang, 'validationPin') });
        return false;
      }
      if (text === oldPin) {
        setPinMessage({ error: trans(locale, lang, 'pinSameWithOld') });
        return false;
      }
      if (text.length > 6) {
        setPinMessage({ error: trans(locale, lang, 'pinLength') });
        return false;
      }
      setPinMessage(null);
      return true;
    },
    [lang, oldPin],
  );

  const validateOldPin = useCallback(
    (text) => {
      const regexNumber = /^[0-9]*$/;
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setOldPinMessage({ error: trans(locale, lang, 'pinRequired') });
        return false;
      }
      if (!regexNumber.test(text)) {
        setOldPinMessage({ error: trans(locale, lang, 'pinIsNumber') });
        return false;
      }
      if (text.length < 6) {
        setOldPinMessage({ error: trans(locale, lang, 'validationPin') });
        return false;
      }
      if (text.length > 6) {
        setOldPinMessage({ error: trans(locale, lang, 'pinLength') });
        return false;
      }
      setOldPinMessage(null);
      return true;
    },
    [lang],
  );

  const validatePinConf = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setPinConfMessage({ error: trans(locale, lang, 'confirmPinRequired') });
        return false;
      }
      if (text !== pin) {
        setPinConfMessage({
          error: trans(locale, lang, 'pinNotSame'),
        });
        return false;
      }
      setPinConfMessage(null);
      return true;
    },
    [lang, pin],
  );

  const handleButtonSubmit = () => {
    if (alreadySetPin && !alreadySetMPin) {
      setChangePin({
        oldPin: oldPin,
        newPin: pin,
        newPinConfirmation: pinConf,
      });
    }
    if (!alreadySetPin) {
      setCreatePin({
        pin: pin,
        pinConfirmation: pinConf,
      });
    }
  };

  const renderFormCreatePin = () => {
    return (
      <div className="px-3 py-8 md:px-6 w-full">
        <div className="w-full min-h-[35vh] h-full flex flex-col">
          <p className="text-xs pb-4 xm:text-sm">
            {alreadySetPin
              ? trans(locale, lang, 'contentTitle')
              : trans(locale, lang, 'subTitleBuatPin')}
          </p>

          <div className="flex justify-between flex-col md:flex-row">
            {alreadySetPin && (
              <div className={`mt-4 w-full md:w-[48%]`}>
                <Input
                  maxLength={6}
                  required
                  value={oldPin}
                  inputMode="numeric"
                  type={!oldPinVisibility ? 'number' : 'password'}
                  label={trans(locale, lang, 'inputLabel1')}
                  placeholder={trans(locale, lang, 'inputPlaceholder1')}
                  suffixIcon={
                    <div className="flex space-x-3">
                      <div
                        role="button"
                        onClick={() => setOldPinVisibility(!oldPinVisibility)}
                        className="flex items-center w-6">
                        <img src={!oldPinVisibility ? Eye1 : EyeOff1} />
                      </div>
                    </div>
                  }
                  handleOnChange={(text) =>
                    setOldPin(text.replace(/[^0-9]/g, ''))
                  }
                  message={oldPinMessage}
                />
              </div>
            )}

            <div
              className={`mb-2 w-full ${
                !alreadySetPin
                  ? 'flex justify-between mt-4 flex-col md:flex-row'
                  : 'md:w-[48%]'
              }`}>
              <div
                className={`mb-2 w-full ${
                  !alreadySetPin ? 'md:w-[48%]' : 'mt-4'
                }`}>
                <Input
                  maxLength={6}
                  required
                  value={pin}
                  inputMode="numeric"
                  type={!pinVisibility ? 'number' : 'password'}
                  label={trans(locale, lang, 'inputLabel2')}
                  placeholder={trans(locale, lang, 'inputPlaceholder2')}
                  suffixIcon={
                    <div className="flex space-x-3">
                      {pin?.length > 5 && (
                        <Icon
                          icon={isValidPin ? checkmarkCircled : closeCircled}
                          size={24}
                          className={
                            isValidPin
                              ? 'text-green-700'
                              : 'text-red-dark-red90'
                          }
                        />
                      )}

                      <div
                        role="button"
                        onClick={() => setPinVisibility(!pinVisibility)}
                        className="flex items-center w-6">
                        <img src={!pinVisibility ? Eye1 : EyeOff1} />
                      </div>
                    </div>
                  }
                  handleOnChange={(text) => setPin(text.replace(/[^0-9]/g, ''))}
                  message={pinMessage}
                />
              </div>
              <div
                className={`mb-2 w-full mt-4 ${
                  !alreadySetPin ? 'md:mt-0 md:w-[48%]' : ''
                }`}>
                <Input
                  maxLength={6}
                  required
                  value={pinConf}
                  inputMode="numeric"
                  type={!pinConfVisibility ? 'number' : 'password'}
                  label={trans(locale, lang, 'inputLabel3')}
                  placeholder={trans(locale, lang, 'inputPlaceholder3')}
                  suffixIcon={
                    <div className="flex space-x-3">
                      {pinConf?.length > 5 && (
                        <Icon
                          icon={
                            isValidPinConf ? checkmarkCircled : closeCircled
                          }
                          size={24}
                          className={
                            isValidPinConf
                              ? 'text-green-700'
                              : 'text-red-dark-red90'
                          }
                        />
                      )}

                      <div
                        role="button"
                        onClick={() => setPinConfVisibility(!pinConfVisibility)}
                        className="flex items-center w-6">
                        <img src={!pinConfVisibility ? Eye1 : EyeOff1} />
                      </div>
                    </div>
                  }
                  handleOnChange={(text) =>
                    setPinConf(text.replace(/[^0-9]/g, ''))
                  }
                  message={pinConfMessage}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mb-5 md:px-[10%]">
          <Button
            className="text-sm !h-10 xm:!h-11 md:text-base"
            type="linear-gradient"
            shadow
            full
            disabled={
              (alreadySetPin && !isValidOldPin) ||
              !isValidPin ||
              !isValidPinConf ||
              isSubmit
            }
            onButtonClick={() => {
              setIsSubmit(true);
              handleButtonSubmit();
            }}>
            {trans(locale, lang, 'btnLabel')}
          </Button>
        </div>
      </div>
    );
  };

  // modal success
  const renderModalSuccess = () => {
    return (
      <Modal isOpen={modalSuccess} size="sm">
        <div className="relative p-3">
          <img
            src={ShieldBig}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center mx-auto my-3">
            {messageSuccess}
          </p>
          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setModalSuccess(false);
              fromTabProps === 0 ? setActiveTab(0) : setActiveTab(fromTabProps);
            }}>
            {trans(locale, lang, 'successBtnLabel')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="relative w-full bg-white rounded-2xl md:rounded-3xl border xs:mb-5 md:mb-0">
      {/* <div className="grid place-items-center border-b-4 py-6 w-full text-center">
        <p className="text-sm xm:text-base md:text-lg font-bold">
          {alreadySetPin
            ? trans(locale, lang, 'title')
            : trans(locale, lang, 'buatPin')}
        </p>
      </div> */}
      <div className="flex px-[4%] justify-between border-b-4 py-6 w-full text-center">
        <div className="w-5">
          <Icon
            icon={arrowLeft}
            size={24}
            onClick={() =>
              fromTabProps === 0 ? setActiveTab(0) : setActiveTab(fromTabProps)
            }
            className="cursor-pointer
                text-gray-600 hover:text-red-dark-red90"
          />
        </div>
        <p className="text-sm md:text-base font-bold">
          {alreadySetPin
            ? trans(locale, lang, 'title')
            : trans(locale, lang, 'buatPin')}
        </p>
        <div className="w-5"></div>
      </div>

      {renderModalSuccess()}
      {renderFormCreatePin()}
    </div>
  );
}
