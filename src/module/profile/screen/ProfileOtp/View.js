import Image from 'next/image';
import locale from './locale';
import { trans } from '@cp-util/trans';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Otp } from '@cp-config/Images';
import { useInterval } from '@cp-util/common';
import { Alert, Button, Modal } from '@cp-component';
import { BadgeTick, BtnBack, Close, Frame14 } from '@cp-config/Svgs';
import { REQUEST_OTP_SECONDS } from '@cp-util/constant';

const REMAINING_SECONDS = REQUEST_OTP_SECONDS;

export default function Page(props) {
  const {
    lang,
    type,
    phoneNumber,
    email,
    sendBy,
    setOtpValue,
    header,
    onHandleRequestOTP,
    onHandleRequestOTPClear,
    action,
    errorMsg,
  } = props;

  const router = useRouter();
  const inputOtp = useRef(null);
  const [otp, setOtp] = useState('');
  const [messageOtp, setMessageOtp] = useState('');
  const [lapsedTime, setLapsedTime] = useState(REMAINING_SECONDS);
  const [isModalSuccessActive, setModalSuccessActive] = useState(false);

  useInterval(() => {
    if (lapsedTime > 0 && lapsedTime <= REMAINING_SECONDS) {
      setLapsedTime(lapsedTime - 1);
    } else {
      setLapsedTime(0);
    }
  }, 1000);

  // Banner Content
  const renderHeader = () => {
    return (
      <div className="relative h-10 w-full top-0 flex items-center border-b-2">
        <div
          role="button"
          onClick={() => router.back()}
          className="absolute z-10 w-10 h-10 flex justify-center items-center">
          <Image src={BtnBack} width={24} height={24} />
        </div>
        <div className="absolute w-full text-center text-body1 font-bold">
          {trans(locale, lang, 'otp')}
        </div>
      </div>
    );
  };

  const renderMobilePhone = (phone) => {
    const otpSplit = phone?.split('');

    if (typeof +phone === 'number') {
      if (otpSplit?.[0] === 0 || otpSplit?.[0] === '0') {
        otpSplit[0] = '+62';
        return `${otpSplit.join('')}`;
      } else {
        return `+` + phone;
      }
    } else {
      return phone;
    }
  };

  const renderTitleImage = () => {
    return (
      <div className="px-[5%]">
        <img src={Otp} className="h-60 mx-auto" />
        <p className="text-sm pt-5 pb-10 md:text-md text-center max-w-[300px] mx-auto">
          {trans(locale, lang, 'masukkanKodeOtp')}
          {type == 'phone' && trans(locale, lang, 'nomorHp')}
          {type == 'email' && trans(locale, lang, 'email')}
          <span className="font-bold text-red-dark-red90">
            {type == 'phone' && renderMobilePhone(phoneNumber || sendBy)}
            {type == 'email' && (email || sendBy)}
          </span>
        </p>
      </div>
    );
  };

  const renderOtpInput = () => {
    return (
      <div className="relative">
        <div
          className="pb-2"
          onClick={() => {
            if (inputOtp && inputOtp.current) {
              inputOtp.current.blur();
              setTimeout(() => {
                if (inputOtp && inputOtp.current) {
                  inputOtp.current.focus();
                }
              }, 100);
            }
          }}>
          <div className="flex space-x-3 justify-center">
            {Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className={`cursor-pointer duration-400 w-6 s:w-9 h-16 border-b-2 flex justify-center items-center text-neutral-light-neutral90 font-semibold text-h5 hover:border-red-500 md:w-12 ${
                    errorMsg ? 'border-red-500' : ''
                  }`}>
                  {otp[i]}
                </div>
              ))}
          </div>
        </div>
        <input
          id="input-otp"
          className="absolute z-10 w-full h-full pb-4 top-0 bg-transparent left-0 outline-none opacity-0"
          ref={inputOtp}
          type="number"
          value={otp}
          autoComplete="off"
          inputMode="numeric"
          onChange={(e) => {
            e.preventDefault();
            setOtpValue(e.target?.value.replace(/[^0-9]/g, '').substring(0, 6));
            setOtp(e.target?.value.replace(/[^0-9]/g, '').substring(0, 6));
          }}
        />
        {errorMsg ? (
          <p className="text-body2 text-medium font-bold text-primary-light-primary90 px-[8%] text-center">
            {trans(locale, lang, 'otpSalah')}
          </p>
        ) : null}
      </div>
    );
  };

  const renderOtpTime = () => {
    function getRemainingTime() {
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
    }

    return (
      <div className="flex justify-between items-center mt-24">
        <div className="text-body2 font-semibold">{getRemainingTime()}</div>
        <div
          role={lapsedTime == 0 ? 'button' : false}
          onClick={() => onClickResendOtp()}
          className={
            lapsedTime == 0
              ? 'text-body2 font-medium underline text-red-500'
              : 'text-body2 font-medium underline text-mediumGray-light-mediumGray'
          }>
          {trans(locale, lang, 'kirimUlangOtp')}
        </div>
      </div>
    );
  };

  function renderAlertContainer() {
    return <Alert>{trans(locale, lang, 'cekJugaFolder')}</Alert>;
  }

  const onClickResendOtp = () => {
    if (lapsedTime) {
      // console.log({ lapsedTime });
    } else {
      setOtp('');
      onHandleRequestOTPClear();
      onHandleRequestOTP({
        id: email || phoneNumber,
        action,
      });
      setLapsedTime(REMAINING_SECONDS);
    }
  };

  function renderModalSuccess() {
    return (
      <Modal
        isOpen={isModalSuccessActive}
        toggle={() => setModalSuccessActive(false)}>
        <div className="relative w-full flex gap-2 items-center text-start text-body1 font-bold mb-4">
          <div
            role="button"
            className="absolute inset-0"
            onClick={() => setModalSuccessActive(false)}>
            <Image src={Close} width={32} height={32} />
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center mb-6">
            <Image src={BadgeTick} width={146} height={146} />
          </div>
          <div className="text-h6 text-neutral-light-neutral80 font-bold text-center mb-1">
            {trans(locale, lang, 'andaBerhasilTerdaftar')}
          </div>
          <div className="text-body2 text-mediumGray-light-mediumGray font-medium text-center mb-8">
            {trans(locale, lang, 'lanjutKeProses')}
          </div>
          <div className="flex flex-col gap-2">
            <Button bordered="primary-light-primary90" outline shadow full>
              {trans(locale, lang, 'lewati')}
            </Button>
            <Button type="linear-gradient" shadow full>
              {trans(locale, lang, 'verifikasiDataDiri')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <div className="mt-6">
      <div className="px-[5%]">
        {header && renderHeader()}
        {renderTitleImage()}
        {renderOtpInput()}
        {renderOtpTime()}
        {/* {renderAlertContainer()} */}
      </div>
      {/* {renderFooterContainer()} */}
    </div>
  );
}
