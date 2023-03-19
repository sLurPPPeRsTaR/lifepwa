import { useState, useCallback, useEffect, useRef, Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
import { Button, HeaderPage, Modal } from '@cp-component';
import {
  selfie1,
  KKBenar,
  KKSalah,
  ktp_failed1,
  ktp_failed2,
  ktp_failed3,
  Check,
  SwitchCamera,
  GagalTerkirim,
} from '@cp-config/Images';
import {
  BtnBack,
  KycDoc,
  KycStep1Active,
  pHelpBlack,
  RedCheck,
  UpdataStep3Inactive,
  UpdataStep4Inactive,
  UpdataStep2Active,
} from '@cp-config/Svgs';
import {
  SET_UPDATA_KK_SUCCESS,
  SET_UPDATA_KK_FAILED,
} from '@cp-module/updata/updataConstant';
import { NAVIGATION } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import clsx from 'classnames';
import locale from './locale';
import UpdataStep from '../UpdataStep';

export default function View({
  lang,
  updataAction,
  setUpdataKKResponse,
  setUpdataKKFailed,
  setUpdataKK,
  setUpdataKKClear,
  setLoading,
  setIsKKSame,
  kkpmTempState,
  setKkpmTemp,
  kkpmDataKkState,
  setKkpmDataKk,
  setClearKkpm,
}) {
  const router = useRouter();
  const uploadFile = useRef(null);
  const [isModalUploadActive, setModalUploadActive] = useState(false);
  const [isModalCameraActive, setModalCameraActive] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [activeArrowBack, setActiveArrowBack] = useState(false);
  const [currentCamera, setCurrentCamera] = useState('user');
  const [showFailedUpdataKKModal, setShowFailedUpdataKKModal] = useState(false);
  const [width, setWidth] = useState(
    typeof window === 'undefined' ? 0 : window.innerWidth,
  );

  const params = router?.query;

  const setUpdataKKResult = useCallback(
    (act) => {
      if (act === SET_UPDATA_KK_SUCCESS) {
        setLoading(false);
        setKkpmDataKk(setUpdataKKResponse);
        setUpdataKKClear();
        setModalUploadActive(false);
        setIsModalSuccess(true);
        setTimeout(() => {
          setIsModalSuccess(false);
          router.push(
            {
              pathname: NAVIGATION.UPDATA.UpdataForm,
              query: router?.query,
            },
            NAVIGATION.UPDATA.UpdataForm,
          );
        }, 2000);
      }

      if (act === SET_UPDATA_KK_FAILED) {
        if (setUpdataKKFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setUpdataKKFailed?.message === 'FILE_EXTENSION_NOT_SUPPORTED') {
            setIsModalError(true);
            return;
          }
          setShowFailedUpdataKKModal(true);
          return;
        }
        setInternalServerError(true);
      }
    },
    [
      router,
      setKkpmDataKk,
      setLoading,
      setUpdataKKClear,
      setUpdataKKFailed?.message,
      setUpdataKKResponse,
    ],
  );

  useEffect(() => {
    setUpdataKKResult(updataAction);
  }, [setUpdataKKResult, updataAction]);

  const renderUpDataKKFailedModal = () => {
    const setClose = () => setShowFailedUpdataKKModal(false);
    return (
      <Modal
        size="sm"
        isOpen={showFailedUpdataKKModal}
        toggle={setClose}
        className="relative">
        <div className="relative md:p-3">
          <img
            src={GagalTerkirim}
            className={clsx(
              'absolute justify-center w-40 md:w-64 flex top-6 xm:w-40 xm:top-20 left-1/2 z-10 -translate-x-1/2 -translate-y-[180px]',
              width === 280 ? 'top-24' : null,
            )}
          />
          <p className="pt-10 xm:pt-12 xm:pb-5 font-bold text-center my-3 text-base md:text-xl">
            {trans(locale, lang, 'gagalUploadDokumen')}
          </p>
          <p className=" font-medium text-center opacity-60 text-sm md:text-base">
            <span>{trans(locale, lang, 'dokumenYangKamu')}</span>
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
  };

  function renderHeader() {
    return (
      <div className="relative h-14 flex items-center">
        <div
          role="button"
          onClick={() =>
            activeArrowBack ? setActiveArrowBack(false) : router.back()
          }
          className="absolute z-10 w-10 h-10 flex justify-center items-center">
          <Image src={BtnBack} width={24} height={24} />
        </div>
        <div className="absolute w-full text-center text-body1 font-bold">
          {/* {trans(locale, lang, activeArrowBack ? 'pusatBantuan' : 'title')} */}
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

  function renderImageKK() {
    return (
      <div>
        <div className="flex justify-center p-6 gap-2">
          <div className="xl:w-40 xm:w-28 md:w-28 flex justify-center items-center flex-col">
            <img src={KKBenar} alt="" className="w-full xm:w-4/5 md:w-4/5" />
            <p className="font-semibold text-neutral-light-neutral60">
              {trans(locale, lang, 'benar')}
            </p>
          </div>
          <div className="xl:w-40 xm:w-28 md:w-28 flex justify-center items-center flex-col">
            <img src={KKSalah} alt="" className="w-full xm:w-4/5 md:w-4/5" />
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
            {trans(locale, lang, 'fotoKK')}
          </p>
        </div>
        <div className="border px-3 md:px-5 divide-y rounded-xl shadow-sm">
          {dataBody?.map((menu, index) => (
            <div
              key={index}
              className="flex items-center xm:gap-3 h-auto py-4 md:py-0 md:h-24">
              <div className="w-14 xm:w-16 md:flex justify-end items-end xm:flex">
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
      <>
        {kkpmTempState?.isUploadedKKAndKTP && (
          <Button
            outline
            className="mb-4 mt-12 text-sm md:text-base"
            onButtonClick={() => {
              setIsKKSame(true);
              router.push(
                {
                  pathname: NAVIGATION.UPDATA.UpdataForm,
                  query: router?.query,
                },
                NAVIGATION.UPDATA.UpdataForm,
              );
            }}
            full>
            {trans(locale, lang, 'kkMasihSama')}
          </Button>
        )}

        <Button
          type="linear-gradient"
          className={clsx(
            'mb-4 text-sm md:text-base',
            !kkpmTempState?.isUploadedKKAndKTP ? 'mt-12' : '',
          )}
          onButtonClick={() => {
            setModalUploadActive(true);
          }}
          full>
          {trans(locale, lang, 'uploadKk')}
        </Button>
      </>
    );
  }

  function renderModalUpload() {
    const onFileChange = (e) => {
      setLoading(true);
      e.preventDefault();
      const fileKK = e.target.files[0];
      setIsKKSame(false);
      setUpdataKK(fileKK);
      setModalUploadActive(false);
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
          <div className="file-upload-container">
            <input
              ref={uploadFile}
              className="absolute -z-10 opacity-0"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
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
      facingMode: currentCamera,
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
              <>
                <div className="md:hidden xm:relative z-10 flex justify-center items-center bg-red-500">
                  <div className="xm:w-full absolute z-10 flex justify-end bottom-4 right-3">
                    <img
                      src={SwitchCamera}
                      className="w-10 h-10 xm:bottom-4"
                      onClick={() =>
                        setCurrentCamera((prevState) =>
                          prevState === 'user' ? 'environment' : 'user',
                        )
                      }
                    />
                  </div>
                </div>
                <Button
                  type="linear-gradient"
                  className="mt-6"
                  onButtonClick={async () => {
                    const imageSrc = getScreenshot();
                    const blob = await fetch(imageSrc).then((res) =>
                      res.blob(),
                    );
                    setIsKKSame(false);
                    setUpdataKK(blob, null, blob.type);
                    setLoading(true);
                  }}
                  full>
                  {trans(locale, lang, 'capturePhoto')}
                </Button>
              </>
            )}
          </Webcam>
        </div>
      </Modal>
    );
  }

  const renderModalError = () => {
    const listGuide = [
      {
        title: trans(locale, lang, 'pastikanKartuKeluarga'),
        icon: ktp_failed1,
      },
      {
        title: trans(locale, lang, 'pastikanFotoKartuKeluargaBerada'),
        icon: ktp_failed2,
      },
      {
        title: trans(locale, lang, 'pastikanFotoKartuKeluargaTerlihat'),
        icon: ktp_failed3,
      },
    ];
    return (
      <Modal isOpen={isModalError} className="relative max-w-[375px]">
        <div className="relative p-3">
          <div>
            <p className="text-xl font-bold mb-2 text-center">
              {trans(locale, lang, 'fotoKamuBelum')}
            </p>
            <p className="text-base font-medium opacity-60">
              {trans(locale, lang, 'ikutiPanduanDibawah')}
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
            onButtonClick={() => setIsModalError(false)}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </div>
      </Modal>
    );
  };

  const renderModalSuccess = () => {
    return (
      <Modal
        size="sm"
        className="relative"
        isOpen={isModalSuccess}
        toggle={() => {
          setIsVerified(false);
          router.push(
            {
              pathname: NAVIGATION.UPDATA.UpdataForm,
              query: router?.query,
            },
            NAVIGATION.UPDATA.UpdataForm,
          );
        }}>
        <div className="py-8">
          <img src={Check} className="w-2/5 mx-auto" />
          <p className="text-center  text-neutral-light-neutral90 font-bold mt-10 mb-4 text-base md:mt-16 xm:text-h6">
            {trans(locale, lang, 'notifSuccess')}
          </p>
          {/* test */}
          {/* <p className="text-center text-sm">
            {trans(locale, lang, 'kamuTelahMelakukan')}
          </p> */}
        </div>
      </Modal>
    );
  };

  return (
    <>
      <HeaderPage
        isHelp
        title={trans(locale, lang, 'title')}
        onClickBack={() => {
          setKkpmDataKk({});
          router.back();
        }}
      />
      <div className="relative w-full flex justify-center -top-10 sm:px-4 sm:p-4 md:-top-16">
        <div className="z-10 w-full  bg-white md:shadow-md sm:rounded-3xl sm:max-w-2xl">
          <div className="py-4 px-4 sm:px-12">
            <UpdataStep step2 title={trans(locale, lang, 'uploadKk')} />
            {renderImageKK()}
            {renderBody()}
            {renderButton()}
          </div>
        </div>
      </div>
      {renderModalSuccess()}
      {renderModalUpload()}
      {WebcamComponent()}
      {renderModalError()}
      {renderUpDataKKFailedModal()}
    </>
  );
}
