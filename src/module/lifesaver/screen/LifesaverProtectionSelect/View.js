import _ from 'lodash';
import axios from 'axios';
import clsx from 'classnames';
import Image from 'next/image';
import locale from './locale';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { trans } from '@cp-util/trans';
import { getBrowser } from '@cp-util/common';
import { GoogleLogin } from 'react-google-login';
import { useEffect, useState, useMemo, useCallback, forwardRef } from 'react';
import { Google1, Present } from '@cp-config/Svgs';
import { setCheckEmail } from '@cp-module/profile/profileApi';
import { SET_LOGIN_SOCIAL_SUCCESS } from '@cp-module/login/loginConstant';
import { SET_SUBMISSION_SUCCESS } from '@cp-module/lifesaver/lifesaverConstant';
import { Alert, Button, Modal } from '@cp-component';
import {
  codeLifesaver,
  NAVIGATION,
  RESPONSE_STATUS,
  GOOGLE_PEOPLE_API,
  DEVICE_PLATFORM,
} from '@cp-util/constant';
import { Check, Toa, IconIfgWhite, IconIfgRed } from '@cp-config/Images';
import {
  Close,
  XShield,
  XShieldActive,
  LifesaverCheck,
  LifesaverInfo,
  LifesaverProtection,
  LifesaverProtectionDisabled,
} from '@cp-config/Svgs';
import Icon from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/fa';
import { chevronCircleRight } from 'react-icons-kit/fa';
import { useRef } from 'react';
import { chevronCircleLeft } from 'react-icons-kit/fa';
import { eventAppsflyer } from '@cp-util/func';
import ButtonProduct from './components/ButtonProduct';
import useProductList from './hooks/useProductList';

