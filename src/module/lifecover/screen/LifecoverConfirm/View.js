import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import clsx from 'classnames';
import moment from 'moment';
import { isEmpty, isEqual } from 'lodash';
import {
  BaseLayout,
  CardCustom,
  TotalPriceFooter,
  PembayaranTahunanInfo,
} from '@cp-module/lifecover/component';
import { LifesaverInfo } from '@cp-config/Svgs';
import { setFormatDate } from '@cp-util/common';
import {
  LifecoverLogo,
  LifecoverPlusLogo,
  MyLifecoverLogoDark,
  Checklist,
} from '@cp-config/Images';
import { Toggle, Modal } from '@cp-component';
import { formatRupiah } from '@cp-module/lifecover/utils';
import { PenEdit, Close } from '@cp-config/Svgs';
import { NAVIGATION } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import locale from './locale';
import AddBeneficiaryBox from './AddBeneficiaryBox';
import BeneficiariesBox from './BeneficiariesBox';

export const confirmRow = clsx('flex justify-between mt-2', 'confirm-row');
export const confirmRowLabel = clsx(
  'text-gray-600 text-xs md:text-sm',
  'confirm-row-label',
);
export const confirmRowValue = clsx('text-xs md:text-sm', 'confirm-row-value');
export const divider = clsx(
  'w-full h-auto flex flex-row border-t border-gray-100 my-2',
  'divider',
);

