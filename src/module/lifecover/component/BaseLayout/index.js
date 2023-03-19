import { DefaultBackground, VectorBackground } from '@cp-config/Images';
import clsx from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import Icon from 'react-icons-kit';
import { ic_west } from 'react-icons-kit/md';
import ProgressBar from '../ProgressBar';
import Container from './Container';
import Footer from './Footer';

const BaseLayout = ({
  title = 'Konfirmasi',
  variant = 'default', // 'card-on-desktop' | 'default'
  children,
  headerFixed = false,
  showMobileProgress,
  showProgressBar,
  showProgressBarIndicator,
  isLoadingProgressBarIndicator = false,
  hideDefaultBackground = false,
  step = 0,
  maxStep = 0,
  className,
}) => {
  const router = useRouter();

  const rootClass = clsx(
    'relative min-h-screen w-full overflow-hidden',
    {
      'md:mt-8': variant === 'card-on-desktop',
    },
    className,
  );
  const navClassWrapper = clsx('w-full flex items-center', {
    'h-16 lg:h-20': variant === 'default',
    'relative top-0 z-10': !headerFixed,
    'fixed top-0 z-[9999] bg-white': headerFixed,
  });
  const navClass = clsx(
    'relative z-10 w-full flex items-center h-full w-full',
    {
      'bg-white shadow-sm justify-between border-b px-5 lg:px-[5%]':
        variant === 'default',
      'max-w-4xl mx-auto bg-[#D71920] justify-center text-white rounded-none md:rounded-t-3xl pt-4 pb-12 min-h-[88px]':
        variant === 'card-on-desktop',
    },
  );
  const wrapperClass = clsx(
    'relative z-10',
    {
      'max-w-4xl mx-auto rounded-none md:rounded-t-3xl bg-white shadow-sm':
        variant === 'card-on-desktop',
      'sm:pt-[80px]': headerFixed,
    },
    className,
  );
  const progressWrapperClass = clsx({
    'fixed top-[64px] lg:top-[80px] w-full z-[9999]': headerFixed,
  });
  const btnBackClass = clsx('w-5 flex items-center justify-center', {
    'absolute z-20 top-4 left-4 md:left-6 text-white md:text-neutral-dark-neutral90':
      variant === 'card-on-desktop',
  });

  const renderBtnBack = () => {
    return (
      <div className={btnBackClass} role="button">
        <Icon
          icon={ic_west}
          size={20}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
      </div>
    );
  };
  const renderBackground = () => {
    if (variant === 'card-on-desktop') {
      return (
        <img
          src={VectorBackground}
          className="fixed z-0 bottom-[-30% left-0 object-cover object-bottom w-full hidden md:block"
        />
      );
    }
    return (
      <img
        src={DefaultBackground}
        className="fixed z-0 left-0 object-cover w-full hidden md:block"
      />
    );
  };

  return (
    <>
      {!hideDefaultBackground && renderBackground()}
      <div className={rootClass}>
        <div className={navClassWrapper}>
          {variant === 'card-on-desktop' && renderBtnBack()}
          <div className={navClass}>
            <div className="w-5">
              {variant === 'default' && renderBtnBack()}
            </div>
            <div className="text-[12px] s:text-[14px] md:text-[16px] font-bold">
              {title}
            </div>
            <div className="w-5">
              {showProgressBarIndicator && isLoadingProgressBarIndicator && (
                <svg
                  className="animate-spin h-5 w-5 text-mediumGray-light-mediumGray"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {showProgressBarIndicator && !isLoadingProgressBarIndicator && (
                <div className="absolute z-20 top-4 right-4 md:right-6 w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] flex items-center justify-center rounded-full bg-gray-200/50">
                  <div className="text-[12px] md:text-[14px] lg:text-[16px] font-bold">{`${step}/${maxStep}`}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showMobileProgress && (
          <div className="lg:hidden">
            <ProgressBar step={step} maxStep={maxStep} />
          </div>
        )}
        {showProgressBar && variant === 'default' && (
          <div className={progressWrapperClass}>
            <ProgressBar step={step} maxStep={maxStep} />
          </div>
        )}

        <div className={wrapperClass}>{children}</div>
      </div>
    </>
  );
};

export default Object.assign(BaseLayout, {
  Container,
  Footer,
});
