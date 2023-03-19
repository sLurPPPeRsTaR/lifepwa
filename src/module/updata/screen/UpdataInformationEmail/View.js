/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight2, Handphone, Message, Pin } from '@cp-config/Svgs';
import { ClockOTP, ShieldBig, WarningIcon } from '@cp-config/Images';
import { toast } from 'react-toastify';
import { trans } from '@cp-util/trans';
import { Icon } from 'react-icons-kit';
import { UpdataInformationEmailEdit } from '@cp-module/updata/screen';
import {
  Button,
  InputOTP,
  Modal,
  ModalTooFrequently,
  InputPINModal,
} from '@cp-component';
import {
  GET_VERIFY_PIN_FAILED,
  GET_VERIFY_PIN_SUCCESS,
} from '@cp-module/profile/profileConstant';
import {
  SET_UPDATA_REQUEST_OTP_FAILED,
  SET_UPDATA_REQUEST_OTP_SUCCESS,
  SET_UPDATA_VERIFY_OTP_FAILED,
  SET_UPDATA_VERIFY_OTP_SUCCESS,
} from '@cp-module/updata/updataConstant';
import locale from './locale';
import { ic_keyboard_backspace } from 'react-icons-kit/md';
import { REQUEST_OTP_SECONDS } from '@cp-util/constant';

const REMAINING_SECONDS = REQUEST_OTP_SECONDS;

