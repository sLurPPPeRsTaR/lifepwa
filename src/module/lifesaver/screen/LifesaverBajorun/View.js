import clsx from 'classnames';
import { Button, Container, Modal } from '@cp-component';
import {
  VoucherLine,
  Close,
  BajoRunInfo,
  LifesaverBack1,
} from '@cp-config/Svgs';
import { NAVIGATION } from '@cp-util/constant';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { LifeSaver, Shield, Toa } from '@cp-config/Images';
import { setRupiah } from '@cp-util/common';
import locale from './locale';
import { trans } from '@cp-util/trans';

export default function Page({
  alreadyKYC,
  setLoading,
  lang,
  userId,
  getCampaign,
  getBajoRunStep,
  alreadyLivenessTest,
  getCampaignResponse,
  getEligibleSubmission,
  getEligibleSubmissionError,
  getEligibleSubmissionResponse,
  setWaiting,
  setWaitingClear,
  setWaitingError,
  setWaitingResponse,
  getIsUserEligible,
  setCustomerCare,
  setAvailableOnMobile,
}) {
  const router = useRouter();
  const translate = (val) => trans(locale, lang, val);
  const {
    query: { isBajoRunAccess },
  } = router;

  const [isEligible, setIsEligible] = useState('');
  const [isModalTnCActive, setIsModalTnCActive] = useState(false);
  const [isModalEligibleActive, setIsModalEligibleActive] = useState(false);
  const [showNotifApp, setShowNotifApp] = useState(true);
  // Handle Rendering
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    getBajoRunStep({ isBajoRunProgress: true });
    getCampaign('Bajo');
  }, []);

  useEffect(() => {
    if (userId) {
      getEligibleSubmission('bajo');
      getIsUserEligible();
    } else {
      setIsRender(true);
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (getEligibleSubmissionResponse) {
      setIsEligible('SUCCESS');
      setLoading(false);
    }
  }, [getEligibleSubmissionResponse]);

  useEffect(() => {
    if (getEligibleSubmissionError?.message) {
      setIsEligible(getEligibleSubmissionError?.message);
      setLoading(false);

      if (isBajoRunAccess) {
        setIsModalEligibleActive(true);
      }
    }
  }, [getEligibleSubmissionError]);

  useEffect(() => {
    if (isBajoRunAccess) {
      if (!alreadyKYC) {
        router.push({
          pathname: alreadyLivenessTest
            ? NAVIGATION.KYC.KycUploadKTP
            : NAVIGATION.KYC.KycMain,
        });
        return;
      }

      // Not Have Access Yet - Dont Delete
      // router.push(
      //   {
      //     pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
      //     query: {
      //       product: 'lifesaver',
      //       from: 'bajoRun',
      //     },
      //   },
      //   NAVIGATION.LIFESAVER.LifesaverConfirm,
      // );
    }
  }, [isBajoRunAccess]);

  useEffect(() => {
    if (setWaitingResponse?.status) {
      setIsModalEligibleActive(false);
      setIsShowModalRemember(true);
    }
  }, [setWaitingResponse]);

  useEffect(() => {
    if (setWaitingError?.message) {
      if (setWaitingError.message === 'DATA_ALREADY_EXISTS') {
        setIsModalEligibleActive(false);
        setIsShowModalRemember(true);
      }
      if (setWaitingError.message === 'DATA_NOT_EXISTS') {
        setIsModalEligibleActive(false);
        setIsShowModalRemember(true);
      }
    }
  }, [setWaitingError]);

  useEffect(() => {
    if (isEligible) {
      setIsRender(true);
    }
  }, [isEligible]);

  const onButtonClick = () => {
    setLoading(true);
    if (!userId) {
      router.push({
        pathname: NAVIGATION.REGISTER.Register,
      });

      return;
    }

    switch (isEligible) {
      case 'POLICY_IN_SUBMIT_STATUS_NOT_FOUND':
      case 'POLICY_NOT_FOUND':
        setIsModalEligibleActive(true);
        break;
      case 'INVALID_EKYC':
        onHandleNotKyc();
        break;
      case 'SUCCESS':
        setAvailableOnMobile(true);
        break;
      default:
        break;
    }

    setLoading(false);
  };

  const onHandleNotKyc = useCallback(() => {
    if (!userId) {
      return null;
    }

    if (!alreadyKYC) {
      router.push({
        pathname: alreadyLivenessTest
          ? NAVIGATION.KYC.KycUploadKTP
          : NAVIGATION.KYC.KycMain,
      });
    }

    router.push({
      pathname: NAVIGATION.KYC.KycConfPin,
    });
  }, [alreadyKYC, alreadyLivenessTest, router, userId]);

  const onSubmitAgreement = () => {
    router.push(
      {
        pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
        query: {
          product: 'lifesaver',
          from: 'bajoRun',
          recurring: false,
        },
      },
      NAVIGATION.LIFESAVER.LifesaverConfirm,
    );

    getBajoRunStep({ isBajoRunProgress: false });
  };

  // Banner Content
  function renderCard() {
    if (!getCampaignResponse) return null;

    return (
      <div className="rounded-[10px] bg-[#FAFAFA] mb-4">
        <div className="p-4">
          <img
            src={getCampaignResponse?.[0]?.eventBanner}
            alt={getCampaignResponse?.[0]?.eventName}
            className="mx-auto rounded-lg"
          />
        </div>
        <div className="text-[#0B0B0B] px-6 py-4 mb-4">
          <div className="font-bold text-xl mb-2">
            {lang === 'id'
              ? getCampaignResponse?.[0]?.eventTitleId
              : getCampaignResponse?.[0]?.eventTitleEn}
          </div>
          <div className="font-medium text-body2">
            {lang === 'id'
              ? getCampaignResponse?.[0]?.eventSubtitleId
              : getCampaignResponse?.[0]?.eventSubtitleEn}
          </div>
        </div>
        <div className="flex justify-between gap-0 items-center">
          <div className="h-6 w-4 rounded-r-full bg-[#F32D33]" />
          <div>
            <Image src={VoucherLine} width={300} height={24} />
          </div>
          <div className="h-6 w-4 rounded-l-full bg-[#F32D33]" />
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between mb-6 items-center">
            <div className="max-w-[106px] h-auto">
              <img src={LifeSaver} />
            </div>
            <div className="rounded-full text-caption1 text-white px-2 py-1 w-max bg-[#00B76A]">
              GRATIS {getCampaignResponse?.[0]?.eventFreeFor}-BULAN
            </div>
          </div>
          <div className="text-[#030D1B] text-body2 mb-6">
            {lang === 'id'
              ? getCampaignResponse?.[0]?.eventDescId
              : getCampaignResponse?.[0]?.eventDescEn}
          </div>
          <div className="mb-2">
            <Button
              type="linear-gradient"
              className="mx-auto"
              onButtonClick={onButtonClick}>
              Mulai Berlangganan
            </Button>
          </div>
          <div className="text-[#A5A5A5] text-center text-caption1 font-medium">
            Hanya {setRupiah(getCampaignResponse?.[0]?.eventPrice)} bulan
            selanjutnya
          </div>
        </div>
      </div>
    );
  }

  function renderAlert() {
    return (
      <div className="mb-8">
        <div></div>
        <div className="text-[#FAFAFA] flex items-center gap-2 text-caption1 px-4 py-2 rounded-2xl bg-white/25">
          <div className="w-full !max-w-[24px] !h-6 flex items-center">
            <Image src={BajoRunInfo} width={24} height={24} />
          </div>
          <div className="grow">
            Hadiah ini khusus untuk peserta IFG Labuan Bajo Marathon
          </div>
        </div>
      </div>
    );
  }

  function renderFooter() {
    return (
      <div role="button" className="text-center text-sm py-5 text-white">
        <p>{translate('btnHelp1')}</p>
        <p className="font-bold pt-1 pb-5">
          {translate('btnHelp2')}
          <span
            className="text-sm underline hover:no-underline"
            onClick={() => setCustomerCare(true)}>
            Customer Care
          </span>
          {translate('btnHelp3')}
        </p>
      </div>
    );
  }

  function renderModalTnC() {
    return (
      <Modal
        isOpen={isModalTnCActive}
        toggle={() => setIsModalTnCActive(false)}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-4">
          <div
            role="button"
            className="absolute flex items-center left-0"
            onClick={() => {
              setIsModalTnCActive(false);
            }}>
            <Image src={Close} width={32} height={32} />
          </div>
          <div className="text-black/80 font-semibold">
            Syarat dan Ketentuan
          </div>
        </div>
        <p className="text-body2 leading-6 font-medium text-neutral-light-neutral80 mb-6">
          Saya menyatakan telah setuju dan memahami{' '}
          <span
            onClick={() => setShowModalLsTnc(true)}
            className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
            Syarat & Ketentuan IFG Life
          </span>{' '}
          serta{' '}
          <span
            onClick={() => setShowModalLsRiplay(true)}
            className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
            Ringkasan Informasi Produk & Layanan (RIPLAY)
          </span>{' '}
          terkait produk asuransi yang telah saya pilih,
        </p>
        <div>
          <Button
            type="linear-gradient"
            full
            onButtonClick={() => {
              onSubmitAgreement();
            }}>
            Saya Setuju
          </Button>
        </div>
      </Modal>
    );
  }

  function renderModalNotEligible() {
    if (!isModalEligibleActive) return null;

    return (
      <Modal isOpen={true} toggle={() => {}}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-12">
          <div className="absolute -mt-24">
            <img src={Toa} className="max-w-[160px]" />
          </div>
        </div>
        <div className="font-bold text-xl text-center mb-3">
          {translate('belumbisaBerlanggananTitle')}
        </div>
        <div className="text-center text-sm">
          {translate('belumbisaBerlangganan')}
        </div>
        <div className="mt-6">
          <Button
            full
            outline
            className="text-sm border-red-300 mb-4"
            onButtonClick={() => {
              setIsModalEligibleActive(false);
              setCustomerCare(true);
            }}>
            {translate('hubungiCustomer')}
          </Button>
          <Button
            type="linear-gradient"
            full
            className="text-sm"
            onButtonClick={() => {
              setIsModalEligibleActive(false);
            }}>
            {translate('kembali')}
          </Button>
        </div>
      </Modal>
    );
  }

  function renderModalRemember() {
    if (!isShowModalRemember) return null;

    return (
      <Modal isOpen={true} toggle={() => {}}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-12">
          <div className="absolute -mt-24">
            <img src={Shield} className="max-w-[160px]" />
          </div>
        </div>
        <div className="font-bold text-h6 text-center mb-1">
          {translate('waitingSuccessTitle')}
        </div>
        <div className="text-center text-sm">{translate('waitingSuccess')}</div>
        <div className="mt-6">
          <Button
            type="linear-gradient"
            full
            onButtonClick={() => {
              setWaitingClear();
              router.push({
                pathname: NAVIGATION.HOME.Home,
              });
            }}>
            {translate('kembaliBeranda')}
          </Button>
        </div>
      </Modal>
    );
  }

  const renderNotif = () => {
    return (
      <div className="lg:hidden absolute top-0 left-0 w-full px-[5%] md:px-[10%] py-2 flex bg-white items-center justify-between">
        <div className="flex items-center gap-3 md:gap-5">
          <img
            src={Close}
            className="w-8 cursor-pointer"
            onClick={() => setShowNotifApp(false)}
          />
          <p className="text-sm md:text-base  font-bold">
            Buka lewat aplikasi lebih mudah loh!
          </p>
        </div>
        <a href="https://lifecustomer.page.link/sU8q" target="_blank">
          <Button
            type="linear-gradient"
            className="text-sm h-8 w-32 md:w-40 md:h-10">
            <p className="text-xs">Buka App</p>
          </Button>
        </a>
      </div>
    );
  };

  if (!isRender) return null;

  return (
    <>
      <Container
        className="mt-4"
        background="bg-[#F32D33] relative"
        noBackground
        fullScreen>
        {/* {showNotifApp && renderNotif()} */}
        <div
          role="button"
          className={clsx('px-4', showNotifApp && 'mt-16 lg:mt-0')}
          onClick={() => {
            router.push({
              pathname: NAVIGATION.LIFESAVER.LifesaverMain,
            });
          }}>
          <img src={LifesaverBack1} />
        </div>
        <div className="w-full mt-4 md:mt-12 max-w-[360px] mx-auto px-4">
          {renderCard()}
          {renderAlert()}
          {renderFooter()}
        </div>
      </Container>
      {renderModalTnC()}
      {renderModalNotEligible()}
      {renderModalRemember()}
    </>
  );
}
