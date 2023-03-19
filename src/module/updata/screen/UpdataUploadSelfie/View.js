import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Webcam from 'react-webcam';
import { Button, HeaderPage, Modal } from '@cp-component';
import {
  ktp_failed_head,
  KycBanner2,
  KycBanner3,
  Check,
  selfie1,
  selfie_failed1,
  selfie_failed2,
  selfie_failed3,
  selfie_failed4,
  LivenessFailed,
} from '@cp-config/Images';
import { KycDoc, RedCheck } from '@cp-config/Svgs';
import {
  SET_UPDATA_FACECOMPARE_SUCCESS,
  SET_UPDATA_FACECOMPARE_FAILED,
  GET_UPDATA_DETAIL_EKYC_SUCCESS,
  GET_UPDATA_DETAIL_EKYC_FAILED,
} from '@cp-module/updata/updataConstant';
import { NAVIGATION } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import locale from './locale';
import UpdataStep from '../UpdataStep';
import { ic_close } from 'react-icons-kit/md';
import Icon from 'react-icons-kit';
import {
  SET_KYC_H5_LIVENESS_RESULT_FAILED,
  SET_KYC_H5_LIVENESS_RESULT_SUCCESS,
  SET_KYC_H5_LIVENESS_TOKEN_FAILED,
  SET_KYC_H5_LIVENESS_TOKEN_SUCCESS,
} from '@cp-module/kyc/kycConstant';

