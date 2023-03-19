import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { GET_CURRENT_SUBS_SUCCESS } from '@cp-module/lifesaver/lifesaverConstant';
import { NAVIGATION } from '@cp-util/constant';
import {
  Loading,
  DefaultBackground,
  LifetagPairingFailed,
  LifetagReadyToConnect,
} from '@cp-config/Images';
import {
  GET_LIFETAG_LIST_OTHER_INFO_FAILED,
  GET_LIFETAG_LIST_OTHER_INFO_SUCCESS,
  GET_LIFETAG_PROFILE_FAILED,
  GET_LIFETAG_PROFILE_SUCCESS,
  LIFETAG_RESPONSE_STATE,
  GET_LIFETAG_PROFILE_PUBLIC_FAILED,
  GET_LIFETAG_PROFILE_PUBLIC_SUCCESS,
} from '@cp-module/lifetag/lifetagConstant';
import LifetagProfile from '../LifetagProfile';
import { Modal } from '@cp-component';
import { Close, Check } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import locale from './locale';
import Image from 'next/image';

export default function page(props) {
  const {
    lang,
    userId,
    token,
    lifetagAction,
    getLifetagProfile,
    getLifetagProfileFailed,
    getLifetagProfileResponse,
    getLifetagProfilePublic,
    getLifetagProfilePublicFailed,
    getLifetagProfilePublicResponse,
    setLoading,
    alreadyKYC,
    getCurrentSubs,
    getCurrentSubsResponse,
    setIsComingFromScreen,
    lifesaverAction,
    getLifetagListOtherInfo,
    getLifetagListOtherInfoFailed,
    getLifetagListOtherInfoResponse,
    setLifetagNotActive,
    setLifetagAccessFailed,
    setLifetagOtherInfo,
  } = props;

  const { LIFE_TAG_NOT_LINKED, LIFE_TAG_NOT_FOUND } = LIFETAG_RESPONSE_STATE;
  const router = useRouter();
  const {
    query: { lifetagId, isQr, isScanner },
  } = router;

  const [lifetagProfile, setLifetagProfile] = useState(null);
  const [onLoaded, setOnLoaded] = useState(true);
  const [isSuccessPairing, setIsSuccessPairing] = useState(false);
  const [isFailedPairing, setIsFailedPairing] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [renderProfilePublic, setRenderProfilePublic] = useState(false);
  const [lifetagProfilePublicExist, setLifetagProfilePublicExist] = useState(false);

  // from internal app
  useEffect(() => {
    if (lifetagId) {
      if (token) {
        getLifetagProfile({ id: lifetagId });
      } else {
        getLifetagProfilePublic({ id: lifetagId });
        setIsVisitor(true);
      }
    }
  }, [lifetagId, isQr]);

  // qr code - from outside
  useEffect(() => {
    if (lifetagId && isQr === 'true') {
      if (process.env.NODE_ENV === 'production') {
        window.location.replace(
          `https://qr.life.id/?link=https%3A%2F%2Fuat.life.id%2Flifetag%2F%3FlifetagId%3D${lifetagId}&apn=id.lifecustomer.uat&afl=https%3A%2F%2Fuat.life.id%2Flifetag%2F%3FlifetagId%3D${lifetagId}&isi=1627986095&ibi=id.life.customer.uat&ifl=https%3A%2F%2Fuat.life.id%2Flifetag%2F%3FlifetagId%3D${lifetagId}`,
        );
      } else {
        window.location.replace(
          `https://qr.life.id/?link=https%3A%2F%2Fuat.life.id%2Flifetag%2F%3FlifetagId%3D${lifetagId}&apn=id.lifecustomer.uat&afl=https%3A%2F%2Fuat.life.id%2Flifetag%2F%3FlifetagId%3D${lifetagId}&isi=1627986095&ibi=id.life.customer.uat&ifl=https%3A%2F%2Fuat.life.id%2Flifetag%2F%3FlifetagId%3D${lifetagId}`,
        );
      }
    }
  }, [isQr, lifetagId]);

  // cb lifetag
  const getLifetagProfileResult = useCallback(
    (act) => {
      if (act === GET_LIFETAG_PROFILE_PUBLIC_SUCCESS) {
        setLoading(false);
        setOnLoaded(false);
        setLifetagProfile(getLifetagProfilePublicResponse?.data);
        setRenderProfilePublic(true);
      }
      if (act === GET_LIFETAG_PROFILE_PUBLIC_FAILED) {
        setLoading(false);
        const message = getLifetagProfilePublicFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          if (message === LIFE_TAG_NOT_LINKED) {
            router.push(
              { pathname: NAVIGATION.LOGIN.Login, query: { lifetagId } },
              NAVIGATION.LOGIN.Login,
            );
            setOnLoaded(false);
          } else {
            if (!alreadyKYC) {
              router.push(NAVIGATION.KYC.KycMain);
            } else {
              router.push(
                { pathname: NAVIGATION.LIFESAVER.LifesaverMain },
                NAVIGATION.LIFESAVER.LifesaverMain,
              );
            }
          }
        }
      }
      if (act === GET_LIFETAG_PROFILE_SUCCESS) {
        setLoading(false);
        setOnLoaded(false);
        setLifetagProfile(getLifetagProfileResponse?.data);
        if (getLifetagProfileResponse?.data?.isOwner) {
          setIsSuccessPairing(true);
        } else {
          setIsVisitor(true);
          setRenderProfilePublic(true);
        }
      }
      if (act === GET_LIFETAG_PROFILE_FAILED) {
        setLoading(false);
        setOnLoaded(false);
        const message = getLifetagProfileFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          if (message === LIFE_TAG_NOT_LINKED) {
            if (alreadyKYC) {
              getCurrentSubs();
            } else {
              setIsComingFromScreen({});
              router.push(NAVIGATION.KYC.KycMain);
            }
            return;
          }
          if (message === LIFE_TAG_NOT_FOUND) {
            return;
          }
        }
        if (message === 'BAD_REQUEST') {
          setIsFailedPairing(true);
        }
        console.log(message);
      }
      if (act === GET_LIFETAG_LIST_OTHER_INFO_SUCCESS) {
        setLoading(false);
        const res = getLifetagListOtherInfoResponse?.data;
        const lifetagOtherInfo = !_.isEmpty(res) && res.length > 0
          ? {
              bloodType: res[0]?.bloodType,
              allergic: res[0]?.allergic,
              diseaseHistory: res[0]?.diseaseHistory,
              emergencyContact: res[0]?.emergencyContact.map((item) => {
                return {
                  ...item,
                  phoneNumber: item.mobilePhoneNumber,
                };
              }),
            }
          : undefined;
        setLifetagOtherInfo({ lifetagOtherInfo, lifetagId });
        setOnLoaded(false);
      }
      if (act === GET_LIFETAG_LIST_OTHER_INFO_FAILED) {
        setLoading(false);
        setOnLoaded(false);
      }
    },
    [
      alreadyKYC,
      getCurrentSubs,
      getLifetagProfileFailed?.message,
      getLifetagProfileResponse?.data,
      getLifetagListOtherInfoResponse?.data,
      setIsComingFromScreen,
      getLifetagProfilePublicFailed?.message,
      getLifetagProfilePublicResponse?.data,
      setLoading,
    ],
  );

  useEffect(() => {
    getLifetagProfileResult(lifetagAction);
  }, [getLifetagProfileResult, lifetagAction]);

  // cb lifesaver
  const lifesaverResult = useCallback(
    (lifesaverAct, lifetagAct) => {
      if (
        lifesaverAct === GET_CURRENT_SUBS_SUCCESS &&
        lifetagAct === GET_LIFETAG_PROFILE_FAILED &&
        getLifetagProfileFailed?.message === LIFE_TAG_NOT_LINKED
      ) {
        setLoading(false);
        const hasActiveLifesaver =
          getCurrentSubsResponse?.isSubscribe &&
          getCurrentSubsResponse?.status !== 'GRACE_PERIOD';
        if (alreadyKYC && hasActiveLifesaver) {
          setLoading(true);
          getLifetagListOtherInfo();
        } else if (alreadyKYC && !hasActiveLifesaver) {
          router.push(
            { pathname: NAVIGATION.LIFESAVER.LifesaverMain },
            NAVIGATION.LIFESAVER.LifesaverMain,
          );
        } else {
          setOnLoaded(false);
          router.push(NAVIGATION.KYC.KycMain);
        }
        setOnLoaded(false);
      }
      if (
        lifesaverAct === GET_CURRENT_SUBS_SUCCESS &&
        lifetagAct === GET_LIFETAG_LIST_OTHER_INFO_SUCCESS &&
        getLifetagProfileFailed?.message === LIFE_TAG_NOT_LINKED
      ) {
        const res = getLifetagListOtherInfoResponse?.data;
        const lifetagOtherInfo = !_.isEmpty(res)
          ? {
              bloodType: res[0]?.bloodType,
              allergic: res[0]?.allergic,
              diseaseHistory: res[0]?.diseaseHistory,
              emergencyContact: res[0]?.emergencyContact.map((item) => {
                return {
                  ...item,
                  phoneNumber: item.mobilePhoneNumber,
                };
              }),
            }
          : undefined;
        setIsSuccessPairing(true);
        setTimeout(() => {
          router.push(
            {
              pathname: NAVIGATION.LIFETAG.LifetagForm,
              query: { lifetagId },
            },
            NAVIGATION.LIFETAG.LifetagForm,
          );
        }, 3000);
      }
      setLoading(false);
    },
    [
      alreadyKYC,
      getLifetagListOtherInfo,
      getCurrentSubsResponse?.isSubscribe,
      getCurrentSubsResponse?.status,
      getLifetagProfileFailed?.message,
    ],
  );

  useEffect(() => {
    lifesaverResult(lifesaverAction, lifetagAction);
  }, [lifesaverAction, lifetagAction, lifesaverResult]);

  const renderModalPairingFailed = () => {
    const redirectHome = () => {
      if (alreadyKYC) {
        router.push(
          { pathname: NAVIGATION.LIFESAVER.LifesaverMain },
          NAVIGATION.LIFESAVER.LifesaverMain,
        );
      } else {
        router.push(NAVIGATION.KYC.KycMain);
      }
    }
    return (
      <div className="relative w-full max-w-lg bg-white px-[5%] py-10 rounded-3xl md:border shadow-sm md:shadow-md">
        <div
          role="button"
          className="absolute flex items-center left-0 top-0 p-3"
          onClick={() => redirectHome()}>
          <Image src={Close} width={24} height={24} />
        </div>
        <img src={LifetagPairingFailed} className="w-2/3 mx-auto" />
        <div className="relative z-10 w-full">
          <p className="text-center pb-5 font-bold text-xs xm:text-sm lg:text-lg">
            {trans(locale, lang, 'titlePairingFailed')}
          </p>
          <p className="text-center pb-5 text-xs xm:text-sm lg:text-base">
            {trans(locale, lang, 'subtitlePairingFailed')}
          </p>
        </div>
      </div>
    );
  };

  const renderModalPairingSuccess = () => {
    const redirectLifetagProfile = () => {
      router.push(
        {
          pathname: NAVIGATION.LIFETAG.LifetagMain,
          query: { lifetagId },
        },
        NAVIGATION.LIFETAG.LifetagMain,
      );
    };
    return (
      <div className="relative w-full max-w-lg bg-white px-[5%] py-10 rounded-3xl md:border shadow-sm md:shadow-md">
        <div
          role="button"
          className="absolute flex items-center left-0 top-0 p-3"
          onClick={() => redirectLifetagProfile()}>
          <Image src={Close} width={24} height={24} />
        </div>
        <img src={LifetagReadyToConnect} className="w-2/3 mx-auto" />
        <div className="relative z-10 w-full">
          <p className="text-center pb-5 font-bold text-xs xm:text-sm lg:text-lg">
            {trans(locale, lang, 'titlePairingSuccess')}
          </p>
          <p className="text-center pb-5 text-xs xm:text-sm lg:text-base">
            {trans(locale, lang, 'subtitlePairingSuccess')}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={DefaultBackground}
        className="absolute z-0 top-0 left-0 w-full min-h-screen hidden md:block"
      />
      {onLoaded ? (
        <div className="w-full min-h-[80vh] flex items-center justify-center">
          <img src={Loading} className="h-80" />
        </div>
      ) : (
        <>
          {lifetagProfile?.isOwner || (isVisitor && renderProfilePublic) ? (
            <LifetagProfile data={lifetagProfile} lifetagId={lifetagId} currentSubs={getCurrentSubsResponse} />
            ) : (
              <div className="relative z-10 flex items-center justify-center w-full min-h-screen pt-5 md:py-10 px-5">
                {isFailedPairing && renderModalPairingFailed()}
                {isSuccessPairing && renderModalPairingSuccess()}
              </div>
            )}
        </>
      )}
    </div>
  );
}
