import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa';
import { arrowLeft, x } from 'react-icons-kit/feather';
import { Warning } from '@cp-config/Svgs';
import { Button, Container, Modal } from '@cp-component';
import { NAVIGATION } from '@cp-util/constant';
import { setMaskingPhone, useBreakpoints } from '@cp-util/common';
import { trans } from '@cp-util/trans';
import { ic_west } from 'react-icons-kit/md';
import locale from './locale';
import {
  GET_POLICY_WIDGET_HOME,
  GET_POLICY_WIDGET_HOME_SUCCESS,
  GET_POLICY_WIDGET_HOME_FAILED,
} from '@cp-module/home/homeConstant';
import {
  GET_LIFETAG_CURRENT_SETTING_FAILED,
  GET_LIFETAG_CURRENT_SETTING_SUCCESS,
  GET_LIFETAG_FLAG_FAILED,
  GET_LIFETAG_FLAG_SUCCESS,
  GET_LIFETAG_LINKED_LIST_FAILED,
  GET_LIFETAG_LINKED_LIST_SUCCESS,
} from '@cp-module/lifetag/lifetagConstant';
import {
  GET_SUBSCRIPTIONS_FAILED,
  GET_SUBSCRIPTIONS_SUCCESS,
} from '@cp-module/subs/subsConstant';
import {
  LifeTagAllergy,
  LifeTagEmergency,
  LifeTagCall,
  LifeTagVector,
  LifetagScan,
  LifetagWord,
  BgLifetagVector,
  ErrorInternal,
  DefaultBackground,
  Deliver,
  LifeTagCommingSoon,
  IconProfileActive,
  WhatsApp,
  StoreIcon,
  LifeTagDiseaseHistory,
} from '@cp-config/Images';

