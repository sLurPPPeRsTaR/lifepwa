import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import locale from './locale';
import PersonalDataKtp from '../ProfilePersonalDataKtp';
import PersonalDataFoto from '../ProfilePersonalDataFoto';
import PersonalDataEmail from '../ProfilePersonalDataEmail';
import PersonalDataPhone from '../ProfilePersonalDataPhone';
import {
  Alert,
  Button,
  Input,
  InputOTP,
  Modal,
  ModalOptionOTP,
} from '@cp-component';
import { trans } from '@cp-util/trans';
import { PenEdit } from '@cp-config/Svgs';
import { arrowLeft } from 'react-icons-kit/feather';
import { Cone, ShieldBig, tooMany, ClockOTP } from '@cp-config/Images';
import {
  envelope,
  close,
  arrowRight,
  volumeControlPhone,
  infoCircle,
} from 'react-icons-kit/fa';
import {
  SET_PERSONAL_DATA_SUCCESS,
  SET_PERSONAL_DATA_FAILED,
  SET_PROFILE_REQUEST_OTP_SUCCESS,
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PROFILE_VERIFY_OTP_SUCCESS,
  SET_PROFILE_VERIFY_OTP_FAILED,
} from '@cp-module/profile/profileConstant';
import { regexNickName, useInterval } from '@cp-util/common';
import { toast } from 'react-toastify';

const REQUEST_CHANGE_EMAIL = 'REQUEST_CHANGE_EMAIL';
const REQUEST_CHANGE_MOBILE_PHONE_NUMBER = 'REQUEST_CHANGE_MOBILE_PHONE_NUMBER';

