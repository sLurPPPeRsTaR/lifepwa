import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  BaseLayout,
  ButtonPackage,
  CardCustom,
  CheckCustom,
  SelectCustom,
  SelectCustomV2,
  // ButtonCustom,
  ModalRegisterOrLogin,
  ModalCustom,
  PembayaranTahunanInfo,
} from '@cp-module/lifecover/component';
import {
  LifecoverBGpackage,
  LifecoverLogo,
  LifecoverBGpackagePlus,
  LifecoverlogoPlus,
  AnnouncementLocked,
} from '@cp-config/Images';
import Icon from 'react-icons-kit';
import { venus, mars } from 'react-icons-kit/fa';
import { Warning, LifesaverInfo, RedGradientWarning } from '@cp-config/Svgs';
import { Button, Toggle } from '@cp-component';
import { formatCurrency } from '@cp-util/numbro';
import { useModal, useSSR } from '@cp-hooks';
import { useRouter } from 'next/router';
import { NAVIGATION, PRODUCT } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';
import TotalPriceFooter from '@cp-module/lifecover/component/TotalPriceFooter';
import { FRAUD, DRAFT, SUBMIT, PAID } from '@cp-module/lifecover/utils';

const PACKAGE_DATA = {
  lifecover: {
    id: (
      <>
        <span className="text-[8px] xm:text-[10px] s:text-[12px] sm:text-[14px] lg:text-sm font-medium text-inherit">
          Uang Pertanggungan
        </span>
        <span className="text-[12px] xm:text-[14px] s:text-[16px] sm:text-[18px] md:text-[26px] font-bold text-inherit">
          500 Juta
        </span>
      </>
    ),
    en: (
      <>
        <span className="text-[8px] xm:text-[10px] s:text-[12px] sm:text-[14px] lg:text-sm font-medium text-inherit">
          Sum Assured
        </span>
        <span className="text-[12px] xm:text-[14px] s:text-[16px] sm:text-[18px] md:text-[26px] font-bold text-inherit">
          500 Million
        </span>
      </>
    ),
  },
  lifecoverPlus: {
    id: (
      <>
        <span className="text-[8px] xm:text-[10px] s:text-[12px] sm:text-[14px] lg:text-sm font-medium text-inherit">
          Uang Pertanggungan
        </span>
        <span className="text-[12px] xm:text-[14px] s:text-[16px] sm:text-[18px] md:text-[26px] font-bold text-inherit">
          1 Miliar
        </span>
      </>
    ),
    en: (
      <>
        <span className="text-[8px] xm:text-[10px] s:text-[12px] sm:text-[14px] lg:text-sm font-medium text-inherit">
          Sum Assured
        </span>
        <span className="text-[12px] xm:text-[14px] s:text-[16px] sm:text-[18px] md:text-[26px] font-bold text-inherit">
          1 Billion
        </span>
      </>
    ),
  },
  lifecoverFreechoice: {
    id: (
      <>
        <span className="text-[8px] xm:text-[10px] s:text-[12px] sm:text-[14px] lg:text-sm font-medium text-inherit">
          Uang Pertanggungan
        </span>
        <span className="text-[10px] xm:text-[14px] s:text-[16px] sm:text-[18px] md:text-[26px] font-bold text-inherit">
          Tentukan Sendiri
        </span>
      </>
    ),
    en: (
      <>
        <span className="text-[8px] xm:text-[10px] s:text-[12px] sm:text-[14px] lg:text-sm font-medium text-inherit">
          Sum Assured
        </span>
        <span className="text-[10px] xm:text-[14px] s:text-[16px] sm:text-[18px] md:text-[26px] font-bold text-inherit">
          Choose Your Own
        </span>
      </>
    ),
  },
};
const JUTA = 1e6;
const LIFECOVER_FREE_CHOICE_OPTIONS = [
  300 * JUTA,
  400 * JUTA,
  600 * JUTA,
  700 * JUTA,
  800 * JUTA,
  900 * JUTA,
  1100 * JUTA,
  1200 * JUTA,
  1300 * JUTA,
  1400 * JUTA,
  1500 * JUTA,
];

export const PREV_PREMI = 'prevPremi';

// SCHEMA
const schemaSimulation = yup.object({
  age: yup.number().required('Usia harus diisi'),
  gender: yup.string().required('Jenis kelamin harus pilih'),
});

