import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'react-icons-kit';
import { Button, Alert } from '@cp-component';
import { trans } from '@cp-util/trans';
import { iosGear } from 'react-icons-kit/ionicons';
import { api } from '@cp-bootstrap/bootstrapApi';
import { arrowLeft } from 'react-icons-kit/feather';
import { setMaskingPhone } from '@cp-util/common';
import { Close } from '@cp-config/Svgs';
import { API, BASE_URL, NAVIGATION, EMERGENCY_PHONE } from '@cp-util/constant';
import { GET_CURRENT_SUBS_SUCCESS, GET_CURRENT_SUBS_FAILED } from '@cp-module/lifesaver/lifesaverConstant';
import { LifetagAccessFailed } from '@cp-config/Images';
import {
  IconProfile,
  BgSuccess,
  setLoading,
  LifeTagCall,
  LifeTagVector,
  LifeTagEmergency,
  LifeTagAllergy,
  WhatsApp,
  LifeTagAmbulance,
  VectorBackground,
  DefaultBackground,
  LifeTagDiseaseHistory,
  IconProfileActive,
  StoreIcon,
  isComingFromScreen,
} from '@cp-config/Images';

import locale from './locale';
import { getCurrentRequest } from 'loader-utils';

export default function View(props) {
  const {
    lang,
    userId,
    token,
    data,
    lifetagId,
    isComingFromScreen,
    setIsComingFromScreen,
    getCurrentSubs,
    getCurrentSubsResponse,
    lifesaverAction,
    setLoading,
  } = props;
  const router = useRouter();
  const [photoProfile, setPhotoProfile] = useState();
  const [dataOtherInfo, setDataOtherInfo] = useState();

  const translate = (val) => trans(locale, lang, val);

  useEffect(() => {
    if (token) {
      getCurrentSubs();
      setLoading(true);
    }
    if (isComingFromScreen?.fromProfile) {
      setIsComingFromScreen({ fromProfile: false });
    }
  }, []);

  const lifesaverResult = useCallback(
    (action) => {
      if (action === GET_CURRENT_SUBS_SUCCESS) {
        setLoading(false);
      }
      if (action === GET_CURRENT_SUBS_FAILED) {
        setLoading(false);
      }
    }, [
      getCurrentSubs,
      getCurrentSubsResponse,
    ]
  );

  useEffect(() => {
    lifesaverResult(lifesaverAction);
  }, [lifesaverResult]);

  //get photo profile
  useEffect(() => {
    if (userId) {
      if (data?.thumbnailPhotoKey) {
        api
          .get(
            `${BASE_URL}${API.USER.photoThumbnail}/${data?.thumbnailPhotoKey}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: 'blob',
            },
          )
          .then((res) => {
            const img = new File([res.data], 'photoProfile');

            setPhotoProfile(URL.createObjectURL(img));
          })
          .catch((error) => {
            throw error;
          });
      }
    } else {
      if (data?.thumbnailPhotoKey) {
        api
          .get(
            `${BASE_URL}${API.USER.photoThumbnailPublic}/${data?.thumbnailPhotoKey}`,
            { responseType: 'blob' },
          )
          .then((res) => {
            const img = new File([res.data], 'photoProfile');

            setPhotoProfile(URL.createObjectURL(img));
          })
          .catch((error) => {
            throw error;
          });
      }
    }
  }, [data?.thumbnailPhotoKey]);

  useEffect(() => {
    setDataOtherInfo(data);
  }, [data]);

  const renderHeader = () => {
    return (
      <div className="relative z-10 w-full flex border justify-between items-center shadow-sm bg-white h-16 px-5 lg:h-20 lg:px-[5%]">
        <div className="w-5 xm:w-10 md:w-20" role="button">
          <Icon
            icon={arrowLeft}
            size={20}
            onClick={() => {
              if (isComingFromScreen?.fromProfileMenuLifetag) {
                router.push(
                  {
                    pathname: NAVIGATION.PROFILE.Profile,
                    query: { activeTab: 10 },
                  },
                  NAVIGATION.PROFILE.Profile,
                );
                setIsComingFromScreen({ fromProfileMenuLifetag: false });
              } else {
                router.push(
                  { pathname: NAVIGATION.HOME.Home },
                  NAVIGATION.HOME.Home,
                );
              }
            }}
            className="cursor-pointer"
          />
        </div>
        <p className="font-bold text-sm md:text-base lg:text-lg">
          {translate('mainTitle')}
        </p>
        <div className="flex items-center w-12 gap-2 xm:w-16 md:w-20 xm:gap-3 md:gap-5">
          {data?.isOwner && (
            <>
              <div
                role="button"
                onClick={() => {
                  router.push({
                    pathname: NAVIGATION.LIFETAG.LifetagDetailProduct,
                  });
                  setIsComingFromScreen({ fromProfile: true, lifetagId });
                }}>
                <img src={StoreIcon} className="h-4 xm:h-5" />
              </div>
              <Icon
                icon={iosGear}
                size={24}
                onClick={() =>
                  router.push(
                    {
                      pathname: NAVIGATION.LIFETAG.LifetagSetting,
                      query: { lifetagId, dataOtherInfo },
                    },
                    NAVIGATION.LIFETAG.LifetagSetting,
                  )
                }
                className="cursor-pointer"
              />
            </>
          )}
        </div>
      </div>
    );
  };

  const renderModalEmergencyCall = () => {
    return (
      <div className="relative max-w-2xl w-full mx-auto md:px-4 border rounded-t-3xl bg-white shadow-md">
        <img
          src={LifeTagAmbulance}
          className="absolute  left-1/2 translate-x-[-50%] w-20 -top-1/3 xm:-top-[45%] xm:w-24 md:w-32"
        />
        <div className="bg-white pt-14 pb-8 px-4 rounded-t-3xl md:pt-20">
          <div className="mb-5 w-full text-center">
            <p className="text-sm">{trans(locale,lang, 'callAmbulanceText')}</p>
          </div>
          <Button
            type="linear-gradient"
            className="h-10 text-sm mx-auto"
            onButtonClick={() => window.open(EMERGENCY_PHONE.PHONE, '_blank')}>
            {trans(locale, lang, 'kontakDarurat')}
          </Button>
        </div>
      </div>
    );
  };

  const renderLifeCard = () => {
    return (
      <div className="pb-6 px-2 xm:px-5 md:py-14 md:px-[12%]">
        <div className="p-2 flex items-center border  hover:shadow-md bg-white rounded-[25px] md:rounded-[40px] md:p-3">
          <img src={data?.eCardLifesaver?.link} className="w-full" />
        </div>
      </div>
    );
  };

  const renderEmgContact = () => {
    return (
      <div className="px-2 border-t xm:px-5 md:px-[12%]">
        <div className="py-8 md:py-10">
          <p className="font-bold text-sm md:text-base pb-3 md:pb-4">
            {trans(locale, lang, 'kontakDarurat')}
          </p>

          <div className="flex flex-col border rounded-2xl shadow-sm divide-y">
            {data?.otherInfo?.emergencyContact?.map((item, idx) => (
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
      <div className="border-t py-2 md:py-5">
        <div className="px-2 xm:px-5 py-5 md:px-[12%]">
          <p className="font-bold text-sm pb-2 xm:pb-3 md:text-base">
            {trans(locale, lang, 'informasiKesehatan')}
          </p>
          <div className="relative flex flex-col border divide-y rounded-2xl shadow-sm overflow-hidden">
            {data?.setting?.isShowBloodType && (
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
                    {data?.otherInfo?.bloodType}
                  </p>
                </div>
              </div>
            )}
            {data?.setting?.isShowAllergic &&
              data?.otherInfo?.allergic?.length > 0 && (
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
                      {data?.otherInfo?.allergic.join(', ')}
                    </p>
                  </div>
                </div>
              )}
            {data?.setting?.isShowDiseaseHistory &&
              data?.otherInfo?.diseaseHistory?.length > 0 && (
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
                      {data?.otherInfo?.diseaseHistory.join(', ')}
                    </p>
                  </div>
                </div>
              )}
            <img
              src={VectorBackground}
              className="absolute -bottom-10 left-0 border-transparent h-24 w-full md:h-32"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={DefaultBackground}
        className="absolute top-0 z-0 left-0 w-full h-full hidden md:block"
      />
      {
        getCurrentSubsResponse?.status === 'ACTIVE' || getCurrentSubsResponse?.status === 'AKTIF' || !token ? (
          <>
            {renderHeader()}

            <div className="relative min-h-screen md:mt-8">
              {/* <img src={VectorBackground} className="absolute top-0 z-0 left-0 w-full" /> */}
              <div className="relative bg-white rounded-3xl shadow-xl -bottom-5 max-w-2xl w-full mx-auto md:border mb-20">
                {(data?.eCardLifesaver?.link) && renderLifeCard()}
                {(data?.setting?.isShowEmergencyPhoneNumber) && renderEmgContact()}
                {(data?.setting?.isShowBloodType || data?.setting?.isShowAllergic || data?.setting?.isShowDiseaseHistory) && renderHealthInfo()}
              </div>
              {renderModalEmergencyCall()}
            </div>
          </>
        ) : (
          <div className="relative z-10 flex items-center justify-center w-full min-h-screen pt-5 md:py-10 px-5">
            <div className="relative w-full max-w-lg bg-white px-[5%] py-10 rounded-3xl md:border shadow-sm md:shadow-md">
              <img src={LifetagAccessFailed} className="w-2/3 mx-auto" />
              <div className="relative z-10 w-full my-5">
                <p className="text-center text-md lg:text-lg font-bold">Oops :(</p>
                <p className="text-center mb-5 text-md lg:text-lg font-bold">
                  {trans(locale, lang, 'titleSubscribe')}
                </p>
                <p className="text-center mb-5 text-sm md:text-md text-md">
                  {trans(locale, lang, 'textSubscribe')}
                </p>
              </div>
              <Button
                type="linear-gradient"
                className="h-10 text-sm mx-auto my-3"
                onButtonClick={() => {
                  router.push(
                    { pathname: NAVIGATION.LIFESAVER.LifesaverMain },
                    NAVIGATION.LIFESAVER.LifesaverMain,
                  );
                }}>
                {trans(locale, lang, 'btnSubscribe')}
              </Button>
              <button
                className="h-10 text-sm mx-auto my-3 text-[#ED1C24] font-semibold text-sm w-full max-w-[320px] flex justify-center my-3 border h-10 xm:h-12 items-center rounded-2xl border-[#ED1C24]"
                onClick={() => router.push(NAVIGATION.PROFILE.Profile)}>
                {trans(locale, lang, 'btnBack')}
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
}