const LifecoverConfirm = ({
  createBilling,
  getUserConfirmationDetail,
  getBeneficiary,
  lang,
  lifecoverState,
  setInternalServerError,
  setLoading,
  updateSubmission,
  checkReferral,
}) => {
  const [uangPertanggungan, setUangPertanggungan] = useState(0);
  const [isPaidYearly, setIsPaidYearly] = useState(true);
  const [isUserPaidYearly, setIsUserPaidYearly] = useState(true);
  const [isInfoClicked, setIsInfoClicked] = useState(false);
  const [premiList, setPremiList] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [beneficiary, setBeneficiary] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisplayNoBeneficiaryError, setIsDisplayNoBeneficiaryError] =
    useState(false);
  const [referralCode, setReferralCode] = useState(null);
  const router = useRouter();

  const getPlan =
    lifecoverState.getUserConfirmationDetailResponse?.data?.planCode;
  const getReferralCode = {
    referralCode: lifecoverState.referralCode,
    isValid: !!lifecoverState.checkReferralResponse?.data,
    failedResponse: lifecoverState.checkReferralFailed,
  };

  const displayedPrice = () => {
    if (isUserPaidYearly) {
      return isPaidYearly ? userDetail.premi : userDetail.premi / 10;
    } else {
      return isPaidYearly ? userDetail.premi * 10 : userDetail.premi;
    }
  };

  const displayedSubPrice = () => {
    if (isUserPaidYearly) {
      return (userDetail.premi * 6) / 5;
    } else {
      return userDetail.premi * 12;
    }
  };

  useEffect(() => {
    if (lifecoverState.getBeneficiaryResponse?.status) {
      setBeneficiary(lifecoverState.getBeneficiaryResponse.data);
    }
  }, [lifecoverState.getBeneficiaryResponse]);

  useEffect(() => {
    const userConfirmationDetail =
      lifecoverState.getUserConfirmationDetailResponse?.data;
    if (userConfirmationDetail) {
      setUserDetail(userConfirmationDetail);
      setUangPertanggungan(userConfirmationDetail.benefit);

      if (
        isEqual(userConfirmationDetail.paymentType.toLowerCase(), 'annually')
      ) {
        setIsPaidYearly(true);
        setIsUserPaidYearly(true);
      } else {
        setIsPaidYearly(false);
        setIsUserPaidYearly(false);
      }
    }
  }, [lifecoverState.getUserConfirmationDetailResponse]);

  useEffect(() => {
    getBeneficiary();
    getUserConfirmationDetail();

    if (getReferralCode) {
      setReferralCode(getReferralCode.referralCode);
    }
  }, []);

  const getDueDate = () => {
    let date;

    if (isPaidYearly) {
      date = new Date().setFullYear(new Date().getFullYear() + 1);
      return setFormatDate(moment(date).format('YYYY-MM-DD'), 'id');
    } else {
      date = new Date();
      return setFormatDate(
        moment(date).add(1, 'months').format('YYYY-MM-DD'),
        'id',
      );
    }
  };

  const handleClickSubmit = () => {
    setIsSubmitted(true);

    if (beneficiary.length > 0) {
      setLoading(true);
      const request = {
        paymentType: isPaidYearly ? 'annually' : 'monthly',
      };

      if (getReferralCode.isValid) {
        request['referralCode'] = getReferralCode.referralCode;
      }

      updateSubmission(request);
    } else {
      setIsDisplayNoBeneficiaryError(true);
    }
  };

  useEffect(() => {
    if (lifecoverState.updateSubmissionResponse?.status) {
      //create billing
      const request = {
        applicationId: 'customerapps-pwa-cover',
        invoiceId: '', //perlu diisi
        billType: 'premium',
        reffNo: '', //perlu diisi
        paymentAccountId: '',
        inviteeUserId: '',
        language: 'id',
        sendNotification: false,
        proposalStatus: 'WAITING_FOR_PAYMENT',
      };

      const response = lifecoverState.updateSubmissionResponse?.data;
      request.invoiceId = response.invoiceNo;
      request.reffNo = response.data?.proposalNumber;

      if (response?.data?.listInviting) {
        request.inviteeUserId = response?.data?.listInviting[0]?.inviteeUserId;
      }

      createBilling(request);
    }
  }, [lifecoverState.updateSubmissionResponse]);

  useEffect(() => {
    setLoading(false);
    if (lifecoverState.createBillingResponse && isSubmitted) {
      const PAYMENT_URL = lifecoverState?.createBillingResponse?.redirectUrl;
      window.location.assign(PAYMENT_URL);
    }
  }, [lifecoverState.createBillingResponse]);

  const onChangePaymentType = () => {
    setIsPaidYearly(!isPaidYearly);
  };

  useEffect(() => {
    if (lifecoverState.getPremiPrivateResponse && userDetail.premi) {
      let array = [];
      array.push(lifecoverState.getPremiPrivateResponse.monthly?.premi);
      array.push(lifecoverState.getPremiPrivateResponse.annually?.premi);
      setPremiList(array);
    }
  }, [lifecoverState.getPremiPrivateResponse, userDetail]);

  const imgSrc = useMemo(() => {
    if (getPlan === '01') {
      return {
        logo: LifecoverLogo,
      };
    }
    if (getPlan === '02') {
      return {
        logo: LifecoverPlusLogo,
      };
    }
    if (getPlan === '03') {
      return {
        logo: MyLifecoverLogoDark,
      };
    }
  }, [getPlan]);

  return (
    <BaseLayout
      title={trans(locale, lang, 'konfirmasi')}
      variant={'card-on-desktop'}>
      <BaseLayout.Container
        className="py-10 pb-64 max-w-none"
        fullWidth={'card-on-desktop'}>
        <div className="mb-4 left-0 px-4 md:px-8 absolute w-full -top-8">
          <CardCustom>
            <CardCustom.Header className={'p-[12px] md:p-[24px]'}>
              <div className="flex justify-between">
                <div className="flex-initial flex-shrink-0 w-[136px] h-[24px] overflow-hidden relative">
                  <img src={imgSrc?.logo} alt="" className="object-contain" />
                </div>
              </div>
            </CardCustom.Header>
            <CardCustom.Body className={'p-[12px] md:p-[24px]'}>
              <div className={confirmRow}>
                <label className={confirmRowLabel}>
                  {trans(locale, lang, 'uangPertanggungan')}
                </label>
                <span className={confirmRowValue + ' text-black font-bold'}>
                  {userDetail?.benefit
                    ? formatRupiah({ total: userDetail?.benefit })
                    : '-'}
                </span>
              </div>
              <div className={confirmRow}>
                <label className={confirmRowLabel}>
                  {trans(locale, lang, 'durasiProteksi')}
                </label>
                <span className={confirmRowValue + ' text-black font-bold'}>
                  {trans(locale, lang, 'satuTahun')}
                </span>
              </div>
              <div className={confirmRow}>
                <label className={confirmRowLabel}>
                  {trans(locale, lang, 'jatuhTempoBerikutnya')}
                </label>
                <span className={confirmRowValue + ' text-black font-bold'}>
                  {getDueDate()}
                </span>
              </div>
            </CardCustom.Body>
          </CardCustom>
        </div>
        <div className="col-span-12 mt-36 md:mt-48">
          <div className="flex justify-between mb-2">
            <h2 className="font-semibold text-[#232425] text-sm my-auto">
              {trans(locale, lang, 'tertanggung')}
            </h2>
            {beneficiary?.length > 0 && (
              <img
                src={PenEdit}
                className="cursor-pointer opacity-40 duration-300 hover:opacity-100"
                onClick={() => {
                  router.push(NAVIGATION.LIFECOVER.LifecoverAddBeneficiary);
                }}
              />
            )}
          </div>
          <CardCustom>
            <CardCustom.Body className={'p-[12px] md:p-[24px]'}>
              <div className={confirmRow}>
                <label className={confirmRowLabel}>
                  {trans(locale, lang, 'namaLengkap')}
                </label>
                <span className={confirmRowValue}>{userDetail?.name}</span>
              </div>
              <div className={confirmRow}>
                <label className={confirmRowLabel}>
                  {trans(locale, lang, 'nik')}
                </label>
                <span className={confirmRowValue}>{userDetail?.nik}</span>
              </div>
              <div className={divider} />
              {beneficiary?.length > 0 ? (
                <BeneficiariesBox
                  beneficiaries={beneficiary}
                  uangPertanggungan={uangPertanggungan}
                  lang={lang}
                />
              ) : (
                <AddBeneficiaryBox
                  lang={lang}
                  isDisplayError={isDisplayNoBeneficiaryError}
                />
              )}
            </CardCustom.Body>
          </CardCustom>
        </div>
        <div className="flex flex-col mt-6">
          <h2 className="text-sm font-semibold mb-2.5 md:w-1/2 xs:w-full ">
            {trans(locale, lang, 'kodeReferral')}
          </h2>
          <div className="rounded-2xl w-full mb-5">
            <div class="relative">
              <input
                type="text"
                className={`w-full p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-2xl`}
                placeholder={trans(locale, lang, 'masukkankodeReferral')}
                required
                maxlength="15"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              {getReferralCode.isValid && (
                <img
                  src={Checklist}
                  className="w-6 absolute"
                  style={{
                    bottom: '15px',
                    left: '160px',
                  }}
                />
              )}
              <button
                onClick={() =>
                  checkReferral({
                    referralCode: referralCode,
                  })
                }
                disabled={referralCode}
                class={
                  (referralCode
                    ? 'bg-grayButton-light-grayButton text-gray-500'
                    : 'bg-gradient-to-r from-[#F25D63] to-[#ED1C24] text-[#FFFFFF]') +
                  ' absolute right-2.5 bottom-2.5 font-medium rounded-2xl text-sm px-4 py-2 '
                }>
                {trans(locale, lang, 'gunakan')}
              </button>
            </div>
            {getReferralCode.failedResponse && !getReferralCode.isValid && (
              <p className="text-caption1 text-primary-dark-primary90 font-medium pl-2">
                {trans(locale, lang, 'statusKodeReferral')}
              </p>
            )}
          </div>
        </div>
        <div className="col-span-12 mt-4">
          <span className="font-semibold mb-3 text-xs md:text-sm">
            {trans(locale, lang, 'bayarTahunanLebih')}
          </span>
          <div className={confirmRow}>
            <label className="flex font-medium text-gray-600 text-xs md:text-sm relative">
              {trans(locale, lang, 'bayarTahunan')}
              <img
                src={LifesaverInfo}
                className="ml-2 w-4 cursor-pointer"
                onClick={() => setIsInfoClicked(!isInfoClicked)}
              />
              <PembayaranTahunanInfo
                isClicked={isInfoClicked}
                setIsClicked={() => setIsInfoClicked(!isInfoClicked)}
                lang={lang}
              />
            </label>
            <Toggle
              onClick={() => onChangePaymentType()}
              active={isPaidYearly}
            />
          </div>
        </div>

        <div className="col-span-12 mt-8">
          <span className="font-semibold mb-3  text-xs md:text-sm">
            {trans(locale, lang, 'rincianPembayaran')}
          </span>
          <div className={confirmRow}>
            <label
              className="font-medium text-gray-600 text-xs md:text-sm"
              dangerouslySetInnerHTML={{
                __html: trans(locale, lang, 'lifeCover'),
              }}></label>
            <span className="font-medium text-xs md:text-sm">
              {userDetail?.premi &&
                formatRupiah({
                  total: displayedPrice(),
                })}
            </span>
          </div>
        </div>
        <TotalPriceFooter
          paymentType={!isPaidYearly ? 'monthly' : 'annually'}
          price={displayedPrice()}
          subPrice={displayedSubPrice()}
          handleClickSubmit={handleClickSubmit}
          lang={lang}
        />
      </BaseLayout.Container>
    </BaseLayout>
  );
};

export default LifecoverConfirm;
