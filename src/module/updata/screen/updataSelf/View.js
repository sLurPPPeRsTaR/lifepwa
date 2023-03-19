import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
import { Button, HeaderPage, Modal } from '@cp-component';
import {
  ktp_failed_head,
  KycBanner2,
  KycBanner3,
  livenessBanner,
  Check,
  selfie1,
  selfie2,
  selfie_failed1,
  selfie_failed2,
  selfie_failed3,
  selfie_failed4,
} from '@cp-config/Images';
import {
  BtnBack,
  Kyc1,
  Kyc2,
  KycChecklist,
  KycChecklistRound,
  KycDoc,
  KycStep1Active,
  KycStep2,
  KycStep3,
  pCall,
  pChat,
  pHelp,
  pHelpBlack,
  pMail,
  RedTick,
  RedCheck,
} from '@cp-config/Svgs';
import {
  SET_KYC_FACECOMPARE_FAILED,
  SET_KYC_FACECOMPARE_SUCCESS,
  SET_KYC_SELFIE_FAILED,
  SET_KYC_SELFIE_SUCCESS,
} from '@cp-module/kyc/kycConstant';
import { NAVIGATION } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { formatDate } from '@cp-util/format';
import { useSelector } from 'react-redux';

export default function Page({ lang, setUpdataSelfie }) {
  // const uploadFile = useRef(null);
  const router = useRouter();
  const [isModalUploadActive, setModalUploadActive] = useState(false);
  const [isModalCameraActive, setModalCameraActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [activeArrowBack, setActiveArrowBack] = useState(false);
  const [activeModalError, setActiveModalError] = useState(false);
  const [activeModalFacecompareError, setActiveModalFacecompareError] =
    useState(false);

  function handleKycSelfie(image) {
    console.log('image >>>', image);
    // return setUpdataSelfie({
    //   category: 'E_KYC_LIFE_PLUS',
    //   image,
    // });
  }

  function renderImageSelfie() {
    return (
      <div>
        <div className="flex justify-center p-6 gap-2">
          <div className="w-14 xm:w-16 md:w-28 flex justify-center items-center flex-col">
            <img src={KycBanner2} alt="" className="w-full xm:w-4/5 md:w-3/5" />
            <p className="font-semibold text-neutral-light-neutral60">Benar</p>
          </div>
          <div className="w-14 xm:w-16 md:w-28 flex justify-center items-center flex-col">
            <img src={KycBanner3} alt="" className="w-full xm:w-4/5 md:w-3/5" />
            <p className="font-semibold text-neutral-light-neutral60">Salah</p>
          </div>
        </div>
      </div>
    );
  }

  function renderBody() {
    const dataBody = [
      {
        image: selfie1,
        title: 'keterangan1',
      },
      {
        image: selfie1,
        title: 'keterangan2',
      },
      {
        image: selfie1,
        title: 'keterangan3',
      },
    ];

    return (
      <div>
        <div className="border px-3 md:px-5 divide-y rounded-xl shadow-sm">
          {dataBody?.map((menu, index) => (
            <div
              key={index}
              className="flex items-center gap-2 xm:gap-3 h-auto py-4 md:py-0 md:gap-4 md:h-28">
              <div className="w-14 xm:w-16 md:w-28 flex justify-center items-center">
                <Image src={RedCheck} width={24} height={24} />
              </div>
              <div className="w-full text-xs xm:text-sm md:text-base">
                <p className="font-semibold text-neutral-light-neutral60">
                  {trans(locale, lang, menu?.title)}
                </p>
              </div>
            </div>
          ))}
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
            setKycSelfieClear();
            setKycFaceCompareClear();
            setKycIdCardClear();
            setKycVerifyIdCardClear();
            return router.push(
              {
                pathname: NAVIGATION.HOME.Home,
                query: { product, prev },
              },
              NAVIGATION.HOME.Home,
            );
          }
          setModalUploadActive(true);
        }}
        className="mb-4 mt-12 text-sm md:text-base"
        full>
        {trans(locale, lang, 'lanjut')}
      </Button>
    );
  }

  function renderModalUpload() {
    const onFileChange = (e) => {
      e.preventDefault();
      const filesList = e.target.files;

      if (filesList.length === 0) return;
      for (let i = 0; i < filesList.length; i++) {
        const file = filesList[i];

        const reader = new FileReader();
        reader.onload = ({ target: { result } }) => {
          handleKycSelfie(result.slice(23));
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <Modal
        isOpen={isModalUploadActive}
        toggle={() => setModalUploadActive(false)}
        noBackground>
        <div className="w-full flex flex-col divide-y-2 rounded-2xl bg-white mb-6">
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
      facingMode: 'user',
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
                onButtonClick={() => {
                  const imageSrc = getScreenshot({ width: 512, height: 512 });
                  handleKycSelfie(imageSrc.slice(23));
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
        icon: selfie_failed1,
      },
      {
        title: trans(locale, lang, 'modalGuide2'),
        icon: selfie_failed2,
      },
      {
        title: trans(locale, lang, 'modalGuide3'),
        icon: selfie_failed3,
      },
      {
        title: trans(locale, lang, 'modalGuide4'),
        icon: selfie_failed4,
      },
    ];

    return (
      <Modal isOpen={activeModalError} className="relative max-w-[375px]">
        <div className="relative p-3">
          <div>
            <p className="text-xl font-bold mb-2 text-center">
              {trans(locale, lang, 'modalTitle1')}
            </p>
            <p className="text-base font-medium opacity-60">
              {trans(locale, lang, 'modalSubtitle1')}
            </p>
            <div className="divide-y pt-4">
              {listGuide.map((val, idx) => (
                <div key={idx} className="group flex flex-col">
                  <a
                    className={`w-full flex flex-row justify-between my-2 text-gray-600`}>
                    <div className="flex items-center">
                      <img src={val.icon} className="w-8 h-8" />
                      <span className="font-medium text-sm pl-4 mr-2">
                        {val.title}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="mt-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => setActiveModalError(false)}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </div>
      </Modal>
    );
  };

  const renderModalFacecompareFailed = () => {
    return (
      <Modal
        isOpen={activeModalFacecompareError}
        size="sm"
        className="relative">
        <div className="absolute w-full -top-1/4 -left-1 md:-top-1/3">
          <img src={ktp_failed_head} className="w-4/6 mx-auto" />
        </div>
        <p className="font-bold text-center text-sm pt-10 xm:pt-16 xm:text-base">
          {trans(locale, lang, 'kamiMenemukanKtp')}
        </p>
        <p className="text-center pt-2 text-xs xm:text-sm">
          {trans(locale, lang, 'dataYangKamu')}
        </p>

        <Button
          full
          type="linear-gradient"
          className="mt-5 text-sm !h-11"
          onButtonClick={() => setActiveModalFacecompareError(false)}>
          {trans(locale, lang, 'cobaLagiCompareFail')}
        </Button>
      </Modal>
    );
  };

  const renderModalSuccess = () => {
    return (
      <Modal
        size="sm"
        className="relative"
        isOpen={isVerified}
        toggle={() => {
          setIsVerified(false);
          router.push(NAVIGATION.HOME.Home);
        }}>
        <div className="py-8">
          <img src={Check} className="w-2/5 mx-auto" />
          <p className="text-center  text-neutral-light-neutral90 font-bold mt-10 mb-4 text-base md:mt-16 xm:text-h6">
            {trans(locale, lang, 'verifikasiWajahBerhasil')}
          </p>

          <p className="text-center text-sm">
            {trans(locale, lang, 'kamuTelahMelakukan')}
          </p>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <HeaderPage title={trans(locale, lang, 'title')} btnBack={false} />

      <div className="relative w-full flex justify-center -top-10 sm:px-4 sm:p-4 md:-top-16">
        <div className="z-10 w-full  bg-white md:shadow-md sm:rounded-3xl sm:max-w-2xl">
          <div className="py-4 px-4 sm:px-12">
            {/* {renderStep()} */}
            {renderImageSelfie()}
            {/* {renderTerm()} */}
            {renderBody()}
            {renderButton()}
          </div>
        </div>
      </div>
      {renderModalSuccess()}
      {renderModalUpload()}
      {WebcamComponent()}
      {renderModalError()}
      {renderModalFacecompareFailed()}
    </>
  );
}
