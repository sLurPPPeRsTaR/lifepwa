import Image from 'next/image';
import { Alert, Button, Container, Modal } from '@cp-component';
import { BadgeTick, BtnBack, Close, Frame14 } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import { useRouter } from 'next/router';
import locale from './locale';
import { useRef, useState } from 'react';
import { useInterval } from '@cp-util/common';
import { REQUEST_OTP_SECONDS } from '@cp-util/constant';

const REMAINING_SECONDS = REQUEST_OTP_SECONDS;

export default function Page({ lang }) {
  const router = useRouter();

  const inputOtp = useRef(null);
  const [otp, setOtp] = useState('');
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
  function renderHeader() {
    return (
      <div className="relative h-14 flex items-center border-b">
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
  }

  function renderImageContainer() {
    return (
      <div className="felx justify-center items-center">
        <Image src={Frame14} width={190} height={190} />
      </div>
    );
  }

  function renderTitleContainer() {
    return (
      <div className="mb-4">
        <div className="text-body2 font-medium text-mediumGray-light-mediumGray">
          {trans(locale, lang, 'masukkanKodeOtp')}
          {/* {trans(
            locale,
            lang,
            regexEmail.test(params?.otpSendTo) ? 'email' : 'nomorHp',
          )} */}
          {/* <Text textStyle="semi" color={Color.primary.light.primary90}>
            {params?.otpSendTo}
          </Text> */}
        </div>
      </div>
    );
  }

  function renderGroupLine() {
    return (
      <div className="relative">
        <div
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
          <div className="flex justify-between gap-1">
            {Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-16 border-2 rounded-lg flex justify-center items-center text-neutral-light-neutral90 font-semibold text-h6">
                  {otp[i]}
                </div>
              ))}
          </div>
        </div>
        <input
          className="absolute z-10 w-full h-full pb-4 top-0 bg-transparent left-0 outline-none opacity-0"
          ref={inputOtp}
          type="number"
          inputMode="numeric"
          value={otp}
          autoComplete="off"
          onChange={(e) => {
            e.preventDefault();
            setOtp(e.target?.value.replace(/[^0-9]/g, '').substring(0, 6));
          }}
        />
      </div>
    );
  }

  function renderOtpTime() {
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
      <div className="flex justify-between items-center mt-6">
        <div className="text-body2 font-semibold">{getRemainingTime()}</div>
        <div
          role="button"
          className="text-body2 font-medium underline text-mediumGray-light-mediumGray">
          {trans(locale, lang, 'kirimUlangOtp')}
        </div>
      </div>
    );
  }

  function renderAlertContainer() {
    return <Alert>{trans(locale, lang, 'cekJugaFolder')}</Alert>;
  }

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
    <>
      <Container fullScreen>
        {renderHeader()}
        <div className="px-6 md:px-24">
          <div className="mt-6 flex flex-col lg:flex-row justify-center items-center gap-4 md:gap-16">
            {renderImageContainer()}
            <div>
              {renderTitleContainer()}
              {renderGroupLine()}
              {renderOtpTime()}
              {renderAlertContainer()}
            </div>
          </div>
          {/* {renderFooterContainer()} */}
        </div>
      </Container>
      {renderModalSuccess()}
    </>
  );
}