export default function Page({
  lang,
  updataAction,
  getUpdataDetailEKycResponse,
  getUpdataDetailEKycFailed,
  getUpdataValidationCheckResponse,
  setUpdataLiveness,
  getUpdataDetailEKyc,
  setIsKTPSame,
  setUpdataFaceCompareFailed,
  setUpdataFaceCompareClear,
  setUpdataFaceCompare,
  setLoading,
  setToastMsg,
  setKycH5livenessToken,
  setKycH5livenessTokenFailed,
  setKycH5livenessTokenResponse,
  setKycH5livenessResult,
  setKycH5livenessResultFailed,
  setLivenessTemp,
  livenessTempState,
  kkpmTempState,
  setKkpmTemp,
  setUserData,
  kycAction,
  setKycH5livenessTokenClear,
  token,
  setClearKkpm,
}) {
  // const uploadFile = useRef(null);
  const router = useRouter();
  const [isModalUploadActive, setModalUploadActive] = useState(false);
  const [isModalCameraActive, setModalCameraActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [activeArrowBack, setActiveArrowBack] = useState(false);
  const [activeModalError, setActiveModalError] = useState(false);
  const [activeModalFacecompareError, setActiveModalFacecompareError] =
    useState(false);
  const [isLivenessFailed, setIsLivenessFailed] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push(NAVIGATION.HOME.Home);
    }
  }, [router, token]);

  // liveness - aai
  useEffect(() => {
    if (window.location !== window.top.location) {
      window.top.location = window.location;
    }
  }, []);

  const isExecuted = useRef(false);

  const setKycH5Liveness = useCallback(() => {
    setKycH5livenessResult({
      signatureId: livenessTempState?.signatureId,
      category: 'E_KYC_UPDATE_DATA',
    });
  }, [livenessTempState?.signatureId, setKycH5livenessResult]);

  useEffect(() => {
    if (router?.query?.successCode && !isExecuted.current) {
      setKycH5Liveness();
      isExecuted.current = true;
    }
  }, [router?.query?.successCode, setKycH5Liveness]);

  useEffect(() => {
    if (router?.query?.failCode) {
      setIsLivenessFailed(true);
    }
  }, [router?.query?.failCode]);

  // end liveness - aai

  useEffect(() => {
    setLoading(true);
    getUpdataDetailEKyc();
  }, [getUpdataDetailEKyc, setLoading]);

  function handleKycSelfie(image) {
    return setUpdataLiveness({
      image,
      category: 'E_KYC_UPDATE_DATA',
    });
  }

  const getUpdataDetailEKycResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_DETAIL_EKYC_SUCCESS) {
        const res = getUpdataDetailEKycResponse?.data;
        const validationCheckRes = getUpdataValidationCheckResponse?.data;
        setLoading(false);
        setIsKTPSame(true);

        if (res?.isTodayLivenessTest) {
          if (validationCheckRes?.isValid === true) {
            router.replace(NAVIGATION.UPDATA.UpdataInformation);
          } else {
            router.replace(NAVIGATION.UPDATA.UpdataUploadKK);
          }
        }
      }
      if (act === GET_UPDATA_DETAIL_EKYC_FAILED) {
        const message = getUpdataDetailEKycFailed?.message;
        if (getUpdataDetailEKycFailed && message !== 'INTERNAL_SERVER_ERROR') {
          setToastMsg({
            isOpen: true,
            error: true,
            title: getUpdataDetailEKycFailed?.message,
          });
        }
      }
    },
    [
      getUpdataDetailEKycFailed,
      getUpdataDetailEKycResponse?.data,
      getUpdataValidationCheckResponse?.data,
      router,
      setIsKTPSame,
      setKkpmTemp,
      setLoading,
      setToastMsg,
    ],
  );

  useEffect(() => {
    getUpdataDetailEKycResult(updataAction);
  }, [getUpdataDetailEKycResult, updataAction]);

  const getUpdataResult = useCallback(
    (act) => {
      setLoading(false);
      if (act === SET_UPDATA_FACECOMPARE_SUCCESS) {
        setIsVerified(true);
        setUpdataFaceCompareClear();
        setUserData({
          userData: {
            alreadyLivenessTest: true,
          },
        });
        setLivenessTemp({});
        setTimeout(() => {
          router.push(NAVIGATION.UPDATA.UpdataUploadKK);
        }, 3000);
      }

      if (act === SET_UPDATA_FACECOMPARE_FAILED) {
        if (setUpdataFaceCompareFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          setActiveModalFacecompareError(true);
        }
        setLivenessTemp({});
      }
      setModalCameraActive(false);
      setModalUploadActive(false);
    },
    [
      setLoading,
      setUpdataFaceCompareClear,
      setUserData,
      setLivenessTemp,
      router,
      setUpdataFaceCompareFailed?.message,
    ],
  );

  useEffect(() => {
    getUpdataResult(updataAction);
  }, [getUpdataResult, updataAction]);

  const getKycResult = useCallback(
    (act) => {
      //h5 liveness
      setLoading(false);
      if (act === SET_KYC_H5_LIVENESS_TOKEN_SUCCESS) {
        const data = setKycH5livenessTokenResponse?.data;
        if (data) {
          setLivenessTemp(data);
          const query = {
            url: data?.url,
            navFrom: NAVIGATION.UPDATA.UpdataUploadSelfie,
          };
          router.push(
            {
              pathname: NAVIGATION.LIVENESS.Liveness,
              query,
            },
            NAVIGATION.LIVENESS.Liveness,
          );
          setKycH5livenessTokenClear();
        }
      }
      if (act === SET_KYC_H5_LIVENESS_TOKEN_FAILED) {
        if (setKycH5livenessTokenFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          console.log(setKycH5livenessTokenFailed?.message);
          return;
        }
        console.log(setKycH5livenessTokenFailed?.message);
        setLivenessTemp({});
      }

      if (act === SET_KYC_H5_LIVENESS_RESULT_SUCCESS) {
        setUpdataFaceCompare();
      }
      if (act === SET_KYC_H5_LIVENESS_RESULT_FAILED) {
        if (setKycH5livenessResultFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          setActiveModalError(true);
          return;
        }
        console.log(setKycH5livenessResultFailed?.message);
      }
    },
    [
      setLoading,
      setKycH5livenessTokenResponse?.data,
      setLivenessTemp,
      router,
      setKycH5livenessTokenClear,
      setKycH5livenessTokenFailed?.message,
      setUpdataFaceCompare,
      setKycH5livenessResultFailed?.message,
    ],
  );

  useEffect(() => {
    getKycResult(kycAction);
  }, [getKycResult, kycAction]);

  function renderImageSelfie() {
    return (
      <div>
        <div className="flex justify-center p-6 gap-2">
          <div className="w-14 xm:w-28 md:w-28 flex justify-center items-center flex-col">
            <img src={KycBanner2} alt="" className="w-full xm:w-4/5 md:w-4/5" />
            <p className="font-semibold text-neutral-light-neutral60">
              {trans(locale, lang, 'benar')}
            </p>
          </div>
          <div className="w-14 xm:w-28 md:w-28 flex justify-center items-center flex-col">
            <img src={KycBanner3} alt="" className="w-full xm:w-4/5 md:w-4/5" />
            <p className="font-semibold text-neutral-light-neutral60">
              {trans(locale, lang, 'salah')}
            </p>
          </div>
        </div>
        <div className="border border-dashed " />
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
        <div className="flex justify-center my-6">
          <p className="font-semibold text-neutral-light-neutral60">
            {trans(locale, lang, 'uploadYourSelfie')}
          </p>
        </div>
        <div className="border px-3 md:px-5 divide-y rounded-xl shadow-sm">
          {dataBody?.map((menu, index) => (
            <div
              key={index}
              className="flex items-center gap-2 xm:gap-3 h-auto py-4 md:py-0 md:gap-4 md:h-28">
              <div className="w-14 xm:w-16 md:w-28 flex justify-center items-center">
                <img alt="" src={RedCheck} width={24} height={24} />
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
    let base_url = '';
    let img_step1 = '';
    let img_step2 = '';
    let img_step3 = '';
    let img_step4 = '';
    let img_failed = '';
    let img_success = '';
    let img_btn_camera = '';

    if (!process.env.BASE_URL.includes('uat')) {
      base_url = 'https://life.id' + NAVIGATION.UPDATA.UpdataUploadSelfie;
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
      base_url = 'https://uat.life.id' + NAVIGATION.UPDATA.UpdataUploadSelfie;
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
        {trans(locale, lang, 'lanjut')}
      </Button>
    );
  }

  function renderModalUpload() {
    return (
      <Modal
        isOpen={isModalUploadActive}
        toggle={() => setModalUploadActive(false)}
        noBackground>
        <div className="w-full flex flex-col divide-y-2 rounded-2xl bg-white mb-6">
          <div
            role="button"
            onClick={() => {
              setModalCameraActive(true);
            }}
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
    renderModalUpload;

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
          {trans(locale, lang, 'cobaLagi')}
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
          router.push(
            {
              pathname: NAVIGATION.UPDATA.UpdataUploadKK,
              query: router?.query,
            },
            NAVIGATION.UPDATA.UpdataUploadKK,
          );
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
      <Modal isOpen={isLivenessFailed} size="sm" className="relative">
        <Icon
          icon={ic_close}
          size={20}
          className="absolute top-3 left-3"
          role="button"
          onClick={() => {
            setIsLivenessFailed(false);
            setLivenessTemp({});
          }}
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
        title={trans(locale, lang, 'title')}
        onClickBack={() => {
          router.back();
        }}
        isHelp
      />

      <div className="relative w-full flex justify-center -top-10 sm:px-4 sm:p-4 md:-top-16">
        <div className="z-10 w-full  bg-white md:shadow-md sm:rounded-3xl sm:max-w-2xl">
          <div className="py-4 px-4 sm:px-12">
            <UpdataStep step1 title={trans(locale, lang, 'verifikasiDiri')} />
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
      {renderModalLivenessFailed()}
    </>
  );
}
