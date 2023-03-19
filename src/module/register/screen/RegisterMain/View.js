import axios from 'axios';
import Image from 'next/image';
import locale from './locale';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { trans } from '@cp-util/trans';
import { GoogleLogin } from 'react-google-login';
import { getBrowser } from '@cp-util/common';
import { useEffect, useCallback, useState } from 'react';
import { setCheckEmail } from '@cp-module/profile/profileApi';
import { BadgeTick, BtnBack, Close, Google1 } from '@cp-config/Svgs';
import { SET_LOGIN_SOCIAL_SUCCESS } from '@cp-module/login/loginConstant';
import {
  Button,
  Container,
  KebijakanPrivasi,
  Modal,
  SyaratdanKetentuan,
} from '@cp-component';
import {
  IconRegister,
  RegisterIllustration,
  lifeIdRed,
  IconIfgRed,
} from '@cp-config/Images';
import {
  GOOGLE_PEOPLE_API,
  NAVIGATION,
  RESPONSE_STATUS,
  DEVICE_PLATFORM,
} from '@cp-util/constant';

export default function Page({
  deviceId,
  lang,
  loginAction,
  setLoading,
  setLoginSocial,
  setRequestOtpClear,
}) {
  const router = useRouter();
  const {
    query: { product },
  } = router;
  const [isModalSuccessActive, setModalSuccessActive] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showKetentuan, setShowKetentuan] = useState(false);

  const responseGoogle = async (response) => {
    const {
      data: { names, emailAddresses },
    } = await axios.get(GOOGLE_PEOPLE_API + response?.accessToken);

    try {
      setCheckEmail({
        token: response?.accessToken,
        channelType: 'GOOGLE',
        email: emailAddresses[0].value,
      })
        .then(() => {
          setLoginSocial({
            name: names?.length ? names[0].displayName : '',
            dob: null,
            email: emailAddresses[0].value,
            channelUid: emailAddresses[0].metadata.source.id,
            token: response?.accessToken,
            channelType: 'GOOGLE',
            deviceId,
            deviceType: getBrowser(),
            deviceLocation: null,
            devicePlatform: DEVICE_PLATFORM,
          });
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === RESPONSE_STATUS.BAD_REQUEST) {
            router.push(
              {
                pathname: NAVIGATION.REGISTER.RegisterNextStep,
                query: {
                  name: names?.length ? names[0].displayName : '',
                  dob: null,
                  email: emailAddresses[0].value,
                  channelUid: emailAddresses[0].metadata.source.id,
                  token: response?.accessToken,
                  channelType: 'GOOGLE',
                  product,
                },
              },
              NAVIGATION.REGISTER.RegisterNextStep,
            );
          } else {
            toast.error('Check Email INTERNAL_SERVER_ERROR');
          }
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const setBothLoginResult = useCallback(
    (act) => {
      if (act === SET_LOGIN_SOCIAL_SUCCESS) {
        if (product) {
          router.push(
            {
              pathname: NAVIGATION.LIFESAVER.LifesaverMain,
              query: { product },
            },
            NAVIGATION.LIFESAVER.LifesaverMain,
          );
        } else {
          router.push(
            {
              pathname: NAVIGATION.HOME.Home,
              query: {
                isLogin: true,
              },
            },
            NAVIGATION.HOME.Home,
          );
        }
      }
      setLoading(false);
    },
    [router, setLoading],
  );

  useEffect(() => {
    setBothLoginResult(loginAction);
  }, [loginAction, setBothLoginResult]);

  // Banner Content
  function renderHeader() {
    return (
      <div className="relative flex items-center py-5 pl-6">
        <div role="button" onClick={() => router.back()}>
          <img src={BtnBack} className="w-5" />
        </div>
        <p className="font-bold text-base md:text-h6 pl-4">
          {trans(locale, lang, 'registrasi')}
        </p>
      </div>
    );
  }

  const renderImageContainer = () => {
    return (
      <div className="w-full flex justify-center items-center  mb-4">
        <img src={RegisterIllustration} className="w-1/2" />
      </div>
    );
  };

  const renderCaptionContainer = () => {
    return (
      <div className="w-full mb-8 text-center">
        <p className=" font-bold mb-2 text-sm md:text-h6">
          {trans(locale, lang, 'selamatDatangDiLife')}
        </p>
        <p className="text-xs md:text-body2 text-mediumGray-light-mediumGray font-medium px-[20%]">
          {trans(locale, lang, 'daftarkanDiriAnda')}
        </p>
      </div>
    );
  };

  const renderButtonContainer = () => {
    return (
      <div className="flex flex-col items-center">
        <Button
          outline
          className="mb-5 w-[250px] s:w-full text-sm md:text-base !text-gray-600"
          onButtonClick={() => {
            setRequestOtpClear();
            router.push(
              {
                pathname: NAVIGATION.REGISTER.RegisterInput,
                query: { product },
              },
              NAVIGATION.REGISTER.RegisterInput,
            );
          }}>
          <img src={IconIfgRed} className="w-5 mr-1" />
          {trans(locale, lang, 'daftarDenganIfgId')}
        </Button>
        <GoogleLogin
          clientId={process.env.GOOGLE_DEVICE_ID}
          render={(renderProps) => (
            <Button
              className="!text-darkGray-light-darkGray mb-5 w-[250px] s:w-full text-sm md:text-base"
              onButtonClick={() => {
                setRequestOtpClear();
                renderProps.onClick();
              }}
              disabled={renderProps.disabled}
              prefixIcon={<Image src={Google1} width={24} height={24} />}
              shadow>
              {trans(locale, lang, 'daftarLewatGoogle')}
            </Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        {/* <Button
          className="text-darkGray-light-darkGray mb-5"
          prefixIcon={<Image src={Facebook1} width={24} height={24} />}
          shadow>
          {trans(locale, lang, 'daftarLewatFacebook')}
        </Button> */}
      </div>
    );
  };

  function renderFooterContainer() {
    return (
      <div className="flex flex-col">
        <div className="flex justify-center gap-1 pb-8">
          <div className="text-body2 text-mediumGray-light-mediumGray font-semibold">
            {trans(locale, lang, 'sudahPunyaAkun')}
          </div>
          <div
            role="button"
            className="text-body2 text-primary-light-primary90 font-semibold underline"
            onClick={() =>
              router.push(
                {
                  pathname: NAVIGATION.LOGIN.Login,
                  query: { product },
                },
                NAVIGATION.LOGIN.Login,
              )
            }>
            {trans(locale, lang, 'masuk')}
          </div>
        </div>
        {/* <text className="text-sm font-semibold pb-8">
          {trans(locale, lang, 'dilindungiReCaptcha')}{' '}
          <span className="text-red-500" onClick={() => setShowPrivacy(true)}>
            {trans(locale, lang, 'kebijakanPrivasi')}
          </span>{' '}
          {trans(locale, lang, 'dan')}{' '}
          <span className="text-red-500" onClick={() => setShowKetentuan(true)}>
            {trans(locale, lang, 'ketentuanLayanan')}
          </span>
        </text> */}
      </div>
    );
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
            <img src={BadgeTick} width={146} height={146} />
          </div>
          <div className="text-h6 text-neutral-light-neutral80 font-bold text-center mb-1">
            {trans(locale, lang, 'andaBerhasilTerdaftar')}
          </div>
          <div className="text-body2 text-mediumGray-light-mediumGray font-medium text-center mb-8">
            {trans(locale, lang, 'lanjutKeProses')}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              bordered="primary-light-primary90"
              onButtonClick={() => {
                if (product) {
                  router.push(
                    {
                      pathname: NAVIGATION.LIFESAVER.LifesaverMain,
                      query: { product },
                    },
                    NAVIGATION.LIFESAVER.LifesaverMain,
                  );
                } else {
                  router.push(
                    {
                      pathname: NAVIGATION.HOME.Home,
                      query: {
                        isLogin: true,
                      },
                    },
                    NAVIGATION.HOME.Home,
                  );
                }
              }}
              outline
              shadow
              full>
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

  const renderKebijakanPrivasi = () => {
    return (
      <div className="w-full md:h-[70vh] bg-gray-50">
        <div className="w-full h-full">
          <div className="w-[100%] h-[10%] bg-white shadow-lg z-30 flex flex-row relative">
            <div
              role="button"
              onClick={() => setShowPrivacy(false)}
              className="ml-5 flex justify-center items-center">
              <Image src={BtnBack} width={24} height={24} />
            </div>
            <div className="flex justify-center items-center mr-10 w-full text-xl font-bold">
              {trans(locale, lang, 'kebijakanPrivasi')}
            </div>
          </div>
          <div className="w-full h-[80%]">
            <KebijakanPrivasi />
          </div>
          <div className="w-full h-[10%] grid place-items-center relative">
            <div className="w-[90%] h-full grid place-items-center">
              <Button
                type="linear-gradient"
                onButtonClick={() => {
                  setShowPrivacy(false);
                }}
                shadow
                full>
                {trans(locale, lang, 'Ok')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSyaratDanKetentuan = () => {
    return (
      <div className="w-full md:h-[70vh] bg-gray-50">
        <div className="w-full h-full">
          <div className="w-[100%] h-[10%] bg-white shadow-lg z-30 flex flex-row relative">
            <div
              role="button"
              onClick={() => setShowKetentuan(false)}
              className="ml-5 flex justify-center items-center">
              <Image src={BtnBack} width={24} height={24} />
            </div>
            <div className="flex justify-center items-center mr-10 w-full text-xl font-bold">
              {trans(locale, lang, 'ketentuanLayanan')}
            </div>
          </div>
          <div className="w-full h-[80%]">
            <SyaratdanKetentuan />
          </div>
          <div className="w-full h-[10%] grid place-items-center relative">
            <div className="w-[90%] h-full grid place-items-center">
              <Button
                type="linear-gradient"
                onButtonClick={() => {
                  setShowKetentuan(false);
                }}
                shadow
                full>
                {trans(locale, lang, 'Ok')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Container className="relative bg-transparent">
        <div className="relative top-1/2 transform translate-y-[-50%] pb-5 rounded-2xl md:border md:shadow-lg h-full md:h-auto bg-white">
          {showPrivacy || showKetentuan ? null : renderHeader()}
          <div className="relative top-1/2 transform translate-y-[-60%] md:translate-y-0 md:top-0">
            {showPrivacy || showKetentuan ? null : renderImageContainer()}
            {showPrivacy || showKetentuan ? null : renderCaptionContainer()}
            {showPrivacy || showKetentuan ? null : renderButtonContainer()}
            {showPrivacy || showKetentuan ? null : renderFooterContainer()}
          </div>
          {showPrivacy ? renderKebijakanPrivasi() : null}
          {showKetentuan ? renderSyaratDanKetentuan() : null}
        </div>
      </Container>

      {renderModalSuccess()}
    </>
  );
}
