import { Button, Container, Modal } from '@cp-component';
import {
  BtnBack,
  KycChecklist,
  KycChecklistRound,
  KycDoc,
  KycStep1Active,
  KycStep2Active,
  KycStep3,
  pCall,
  pChat,
  pHelp,
  pHelpBlack,
  pMail,
} from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import { useRouter } from 'next/router';
import Image from 'next/image';
import locale from './locale';
import {
  ktp_failed1,
  ktp_failed2,
  ktp_failed3,
  ktp_failed_head,
  KycBanner4,
  KycBanner5,
} from '@cp-config/Images';
import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import {
  SET_KYC_FACECOMPARE,
  SET_KYC_FACECOMPARE_SUCCESS,
  SET_KYC_IDCARD,
  SET_KYC_IDCARD_SUCCESS,
} from '@cp-module/kyc/kycConstant';
import { toast } from 'react-toastify';
import { NAVIGATION } from '@cp-util/constant';
import { formatDate } from '@cp-util/format';

export default function Page({
  lang,
  setUserData,
  kycAction,
  setLoading,
  setKycIdCard,
  setKycIdCardFailed,
  setKycIdCardClear,
  setKycFaceCompare,
  setKycFaceCompareFailed,
  setKycFaceCompareClear,
  setKycVerifyIdCardClear,
  setKycVerifyDukcapilClear,
}) {
  const router = useRouter();
  const uploadFile = useRef(null);
  const [isModalUploadActive, setModalUploadActive] = useState(false);
  const [isModalCameraActive, setModalCameraActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [activeArrowBack, setActiveArrowBack] = useState(false);
  const [activeModalError, setActiveModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    query: { product, prev },
  } = router;

  const setKycResult = useCallback(
    (act) => {
      if (act === SET_KYC_IDCARD) {
        setLoading(true);
      }
      if (act === SET_KYC_IDCARD_SUCCESS) {
        setLoading(false);
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
    },
    [setLoading],
  );

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

  // useEffect(() => {
  //   if (setKycFaceCompareFailed?.message) {
  //     setErrorMessage('NO_FACE_DETECTED');
  //     setActiveModalError(true);
  //   }
  // }, [setKycFaceCompareFailed]);

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative h-14 flex items-center border-b-2">
        <div
          role="button"
          onClick={() =>
            activeArrowBack ? setActiveArrowBack(false) : router.back()
          }
          className="absolute z-10 w-10 h-10 flex justify-center items-center">
          <Image src={BtnBack} width={24} height={24} />
        </div>
        <div className="absolute w-full text-center text-body1 font-bold">
          {trans(locale, lang, activeArrowBack ? 'pusatBantuan' : 'title')}
        </div>
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
          <div className="grow h-0.5 bg-[#D9D9D9] rounded-full" />
          <div>
            <Image src={KycStep3} width={24} height={24} />
          </div>
        </div>
        <div className="w-full max-w-full sm:max-w-[75%] text-primary-dark-primary90 font-semibold text-body2 text-center">
          {trans(locale, lang, 'fotoKTP')}
        </div>
      </div>
    );
  }

  function renderBanner() {
    return (
      <div className="flex justify-center gap-12 mb-6 sm:mb-12">
        <div className="flex flex-col items-center">
          <img className="max-h-28 mb-1" src={KycBanner4} />
          <div className="text-body2 font-semibold">
            {trans(locale, lang, 'benar')}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img className="max-h-28 mb-1" src={KycBanner5} />
          <div className="text-body2 font-semibold">
            {trans(locale, lang, 'salah')}
          </div>
        </div>
      </div>
    );
  }

  function renderTerm() {
    const data = [{ label: 'rule1' }, { label: 'rule2' }, { label: 'rule3' }];

    return (
      <div className="mb-4 sm:mb-12">
        {isVerified ? (
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#00D891]/25">
            <Image src={KycChecklistRound} width={32} height={32} />
            <div className="text-body2 font-medium text-neutral-light-neutral60">
              {trans(locale, lang, 'notifSuccess')}
              {/* {'Idcard_' + formatDate(new Date())} */}
            </div>
          </div>
        ) : (
          <>
            <div className="text-center font-semibold text-neutral-light-neutral90 mb-6">
              {trans(locale, lang, 'subTitle')}
            </div>
            <div className="flex justify-center">
              <div className="px-4 py-6 rounded-3xl border w-max">
                {data?.map((menu, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4">
                    <div>
                      <Image src={KycChecklist} width={24} height={24} />
                    </div>
                    <div className="text-body2 font-medium text-neutral-light-neutral90">
                      {trans(locale, lang, menu?.label)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
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
                query: { product, prev },
              },
              NAVIGATION.KYC.KycForm,
            );
          }

          setModalUploadActive(true);
        }}
        className="mt-6 sm:mt-16 mb-2"
        full>
        {trans(locale, lang, 'btnLanjut')}
      </Button>
    );
  }

  function renderModalUpload() {
    const onFileChange = (e) => {
      e.preventDefault();
      setKycIdCard(e.target.files[0]);
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

        {listContact.map((val, idx) => (
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

    const handleClick = () => {
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
      setKycVerifyIdCardClear();
      setKycVerifyDukcapilClear();
    };

    return (
      <Modal isOpen={activeModalError} className="relative max-w-[375px]">
        <div className="relative p-3">
          {errorMessage === 'OCR_NO_RESULT' ? (
            <div>
              <p className="text-xl font-bold my-1">
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
            className="mt-5"
            type="linear-gradient"
            shadow
            full
            onButtonClick={handleClick}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <Container className="relative" fullScreen noBackground>
        <div className="hidden sm:block absolute w-full h-40 border bg-gradient-to-r from-[#FE684D] to-[#ED1C24] rounded-b-[100px]" />
        <div className="w-full flex justify-center sm:px-4 sm:p-4 mb-12">
          <div className="z-10 w-full sm:max-w-[640px] bg-white shadow-md sm:mt-20 sm:rounded-2xl">
            {renderHeader()}
            {activeArrowBack ? (
              renderContact()
            ) : (
              <div className="py-4 px-4 sm:px-12">
                {renderStep()}
                {renderBanner()}
                {renderTerm()}
                {renderButton()}
              </div>
            )}
          </div>
        </div>
      </Container>
      {renderModalUpload()}
      {WebcamComponent()}
      {renderModalError()}
    </>
  );
}
