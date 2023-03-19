import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  LifecoverLandingImg3,
  LifecoverLandingV2Img1,
  LifecoverLandingV2Img2,
  LifecoverLandingV2Img3,
  LifecoverLandingMobileV2Img1,
  LifecoverLandingMobileV2Img2,
  LifecoverLandingMobileV2Img3,
  LifecoverLogoLg,
  LifecoverLogoDarkLg,
  LifecoverLogoDark,
  LifecoverPlusLogoDark,
  LifecoverFreechoiceLogoDark,
  IllustrationCost,
  IllustrationFlexible,
  IllustrationPractical,
  IllustrationMuchBenefit,
  IllustrationSave,
  IllustrationCoverage,
  IllustrationMedicalCheck,
  IllustrationSuicide,
  IllustrationCriminal,
  IllustrationHospital,
  IllustrationCarCrash,
  IllustrationProtection,
  LsCard2,
  AnnouncementLocked,
  LifecoverBGLanding1,
  LifecoverBGLanding2,
  LifecoverBGLanding3,
  LifecoverBGLandingMobile1,
  LifecoverBGLandingMobile2,
  LifecoverBGLandingMobile3,
} from '@cp-config/Images';
import {
  LifecoverLandingV2Dec1,
  LifecoverLandingV2Dec2,
  LifecoverLandingV2Dec3,
  LifecoverLandingDec2,
  IllustrationEasy,
  IllustrationInsuranceData,
  IllustrationLifeNote,
  IllustrationLifeNote2,
  IllustrationProtectionMoney,
  IllustrationRedWarning,
  IllustrationVolcano,
  LifesaverInfo,
} from '@cp-config/Svgs';
import { Button, Container, Toggle } from '@cp-component';
import Icon from 'react-icons-kit';
import { venus, mars } from 'react-icons-kit/fa';
import { ic_west, ic_info_outline } from 'react-icons-kit/md';
import locale from './locale';
import { NAVIGATION, PRODUCT } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import { addQueryStringUrl } from '@cp-util/addQueryStringUrl';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { formatCurrency } from '@cp-util/numbro';
import {
  BoxHelp,
  CardCoverage,
  CardException,
  CardPackage,
  CardReason,
  CardSwiper,
} from './component';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import {
  ButtonPackage,
  Datepicker,
  LifecoverRiplay,
  ModalCustom,
  ModalRegisterOrLogin,
  SelectCustomV2,
  LifecoverFAQ,
  PembayaranTahunanInfo,
} from '@cp-module/lifecover/component';
import LifecoverTnc from './component/LifecoverTnc';
import clsx from 'classnames';
import moment from 'moment';
import { useModal } from '@cp-hooks';
import { useBreakpoints } from '@cp-util/common';
import { FRAUD, DRAFT, SUBMIT, PAID } from '@cp-module/lifecover/utils';

