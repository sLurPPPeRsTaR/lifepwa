/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Button, HeaderPage, Modal } from '@cp-component';
import { trans } from '@cp-util/trans';
import { NAVIGATION } from '@cp-util/constant';
import { eventAppsflyer } from '@cp-util/func';
import { KycChecklistRound, KycDoc } from '@cp-config/Svgs';
import locale from './locale';
import Webcam from 'react-webcam';

import {
  ktp_failed1,
  ktp_failed2,
  ktp_failed3,
  ktp_failed_head,
  NewKycBanner,
} from '@cp-config/Images';
import {
  BtnBack,
  Kyc1,
  Kyc2,
  Kyc3,
  pCall,
  pChat,
  pHelpBlack,
  pMail,
} from '@cp-config/Svgs';
import {
  SET_KYC_FACECOMPARE,
  SET_KYC_FACECOMPARE_SUCCESS,
  SET_KYC_IDCARD,
  SET_KYC_IDCARD_SUCCESS,
} from '@cp-module/kyc/kycConstant';

export default function Page(props) {
  const {
    lang,
    userId,
    kycAction,
    setLoading,
    setKycIdCard,
    setKycIdCardFailed,
    setKycIdCardClear,
    setKycVerifyIdCardClear,
    setKycVerifyDukcapilClear,
  } = props;
  const router = useRouter();
  const {
    query: { product, prev, callbackUrl },
  } = router;
  const uploadFile = useRef(null);
  const [activeArrowBack, setActiveArrowBack] = useState(false);
  const [isModalUploadActive, setModalUploadActive] = useState(false);
  const [isModalCameraActive, setModalCameraActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [activeModalError, setActiveModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userId) {
      eventAppsflyer({
        eventName: 'af_open_ekyc',
        payload: { af_user_id: userId },
      });
    }
  }, [userId]);

  const setKycResult = useCallback((act) => {
    setLoading(false);
    if (act === SET_KYC_IDCARD) {
      setLoading(true);
    }
    if (act === SET_KYC_IDCARD_SUCCESS) {
      setLoading(false);
      setKycVerifyIdCardClear();
      setKycVerifyDukcapilClear();
      router.push(
        {
          pathname: NAVIGATION.KYC.KycForm,
          query: { product, prev, callbackUrl },
        },
        NAVIGATION.KYC.KycForm,
      );
    }

    setModalCameraActive(false);
    setModalUploadActive(false);

    // FACECOMPARE
    if (act === SET_KYC_FACECOMPARE) {
      setLoading(true);
    }
    if (act === SET_KYC_FACECOMPARE_SUCCESS) {
      setLoading(false);
      setIsVerified(true);
    }
  }, []);

  useEffect(() => {
    setKycResult(kycAction);
  }, [kycAction, setKycResult]);

  useEffect(() => {
    if (setKycIdCardFailed?.message) {
      setKycIdCardClear();
      setErrorMessage('OCR_NO_RESULT');
      setActiveModalError(true);
    }
  }, [setKycIdCardClear, setKycIdCardFailed]);

  // Banner Content
  function renderHeader() {
    const onClick = () => {
      if (activeArrowBack) {
        setActiveArrowBack(false);
        return;
      }
      if (prev === 'profilePayment') {
        router.replace(
          {
            pathname: NAVIGATION.PROFILE.Profile,
            query: {
              activeTabProps: 9,
            },
          },
          NAVIGATION.PROFILE.Profile,
        );
        return;
      }
      router.back();
    };
    return (
      <div className="relative h-14 px-4 flex items-center">
        <div
          role="button"
          onClick={onClick}
          className="absolute z-10 w-10 h-10 flex justify-center items-center">
          <Image src={BtnBack} width={22} height={22} alt="" />
        </div>
        {/* <div className="absolute w-full text-center text-body1 font-bold">
          {trans(locale, lang, activeArrowBack ? 'pusatBantuan' : 'title')}
        </div> */}
        <div className="mr-4 absolute justify-center items-center right-0">
          {!activeArrowBack ? (
            <img
              src={pHelpBlack}
              className="w-7 cursor-pointer"
              onClick={() => setActiveArrowBack(true)}
            />
          ) : null}
        </div>
      </div>
    );
  }

  function renderBanner() {
    return (
      <>
        <div className="flex justify-center mb-4 sm:mb-12">
          <img className="w-2/3 md:w-2/5" src={NewKycBanner} alt="" />
        </div>
        <div className="text-sm xm:text-body2 font-semibold text-neutral-light-neutral60 mb-6 sm:mb-18">
          {trans(locale, lang, 'unggahKtpDan')}
        </div>
      </>
    );
  }

  function renderKYCContainer() {
    const dataKyc = [
      {
        image: Kyc1,
        title: 'hubungkanPolis',
        subtitle: 'informasiPolismuAkan',
      },
      {
        image: Kyc2,
        title: 'beliProteksiDengan',
        subtitle: 'beliProdukProteksi',
      },
      {
        image: Kyc3,
        title: 'informasiPembayaranManfaat',
        subtitle: 'melihatInformasiPembayaran',
      },
    ];

    return dataKyc?.map((menu, index) => (
      <div
        key={index}
        className="flex items-center gap-3 md:gap-6 border-b px-2 py-4">
        <div className="w-20 md:w-28 flex justify-center items-center">
          <img src={menu?.image} alt="" className="w-4/5 md:w-3/5" />
        </div>
        <div className="w-full text-xs xm:text-body2">
          <div className="font-semibold text-neutral-light-neutral60 ">
            {trans(locale, lang, menu?.title)}
          </div>
          <div className="text-mediumGray-light-mediumGray pt-1">
            {trans(locale, lang, menu?.subtitle)}
          </div>
        </div>
      </div>
    ));
  }

  function renderAlert() {
    return (
      <div className="mt-10">
        {isVerified && (
          <div className="flex items-center gap-2 mb-6 rounded-3xl py-3 px-5 bg-green-200 sm:py-4">
            <Image src={KycChecklistRound} width={32} height={32} />
            <div className="text-xs xm:text-sm">
              {trans(locale, lang, 'notifSuccess')}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-3xl py-3 px-5 bg-green-200 sm:py-4">
          <Image src={KycChecklistRound} width={32} height={32} />
          <p className="text-xs xm:text-sm">
            {trans(locale, lang, 'dataPribadiKamu')}
          </p>
        </div>
      </div>
    );
  }

  function renderButton() {
    return (
      <Button
        type="linear-gradient"
        onButtonClick={() => {
          if (isVerified) {
            setKycVerifyIdCardClear();
            setKycVerifyDukcapilClear();
            return router.push(
              {
                pathname: NAVIGATION.KYC.KycForm,
                query: { product, prev, callbackUrl },
              },
              NAVIGATION.KYC.KycForm,
            );
          }

          setModalUploadActive(true);
        }}
        className="mb-4 mt-12 text-sm md:text-base"
        full>
        {trans(locale, lang, 'ambilFotoKtp')}
      </Button>
    );
  }

  // render modal
  function renderModalUpload() {
    const onFileChange = (e) => {
      e.preventDefault();
      setKycIdCard(e.target.files[0]);
      setLoading(true);
    };

    return (
      <Modal
        isOpen={isModalUploadActive}
        toggle={() => setModalUploadActive(false)}
        noBackground>
        <div className="w-full flex flex-col divide-y-2 rounded-2xl bg-white mb-6">
          <div className="file-upload-container">
            <input
              ref={uploadFile}
              className="absolute -z-10 opacity-0"
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={onFileChange}
            />
            <div
              role="button"
              onClick={() => uploadFile.current.click()}
              className="px-4 py-3 flex justify-between items-center">
              <div className="text-neutral-light-neutral90 font-medium">
                {trans(locale, lang, 'galeriFoto')}
              </div>
              <div>
                <Image src={KycDoc} width={24} height={24} />
              </div>
            </div>
          </div>
          <div
            role="button"
            onClick={() => setModalCameraActive(true)}
            className="px-4 py-3 flex justify-between items-center">
            <div className="text-neutral-light-neutral90 font-medium">
              {trans(locale, lang, 'ambilFoto')}
            </div>
            <div>
              <Image src={KycDoc} width={24} height={24} />
            </div>
          </div>
        </div>
        <div
          role="button"
          onClick={() => setModalUploadActive(false)}
          className="text-h6 font-medium flex justify-center w-full py-3 text-[#007AFF] bg-[#F5F5F5]/70 rounded-2xl">
          {trans(locale, lang, 'batal')}
        </div>
      </Modal>
    );
  }

  function WebcamComponent() {
    if (!isModalCameraActive) return null;

    const videoConstraints = {
      facingMode: 'environment',
    };

    return (
      <Modal
        isOpen={true}
        toggle={() => {
          setModalCameraActive(false);
          setModalUploadActive(false);
        }}>
        <div className="mb-2">
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}>
            {({ getScreenshot }) => (
              <Button
                type="linear-gradient"
                className="mt-6"
                onButtonClick={async () => {
                  const imageSrc = getScreenshot();
                  const blob = await fetch(imageSrc).then((res) => res.blob());
                  setKycIdCard(blob, null, blob.type);
                  setLoading(true);
                }}
                full>
                {trans(locale, lang, 'capturePhoto')}
              </Button>
            )}
          </Webcam>
        </div>
      </Modal>
    );
  }

  const renderModalError = () => {
    const listGuide = [
      {
        title: trans(locale, lang, 'modalGuide1'),
        icon: ktp_failed1,
      },
      {
        title: trans(locale, lang, 'modalGuide2'),
        icon: ktp_failed2,
      },
      {
        title: trans(locale, lang, 'modalGuide3'),
        icon: ktp_failed3,
      },
    ];

    return (
      <Modal isOpen={activeModalError} className="relative max-w-[375px]">
        <div className="relative p-2 md:p-3">
          {errorMessage === 'OCR_NO_RESULT' ? (
            <div>
              <p className="text-sm font-bold my-1 xm:text-base md:text-lg">
                {trans(locale, lang, 'modalTitle1')}
              </p>
              <p className="text-xs font-medium opacity-60 xm:text-sm md:text-base">
                {trans(locale, lang, 'modalSubtitle1')}
              </p>
              <div className="divide-y pt-4">
                {listGuide.map((val, idx) => (
                  <div key={idx} className="group flex flex-col">
                    <a
                      className={`w-full flex flex-row justify-between my-2 text-gray-600`}>
                      <div className="flex items-center">
                        <img src={val.icon} className="w-8 h-8" />
                        <span className="font-medium text-xs pl-4 mr-2 xm:text-sm">
                          {val.title}
                        </span>
                      </div>
                    </a>
                    <div></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <img
                src={ktp_failed_head}
                className="absolute w-48 top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
              />
              <p className="pt-12 text-xl font-bold text-center my-3">
                {trans(locale, lang, 'modalTitle2')}
              </p>
              <p className="text-base font-medium text-center opacity-60">
                {trans(locale, lang, 'modalSubtitle2')}
              </p>
            </div>
          )}

          <Button
            className="mt-5 text-sm !h-10 xm:!h-11"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              if (errorMessage === 'OCR_NO_RESULT') {
                setActiveModalError(false);
              } else {
                setUserData({
                  userData: {
                    alreadyLivenessTest: false,
                  },
                });
                setActiveModalError(false);
                router.push(NAVIGATION.KYC.KycMain);
              }
            }}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </div>
      </Modal>
    );
  };

  // main
  const renderContact = () => {
    const listContact = [
      {
        title: 'WhatsApp Lifia',
        icon: pChat,
        link: 'https://wa.me/628111372848?text=Hi Lifia, saya perlu bantuan',
      },
      { title: 'Call Center 1500176', icon: pCall, link: 'tel:1500176' },
      {
        title: 'customer_care@ifg-life.id',
        icon: pMail,
        link: 'mailto:customer_care@ifg-life.id?Subject=',
      },
    ];

    return (
      <div className="mb-20 divide-y">
        <p className="font-semibold text-base py-8 px-5">
          {trans(locale, lang, 'disiniUntukKamu')}
        </p>
        {listContact.map((val) => (
          <div key={val.idx} className="group flex flex-col">
            <a
              href={val.link}
              target="_blank"
              className={`w-full p-4 flex flex-row justify-between my-4 duration-500 text-gray-600 rounded-md`}>
              <div className="flex">
                <img src={val.icon} />
                <span className="font-black md:text-base pl-4 xs:text-sm mr-2">
                  {val.title}
                </span>
              </div>
            </a>
            <div></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <HeaderPage
        title={trans(locale, lang, 'verifikasiDataDiri')}
        btnBack={false}
      />

      <div className="relative w-full flex justify-center -top-10 sm:px-4 sm:p-4 md:-top-16">
        <div className="z-10 w-full  bg-white md:shadow-md sm:rounded-3xl sm:max-w-2xl">
          {renderHeader()}
          {activeArrowBack ? (
            renderContact()
          ) : (
            <div className="py-4 px-4 sm:px-12">
              {renderBanner()}
              {renderKYCContainer()}
              {renderAlert()}
              {renderButton()}
            </div>
          )}
        </div>
      </div>
      {renderModalUpload()}
      {WebcamComponent()}
      {renderModalError()}
    </>
  );
}
