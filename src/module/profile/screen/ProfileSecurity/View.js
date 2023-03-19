import _ from 'lodash';
import moment from 'moment';
import clsx from 'classnames';
import Image from 'next/image';
import Icon from 'react-icons-kit';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, useCallback } from 'react';

import locale from './locale';
import ProfileSecurityPin from '../ProfileSecurityPin';
import ProfileSecurityPassword from '../ProfileSecurityPass';

import { api } from '@cp-bootstrap/bootstrapApi';
import { trans } from '@cp-util/trans';
import { ic_error } from 'react-icons-kit/md';
import { useInterval } from '@cp-util/common';
import { lock, mobilePhone } from 'react-icons-kit/fa';
import { arrowLeft, chevronRight } from 'react-icons-kit/feather';
import {
  API,
  BASE_URL,
  NAVIGATION,
  REQUEST_OTP_SECONDS,
} from '@cp-util/constant';
import { pChat, pWa, pCall, pMail, Email, Warning } from '@cp-config/Svgs';
import {
  Button,
  Input,
  Modal,
  Alert,
  ModalOptionOTP,
  InputOTP,
  CreatePIN,
  InputPIN,
} from '@cp-component';

import {
  Eye1,
  EyeOff1,
  pSetPin,
  pResetPin,
  pPassword,
  pDeleteUser,
  pYourDevice,
} from '@cp-config/Svgs';
import {
  closeRound,
  closeCircled,
  androidArrowBack,
  checkmarkCircled,
  androidRadioButtonOff,
} from 'react-icons-kit/ionicons';
import {
  identityCardSelfieExample,
  securityDelete,
  IconProfileActive,
  ShieldBig,
  Otp,
  Cone,
  Device,
  tooMany,
  ClockOTP,
} from '@cp-config/Images';

import {
  SET_DELETE_ACCOUNT_SUCCESS,
  SET_DELETE_ACCOUNT_FAILED,
} from '@cp-module/auth/authConstant';
import {
  SET_DELETE_ACCOUNT_REQUEST_OTP_FAILED,
  SET_DELETE_ACCOUNT_REQUEST_OTP_SUCCESS,
  SET_DELETE_ACCOUNT_VERIFY_OTP_SUCCESS,
  SET_DELETE_ACCOUNT_VERIFY_OTP_FAILED,
  GET_VERIFY_PIN_SUCCESS,
  GET_VERIFY_PIN_FAILED,
  SET_CREATE_PIN_SUCCESS,
} from '@cp-module/profile/profileConstant';
import { close } from 'react-icons-kit/fa';

const REMAINING_SECONDS = REQUEST_OTP_SECONDS;
const VERIFY_DELETE_ACCOUNT = 'VERIFY_DELETE_ACCOUNT';
const RESET_PIN = 'RESET_PIN';

