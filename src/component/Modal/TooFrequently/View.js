import { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { Modal, Button } from '@cp-component';
import { close } from 'react-icons-kit/ionicons';
import { TimeLogin } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import locale from './locale';

export default function View({
  lang,
  setClose,
  isOpen,
  remainingSeconds,
  title = '',
  subTitle = '',
}) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  // Set seconds and minutes
  useEffect(() => {
    const min = Math.floor(remainingSeconds / 60);
    const sec = remainingSeconds - min * 60;
    setMinutes(min);
    setSeconds(sec);
  }, [remainingSeconds]);

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

  // Clear User Block
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setClose();
    }
  }, [minutes, setClose, seconds]);

  return (
    <Modal size="sm" isOpen={isOpen} toggle={setClose} className="relative">
      <div className="relative md:p-3">
        <Icon
          icon={close}
          size={20}
          className="opacity-20 z-50 cursor-pointer"
          onClick={setClose}
        />
        <img
          src={TimeLogin}
          className="absolute w-32 top-6 xm:w-40 xm:top-9 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
        />
        <p className="pt-10 xm:pt-12 xm:pb-5 font-bold text-center my-3 text-base md:text-xl">
          {title || trans(locale, lang, 'title')}
        </p>
        <p className=" font-medium text-center opacity-60 text-sm md:text-base">
          <span>{subTitle || trans(locale, lang, 'subtitle')}</span>
          <span className="text-red-500 font-bold">
            {' '}
            {showRemainingTime()}{' '}
          </span>
        </p>

        <Button
          className="mt-8 mb-2 text-sm !h-10 md:text-base md:!h-11"
          type="linear-gradient"
          shadow
          full
          onButtonClick={setClose}>
          {trans(locale, lang, 'cobaLagi')}
        </Button>
      </div>
    </Modal>
  );
}
