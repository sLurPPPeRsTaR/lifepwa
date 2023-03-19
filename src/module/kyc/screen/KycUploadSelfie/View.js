import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect, useRef } from 'react';
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
  LivenessFailed,
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
} from '@cp-config/Svgs';
import {
  SET_KYC_FACECOMPARE_FAILED,
  SET_KYC_FACECOMPARE_SUCCESS,
  SET_KYC_H5_LIVENESS_RESULT_FAILED,
  SET_KYC_H5_LIVENESS_RESULT_SUCCESS,
  SET_KYC_H5_LIVENESS_TOKEN_FAILED,
  SET_KYC_H5_LIVENESS_TOKEN_SUCCESS,
  SET_KYC_SELFIE_FAILED,
  SET_KYC_SELFIE_SUCCESS,
} from '@cp-module/kyc/kycConstant';
import { BASE_URL, NAVIGATION } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { formatDate } from '@cp-util/format';
import { useSelector } from 'react-redux';
import { windowTopLocation } from '@cp-util/common';
import { ic_close } from 'react-icons-kit/md';
import Icon from 'react-icons-kit';

export default function Page({
  kycAction,
  lang,
  userData,
  setLoading,
  setKycSelfie,
  setKycSelfieClear,
  setKycSelfieFailed,
  setUserData,
  setKycFaceCompare,
  setKycFaceCompareClear,
  setKycFaceCompareFailed,
  setKycIdCardClear,
  setKycVerifyIdCardClear,
  setKycH5livenessToken,
  setKycH5livenessTokenFailed,
  setKycH5livenessTokenResponse,
  setKycH5livenessResult,
  setKycH5livenessResultFailed,
  setKycH5livenessResultResponse,
  setLivenessTemp,
  livenessTempState,
  token,
}) {
  // const uploadFile = useRef(null);
  const router = useRouter();
  const [isModalUploadActive, setModalUploadActive] = useState(false);
  const [isModalCameraActive, setModalCameraActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [activeArrowBack, setActiveArrowBack] = useState(false);
  const [activeModalError, setActiveModalError] = useState(false);
  const [isLiveness, setIsLiveness] = useState(false);
  const [activeModalFacecompareError, setActiveModalFacecompareError] =
    useState(false);

  const {
    query: { fromWidget, product, prev, successCode, failCode },
  } = router;

  function handleKycSelfie(image) {
    return setKycSelfie({
      category: 'E_KYC_LIFE_PLUS',
      image,
    });
  }

  useEffect(() => {
    if (!token) {
      router.push(NAVIGATION.HOME.Home);
    }
  }, [token]);

  // livenes - aai
  useEffect(() => {
    if (window.location !== window.top.location) {
      window.top.location = window.location;
    }
  }, []);

  const isExecuted = useRef(false);

  const setKycH5Liveness = useCallback(() => {
    setKycH5livenessResult({
      signatureId: livenessTempState?.signatureId,
      category: 'E_KYC_LIFE_PLUS',
    });
  }, [livenessTempState?.signatureId, successCode]);

  useEffect(() => {
    if (successCode && !isExecuted.current) {
      setKycH5Liveness();
      isExecuted.current = true;
    }
  }, [successCode]);

  useEffect(() => {
    if (failCode) {
      setIsLiveness(true);
    }
  }, [failCode]);

  const getKycResult = useCallback(
    (act) => {
      setLoading(false);
      //h5 liveness token
      if (act === SET_KYC_H5_LIVENESS_TOKEN_SUCCESS) {
        const data = setKycH5livenessTokenResponse?.data;
        if (data) {
          const query = {
            url: data?.url,
            navFrom: NAVIGATION.KYC.KycUploadSelfie,
          };
          router.push(
            {
              pathname: NAVIGATION.LIVENESS.Liveness,
              query,
            },
            NAVIGATION.LIVENESS.Liveness,
          );
          setLivenessTemp(data);
        }
      }
      if (act === SET_KYC_H5_LIVENESS_TOKEN_FAILED) {
        if (setKycH5livenessTokenFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          console.log(setKycH5livenessTokenFailed?.message);
        }
        console.log(setKycH5livenessTokenFailed?.message);
        setLivenessTemp({});
      }

      if (act === SET_KYC_H5_LIVENESS_RESULT_SUCCESS) {
        setKycFaceCompare();
      }
      if (act === SET_KYC_H5_LIVENESS_RESULT_FAILED) {
        if (setKycH5livenessResultFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          setActiveModalError(true);
        }
      }
      //h5 liveness token

      // if (act === SET_KYC_SELFIE_SUCCESS) {
      //   setKycFaceCompare();
      // }
      // if (act === SET_KYC_SELFIE_FAILED) {
      //   if (setKycSelfieFailed?.message !== 'INTERNAL_SERVER_ERROR') {
      //     setActiveModalError(true);
      //   }
      // }

      if (act === SET_KYC_FACECOMPARE_SUCCESS) {
        setIsVerified(true);
        setUserData({
          userData: {
            alreadyLivenessTest: true,
          },
        });
        setKycFaceCompareClear();
        setTimeout(() => {
          setIsVerified(false);
          router.push({ pathname: NAVIGATION.HOME.Home });
        }, 2000);

        setLivenessTemp({});
      }
      if (act === SET_KYC_FACECOMPARE_FAILED) {
        if (setKycFaceCompareFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          setActiveModalFacecompareError(true);
        }
        console.log(setKycFaceCompareFailed?.message);
        setLivenessTemp({});
      }

      setKycSelfieClear();
      setModalCameraActive(false);
      setModalUploadActive(false);
    },
    [
      setKycSelfieClear,
      setKycFaceCompare,
      setUserData,
      setKycH5livenessTokenResponse?.data,
      setKycH5livenessTokenFailed?.message,
      setKycH5livenessResultFailed?.message,
      setKycFaceCompareClear,
    ],
  );

  useEffect(() => {
    getKycResult(kycAction);
  }, [getKycResult, kycAction]);

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative h-14 px-4 flex items-center">
        <div
          role="button"
          onClick={() =>
            activeArrowBack ? setActiveArrowBack(false) : router.back()
          }
          className="absolute z-10 w-10 h-10 flex justify-center items-center">
          <Image src={BtnBack} width={22} height={22} />
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

  function renderStep() {
    return (
      <div className="flex flex-col items-center mb-8 sm:mb-12 mt-4">
        <div className="flex items-center w-full max-w-full sm:max-w-[75%] gap-4 mb-2">
          <div>
            <Image src={KycStep1Active} width={24} height={24} />
          </div>
          <div className="grow h-0.5 bg-[#ED1C24] rounded-full" />
          <div>
            <Image src={KycStep2} width={24} height={24} />
          </div>
          <div className="grow h-0.5 bg-[#D9D9D9] rounded-full" />
          <div>
            <Image src={KycStep3} width={24} height={24} />
          </div>
        </div>
        <div className="w-full max-w-full sm:max-w-[75%] text-primary-dark-primary90 font-semibold text-body2">
          {trans(locale, lang, 'selfie')}
        </div>
      </div>
    );
  }

  function renderBanner() {
    return (
      <>
        <div className="flex justify-center mb-4">
          <img className="w-2/3 md:w-2/5" src={livenessBanner} alt="" />
        </div>
        <div className="text-sm text-center md:text-lg font-semibold text-gray-700 mb-6 sm:mb-18">
          {trans(locale, lang, 'bannerTitle')}
        </div>
      </>
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
              {/* {'Liveness_' + formatDate(new Date())} */}
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

  function renderBody() {
    const dataBody = [
      {
        image: selfie1,
        title: 'selfieStep1',
        subtitle: 'subtitleSelfieStep1',
      },
      {
        image: selfie2,
        title: 'selfieStep2',
        subtitle: 'subtitleSelfieStep2',
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
                <img
                  src={menu?.image}
                  alt=""
                  className="w-full xm:w-4/5 md:w-3/5"
                />
              </div>
              <div className="w-full text-xs xm:text-sm md:text-base">
                <p className="font-semibold text-neutral-light-neutral60">
                  {trans(locale, lang, menu?.title)}
                </p>
                <p className="text-xs pt-1 sm:text-sm sm:pt-2">
                  {trans(locale, lang, menu?.subtitle)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs sm:text-sm pt-3">
          {trans(locale, lang, 'selfieNote')}
        </p>
      </div>
    );
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
    let base_url = '';
    let img_step1 = '';
    let img_step2 = '';
    let img_step3 = '';
    let img_step4 = '';
    let img_failed = '';
    let img_success = '';
    let img_btn_camera = '';

    if (!process.env.BASE_URL.includes('uat')) {
      base_url = 'https://life.id' + NAVIGATION.KYC.KycUploadSelfie;
      img_step1 =
        'https://www.life.id/api/v1/public/assets/3dfaec5b-9654-45a6-baa8-884721d10069.png';
      img_step2 =
        'https://www.life.id/api/v1/public/assets/9db9224d-1393-476d-a3f7-44b142ff4f79.png';
      img_step3 =
        'https://www.life.id/api/v1/public/assets/8f046083-af89-4b3f-b4a0-d9e8e97519fd.png';
      img_step4 =
        'https://www.life.id/api/v1/public/assets/c3e0c615-5716-407b-b67d-d5ed7f81c244.png';
      img_failed =
        'https://www.life.id/api/v1/public/assets/49bd81c9-2558-461c-9a8a-85bbb1cea089.png';
      img_success =
        'https://www.life.id/api/v1/public/assets/077017c2-f4cd-46a1-b89e-4ab5c0d09b2c.png';
      img_btn_camera =
        'https://www.life.id/api/v1/public/assets/86e94247-43ca-4ea3-9436-2045760d7eb0.jpg';
    } else {
      base_url = 'https://uat.life.id' + NAVIGATION.KYC.KycUploadSelfie;
      img_step1 =
        'https://uat.life.id/api/v1/public/assets/3f43893d-4019-4c58-baf9-cfff6e5843aa.png';
      img_step2 =
        'https://uat.life.id/api/v1/public/assets/610ad73a-4407-4eaa-ad07-40800bf95530.png';
      img_step3 =
        'https://uat.life.id/api/v1/public/assets/6418c634-05e7-4ddf-b9ea-f52769998809.png';
      img_step4 =
        'https://uat.life.id/api/v1/public/assets/7cf0ac97-3784-4240-8fdf-9d77ad84d754.png';
      img_failed =
        'https://uat.life.id/api/v1/public/assets/e99afc56-6d0c-4219-bb58-35f85a472bf4.png';
      img_success =
        'https://uat.life.id/api/v1/public/assets/ffb7b887-cd29-4eb9-8697-6c6a6aa6ccb4.png';
      img_btn_camera =
        'https://uat.life.id/api/v1/public/assets/e8712df3-4cb8-4bb8-9bbe-66cb8219ca9a.jpg';
    }

    const LIVENESS_UI = {
      locale: 'en',
      mobileTipsPage: {
        titleText: trans(locale, lang, 'titlePageTips'),
        titleDescText: trans(locale, lang, 'silahkanIkutiPetunjuk'),
        titleTextColor: '#000000',
        tipsTextColor: '#000000',
        startButtonTextColor: '#ffffff',
        tipsAreaBackgroundColor: '#ffffff',
        backgroundColor: '#ffffff',
        startButtonText: 'Mulai',
        startButtonBackgroundColor: '#ee282f',
        tips: [
          {
            iconLink: img_step1,
            text: trans(locale, lang, 'livenessStep1'),
          },
          {
            iconLink: img_step2,
            text: trans(locale, lang, 'livenessStep2'),
          },
          {
            iconLink: img_step3,
            text: trans(locale, lang, 'livenessStep3'),
          },
          {
            iconLink: img_step4,
            text: trans(locale, lang, 'livenessStep4'),
          },
        ],
      },
      mobileLoadingPage: {
        progressColor: '#ee282f',
      },
      mobileErrorDialog: {
        confirmButtonText: trans(locale, lang, 'konfirmasi'),
        confirmButtonTextColor: '#ffffff',
        confirmButtonBackgroundColor: '#ee282f',
        messageTextColor: '#000000',
        backgroundColor: '#ffffff',
      },
      mobileResultPage: {
        successDesc: trans(locale, lang, 'verifikasiBerhasil'),
        failedDesc: trans(locale, lang, 'verifikasiGagal'),
        isShow: true,
        showScore: true,
        livenessResultTextColor: '#000000',
        nextStepButtonText: trans(locale, lang, 'lanjut'),
        nextStepButtonTextColor: '#ffffff',
        nextStepButtonBackgroundColor: '#ee282f',
        tryAgainButtonText: trans(locale, lang, 'cobaLagi'),
        tryAgainButtonTextColor: '#ffffff',
        tryAgainButtonBackgroundColor: '#ee282f',
        successIconLink: img_success,
        failedIconLink: img_failed,
      },
      pcTipsPage: {
        titleText: trans(locale, lang, 'titlePageTips'),
        titleDescText: trans(locale, lang, 'silahkanIkutiPetunjuk'),
        startButtonText: trans(locale, lang, 'mulai'),
        startButtonBackgroundColor: '#ee282f',
        titleTextColor: '#000000',
        titleDescTextColor: '#000000',
        tipsTextColor: '#000000',
        startButtonTextColor: '#ffffff',
        backgroundColor: '#ffffff',
        tips: [
          {
            iconLink: img_step1,
            text: trans(locale, lang, 'livenessStep1'),
          },
          {
            iconLink: img_step2,
            text: trans(locale, lang, 'livenessStep2'),
          },
          {
            iconLink: img_step3,
            text: trans(locale, lang, 'livenessStep3'),
          },
          {
            iconLink: img_step4,
            text: trans(locale, lang, 'livenessStep4'),
          },
        ],
      },
      pcLoadingPage: {
        progressColor: '#ee282f',
      },
      pcCameraPage: {
        titleText: trans(locale, lang, 'verifikasiWajah'),
        descText: trans(locale, lang, 'silahkanAmbilFoto'),
        titleTextColor: '#000000',
        descTextColor: '#000000',
        takePhotoIconLink: img_btn_camera,
      },
      pcErrorDialog: {
        confirmButtonText: trans(locale, lang, 'konfirmasi'),
        confirmButtonBackgroundColor: '#ee282f',
      },
      pcResultPage: {
        successDesc: trans(locale, lang, 'verifikasiBerhasil'),
        failedDesc: trans(locale, lang, 'verifikasiGagal'),
        isShow: true,
        showScore: false,
        titleTextColor: '#000000',
        livenessResultTextColor: '#000000',
        tryAgainButtonText: trans(locale, lang, 'cobaLagi'),
        tryAgainButtonTextColor: '#ffffff',
        tryAgainButtonBackgroundColor: '#ee282f',
        nextStepButtonText: trans(locale, lang, 'lanjut'),
        nextStepButtonTextColor: '#ffffff',
        nextStepButtonBackgroundColor: '#ee282f',
        successIconLink: img_success,
        failedIconLink: img_failed,
      },
    };

    const handleClick = () => {
      setLoading(true);
      setKycH5livenessToken({
        returnUrl: base_url,
        failedReturnUrl: base_url,
        tryCount: 1,
        uiConfiguration: LIVENESS_UI,
      });
    };

    return (
      <Button
        type="linear-gradient"
        onButtonClick={handleClick}
        className="mb-4 mt-12 text-sm md:text-base"
        full>
        {trans(locale, lang, 'btnTitle')}
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
                  setLoading(true);
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

  const renderModalLivenessFailed = () => {
    return (
      <Modal isOpen={isLiveness} size="sm" className="relative">
        <Icon
          icon={ic_close}
          size={20}
          className="absolute top-3 left-3"
          role="button"
          onClick={() => setIsLiveness(false)}
        />
        <img src={LivenessFailed} className="w-2/3 mx-auto" />
        <p className="text-center text-sm font-bold md:text-base py-4">
          {trans(locale, lang, 'verifikasiGagal')}
        </p>
      </Modal>
    );
  };

  return (
    <>
      <HeaderPage
        isHelp
        title={trans(locale, lang, 'title')}
        onClickBack={() => router.push(NAVIGATION.HOME.Home)}
      />

      <div className="relative w-full flex justify-center -top-10 sm:px-4 sm:p-4 md:-top-16">
        <div className="z-10 w-full  bg-white md:shadow-md sm:rounded-3xl sm:max-w-2xl">
          {/* {renderHeader()}
          {activeArrowBack ? (
            renderContact()
          ) : ( */}
          <div className="pb-4 pt-10 px-4 sm:px-12">
            {/* {renderStep()} */}
            {renderBanner()}
            {/* {renderTerm()} */}
            {renderBody()}
            {renderAlert()}
            {renderButton()}
          </div>
          {/* )} */}
        </div>
      </div>
      {renderModalSuccess()}
      {renderModalUpload()}
      {WebcamComponent()}
      {renderModalError()}
      {renderModalFacecompareFailed()}
      {renderModalLivenessFailed()}
    </>
  );
}