// CONSTANT
const JUTA = 1e6;
const PRIMARCY_DATA = [
  {
    img: IllustrationLifeNote,
    content: {
      id: (
        <>
          <div className="font-semibold">Pilihan paket fleksibel</div>
          <div className="text-sm text-neutral-dark-neutral40">
            Pilih premi sesuai kebutuhan kamu.
          </div>
        </>
      ),
      en: (
        <>
          <div className="font-semibold">Flexible</div>
          <div className="text-sm text-neutral-dark-neutral40">
            Choose a premium according to your needs.
          </div>
        </>
      ),
    },
  },
  {
    img: IllustrationEasy,
    content: {
      id: (
        <>
          <div className="font-semibold">Mudah Dan Praktis</div>
          <div className="text-sm text-neutral-dark-neutral40">
            Tidak membutuhkan medical check up. Semua nya 100% digital.
          </div>
        </>
      ),
      en: (
        <>
          <div className="font-semibold">Easy and Practical</div>
          <div className="text-sm text-neutral-dark-neutral40">
            No medical check-up needed. Everyhting is 100% digital.
          </div>
        </>
      ),
    },
  },
  {
    img: IllustrationMuchBenefit,
    content: {
      id: (
        <>
          <div className="font-semibold">Manfaat Besar</div>
          <div className="text-sm text-neutral-dark-neutral40">
            Premi yang terjangkau dengan uang pertanggungan hingga 1,5 miliar.
          </div>
        </>
      ),
      en: (
        <>
          <div className="font-semibold">Great Benefits</div>
          <div className="text-sm text-neutral-dark-neutral40">
            Affordable premiums with sum insured of up to 1.5 billion.
          </div>
        </>
      ),
    },
  },
];
const BENEFIT_DATA = [
  {
    img: IllustrationInsuranceData,
    content: {
      id: (
        <p className="text-neutral-dark-neutral80">
          Asuransi jiwa dengan pertanggungan yang dapat ditentukan sendiri
          hingga <strong>1,5 milyar</strong>.
        </p>
      ),
      en: (
        <p className="text-neutral-dark-neutral80">
          Life insurance with customizable coverage up to{' '}
          <strong>IDR 1,5 billion</strong>.
        </p>
      ),
    },
  },
  {
    img: IllustrationProtectionMoney,
    content: {
      id: (
        <p className="text-neutral-dark-neutral80">
          <strong>Uang pertanggungan 100%</strong> karena risiko meninggal dunia
          oleh sebab apapun. <br />
          <text className="italic">
            <span className="text-red-600 font-bold">*</span>
            <span className="text-xs ">Syarat dan ketentuan Berlaku</span>
          </text>
        </p>
      ),
      en: (
        <p className="text-neutral-dark-neutral80">
          <strong>100% sum insured</strong> benefit for the risk of death caused
          by any reason. <br />
          <text className="italic">
            <span className="text-red-600 font-bold">*</span>
            <span className="text-xs">Terms and Conditions Applied</span>
          </text>
        </p>
      ),
    },
  },
];
const COVERAGE_DATA = [
  {
    title: {
      id: <>Meninggal Dunia Akibat Kecelakaan</>,
      en: <>Death By Accident</>,
    },
    contentDetail: {
      id: (
        <>
          <p className="text-[#202021] text-[12px] leading-[18px] font-medium mb-[10px]">
            Apabila Tertanggung meninggal dunia akibat kecelakaan yang terjadi
            seketika atau dalam waktu 90 (sembilan puluh) hari sejak terjadinya
            kecelakaan dalam Masa Asuransi maka Penanggung membayarkan manfaat
            asuransi sebesar 100% Uang Pertanggungan dan selanjutnya asuransi
            berakhir.
          </p>
        </>
      ),
      en: (
        <>
          <p className="text-[#202021] text-[12px] leading-[18px] font-medium mb-[10px]">
            If the Insured dies as a result of an accident that occurs
            immediately or within 90 (ninety) days after the accident occurs
            during the Insurance Period, the Insurer will have to pay 100% of
            the Sum Assured, and then the insurance ends.
          </p>
        </>
      ),
    },
  },
  {
    title: {
      id: (
        <>
          Meninggal Dunia <strong>Bukan</strong> Akibat Kecelakaan
        </>
      ),
      en: (
        <>
          Death By <strong>Other</strong> Than Accident
        </>
      ),
    },
    contentDetail: {
      id: (
        <>
          <p className="text-[#202021] text-[12px] leading-[18px] font-medium mb-[10px]">
            Apabila Tertanggung meninggal dunia bukan akibat kecelakaan dalam
            masa asuransi, maka Penanggung akan membayarkan manfaat asuransi
            dengan ketentuan sebagai berikut :
          </p>

          <ol className="list-decimal list-outside">
            <li className="text-[#202021] text-[12px] leading-[18px] mb-[10px] indent-5">
              Jika Tertanggung meninggal dunia bukan akibat kecelakaan di tahun
              pertama polis, maka Penanggung akan membayarkan manfaat asuransi
              sebesar 100% dari premi yang telah dibayarkan pada tahun pertama
              polis dan selanjutnya asuransi berakhir.
            </li>
            <li className="text-[#202021] text-[12px] leading-[18px]">
              Jika Tertanggung meninggal dunia bukan akibat kecelakaan di tahun
              kedua dan tahun selanjutnya Polis, maka Penanggung akan
              membayarkan manfaat asuransi sebesar 100% dari Uang Pertanggungan
              dan selanjutnya asuransi berakhir.
            </li>
          </ol>
        </>
      ),
      en: (
        <>
          <p className="text-[#202021] text-[12px] leading-[18px] font-medium mb-[10px] ">
            If the insured dies by other than an accident during the insurance
            period, the Insurer will have to pay the insurance benefits under
            the following conditions:
          </p>

          <ol className="list-decimal list-outside">
            <li className="text-[#202021] text-[12px] leading-[18px] mb-[10px]">
              If the Insured dies by other than an accident in the first year of
              the policy, then the Insurer will have to pay 100% of the premium
              paid in the first year of the policy, and then the insurance ends.
            </li>
            <li className="text-[#202021] text-[12px] leading-[18px]">
              If the Insured dies by other than an accident in the second year
              or the following year of the policy, then the Insurer will have to
              pay 100% of the Sum Assured, and then the insurance ends.
            </li>
          </ol>
        </>
      ),
    },
  },
];
const YOUTUBE_DATA = [
  {
    img: LsCard2,
    embed: (
      <iframe
        className="h-full w-[220px] xm:w-[280px] md:w-[450px] lg:w-[550px] xl:w-[680px]"
        src="https://www.youtube.com/embed/lowXL5cVtSg"
        title="#NeverGameOver - Bangkit Lebih Kuat (Muhammad Fadli's Story)"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    ),
  },
  {
    img: LsCard2,
    embed: (
      <iframe
        className="h-full w-[220px] xm:w-[280px] md:w-[450px] lg:w-[550px] xl:w-[680px]"
        src="https://www.youtube.com/embed/9F1t7exW5-o"
        title="#NeverGameOver - Menjadi yang Terdepan untuk Mengulurkan Tangan"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    ),
  },
  {
    img: LsCard2,
    embed: (
      <iframe
        className="h-full w-[220px] xm:w-[280px] md:w-[450px] lg:w-[550px] xl:w-[680px]"
        src="https://www.youtube.com/embed/68tV4Tj9ai4"
        title="#NeverGameOver - Siapapun Bisa Jadi Life Saver"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    ),
  },
];
const EXCEPTION_DATA = [
  {
    img: IllustrationVolcano,
    title: {
      id: 'Faktor Kebencanaan',
      en: 'Disaster Factor',
    },
    content: {
      id: (
        <p className="text-[#666B6F] text-sm">
          Bencana alam, reaksi inti atom, wabah, epidemi dan/atau pandemic
          selain COVID-19.
        </p>
      ),
      en: (
        <p className="text-[#666B6F] text-sm">
          Natural disasters, nuclear reactions, outbreaks, epidemics and/or
          pandemics other than COVID-19.
        </p>
      ),
    },
  },
  {
    img: IllustrationRedWarning,
    title: {
      id: 'Tindakan yang disengaja',
      en: 'Intentional action',
    },
    content: {
      id: (
        <p className="text-[#666B6F] text-sm">
          Percobaan bunuh diri, eksekusi hukum mati, dan tindakan menyakiti diri
          sendiri.
        </p>
      ),
      en: (
        <p className="text-[#666B6F] text-sm">
          Suicide attempts, executions, and acts of self-harm.
        </p>
      ),
    },
  },
  {
    img: IllustrationCriminal,
    title: {
      id: 'Tindakan kriminal atau ilegal',
      en: 'Criminal or illegal acts',
    },
    content: {
      id: (
        <p className="text-[#666B6F] text-sm">
          Perbuatan yang melanggar hukum dan perbuatan kejahatan.
        </p>
      ),
      en: (
        <p className="text-[#666B6F] text-sm">
          Injury or permanent disability resulting from active participation in
          illegal acts and criminality.
        </p>
      ),
    },
  },
];
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