export default function Page({
  lang,
  getUpdataLastOtherInfoResponse,
  profileAction,
  updataAction,
  setUpdataRequestOtpFailed,
  getVerifyPin,
  getVerifyPinClear,
  setUpdataRequestOtp,
  setUpdataRequestOtpClear,
  setUpdataVerifyOtp,
  setUpdataVerifyOtpFailed,
  setUpdataVerifyOtpClear,
  setLoading,
  setOtherInformation,
  otherInformation,
  setCurrentScreen,
  setCustomerCare,
  alreadySetPin,
}) {
  // edit form
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  // modal sukses
  const [isVerifyOtp, setIsVerifyOtp] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  // pin
  const [isModalPin, setIsModalPin] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [pinErrorMsg, setErrorMsg] = useState('');

  // OTP
  const [isShowOtp, setIsShowOtp] = useState(false);

  const [otpSendTo, setOtpSendTo] = useState(null);
  const [actionOTP, setActionOTP] = useState('');
  const [errorMsgOTP, setErrorMsgOTP] = useState(false);
  const [isTooFrequentlyModalVisible, setIsTooFrequentlyModalVisible] =
    useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(REMAINING_SECONDS);

  // verify PIN
  const pinResult = useCallback(
    (act) => {
      if (act === GET_VERIFY_PIN_SUCCESS) {
        setIsOpenEdit(true);
        setIsModalPin(false);
        getVerifyPinClear();
        setLoading(false);
      }

      if (act === GET_VERIFY_PIN_FAILED) {
        setPinError(true);
        setErrorMsg(trans(locale, lang, 'pinSalah'));
        getVerifyPinClear();
      }
    },
    [getVerifyPinClear, lang, setLoading],
  );

  useEffect(() => {
    pinResult(profileAction);
  }, [pinResult, profileAction]);

  const handleCloseEdit = () => setIsOpenEdit(false);

  // verify OTP
  const setUpdataEmailEditResult = useCallback(
    (act) => {
      if (act === SET_UPDATA_REQUEST_OTP_SUCCESS) {
        setIsShowOtp(true);
        setLoading(false);
        setUpdataRequestOtpClear();
      }
      if (act === SET_UPDATA_REQUEST_OTP_FAILED) {
        const message = setUpdataRequestOtpFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          if (message?.match('TOO_FREQUENTLY_')) {
            setRemainingSeconds(Number(message?.substring(15)));
            setIsTooFrequentlyModalVisible(true);
            setUpdataRequestOtpClear();
            return;
          }
        }
        setUpdataRequestOtpClear();
      }

      if (act === SET_UPDATA_VERIFY_OTP_SUCCESS) {
        setIsSubmit(false);
        setIsShowOtp(false);
        if (actionOTP === 'REQUEST_CHANGE_EMAIL_POLICY') {
          setIsOpenEdit(true);
        }
        if (actionOTP === 'VERIFY_NEW_EMAIL_POLICY') {
          setIsVerifyOtp(true);
        }
        setUpdataVerifyOtpClear();
      }
      if (act === SET_UPDATA_VERIFY_OTP_FAILED) {
        setUpdataVerifyOtpClear();
        if (setUpdataVerifyOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          setErrorMsgOTP(true);
          return;
        }
      }
    },
    [
      actionOTP,
      setLoading,
      setUpdataRequestOtpClear,
      setUpdataRequestOtpFailed?.message,
      setUpdataVerifyOtpClear,
      setUpdataVerifyOtpFailed?.message,
    ],
  );

  useEffect(() => {
    setUpdataEmailEditResult(updataAction);
  }, [setUpdataEmailEditResult, updataAction]);

  useEffect(() => {
    return () => {
      setIsModalPin(false);
      setIsOpenEdit(false);
      setIsShowOtp(false);
      setIsVerifyOtp(false);
      setUpdataRequestOtpClear();
      setUpdataVerifyOtpClear();
      getVerifyPinClear();
    };
  }, []);

  // render card menu OTP
  function CardMenuOtp({ value, icon }) {
    return (
      <div className="border px-3 md:px-5 divide-y rounded-xl shadow-sm my-4">
        <div className="flex flex-col">
          <div className="flex justify-between py-3">
            <div className="flex grow flex-row items-center">
              <img src={icon} />
              <p className="font-medium text-gray-500 ml-4 text-xs md:text-sm">
                {value}
              </p>
            </div>
            <div className=" flex-none">
              <img src={ArrowRight2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const updateOtherInfo = useCallback(() => {
    setOtherInformation({
      ...otherInformation,
      data: {
        ...otherInformation.data,
        email: otpSendTo,
      },
    });
  }, [otherInformation, otpSendTo]);

  useEffect(() => {
    if (isVerifyOtp) {
      updateOtherInfo();
    }
  }, [isVerifyOtp]);

  // render OTP
  function renderCardOtp() {
    const oldEmail =
      otherInformation?.data?.email ||
      getUpdataLastOtherInfoResponse?.data?.email;
    const oldPhoneNumber =
      otherInformation?.data?.phoneNumber ||
      getUpdataLastOtherInfoResponse?.data?.phoneNumber;
    return (
      <div className="pb-5">
        <p className="text-sm md:text-base">
          {trans(locale, lang, 'lakukanKonfirmasiOtp')}
        </p>
        {oldEmail && (
          <div
            onClick={() => {
              setLoading(true);
              setOtpSendTo(oldEmail);
              setActionOTP('REQUEST_CHANGE_EMAIL_POLICY');
              setUpdataRequestOtp({
                id: oldEmail,
                action: 'REQUEST_CHANGE_EMAIL_POLICY',
              });
            }}>
            <CardMenuOtp icon={Message} value={oldEmail} />
          </div>
        )}

        {oldPhoneNumber && (
          <div
            onClick={() => {
              setLoading(true);
              setOtpSendTo(oldPhoneNumber);
              setActionOTP('REQUEST_CHANGE_EMAIL_POLICY');
              setUpdataRequestOtp({
                id: oldPhoneNumber,
                action: 'REQUEST_CHANGE_EMAIL_POLICY',
              });
            }}>
            <CardMenuOtp icon={Handphone} value={oldPhoneNumber} />
          </div>
        )}

        {alreadySetPin && (
          <div onClick={() => setIsModalPin(true)}>
            <CardMenuOtp
              icon={Pin}
              value={trans(locale, lang, 'masukkanPin')}
            />
          </div>
        )}
      </div>
    );
  }

  // render warning
  function renderWarning() {
    return (
      <div className="py-3 w-full rounded-2xl bg-main-light-yellow p-4 md: mb-5 flex">
        <img
          className="mr-2"
          src={WarningIcon}
          style={{ height: 20, width: 20 }}
        />
        <p className="text-caption1 text-mediumGray-light-mediumGray font-medium">
          {trans(locale, lang, 'pastikanEmailAtau')}
        </p>
      </div>
    );
  }

  // render bantuan
  function renderCustomerCare() {
    return (
      <div className="mt-10 mb-3 w-full">
        <p className="text-center w-2/3 md:w-1/2 mx-auto text-[11px] md:text-xs">
          {trans(locale, lang, 'jikaEmailAtau')}{' '}
          <span
            className="text-red-500 font-semibold duration-300 hover:underline"
            onClick={() => setCustomerCare(true)}
            role="button">
            {trans(locale, lang, 'customerCare')}
          </span>
          {trans(locale, lang, 'kami')}
        </p>
      </div>
    );
  }

  const renderTooFrequentlyModal = () => {
    const closeModal = () => {
      setIsTooFrequentlyModalVisible(false);
    };
    return (
      isTooFrequentlyModalVisible && (
        <ModalTooFrequently
          isOpen={isTooFrequentlyModalVisible}
          setClose={closeModal}
          remainingSeconds={remainingSeconds}
          title={trans(locale, lang, 'terlaluSeringMeminta')}
          subTitle={trans(locale, lang, 'andaTelahMeminta')}
        />
      )
    );
  };

  const renderModalSuccess = () => {
    return (
      <Modal className="relative" isOpen={isVerifyOtp} size="sm">
        <div className="relative p-3">
          <img
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
            src={ShieldBig}
          />
          <p className="pt-12 px-[5%] md:px-[10%] text-lg font-bold text-center mx-auto my-3 md:text-xl">
            {trans(locale, lang, 'updateSukses')}
          </p>

          <Button
            className="mt-8"
            full
            onButtonClick={() => {
              //   setEditEmailActive(false);
              //   setModalSuccess(false);
              setCurrentScreen('');
            }}
            shadow
            type="linear-gradient">
            OK
          </Button>
        </div>
      </Modal>
    );
  };

  const renderHeaderBody = () => {
    return (
      <div className="flex pb-2 mb-10 justify-between items-center border-b">
        <div role="button">
          <Icon
            className="cursor-pointer px-1 ml-1 rounded-sm duration-300 hover:bg-red-50"
            icon={ic_keyboard_backspace}
            onClick={() => setCurrentScreen('')}
            size={18}
          />
        </div>
        <p className="text-xs font-bold text-gray-600 xm:text-sm">
          {trans(locale, lang, 'perbaruiEmail')}
        </p>
        <div className="w-6"></div>
      </div>
    );
  };

  return (
    <div>
      {renderHeaderBody()}
      {!isOpenEdit && !isShowOtp && (
        <div>
          {renderCardOtp()}
          {renderWarning()}
          {renderCustomerCare()}
          {renderModalSuccess()}
        </div>
      )}

      {isOpenEdit && !isShowOtp && (
        <UpdataInformationEmailEdit
          getUpdataLastOtherInfoResponse={getUpdataLastOtherInfoResponse}
          handleCloseEdit={handleCloseEdit}
          otherInformation={otherInformation}
          setActionOTP={setActionOTP}
          setIsShowOtp={setIsShowOtp}
          setIsSubmit={setIsSubmit}
          setOtpSendTo={setOtpSendTo}
        />
      )}

      {isShowOtp && (
        <InputOTP
          action={actionOTP}
          errorMsg={errorMsgOTP}
          onHandleRequestOTP={setUpdataRequestOtp}
          onHandleRequestOTPClear={setUpdataRequestOtpClear}
          onHandleSubmitOTP={setUpdataVerifyOtp}
          otpSendTo={otpSendTo}
          requestOTPFailed={setUpdataRequestOtpFailed}
          setErrorMsg={setErrorMsgOTP}
        />
      )}

      {isModalPin && (
        <InputPINModal
          isOpen={isModalPin}
          callbackAction={'SET_UPDATA_CHANGE_EMAIL'}
          alreadySetPin={alreadySetPin}
          hide={() => setIsModalPin(false)}
          callBack={(res) => {
            const { success, callbackAction } = res;
            if (success && callbackAction === 'SET_UPDATA_CHANGE_EMAIL') {
              setIsOpenEdit(true);
              setIsModalPin(false);
              getVerifyPinClear();
              setLoading(false);
            }
          }}
        />
      )}
      {renderTooFrequentlyModal()}
    </div>
  );
}