const View = ({
  // MAPPED STORE STATE
  lang,
  token,

  homeAction,
  lifetagAction,
  lifesaverAction,

  getPolicyWidgetHomeResponse,
  getCurrentSubsResponse,

  getLifetagFlagResponse,
  getLifetagLinkedListResponse,
  getLifetagCurrentSettingResponse,

  getSubscriptionsResponse,

  // MAPPED STORE ACTION
  setLoading,

  getPolicyWidgetHome,

  getLifetagFlag,
  getLifetagLinkedList,
  getLifetagCurrentSetting,

  getSubscriptions,
}) => {
  // REF
  const imgRef = useRef(null);

  // HOOKS
  const router = useRouter();
  const { isSm } = useBreakpoints();

  // STATE
  const [loadCardStatus, setLoadCardStatus] = useState('success'); // success | failed
  const [showModal, setShowModal] = useState(false); // success | failed
  const [imgSrc, setImgSrc] = useState('');

  const translate = (val) => trans(locale, lang, val);

  // DATA
  const lifetagProfile = useMemo(() => {
    return (
      getLifetagLinkedListResponse?.data &&
      getLifetagLinkedListResponse?.data.length > 0 &&
      getLifetagLinkedListResponse?.data[0]
    );
  }, [getLifetagLinkedListResponse?.data]);
  const currentSetting = useMemo(() => {
    return getLifetagCurrentSettingResponse?.data;
  }, [getLifetagCurrentSettingResponse?.data]);
  const isGracePeriod = useMemo(() => {
    return (
      getSubscriptionsResponse?.getActiveSubs &&
      getSubscriptionsResponse?.getActiveSubs[0].status === 'GRACE_PERIOD'
    );
  }, [getSubscriptionsResponse?.getActiveSubs]);
  const lifetagFlag = useMemo(() => {
    return getLifetagFlagResponse?.data;
  }, [getLifetagFlagResponse?.data]);

  // HANDLER
  const lifetagActionResult = useCallback(
    (act) => {
      if (act === GET_LIFETAG_LINKED_LIST_SUCCESS) {
        setLoading(false);
        if (getLifetagLinkedListResponse?.data[0]) {
          setLoading(true);
          getLifetagCurrentSetting({
            id: getLifetagLinkedListResponse?.data[0]?.lifeTagCode,
          });
        }
      }
      if (act === GET_LIFETAG_LINKED_LIST_FAILED) {
        setLoading(false);
      }
      if (act === GET_LIFETAG_FLAG_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_LIFETAG_FLAG_FAILED) {
        setLoading(false);
      }
      if (act === GET_LIFETAG_CURRENT_SETTING_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_LIFETAG_CURRENT_SETTING_FAILED) {
        setLoading(false);
      }
    },
    [getLifetagCurrentSetting, getLifetagLinkedListResponse?.data, setLoading],
  );
  const lifesaverActionResult = useCallback(
    (act) => {
      if (act === GET_SUBSCRIPTIONS_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_SUBSCRIPTIONS_FAILED) {
        setLoading(false);
      }
    },
    [setLoading],
  );

  // EFFECTS
  // effect :
  // - fetch getPolicyWidgetHome
  useEffect(() => {
    setLoading(true);
    getPolicyWidgetHome();
    // getLifetagLinkedList();
    // getLifetagFlag();
    getSubscriptions();

    return () => {
      setLoading(false);
    };
  }, []);

  // effect : lifetagActionResult
  // useEffect(() => {
  //   lifetagActionResult(lifetagAction);
  // }, [lifetagAction, lifetagActionResult]);
  // effect : lifesaverActionResult
  useEffect(() => {
    lifesaverActionResult(lifesaverAction);
  }, [lifesaverAction, lifesaverActionResult]);
  // effect :
  // - setLoading APP
  useEffect(() => {
    switch (homeAction) {
      case GET_POLICY_WIDGET_HOME:
        setLoadCardStatus('loading');
        break;
      case GET_POLICY_WIDGET_HOME_SUCCESS:
        setLoading(false);
        setLoadCardStatus('success');
        break;
      case GET_POLICY_WIDGET_HOME_FAILED:
        setLoading(false);
        setLoadCardStatus('failed');
        break;
    }
  }, [homeAction, setLoading]);

  // RENDERER
  const renderLifetagContainer = () => {
    const healthCardInfoData = [
      {
        title: trans(locale, lang, 'golonganDarah'),
        value: lifetagProfile && lifetagProfile.bloodType,
        icon: LifeTagEmergency,
        isShow: currentSetting?.isShowBloodType,
      },
      {
        title: trans(locale, lang, 'alergi'),
        value: lifetagProfile && lifetagProfile?.allergic?.join(', '),
        icon: LifeTagAllergy,
        isShow:
          lifetagProfile?.allergic?.length !== 0 &&
          currentSetting?.isShowAllergic,
      },
    ];

    const emergencyContactData = lifetagProfile?.emergencyContact?.map(
      (item, index) => {
        const indexLabel = index + 1 > 1 ? index + 1 : '';
        return {
          title: trans(locale, lang, 'kontakDarurat') + ' ' + indexLabel,
          value: item?.name + ' - ' + item?.mobilePhoneNumber,
          icon: LifeTagCall,
          isShow: currentSetting?.isShowEmergencyPhoneNumber,
          onClick: () => {
            window.open(`tel:${item?.mobilePhoneNumber}`, '_blank');
          },
        };
      },
    );

    const headerHealthInfo = (
      <div className="text-[14px] font-semibold mb-4">
        {translate('informasiKesehatan')}
      </div>
    );

    const headerEmergencyContact = (
      <div className="text-[14px] font-semibold mt-6 mb-4">
        {translate('kontakDarurat')}
      </div>
    );

    const healthCardInfo = (item, role = 'listitem') => (
      <li
        role={role}
        className="flex items-center border border-gray-100 shadow-lg shadow-gray-500/5 rounded-2xl bg-white overflow-hidden"
        onClick={() => {
          if (item?.onClick) item.onClick();
        }}>
        <div className="relative flex items-center justify-center h-16 md:h-20">
          <img src={LifeTagVector} className="relative z-0 h-full" />
          <img
            src={item?.icon}
            className="absolute z-10"
            width={42}
            height={42}
          />
        </div>
        <div className="pl-4 font-bold capitalize">
          <p className="text-xs pb-1 md:pb-2 xm:text-sm">{item?.title}</p>
          <p className="text-[11px] font-medium xm:text-xs uppercase text-gray-400">
            {item?.value}
          </p>
        </div>
      </li>
    );

    const renderCardInfo = () => {
      const isShowAllergic =
        lifetagProfile?.allergic?.length === 0
          ? false
          : currentSetting?.isShowAllergic;

      return (
        <div className="relative px-[30px]">
          {isShowAllergic ||
          currentSetting?.isShowBloodType ||
          currentSetting?.isShowEmergencyPhoneNumber ? (
            <div className="font-semibold mb-5">{translate('lifetag')}</div>
          ) : null}

          {isShowAllergic || currentSetting?.isShowBloodType
            ? headerHealthInfo
            : null}

          <ul className="flex flex-col gap-3">
            {healthCardInfoData
              .filter((item) => item.isShow)
              .map((item) => {
                return healthCardInfo(item);
              })}
          </ul>

          {currentSetting?.isShowEmergencyPhoneNumber && headerEmergencyContact}
          <ul className="flex flex-col gap-3">
            {emergencyContactData
              ?.filter((item) => item.isShow)
              .map((item) => {
                return healthCardInfo(item, 'button');
              })}
          </ul>

          {currentSetting?.isShowEmergencyPhoneNumber && (
            <div className="flex gap-3 items-start p-6 mt-4">
              <div className="flex-shrink-0">
                <img src={Warning} alt="Icon Warning" width={24} height={24} />
              </div>
              <div className="flex-1 text-neutral-600">
                <p className="text-sm">{translate('kontakDaruratInfo')}</p>
              </div>
            </div>
          )}
        </div>
      );
    };

    const renderContent = () => {
      // if (isGracePeriod) {
      //   return renderCardLifeTagFlag();
      // }
      // if (
      //   lifetagFlag?.hasLifeSaver &&
      //   lifetagFlag?.alreadyLinkLifeTag &&
      //   lifetagFlag?.haveTrackingNumber
      // ) {
      //   return renderCardInfo();
      // }
      // if (lifetagFlag?.hasLifeSaver && lifetagFlag?.alreadyLinkLifeTag) {
      //   return renderCardInfo();
      // }
      // if (lifetagFlag?.hasLifeSaver && lifetagFlag?.alreadyOrderLifeTag) {
      //   return renderCardDeliveryFlag();
      // }
      // if (lifetagFlag?.hasLifeSaver) {
      //   return renderCardLifeTagFlag();
      // }

      return renderCardLifeTagFlag();
    };

    return (
      <section className="w-full z-10 px-4 min-h-[420px]">
        {renderContent()}
      </section>
    );
  };

  const renderHeader = () => (
    <div className="relative z-10 w-full flex justify-between items-center shadow-sm border-b bg-white h-16 px-5 lg:h-20 lg:px-[5%]">
      <div className="w-5" role="button">
        <Icon
          icon={ic_west}
          size={20}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
      </div>
      <p className="font-bold text-sm md:text-lg">{translate('lifeCard')}</p>
      {/* <div
        role="button"
        className="w-5"
        onClick={() =>
          router.push({ pathname: NAVIGATION.LIFETAG.LifetagDetailProduct })
        }>
        <img src={StoreIcon} className="h-5" />
      </div> */}
      <div className="w-5"></div>
    </div>
  );

  const renderCardError = () => (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-2xl w-full my-5 p-10">
      <img src={ErrorInternal} className="w-20 xm:w-24" />
      <p className="text-xs font-bold text-center py-4">
        {translate('lifeCardGagalTitle')}
      </p>
      <Button
        bordered
        outline
        onButtonClick={getPolicyWidgetHome}
        className="text-xs w-40 !h-9 xm:!h-10">
        {translate('muatUlang')}
      </Button>
    </div>
  );

  const renderECardContainer = () => (
    <div>
      {loadCardStatus !== 'failed' && (
        <div
          role="button"
          className="flex justify-between items-center px-5 py-3 border-b md:p-5 hover:bg-red-50/30"
          onClick={() => setShowModal(true)}>
          <p className="font-bold text-sm md:text-lg">
            {translate('lifeCard')}
          </p>
          <Icon
            icon={angleRight}
            size={24}
            role="button"
            className="text-gray-500 hover:bg-red-50 hover:text-red-500"
          />
        </div>
      )}

      <div className="py-3 z-10  px-5 md:px-[10%] xm:py-5 border-gray-100">
        <img
          src={getPolicyWidgetHomeResponse?.data?.eCardLifesaver?.link}
          className="w-full my-6"
        />
        {loadCardStatus === 'failed' && renderCardError()}
      </div>
    </div>
  );

  const renderEmgContact = () => {
    if (!currentSetting?.isShowEmergencyPhoneNumber) false;

    return (
      <div className="px-2 xm:px-5 md:px-[10%] border-b-4 border-gray-100">
        <div className="py-8 md:py-10">
          <p className="font-bold text-sm md:text-base pb-3 md:pb-4">
            {trans(locale, lang, 'kontakDarurat')}
          </p>

          <div className="flex flex-col border rounded-2xl shadow-sm divide-y">
            {lifetagProfile?.emergencyContact?.map((item, idx) => (
              <div className="flex p-3 md:p-5">
                <div className="w-[20%]">
                  <img
                    src={IconProfileActive}
                    className="w-10 xm:w-12 md:w-16"
                  />
                </div>
                <div key={idx} className="w-[80%] text-gray-600">
                  <p className="text-[10px] md:text-xs  font-bold pb-2 md:pb-4">
                    <span className="capitalize">{item?.name}</span>
                    {'  -  '}
                    {setMaskingPhone(item.mobilePhoneNumber)}
                  </p>
                  <div className="flex justify-between items-center w-full">
                    <div
                      role="button"
                      onClick={() =>
                        window.open(`tel:${item.mobilePhoneNumber}`, '_blank')
                      }
                      className="w-[48%]">
                      <div className="flex items-center justify-center border border-red-500 rounded-lg hover:bg-red-50/50 px-2 py-1 md:py-2 md:px3 md:rounded-xl">
                        <img src={LifeTagCall} className="h-4 md:h-6" />
                        <p className="font-bold text-[10px] pl-1 xm:text-xs md:pl-4 md:text-sm">
                          {translate('telepon')} {idx !== 0 ? idx + 1 : ''}
                        </p>
                      </div>
                    </div>

                    <div
                      role="button"
                      onClick={() =>
                        window.open(
                          `https://wa.me/${item.mobilePhoneNumber}`,
                          '_blank',
                        )
                      }
                      className="w-[48%]">
                      <div className="flex items-center justify-center border border-red-500 rounded-lg hover:bg-red-50/50 px-2 py-1 md:py-2 md:px3 md:rounded-xl">
                        <img src={WhatsApp} className="h-4 md:h-6" />
                        <p className="font-bold text-[10px] pl-1 xm:text-xs md:pl-4 md:text-sm">
                          WhatsApp {idx !== 0 ? idx + 1 : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <Alert
              iconColor=""
              className="bg-transparent !items-start">
              {trans(locale, lang, 'kontakDaruratIni')}
            </Alert> */}
        </div>
      </div>
    );
  };

  const renderHealthInfo = () => {
    return (
      <div className="border-t pt-2 md:pt-5">
        <div className="px-2 xm:px-5 pt-5 md:px-[10%]">
          {(currentSetting?.isShowBloodType ||
            currentSetting?.isShowAllergic) && (
            <p className="font-bold text-sm pb-2 xm:pb-3 md:text-base">
              {trans(locale, lang, 'informasiKesehatan')}
            </p>
          )}
          <div className="flex flex-col border divide-y rounded-2xl shadow-sm overflow-hidden">
            {currentSetting?.isShowBloodType && (
              <div
                role="button"
                className="flex items-center bg-white py-4 md:py-6">
                <div className="relative w-16 md:w-20">
                  {/* <img src={LifeTagVector} className="relative z-0 h-full" /> */}
                  <img
                    src={LifeTagEmergency}
                    className="relative w-2/3 mx-auto"
                  />
                </div>
                <div className="pl-2 font-bold capitalize">
                  <p className="text-xs pb-1 md:pb-2 md:text-sm">
                    {trans(locale, lang, 'golonganDarah')}
                  </p>
                  <p className="text-[11px] md:text-xs uppercase text-gray-400">
                    {lifetagProfile?.bloodType}
                  </p>
                </div>
              </div>
            )}
            {currentSetting?.isShowAllergic &&
              lifetagProfile?.allergic?.length > 0 && (
                <div
                  role="button"
                  className="flex items-center bg-white overflow-hidden py-4 md:py-6">
                  <div className="relative w-16 md:w-20">
                    {/* <img src={LifeTagVector} className="relative z-0 h-full" /> */}
                    <img
                      src={LifeTagAllergy}
                      className="relative w-2/3 mx-auto"
                    />
                  </div>
                  <div className="pl-2 font-bold capitalize">
                    <p className="text-xs pb-1 md:pb-2 md:text-sm">
                      {trans(locale, lang, 'alergi')}
                    </p>
                    <p className="flex text-[11px] md:text-xs text-gray-400">
                      {lifetagProfile?.allergic.join(', ')}
                    </p>
                  </div>
                </div>
              )}
            {currentSetting?.isShowDiseaseHistory &&
              lifetagProfile?.diseaseHistory?.length > 0 && (
                <div
                  role="button"
                  className="flex items-center bg-white overflow-hidden py-4 md:py-6">
                  <div className="relative w-16 md:w-20">
                    {/* <img src={LifeTagVector} className="relative z-0 h-full" /> */}
                    <img
                      src={LifeTagDiseaseHistory}
                      className="relative w-2/3 mx-auto"
                    />
                  </div>
                  <div className="pl-2 font-bold capitalize">
                    <p className="text-xs pb-1 md:pb-2 md:text-sm">
                      {trans(locale, lang, 'riwayatPenyakit')}
                    </p>
                    <p className="flex text-[11px] md:text-xs text-gray-400">
                      {lifetagProfile?.diseaseHistory.join(', ')}
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };

  const renderCardDeliveryFlag = () => (
    <div className="relative text-center border border-gray-50 bg-white flex flex-col items-center py-[30px] px-[20px] shadow-lg shadow-neutral-300/30 rounded-[30px] overflow-hidden w-full max-w-[440px] mx-auto">
      <img
        src={BgLifetagVector}
        className="absolute left-0 bottom-0 w-[240px] md:w-[320px] opacity-70"
      />

      <div className="relative flex flex-col items-center z-10">
        <img src={Deliver} width={132} height={132} />

        <div className="text-[16px] font-bold mt-5 mb-4">
          {translate('titleProses')}
        </div>
        <p className="text-[14p] text-neutral-700">{translate('pengiriman')}</p>

        <Button
          type="linear-gradient"
          full
          className="mt-12"
          onButtonClick={() => {
            router.push({ pathname: NAVIGATION.LIFETAG.LifetagScanner });
          }}>
          {translate('hubungkanLifetag')}
        </Button>
      </div>
    </div>
  );

  const renderCardLifeTagFlag = () => (
    <div className="py-3 z-10 px-5 md:px-[10%] xm:py-5">
      <div className="relative text-center border border-gray-50 bg-white py-[30px] px-[20px] shadow-lg shadow-neutral-300/30 rounded-[30px] overflow-hidden w-full mx-auto">
        <img
          src={BgLifetagVector}
          className="absolute left-0 bottom-0 w-[240px] md:w-[320px] opacity-70 z-0"
        />

        <div className="relative flex flex-col items-center z-10">
          <img src={LifetagScan} width={132} height={132} />
          <img
            src={LifetagWord}
            style={{
              width: 76,
              height: 21,
              objectFit: 'contain',
              marginTop: 16,
            }}
          />

          <div className="text-[16px] font-bold mt-5 mb-4">
            {isGracePeriod
              ? translate('gracePeriodTitle')
              : translate('kamuBelumMemiliki')}
          </div>
          <p className="text-[14p] text-neutral-700">
            {isGracePeriod
              ? translate('gracePeriodContent')
              : translate('keadaanDaruratDitangani')}
          </p>

          <Button
            full
            type="linear-gradient"
            className="mt-12"
            onButtonClick={() => {
              router.push({
                pathname: NAVIGATION.LIFETAG.LifetagDetailProduct,
              });
            }}>
            {translate('dapatkanLifetag')}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContentBody = () => {
    if (isGracePeriod) {
      return renderCardLifeTagFlag();
    }
    if (
      lifetagFlag?.hasLifeSaver &&
      lifetagFlag?.alreadyLinkLifeTag &&
      lifetagFlag?.haveTrackingNumber
    ) {
      return (
        <>
          {renderEmgContact()}
          {renderHealthInfo()}
        </>
      );
    }
    if (lifetagFlag?.hasLifeSaver && lifetagFlag?.alreadyLinkLifeTag) {
      return (
        <>
          {renderEmgContact()}
          {renderHealthInfo()}
        </>
      );
    }
    if (lifetagFlag?.hasLifeSaver && lifetagFlag?.alreadyOrderLifeTag) {
      return renderCardDeliveryFlag();
    }
    if (lifetagFlag?.hasLifeSaver) {
      return renderCardLifeTagFlag();
    }

    return null();
  };

  const renderModalLifecard = () => (
    <Modal
      toggle={() => setShowModal(false)}
      size="md"
      noBackground
      className="relative"
      isOpen={showModal}>
      <Icon
        icon={x}
        size={24}
        role="button"
        className="absolute -top-8 left-3 text-white hover:text-red-100 md:left-0"
        onClick={() => setShowModal(false)}
      />
      <img
        src={getPolicyWidgetHomeResponse?.data?.eCardLifesaver?.link}
        className="w-full"
      />
    </Modal>
  );

  const renderCommingSoon = () => (
    <div className="py-8 z-10 px-5 md:px-[10%]">
      <p className="font-bold text-sm text-gray-600 xm:text-base md:text-lg">
        {translate('lifetag')}
      </p>
      <div className="relative mt-2 shadow-md border rounded-2xl md:rounded-3xl overflow-hidden">
        <img
          src={BgLifetagVector}
          className="absolute left-0 bottom-0 w-full h-4/5 z-0"
        />
        <div className="relative z-10 p-3 xm:p-5">
          <img src={LifeTagCommingSoon} className=" mx-auto w-1/2 md:w-1/3" />
          <p className="font-bold text-center py-5 text-sm xm:text-base md:text-lg">
            {translate('comingSoonTitle')}
          </p>
          <p className="text-center px-2 text-xs xm:text-sm md:text-base">
            {translate('comingSoonSubtitle')}
          </p>
          <Button
            full
            disabled
            type="linear-gradient"
            className="mt-8 text-sm md:text-base !h-10 md:!h-11 md:mt-12">
            {translate('dapatkanLifetag')}
          </Button>
        </div>
      </div>
    </div>
  );

  if (!token) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      <img
        src={DefaultBackground}
        className="absolute z-0 top-0 left-0 w-full hidden md:block"
      />
      {renderHeader()}
      <div className="relative z-10 flex items-center justify-center w-full h-full pb-10 md:py-10">
        <div className="w-full max-w-2xl bg-white pb-16 rounded-3xl md:border md:shadow-md">
          {renderECardContainer()}
          {/* {renderCommingSoon()} */}
          {/* {renderContentBody()} */}
        </div>
      </div>

      {renderModalLifecard()}
    </div>
  );
};

export default View;
