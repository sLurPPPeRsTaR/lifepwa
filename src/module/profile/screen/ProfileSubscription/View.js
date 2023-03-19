import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import locale from './locale';
import Icon from 'react-icons-kit';
import Image from 'next/image';
import {
  Card2,
  LifeSAVERLapse,
  LifeSaverPlus,
  LifeSAVERplusLapse,
  LifesaverPOS,
  LifesaverPOSLapse,
  ProfileAddress,
  Shield,
  BrokenHeart,
  LifecoverLogoDark,
  MyLifecoverLogoDark,
  LogoLifeCoverPlus,
} from '@cp-config/Images';
import { Button, Modal, Alert } from '@cp-component';
import { trans } from '@cp-util/trans';
import {
  androidClose,
  checkmarkCircled,
  androidMoreVertical,
} from 'react-icons-kit/ionicons';
import { arrowLeft, chevronRight } from 'react-icons-kit/feather';
import {
  LiveSaverLogo,
  LiveSaverWhite,
  Ambulance,
  Rip,
  Snorkeling,
  Medis,
  AmbulanceGray,
  MedisGray,
  MedisSportGray,
  FisioterapiGray,
  UnsubBanner1,
  UnsubBanner2,
  VectorBackground,
  ArrowRightBold,
} from '@cp-config/Images';
import { NAVIGATION, codeLifesaver, BILL_TYPE } from '@cp-util/constant';
import { setFormatDate, setRupiah } from '@cp-util/common';
import { LsFooter1, LsFooter2, LsFooter3 } from '@cp-config/Svgs';
import clsx from 'classnames';
import {
  GET_BILLS_SUCCESS,
  SET_RESUBSCRIBE_FAILED,
  SET_RESUBSCRIBE_SUCCESS,
} from '@cp-module/profile/profileConstant';
import { cancelCircle } from 'react-icons-kit/icomoon';
import { getSubscribeForOtherApi } from '@cp-module/lifesaver/lifesaverApi';
import { STATUS_CODE } from '../../../../util/constant';
import ListSubscriptionOther from './components/OtherSubscription/ListSubscriptionOther';
import SubscriptionEmpty from './components/SubscriptionEmpty';
import DetailSubscribe from './components/MySubscription/DetailSubscribe';
import DetailSubscribeOther from './components/OtherSubscription/DetailSubscribeOther';
import SubscriptionCard from './components/SubscriptionCard';
import ListSubscription from './components/MySubscription/ListSubscription';
import { SET_REGISTER_FAILED } from '@cp-module/register/registerConstant';