export default function Page(props) {
  const router = useRouter();
  const {
    lang,
    userData,
    token,
    authAction,
    setActiveTab,

    setUserData,

    profileAction,
    setChangePass,
    setChangePassFailed,
    setChangePassClear,
    setChangePassResponse,

    setCreatePin,
    setCreatePinFailed,
    setCreatePinResponse,

    setChangePinResponse,
    getVerifyPin,
    getVerifyPinClear,
    getVerifyPinResponse,
    getVerifyPinFailed,

    setDeleteAccount,
    getProfileDevice,
    setProfileDevice,
    getProfileDeviceResponse,
    setProfileDeviceResponse,
    setProfileDeviceFailed,

    setProfileRequestOtp,
    setProfileRequestOtpFailed,
    setProfileRequestOtpResponse,

    setDeleteAccountRequestOtp,
    setDeleteAccountRequestOtpClear,
    setDeleteAccountRequestOtpFailed,
    setDeleteAccountRequestOtpResponse,
    setDeleteAccountVerifyOtp,
    setDeleteAccountVerifyOtpClear,
    setDeleteAccountVerifyOtpFailed,
    setDeleteAccountVerifyOtpParam,

    getBajoRunStep,
    setClearAuth,
    setLoginClear,
    getPoliciesClear,

    setFromTabProps,

    setAvailableOnMobile,
  } = props;

  const [user, setUser] = useState();
  const [activeTabSecurity, setActiveTabSecurity] = useState('');
  const [activeTitle, setActiveTitle] = useState('');
  const [activeArrowBack, setActiveArrowBack] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalSuccessTitle, setModalSuccessTitle] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const [isValidNewPassword, setValidNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const [confirmDeleteSuccess, setConfirmDeleteSuccess] = useState();
  const [oldPassWrong, setOldPassWrong] = useState(false);
  const [newPassWrong, setNewPassWrong] = useState(false);

  //pin
  const [pin, setPin] = useState('');
  const [pinShow, setPinShow] = useState(false);
  const [pinValid, setPinValid] = useState(false);
  const [pinConfirmation, setPinConfirmation] = useState('');
  const [pinConfirmationShow, setPinConfirmationShow] = useState(false);
  const [requestOtpPin, setRequestOtpPin] = useState(false);
  const [selectRequestOtpPin, setSelectRequestOtpPin] = useState(false);

  // device
  const inputOtp = useRef(null);
  const [otp, setOtp] = useState('');
  const [devices, setDevices] = useState([]);
  const [detailDevice, setDetailDevice] = useState(false);
  const [showDetailDevice, setShowDetailDevice] = useState(false);
  const [confirmDeleteDevices, setConfirmDeleteDevices] = useState(false);

  // delete account
  const [countdown, setCountdown] = useState(10);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [customerCare, setCustomerCare] = useState();
  const [featureNotAvailable, setFeatureNotAvailable] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // otp
  const [activeOTP, setActiveOTP] = useState(false);
  const [actionOTP, setActionOTP] = useState(false);
  const [otpSendTo, setOtpSendto] = useState(false);
  const [errorMsgOTP, setErrorMsgOTP] = useState(false);

  // pin
  const [activeInputPIN, setActiveInputPIN] = useState(false);
  const [deleteAccountType, setDeleteAccountType] = useState('');
  const [actionPIN, setActionPIN] = useState(false);
  const [errorInputPIN, seterrorInputPIN] = useState(false);
  const [errorMsgInputPIN, seterrorMsgInputPIN] = useState(false);
  const [activeCreatePIN, setactiveCreatePIN] = useState(false);
  const [errorMsgCreatePIN, setErrorMsgCreatePIN] = useState(false);
  const [flagResetPin, setFlagResetPin] = useState(false);

  const [newListTabMenu, setNewListTabMenu] = useState([]);
  const listTabMenu = [
    { key: 0, title: trans(locale, lang, 'ubahSandi'), icon: pPassword },
    {
      key: 1,
      title: userData?.alreadySetPin
        ? trans(locale, lang, 'pinChange')
        : trans(locale, lang, 'pinCreate'),
      icon: pSetPin,
    },
    { key: 2, title: trans(locale, lang, 'resetPin'), icon: pResetPin },
    { key: 3, title: trans(locale, lang, 'deviceAnda'), icon: pYourDevice },
    { key: 4, title: trans(locale, lang, 'hapusAkun'), icon: pDeleteUser },
  ];

  const listRequestOtp = [
    { key: 1, via: user?.email, icon: pMail, subtitle: 'email' },
    {
      key: 2,
      via: user?.mobilePhoneNumber,
      icon: pCall,
      subtitle: trans(locale, lang, 'nomorHp'),
    },
    {
      key: 3,
      via: user?.mobilePhoneNumber,
      icon: pWa,
      subtitle: trans(locale, lang, 'nomorHp'),
    },
  ];

  const [lapsedTime, setLapsedTime] = useState(2);

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

  const setHandleChangePass = () => {
    setChangePass({
      oldPassword: oldPassword,
      newPassword: newPassword,
      newPasswordConfirmation: confirmPassword,
    });
  };

  const renderTabChangePass = () => {
    return (
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
              type={oldPasswordVisibility ? 'text' : 'password'}
              value={oldPassword}
              label={trans(locale, lang, 'passLama')}
              placeholder={trans(locale, lang, 'placeholderPassLama')}
              suffixIcon={
                <div
                  role="button"
                  onClick={() =>
                    setOldPasswordVisibility(!oldPasswordVisibility)
                  }
                  className="flex items-center">
                  <Image
                    src={oldPasswordVisibility ? Eye1 : EyeOff1}
                    width={24}
                    height={24}
                  />
                </div>
              }
              handleOnChange={(val) => {
                setOldPassword(val);
              }}
            />
            {oldPassWrong && (
              <p className="text-xs mb-4 text-red-500">
                {trans(locale, lang, 'oldPassWrong')}
              </p>
            )}
          </div>

          <div className="mt-4 mb-2">
            <Input
              type={newPasswordVisibility ? 'text' : 'password'}
              value={newPassword}
              label={trans(locale, lang, 'passBaru')}
              placeholder={trans(locale, lang, 'placeholderPassBaru')}
              suffixIcon={
                <div
                  role="button"
                  onClick={() =>
                    setNewPasswordVisibility(!newPasswordVisibility)
                  }
                  className="flex items-center">
                  <Image
                    src={newPasswordVisibility ? Eye1 : EyeOff1}
                    width={24}
                    height={24}
                  />
                </div>
              }
              handleOnChange={(val) => {
                setNewPassword(val);

                if (/\d/.test(val)) {
                  if (/[A-Z]/.test(val)) {
                    setValidNewPassword(true);
                  } else {
                    setValidNewPassword(false);
                  }
                } else {
                  setValidNewPassword(false);
                }
              }}
            />
          </div>
          {newPassword.length != 0 && !isValidNewPassword && (
            <p className="text-red-500 text-xs mb-4">
              {trans(locale, lang, 'sandiHarusTerdiri')}
            </p>
          )}
          {newPassWrong && (
            <p className="text-xs mb-4 text-red-500">
              {trans(locale, lang, 'oldPassAlreadyUsed')}
            </p>
          )}

          <div className="mt-4 mb-2">
            <Input
              type={confirmPasswordVisibility ? 'text' : 'password'}
              value={confirmPassword}
              label={trans(locale, lang, 'confirmPassBaru')}
              placeholder={trans(locale, lang, 'placeholderConfirmPassBaru')}
              suffixIcon={
                <div
                  role="button"
                  onClick={() =>
                    setConfirmPasswordVisibility(!confirmPasswordVisibility)
                  }
                  className="flex items-center">
                  <Image
                    src={confirmPasswordVisibility ? Eye1 : EyeOff1}
                    width={24}
                    height={24}
                  />
                </div>
              }
              handleOnChange={(val) => {
                setConfirmPassword(val);
              }}
            />
          </div>
          {confirmPassword.length != 0 && confirmPassword != newPassword && (
            <p className="text-xs mb-4 text-red-500">
              {trans(locale, lang, 'sandiHarusSama')}
            </p>
          )}
        </div>

        <Button
          className="mt-12"
          type="linear-gradient"
          shadow
          full
          disabled={
            oldPassword.length > 0 &&
            newPassword.length > 0 &&
            confirmPassword == newPassword &&
            newPassword != oldPassword
              ? false
              : true
          }
          onButtonClick={setHandleChangePass}>
          {trans(locale, lang, 'simpan')}
        </Button>
      </div>
    );
  };

  const setHandleRequestOtpPin = () => {
    setProfileRequestOtp({
      id: listRequestOtp[selectRequestOtpPin - 1]?.via,
      action: 'REQUEST_OTP',
    });

    if (setProfileRequestOtpFailed?.message == '') {
      setRequestOtpPin(false);
    }
  };

  const modalRequestOtpPin = () => {
    return (
      <Modal isOpen={requestOtpPin} size="md">
        <div className="px-3">
          <div className="flex mb-10 items-center justify-between">
            <Icon
              icon={closeRound}
              size={18}
              className="cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => setRequestOtpPin(false)}
            />
            <p className="font-bold text-center ml-5 text-sm md:text-base">
              {trans(locale, lang, 'lupaPin')}
            </p>
            <div className="w-6"></div>
          </div>

          <p className="text-base font-bold py-2">
            {trans(locale, lang, 'pinConfirmPlc')}
          </p>
          <p className="text-sm w-full md:w-[60%]">
            {trans(locale, lang, 'modalOtpSubtitle')}
          </p>
          <div className="divide-y pt-4">
            {listRequestOtp.map(
              (val) =>
                val.via?.length > 0 && (
                  <div
                    key={val.key}
                    onClick={() => setSelectRequestOtpPin(val.key)}
                    className={`cursor-pointer px-3 py-4 my-3 flex justify-between items-center rounded-md duration-400 hover:bg-red-light-red20 ${
                      selectRequestOtpPin == val.key && 'bg-red-light-red20'
                    }`}>
                    <div className="flex items-center">
                      <img src={val.icon} className="h-5" />
                      <p className="pl-3">{val.via}</p>
                    </div>
                    <Icon
                      icon={
                        selectRequestOtpPin == val.key
                          ? checkmarkCircled
                          : androidRadioButtonOff
                      }
                      size={22}
                      className={
                        selectRequestOtpPin == val.key
                          ? 'text-red-dark-red90'
                          : 'text-gray-400'
                      }
                    />
                  </div>
                ),
            )}
          </div>

          <Button
            className="mt-20"
            type="linear-gradient"
            shadow
            full
            disabled={selectRequestOtpPin ? false : true}
            onButtonClick={setHandleRequestOtpPin}>
            {trans(locale, lang, 'pilihVerifikasi')}
          </Button>
        </div>
      </Modal>
    );
  };

  // device
  const setHandleGetDevices = () => {
    getProfileDevice();
  };

  const setHandleDetailDevice = (key) => {
    setShowDetailDevice(true);
    devices?.map((item) => {
      if (item.sessionId == key) {
        setDetailDevice(item);
      }
    });
  };

  const setHandleDeleteDevice = (key) => {
    setProfileDevice({ sessionId: key?.sessionId });

    if (setProfileDeviceResponse) {
      setHandleGetDevices();
      setShowDetailDevice(false);
      setConfirmDeleteDevices(false);
      setModalSuccess(true);
      setModalSuccessTitle(trans(locale, lang, 'deviceSukses'));
    }
  };

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  useEffect(() => {
    const data = getProfileDeviceResponse?.data?.sessionList || [];
    setDevices(data);
  }, [getProfileDeviceResponse]);

  // get thumbnail image
  const [photoProfile, setPhotoProfile] = useState('');
  useEffect(() => {
    if (userData?.thumbnailPhotoKey) {
      api
        .get(
          `${BASE_URL}${API.USER.photoThumbnail}/${userData?.thumbnailPhotoKey}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
          },
        )
        .then((res) => {
          const img = new File([res.data], 'photoProfile');

          setPhotoProfile(URL.createObjectURL(img));
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [userData.thumbnailPhotoKey]);

  const renderTabDevice = () => {
    return (
      <div className="bg-white w-[95%] mx-auto divide-y pt-12 pb-20">
        <div className="divide-y max-h-[80vh] overflow-auto">
          {devices?.length < 1 && (
            <p className="pt-32 pb-20 text-center text-base md:text-lg">
              {trans(locale, lang, 'deviceNull')}
            </p>
          )}
          {devices?.map((val, idx) => (
            <div
              key={idx}
              onClick={() => {
                setHandleDetailDevice(val.sessionId);
                setSelectedDevice(val);
              }}
              className="py-2 w-full group cursor-pointer">
              <div className="flex-row py-3 px-2 flex duration-300 rounded-md hover:bg-red-light-red20 ">
                <div className="basis-1/12 grid place-items-center">
                  <Icon
                    icon={mobilePhone}
                    size={24}
                    className="bg-[#FFEDCF] p-2 text-[#F59D0F] rounded-md"
                  />
                </div>
                <div className="basis-10/12 flex flex-col ml-3">
                  <p className="font-bold pb-1 my-auto text-xs md:text-sm ">
                    {val.deviceLocation}
                  </p>
                  <p className="pt-1 pb-2 font-bold my-auto text-xs md:text-sm text-gray-400">
                    [{val.sessionId}]
                  </p>
                  <p className="font-bold my-auto text-xs md:text-sm">
                    <span
                      className={`text-gray-500"
                    ${
                      val?.deviceId === userData?.deviceId
                        ? 'text-green-500'
                        : 'text-gray-700'
                    }`}>
                      {val?.deviceId === userData?.deviceId &&
                      val?.isCurrentDevice
                        ? trans(locale, lang, 'aktif')
                        : _.startCase(val.lastLogin)}
                    </span>
                    <span className="px-2">-</span>
                    <span className="text-gray-600">{val.deviceName}</span>
                  </p>
                </div>
                <div className="basis-1/12 grid place-items-center">
                  <Icon
                    icon={chevronRight}
                    size={24}
                    className="text-gray-400 group-hover:text-red-dark-red90"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderModalDetailDevice = () => {
    return (
      <Modal isOpen={showDetailDevice} size="md">
        <div className="flex flex-col p-3">
          <div className="flex flex-row mb-10 items-center">
            <Icon
              icon={closeRound}
              size={18}
              className="cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => setShowDetailDevice(false)}
            />
            <p className="font-bold text-center ml-5 text-base md:text-lg">
              {trans(locale, lang, 'infoDevice')}
            </p>
          </div>
          <p className="text-caption1 font-semibold mb-1 opacity-70">
            {trans(locale, lang, 'namaDevice')}
          </p>
          <div className="w-full p-2 border-b">
            <p className="text-sm md:text-base font-semibold mb-1 text-gray-700">
              {detailDevice.deviceName}
            </p>
          </div>
          <p className="text-caption1 font-semibold mb-1 opacity-70 mt-5">
            {trans(locale, lang, 'sessionId')}
          </p>
          <div className="w-full p-2 border-b-2">
            <p className="text-sm md:text-base font-semibold mb-1 text-gray-700">
              {detailDevice.sessionId} (Backend Loc)
            </p>
          </div>
          <p className="text-caption1 font-semibold mb-1 opacity-70 mt-5">
            {trans(locale, lang, 'status')}
          </p>
          <div className="w-full p-2 border-b-2">
            <p
              className={`text-sm md:text-base font-semibold mb-1  ${
                detailDevice.lastLogin == 'active'
                  ? 'text-green-500'
                  : 'text-gray-700'
              }`}>
              {_.startCase(detailDevice.lastLogin)}
            </p>
          </div>
          <Button
            className="mt-10"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setConfirmDeleteDevices(true);
              setShowDetailDevice(false);
            }}>
            {trans(locale, lang, 'hapusSesi')}
          </Button>
        </div>
      </Modal>
    );
  };

  const renderModalConfirmDeleteDevice = () => {
    return (
      <Modal isOpen={confirmDeleteDevices} size="sm" className="relative">
        <div className="relative p-3">
          <img
            src={Device}
            className="absolute w-80 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[60%]"
          />
          <p className="pt-20 text-xl font-bold text-center mx-auto my-3 max-w-[240px]">
            {trans(locale, lang, 'titlePopupConfirm')}
          </p>
          <p className="text-sm text-center">
            {trans(locale, lang, 'subTitlePopupConfirm')}
          </p>
          <Button
            className="mt-8"
            full
            shadow
            outline
            onButtonClick={() => {
              setConfirmDeleteDevices(false);
              setShowDetailDevice(true);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            className="mt-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => setHandleDeleteDevice(detailDevice)}>
            {trans(locale, lang, 'hapusPerangkat')}
          </Button>
        </div>
      </Modal>
    );
  };

  // delete account
  useInterval(() => {
    if (countdown >= 1) {
      setCountdown(countdown - 1);
    } else {
      setCountdown(0);
    }
  }, 1000);

  const renderTabDelete = () => {
    return (
      <div className="bg-white w-[85%] mx-auto py-2">
        <div className="py-4 lg:p-9">
          <div
            className={clsx(
              'w-[105px] h-[105px] rounded-full overflow-hidden border-white border-4 grid place-items-center mb-6 md:mb-8 mx-auto',
              userData?.thumbnailPhotoKey ? '' : 'bg-red-100',
            )}>
            <img
              src={
                userData?.thumbnailPhotoKey ? photoProfile : IconProfileActive
              }
              className={
                userData?.thumbnailPhotoKey ? 'w-full h-full object-cover' : ''
              }
            />
          </div>
          <p className="text-base text-center md:text-lg font-bold pb-7 md:pb-10">
            {trans(locale, lang, 'hapusMainTitle')}
          </p>
          <div className="flex items-start pb-1 md:pb-5">
            <img src={Email} />
            <div className="pl-2 md:pl-6">
              <p className="text-base font-bold">
                {trans(locale, lang, 'hapusTitle1')}
              </p>
              <p className="text-sm py-2">
                {trans(locale, lang, 'hapusContent1')}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <img src={Warning} />
            <div className="pl-2 md:pl-6">
              <p className="text-base font-bold">
                {trans(locale, lang, 'hapusTitle2')}
              </p>
              <p className="text-sm py-2">
                {trans(locale, lang, 'hapusContent2')}
              </p>
            </div>
          </div>
        </div>
        <Button
          className="mt-10 mb-6"
          type="linear-gradient"
          shadow
          full
          onButtonClick={() => {
            setConfirmDelete(true), setCountdown(10);
          }}>
          {trans(locale, lang, 'hapusAkun')}
        </Button>
      </div>
    );
  };

  const setDeleteAccountResult = useCallback(
    (act) => {
      if (act === SET_DELETE_ACCOUNT_SUCCESS) {
        // router.push('/');
      }
      if (act === SET_DELETE_ACCOUNT_FAILED) {
        // toast.error('failed');
      }
    },
    [router],
  );

  useEffect(() => {
    setDeleteAccountResult(authAction);
  }, [authAction, setDeleteAccountResult]);

  const setHandleConfirmDelete = () => {
    if (userData?.alreadyKYC) {
      setConfirmDelete(false);
      setActionOTP(VERIFY_DELETE_ACCOUNT);
      setShowModalOptionOTP(true);
    } else {
      setDeleteAccount();
      router.push('/');
    }
    // if (deleteAccountType === 'PIN') {
    //   setActiveInputPIN(true);
    //   setConfirmDelete(false);
    //   setDeleteAccountType('');
    // } else {
    //   setDeleteAccount();
    //   router.push('/');
    //   // setModalSuccess(true);
    // }
  };

  const modalConfirmDelete = () => {
    return (
      <Modal isOpen={confirmDelete} className="relative max-w-[600px]">
        <div className="relative p-3">
          <img
            src={securityDelete}
            className="absolute w-48 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center my-3">
            {trans(locale, lang, 'hapusConfirmTitle')}
          </p>
          <p className="text-base font-medium text-center opacity-50">
            {trans(locale, lang, 'hapusConfirmSubtitle')}
          </p>
          <Button
            className="mt-8"
            outline
            shadow
            full
            onButtonClick={() => setConfirmDelete(false)}>
            {trans(locale, lang, 'hapusConfirmButtonNo')}
          </Button>
          <Button
            className="mt-5"
            type="linear-gradient"
            shadow
            full
            disabled={countdown == 0 ? false : true}
            onButtonClick={setHandleConfirmDelete}>
            {trans(locale, lang, 'hapusConfirmButtonYes')}{' '}
            {!!countdown && `(${countdown})`}
          </Button>
        </div>
      </Modal>
    );
  };

  const setHandleTabMenu = (key) => {
    setActiveTabSecurity(key);
    setActiveTitle(listTabMenu[key].title);

    if (key !== 4) {
      setActiveArrowBack(true);
    }
  };

  const setHandleArrowBack = (key) => {
    setDeleteAccountRequestOtpClear();
    setDeleteAccountType('');
    setActiveOTP(false);
    setActiveInputPIN(false);
    setactiveCreatePIN(false);
    setActiveTabSecurity('');
    setActiveArrowBack(false);
    setActiveTitle(trans(locale, lang, 'keamanan'));
  };

  const handlePin = (val) => {
    if (!userData?.alreadyKYC && !userData?.alreadySetPin) {
      return router.push(NAVIGATION.KYC.KycMain);
    }

    if (userData?.alreadyKYC && !userData?.alreadySetPin) {
      // return router.push(NAVIGATION.KYC.KycCreatePin);
      setactiveCreatePIN(true);
      setHandleTabMenu(val.key);
    }

    if (userData?.alreadySetPin) {
      // return router.push(NAVIGATION.KYC.KycCreatePin);
      setActiveInputPIN(true);
      setHandleTabMenu(val.key);
    }
  };

  const handleResetPin = (val) => {
    setHandleTabMenu(val.key);
    setActionOTP(RESET_PIN);
    // setActiveInputPIN(true);
    setFlagResetPin(true);
    setDeleteAccountType('PIN');
    setShowModalOptionOTP(true);
  };

  const handleDeleteAccount = (val) => {
    if (!userData?.alreadyKYC) {
      setActionOTP(VERIFY_DELETE_ACCOUNT);
      setShowModalOptionOTP(true);
      setHandleTabMenu(val.key);
    } else {
      setActiveArrowBack(true);
      setActiveTabSecurity(4);
    }
  };

  const handleListTabMenu = () => {
    if (userData?.alreadyKYC) {
      setNewListTabMenu(listTabMenu);
    } else {
      const list = listTabMenu.filter((e) => e.key !== 2);
      setNewListTabMenu(list);
    }
  };

  useEffect(() => {
    handleListTabMenu();
  }, [userData?.alreadyKYC]);

  useEffect(() => {
    setOldPassWrong(false);
    setNewPassWrong(false);
    setModalSuccess(false);
    setChangePassClear();
    setUser(userData);
    setHandleGetDevices();
    setActiveTitle(trans(locale, lang, 'keamanan'));
  }, []);

  useEffect(() => {
    setOldPassWrong(false);
  }, [oldPassword]);

  useEffect(() => {
    setNewPassWrong(false);
  }, [newPassword]);

  const renderTabMenu = () => {
    return (
      <div className="bg-white w-[85%] mx-auto divide-y pt-10 pb-20">
        {newListTabMenu.map((val) => {
          if (val.key === 0 && userData?.authType !== 'CONVENTIONAL') {
            return null;
          }
          return (
            <div
              key={val.key}
              onClick={() => {
                if (val.key === 1) {
                  return handlePin(val);
                }
                if (val?.key === 2) {
                  return handleResetPin(val);
                }
                if (val.key === 4) {
                  return handleDeleteAccount(val);
                }
                setHandleTabMenu(val.key);
                setOldPassWrong(false);
                setNewPassWrong(false);
                setOldPassword('');
                setOldPasswordVisibility(false);
                setNewPassword('');
                setNewPasswordVisibility(false);
                setConfirmPassword('');
                setConfirmPasswordVisibility(false);
              }}
              className="xs:py-2 md:py-3">
              <div className="group cursor-pointer hover:bg-red-light-red20">
                <div className="flex items-center xs:py-2 md:py-3">
                  <img src={val.icon} className="mx-3 xs:w-8 md:w-10" />
                  <div className="flex justify-between items-center w-full">
                    <p className="xs:pl-3 md:pl-8 xs:text-sm md:text-base">
                      {val.title}
                    </p>
                    <Icon
                      icon={chevronRight}
                      size={24}
                      className="pr-3 text-mediumGray-light-mediumGray opacity-70 group-hover:text-red-dark-red90"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const setHandleModalSuccess = (key) => {
    setModalSuccess(false);
    // setHandleEmptyFieldPass();
    if (key?.deviceId === userData?.deviceId && key?.isCurrentDevice) {
      router.push(NAVIGATION.LOGIN.Login);
    }

    if (modalSuccessTitle === trans(locale, lang, 'ubahPassSukses')) {
      getBajoRunStep({ isBajoRunProgress: false });
      setClearAuth();
      setLoginClear();
      getPoliciesClear();

      setTimeout(() => {
        router.push('/');
      }, 150);
      return;
    }

    setSelectedDevice(null);
    setHandleGetDevices();
  };

  const renderModalSuccess = () => {
    return (
      <Modal isOpen={modalSuccess} className="relative" size="sm">
        <div className="relative p-3">
          <img
            src={ShieldBig}
            className="absolute w-32 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
          />
          <p className="pt-12 text-xl font-bold text-center mx-auto my-3 max-w-[360px]">
            {trans(locale, lang, modalSuccessTitle)}
          </p>
          <Button
            className="mt-8"
            type="linear-gradient"
            shadow
            full
            onButtonClick={setHandleModalSuccess}>
            OK!
          </Button>
        </div>
      </Modal>
    );
  };

  // not available
  const modalCustomerCare = () => {
    return (
      <Modal isOpen={customerCare} size="md">
        <div className="flex justify-between pb-5 pt-2 p-2 md:px-5">
          <Icon
            icon={androidArrowBack}
            size={24}
            className="cursor-pointer"
            onClick={() => setCustomerCare(false)}
          />
          <p className="text-base md:text-lg font-bold">
            {trans(locale, lang, 'bantuanCustomer')}
          </p>
        </div>
        <p className="text-center px-2 md:px-[15%] text-sm pb-2 pt-5">
          {trans(locale, lang, 'apabilaAndaMemerlukan')}
        </p>
        <div className="w-[90%] mx-auto pb-10 py-5 divide-y">
          <div className="flex items-center">
            <img src={pMail} className="text-orange-300" />
            <p className="text-sm pl-4 py-5">Callcenter@Ifg-life.com</p>
          </div>
          <div className="flex items-center">
            <img src={pCall} className="text-orange-300" />
            <p className="text-sm pl-4 py-5">(+62) 21 2505080</p>
          </div>
          <div className="flex items-center">
            <img src={pChat} className="text-orange-300" />
            <p className="text-sm pl-4 py-5">(+62) 21 2505080</p>
          </div>
        </div>
      </Modal>
    );
  };

  const modalFeatureNotAvailable = () => {
    return (
      <Modal isOpen={featureNotAvailable} className="max-w-[400px]">
        <div className="flex flex-col">
          <Icon
            icon={closeRound}
            size={24}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={() => setFeatureNotAvailable(false)}
          />
          <img src={Cone} className="w-80 mx-auto" />
          <p className="px-3 py-3 text-lg font-bold text-center">
            {trans(locale, lang, 'maafUntukSekarang')}
          </p>
          <p className="text-sm text-center text-gray-500">
            {trans(locale, lang, 'melakukanPerubahan')}
          </p>
          <Button
            className="mt-10"
            outline
            shadow
            full
            onButtonClick={() => setFeatureNotAvailable(false)}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            className="my-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setFeatureNotAvailable(false);
              setCustomerCare(true);
            }}>
            {trans(locale, lang, 'hubungiCustomer')}
          </Button>
        </div>
      </Modal>
    );
  };

  // request OTP
  const [showModalOptionOTP, setShowModalOptionOTP] = useState(false);

  useEffect(() => {
    setProfileSecurityResult(profileAction);
  }, [profileAction, setProfileSecurityResult]);

  const setProfileSecurityResult = useCallback(
    (action) => {
      if (action === SET_CREATE_PIN_SUCCESS) {
        setUserData({
          userData: {
            alreadySetPin: true,
            alreadySetMPin: true,
          },
        });
      }
      if (action === SET_DELETE_ACCOUNT_REQUEST_OTP_SUCCESS) {
        setActiveOTP(true);
        setActiveArrowBack(true);
        setShowModalOptionOTP(false);
        setDeleteAccountRequestOtpClear();
      }
      if (action === SET_DELETE_ACCOUNT_REQUEST_OTP_FAILED) {
        // setShowModalOptionOTP(false);
        setDeleteAccountRequestOtpClear();
        if (
          setDeleteAccountRequestOtpFailed?.message !== 'INTERNAL_SERVER_ERROR'
        ) {
          if (
            setDeleteAccountRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')
          ) {
            const timeRemaining =
              setDeleteAccountRequestOtpFailed?.message?.replace(
                'TOO_FREQUENTLY_',
                '',
              );
            setLapsedTime(+timeRemaining);
            setIsShowModalCounter(true);
            return;
          } else {
            toast.error('Error', setDeleteAccountRequestOtpFailed?.message);
          }
        }
      }

      if (action === SET_DELETE_ACCOUNT_VERIFY_OTP_SUCCESS) {
        setActiveOTP(false);
        setDeleteAccountVerifyOtpClear();
        if (deleteAccountType === 'PIN') {
          setUserData({
            userData: {
              alreadySetPin: false,
            },
          });
          setActiveTitle(trans(locale, lang, 'pinCreate'));
          setDeleteAccountType('');
          setactiveCreatePIN(true);
        }
        if (
          setDeleteAccountVerifyOtpParam?.action === 'VERIFY_DELETE_ACCOUNT'
        ) {
          setDeleteAccount();
          router.push('/');
        }
      }
      if (action === SET_DELETE_ACCOUNT_VERIFY_OTP_FAILED) {
        setDeleteAccountVerifyOtpClear();
        if (
          setDeleteAccountVerifyOtpFailed?.message !== 'INTERNAL_SERVER_ERROR'
        ) {
          if (setDeleteAccountVerifyOtpFailed?.message === 'WRONG_OTP') {
            setErrorMsgOTP(true);
            return;
          }
          toast.error(setDeleteAccountVerifyOtpFailed?.message);
        }
      }

      if (action === GET_VERIFY_PIN_SUCCESS) {
        if (actionOTP === RESET_PIN) {
          setUserData({
            userData: {
              alreadySetPin: false,
            },
          });
        }

        getVerifyPinClear();
        if (activeTabSecurity === 4) {
          setHandleConfirmDelete();
        }
        if (activeTabSecurity === 1 || activeTabSecurity === 2) {
          setActiveInputPIN(false);
        }
      }

      if (action === GET_VERIFY_PIN_FAILED) {
        if (getVerifyPinFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (getVerifyPinFailed?.message) {
            seterrorInputPIN(true);
            seterrorMsgInputPIN(getVerifyPinFailed?.message);
            setTimeout(function () {
              seterrorMsgInputPIN('');
            }, 2000);
          } else {
            toast.error(getVerifyPinFailed?.message);
          }
        }
        getVerifyPinClear();
      }
    },
    [
      setDeleteAccountRequestOtpClear,
      setDeleteAccountRequestOtpFailed?.message,
      setDeleteAccountVerifyOtpClear,
      setDeleteAccountVerifyOtpFailed?.message,
      getVerifyPinClear,
      getVerifyPinFailed?.message,
      setHandleConfirmDelete,
      activeTabSecurity,
      deleteAccountType,
    ],
  );

  const [isShowModalCounter, setIsShowModalCounter] = useState(false);

  // useInterval(() => {
  //   if (lapsedTime > 0) {
  //     setLapsedTime(lapsedTime - 1);
  //   } else {
  //     setLapsedTime(0);
  //     setDeleteAccountRequestOtpClear();
  //     setIsShowModalCounter(false);
  //   }
  // }, 1000);

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
            onButtonClick={() => setIsShowModalCounter(false)}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="relative w-full bg-white md:rounded-3xl xs:min-h-[50vh] border xs:mb-5 md:mb-0">
      <div className="flex justify-between border-b-4 py-6 w-full text-center">
        <div className="w-12">
          {activeArrowBack && (
            <Icon
              icon={arrowLeft}
              size={24}
              onClick={() => {
                setHandleArrowBack();
                setOldPassword('');
                setOldPasswordVisibility(false);
                setNewPassword('');
                setNewPasswordVisibility(false);
                setConfirmPassword('');
                setConfirmPasswordVisibility(false);
              }}
              className="ml-5 px-2 cursor-pointer text-gray-600 hover:text-red-dark-red90"
            />
          )}
        </div>
        <p className="text-sm md:text-base font-bold">{activeTitle}</p>
        <div className="w-12"></div>
      </div>

      <div className="w-full">
        {!activeArrowBack && !activeCreatePIN && renderTabMenu()}
        {/* {activeArrowBack && activeTabSecurity == 0 && renderTabChangePass()} */}
        {activeArrowBack &&
          activeTabSecurity == 0 &&
          !showModalOptionOTP &&
          !activeOTP && <ProfileSecurityPassword />}
        {activeArrowBack && activeTabSecurity == 3 && renderTabDevice()}
        {activeArrowBack &&
          activeTabSecurity == 1 &&
          !activeInputPIN &&
          !activeCreatePIN &&
          !activeOTP && (
            <ProfileSecurityPin handleSuccess={setHandleArrowBack} />
          )}
        {activeArrowBack &&
          activeTabSecurity == 4 &&
          !showModalOptionOTP &&
          !activeOTP &&
          !activeInputPIN &&
          renderTabDelete()}
        {activeOTP && (
          <InputOTP
            otpSendTo={otpSendTo}
            onHandleSubmitOTP={setDeleteAccountVerifyOtp}
            onHandleRequestOTP={setDeleteAccountRequestOtp}
            onHandleRequestOTPClear={setDeleteAccountRequestOtpClear}
            requestOTPFailed={setDeleteAccountRequestOtpFailed}
            action={actionOTP}
            errorMsg={errorMsgOTP}
            setErrorMsg={setErrorMsgOTP}
          />
        )}
        {activeInputPIN && !activeOTP && !activeCreatePIN && (
          <InputPIN
            onHandleSubmitPIN={getVerifyPin}
            onHandleForgotPIN={() => {
              setDeleteAccountType('PIN');
              setActionOTP(RESET_PIN);
              setShowModalOptionOTP(true);
            }}
            onHandleSubmitPINClear={setDeleteAccountRequestOtpClear}
            submitPINFailed={setDeleteAccountRequestOtpFailed}
            errorMsg={errorInputPIN}
            setErrorMsg={seterrorInputPIN}
            message={errorMsgInputPIN}
          />
        )}
        {activeCreatePIN && (
          <CreatePIN
            setActive={
              activeTitle === trans(locale, lang, 'pinCreate')
                ? (bool) => {
                    setactiveCreatePIN(bool);
                    setHandleArrowBack();
                  }
                : setactiveCreatePIN
            }
          />
        )}
      </div>

      {modalCustomerCare()}
      {modalFeatureNotAvailable()}
      {renderModalSuccess()}
      {modalConfirmDelete()}
      {renderModalDetailDevice()}
      {modalRequestOtpPin()}
      {renderModalConfirmDeleteDevice()}
      {renderModalCounter()}

      <ModalOptionOTP
        isOpen={showModalOptionOTP}
        lang={lang}
        toggle={() => {
          setShowModalOptionOTP(false);
          flagResetPin && setHandleArrowBack();
        }}
        email={userData?.email}
        number={userData?.mobilePhoneNumber}
        action={actionOTP}
        handleClick={setDeleteAccountRequestOtp}
        setOtpSendto={setOtpSendto}
      />
    </div>
  );
}
