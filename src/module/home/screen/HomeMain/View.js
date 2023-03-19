import _ from 'lodash';
import axios from 'axios';
import Icon from 'react-icons-kit';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { trans } from '@cp-util/trans';
import { getUserFlagApi } from '@cp-module/auth/authApi';
import { infoCircle, close } from 'react-icons-kit/fa';
import { API, BASE_URL, NAVIGATION } from '@cp-util/constant';
import locale from './locale';
import { BadgeTick } from '@cp-config/Svgs';
import { Button, Container, MenuBar, Modal, ModalKKPM } from '@cp-component';
import { AnnouncementLocked } from '@cp-config/Images';
import HomeOffer from '../HomeOffer';
import HomeWidget from '../HomeWidget';
import HomeBanner from '../HomeBanner';
import HomeMenuFloating from '../HomeMenuFloating';
import HomeEventHighLight from '../HomeEventHighLight';
import HomeLifeArticle from '../HomeLifeArticel';
import Image from 'next/image';

export default function Page(props) {
  const {
    lang,
    userData,
    token,
    kkpmFlag,
    getNotifCount,
    getNotifCountResponse,
    getPolicyWidgetHome,
    getPolicyWidgetHomeResponse,
    getPendingInvites,
    getPendingInvitesResponse,
    getCurrentSubsResponse,
    setUserData,
    setTemporaryHomeState,
    isUpdataModalAlreadyShowed,
    getProfileUserParty,
    setKkpmTemp,
    setClearKkpm,
    setInvoiceId
  } = props;
 

  moment.locale(lang);
  const router = useRouter();
  const {
    query: { isLogin },
  } = router;
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : '',
  );
  const [inviteePhoto, setInviteePhoto] = useState('');
  const [isLoad, setIsLoad] = useState(true);
  const [wCount, setWCount] = useState(0);
  const [isModalWelcomeActive, setModalWelcomeActive] = useState(false);
  const [showBenefitModal, setBenefitModal] = useState(false);
  const [showPreventLifecardModal, setShowPreventLifeCardModal] =
    useState(false);
  const [showModalKkpm, setShowModalKkpm] = useState(false);

  const anuitasPrimaFlag = useMemo(() => {
    return kkpmFlag?.find((i) => i?.policyType === 'anuitasPrima');
  }, [kkpmFlag]);

  const anuitasRetailFlag = useMemo(() => {
    return kkpmFlag?.find((i) => i?.policyType === 'anuitasRetail');
  }, [kkpmFlag]);

  const translate = (val) => trans(locale, lang, val);

  const handleClickLifeCard = () => {
    if (!token) {
      router.push(NAVIGATION.LOGIN.Login);
    } else {
      const eCardLifesaver = getPolicyWidgetHomeResponse?.data?.eCardLifesaver;
      if (eCardLifesaver?.hasActiveLifesaver) {
        router.push(NAVIGATION.POLICY.PolisLifeCard);
      } else {
        setShowPreventLifeCardModal(true);
      }
    }
  };

  useEffect(() => {
    setClearKkpm();
  }, []);

  //kkpm
  useEffect(() => {
    setTimeout(() => {
      if (
        userData?.alreadyKYC &&
        (anuitasPrimaFlag?.isLastAlterSuccess === null ||
          anuitasPrimaFlag?.isLastAlterSuccess === undefined ||
          anuitasRetailFlag?.isLastAlterSuccess === null ||
          anuitasRetailFlag?.isLastAlterSuccess === undefined)
      ) {
        const flag = !!(
          userData?.alreadyKYC &&
          (anuitasPrimaFlag?.isIssuedPolicy ||
            anuitasRetailFlag?.isIssuedPolicy)
        );
        setShowModalKkpm(flag);
      }
    }, 3000);
  }, [anuitasPrimaFlag, anuitasRetailFlag, userData?.alreadyKYC]);

  useEffect(() => {
    if (token) {
      getNotifCount();
      getPolicyWidgetHome();
      getPendingInvites();
      getProfileUserParty();
      getUserFlagApi()
        .then((res) => {
          const data = res?.data?.data;

          setUserData({
            userData: {
              alreadyLivenessTest: data?.alreadyLivenessTest,
              isReKYC: data?.isReKYC,
              isReLivenessTest: data?.isReLivenessTest,
              isReUploadIdCard: data?.isReUploadIdCard,
              isReLivenessTestAndReUploadIdCard:
                data?.isReLivenessTestAndReUploadIdCard,
              alreadySetMPin: data?.alreadySetMPin,
              alreadySetPin: data?.alreadySetPin,
            },
          });
        })
        .catch((error) => {
          throw error;
        });
    }
    setIsLoad(false);
    setModalWelcomeActive(true);
  }, []);

  useEffect(() => {
    setInvoiceId({
      invoiceMaster: '',
      type: '',
    });
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  // Next Benefit
  const nextBenefitArray = useMemo(() => {
    const res = getPolicyWidgetHomeResponse?.data;
    if (!res) {
      return [];
    }

    let dataArray = [];
    if (res?.mantapWidget) {
      dataArray = [...dataArray, ...res?.mantapWidget];
    }
    if (res?.anuitasWidget) {
      dataArray = [...dataArray, ...res?.anuitasWidget];
    }

    if (_.isEmpty(dataArray)) {
      return [];
    }
    return dataArray.sort((a, b) => moment(a.date).diff(moment(b.date)));
  }, [getPolicyWidgetHomeResponse?.data]);

  const renderNextBenefitModal = () => {
    if (_.isEmpty(nextBenefitArray)) {
      return null;
    }
    return (
      <Modal
        className="relative"
        isOpen={showBenefitModal}
        toggle={() => setBenefitModal(false)}>
        <div className="w-full h-full">
          <div className="w-full flex flex-row mb-5">
            <Icon
              icon={close}
              size={20}
              onClick={() => setBenefitModal(false)}
            />
            <p className="font-bold ml-2">{translate('manfaatSelanjutnya')}</p>
          </div>
          {nextBenefitArray.map((val, index) => (
            <div
              key={index}
              className={
                index + 1 === nextBenefitArray.length
                  ? 'w-full h-auto p-2 flex flex-col my-2 font-semibold'
                  : 'w-full h-auto p-2 flex flex-col my-2 border-b-2 font-semibold'
              }>
              <p>{val.productName}</p>
              <p>{val.policyNo}</p>
              <div className="flex flex-row justify-between">
                <p className="text-sm opacity-70">
                  {moment(val.date).format('D MMM YYYY')}
                </p>
                <p className="text-sm text-[#009262]">
                  Rp.{' '}
                  {val.benefit.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    );
  };

  useEffect(() => {
    if (getPendingInvitesResponse?.listInviting?.length) {
      const data =
        getPendingInvitesResponse?.listInviting[
          getPendingInvitesResponse?.listInviting.length - 1
        ].inviteePhoto;

      if (data !== null) {
        axios
          .get(`${BASE_URL}${API.USER.photoThumbnail}/${data}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
          })
          .then((response) => {
            setInviteePhoto(response.data);
          });
      }
    }
  }, [getPendingInvitesResponse]);

  if (isLoad) {
    return null;
  }

  function renderModalWolcome() {
    if (!isLogin) return null;

    return (
      <Modal
        className="relative"
        isOpen={isModalWelcomeActive}
        toggle={() => setModalWelcomeActive(false)}>
        <div className="absolute -ml-4 -mt-28 w-full flex justify-center mb-6">
          <img src={BadgeTick} width={146} height={146} />
        </div>
        <div className="text-center mb-4 sm:mb-8 text-h6 text-neutral-light-neutral90 font-bold mt-16">
          {trans(locale, lang, 'Selamat Datang di Life by IFG')}
        </div>
        <Button
          className="mb-4"
          type="linear-gradient"
          onButtonClick={() => setModalWelcomeActive(false)}
          shadow
          full>
          {trans(locale, lang, 'ok')}
        </Button>
      </Modal>
    );
  }
  function renderModalLifecard() {
    return (
      <Modal isOpen={showPreventLifecardModal}>
        <div className="flex flex-col items-center relative text-center pt-8 pb-1">
          <div className="absolute top-[-115px] text-center">
            <Image src={AnnouncementLocked} width={150} height={150} />
          </div>
          <p className="font-bold mt-8 mb-3 text-base xm:text-xl">
            {trans(locale, lang, 'lifecardTitle')}
          </p>
          <p className="text-neutral-700 text-sm xm:text-base">
            {trans(locale, lang, 'lifecardSubtitle')}
          </p>

          <Button
            full
            outline
            bordered
            className="mt-8 mb-3 text-xs xm:text-sm md:text-base"
            onButtonClick={() => setShowPreventLifeCardModal(false)}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            full
            type="linear-gradient"
            className="text-xs xm:text-sm"
            onButtonClick={() =>
              router.push(NAVIGATION.LIFESAVER.LifesaverMain)
            }>
            {trans(locale, lang, 'lihatProteksiLifesaver')}
          </Button>
        </div>
      </Modal>
    );
  }

  // kkpm
  const renderModalKkpm = () => {
    const _state = {
      anuitasPrima: {
        policyName: 'IFG Anuitas Prima',
      },
      anuitasRetail: {
        policyName: 'IFG Anuitas',
      },
    };

    const onClickClose = () => {
      setShowModalKkpm(false);
      setTemporaryHomeState({
        isUpdataModalAlreadyShowed: true,
      });
    };

    const onClickAnuitasPrima = () => {
      setKkpmTemp({
        navFrom: NAVIGATION.HOME.Home,
        category: 'reminder',
        source: anuitasPrimaFlag?.source,
        isUploadedKKAndKTP: anuitasPrimaFlag?.isUploadedKKAndKTP,
      });
      setTimeout(() => {
        router.push(NAVIGATION.UPDATA.Updata);
      }, 500);
      onClickClose();
    };

    const onClickAnuitasRetail = () => {
      setKkpmTemp({
        navFrom: NAVIGATION.HOME.Home,
        category: 'reminder',
        source: anuitasRetailFlag?.source,
        isUploadedKKAndKTP: anuitasRetailFlag?.isUploadedKKAndKTP,
      });
      setTimeout(() => {
        router.push(NAVIGATION.UPDATA.Updata);
      }, 500);
      onClickClose();
    };

    

    return (
      <ModalKKPM
        lang={lang}
        _state={_state}
        isOpen={showModalKkpm}
        setClose={onClickClose}
        anuitasPrimaFlag={anuitasPrimaFlag}
        anuitasRetailFlag={anuitasRetailFlag}
        onClickAnuitasPrima={onClickAnuitasPrima}
        onClickAnuitasRetail={onClickAnuitasRetail}
        isUpdataModalAlreadyShowed={isUpdataModalAlreadyShowed}
      />
    );
  };

  return (
    <>
      <div className="relative w-full flex justify-center pb-20 bg-[#F2F2F2]">
        {/* {renderImageContainer()} */}
        <Container className="z-10 !my-0" fullScreen noBackground>
          <HomeBanner
            notification={getNotifCountResponse}
            getCurrentSubsResponse={getCurrentSubsResponse}
          />
          <div className="relative -top-6 md:-top-10 w-full px-3 md:px-[5%] xl:px-0 sm:pt-4">
            <HomeMenuFloating onClickLifeCard={handleClickLifeCard} />
            {/* <HomeWidget
              anuitasPrimaFlag={anuitasPrimaFlag}
              anuitasRetailFlag={anuitasRetailFlag}
            /> */}
            <HomeEventHighLight />
            <HomeOffer />
            <HomeLifeArticle />
          </div>
          <MenuBar />
        </Container>
      </div>
      {renderNextBenefitModal()}
      {renderModalLifecard()}
      {renderModalKkpm()}
    </>
  );
}