// SCHEMA
const schemaSimulation = yup.object({
  age: yup.number().required('Usia harus diisi'),
  gender: yup.string().required('Jenis kelamin harus pilih'),
});

// FRAMER MOTION VARIANTS
const animateFloatBtnVariants = {
  show: {
    opacity: 1,
    display: 'block',
    y: 0,
  },
  hide: {
    opacity: 0,
    y: -25,
    display: 'none',
    transition: {
      ease: [0.1, 0.25, 0.3, 1],
      duration: 0.6,
      staggerChildren: 0.6,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
};

const SectionParallax = forwardRef(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        className={className}
        style={{
          scrollSnapAlign: 'start',
          perspective: 500,
        }}
        {...rest}>
        {children}
      </section>
    );
  },
);

const LifecoverMainV2 = ({
  // mapStateToProps
  lang,
  authState,
  lifecoverState,
  // mapDispatchToProps
  getPremiPublic,
  getPremiPrivate,
  getUserConfirmationDetail,
  getCurrentSubs,
}) => {
  // HOOKS
  const router = useRouter();
  const { scrollY } = useScroll();
  const modalTnc = useModal();
  const modalRiplay = useModal();
  // const modalFAQ = useModal();
  const modalRegisterOrLogin = useModal();
  const modalAlreadySubscribed = useModal();
  const modalAlreadySubmitted = useModal();
  const modalFraudDetected = useModal();
  const modalDraftLangganan = useModal();

  // start age from 18
  const AGE_OPTION = Array.from({ length: 52 }).map((_, idx) => ({
    label: `${18 + idx} ${trans(locale, lang, 'tahun')}`,
    value: 18 + idx,
  }));

  // Size
  const { isSm, isXl, isLg } = useBreakpoints();

  // REFS
  const trySimulationRef = useRef(null);
  const footerRef = useRef(null);

  // STATE
  const [showFloatBtn, setShowFloatBtn] = useState(true);
  const [showSimulation, setShowSimulation] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedPremiVariant, setSelectedPremiVariant] = useState(
    PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly,
  );
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedDetailCoverage, setSelectedDetailCoverage] = useState(null);
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  const isYearly =
    selectedPremiVariant === PRODUCT.LIFECOVER.PACKAGE_OPTION.annually;
  const isLogin = !!authState.userData?.userId;
  const alreadyEkyc = !!authState.userData?.alreadyKYC;

  // FORM STATE
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    values: {
      age: 0,
      benefit: 500 * JUTA,
      id: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.id,
      planCode: PRODUCT.LIFECOVER.PACKAGE_DATA.lifecover.planCode,
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
  const handleFloatButton = () => {
    if (trySimulationRef?.current && scrollY?.current) {
      const target = trySimulationRef.current?.getBoundingClientRect().y + 3800;
      if (scrollY.current < target) {
        setShowFloatBtn(true);
      } else if (scrollY.current > target) {
        setShowFloatBtn(false);
      }
    }
  };
  const handleRedirectSelectPackage = (value) => {
    router.push({
      pathname: NAVIGATION.LIFECOVER.LifecoverSelectPackage,
      query: value && {
        benefit: value,
      },
    });
  };
  const handleScrollToSimulation = () => {
    return setTimeout(() => {
      if (footerRef.current) {
        const y =
          footerRef.current.getBoundingClientRect().top + window.scrollY;
        window.scroll({
          top: y,
          behavior: 'smooth',
        });
      }
    }, 500);
  };
  const handleShowSimulation = useCallback(() => {
    setShowSimulation(true);
    clearTimeout(handleScrollToSimulation());

    handleScrollToSimulation();
  }, []);
  const handleTogglePremiVariant = useCallback(() => {
    setSelectedPremiVariant(
      isYearly
        ? PRODUCT.LIFECOVER.PACKAGE_OPTION.monthly
        : PRODUCT.LIFECOVER.PACKAGE_OPTION.annually,
    );
  }, [isYearly]);

  //Edit
  const onSubmit = () => {
    if (isLogin) {
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
            lifecoverState.getUserConfirmationDetailResponse.data.status ===
            PAID
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
        router.push(
          addQueryStringUrl(NAVIGATION.LIFECOVER.LifecoverSelectPackage, {
            ...(watchBenefit && { benefit: watchBenefit }),
            ...(selectedAge?.value && { age: selectedAge?.value }),
          }),
        );
      }
    } else {
      modalRegisterOrLogin.open();
    }
  };

  useEffect(() => {
    AOS.init();
    if (scrollY) {
      scrollY.on('change', () => handleFloatButton());
    }
    const html = document.querySelector('html');
    if (html) {
      html.style.scrollSnapType = 'y mandatory';
    }

    return () => {
      html.style.scrollSnapType = 'none';
    };
  }, []);
  useEffect(() => {
    if (isLogin) {
      getUserConfirmationDetail();
      getCurrentSubs();
    }
  }, [isLogin]);
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

  // get age event change
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

  // RENDERER
  const renderLogo = useCallback((variant = 'default') => {
    if (variant === 'dark') {
      return (
        <img
          src={LifecoverLogoDarkLg}
          className="text-[4px] md:text-[10px] h-[8.3em] w-[47.2em]"
          alt="Lifecover Logo"
        />
      );
    }
    return (
      <img
        src={LifecoverLogoLg}
        className="text-[4px] md:text-[10px] h-[8.3em] w-[47.2em]"
        alt="Lifecover Logo"
      />
    );
  }, []);

  const renderTagline = () => {
    return (
      <div className="lg:mt-20 xs:mt-5">
        <span className="text-white xm:text-2xl font-Monstserrat xs:text-xl lg:text-4xl text-red-dark-red90 font-semibold leading-normal">
          {trans(locale, lang, 'adaHari')}
        </span>
      </div>
    );
  };

  const renderToggleSimulation = () => {
    // when sprint multiple simulation
    // return (
    //   <>
    //     <div className="text-[16px] md:text-[24px]">
    //       <strong>Untuk siapa kamu membuat simulasi ini?</strong>
    //     </div>
    //     <div className="flex items-center gap-3 max-w-[440px] mt-5">
    //       <Button outline bordered className="!border-white !text-white text-[14px]">
    //         Diri Sendiri
    //       </Button>
    //       <Button type="linear-gradient" className="text-[14px]">
    //         Keluarga
    //       </Button>
    //     </div>
    //   </>
    // )
    return (
      <Button
        outline
        bordered
        className="!border-white !text-white text-[14px] mx-auto md:ml-0 md:mr-4"
        onButtonClick={handleShowSimulation}>
        <span
          dangerouslySetInnerHTML={{
            __html: trans(locale, lang, 'cobaSimulasi'),
          }}
        />
      </Button>
    );
  };
  const renderFloatButton = () => {
    return (
      <motion.div
        variants={animateFloatBtnVariants}
        animate={showFloatBtn && !selectedDetailCoverage ? 'show' : 'hide'}
        initial="show"
        exit="hide"
        className="fixed z-[999] bottom-[20px] w-full px-[5%] lg:px-0 lg:max-w-[284px] lg:left-[50%] lg:ml-[-160px]">
        <Button
          type="linear-gradient"
          className="md:!py-[17px] md:!h-auto rounded-full w-full max-w-none"
          onButtonClick={() => handleRedirectSelectPackage()}>
          <span
            dangerouslySetInnerHTML={{
              __html: trans(locale, lang, 'mulaiBerlangganan'),
            }}
          />
        </Button>
      </motion.div>
    );
  };
  const renderSelectPackage = () => {
    if (showSimulation) {
      return null;
    }
    return (
      <section className="max-w-7xl mx-auto px-[5%] relative z-10 py-[30px] lg:py-[152px]">
        <h2
          dangerouslySetInnerHTML={{
            __html: trans(locale, lang, 'pilihProteksi'),
          }}
          className="text-[18px] md:text-[24px] text-neutral-dark-neutral80 text-center font-bold mb-[24px] md:mb-[32px]"
        />
        <div className="max-w-[867px] mx-auto">
          <div className="grid grid-cols-12 items-center gap-5 xl:gap-3">
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="col-span-12 sm:col-span-6 xl:col-span-4">
              <CardPackage
                cardVariant="button"
                lang={lang}
                onButtonClick={() => handleRedirectSelectPackage(500 * JUTA)}
              />
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="col-span-12 sm:col-span-6 xl:col-span-4">
              <CardPackage
                variant="lifecoverPlus"
                cardVariant="button"
                lang={lang}
                onButtonClick={() => handleRedirectSelectPackage(1000 * JUTA)}
              />
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="450"
              className="col-span-12 sm:col-span-6 xl:col-span-4">
              <CardPackage
                variant="lifecoverFreechoice"
                cardVariant="button"
                lang={lang}
                onButtonClick={() => handleRedirectSelectPackage(1500 * JUTA)}
              />
            </div>
          </div>
        </div>
      </section>
    );
  };
  const renderCalculateSimulation = () => {
    if (!showSimulation) {
      return null;
    }
    return (
      <div className="bg-white px-[5%] rounded-[16px] min-h-[582px] relative shadow-3xl overflow-hidden py-5 md:py-[45px] mt-[20px] md:mt-[52px]">
        <h2 className="text-[24px] text-neutral-dark-neutral90 text-center font-semibold mb-[42px]">
          {trans(locale, lang, 'hitungSimulasi')}
        </h2>

        <div className="max-w-[557px] mx-auto">
          {!alreadyEkyc && (
            <>
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
              <div className="mt-2">
                <label className="relatize z-20">
                  <div className="text-center text-[14px] font-medium mb-2">
                    {trans(locale, lang, 'pilihUsia')}
                  </div>
                  {/* <Datepicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  placeholder="Pilih Tanggal Lahir"
                /> */}

                  <SelectCustomV2
                    options={AGE_OPTION}
                    labelMenu={trans(locale, lang, 'pilihUsia')}
                    placeholder={trans(locale, lang, 'pilihUsia')}
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
              <hr className="my-5" />
            </>
          )}

          <div
            dangerouslySetInnerHTML={{
              __html: trans(locale, lang, 'pilihPaketLifecover'),
            }}
            className="text-center text-[14px] font-medium mb-2"
          />
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
          <div className=" my-5 md:my-10 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm font-medium relative">
              {trans(locale, lang, 'bayarTahunan')}
              <img
                src={LifesaverInfo}
                alt="InfoIcon"
                className="w-4 h-4 object-contain cursor-pointer"
                onClick={() => setIsInfoClicked(!isInfoClicked)}
              />
              <PembayaranTahunanInfo
                className=""
                lang={lang}
                isClicked={isInfoClicked}
                setIsClicked={() => setIsInfoClicked(!isInfoClicked)}
              />
            </div>
            <Toggle
              active={
                selectedPremiVariant ===
                PRODUCT.LIFECOVER.PACKAGE_OPTION.annually
              }
              onClick={handleTogglePremiVariant}
            />
          </div>

          <Button
            type="linear-gradient"
            disabled={!getPremi.value}
            className="max-w-[481px] mx-auto mt-10 md:mt-20 text-[12px] md:text-[16px]"
            onButtonClick={handleSubmit(onSubmit)}>
            {trans(locale, lang, 'langgananSekarang')}
          </Button>
        </div>
      </div>
    );
  };
  const renderModalDetailCoverage = () => {
    return (
      <ModalCustom
        isOpen={!!selectedDetailCoverage}
        size="md"
        title={selectedDetailCoverage?.title[lang]}
        className="!p-0"
        toggle={() => setSelectedDetailCoverage(null)}
        withCloseToggler>
        <ModalCustom.Body className="pt-7 pb-10 px-5 md:px-10">
          <div className="text-left">
            {selectedDetailCoverage?.contentDetail[lang]}
          </div>
        </ModalCustom.Body>
      </ModalCustom>
    );
  };

  // section renderer
  const renderHeader = () => {
    return (
      <section className="relative flex flex-col justify-between lg:justify-start min-h-screen xl:min-h-[1024px] overflow-hidden">
        {/* desktop background */}
        <img
          data-aos="fade-left"
          src={LifecoverBGLanding1}
          className="hidden md:block absolute w-full h-full left-0 right-0 top-0 bottom-0 object-cover object-right-bottom"
        />
        {/* mobile background */}
        <img
          data-aos="fade-left"
          src={LifecoverBGLandingMobile1}
          className="block md:hidden absolute w-full h-full left-0 right-0 top-0 bottom-0 object-cover object-left-center"
        />
        {/* white decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-white to-transparent md:hidden" />

        <div className="relative z-10">
          <nav className="container-xl relative mx-auto py-[20px]">
            <button className="text-white p-4">
              <Icon
                icon={ic_west}
                size={20}
                onClick={() => router.push(NAVIGATION.HOME.HomeListProduct)}
              />
            </button>
          </nav>

          <div className="max-w-7xl mx-auto px-[5%]">
            <h1 className="text-white text-[24px] md:text-[36px] font-semibold mb-6">
              <div className="mb-2 lg:text-4xl xs:text-xl">
                {trans(locale, lang, 'perlindunganPahlawan')}
              </div>
              <div className="my-5">{renderLogo()}</div>
            </h1>

            <h2
              dangerouslySetInnerHTML={{
                __html: trans(locale, lang, 'lifecoverAdalah'),
              }}
              className="hidden xm:block xs:block md:block xs:bg-white/30 xs:p-2 xs:rounded-xl xm:p-2 xm:rounded-xl lg:bg-transparent lg:p-0 xm:bg-opacity-50 xs:text-[16px] xm:text-lg lg:text-[24px] text-white md:leading-[36px] font-medium max-w-[320px] lg:max-w-[525px]"
            />

            {isSm && renderTagline()}
            {isLg && renderTagline()}
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 px-[5%] pb-[160px] md:pb-[120px]">
          <Button
            outline
            full
            onButtonClick={handleShowSimulation}
            className="lg:max-w-[225px] rounded-full lg:rounded-[16px] md:py-[16px] md:!h-auto lg:mt-8">
            <span
              className="text-white"
              dangerouslySetInnerHTML={{
                __html: trans(locale, lang, 'cobaSimulasi'),
              }}
            />
          </Button>

          {isXl && renderTagline()}
        </div>
      </section>
    );
  };
  const renderSectionAlasan = () => {
    return (
      <section className="relative z-10 min-h-[600px] md:min-h-[780px] md:mt-[-80px] pt-[30px] pb-[50px]">
        <div className="max-w-7xl mx-auto px-[5%] min-h-[646px]">
          <h2
            className="text-primary-dark-primary90 lg:leading-[54px] xm:text-[24px] lg:text-[36px] xs:text-xl font-semibold text-center lg:mt-24 xs:mt-7 xm:mt-5"
            dangerouslySetInnerHTML={{
              __html: trans(locale, lang, 'alasanButuhLifecover'),
            }}
          />

          {/* card keunggulan dan manfaat */}
          <div className="relative overflow-hidden rounded-[16px] shadow-md p-[5%] md:p-[50px] min-h-[646px]">
            <img
              src={LifecoverLandingV2Dec1}
              className="absolute top-0 inset-x-0 h-full w-full object-cover"
              alt=""
            />

            <div className="relative text-center z-10">
              <div
                className="text-[24px] lg:text-[36px] text-neutral-dark-neutral80 mb-[16px]"
                dangerouslySetInnerHTML={{
                  __html: trans(locale, lang, 'keunggulan'),
                }}
              />

              <div className="grid grid-cols-12 gap-3 md:gap-5 mb-10">
                {PRIMARCY_DATA.map((primary, idx) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={idx * 150}
                    className="col-span-12 sm:col-span-6 lg:col-span-4">
                    <CardReason
                      img={primary.img}
                      content={primary.content[lang]}
                    />
                  </div>
                ))}
              </div>

              <div className="text-[24px] lg:text-[36px] text-neutral-dark-neutral80 mb-[16px]">
                {trans(locale, lang, 'manfaat')}
              </div>
              <div className="grid grid-cols-12 gap-3 md:gap-5 mb-10">
                {BENEFIT_DATA.map((primary, idx) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={idx * 150}
                    className={clsx('col-span-12 sm:col-span-6 lg:col-span-3', {
                      'lg:col-start-4': idx === 0,
                    })}>
                    <CardReason
                      img={primary.img}
                      content={primary.content[lang]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  const renderSectionMemberikanKetenangan = () => {
    return (
      <section className="relative z-10 w-full overflow-hidden">
        <section className="relative min-h-screen lg:min-h-[780px]">
          {/* desktop background */}
          <img
            data-aos="fade-up"
            src={LifecoverBGLanding3}
            className="hidden md:block absolute w-full h-full left-0 right-0 top-0 bottom-0 object-cover object-right-top"
          />
          {/* mobile background */}
          <img
            data-aos="fade-up"
            src={LifecoverBGLandingMobile3}
            className="block md:hidden absolute w-full h-full left-0 right-0 top-0 bottom-0 object-cover object-center-top"
          />
          <div className="max-w-7xl mx-auto px-[5%] min-h-[668px] lg:min-h-[1024px] pt-[30px] lg:pt-[180px] relative z-10">
            <h2 className="text-neutral-dark-neutral80 mb-6">{renderLogo()}</h2>
            <div className="p-[5%] md:p-0 bg-white/30 md:bg-transparent rounded-[16px] shadow-sm">
              <div className="text-neutral-dark-neutral80 font-normal max-w-[511px]">
                <div className="text-[18px] text-white xs:text-base font-semibold md:text-[29px] mb-6">
                  {trans(locale, lang, 'memberikanKetenangan')}
                </div>
                <div className="text-[16px] text-white xs:text-sm md:text-[24px] md:leading-[36px] mb-[30px]">
                  {trans(locale, lang, 'karenaKamu')}
                </div>
                <div className="text-[16px] text-white md:text-[24px] md:leading-[36px]">
                  {trans(locale, lang, 'berinvestasi')}
                </div>

                <div>
                  <span>{renderTagline()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  };
  const renderSectionLindungi = () => {
    return (
      <section className="relative min-h-[600px] md:min-h-[1027px] mt-[-40px]">
        {/* desktop background */}
        <img
          src={LifecoverBGLanding2}
          className="hidden md:block absolute w-full h-full left-0 right-0 top-0 bottom-0 object-cover object-right-top"
        />
        {/* mobile background */}
        <img
          src={LifecoverBGLandingMobile2}
          className="block md:hidden absolute w-full h-full left-0 right-0 top-0 bottom-0 object-cover object-center-top"
        />
        <div
          data-aos="fade-up"
          className="max-w-7xl mx-auto px-[5%] min-h-[1024px] pt-[100px] relative z-10">
          <div className="max-w-[575px]">
            <div className="text-white text-[36px] flex flex-col lg:gap-8 xs:gap-5 xm:gap-2 font-bold lg:mb-7 md:md-7 xm:mb-5 mb-4">
              {renderLogo()}
              <span className="text-lg lg:leading-10 xs:leading-5 xm:leading-7 md:text-[29px] ">
                {trans(locale, lang, 'lindungiOrangTersayang')}
              </span>
            </div>

            <div className="text-white text-[18px] xs:text-sm md:text-[24px] font-semibold mb-4">
              {trans(locale, lang, 'melindungiKeluarga')}
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              {COVERAGE_DATA.map((coverage, idx) => (
                <div key={idx} className="flex-1">
                  <CardCoverage
                    lang={lang}
                    title={coverage.title[lang]}
                    // content={coverage.content[lang]}
                    onClickDetail={() => setSelectedDetailCoverage(coverage)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  // Untuk kalian / LifeCOVER Tidak Berlaku Bila
  const renderSectionUntukKlian = () => {
    return (
      // <section className="relative z-20 min-h-[600px] pt-[40px] mt-[-40px] mb-[40px] lg:min-h-[1027px] pb-[164px]">
      <section className="relative z-20 min-h-[600px] pt-[40px] mt-[-40px] mb-[40px] lg:min-h-screen pb-[164px]">
        {/* decoration */}
        <img
          src={LifecoverLandingV2Dec2}
          className="absolute top-[40px] inset-x-0 h-full w-full object-cover"
          alt=""
        />

        <div className="z-10 w-full max-w-7xl mx-auto px-[5%]">
          {/* content video */}
          {/* <div className="min-h-[591px]">
            <div className="absolute bg-white w-full max-w-[1287px] top-0 right-0 shadow-lg rounded-l-[16px] min-h-[591px] py-[28px]">
              <h2 className="text-[36px] font-semibold mb-7 px-[52px]">
                Life<i>COVER</i> untuk kalian
              </h2>

              <div className="pl-[52px] mb-[50px]">
                <CardSwiper data={YOUTUBE_DATA} />
              </div>
            </div>
          </div> */}

          <div className="relative pt-[100px]">
            <h2
              dangerouslySetInnerHTML={{
                __html: trans(locale, lang, 'pengecualian'),
              }}
              className="text-[24px] lg:text-[36px] font-semibold text-center mb-10"
            />

            <div className="flex flex-col md:flex-row gap-5 max-w-[927px] mx-auto">
              {EXCEPTION_DATA.map((exceptionData, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                  className="flex-1">
                  <CardException
                    img={exceptionData.img}
                    title={exceptionData.title[lang]}
                    content={exceptionData.content[lang]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  const renderSectionCobaSimulasi = () => {
    return (
      <section
        ref={trySimulationRef}
        className="relative bg-[#FAAD47] lg:min-h-[365px] overflow-hidden">
        {/* decoration */}
        <img
          src={LifecoverLandingDec2}
          className="absolute top-0 inset-x-0 w-full object-cover"
          alt=""
        />

        <div className="max-w-6xl mx-auto px-[5%] relative z-10 py-[30px] lg:pt-[52px] lg:pb-[55px]">
          <div className="flex flex-col items-center md:flex-row gap-[30px] lg:gap-[54px] md:items-center justify-center">
            <div
              data-aos="fade-right"
              data-aos-duration="750"
              className="flex-initial flex-shrink-0">
              <div className="text-[8px] sm:text-[9px] lg:text-[10px] w-full sm:w-[43.1em] h-[28.2em] rounded-[5px] shadow-md overflow-hidden">
                <img
                  src={LifecoverLandingImg3}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="750"
              className="flex-1 text-white text-center md:text-left max-w-[550px]">
              <h2
                dangerouslySetInnerHTML={{
                  __html: trans(locale, lang, 'yukCobaSimulasi'),
                }}
                className="text-[24px] lg:text-[40px] font-semibold lg:leading-[47px] max-w-[290px] mx-auto md:mx-0 mb-[14px] md:mb-[18px]"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: trans(locale, lang, 'masihRagu'),
                }}
                className="text-[16px] lg:text-[24px] font-medium md:leading-[36px] mb-7"
              />

              {renderToggleSimulation()}
            </div>
          </div>
        </div>
      </section>
    );
  };
  const renderFooter = () => {
    return (
      <section
        ref={footerRef}
        className="relative min-h-[816px] overflow-hidden">
        {/* decoration */}
        <img
          src={LifecoverLandingV2Dec3}
          className="absolute bottom-0 left-0 w-full object-cover"
          alt=""
        />

        <div className="max-w-[830px] mx-auto px-[5%] pt-[20px] md:pt-[54px]">
          {renderCalculateSimulation()}
        </div>
        {renderSelectPackage()}

        <div className="relative z-10">
          <BoxHelp
            lang={lang}
            onClickRiplay={() => modalRiplay.open()}
            onClickTnc={() => modalTnc.open()}
            onClickFaq={() => router.push(NAVIGATION.LIFECOVER.LifecoverFAQ)}
          />

          <div className="px-[5%] text-gray-500 mt-[50px] font-medium text-xs text-center pb-[30px]">
            {trans(locale, lang, 'footer')}
          </div>
        </div>
      </section>
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
          onButtonClick={modalAlreadySubscribed.toggle}>
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
          onButtonClick={modalAlreadySubmitted.toggle}>
          {trans(locale, lang, 'btnKembali')}
        </Button>
      </ModalCustom>
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
    <>
      <link
        href="https://uat.life.id/?utm_source=socialmedia&utm_medium=email&utm_campaign=fimela_lifefest&utm_id=lifefest_generic&utm_content=abcd1234"
        rel="stylesheet"
      />
      <Container fullScreen noBackground className="bg-white">
        {renderHeader()}
        {renderSectionAlasan()}
        {renderSectionMemberikanKetenangan()}
        {renderSectionLindungi()}
        {renderSectionUntukKlian()}
        {renderSectionCobaSimulasi()}
        {renderFooter()}

        {renderFloatButton()}
        {renderModalDetailCoverage()}

        {renderModalAlreadySubscribed()}
        {renderModalAlreadySubmitted()}
        {renderModalFraudDetected()}
        {renderModalDraftLangganan()}
      </Container>
      {!isLogin && (
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
      )}
      <LifecoverTnc
        showModalLsTnc={modalTnc.isOpen}
        setShowModalLsTnc={modalTnc.set}
      />
      <LifecoverRiplay
        showModalLcRiplay={modalRiplay.isOpen}
        setShowModalLcRiplay={modalRiplay.set}
      />
      {/* <LifecoverFAQ
        showModalLcFaq={modalFAQ.isOpen}
        setShowModalLcFaq={modalFAQ.set}
      /> */}
    </>
  );
};

export default LifecoverMainV2;
