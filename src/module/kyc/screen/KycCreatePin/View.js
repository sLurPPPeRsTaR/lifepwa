import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image';
import locale from './locale';
import { trans } from '@cp-util/trans';
import { NAVIGATION, codeLifesaver } from '@cp-util/constant';
import { Button, Container, HeaderPage, Input, Modal } from '@cp-component';
import { SET_SUBMISSION_SUCCESS } from '@cp-module/lifesaver/lifesaverConstant';
import {
  BadgeTick,
  Eye1,
  EyeOff1,
  KycStep1Active,
  KycStep2Active,
  KycStep3Active,
} from '@cp-config/Svgs';
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  SET_KYC_PIN_FAILED,
  SET_KYC_PIN_SUCCESS,
} from '@cp-module/kyc/kycConstant';
import Icon from 'react-icons-kit';
import { checkmarkCircled } from 'react-icons-kit/ionicons';
import { closeCircled } from 'react-icons-kit/ionicons';
import { eventAppsflyer } from '@cp-util/func';

export default function Page({
  lang,
  kycAction,
  eventId,
  accessCode,
  isBajoRunProgress,
  setUserData,
  setKycPin,
  setKycPinClear,
  setKycPinFailed,
  setSubmission,
  lifesaverAction,
  setSubmissionResponse,
  getProductsResponse,
  userId,
}) {
  const router = useRouter();
  const firstUpdate = useRef(true);
  const [pin, setPin] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [confirmPin, setConfirmPin] = useState();
  const [isModalSuccessActive, setModalSuccessActive] = useState(false);
  const [pinMessage, setPinMessage] = useState(null);
  const [pinConfMessage, setPinConfMessage] = useState(null);
  const [isValidPin, setValidPin] = useState(false);
  const [isValidPinConf, setValidPinConf] = useState(false);
  const [pinVisible, setPinVisible] = useState(false);
  const [confirmPinVisible, setConfirmPinVisible] = useState(false);

  const lifesaverResult = useCallback((act) => {
    switch (act) {
      case SET_SUBMISSION_SUCCESS:
        setIsSubmit(true);
        break;
      default:
        break;
    }
  }, []);

  const validatePin = useCallback(
    (text) => {
      const regexNumber = /^[0-9]*$/;
      if (!text) {
        return false;
      }
      if (text?.length < 1) {
        setPinMessage({ error: trans(locale, lang, 'newPINRequired') });
        return false;
      }
      if (!regexNumber.test(text) && text) {
        setPinMessage({ error: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      if (text?.length < 6) {
        setPinMessage({ error: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      if (text?.length > 6) {
        setPinMessage({ error: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      setPinMessage(null);
      return true;
    },
    [lang],
  );

  const validatePinConf = useCallback(
    (text) => {
      if (!text) {
        return false;
      }
      if (text?.length < 1) {
        setPinConfMessage({ error: trans(locale, lang, 'confPINRequired') });
        return false;
      }
      if (text !== pin) {
        setPinConfMessage({
          error: trans(locale, lang, 'confPINInvalid'),
        });
        return false;
      }
      setPinConfMessage(null);
      return true;
    },
    [lang, pin],
  );

  const getKycResult = useCallback(
    (act) => {
      if (act === SET_KYC_PIN_SUCCESS) {
        setIsSubmit(false);
        setModalSuccessActive(true);
        setUserData({
          userData: {
            alreadySetPin: true,
            alreadySetMPin: true,
          },
        });
        setKycPinClear();
        eventAppsflyer({
          eventName: 'af_complete_ekyc',
          payload: { af_user_id: userId },
        });
      }
      if (act === SET_KYC_PIN_FAILED) {
        setIsSubmit(false);
        setKycPinClear();
        if (setKycPinFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          toast.error('INTERNAL_SERVER_ERROR');
          return;
        }
        toast.error('INTERNAL_SERVER_ERROR');
      }
    },
    [setKycPinClear, setKycPinFailed?.message, setUserData],
  );

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidPin(validatePin(pin));
    setValidPinConf(validatePinConf(confirmPin));
  }, [confirmPin, pin, validatePin, validatePinConf]);

  useEffect(() => {
    getKycResult(kycAction);
  }, [getKycResult, kycAction]);

  // dari lifesaver select
  const {
    query: { product, prev, callbackUrl },
  } = router;

  const onSubmitAgreement = () => {
    setSubmission({
      product: {
        productCode: codeLifesaver?.productCode,
        planCode: codeLifesaver[product]?.planCode,
        type: codeLifesaver?.subsType?.start,
        price: parseInt(getProductsResponse?.[product]?.biayaLangganan, 10),
      },
      agreement: {
        tnc: 'yes',
        riplay: 'yes',
      },
    });
  };

  useEffect(() => {
    lifesaverResult(lifesaverAction);
  }, [lifesaverAction, lifesaverResult]);

  useEffect(() => {
    if (setSubmissionResponse?.transactionId && isSubmit) {
      // CLOSE PAYMENT GATEWAY
      router.push({
        pathname: NAVIGATION.LIFESAVER.LifesaverMain,
      });
      // OPEN GATEWAY
      // router.push(
      //   {
      //     pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
      //     query: {
      //       ...setSubmissionResponse,
      //       product,
      //       from: 'start',
      //     },
      //   },
      //   NAVIGATION.LIFESAVER.LifesaverConfirm,
      // );
      setIsSubmit(false);
    }
  }, [setSubmissionResponse, isSubmit]);

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative h-14 px-4  flex items-center">
        <div className="absolute w-full text-center text-body1 font-bold">
          {trans(locale, lang, 'title')}
        </div>
      </div>
    );
  }

  function renderStep() {
    return (
      <div className="flex flex-col items-center mb-8 sm:mb-12 mt-4">
        <div className="flex items-center w-full max-w-full sm:max-w-[75%] gap-4 mb-2">
          <div>
            <Image src={KycStep1Active} width={24} height={24} />
          </div>
          <div className="grow h-0.5 bg-[#ED1C24] rounded-full" />
          <div>
            <Image src={KycStep2Active} width={24} height={24} />
          </div>
          <div className="grow h-0.5 bg-[#ED1C24] rounded-full" />
          <div>
            <Image src={KycStep3Active} width={24} height={24} />
          </div>
        </div>
        <div className="w-full max-w-full sm:max-w-[75%] text-primary-dark-primary90 font-semibold text-body2 text-right">
          {trans(locale, lang, 'buatPinHeader')}
        </div>
      </div>
    );
  }

  function renderInput() {
    return (
      <div className="mb-6 sm:mb-12">
        <div className="text-body2 text-neutral-dark-neutral60 font-medium mb-6">
          {trans(locale, lang, 'buatPinUntuk')}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-2 sm:mb-0">
          <Input
            type={!pinVisible ? 'password' : 'number'}
            className="w-full mb-4"
            value={pin}
            inputMode="numeric"
            label={trans(locale, lang, 'buatPinForm')}
            placeholder={trans(locale, lang, 'masukkanPinBaru')}
            message={pinMessage}
            suffixIcon={
              <div className="flex space-x-3">
                {pin?.length > 5 && (
                  <Icon
                    icon={isValidPin ? checkmarkCircled : closeCircled}
                    size={24}
                    className={
                      isValidPin ? 'text-green-700' : 'text-red-dark-red90'
                    }
                  />
                )}
                <div
                  role="button"
                  onClick={() => setPinVisible(!pinVisible)}
                  className="flex items-center w-6">
                  <img src={!pinVisible ? EyeOff1 : Eye1} />
                </div>
              </div>
            }
            handleOnChange={(val) => {
              if (val.length < 7) {
                setPin(val.replace(/[^0-9]/g, ''));
              }
            }}
            required
          />
          <Input
            type={!confirmPinVisible ? 'password' : 'number'}
            className="w-full mb-4"
            value={confirmPin}
            inputMode="numeric"
            label={trans(locale, lang, 'konfirmasiUlangPin')}
            placeholder={trans(locale, lang, 'konfirmasiPinBaru')}
            message={pinConfMessage}
            suffixIcon={
              <div className="flex space-x-3">
                {confirmPin?.length > 5 && (
                  <Icon
                    icon={isValidPinConf ? checkmarkCircled : closeCircled}
                    size={24}
                    className={
                      isValidPinConf ? 'text-green-700' : 'text-red-dark-red90'
                    }
                  />
                )}
                <div
                  role="button"
                  onClick={() => setConfirmPinVisible(!confirmPinVisible)}
                  className="flex items-center w-6">
                  <img src={!confirmPinVisible ? EyeOff1 : Eye1} />
                </div>
              </div>
            }
            handleOnChange={(val) => {
              if (val.length < 7) {
                setConfirmPin(val.replace(/[^0-9]/g, ''));
              }
            }}
            required
          />
        </div>
      </div>
    );
  }

  function renderButton() {
    return (
      <div className="flex flex-col gap-4">
        <Button
          type="linear-gradient"
          className="text-sm !h-10 md:text-base md:!h-11"
          disabled={!isValidPin || !isValidPinConf || isSubmit}
          onButtonClick={() => {
            setIsSubmit(true);
            setKycPin({
              pin: pin,
              pinConfirmation: confirmPin,
            });
          }}
          shadow
          full>
          {trans(locale, lang, 'buatPinBtn')}
        </Button>
      </div>
    );
  }

  function renderModalSuccess() {
    return (
      <Modal
        className="relative"
        isOpen={isModalSuccessActive}
        toggle={() => setModalSuccessActive(false)}>
        <div className="absolute -ml-4 -mt-28 w-full flex justify-center mb-6">
          <img src={BadgeTick} width={146} height={146} />
        </div>
        <div className="text-center mb-4 sm:mb-8 text-h6 text-neutral-light-neutral90 font-bold mt-16">
          {trans(locale, lang, 'titleModalSukses')}
        </div>
        <Button
          className="mb-4"
          type="linear-gradient"
          onButtonClick={() => {
            if (callbackUrl) {
              router.push(callbackUrl);
            } else if (isBajoRunProgress) {
              router.push({
                pathname: NAVIGATION.LIFESAVER.LifesaverBajoRun,
                query: { isBajoRunAccess: true },
              });
            } else if (eventId) {
              router.push({
                pathname: NAVIGATION.EVENT.EventDetail,
                query: { eventId, accessCode },
              });
            } else {
              if (product) {
                // CLOSE PAYMENT GATEWAY
                router.push({
                  pathname: NAVIGATION.LIFESAVER.LifesaverMain,
                });
                // OPEN GATEWAY
                // router.push(
                //   {
                //     pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
                //     query: { product, from: 'start' },
                //   },
                //   NAVIGATION.LIFESAVER.LifesaverConfirm,
                // );
              } else if (prev && prev === 'profilePayment') {
                router.push(
                  {
                    pathname: NAVIGATION.PROFILE.Profile,
                    query: {
                      activeTabProps: 9,
                    },
                  },
                  NAVIGATION.PROFILE.Profile,
                );
              } else {
                router.push({ pathname: NAVIGATION.HOME.Home });
              }
            }
          }}
          shadow
          full>
          {trans(locale, lang, 'ok')}
        </Button>
      </Modal>
    );
  }

  return (
    <>
      <HeaderPage title={trans(locale, lang, 'title')} btnBack={false} />

      <div className="relative w-full flex justify-center -top-10 sm:px-4 sm:p-4 md:-top-16">
        <div className="z-10 w-full pt-6 pb-4 bg-white md:shadow-md sm:rounded-3xl sm:max-w-2xl">
          {/* {renderHeader()} */}
          <div className="py-4 px-5 sm:px-12">
            {/* {renderStep()} */}
            {renderInput()}
            {renderButton()}
          </div>
        </div>
      </div>
      {renderModalSuccess()}
    </>
  );
}