export default function Page(props) {
  const router = useRouter();
  const {
    lang,
    getSubscriptions,
    getSubscriptionsResponse,
    getSubscriptionDetail,
    getSubscriptionDetailResponse,
    setSelectedPolicy,
    setFeatureNotAvailable,
    setResubscribe,
    profileAction,
    setResubscribeClear,
    getBillsClear,
    getBillsResponse,
    getCurrentSubs,
    getPaymentMethod,
    setAvailableOnMobile,
    getPaymentMethodResponse,
    policyNumber,
    setCreateBill,
    setCreateBillClear,
    setCreateBillResponse,
    setInvoiceId,
    getSubscriptionsOtherResponse,
    getSubscriptionsOther,
    activeArrowBack: activeArrowBackProp,
  } = props;
  const [floatingMenu, setFloatingMenu] = useState(false);
  const [activeArrowBack, setActiveArrowBack] = useState(
    activeArrowBackProp || false,
  );
  const [showTnc, setShowTnc] = useState(false);
  const [changePackage, setChangePackage] = useState(false);
  const [upgradeConfirm, setUpgradeConfirm] = useState(false);
  const [changePackageConfirm, setChangePackageConfirm] = useState(false);
  const [unsubscribeConfirm, setUnsubscribeConfirm] = useState(false);
  const [selectedPolicy, setPolicy] = useState('');
  const [selectedDetailPolicy, setSelectedDetailPolicy] = useState([]);
  const [showResubscriptionTnc, setShowResubscriptionTnc] = useState(false);
  const [successResubscription, setSuccessResubscription] = useState(false);
  const [showInfoGracePeriod, setShowInfoGracePeriod] = useState(false);
  const [showBills, setShowBills] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [openedBills, setOpenedBills] = useState([]);
  const [isActiveTab, setActiveTab] = useState(0);
  const [isActiveFilter, setActiveFilter] = useState(0);
  const [policyNoDetail, setPolicyNoDetail] = useState(undefined);
  const [loadingOther, setLoadingOther] = useState(false)
  const [detailPayerData, setDetailPayerData] = useState({})
  // const [getSubscriptionsOtherResponse, setSubscribeOther] = useState([]);

  let getSubscriptionsOtherResponseFilter =
    getSubscriptionsOtherResponse?.filter((item) => {
      if (isActiveFilter === 0) {
        return item.status === 'ACTIVE';
      } else {
        return item.status !== 'ACTIVE';
      }
    }) || [];

  const compProps = useMemo(() => {
    return {
      locale,
      lang,
    };
  }, [locale, lang]);

  const tabTitle = [
    { key: 0, title: trans(locale, lang, 'langgananSaya') },
    { key: 1, title: trans(locale, lang, 'lainnya') },
  ];

  useEffect(() => {
    if (!getSubscriptionsOtherResponse?.length && isActiveTab === 1) {
      setLoadingOther(true);
    } else {
      setLoadingOther(false)
    }
  }, [isActiveTab, getSubscriptionsOtherResponse?.length]);

  useEffect(() => {
    if (activeArrowBack) {
      if (
        getSubscriptionsResponse?.getActiveSubs?.filter(
          (val) => val.policyNo === selectedPolicy,
        ).length > 0
      ) {
        getSubscriptionsResponse?.getActiveSubs
          ?.filter((val) => val.policyNo === selectedPolicy)
          .map((val) => setSelectedDetailPolicy(val));
      } else {
        getSubscriptionsResponse?.getInActiveSubs
          ?.filter((val) => val.policyNo === selectedPolicy)
          .map((val) => setSelectedDetailPolicy(val));
      }
    }
  }, [getSubscriptionsResponse]);

  useEffect(() => {
    getSubscriptions({
      page: 1,
      limit: 100,
    });
    getCurrentSubs();
    getSubscriptionsOther()
  }, []);

  useEffect(() => {
    if (profileAction === SET_RESUBSCRIBE_SUCCESS) {
      setSuccessResubscription(true);
      setTimeout(
        () =>
          getSubscriptions({
            page: 1,
            limit: 100,
          }),
        3000,
      );
      console.log(policyNoDetail);
      if (policyNoDetail) {
        setHandleDetailSubscribe(policyNoDetail);
      }
    }

    if (profileAction === GET_BILLS_SUCCESS) {
      setShowBills(true);
    }
  }, [profileAction]);

  const setHandleDetailSubscribe = (policyNo, receiverName, relationType, phoneNumber) => {
    getSubscriptionDetail(policyNo);
    setPolicyNoDetail(policyNo);
    setPolicy(policyNo);
    getPaymentMethod({});
    setActiveArrowBack(true);
    setDetailPayerData({
      receiverName,
      relationType,
      phoneNumber
    })
  };

  useEffect(() => {
    if (policyNumber) {
      setHandleDetailSubscribe(policyNumber);
    }
  }, [policyNumber]);

  useEffect(() => {
    if (
      setCreateBillResponse?.redirectUrl &&
      setCreateBillResponse?.invoiceId
    ) {
      setInvoiceId({
        invoiceId: setCreateBillResponse?.invoiceId,
        policyNumber: policyNoDetail,
      });
      router.push(
        {
          pathname: NAVIGATION.LIFESAVER.LifesaverPayment,
          query: {
            url: setCreateBillResponse?.redirectUrl,
            prev: 'profileSubscription',
            policyNo: selectedPolicy,
          },
        },
        NAVIGATION.LIFESAVER.LifesaverPayment,
      );
      setCreateBillClear();
    }
  }, [setCreateBillResponse]);

  const setHandleArrowBack = () => {
    setSelectedDetailPolicy([]);
    setActiveArrowBack(false);
  };

  const onDetailSubscriptionPress = () => {
    const source = {
      LifeCOVER: '002',
      'LifeCOVER+': '002',
      MyLifeCOVER: '002',
    };
    const productCode = {
      LifeSaverStandar: codeLifesaver.lifesaver.planCode,
      LifeCOVER: '01',
      'LifeCOVER+': '02',
      MyLifeCOVER: '03',
    };
    setSelectedPolicy({
      policyNo: selectedPolicy,
      productCode:
        productCode[getSubscriptionDetailResponse?.planName] ||
        codeLifesaver.lifesaverplus.planCode,
      source:
        source[getSubscriptionDetailResponse?.planName] ||
        codeLifesaver.productCode,
      isDownloadSection: true,
      statusCode: STATUS_CODE[getSubscriptionDetailResponse?.status],
    });
    router.push({
      pathname: NAVIGATION.POLICY.PolisDetail,
      query: {
        prev: 'subs',
      },
    });
  };

  // ======================= RENDER ==========================

  const RenderOtherSubscription = () => {
    return (
      <ListSubscriptionOther
        getSubscriptionsOtherResponse={getSubscriptionsOtherResponse}
        isLoading={loadingOther}
        isActiveFilter={isActiveFilter}
        getSubscriptionDetailResponse={getSubscriptionDetailResponse}
        activeArrowBack={activeArrowBack}
        policyNoDetail={policyNoDetail}
        openedBills={openedBills}
        paymentMethodRes={getPaymentMethodResponse}
        {...compProps}>
        {getSubscriptionDetailResponse && activeArrowBack ? (
          <DetailSubscribeOther
            detailRes={getSubscriptionDetailResponse}
            policyNoDetail={policyNoDetail}
            detailPayerData={detailPayerData}
            openedBills={openedBills}
            paymentMethodRes={getPaymentMethodResponse}
            onGracePeriodPress={() => setShowInfoGracePeriod(true)}
            onCustCarePress={() => setShowHelp(true)}
            onOpenBills={(index) => {
              if (openedBills.includes(`Panel_${index}`)) {
                setOpenedBills(
                  openedBills.filter((i) => i !== `Panel_${index}`),
                );
              } else {
                setOpenedBills((val) => [...val, `Panel_${index}`]);
              }
            }}
            locale={locale}
            lang={lang}
            onChangePayment={() => setAvailableOnMobile(true)}
            onRenewalPress={() => {
              setCreateBill({
                isRenewal: true,
                data: {
                  applicationId: 'customerapps-pwa-renew',
                  billType: BILL_TYPE.premium,
                  reffNo: policyNoDetail,
                  language: lang,
                },
              });
            }}
            onLapsePress={() => {
              router.push(NAVIGATION.LIFESAVER.LifesaverMain);
            }}
            onResubsPress={() => {
              setSelectedDetailPolicy(policyNoDetail);
              setShowResubscriptionTnc(true);
            }}
            onComingSoonPress={() => {
              setFeatureNotAvailable(true);
            }}
          />
        ) : (
          getSubscriptionsOtherResponseFilter?.map((item) => {
            return (
              <SubscriptionCard
                key={item?.key}
                data={item}
                lang={lang}
                onDetail={(policyNo, receiverName, relationType, phoneNumber) => {
                  setHandleDetailSubscribe(policyNo, receiverName, relationType, phoneNumber);
                }}
                onTabFilterClick={(index) => {
                  if (index === 0) {
                    setActiveFilter(0);
                  } else {
                    setActiveFilter(1);
                  }
                }}
              />
            );
          })
        )}
        {!getSubscriptionsOtherResponseFilter?.length && (
          <SubscriptionEmpty tab="others" locale={locale} lang={lang} />
        )}
      </ListSubscriptionOther>
    );
  };

  const RenderSubscription = () => {
    console.log(getSubscriptionsResponse)
    return (
      <ListSubscription
        getSubscriptionsResponse={getSubscriptionsResponse}
        activeArrowBack={activeArrowBack}
        onDetailPress={(val) => {
          setHandleDetailSubscribe(val.policyNo);
          setSelectedDetailPolicy(val);
        }}
        onResubsPress={(val) => {
          setSelectedDetailPolicy(val);
          setShowResubscriptionTnc(true);
        }}
        onUpgradePress={() => {
          setFeatureNotAvailable(true);
        }}
        {...compProps}>
        <DetailSubscribe
          getSubscriptionDetailResponse={getSubscriptionDetailResponse}
          policyNoDetail={policyNoDetail}
          openedBills={openedBills}
          getPaymentMethodResponse={getPaymentMethodResponse}
          onDetailPress={onDetailSubscriptionPress}
          onGracePeriodPress={() => setShowInfoGracePeriod(true)}
          onChangePaymentPress={() => setAvailableOnMobile(true)}
          onCustCarePress={() => setShowHelp(true)}
          onOpenHistoryPayment={(index) => {
            if (openedBills.includes(`Panel_${index}`)) {
              setOpenedBills(openedBills.filter((i) => i !== `Panel_${index}`));
            } else {
              setOpenedBills((val) => [...val, `Panel_${index}`]);
            }
          }}
          onRenewalPress={() => {
            setCreateBill({
              isRenewal: true,
              data: {
                applicationId: 'customerapps-pwa-renew',
                billType: BILL_TYPE.premium,
                reffNo: policyNoDetail,
                language: lang,
              },
            });
          }}
          onLapsePress={() => {
            router.push(NAVIGATION.LIFESAVER.LifesaverMain);
          }}
          onResubsPress={() => {
            setShowResubscriptionTnc(true);
          }}
          onComingSoonPress={() => {
            setFeatureNotAvailable(true);
          }}
          {...compProps}
        />
      </ListSubscription>
    );
  };

  const RenderHeader = () => {
    return (
      <div className="grid place-items-center border-b-4 py-6 w-full text-center">
        <div className="absolute left-5">
          {activeArrowBack && (
            <Icon
              icon={arrowLeft}
              size={24}
              onClick={setHandleArrowBack}
              className="cursor-pointer
                  text-gray-600 hover:text-red-dark-red90"
            />
          )}
        </div>
        {activeArrowBack ? (
          <p className="text-base md:text-lg font-bold">
            {trans(locale, lang, 'detailLangganan')}
          </p>
        ) : (
          <p className="text-base md:text-lg font-bold">
            {trans(locale, lang, 'langganan')}
          </p>
        )}
        <div className="mr-5 absolute right-0">
          {activeArrowBack &&
            getSubscriptionDetailResponse?.status === 'ACTIVE' &&
            selectedDetailPolicy?.isSubscribe && (
              <>
                <Icon
                  icon={androidMoreVertical}
                  size={24}
                  onClick={() => setFloatingMenu(!floatingMenu)}
                  className="cursor-pointer hover:bg-red-light-red20 rounded-sm hover:text-red-dark-red90"
                />
                {floatingMenu && renderFloatingMenu()}
              </>
            )}
        </div>
      </div>
    );
  };

  const RenderTab = () => {
    return (
      <div className="px-6">
        <div className="flex flex-row items-center justify-evenly mt-6  shadow-md border border-[0.1px] rounded-2xl">
          {tabTitle?.map((item, index) => {
            return (
              <div
                key={item?.key}
                className={clsx(
                  'py-5 px-2 rounded-xl w-[1000px]',
                  isActiveTab === index ? 'bg-[#FA364D14]' : 'bg-transparent',
                )}
                role="button"
                onClick={() => {
                  if (index === 0) {
                    setActiveTab(0);
                    setActiveArrowBack(false);
                  } else {
                    setActiveTab(1);
                    setActiveFilter(0);
                    setActiveArrowBack(false);
                  }
                }}>
                <p className="text-center font-semibold text-sm leading-4 tracking-wider text-[#FB909C]">
                  {item?.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFloatingMenu = () => {
    return (
      <div className="absolute top-5 border-2 right-2 bg-white rounded-md whitespace-nowrap">
        <div
          onClick={() => {
            router.push({
              pathname: NAVIGATION.SUBS.SubsUnSubscribe,
              query: {
                policyNo: selectedDetailPolicy?.policyNo,
                productName: selectedDetailPolicy?.productName,
                planName: getSubscriptionDetailResponse?.planName,
              },
            });
            // setAvailableOnMobile(true);

            setFloatingMenu(false);
          }}
          className="cursor-pointer border-b-2 py-2 px-3 text-sm">
          {trans(locale, lang, 'batalkanPaket')}
        </div>
        <div
          onClick={() => {
            setFeatureNotAvailable(true);
            setFloatingMenu(false);
          }}
          className="cursor-pointer py-2 px-3 text-sm">
          {trans(locale, lang, 'ubahPaket')}
        </div>
      </div>
    );
  };

  const modalChangePackage = () => {
    return (
      <Modal isOpen={changePackage} className="!p-0 max-w-[400px]">
        <div className="flex py-3 px-5 justify-between border-b">
          <Icon
            icon={androidClose}
            size={20}
            onClick={() => setChangePackage(false)}
            className="cursor-pointer text-gray-600"
          />
          <p>{trans(locale, lang, 'pilihPaket')}</p>
          <div></div>
        </div>

        <div className="p-4">
          <div className="relative max-h-[50vh] overflow-y-auto py-2">
            <div className="cursor-pointer mb-4 border rounded-2xl shadow-md hover:border-[#CA0A21]">
              <div className="relative flex py-5 px-3 items-center justify-between text-white bg-gradient-to-r from-[#FF344C] via-[#E51931] to-[#CA0A21] rounded-t-2xl">
                <img src={LiveSaverWhite} className="h-4" />
                <p className="text-sm">
                  <span className="font-bold">RP. 99.000,-</span>/bulan
                </p>
                <p className="absolute -top-2 left-1/2 text-[11px] bg-green-500 px-2 -translate-x-1/2">
                  {trans(locale, lang, 'paketAndaSekarang')}
                </p>
              </div>
              <p className="p-4 text-sm ms:text-sm">
                Total maksimum biaya pengobatan Rp400jt dengan inner limit.
                Cashless dengan limit Rp400jt.
              </p>
            </div>
            <div className="cursor-pointer mb-4 border rounded-2xl shadow-md hover:border-[#CA0A21]">
              <div className="relative flex py-5 px-3 items-center justify-between bg-gray-300 rounded-t-2xl text-gray-500">
                <img src={LiveSaverWhite} className="h-4" />
                <p className="text-sm">
                  <span className="font-bold">RP. 99.000,-</span>/bulan
                </p>
              </div>
              <p className="p-4 text-sm ms:text-sm">
                Total maksimum biaya pengobatan Rp400jt dengan inner limit.
                Cashless dengan limit Rp400jt.
              </p>
            </div>
          </div>

          <Button
            className="mt-8 mb-3 text-sm"
            type="linear-gradient"
            shadow
            full
            handleOnClick={() => {
              setChangePackage(false);
              setChangePackageConfirm(true);
            }}>
            {trans(locale, lang, 'ubahPaket')}
          </Button>
        </div>
      </Modal>
    );
  };

  const modalChangePackageConfirm = () => {
    return (
      <Modal isOpen={changePackageConfirm} size="full">
        <div className="relative z-10 flex justify-between border-b pb-6 w-full items-center">
          <Icon
            icon={arrowLeft}
            size={24}
            onClick={() => {
              setChangePackageConfirm(false), setFloatingMenu(false);
            }}
            className="cursor-pointer
                text-gray-600 hover:text-red-dark-red90"
          />
          <p className="text-base font-bold">
            {trans(locale, lang, 'ubahPaket')}
          </p>
          <div className="mr-5"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center pb-24">
          <p className="pt-10 pb-5 text-center text-base font-bold md:text-xl">
            Apakah Kamu Yakin Ingin Mengubah Paketmu?
          </p>

          <div className="w-full px-[10%]">
            <p className="text-center text-base pt-2 pb-5">
              Manfaat Proteksi Kamu Akan Berubah:
            </p>
            <div className="w-full flex justify-center items-center  flex-col lg:flex-row lg:space-x-5">
              <div className="relative p-4 mt-10 border shadow-md rounded-xl bg-white">
                <img
                  src={Medis}
                  className="absolute h-12 -top-6 left-1/2 -translate-x-1/2"
                />
                <p className="text-sm pb-4 pt-6 font-black text-center">
                  Total Medical Limit Cashless
                </p>
                <div className="flex items-end">
                  <p className="w-28 h-10 flex items-center justify-center text-base font-black rounded-md bg-red-light-red20 text-red-dark-red90">
                    400 Jt
                  </p>
                  <img src={ArrowRightBold} className="h-8 mb-1 mx-3" />
                  <div>
                    <img src={LiveSaverLogo} className="h-3 mx-auto mb-1" />
                    <p className="w-28 h-10 flex items-center justify-center text-base font-black rounded-md bg-gray-200 text-gray-400">
                      200 Jt
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative p-4 mt-10 border shadow-md rounded-xl bg-white">
                <img
                  src={Snorkeling}
                  className="absolute h-12 -top-6 left-1/2 -translate-x-1/2"
                />
                <p className="text-sm pb-4 pt-6 font-black text-center">
                  Proteksi Olahraga Air
                </p>
                <div className="flex items-end">
                  <p className="w-28 h-10 flex items-center justify-center text-base font-black rounded-md bg-red-light-red20 text-red-dark-red90">
                    Terproteksi
                  </p>
                  <img src={ArrowRightBold} className="h-8 mb-1 mx-3" />
                  <div>
                    <img src={LiveSaverLogo} className="h-3 mx-auto mb-1" />
                    <p className="w-28 h-10 flex items-center justify-center text-base font-black rounded-md bg-gray-200 text-gray-400">
                      Tidak
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative p-4 mt-10 border shadow-md rounded-xl bg-white">
                <img
                  src={Rip}
                  className="absolute h-12 -top-6 left-1/2 -translate-x-1/2"
                />
                <p className="text-sm pb-4 pt-6 font-black text-center">
                  Mennggal Dunia/Cacat Tetap
                </p>
                <div className="flex items-end">
                  <p className="w-28 h-10 flex items-center justify-center text-base font-black rounded-md bg-red-light-red20 text-red-dark-red90">
                    40 Jt
                  </p>
                  <img src={ArrowRightBold} className="h-8 mb-1 mx-3" />
                  <div>
                    <img src={LiveSaverLogo} className="h-3 mx-auto mb-1" />
                    <p className="w-28 h-10 flex items-center justify-center text-base font-black rounded-md bg-gray-200 text-gray-400">
                      20 Jt
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-base pt-12 pb-5">
              Manfaat Proteksi yang Tetap Bisa Digunakan:
            </p>
            <div className="w-full flex justify-center space-x-5">
              <div className="relative p-4 mt-5 border shadow-md rounded-xl bg-white">
                <div className="absolute h-5 -top-2 left-1/2 -translate-x-1/2 border bg-white rounded-lg shadow-md py-1 px-10">
                  <img src={LiveSaverLogo} className="h-full" />
                </div>
                <div className="flex items-end pt-4 space-x-5">
                  <div className="flex flex-col items-center w-16 px-2 text-center">
                    <img src={Ambulance} className="w-12" />
                    <p className="text-xs ">Transportasi Medis</p>
                    <p className="text-base text-red-dark-red90 font-bold">
                      Covered
                    </p>
                  </div>
                  <div className="flex flex-col items-center w-32 px-2 text-center">
                    <img src={Ambulance} className="w-12" />
                    <p className="text-xs ">Perawatan Medis Akibat Olahraga</p>
                    <p className="text-base text-red-dark-red90 font-bold">
                      20 Jt
                    </p>
                  </div>
                  <div className="flex flex-col items-center w-16 px-2 text-center">
                    <img src={Ambulance} className="w-12" />
                    <p className="text-xs ">Fisioterapi (Cashless)</p>
                    <p className="text-base text-red-dark-red90 font-bold">
                      10 Jt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => setChangePackageConfirm(false)}
            className="pt-16 font-black text-sm text-gray-600 underline">
            {trans(locale, lang, 'ubahPaket')}
          </div>
          <Button
            className="mt-6 text-sm"
            type="linear-gradient"
            shadow
            handleOnClick={() => {
              setChangePackageConfirm(false), setFloatingMenu(false);
            }}>
            Tetap di paket yang sekarang
          </Button>
        </div>

        <img
          src={VectorBackground}
          className="absolute left-0 z-0 bottom-0 w-full"
        />
      </Modal>
    );
  };

  const modalUnsubscribeConfirm = () => {
    return (
      <Modal isOpen={unsubscribeConfirm} size="full" className="relative">
        <div className="relative z-10 flex justify-between border-b pb-6 w-full items-center">
          <Icon
            icon={arrowLeft}
            size={24}
            onClick={() => {
              setUnsubscribeConfirm(false), setFloatingMenu(false);
            }}
            className="cursor-pointer
                text-gray-600 hover:text-red-dark-red90"
          />
          <p className="text-base font-bold">
            {trans(locale, lang, 'berhentiBerlangganan')}
          </p>
          <div className="mr-5"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center pb-20">
          <div className="flex pt-10  items-center">
            <img src={BrokenHeart} className="w-24 md:w-32" />
            <p className="pl-2 font-black w-60 text-sm md:pl-4 md:text-base">
              Yakin mau membatalkan langganan kamu?
            </p>
          </div>

          <div className="max-w-2xl w-full py-5">
            <p className="pt-5 pb-5 text-xs md:text-sm font-black">
              Dengan berhenti berlangganan, Kamu akan kehilangan:
            </p>
            <div className="flex items-center py-3 border-b justify-between flex-col md:flex-row">
              <div className="flex items-center w-full md:w-[49%]">
                <img src={MedisGray} className="h-12" />
                <div className="text-black pl-5 text-sm">
                  <p>Total Medical Limit Cashless</p>
                  <p className="text-red-dark-red90 text-xs py-1 font-black">
                    Rp200.000.000,- /kejadian
                  </p>
                </div>
              </div>
              <div className="border-b py-2 w-full mb-2 md:hidden"></div>
              <div className="flex items-center w-full md:w-[49%]">
                <img src={FisioterapiGray} className="h-12" />
                <div className="text-black pl-5 text-sm">
                  <p>Fisioterapi (Cashless)</p>
                  <p className="text-red-dark-red90 text-xs py-1 font-black">
                    Rp10.000.000,-
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center py-3 border-b justify-between flex-col md:flex-row">
              <div className="flex items-center w-full md:w-[49%]">
                <img src={MedisSportGray} className="h-12" />
                <div className="text-black pl-5 text-sm">
                  <p>Perawatan Medis Akibat Olahraga</p>
                  <p className="text-red-dark-red90 text-xs py-1 font-black">
                    Rp20.000.000,-
                  </p>
                </div>
              </div>
              <div className="border-b py-2 w-full mb-2 md:hidden"></div>
              <div className="flex items-center w-full md:w-[49%]">
                <img src={AmbulanceGray} className="h-12" />
                <div className="text-black pl-5 text-sm">
                  <p>Transportasi Medis</p>
                  <p className="text-red-dark-red90 text-xs py-1 font-black">
                    Evakuasi Cepat Dengan Ambulans
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl w-full py-5">
            <p className="pt-5 font-black text-sm">Tahukah Kamu?</p>
            <div className="flex justify-between flex-col md:flex-row">
              <img
                src={UnsubBanner1}
                className="w-full mt-4 md:w-[49%] rounded-xl shadow-md"
              />
              <img
                src={UnsubBanner2}
                className="w-full mt-4 md:w-[49%] rounded-xl shadow-md"
              />
            </div>
          </div>

          <div className="pt-5 font-black text-sm text-gray-600 underline">
            Berhenti Berlangganan
          </div>
          <Button
            className="mt-6 text-sm"
            type="linear-gradient"
            shadow
            handleOnClick={() => {
              setUnsubscribeConfirm(false);
            }}>
            {trans(locale, lang, 'sayaSetuju')}
          </Button>
        </div>

        <img
          src={VectorBackground}
          className="absolute left-0 z-0 bottom-0 w-full"
        />
      </Modal>
    );
  };

  const modalUpgradeConfirm = () => {
    return (
      <Modal isOpen={upgradeConfirm} size="full" className="relative">
        <div className="relative z-10 pt-5 mb-[120px] lg:mb-0 border rounded-t-3xl overflow-hidden max-w-4xl mx-auto min-h-screen h-full shadow-md">
          <div className="flex justify-between pt-5 pb-12 px-3 w-full items-center rounded-t-3xl bg-red-dark-red90">
            <Icon
              icon={arrowLeft}
              size={24}
              onClick={() => {
                setUpgradeConfirm(false), setShowTnc(false);
              }}
              className="cursor-pointer text-white"
            />
            <p className="text-base font-bold text-white">
              {trans(locale, lang, 'konfirmasi')}
            </p>
            <div className="mr-5"></div>
          </div>

          <div className="relative w-[95%] mx-auto shadow-md rounded-3xl border -top-8 overflow-hidden">
            <div className="flex justify-between py-5 px-5 w-full items-center bg-gradient-to-r from-[#FF344C] via-[#E51931] to-[#CA0A21]">
              <img src={LiveSaverWhite} className="h-5" />
              <p className="text-sm text-white">
                <span className="font-bold">Rp. 99.000,-</span> / Bulan
              </p>
            </div>
            <ul className="p-4 text-sm leading-6">
              <li className="flex justify-between items-center">
                <p>{trans(locale, lang, 'durasi')}</p>
                <p className="font-bold">1 Bulan</p>
              </li>
              <li className="flex justify-between items-center">
                <p>{trans(locale, lang, 'tempo')}</p>
                <p className="font-bold">21 Oktober 2021</p>
              </li>
            </ul>
          </div>

          <div className="relative w-[95%] md:w-[90%] mx-auto">
            <p className="text-sm pb-3">
              <span className="text-[#CA0A21]">*</span> Informasi masa tunggu
              untuk paket yang baru :
            </p>

            <ul className="pl-4 list-disc text-sm leading-5 md:leading-7">
              <li>
                Proteksi medis selain meninggal dunia akibat kecelakaan dimulai
                24 jam setelah transaksi upgrade.
              </li>
              <li>
                Proteksi cedera olahraga dimulai 5 hari setelah transaksi
                upgrade.
              </li>
            </ul>

            <p className="text-sm pt-5">
              Selama masa tunggu upgrade paket, kamu masih terproteksi dengan
              manfaat paket sebelumnya.
            </p>

            <Alert>
              <p className="text-xs md:pl-2">
                Selama masa tunggu upgrade paket, kamu masih terproteksi dengan
                manfaat paket sebelumnya.
              </p>
            </Alert>
          </div>

          <div className="border-4 my-8"></div>

          <ul className="px-[5%] text-sm">
            <li className="flex py-1 justify-between items-center">
              <p>{trans(locale, lang, 'hargaPremiBaru')}</p>
              <p>Rp. 99.000,-</p>
            </li>
            <li className="flex py-1 justify-between items-center">
              <p>{trans(locale, lang, 'sisaPremi')}</p>
              <p>- Rp. 16.333,-</p>
            </li>
            <li className="flex py-1 justify-between items-center">
              <p>{trans(locale, lang, 'biayaPaket')}</p>
              <p className="text-green-600 font-black">Rp. 82.677,-</p>
            </li>
          </ul>
        </div>

        <div className="w-full fixed px-[5%] py-4 bottom-24 border shadow-md left-0 z-10 bg-white flex items-center justify-between flex-col md:flex-row">
          <div className="font-black mb-3 justify-center w-full flex items-center space-x-5 md:flex-col md:w-1/3 md:items-start md:space-x-0">
            <p className="text-sm">Total</p>
            <p className="text-lg text-green-600">Rp. 82.667,-</p>
          </div>
          <div className="flex items-center w-full justify-end md:2/3">
            <p className="text-xs text-right max-w-xs">
              Kamu akan dikenakan biaya Rp99.000,-/bulan berlaku mulai 21
              Oktober 2022.
            </p>
            <Button
              className="ml-5 text-sm"
              type="linear-gradient"
              shadow
              handleOnClick={() => {
                setUpgradeConfirm(false);
              }}>
              {trans(locale, lang, 'sayaSetuju')}
            </Button>
          </div>
        </div>

        <img
          src={VectorBackground}
          className="absolute left-0 z-0 bottom-0 w-full"
        />
      </Modal>
    );
  };

  const modalTnc = () => {
    return (
      <Modal isOpen={showTnc} className="!p-0" size="sm">
        <div className="flex py-3 px-4 justify-between ">
          <Icon
            icon={androidClose}
            size={20}
            onClick={() => setShowTnc(false)}
            className="cursor-pointer text-gray-600"
          />
          <p>{trans(locale, lang, 'tnc')}</p>
          <div></div>
        </div>

        <div className="p-5">
          <div className="text-[13px] font-black leading-6">
            Saya menyatakan telah setuju dan memahami{' '}
            <span className="text-red-dark-red90 underline">
              Syarat & Ketentuan IFG Life
            </span>{' '}
            serta{' '}
            <span className="text-red-dark-red90 underline">
              Ringkasan Informasi Produk & Layanan (RIPLAY){' '}
            </span>
            terkait produk asuransi yang telah saya pilih,
          </div>
          <Button
            className="mt-6 text-sm"
            type="linear-gradient"
            shadow
            full
            handleOnClick={() => {
              setUpgradeConfirm(true), setShowTnc(false);
            }}>
            {trans(locale, lang, 'sayaSetuju')}
          </Button>
        </div>
      </Modal>
    );
  };

  const modalReadyToSubmission = () => {
    return (
      <Modal isOpen={showResubscriptionTnc}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-4 py-3 px-5">
          <div
            role="button"
            className="absolute flex items-center left-0 z-50"
            onClick={() => {
              setShowResubscriptionTnc(false);
            }}>
            <Icon
              icon={androidClose}
              size={20}
              className="cursor-pointer text-gray-600"
            />
          </div>

          <div className="relative w-full">
            <p className="text-center font-bold">
              {trans(locale, lang, 'tnc')}
            </p>
          </div>
        </div>

        <p className="text-body2 leading-6 font-medium text-neutral-light-neutral80 mt-6 mb-8">
          {trans(locale, lang, 'loginEligible1')}
          <span className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
            {trans(locale, lang, 'loginEligible3')}
          </span>
          {trans(locale, lang, 'loginEligible4')}
          <span className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
            {trans(locale, lang, 'loginEligible5')}
          </span>
          {trans(locale, lang, 'loginEligibleKyc1')}
        </p>

        <div>
          <Button
            type="linear-gradient"
            full
            className="text-sm mb-5"
            onButtonClick={() => {
              setResubscribe({
                policyNo: selectedDetailPolicy?.policyNo || policyNoDetail,
              });
              setShowResubscriptionTnc(false);
              setTimeout(
                () =>
                  getSubscriptions({
                    page: 1,
                    limit: 100,
                  }),
                3000,
              );
            }}>
            {trans(locale, lang, 'sayaSetuju')}
          </Button>
        </div>
      </Modal>
    );
  };

  const modalSuccessResubscribe = () => {
    return (
      <Modal isOpen={successResubscription}>
        <div className="relative w-full pt-10 flex gap-2 items-center justify-center mb-5">
          <img
            src={Shield}
            className="absolute -bottom-4  left-1/2 transform -translate-x-1/2 max-w-none w-2/5 pb-4"
          />
        </div>

        <div className="flex flex-col text-center mb-5">
          <p className="font-bold text-md mb-2">
            {trans(locale, lang, 'successResubTitle')}
          </p>
          <p className="text-sm">
            {trans(locale, lang, 'successResubSubtitle')}
          </p>
        </div>

        <div>
          <Button
            type="linear-gradient"
            full
            className="text-sm mb-5"
            onButtonClick={() => {
              getSubscriptions({
                page: 1,
                limit: 100,
              });
              setResubscribeClear();
              setSuccessResubscription(false);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
        </div>
      </Modal>
    );
  };

  const modalGracePeriodInfo = () => {
    return (
      <Modal isOpen={showInfoGracePeriod}>
        <div className="flex py-3 px-5 justify-between border-b">
          <Icon
            icon={androidClose}
            size={20}
            onClick={() => setShowInfoGracePeriod(false)}
            className="cursor-pointer text-gray-600"
          />
          <p className="font-bold">{trans(locale, lang, 'GRACE_PERIOD')}</p>
          <div></div>
        </div>

        <div className="flex flex-col text-left mb-5">
          <p className="text-sm mx-5 mt-5">
            {trans(locale, lang, 'gracePeriodInfo')}
          </p>
        </div>
      </Modal>
    );
  };

  const modalListBillings = () => {
    return (
      <Modal isOpen={showBills}>
        <div className="flex py-3 px-5 justify-between border-b mb-5">
          <Icon
            icon={androidClose}
            size={20}
            onClick={() => {
              setShowBills(false);
              getBillsClear();
            }}
            className="cursor-pointer text-gray-600"
          />
          <p className="font-bold">{trans(locale, lang, 'riwayatTagihan')}</p>
          <div></div>
        </div>

        {getBillsResponse?.data.billings.map((val, index) => (
          <div
            key={index}
            className="flex py-2 px-4 mb-4 items-center justify-between border rounded-2xl shadow-sm">
            <div className="flex flex-col text-sm xs:text-xs leading-6 whitespace-nowrap">
              <p>{setFormatDate(val.billDueDate, lang)}</p>
              <p>{val.invoiceId}</p>
              <p className="font-black">{setRupiah(val.amount, lang)}</p>
            </div>
            <div className="flex items-center">
              {val.status === 'paid' ? (
                <>
                  <Icon
                    icon={checkmarkCircled}
                    size={22}
                    className="text-green-500"
                  />
                  <p className="font-black text-sm xs:text-xs pl-2 text-green-500">
                    {trans(locale, lang, 'lunas')}
                  </p>
                </>
              ) : (
                <>
                  <Icon
                    icon={cancelCircle}
                    size={22}
                    className="text-red-500"
                  />
                  <p className="font-black text-sm xs:text-xs pl-2 text-red-500">
                    {trans(locale, lang, 'belumLunas')}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </Modal>
    );
  };

  const dataHelp = [
    {
      id: 'wa',
      icon: LsFooter3,
      title: 'WhatsApp Lifia',
      link: 'https://api.whatsapp.com/send/?phone=628111372848',
    },
    {
      id: 'call',
      icon: LsFooter1,
      title: 'Call Center 1500176',
      link: 'tel:1500176',
    },
    {
      id: 'email',
      icon: LsFooter2,
      title: 'customer_care@ifg-life.id',
      link: 'customer_care@ifg-life.id',
    },
  ];

  const modalHelpContact = () => {
    return (
      <Modal isOpen={showHelp}>
        <div className="flex py-3 px-5 justify-between border-b">
          <Icon
            icon={androidClose}
            size={20}
            onClick={() => setShowHelp(false)}
            className="cursor-pointer text-gray-600"
          />
          <p className="font-bold">{trans(locale, lang, 'customerCare')}</p>
          <div></div>
        </div>

        <div className="flex flex-col my-5">
          {dataHelp.map((val) => (
            <div
              key={val.id}
              className="flex flex-row p-3 border rounded-md justify-between text-sm shadow-md font-semibold mb-3"
              role="button"
              onClick={() =>
                val.id == 'email'
                  ? (window.location = `mailto:${val.link}`)
                  : window.open(val.link, '_blank')
              }>
              <div className="flex flex-row">
                <Image src={val.icon} width={24} height={24} />
                <p className="ml-2">{val.title}</p>
              </div>
              <Icon
                icon={chevronRight}
                className="text-gray-300 duration-500 group-hover:text-red-dark-red90"
              />
            </div>
          ))}
        </div>
      </Modal>
    );
  };

  const renderSubscriptionMenu = () => {
    if (isActiveTab === 0) {
      return <RenderSubscription />;
    }
    return <RenderOtherSubscription />;
  };

  return (
    <div>
      {showTnc && modalTnc()}
      {changePackage && modalChangePackage()}
      {changePackageConfirm && modalChangePackageConfirm()}
      {unsubscribeConfirm && modalUnsubscribeConfirm()}
      {upgradeConfirm && modalUpgradeConfirm()}
      {showResubscriptionTnc && modalReadyToSubmission()}
      {successResubscription && modalSuccessResubscribe()}
      {showInfoGracePeriod && modalGracePeriodInfo()}
      {showBills && modalListBillings()}
      {showHelp && modalHelpContact()}

      <div className="relative w-full bg-white md:rounded-3xl xs:min-h-[40vh] h-auto border xs:mb-5 md:mb-0">
        <RenderHeader />
        <RenderTab />
        {renderSubscriptionMenu()}
      </div>
    </div>
  );
}