const Page = forwardRef((props, ref) => {
  const {
    alreadyKYC,
    setLoading,
    width,
    lang,
    userId,
    getProducts,
    getProductsResponse,
    lifesaverAction,
    isDDBenefitActive,
    setDDBenefitActive,
    isDDWaterSportActive,
    setDDWaterSportActive,
    showDetailMedicalInjury,
    setDetailMedicalInjury,
    setDetailSportInjury,
    showDetailSportInjury,
    getIsUserEligible,
    getIsUserEligibleClear,
    getIsUserEligibleError,
    getIsUserEligibleResponse,
    getCurrentSubs,
    getCurrentSubsError,
    getCurrentSubsResponse,
    setSubmission,
    setSubmissionError,
    setSubmissionClear,
    setSubmissionResponse,
    setShowModalBenefit,
    setShowModalLsTnc,
    setShowModalLsRiplay,
    setWaiting,
    setWaitingResponse,
    setWaitingError,
    refProp,
    product,
    setLoginSocial,
    loginAction,
    deviceId,
    setCustomerCare,
    setRequestOtpClear,
    setInternalServerError,
    setAvailableOnMobile,
    setAppsflyerData,
    getEligiblePosResponse,
    setBuyForOthersState,
    buyForOthersFormState,
  } = props;

  const router = useRouter();
  const [showTnc, setShowTnc] = useState(false);
  const [showTncNotLogin, setShowTncNotLogin] = useState(false);
  const [showNotLogin, setShowNotLogin] = useState(false);
  const [showAlreadySubs, setShowAlreadySubs] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSelectPlan, setIsSelectPlan] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [productActive, setProductActive] = useState(1);
  const [agreementProduct, setAgreementProduct] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [isFlagWaiting, setFlagWaiting] = useState(false);
  const [isShowModalAge, setIsShowModalAge] = useState(false);
  const [isShowModalSubsError, setIsShowModalSubsError] = useState(false);
  const [scrollX, setScrollX] = useState(0); // For detecting start scroll postion
  const [scrollEnd, setScrollEnd] = useState(false); // For detecting end of scrolling
  const [showBenefitPos, setShowBenefitPos] = useState(false);
  const [activeProductSelect, setActiveProductSelect] = useState({});

  const translate = (val) => trans(locale, lang, val);

  const {
    query: { eventId },
  } = router;

  // constant
  const linearGradient =
    'linear-gradient(130.29deg, #FBB04C -67.36%, #FD8C48 -29.48%, #FE684D 12.86%, #F43036 52.97%, #F0232B 95.31%, #ED1C24 129.34%, #ED1C24 146.57%)';



  const {listProtection, ListTitleProtection} = useProductList({translate})
  useEffect(()=>{
    if (
      getEligiblePosResponse?.isEligible &&
      userId !== '' &&
      listProtection.length < 3
    ) {
      setShowBenefitPos(true);
    }
  },[listProtection])

  const isHaveSubs = useMemo(() => {
    if (getCurrentSubsResponse?.status == 'ACTIVE') {
      setShowTnc(false);
      return getCurrentSubsResponse?.planName?.replace(/ /g, '');
    }
    return false;
  }, [getCurrentSubsResponse?.planName, getCurrentSubsResponse?.status]);

  const lifesaverResult = useCallback((act) => {
    switch (act) {
      case SET_SUBMISSION_SUCCESS:
        setIsSubmit(true);
        break;
      default:
        break;
    }
  }, []);

  const onSubscribe = () => {
    if (userId && isEligible && alreadyKYC) {
      if (getCurrentSubsResponse?.status != 'ACTIVE') {
        setAgreementProduct(selectedPackage);
      }
    }
    if (getCurrentSubsResponse?.status != 'ACTIVE') {
      if (eventId) {
        setShowTnc(false);
      } else {
        if (!userId) {
          setShowTncNotLogin(true);
        } else {
          setShowTnc(true);
        }
      }
    }
    if (getCurrentSubsError?.message == 'INTERNAL_SERVER_ERROR') {
      setInternalServerError(true);
    }
    if (getCurrentSubsResponse?.planName == 'LifeSAVER+') {
      setShowAlreadySubs(true);
    }
  };

  const onSubscribeOther = () => {
    if (!userId) {
      return setShowNotLogin(true);
    }
    setAgreementProduct(selectedPackage);
    setModalSubsForOther(true);
  };

  const onSubmitAgreement = () => {
    setSubmission({
      product: {
        productCode: codeLifesaver?.productCode,
        planCode: codeLifesaver[selectedPackage]?.planCode,
        type: codeLifesaver?.subsType?.start,
        price: parseInt(
          getProductsResponse?.[selectedPackage]?.biayaLangganan,
          10,
        ),
      },
      agreement: {
        tnc: 'yes',
        riplay: 'yes',
      },
    });
    setShowTnc(false);
    setLoading(true);
  };

  const onSelectPlan = () => {
    if (isHaveSubs) {
      if (
        getCurrentSubsResponse?.planName == 'LifeSAVER+' &&
        !modalSubsForOther
      ) {
        setShowAlreadySubs(true);
      }
    } else {
      onSubscribe();
    }
  };

  // end register by google
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
                  product: selectedPackage,
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
        router.push(
          {
            pathname: NAVIGATION.LIFESAVER.LifesaverMain,
            query: { product },
          },
          NAVIGATION.LIFESAVER.LifesaverMain,
        );
      }
      setLoading(false);
    },
    [router, setLoading],
  );

  useEffect(() => {
    setBothLoginResult(loginAction);
  }, [loginAction, setBothLoginResult]);
  // end register by google

  // hook
  useEffect(() => {
    if (product) {
      if (getCurrentSubsResponse?.status != 'ACTIVE') {
        setShowTnc(false);
        setSelectedPackage(product);
        setIsSelectPlan(true);
      }
      if (getCurrentSubsResponse?.planName == 'LifeSAVER+') {
        setShowAlreadySubs(true);
      }
    }
  }, [product, getCurrentSubsResponse]);

  useEffect(() => {
    if (showBenefitPos) {
      if (product == 'lifesaverpos') {
        setProductActive(0);
      } else if (product == 'lifesaver') {
        setProductActive(1);
      } else if (product == 'lifesaverplus') {
        setProductActive(2);
      }
    } else {
      if (product == 'lifesaver') {
        setProductActive(0);
      } else if (product == 'lifesaverplus') {
        setProductActive(1);
      }
    }
  }, [product, showBenefitPos]);

  useEffect(() => {
    getProducts();
    getCurrentSubs();
  }, []);

  useEffect(() => {
    if (!product) {
      getIsUserEligibleClear();
    }
  }, [product]);

  useEffect(() => {
    if (setSubmissionResponse?.masterInvoice && isSubmit) {
      // CLOSE PAYMENT GATEWAY

      const _payload = {
        af_user_id: userId,
        af_currency: 'IDR',
        af_content_id: setSubmissionResponse?.transactionId,
        af_price: activeProductSelect?.priceTag,
        af_product: 'lifesaver',
        af_plan: activeProductSelect?.plan,
      };

      setAppsflyerData(_payload);
      eventAppsflyer({
        eventName: 'af_open_subscribe',
        payload: _payload,
      });

      router.push(
        {
          pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
          query: {
            ...setSubmissionResponse,
            product: agreementProduct,
            from: 'start',
          },
        },
        NAVIGATION.LIFESAVER.LifesaverConfirm,
      );
      setLoading(false);
      setIsSubmit(false);
    }
    setLoading(false);
  }, [setSubmissionResponse, isSubmit]);

  useEffect(() => {
    lifesaverResult(lifesaverAction);
  }, [lifesaverAction, lifesaverResult]);

  useEffect(() => {
    if (isSelectPlan && getCurrentSubsResponse?.start != 'ACTIVE') {
      onSelectPlan();
      setIsSelectPlan(false);
    }
  }, [isSelectPlan, getCurrentSubsResponse]);

  // handle event
  useEffect(() => {
    if (product) {
      // Handle Bajo
      if (
        getIsUserEligibleResponse?.data?.data?.eventCode === 'BAJO2022' &&
        getIsUserEligibleResponse?.data?.data?.isSubscribed === false
      ) {
        router.push({
          pathname: NAVIGATION.LIFESAVER.LifesaverBajoRun,
        });
      }

      // Handle Event
      if (getIsUserEligibleResponse?.data?.data?.eventId) {
        setShowTnc(false);
      }
    }

    if (getIsUserEligibleResponse?.status) {
      setIsEligible(true);
    }
  }, [product, getIsUserEligibleResponse]);

  useEffect(() => {
    if (getIsUserEligibleError?.message) {
      if (getIsUserEligibleError.message === 'NOT_ELIGIBLE') {
        setIsEligible(false);
      }
      if (getIsUserEligibleError.message === 'DATA_NOT_EXISTS') {
        setIsEligible(false);
      }
      if (getIsUserEligibleError.message === 'INTERNAL_SERVER_ERROR') {
        setInternalServerError(true);
      }
    }
  }, [getIsUserEligibleError]);

  useEffect(() => {
    if (setWaitingResponse?.status && isFlagWaiting) {
      setIsWaiting(true);
      setFlagWaiting(false);
    }
  }, [setWaitingResponse, isFlagWaiting]);

  useEffect(() => {
    if (setWaitingError?.message && isFlagWaiting) {
      if (setWaitingError.message === 'DATA_ALREADY_EXISTS') {
        setIsWaiting(true);
      }
      if (setWaitingError.message === 'DATA_NOT_EXISTS') {
        setIsWaiting(false);
      }
      setFlagWaiting(false);
    }
  }, [setWaitingError]);

  // ketika klik pilih produk
  const handleClickSubscribe = (selectedProduct) => {
    setSelectedPackage(selectedProduct);
    setIsSelectPlan(true);
  };

  const renderDetailBenefit = () => {
    if (!isDDBenefitActive) return;

    function renderContent() {
      return (
        <>
          <ul className="list-decimal pl-4 mb-4 text-xs text-left font-normal">
            <li className="pb-2">{trans(locale, lang, 'benefit_list1')}</li>
            <li className="pb-2">{trans(locale, lang, 'benefit_list2')}</li>
            <li className="pb-2">{trans(locale, lang, 'benefit_list3')}</li>
          </ul>
          <div className="text-gray-500 italic mb-4 text-xs text-left">
            {trans(locale, lang, 'benefit_tnc')}
          </div>
          <Alert
            onClick={() => setShowModalLsRiplay(true)}
            className="text-neutral-light-neutral90 leading-3 text-[10px] text-left md:leading-4 md:text-caption1 group">
            {trans(locale, lang, 'benefit_alert')}
            <span className="text-red-600 group-hover:underline">
              {trans(locale, lang, 'benefit_alert1')}
            </span>
          </Alert>
        </>
      );
    }

    return (
      <>
        {/* Mobile */}
        <Modal isOpen={isDDBenefitActive} mainClassname="md:hidden">
          <div className="p-2 w-full flex gap-2 items-center text-start font-bold mb-4 border-b">
            <div
              className="flex items-center"
              role="button"
              onClick={() => setDDBenefitActive(false)}>
              <Image src={Close} width={28} height={28} />
            </div>
            {trans(locale, lang, 'infoManfaat')}
          </div>
          {renderContent()}
        </Modal>

        {/* Desktop */}
        <div className="hidden md:block absolute top-2 left-2 shadow-md bg-white rounded-2xl rounded-tl-none p-6 z-50 text-caption1 text-neutral-light-neutral80 w-[400px] font-medium ">
          <div className="font-bold mb-4 text-base">
            {trans(locale, lang, 'infoManfaat')}
          </div>
          {renderContent()}
        </div>
      </>
    );
  };

  const renderDetailWaterSport = () => {
    if (!isDDWaterSportActive) return;

    const dataWaterSport = [
      'arumJeram',
      'berenang',
      'cliffDiving',
      'flyboarding',
      'freeDiving',
      'jetski',
      'kano',
      'kayak',
      'memancing',
      'parasailing',
      'poloAir',
      'scubaDiving',
      'skiAir',
      'snorkeling',
      'speedBoat',
      'surfing',
      'windSurfing',
    ];

    function renderContent() {
      return (
        <>
          <p className="font-bold mb-4 text-xs md:text-sm">
            {trans(locale, lang, 'titleModalOlahragaAir')}
            <span className="italic">SAVER</span>+
          </p>
          <div className="flex flex-wrap">
            {dataWaterSport?.map((e, i) => (
              <div key={i} className="w-1/2 flex items-center gap-2">
                <div>
                  <Image src={LifesaverCheck} width={18} height={18} />
                </div>
                <p className="text-xs md:text-sm">{translate(e)}</p>
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        {/* Mobile */}
        <Modal isOpen={isDDWaterSportActive} mainClassname="md:hidden">
          <div className="p-2 w-full flex gap-2 items-center text-start text-body1 font-bold mb-4 border-b">
            <div
              className="flex items-center"
              role="button"
              onClick={() => setDDWaterSportActive(false)}>
              <Image src={Close} width={28} height={28} />
            </div>
            {trans(locale, lang, 'daftarOlahragaAir')}
          </div>
          {renderContent()}
        </Modal>
        {/* Desktop */}
        <div className="hidden md:block absolute top-2 left-2 shadow-md bg-white rounded-2xl rounded-tl-none p-6 z-50 text-caption1 text-neutral-light-neutral80 w-[400px] font-medium">
          <div className="font-bold mb-4 text-base">
            {trans(locale, lang, 'daftarOlahragaAir')}
          </div>
          {renderContent()}
        </div>
      </>
    );
  };

  // popup segala kondisi
  useEffect(() => {
    if (setSubmissionError?.message) {
      switch (setSubmissionError?.message) {
        case 'AGE_OVER_69':
        case 'AGE_UNDER_18':
          setIsShowModalAge(true);
          break;
        default:
          if (setSubmissionError?.message?.length) {
            setIsShowModalSubsError(true);
          }
          break;
      }
      setLoading(false);
    }
  }, [setSubmissionError]);

  const modalAge = () => {
    return (
      <Modal isOpen={isShowModalAge}>
        <div className="relative w-full pt-10 flex gap-2 items-center justify-center mb-5">
          <img
            src={Toa}
            className={clsx(
              'absolute -bottom-4  left-1/2 transform -translate-x-1/2 max-w-none',
              isWaiting ? 'w-[45%] pb-4' : 'w-[56%]',
            )}
          />
        </div>
        <div className="font-bold text-h6 text-center mb-2">
          {translate('modalAgeTitle')}
        </div>
        <div className="text-center text-sm">
          {translate('modalAgeSubtitle')}
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            full
            outline
            className="text-sm border-red-300"
            onButtonClick={() => {
              setIsShowModalAge(false);
              setCustomerCare(true);
              setSubmissionClear();
            }}>
            {translate('modalAgeBtn')}
          </Button>
          <Button
            type="linear-gradient"
            full
            className="text-sm"
            onButtonClick={() => {
              setIsShowModalAge(false);
              setSubmissionClear();
            }}>
            {translate('modalAgeBtnBack')}
          </Button>
        </div>
      </Modal>
    );
  };

  const modalReadyToSubmission = () => {
    return (
      <Modal isOpen={showTnc}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-4">
          <div
            role="button"
            className="absolute flex items-center left-0 z-50"
            onClick={() => {
              setShowTnc(false);
            }}>
            <Image src={Close} width={32} height={32} />
          </div>

          <div className="relative w-full">
            <p className="text-center font-bold">{translate('tnc')}</p>
          </div>
        </div>

        {userId && isEligible && (
          <p className="text-body2 leading-6 font-medium text-neutral-light-neutral80 mt-6 mb-8">
            {translate('eligible1')}
            <span
              onClick={() => setShowModalLsTnc(true)}
              className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
              {translate('loginEligible3')}
            </span>
            {translate('loginEligible4')}
            <span
              onClick={() => setShowModalLsRiplay(true)}
              className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
              {translate('loginEligible5')}
            </span>
            {translate('eligibleKyc1')}
          </p>
        )}

        <div>
          <Button
            type="linear-gradient"
            full
            className="text-sm"
            onButtonClick={() => {
              onSubmitAgreement();
            }}>
            {translate('sayaSetuju')}
          </Button>
        </div>
      </Modal>
    );
  };

  const modalNotEkyc = () => {
    return (
      <Modal
        isOpen={showTnc}
        toggle={() => {
          setShowTnc(false);
        }}>
        <p className="font-bold text-base text-center">{translate('tnc')}</p>

        <p className="text-body2 leading-6 font-medium text-neutral-light-neutral80 mt-6 mb-8">
          {translate('loginEligible2')}
          <span
            onClick={() => setShowModalLsTnc(true)}
            className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
            {translate('loginEligible3')}
          </span>
          {translate('loginEligible4')}
          <span
            onClick={() => setShowModalLsRiplay(true)}
            className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
            {translate('loginEligible5')}
          </span>
          {translate('loginEligibleKyc2')}
        </p>

        <div>
          <Button
            type="linear-gradient"
            full
            className="text-sm"
            onButtonClick={() => {
              router.push(
                {
                  pathname: NAVIGATION.KYC.KycMain,
                  query: {
                    product: selectedPackage,
                  },
                },
                NAVIGATION.KYC.KycMain,
              );
            }}>
            {translate('loginEligibleKyc3')}
          </Button>
        </div>
      </Modal>
    );
  };

  const modalAlreadySubs = () => {
    return (
      <Modal
        isOpen={showAlreadySubs}
        size="sm"
        className="relative flex flex-col justify-center items-center py-20">
        <div
          role="button"
          className="absolute left-2 top-3"
          onClick={() => {
            setShowAlreadySubs(false);
          }}>
          <img src={Close} width={32} height={32} />
        </div>
        <img src={Check} className="max-w-[120px] w-full mb-10" />
        <p className="font-bold text-center w-2/3 text-body2 md:text-body1">
          {translate('alreadySubTitle')}
          <span className="italic">SAVER+</span>
        </p>
      </Modal>
    );
  };
  // end popup segala kondisi

  const renderDetailMedicalInjury = () => {
    if (!showDetailMedicalInjury) return;

    return (
      <>
        {/* Mobile */}
        <Modal isOpen={showDetailMedicalInjury} mainClassname="md:hidden">
          <div className="p-2 w-full flex gap-2 items-center text-start text-body1 font-bold mb-4 border-b">
            <div
              className="flex items-center"
              role="button"
              onClick={() => setDetailMedicalInjury(false)}>
              <Image src={Close} width={28} height={28} />
            </div>
            {trans(locale, lang, 'infoMasaTunggu')}
          </div>
          <div className="mb-4 text-base text-left">
            {trans(locale, lang, 'infoMasaTungguContent')}
          </div>
        </Modal>
        {/* Desktop */}
        <div className="hidden md:block absolute top-2 left-2 shadow-md bg-white rounded-2xl rounded-tl-none p-6 z-50 text-caption1 text-neutral-light-neutral80 w-[400px] font-medium">
          <p className="font-bold mb-4 text-sm text-center">
            {trans(locale, lang, 'infoMasaTunggu')}
          </p>
          <p className="text-sm text-left">
            {trans(locale, lang, 'infoMasaTungguContent')}
          </p>
        </div>
      </>
    );
  };

  const renderDetailSportInjury = () => {
    if (!showDetailSportInjury) return;

    return (
      <>
        {/* Mobile */}
        <Modal isOpen={showDetailSportInjury} mainClassname="md:hidden">
          <div className="p-2 w-full flex gap-2 items-center text-start text-body1 font-bold mb-4 border-b">
            <div
              className="flex items-center"
              role="button"
              onClick={() => setDetailSportInjury(false)}>
              <Image src={Close} width={28} height={28} />
            </div>
            {trans(locale, lang, 'infoMasaTungguSport')}
          </div>
          <div className="mb-4 text-base text-left">
            {trans(locale, lang, 'infoMasaTungguSportContent')}
          </div>
        </Modal>
        {/* Desktop */}
        <div className="hidden md:block absolute top-2 left-2 shadow-md bg-white rounded-2xl rounded-tl-none p-6 z-50 text-caption1 text-neutral-light-neutral80 w-[400px] font-medium">
          <div className="font-bold mb-4 text-sm text-center">
            {trans(locale, lang, 'infoMasaTungguSport')}
          </div>
          <div className="text-sm text-left">
            {trans(locale, lang, 'infoMasaTungguSportContent')}
          </div>
        </div>
      </>
    );
  };

  // main
  const renderListManfaat = () => {
    return (
      <div className="md:w-[30%] xs:w-[50%] z-40" data-aos="flip-up">
        <div className="relative h-16 rounded-t-2xl md:text-center font-bold flex justify-between items-end pb-4 px-1 md:px-3 md:h-28">
          <p className="text-xs md:text-base">{translate('title1')}</p>
          <div
            role="button"
            className="relative xm:mb-0 xs:mb-5"
            onClick={(e) => {
              e.stopPropagation();
              setDDBenefitActive(!isDDBenefitActive);
            }}>
            <img src={LifesaverInfo} className="w-3 md:w-4" />
            {renderDetailBenefit()}
          </div>
        </div>

        <div className="border">
          {ListTitleProtection?.map((item, i) => (
            <div
              key={i}
              className={clsx(
                'h-20 px-1 border-b flex items-center md:p-3 md:h-[80px]',
                !i ? 'border-t' : '',
              )}>
              <div className="w-full">
                {item?.isPromo && (
                  <div className="w-max px-3 rounded-full mb-1 bg-primary-light-primary90 text-white text-[8px] sm:text-[9px] font-medium">
                    Promo
                  </div>
                )}
                <div className="flex justify-between gap-2 items-center">
                  <p
                    className={`w-full text-[9px] sm:text-[10px] leading-3 max-w-[150px] md:text-body2 md:leading-4 ${
                      item?.specials ? 'font-bold' : ''
                    }`}>
                    {item?.text}
                    {item?.tnc && (
                      <span className="text-primary-light-primary90">*</span>
                    )}
                    {item?.specials && (
                      <span className="text-primary-light-primary90">*</span>
                    )}
                  </p>
                  {item?.withDetail &&
                    (i === 2 ? (
                      <div
                        role="button"
                        className="relative mb-5"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDDWaterSportActive(!isDDWaterSportActive);
                        }}>
                        <img src={LifesaverInfo} className="w-4" />
                        {renderDetailWaterSport()}
                      </div>
                    ) : i === 0 ? (
                      <div
                        role="button"
                        className="relative mb-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailMedicalInjury(!showDetailMedicalInjury);
                        }}>
                        <img src={LifesaverInfo} className="w-4" />
                        {renderDetailMedicalInjury()}
                      </div>
                    ) : i === 5 ? (
                      <div
                        role="button"
                        className="relative mb-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailSportInjury(!showDetailSportInjury);
                        }}>
                        <img src={LifesaverInfo} className="w-4" />
                        {renderDetailSportInjury()}
                      </div>
                    ) : null)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  console.log(listProtection)

  const renderProduct = () => {
    return (
      <>
        { listProtection.length &&  listProtection?.map((item, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 150}
            onClick={() => {
              setProductActive(idx);
              setActiveProductSelect(item);
              setSelectedPackage(item?.plan);
            }}
            className="w-full text-body2 mb-3 cursor-pointer">
            <div
              className={`${
                productActive == idx
                  ? 'text-white'
                  : 'text-red-dark-red90 bg-red-light-red20 opacity-40'
              } duration-300 flex h-16 justify-center flex-col rounded-t-2xl text-center px-3 md:h-28`}
              style={{
                backgroundImage: productActive == idx && linearGradient,
              }}>
              <div className="text-[9px] xm:text-body2 font-bold md:text-h5">
                {item.title1}
                <span className="italic">{item.title2}</span>
                {item.title3 ? ' ' + item.title3 : ''}
              </div>
              <div className="text-[9px] pt-1 xm:text-[11px] md:text-sm">
                {item.price}
              </div>
            </div>

            <div
              className={clsx(
                'duration-500 rounded-b-2xl',
                width >= 768 && productActive == idx
                  ? 'md:border border-red-500'
                  : 'md:border border-gray-200',
              )}>
              <div
                className={clsx(
                  'border',
                  width < 768 && productActive != idx
                    ? 'border-gray-100 md:border-transparent'
                    : 'border-primary-light-primary90 md:border-transparent',
                  productActive != idx ? ' opacity-40 ' : '',
                )}>
                {item.detail?.map((e, i) => (
                  <div
                    key={i}
                    className="relative h-20 px-1 border-b flex items-center md:h-[80px]">
                    {e?.claim === '' && (
                      <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-40%]">
                        <div className="w-4 md:w-6">
                          <Image
                            src={
                              productActive === idx ? XShieldActive : XShield
                            }
                            width={24}
                            height={24}
                          />
                        </div>
                      </div>
                    )}
                    {e?.claim === true ? (
                      <div className="w-full text-center">
                        <div className="w-4 md:w-6 mx-auto">
                          <Image
                            className="w-4 md:w-6"
                            src={
                              productActive === idx
                                ? LifesaverProtection
                                : LifesaverProtectionDisabled
                            }
                            width={24}
                            height={24}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full text-center">
                        <div className="text-[9px] sm:text-body2 font-bold w-full md:text-h6">
                          {e?.claim}
                        </div>
                        {e.cashless && (
                          <div className="text-[8px] sm:text-[10px] font-bold text-gray-400">
                            Cashless
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div
                className={`${
                  productActive == idx
                    ? 'text-white md:text-red-dark-red90'
                    : 'text-red-dark-red90 bg-red-light-red20 opacity-40 md:bg-transparent'
                } duration-300 flex h-16 justify-center flex-col rounded-b-2xl text-center md:pt-5 md:px-3 md:h-unset`}
                style={{
                  backgroundImage:
                    width < 768 && productActive == idx && linearGradient,
                }}>
                <div className="text-xs xm:text-body2 font-bold md:text-h5 leading-[1]">
                  {item.title1}
                  <span className="italic">{item.title2}</span>
                  {item.title3 ? ' ' + item.title3 : ''}
                </div>
                <div className="text-[9px] pt-1 xm:text-[11px] md:text-sm">
                  {item.price}
                </div>
              </div>

              <ButtonProduct
                 translate={translate}
                 trans={trans}
                 lang={lang}
                 locale={locale}
                 getCurrentSubsResponse={getCurrentSubsResponse}
                 setSelectedPackage={setSelectedPackage}
                 showBenefitPos={showBenefitPos}
                 onSubscribeOther={onSubscribeOther}
                 setShowModalBenefit={setShowModalBenefit}
                 setAvailableOnMobile={setAvailableOnMobile}
                 productActive={productActive}
                 idx={idx}
                 item={item}
                 handleClickSubscribe={handleClickSubscribe}
              />
            </div>
          </div>
        ))}
      </>
    );
  };

  const handleSubscribeOnMobile = () => {
    if (showBenefitPos) {
      if (productActive == 0) {
        handleClickSubscribe('lifesaverpos');
      } else if (productActive == 1) {
        handleClickSubscribe('lifesaver');
      } else if (productActive == 2) {
        handleClickSubscribe('lifesaverplus');
      }
    } else {
      handleClickSubscribe(Object.keys(getProductsResponse)[productActive]);
    }
  };

  const renderListLifesaverMobile = () => {
    return (
      width < 768 && (
        <>
          {getCurrentSubsResponse?.planName == 'LifeSAVER' ? (
            <>
              <Button
                full
                type={'linear-gradient'}
                disabled={
                  showBenefitPos
                    ? productActive == 0 || productActive == 1
                      ? true
                      : false
                    : productActive == 0
                    ? true
                    : false
                }
                className="text-xs mt-8 mx-auto h-10 xm:text-body2"
                onButtonClick={() => {
                  setAvailableOnMobile(true);
                }}>
                {showBenefitPos
                  ? productActive == 0 || productActive == 1
                    ? trans(locale, lang, 'mulaiBerlangganan')
                    : 'Upgrade'
                  : productActive == 0
                  ? trans(locale, lang, 'mulaiBerlangganan')
                  : 'Upgrade'}
              </Button>
              {selectedPackage !== 'lifesaverpos' ? (
                <div
                  className={clsx(
                    'flex justify-center mt-2 items-center gap-2 w-full py-5 h-8 mx-auto md:h-10 text-xs xm:text-body2 border rounded-xl font-semibold',
                    // getCurrentSubsResponse?.planName === 'LifeSAVER+'
                    false
                      ? 'text-neutral-light-neutral20 border-neutral-light-neutral20'
                      : 'text-primary-light-primary90 border-primary-light-primary90',
                  )}
                  onClick={() => {
                    onSubscribeOther();
                  }}>
                  <div>{translate('beliUntukKerabat')}</div>
                  <div className="mt-0.5">
                    <Image src={Present} alt="" width={24} height={24} />
                  </div>
                </div>
              ) : null}
            </>
          ) : getCurrentSubsResponse?.planName == 'LifeSAVER POS' ? (
            <>
              <Button
                full
                type="linear-gradient"
                disabled={productActive == 0 ? true : false}
                className="text-xs mt-8 mx-auto h-10 xm:text-body2"
                onButtonClick={() => {
                  setAvailableOnMobile(true);
                }}>
                {productActive == 0
                  ? trans(locale, lang, 'mulaiBerlangganan')
                  : 'Upgrade'}
              </Button>
              {selectedPackage !== 'lifesaverpos' ? (
                <div
                  className={clsx(
                    'flex justify-center mt-2 items-center gap-2 w-full py-5 h-8 mx-auto md:h-10 text-xs xm:text-body2 border rounded-xl font-semibold',
                    // getCurrentSubsResponse?.planName === 'LifeSAVER+'
                    false
                      ? 'text-neutral-light-neutral20 border-neutral-light-neutral20'
                      : 'text-primary-light-primary90 border-primary-light-primary90',
                  )}
                  onClick={() => {
                    onSubscribeOther();
                  }}>
                  <div>{translate('beliUntukKerabat')}</div>
                  <div className="mt-0.5">
                    <Image src={Present} alt="" width={24} height={24} />
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <Button
                full
                type="linear-gradient"
                className="text-xs mt-8 mx-auto h-10 xm:text-body2"
                disabled={getCurrentSubsResponse?.planName == 'LifeSAVER+'}
                onButtonClick={() => {
                  handleSubscribeOnMobile();
                }}>
                {trans(locale, lang, 'mulaiBerlangganan')}
              </Button>
              {selectedPackage !== 'lifesaverpos' ? (
                <div
                  className={clsx(
                    'flex justify-center mt-2 items-center gap-2 w-full py-5 h-8 mx-auto md:h-10 text-xs xm:text-body2 border rounded-xl font-semibold',
                    // getCurrentSubsResponse?.planName === 'LifeSAVER+'
                    false
                      ? 'text-neutral-light-neutral20 border-neutral-light-neutral20'
                      : 'text-primary-light-primary90 border-primary-light-primary90',
                  )}
                  onClick={() => {
                    onSubscribeOther();
                  }}>
                  <div>{translate('beliUntukKerabat')}</div>
                  <div className="mt-0.5">
                    <Image src={Present} alt="" width={24} height={24} />
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <div
            role="button"
            onClick={() =>
              setShowModalBenefit({
                id: productActive,
                status: true,
                pos: showBenefitPos,
              })
            }
            className="text-red-dark-red90 hover:no-underline mx-auto mb-4 mt-8 font-bold text-center underline text-caption1 md:text-body2">
            {trans(locale, lang, 'manfaatLebihLengkap')}
          </div>
          <p className="text-[9px] md:text-caption1 italic">
            <span className="text-primary-light-primary90">*</span>
            {trans(locale, lang, 'manfaatTambahan')}
          </p>
        </>
      )
    );
  };

  const scrollElement = useRef(null);

  const scroll = (value) => {
    scrollElement.current.scrollLeft += value;
  };

  const onScrollList = () => {
    setScrollX(scrollElement.current.scrollLeft); // Updates the latest scrolled postion

    //For checking if the scroll has ended
    if (
      Math.floor(
        scrollElement.current.scrollWidth - scrollElement.current.scrollLeft,
      ) <=
      scrollElement.current.offsetWidth + 1
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  const modalSubmissionError = () => {
    return (
      <Modal
        isOpen={isShowModalSubsError}
        toggle={() => {
          setIsShowModalSubsError(false);
          setShowTnc(false);
        }}>
        <div className="relative w-full pt-10 flex gap-2 items-center justify-center mb-5">
          <img
            src={Toa}
            className={clsx(
              'absolute -bottom-4 left-1/2 transform -translate-x-1/2 max-w-none w-[56%]',
            )}
          />
        </div>
        <div className="text-center">
          <p className="text-body1 font-bold leading-6 py-2">
            {translate('modalSubsErrorTitle')}
          </p>
        </div>
        <div className="text-center mb-4">
          <p className="text-body2 font-medium leading-6 py-2">
            {translate('modalSubsErrorDesc')}
          </p>
        </div>
        <div>
          <Button
            className="my-5 text-sm h-11"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              setIsShowModalSubsError(false);
              setShowTnc(false);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            className="text-sm h-11 mb-12"
            outline
            shadow
            full
            onButtonClick={() => {
              setCustomerCare(true);
              setIsShowModalSubsError(false);
              setShowTnc(false);
            }}>
            {trans(locale, lang, 'hubungiCustomer')}
          </Button>
        </div>
      </Modal>
    );
  };

  const modalTncNotLogin = () => {
    return (
      <Modal isOpen={showTncNotLogin}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-4">
          <div
            role="button"
            className="absolute flex items-center left-0 z-50"
            onClick={() => {
              setShowTncNotLogin(false);
            }}>
            <Image src={Close} width={32} height={32} />
          </div>

          <div className="relative w-full">
            <p className="text-center font-bold">{translate('tnc')}</p>
          </div>
        </div>

        <p className="text-body2 leading-6 font-medium text-neutral-light-neutral80 mt-6 mb-8">
          {translate('loginEligible1')}
          <span
            onClick={() => setShowModalLsTnc(true)}
            className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
            {translate('loginEligible3')}
          </span>
          {translate('loginEligible4')}
          <span
            onClick={() => setShowModalLsRiplay(true)}
            className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
            {translate('loginEligible5')}
          </span>
          {translate('loginEligibleKyc1')}
        </p>

        <div>
          <Button
            type="linear-gradient"
            full
            className="text-sm"
            onButtonClick={() => {
              setShowTncNotLogin(false);
              setShowNotLogin(true);
            }}>
            {translate('sayaSetuju')}
          </Button>
        </div>
      </Modal>
    );
  };

  const modalNotLogin = () => {
    return (
      <Modal
        isOpen={showNotLogin}
        toggle={() => {
          setShowTnc(setShowNotLogin);
        }}>
        <div className="text-center">
          <p className="text-body1 font-bold leading-6 py-2">
            {translate('modal_title_not_login')}
          </p>
        </div>
        <div className="text-left">
          <p className="text-body2 pb-5">{translate('notLogin')}</p>
        </div>
        <div>
          <Button
            full
            onButtonClick={() => {
              router.push(
                {
                  pathname: NAVIGATION.REGISTER.RegisterInput,
                  query: {
                    product: selectedPackage,
                  },
                },
                NAVIGATION.REGISTER.RegisterInput,
              );
            }}
            className="mb-3 md:mb-4 shadow-md text-black text-sm hover:border">
            <img src={IconIfgRed} className="w-6 mr-1" />
            {translate('daftarIfgId')}
          </Button>
          <GoogleLogin
            clientId={process.env.GOOGLE_DEVICE_ID}
            render={(renderProps) => (
              <Button
                className="text-darkGray-light-darkGray shadow-md mb-3 md:mb-4 text-sm hover:border"
                onButtonClick={() => {
                  setRequestOtpClear();
                  renderProps.onClick();
                }}
                disabled={renderProps.disabled}
                prefixIcon={<Image src={Google1} width={24} height={24} />}
                shadow
                full>
                {trans(locale, lang, 'daftarLewatGoogle')}
              </Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <Button
            type="linear-gradient"
            full
            className="text-sm"
            onButtonClick={() => {
              router.push(
                {
                  pathname: NAVIGATION.LOGIN.Login,
                  query: {
                    product: selectedPackage,
                    eventId: getIsUserEligibleResponse?.data?.data?.eventId,
                    accessCode:
                      getIsUserEligibleResponse?.data?.data?.eventCode,
                  },
                },
                NAVIGATION.LOGIN.Login,
              );
            }}>
            <img src={IconIfgWhite} className="w-6" />
            {translate('loginIfgId')}
          </Button>
        </div>
      </Modal>
    );
  };

  const [modalSubsForOther, setModalSubsForOther] = useState(false);
  const modalOtherProtectFirst = () => {
    return (
      <Modal
        isOpen={modalSubsForOther}
        toggle={() => {
          setModalSubsForOther(false);
          setShowTnc(false);
        }}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-4">
          <div
            role="button"
            className="absolute flex items-center left-0 z-50"
            onClick={() => {
              setModalSubsForOther(false);
            }}>
            <Image src={Close} width={32} height={32} />
          </div>

          <div className="relative w-full">
            <p className="text-center font-bold">{translate('tnc')}</p>
          </div>
        </div>
        <div>
          {userId && isEligible && (
            <p className="text-body2 leading-6 font-medium text-neutral-light-neutral80 mt-6 mb-8">
              {translate('eligible1')}
              <span
                onClick={() => setShowModalLsTnc(true)}
                className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
                {translate('loginEligible3')}
              </span>
              {translate('loginEligible4')}
              <span
                onClick={() => setShowModalLsRiplay(true)}
                className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
                {translate('loginEligible5')}
              </span>
              {translate('eligibleKyc1')}
            </p>
          )}
          <Button
            className="my-5 text-sm h-11"
            type="linear-gradient"
            shadow
            full
            onButtonClick={() => {
              let product = selectedPackage || 'lifesaverplus';

              if (
                !buyForOthersFormState?.find(
                  (state) =>
                    state.planCode === codeLifesaver?.[product]?.planCode,
                )
              ) {
                setBuyForOthersState([
                  ...buyForOthersFormState,
                  {
                    planCode: codeLifesaver?.[selectedPackage]?.planCode,
                    isEdit: true,
                  },
                ]);
              }

              router.push(
                {
                  pathname: NAVIGATION.LIFESAVER.LifesaverConfirmOther,
                  query: {
                    product,
                    from: 'start',
                  },
                },
                NAVIGATION.LIFESAVER.LifesaverConfirmOther,
              );
            }}>
            {trans(locale, lang, 'beliProteksi')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <div ref={refProp} className="max-w-5xl mx-auto px-[5%] xl:px-0">
        <div className="text-center font-bold pb-8 text-h6 md:text-h5 lg:pb-14">
          {translate('mainTitle')}
        </div>

        <div className="w-full flex">
          {renderListManfaat()}
          <div
            ref={scrollElement}
            onScroll={() => onScrollList()}
            className="w-full scroll-smooth xs:flex xs:overflow-auto">
            {showBenefitPos && (
              <>
                {scrollX !== 0 && (
                  <div
                    onClick={() => scroll(-100)}
                    className="absolute rounded-full text-orange-400 xs:block md:hidden mt-80 flex items-center justify-center z-40 ml-2">
                    <Icon icon={chevronCircleLeft} size={32} />
                  </div>
                )}
                {!scrollEnd && (
                  <div
                    onClick={() => scroll(100)}
                    className="absolute rounded-full text-orange-400 xs:block right-5 md:hidden mt-80 flex items-center justify-center z-40">
                    <Icon icon={chevronCircleRight} size={32} />
                  </div>
                )}
              </>
            )}
            {renderProduct()}
          </div>
        </div>

        {width >= 768 && (
          <p className="text-caption1 py-5 italic">
            <span className="text-primary-light-primary90">*</span>
            {trans(locale, lang, 'manfaatTambahan')}
          </p>
        )}

        {renderListLifesaverMobile()}
        {userId && isEligible && !alreadyKYC && modalNotEkyc()}
        {userId && isEligible && alreadyKYC && modalReadyToSubmission()}
        {isShowModalAge && modalAge()}
        {showAlreadySubs && modalAlreadySubs()}
        {modalSubmissionError()}
        {modalNotLogin()}
        {modalTncNotLogin()}
        {modalOtherProtectFirst()}
      </div>
    </div>
  );
});

export default Page;