export default function Page(props) {
  const {
    lang,
    fullName,
    phone,
    userData,
    setUserData,
    alreadySetPin,
    alreadyKYC,
    profileAction,
    getUserIdentity,
    getUserIdentityResponse,
    setPersonalData,
    getPersonalData,
    setPersonalDataClear,
    getPersonalDataResponse,

    setProfileRequestOtp,
    setProfileRequestOtpClear,
    setProfileRequestOtpFailed,
    setProfileVerifyOtp,
    setProfileVerifyOtpClear,
    setProfileVerifyOtpFailed,
  } = props;

  const router = useRouter();
  const [activeHeaderTab, setActiveHeaderTab] = useState(1);
  const [isEditable, setEditable] = useState(false);
  const [isShowCustomerCare, setShowCustomerCare] = useState(false);

  const [newName, setNewName] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [editPhoneActive, setEditPhoneActive] = useState(false);
  const [editEmailActive, setEditEmailActive] = useState(false);
  const [isValidFullName, setValidFullName] = useState(false);
  const [fullNameMessage, setFullNameMessage] = useState(null);

  // request OTP
  const [showModalOptionOTP, setShowModalOptionOTP] = useState(false);

  // otp
  const [activeOTP, setActiveOTP] = useState(false);
  const [actionOTP, setActionOTP] = useState(false);
  const [otpSendTo, setOtpSendto] = useState(false);
  const [errorMsgOTP, setErrorMsgOTP] = useState(false);

  // otp counter
  const [isShowModalCounter, setIsShowModalCounter] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);
  const [lapsedTime, setLapsedTime] = useState(2);

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

  // useInterval(() => {
  //   if (lapsedTime > 0) {
  //     setLapsedTime(lapsedTime - 1);
  //   } else {
  //     setLapsedTime(0);
  //     setProfileRequestOtpClear();
  //     setIsShowModalCounter(false);
  //   }
  // }, 1000);

  useEffect(() => {
    setProfilePersonalDataResult(profileAction);
  }, [profileAction, setProfilePersonalDataResult]);

  const setProfilePersonalDataResult = useCallback(
    (action) => {
      if (action === SET_PERSONAL_DATA_SUCCESS) {
        setUserData({ userData: { name: newName } });
        setModalSuccess(true);
        setPersonalDataClear();
      }
      if (action === SET_PERSONAL_DATA_FAILED) {
        if (setRequestOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          toast.warning(setRequestOtpFailed?.message);
        }
        setPersonalDataClear();
      }
      if (action === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setProfileRequestOtpClear();
        if (showModalOptionOTP) {
          setActiveOTP(true);
          setShowModalOptionOTP(false);
        }
      }
      if (action === SET_PROFILE_REQUEST_OTP_FAILED) {
        if (setProfileRequestOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setProfileRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')) {
            const timeRemaining = setProfileRequestOtpFailed?.message?.replace(
              'TOO_FREQUENTLY_',
              '',
            );
            setLapsedTime(+timeRemaining);
            setIsShowModalCounter(true);
            setProfileRequestOtpClear();
            return;
          } else if (
            setProfileRequestOtpFailed?.message?.match('ALREADY_REGISTERED')
          ) {
            return;
            // toast.error(trans(locale, lang, 'phoneEmailSudahTerdaftar'));
          } else toast.error('Error', setProfileRequestOtpFailed?.message);
        } else toast.error('Error', setProfileRequestOtpFailed?.message);
        setProfileRequestOtpClear();
        // setEditEmailActive(false);
        // setEditPhoneActive(false);
        // setShowModalOptionOTP(false);
      }

      if (action === SET_PROFILE_VERIFY_OTP_SUCCESS) {
        setActiveOTP(false);
        setProfileVerifyOtpClear();
        if (actionOTP === REQUEST_CHANGE_EMAIL) {
          setEditEmailActive(true);
        }
        if (actionOTP === REQUEST_CHANGE_MOBILE_PHONE_NUMBER) {
          setEditPhoneActive(true);
        }
      }
      if (action === SET_PROFILE_VERIFY_OTP_FAILED) {
        setProfileVerifyOtpClear();
        if (setProfileVerifyOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setProfileVerifyOtpFailed?.message === 'WRONG_OTP') {
            setErrorMsgOTP(true);
            return;
          }
          toast.error(setProfileVerifyOtpFailed?.message);
        }
      }
    },
    [
      newName,
      setProfileRequestOtpClear,
      setProfileRequestOtpFailed?.message,
      setProfileVerifyOtpClear,
      setProfileVerifyOtpFailed?.message,
      showModalOptionOTP,
    ],
  );

  useEffect(() => {
    setNewName(userData?.name);
  }, [userData?.name]);

  useEffect(() => {
    if (alreadyKYC) {
      getUserIdentity({});
    }
  }, [alreadyKYC]);

  const modalNotEditable = () => {
    return (
      <Modal isOpen={isEditable}>
        <div className="flex flex-col">
          <Icon
            icon={close}
            size={24}
            className="opacity-20"
            onClick={() => setEditable(false)}
          />
          <img src={Cone} width="100%" style={{ height: 'auto' }} />
          <p className="text-2xl font-bold text-center my-3">
            {trans(locale, lang, 'maafUntukSekarang')}
          </p>
          <p className="text-md font-medium text-center opacity-50">
            {trans(locale, lang, 'melakukanPerubahan')}
          </p>
          <Button
            className="mt-5"
            outline
            shadow
            full
            onButtonClick={() => setEditable(false)}>
            {trans(locale, lang, 'backBtn')}
          </Button>
          <Button
            className="mt-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setEditable(false);
              setShowCustomerCare(true);
            }}>
            {trans(locale, lang, 'hubungiCustomer')}
          </Button>
        </div>
      </Modal>
    );
  };

  const sideModal = () => {
    if (isShowCustomerCare) {
      return (
        <div className="w-full grid h-screen fixed inset-0 bg-white z-50 bg-black/60">
          <div className="lg:w-[25%] md:w-[40%] h-screen bg-white place-self-end flex-col flex place-items-center">
            <div className="w-[90%] h-auto py-4 flex flex-row border-b-2">
              <p className="text-xl self-center m-auto font-bold">
                {trans(locale, lang, 'bantuanCustomer')}
              </p>
              <Icon
                icon={arrowRight}
                size={24}
                onClick={() => setShowCustomerCare(false)}
              />
            </div>
            <div className="w-[80%] h-auto py-4 flex flex-col">
              <p>{trans(locale, lang, 'apabilaAndaMemerlukan')}</p>
              <div className="w-full h-auto py-4 px-2 border flex flex-row rounded-xl my-4">
                <div className="basis-1/12 grid place-items-center">
                  <Icon className="text-orange-300" icon={phone} size={24} />
                </div>
                <div className="basis-11/12">
                  <p className="ml-2 opacity-80 font-semibold">
                    (+62) 21 2505080
                  </p>
                </div>
              </div>
              <div className="w-full h-auto py-4 px-2 border flex flex-row rounded-xl my-4">
                <div className="basis-1/12 grid place-items-center">
                  <Icon className="text-orange-300" icon={envelope} size={24} />
                </div>
                <div className="basis-11/12">
                  <p className="ml-2 opacity-80 font-semibold">
                    Callcenter@Ifg-life.com
                  </p>
                </div>
              </div>
              <div className="w-full h-auto py-4 px-2 border flex flex-row rounded-xl my-4">
                <div className="basis-1/12 grid place-items-center">
                  <Icon
                    className="text-orange-300"
                    icon={volumeControlPhone}
                    size={24}
                  />
                </div>
                <div className="basis-11/12">
                  <p className="ml-2 opacity-80 font-semibold">
                    (+62) 21 2505080
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  function validateFullName(text) {
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
  }

  const renderModalSuccess = () => {
    return (
      <Modal isOpen={modalSuccess} size="sm" className="relative">
        <div className="relative p-3">
          <img
            src={ShieldBig}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center mx-auto my-3 max-w-[240px]">
            {trans(locale, lang, 'updateDataSukses')}
          </p>
          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setModalSuccess(false);
              getPersonalData();
              setValidFullName(false);
            }}>
            OK!
          </Button>
        </div>
      </Modal>
    );
  };

  const renderTabHeader = () => {
    return (
      <div className="w-full px-[5%] py-3 mb-4 md:w-[70%] mx-auto md:py-5">
        <div className="w-full flex p-1.5 md:p-2 rounded-3xl bg-white border space-x-2 shadow-sm ">
          <div
            onClick={() => setActiveHeaderTab(1)}
            className={`cursor-pointer w-1/2 grid place-items-center py-1.5 md:py-2 rounded-2xl
            ${activeHeaderTab == 1 && ' bg-red-100'}
          `}>
            <p className="text-xs xm:text-sm lg:text-base text-red-400">
              {trans(locale, lang, 'dataAkun')}
            </p>
          </div>
          <div
            onClick={() => setActiveHeaderTab(2)}
            className={`cursor-pointer w-1/2 grid place-items-center py-1.5 md:py-2 rounded-2xl
            ${activeHeaderTab == 2 && ' bg-red-100'}
          `}>
            <p className="text-xs xm:text-sm lg:text-base text-red-400">
              {trans(locale, lang, 'dataKtp')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderDataAkun = () => {
    return (
      <div className="w-full px-[5%] flex flex-col">
        <Input
          className="mb-2 md:mb-3"
          value={newName}
          label={trans(locale, lang, 'namaPanggilan')}
          inputClassName="!text-black !font-bold"
          message={fullNameMessage}
          handleOnChange={(val) => {
            setNewName(val);
            setValidFullName(validateFullName(val));
          }}
        />

        <Input
          className="mb-2 md:mb-3"
          disabled
          disableBgWhite
          inputMode="tel"
          value={userData?.mobilePhoneNumber}
          inputClassName="!text-black !font-bold"
          placeholder={trans(locale, lang, 'placeholderPhone')}
          label={trans(locale, lang, 'nomorHp')}
          suffixIcon={
            <img
              src={PenEdit}
              className="cursor-pointer opacity-40 duration-300 hover:opacity-100"
              onClick={() => {
                setActionOTP(REQUEST_CHANGE_MOBILE_PHONE_NUMBER);
                setShowModalOptionOTP(true);
              }}
            />
          }
        />

        <Input
          className="mb-3 md:mb-5"
          value={userData?.email}
          disabled
          disableBgWhite
          inputMode="email"
          placeholder="e.g someone@example.com"
          label={trans(locale, lang, 'email')}
          inputClassName="!text-black !font-bold"
          suffixIcon={
            <img
              src={PenEdit}
              className="cursor-pointer opacity-40 duration-300 hover:opacity-100"
              onClick={() => {
                setActionOTP(REQUEST_CHANGE_EMAIL);
                setShowModalOptionOTP(true);
              }}
            />
          }
        />

        <div className="mt-5 bg-orange-100 mx-auto rounded-xl w-full px-2 py-3 md:p-4 flex items-center">
          <Icon icon={infoCircle} size={20} className="text-yellow-500" />
          <span className="pl-2 text-[11px] md:text-caption1 font-semibold">
            {trans(locale, lang, 'bottomInfo')}
          </span>
        </div>

        <div className="pt-12 ">
          <Button
            type="linear-gradient"
            shadow
            full
            disabled={!isValidFullName}
            onButtonClick={() => {
              setPersonalData({ name: newName });
            }}>
            {trans(locale, lang, 'updateBtn')}
          </Button>
        </div>
      </div>
    );
  };

  const renderModalCounter = () => {
    return (
      <Modal
        isOpen={isShowModalCounter}
        toggle={() => setIsShowModalCounter(false)}
        className="relative max-w-[375px]"
        mainClassname="z-[60]">
        <div className="relative p-3">
          <Icon
            icon={close}
            size={24}
            className="opacity-20 z-50  cursor-pointer"
            onClick={() => setIsShowModalCounter(false)}
          />
          <img
            src={ClockOTP}
            className="absolute w-48 top-5 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
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
            onButtonClick={() => setIsShowModalCounter(false)}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </div>
      </Modal>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex px-[4%] justify-between border-b-4 w-full text-center">
        <div className="mb-5">
          <Icon
            icon={arrowLeft}
            size={24}
            onClick={() => setActiveOTP(false)}
            className="cursor-pointer
                text-gray-600 hover:text-red-dark-red90"
          />
        </div>
        <p className="text-sm md:text-base font-bold">
          {actionOTP === REQUEST_CHANGE_EMAIL
            ? trans(locale, lang, userData?.email ? 'ubahEmail' : 'tambahEmail')
            : trans(locale, lang, 'ubahPhone')}
        </p>
        <div className="mr-5"></div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-xl md:rounded-3xl h-auto grid place-items-center border">
      {modalNotEditable()}
      {sideModal()}
      {renderModalSuccess()}
      {renderModalCounter()}

      <div className="w-full flex flex-col pt-6 pb-10 md:py-10">
        {!editPhoneActive && !editEmailActive && !activeOTP && (
          <>
            <PersonalDataFoto
              alreadyKYC={alreadyKYC}
              data={getPersonalDataResponse}
            />

            {renderTabHeader()}
            {activeHeaderTab == 1 ? (
              renderDataAkun()
            ) : (
              <PersonalDataKtp
                alreadyKYC={alreadyKYC}
                data={getUserIdentityResponse}
              />
            )}
          </>
        )}

        {editPhoneActive && !activeOTP && (
          <PersonalDataPhone setEditPhoneActive={setEditPhoneActive} />
        )}

        {editEmailActive && !activeOTP && (
          <PersonalDataEmail setEditEmailActive={setEditEmailActive} />
        )}

        {activeOTP && (
          <>
            {renderHeader()}
            <InputOTP
              otpSendTo={otpSendTo}
              onHandleSubmitOTP={setProfileVerifyOtp}
              onHandleRequestOTP={setProfileRequestOtp}
              onHandleRequestOTPClear={setProfileRequestOtpClear}
              requestOTPFailed={setProfileRequestOtpFailed}
              action={actionOTP}
              errorMsg={errorMsgOTP}
              setErrorMsg={setErrorMsgOTP}
            />
          </>
        )}
      </div>

      <ModalOptionOTP
        isOpen={showModalOptionOTP}
        lang={lang}
        toggle={() => setShowModalOptionOTP(false)}
        email={userData?.email}
        number={userData?.mobilePhoneNumber}
        action={actionOTP}
        handleClick={setProfileRequestOtp}
        setOtpSendto={setOtpSendto}
      />
    </div>
  );
}
