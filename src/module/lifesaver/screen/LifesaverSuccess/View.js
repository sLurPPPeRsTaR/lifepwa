import locale from './locale';
import moment from 'moment';
import { trans } from '@cp-util/trans';
import { setFormatDate, getCurrentTime } from '@cp-util/common';
import { Button, Container, Modal } from '@cp-component';
import { LifesaverBack1 } from '@cp-config/Svgs';
import {
  NAVIGATION,
  codeLifesaver,
  planCodeLifesaver,
} from '@cp-util/constant';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import {
  LifesaverGift,
  LifeSaverPlus,
  LifeSaver,
  Shield,
  BgSuccess,
  LifesaverPOS,
} from '@cp-config/Images';
import { getBulkReceiverApi } from '@cp-module/lifesaver/lifesaverApi';

export default function Page({
  lang,
  setLoading,
  planCode,
  getCurrentSubs,
  getCurrentSubsResponse,
  type,
}) {
  const router = useRouter();
  const [startDate, setStartDate] = useState();
  const [receiverBulkRes, setReceiverBulkRes] = useState(undefined);
  useEffect(() => {
    if (type === 'receiver') {
      setLoading(true);
      getBulkReceiverApi()
        .then((res) => {
          setReceiverBulkRes(res);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }
  }, []);
  const translate = (val) => trans(locale, lang, val);
  const treatment = moment(startDate).add(1, 'day').format('YYYY-MM-DD');
  const injury = moment(startDate).add(5, 'day').format('YYYY-MM-DD');

  const setImageLifesaver = useCallback(
    (val) => {
      if (receiverBulkRes?.data?.planCode) {
        planCode = receiverBulkRes?.data?.planCode;
      }
      if (val == 'LifeSAVER' || planCode === codeLifesaver.lifesaver.planCode) {
        return <img src={LifeSaver} className="w-full" />;
      }
      if (
        val == 'LifeSAVER+' ||
        planCode === codeLifesaver.lifesaverplus.planCode
      ) {
        return <img src={LifeSaverPlus} className="w-full" />;
      }
      if (
        val == 'LifeSAVER POS' ||
        planCode === codeLifesaver.lifesaverpos.planCode
      ) {
        return <img src={LifesaverPOS} className="w-full" />;
      }
    },
    [receiverBulkRes],
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (type !== 'receiver') {
      getCurrentSubs();
    }
  }, [type]);

  const planName = useCallback(() => {
    if (getCurrentSubsResponse?.planName) {
      return getCurrentSubsResponse?.planName;
    }
    return planCodeLifesaver[planCode]?.planName;
  }, [getCurrentSubsResponse, planCode]);

  useEffect(() => {
    setImageLifesaver(planName());
    setStartDate(getCurrentSubsResponse?.policyStartDate);
  }, [getCurrentSubsResponse, planCode]);

  return (
    <div className="relative bg-primary-light-primary90">
      <img src={BgSuccess} className="absolute top-0 z-0 left-0 w-full" />
      <Container noBackground fullScreen className="z-10">
        <div className="relative w-full flex justify-center pt-4 pb-12">
          <div
            role="button"
            onClick={() => {
              router.push({
                pathname: NAVIGATION.HOME.Home,
              });
            }}
            className="absolute flex items-center left-4 md:left-6 z-10">
            <img src={LifesaverBack1} />
          </div>
        </div>
        <div className="relative z-10 px-4 max-w-lg mx-auto">
          <div className="flex flex-col justify-center items-center text-white font-bold text-center mb-6">
            <img src={Shield} className="w-20 mb-4" />
            <p className="text-lg">{translate('title')}</p>
            <p className="text-lg">{translate('subtitle')}</p>
          </div>

          <div className="rounded-2xl bg-white mb-4 py-5">
            <div className="max-w-[250px] mx-auto">
              {setImageLifesaver(planName())}
            </div>
            <p className="p-4 text-center text-neutral-light-neutral60 font-medium text-body2 md:text-body1">
              {translate('subtitle2')}
            </p>

            <div className="flex">
              <div className="text-center p-2 w-full border border-primary-light-primary90 border-l-0">
                <p className="text-body2 font-bold text-primary-light-primary90 md:text-body1">
                  {setFormatDate(treatment, lang, 3)}, {getCurrentTime()}
                </p>
                <p className="text-caption1 text-[#666B6F] font-medium md:text-body2">
                  {translate('biayaPengobatan')}
                </p>
              </div>
              <div className="text-center p-2 w-full border border-primary-light-primary90 border-r-0">
                <p className="text-body2 font-bold text-primary-light-primary90 md:text-body1">
                  {setFormatDate(injury, lang, 3)}, {getCurrentTime()}
                </p>
                <p className="text-caption1 text-[#666B6F] font-medium md:text-body2">
                  {translate('cederaOlahraga')}
                </p>
              </div>
            </div>

            <div className="text-center p-4 pb-0">
              <p className="text-body2 font-bold text-green-500 md:text-body1">
                {translate('titleAktif')}
              </p>
              <p className="text-caption1 text-[#666B6F] font-medium md:text-body2">
                {translate('subtitleAktif')}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 mb-8">
            <div className="mb-4 flex items-center gap-5">
              <img src={LifesaverGift} className="w-20 md:w-24" />
              <div>
                <p className="text-neutral-light-neutral60 font-bold text-body1 md:text-h6">
                  {translate('titleSharing')}
                </p>
                <p className="text-[#666B6F] font-medium text-body2 md:text-body2">
                  {translate('subtitleSharing')}
                </p>
              </div>
            </div>
            <div>
              <Button
                type="linear-gradient"
                full
                onButtonClick={() => {
                  router.push({
                    pathname: NAVIGATION.LIFESAVER.LifesaverInviteFriends,
                  });
                }}>
                {translate('ajakTeman')}
              </Button>
            </div>
          </div>
          {type === 'receiver' ? (
            <div
              role="button"
              onClick={() => {
                router.push(
                  {
                    pathname: NAVIGATION.PROFILE.Profile,
                    query: {
                      activeTabProps: 1,
                      policyNo: getCurrentSubsResponse?.policyNo,
                    },
                  },
                  NAVIGATION.PROFILE.Profile,
                );
              }}
              className="text-white font-semibold text-body2 underline text-center hover:no-underline mb-10">
              {translate('toSubscriptionDetail')}
            </div>
          ) : (
            <div
              role="button"
              onClick={() => {
                router.push({
                  pathname: NAVIGATION.HOME.Home,
                });
              }}
              className="text-white font-semibold text-body2 underline text-center hover:no-underline mb-10">
              {translate('kembaliKeberanda')}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