const LifecoverSelectPackage = ({
  lang,
  authState,
  profileState,
  lifecoverState,
  getAgePublic,
  getCurrentSubs,
  getPremiPublic,
  getPremiPrivate,
  getUserIdentity,
  getUserConfirmationDetail,
}) => {
  const { isSSR } = useSSR();
  const router = useRouter();
  const modalRegisterOrLogin = useModal();
  const modalDifferentEkycDob = useModal();
  const modalAlreadySubscribed = useModal();
  const modalAlreadySubmitted = useModal();
  const modalDraftLangganan = useModal();
  const modalFraudDetected = useModal();

  const isLogin = !!authState.userData?.userId;
  const alreadyEkyc = !!authState.userData?.alreadyKYC;

  // start age from 18
  const AGE_OPTION = Array.from({ length: 52 }).map((_, idx) => ({
    label: `${18 + idx} ${trans(locale, lang, 'tahun')}`,
    value: 18 + idx,
  }));

  // STATE
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedPremiVariant, setSelectedPremiVariant] = useState(
    PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly,
  );
  const [isFirstGettingPremi, setIsFirstGettingPremi] = useState(true);
  const isYearly =
    selectedPremiVariant === PRODUCT.LIFECOVER.PACKAGE_OPTION.annually;
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  // FORM STATE
  const {
    control,
    formState: { errors, isSubmitSuccessful },
    setValue,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      age: 0,
      benefit: 500 * JUTA,
      id: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.id,
      planCode: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.planCode,
      option: PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly,
      gender: '',
    },
    shouldFocusError: false,
    resolver: !alreadyEkyc ? yupResolver(schemaSimulation) : null,
  });
  const watchBenefit = useWatch({ control, name: 'benefit' });
  const watchAge = useWatch({ control, name: 'age' });
  const watchPlanCode = useWatch({ control, name: 'planCode' });
  const watchGender = useWatch({ control, name: 'gender' });

  // DATA
  const normalYearlyPremi =
    lifecoverState[
      alreadyEkyc ? 'getPremiPrivateResponse' : 'getPremiPublicResponse'
    ]?.[PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly].premi * 12;
  const getPremi = {
    value: alreadyEkyc
      ? lifecoverState.getPremiPrivateResponse?.[
          isYearly
            ? PRODUCT.LIFECOVER.PACKAGE_OPTION.annually
            : PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly
        ].premi
      : lifecoverState.getPremiPublicResponse?.[
          isYearly
            ? PRODUCT.LIFECOVER.PACKAGE_OPTION.annually
            : PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly
        ].premi,
    isLoading: alreadyEkyc
      ? lifecoverState.getPremiPrivateFetch
      : lifecoverState.getPremiPublicFetch,
    error: alreadyEkyc
      ? lifecoverState.getPremiPrivateFailed?.message
      : lifecoverState.getPremiPublicFailed?.message,
  };
  const getActivePolicyData = {
    isActive:
      lifecoverState.getCurrentSubsLifecoverResponse?.isActivePolicyExists,
  };

  // HANDLER
  const handleTogglePremiVariant = useCallback(() => {
    setSelectedPremiVariant(
      selectedPremiVariant === PRODUCT.LIFECOVER.PACKAGE_OPTION.annually
        ? PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly
        : PRODUCT.LIFECOVER.PACKAGE_OPTION.annually,
    );
  }, [selectedPremiVariant]);
  const onSubmit = () => {
    if (lifecoverState.getUserConfirmationDetailResponse) {
      const sioAnswer =
        lifecoverState.getUserConfirmationDetailResponse.data.sioAnswer;

      if (
        lifecoverState.getUserConfirmationDetailResponse.data.status === FRAUD
      ) {
        modalFraudDetected.open();
        return;
      }

      if (sioAnswer.find((e) => e.option)) {
        // sio gagal
        modalAlreadySubmitted.open();
      } else {
        // sio berhasil
        if (
          lifecoverState.getUserConfirmationDetailResponse.data.status ===
            DRAFT ||
          lifecoverState.getUserConfirmationDetailResponse.data.status ===
            SUBMIT
        ) {
          modalDraftLangganan.open();
        } else if (
          lifecoverState.getUserConfirmationDetailResponse.data.status === PAID
        ) {
          //If policy is active, he can't go to next page
          if (getActivePolicyData.isActive) {
            modalAlreadySubscribed.open();
          } else {
            modalRegisterOrLogin.open();
          }
        }
      }
    } else {
      modalRegisterOrLogin.open();
    }
  };

  // EFFECTS
  // effect :
  // default package selected from router query
  // get ekyc dob

  useEffect(() => {
    if (isLogin) {
      getUserConfirmationDetail();
      getCurrentSubs();
    }
  }, [isLogin]);
  useEffect(() => {
    const { query } = router;
    if (router.isReady) {
      if (query.benefit) {
        setSliderValue(Number(query.benefit));
      }
      if (query.age) {
        getUserIdentity({});
      }
    }
  }, [router.isReady]);
  // effect : get age if ekyc dob exist
  useEffect(() => {
    if (profileState.getUserIdentityResponse?.dob)
      getAgePublic(
        profileState.getUserIdentityResponse?.dob
          ?.split('-')
          .reverse()
          .join('-'),
      );
  }, [profileState.getUserIdentityResponse?.dob]);

  useEffect(() => {
    let timer;

    if (getPremi.value) {
      if (localStorage.getItem(PREV_PREMI) && isLogin) {
        timer = setTimeout(() => {
          const prevPremi = Number(localStorage.getItem(PREV_PREMI));
          if (prevPremi !== getPremi.value) {
            modalDifferentEkycDob.open();
          }

          localStorage.removeItem(PREV_PREMI);
        }, 1000);
      }

      if (!isLogin) {
        localStorage.setItem(PREV_PREMI, getPremi.value);
      }

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [getPremi.value, lifecoverState.getAgePublicResponse?.data?.age]);

  useEffect(() => {}, []);
  // effect : change package id & plane on benefit value change
  useEffect(() => {
    if (watchBenefit) {
      const selectedPackageId = (() => {
        if (watchBenefit === 500 * JUTA) {
          return {
            id: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.id,
            planCode: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.planCode,
          };
        } else if (watchBenefit === 1000 * JUTA) {
          return {
            id: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecoverPlus.id,
            planCode: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecoverPlus.planCode,
          };
        } else {
          return {
            id: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecoverFreeChoice.id,
            planCode:
              PRODUCT.LIFECOVER.PACKAGE_DATA.lifecoverFreeChoice.planCode,
          };
        }
      })();
      setValue('id', selectedPackageId.id);
      setValue('planCode', selectedPackageId.planCode);
    }
  }, [watchBenefit]);
  // effect : format dob of selected age
  useEffect(() => {
    if (selectedAge) {
      setValue('age', selectedAge.value);
    } else {
      setValue('age', '');
    }
  }, [selectedAge]);

  useEffect(() => {
    if (selectedGender) {
      setValue('gender', selectedGender);
    }
  }, [selectedGender]);

  // effect : auto change package selected if slider stop for 1 sec
  useEffect(() => {
    const unsub = setTimeout(() => {
      if (sliderValue) {
        setValue('benefit', sliderValue);
      }
    }, 1000);

    return () => {
      clearTimeout(unsub);
    };
  }, [sliderValue]);
  // effect : getPremiPublic / getPremiPrivate
  useEffect(() => {
    if (alreadyEkyc && watchPlanCode && watchBenefit) {
      handleSubmit(() => {
        getPremiPrivate({
          planCode: watchPlanCode,
          benefit: watchBenefit,
        });
      })();
    } else if (watchPlanCode && watchBenefit && watchAge && watchGender) {
      handleSubmit(() => {
        getPremiPublic({
          planCode: watchPlanCode,
          benefit: watchBenefit,
          age: watchAge,
          gender: watchGender,
        });
      })();
    }
  }, [watchBenefit, watchPlanCode, watchAge, watchGender]);

  useEffect(() => {
    if (getPremi.error && isSubmitted) toast.error(getPremi.error);
  }, [getPremi.error, isSubmitted]);

  // RENDERER
  const renderPilihanPH = () => {
    return (
      <div className="flex w-full flex-col">
        <div className="flex w-full p-[24px] flex-col">
          <div
            dangerouslySetInnerHTML={{
              __html: trans(locale, lang, 'berlanggananLifecover'),
            }}
            className="lg:text-sm text-base font-semibold"
          />
          <div
            dangerouslySetInnerHTML={{
              __html: trans(locale, lang, 'sebelumBerlangganan'),
            }}
            className="lg:text-xs text-sm font-normal my-2"
          />

          {/* <div className="flex flex-col w-full gap-3 my-5">
            <div>
              <span className='lg:text-sm text-base font-semibold'>Untuk siapa kamu membeli LIfeCOVER</span>
            </div>
            <div className="flex w-full gap-3">
              <ButtonCustom>Diri Sendiri</ButtonCustom>
              <ButtonCustom>Keluarga</ButtonCustom>
            </div>
          </div> */}

          {!alreadyEkyc && (
            <div>
              <div className="mt-2">
                <label>
                  <div className="text-[14px]  mb-2 text-center font-semibold">
                    {trans(locale, lang, 'pilihJenisKelamin')}
                  </div>

                  <div className="flex flex-row justify-between lg:justify-center justify text-xs xm:text-sm md:text-base">
                    <div
                      className={
                        'w-[39%] lg:w-[30%] h-[48px] flex border-2 px-2 md:px-2 py-3 rounded-xl cursor-pointer lg:mr-8 ' +
                        (selectedGender === 'L'
                          ? 'bg-red-100 border-red-200'
                          : 'bg-gray-100 border-gray-200')
                      }
                      onClick={() => setSelectedGender('L')}>
                      <p
                        className={
                          'basis-5/6 text-xs md:text-sm ' +
                          (selectedGender === 'L'
                            ? 'text-red-300'
                            : 'text-neutral-light-neutral40')
                        }>
                        {trans(locale, lang, 'lakiLaki')}
                      </p>
                      <Icon
                        className={
                          'basis-1/6 leading-4 ' +
                          (selectedGender === 'L'
                            ? 'text-red-300'
                            : 'text-neutral-light-neutral40')
                        }
                        size={16}
                        icon={mars}
                      />
                    </div>
                    <div
                      className={
                        'w-[48%] lg:w-[30%] h-[48px] flex border-2 px-2 md:px-2 py-3 rounded-xl cursor-pointer ' +
                        (selectedGender === 'P'
                          ? 'bg-red-100 border-red-200'
                          : 'bg-gray-100 border-gray-200')
                      }
                      onClick={() => setSelectedGender('P')}>
                      <p
                        className={
                          'basis-5/6 text-[11px] md:text-sm ' +
                          (selectedGender === 'P'
                            ? 'text-red-300'
                            : 'text-neutral-light-neutral40')
                        }>
                        {trans(locale, lang, 'perempuan')}
                      </p>
                      <Icon
                        className={
                          'basis-1/6 leading-4 ' +
                          (selectedGender === 'P'
                            ? 'text-red-300'
                            : 'text-neutral-light-neutral40')
                        }
                        icon={venus}
                        size={16}
                      />
                    </div>
                  </div>

                  {errors.gender?.message && (
                    <div className="mt-2 text-[12px] md:text-[14px] text-primary-dark-primary90">
                      {errors.gender.message}
                    </div>
                  )}
                </label>
              </div>
              <div className="mt-8">
                <label>
                  <div className="text-[14px] mb-2 text-center font-semibold">
                    {trans(locale, lang, 'pilihUsia')}
                  </div>

                  <SelectCustomV2
                    options={AGE_OPTION}
                    labelMenu="Pilih Usia"
                    placeholder={trans(locale, lang, 'placeholderPilihUsia')}
                    value={selectedAge}
                    onChange={setSelectedAge}
                  />

                  {errors.age?.message && (
                    <div className="mt-2 text-[12px] md:text-[14px] text-primary-dark-primary90">
                      {errors.age.message}
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="w-full h-2 bg-gray-200" />
      </div>
    );
  };
  const renderPackages = () => {
    return (
      <div className="flex flex-col gap-2 lg:gap-4">
        <div className="flex flex-col gap-1 md:gap-3">
          <ButtonPackage
            variant="lifecover"
            lang={lang}
            content={PACKAGE_DATA.lifecover[lang]}
            premiVariant={selectedPremiVariant}
            premi={getPremi.value}
            isLoading={getPremi.isLoading}
            error={getPremi?.error}
            checked={
              watchPlanCode ===
              PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.planCode
            }
            onChange={() => setValue('benefit', 500 * JUTA)}
          />
          <ButtonPackage
            variant="lifecoverPlus"
            lang={lang}
            content={PACKAGE_DATA.lifecoverPlus[lang]}
            premiVariant={selectedPremiVariant}
            premi={getPremi.value}
            isLoading={getPremi.isLoading}
            error={getPremi?.error}
            checked={
              watchPlanCode ===
              PRODUCT.LIFECOVER.PACKAGE_DATA.lifecoverPlus.planCode
            }
            onChange={() => setValue('benefit', 1000 * JUTA)}
          />
          <ButtonPackage
            variant="lifecoverFreeChoice"
            lang={lang}
            content={PACKAGE_DATA.lifecoverFreechoice[lang]}
            premiVariant={selectedPremiVariant}
            premi={getPremi.value}
            isLoading={getPremi.isLoading}
            error={getPremi?.error}
            checked={
              watchPlanCode ===
              PRODUCT.LIFECOVER.PACKAGE_DATA.lifecoverFreeChoice.planCode
            }
            onChange={() => {
              setValue('benefit', 1500 * JUTA);
              setSliderValue(1500 * JUTA);
            }}
            valueSlider={sliderValue}
            onChangeSlider={setSliderValue}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex gap-3 lg:gap-2  items-start lg:px-3 px-2 lg:py-4 py-2 lg:my-5 my-3 bg-orange-100 rounded-xl">
            <img src={Warning} alt="icon" className="w-4 h-4 lg:mt-[2px]" />
            <span className="text-xs lg:text-sm font-medium text-mediumGray-light-mediumGray">
              {trans(locale, lang, 'umurPerbedaanPremi')}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm font-medium relative">
            {trans(locale, lang, 'tahunan')}
            <img
              src={LifesaverInfo}
              alt="InfoIcon"
              className="w-4 h-4 object-contain cursor-pointer"
              onClick={() => setIsInfoClicked(!isInfoClicked)}
            />
            <PembayaranTahunanInfo
              lang={lang}
              isClicked={isInfoClicked}
              setIsClicked={() => setIsInfoClicked(!isInfoClicked)}
            />
          </span>
          <Toggle active={isYearly} onClick={handleTogglePremiVariant} />
        </div>
      </div>
    );
  };

  const renderModalDraftLangganan = () => {
    return (
      <ModalCustom
        isOpen={modalDraftLangganan.isOpen}
        toggle={modalDraftLangganan.toggle}
        imageSrc={AnnouncementLocked}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold my-4 ">Oops!</div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          {trans(locale, lang, 'draftLangganan')}
        </div>
        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => {
            localStorage.removeItem(PREV_PREMI);
            router.push(NAVIGATION.LIFECOVER.LifecoverConfirm);
          }}>
          {trans(locale, lang, 'bayarSekarang')}
        </Button>
      </ModalCustom>
    );
  };

  const renderModalAlreadySubscribed = () => {
    return (
      <ModalCustom
        isOpen={modalAlreadySubscribed.isOpen}
        toggle={modalAlreadySubscribed.toggle}
        imageSrc={AnnouncementLocked}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">Oops!</div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          {trans(locale, lang, 'sudahBerlangganan')}
        </div>

        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => router.push(NAVIGATION.LIFECOVER.LifecoverMain)}>
          {trans(locale, lang, 'btnKembali')}
        </Button>
      </ModalCustom>
    );
  };

  const renderModalAlreadySubmitted = () => {
    return (
      <ModalCustom
        isOpen={modalAlreadySubmitted.isOpen}
        toggle={modalAlreadySubmitted.toggle}
        imageSrc={AnnouncementLocked}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">Oops!</div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          {trans(locale, lang, 'sudahSubmit')}
        </div>

        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => router.push(NAVIGATION.LIFECOVER.LifecoverMain)}>
          {trans(locale, lang, 'btnKembali')}
        </Button>
      </ModalCustom>
    );
  };

  const renderModalFraudDetected = () => {
    return (
      <ModalCustom
        isOpen={modalFraudDetected.isOpen}
        toggle={modalFraudDetected.toggle}
        imageSrc={AnnouncementLocked}
        imageClassName="w-[180px] h-[180px]"
        isOverlapImage>
        <div className="text-[18px] font-bold mt-5">Oops!</div>
        <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
          {trans(locale, lang, 'ktpKamuTidak')}
        </div>

        <Button
          type="linear-gradient"
          className="mt-6 max-w-none"
          onButtonClick={() => router.push(NAVIGATION.LIFECOVER.LifecoverMain)}>
          {trans(locale, lang, 'btnKembali')}
        </Button>
      </ModalCustom>
    );
  };

  return (
    <BaseLayout
      showProgressBar
      title={
        <div>
          Life<i>COVER</i>
        </div>
      }>
      <BaseLayout.Container className="sm:py-10">
        <CardCustom className="min-h-[calc(100vh+200px)] !pb-[180px]">
          <CardCustom.Body className="p-0">
            {!isSSR && !isLogin && renderPilihanPH()}

            {modalDifferentEkycDob.isOpen && (
              <div className="bg-red-100 text-red-600 border border-red-200 absolute w-[calc(100%_-_2rem)] left-4 md:w-[calc(100%_+_2rem)] md:-left-4 rounded-2xl flex gap-2 justify-between px-4 py-2 items-center z-30">
                <div className="flex gap-3 items-center my-2">
                  <div>
                    <img
                      className="min-w-[20px] min-h-[20px] xm:min-w-[28px] xm:min-h-[28px]"
                      src={RedGradientWarning}
                    />
                  </div>
                  <div className="text-xs xm:text-sm font-medium">
                    {trans(locale, lang, 'terdeteksiPerubahanPremi')}
                  </div>
                </div>
                <button
                  className="font-semibold text-xl"
                  onClick={modalDifferentEkycDob.close}>
                  x
                </button>
              </div>
            )}

            <div className="p-[24px]">
              <div
                dangerouslySetInnerHTML={{
                  __html: trans(locale, lang, 'pilihPaket'),
                }}
                className="text-base lg:text-sm font-semibold mb-4"
              />
              {renderPackages()}
            </div>
          </CardCustom.Body>
        </CardCustom>
        <ModalRegisterOrLogin
          isOpen={modalRegisterOrLogin.isOpen}
          toggle={modalRegisterOrLogin.toggle}
          age={selectedAge?.value}
          benefit={watchBenefit || ''}
          planCode={watchPlanCode || ''}
          paymentType={
            isYearly
              ? PRODUCT.LIFECOVER.PACKAGE_OPTION.annually
              : PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly
          }
        />
        {/* <ModalCustom
          isOpen={modalDifferentEkycDob.isOpen}
          toggle={modalDifferentEkycDob.toggle}
          imageSrc={AnnouncementLocked}
          imageClassName="w-[180px] h-[180px]"
          isOverlapImage>
          <div className="text-[18px] font-bold mt-5">Mohon Maaf</div>
          <div className="text-[14px] text-[#505254] leading-[21px] max-w-[320px] mx-auto">
            Umur yang kamu masukkan pada saat simulasi berbeda dengan data
            verivikasi diri. Kami menggunakan data verivikasi diri untuk
            melanjutkan proses.
          </div>

          <Button
            type="linear-gradient"
            className="mt-6 max-w-none"
            onButtonClick={modalDifferentEkycDob.toggle}>
            Kembali
          </Button>
        </ModalCustom> */}

        {renderModalAlreadySubscribed()}
        {renderModalAlreadySubmitted()}
        {renderModalDraftLangganan()}
        {renderModalFraudDetected()}
      </BaseLayout.Container>

      {watchPlanCode && (
        <BaseLayout.Footer>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center justify-between py-3">
            <div className="flex-1 flex flex-col">
              <span className="text-sm lg:text-xs font-Monstserrat md:text-sm font-semibold">
                {trans(locale, lang, 'premi')}
              </span>
              <p className="text-sm sm:text-lg md:text-xl font-semibold text-green-500">
                {!isYearly ? (
                  <>
                    Rp
                    {formatCurrency({
                      value: getPremi.value,
                      mantissa: 0,
                    })}
                    ,-
                  </>
                ) : (
                  <>
                    <span className="text-xs md:text-sm lg:text-sm line-through mr-3 text-black">
                      Rp
                      {formatCurrency({
                        value: normalYearlyPremi || 0,
                        mantissa: 0,
                      })}
                      ,-
                    </span>
                    Rp
                    {formatCurrency({
                      value: getPremi.value,
                      mantissa: 0,
                    })}
                    ,-
                  </>
                )}
              </p>
              <span className="lg:text-xs font-Monstserrat text-sm font-medium text-darkGray-light-darkGray">
                {trans(
                  locale,
                  lang,
                  isYearly ? 'pembayaranTahunan' : 'pembayaranBulanan',
                )}
              </span>
            </div>
            <div className="flex-initial w-full md:w-[340px] flex-shrink-0">
              <Button
                shadow
                type="linear-gradient"
                className="text-[12px] sm:text-[16px] w-full max-w-none"
                disabled={!getPremi.value || getPremi.isLoading}
                onButtonClick={handleSubmit(onSubmit)}>
                {trans(
                  locale,
                  lang,
                  lifecoverState.getPremiPrivateFetch
                    ? 'Loading . . .'
                    : 'langgananSekarang',
                )}
              </Button>
            </div>
          </div>
        </BaseLayout.Footer>
      )}
    </BaseLayout>
  );
};

export default LifecoverSelectPackage;
