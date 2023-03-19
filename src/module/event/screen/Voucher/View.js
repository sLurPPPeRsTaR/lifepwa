import Image from 'next/image';
import locale from './locale';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { trans } from '@cp-util/trans';
import { NAVIGATION } from '@cp-util/constant';
import { LifeSaver, BgSuccess, LifeSaverPlus, LifesaverPOS } from '@cp-config/Images';
import { VoucherLine } from '@cp-config/Svgs';
import { Button, Alert, Container, ModalTermNCondition } from '@cp-component';
import {
  GET_EVENT_DETAIL_FAILED,
  GET_EVENT_DETAIL_SUCCESS,
} from '@cp-module/event/eventConstant';
import { ArrowBackWhite } from '@cp-config/Svgs';
import _ from 'lodash';
import { GET_CURRENT_SUBS_FAILED, GET_CURRENT_SUBS_SUCCESS } from '@cp-module/lifesaver/lifesaverConstant';
export default function Page({
  // setLoading,
  lang,
  userId,
  eventAction,
  getEventDetail,
  setCustomerCare,
  getEventDetailClear,
  // setAvailableOnMobile,
  getIsUserEligibleClear,
  getEventDetailResponse,
  getCurrentSubsResponse,
  getEventQuotaResponse,
  getEventQuota,
  getCurrentSubs,
  accessCode,
  setInternalServerError,
  getPoliciesResponse,
  setSelectedPolicy,
  getPolicies,
}) {
  const router = useRouter();
  const { eventId } = router.query;
  const translate = (val) => trans(locale, lang, val);
  const [isOpenModalTnc, setOpenModalTnc] = useState(false)

  useEffect(() => {
    getEventDetail({ eventId, lang, userId, accessCode });
    getCurrentSubs()
    getEventQuota({ eventId: eventId })
    getPolicies()
  }, []);

  const watchAllEventFetch = useCallback(
    (eventAction) => {
      if (eventAction === GET_EVENT_DETAIL_SUCCESS) {
        getIsUserEligibleClear();
      }
      if (eventAction === GET_EVENT_DETAIL_FAILED) {
        getEventDetailClear();
        getIsUserEligibleClear();
        setInternalServerError(true)
        router.push(`${NAVIGATION.EVENT.EventDetail}/${getEventDetailResponse?.data?.slugId}`)
      }
      if ( eventAction === GET_CURRENT_SUBS_SUCCESS ) {
        if(getCurrentSubsResponse){
          setActiveProduct(true)
        }
      }

      if ( eventAction === GET_CURRENT_SUBS_FAILED ) {
        setInternalServerError(true)
        router.push(`${NAVIGATION.EVENT.EventDetail}/${getEventDetailResponse?.data?.slugId}`)
      }
    },
    [],
  );

  useEffect(() => {
    watchAllEventFetch(eventAction);
  }, [eventAction, watchAllEventFetch]);

  const customProductCondition = () => {
    if(getCurrentSubsResponse?.planName === 'LifeSAVER'){
      return 'LifeSAVER'
    }
    if(getCurrentSubsResponse?.planName === 'LifeSAVER+'){
      return 'LifeSAVER+'
    }
    if(getCurrentSubsResponse?.planName === 'LifeSAVER POS'){
      return 'LifeSAVER POS'
    }
    if(getEventDetailResponse?.data?.product?.name === 'LifeSAVER+'){
      return 'LifeSAVER+'
    }

    return 'LifeSAVER'
  }

  const RenderVoucher = () => {
    const RenderHeader = () => {
      return (
        <div>
          <div className="p-4">
            <img
              src={getEventDetailResponse?.data?.banner?.filter(item => item.position === 3)[0]?.url}
              className="w-full rounded-lg"
            />
          </div>
          <div className="text-center px-6 mb-2 font-bold text-md">
            <p className="font-bold text-md">
              {trans(locale, lang, 'title')} {getEventDetailResponse.data?.name}
            </p>
          </div>
        </div>
      )
    }

    const RenderMessageStatusCondition = () => {
      return (
        <div>
          {
            getEventQuotaResponse?.data?.remainingQuotaLifesaver === 0 ?
              <p className="font-bold pb-5 text-sm w-2/3 text-[#C33025]">
                {translate('messageStatusHabis')}
              </p>
              :
              getCurrentSubsResponse?.planName === 'LifeSAVER' || getCurrentSubsResponse?.planName === 'LifeSAVER+' || getCurrentSubsResponse?.planName === 'LifeSAVER POS' ? 
                <p className="font-bold pb-5 text-sm w-2/3">
                  {translate('messageStatusTerproteksi')}
                </p>
                :
                <p className="font-bold pb-5 text-sm w-2/3">
                  {translate('messageStatusBerkesempatan')}
                </p>
          }
        </div>
      )
    }

    const RenderButtonCondition = () => {
      if (getEventDetailResponse?.data?.remainingQuotaLifesaver === 0 && _.isEmpty(getCurrentSubsResponse)) {
        return (
          <Button
            type="linear-gradient"
            className="mx-auto"
            onButtonClick={() => {
              router.push(NAVIGATION.LIFESAVER.LifesaverMain)
            }}>
            {translate('btnMulaiBerlangganan')}
          </Button>
        )
      }

      if (['LifeSAVER', 'LifeSAVER+', 'LifeSAVER POS'].includes(getCurrentSubsResponse?.planName)) {
        return (
          <Button
            type="linear-gradient"
            className="mx-auto"
            onButtonClick={() => {
              let activeLsPolis = getPoliciesResponse?.data.filter(item => item.policyNo === getCurrentSubsResponse?.policyNo)[0]
              setSelectedPolicy(activeLsPolis)
              router.push(NAVIGATION.POLICY.PolisDetail)
            }}>
            {translate('btnLihatPolis')}
          </Button>
        )
      }

      if (getEventQuotaResponse?.data?.remainingQuotaLifesaver > 0 && _.isEmpty(getCurrentSubsResponse)) {
        return (
          <Button
            type="linear-gradient"
            className="mx-auto"
            onButtonClick={() => {
              setOpenModalTnc(true)
            }}>
            {translate('btnLanjut')}
          </Button>
        )
      }
    }


    return (
      <>
        <div className="rounded-[10px] bg-gray-50 mb-4">
          <RenderHeader />
          <div className="flex justify-between gap-0 items-center">
            <div className="h-6 w-4 rounded-r-full bg-[#F32D33]" />
            <div>
              <Image src={VoucherLine} width={300} height={24} />
            </div>
            <div className="h-6 w-4 rounded-l-full bg-[#F32D33]" />
          </div>
          <div className="px-6 pb-5">
            <RenderMessageStatusCondition />
            <div className="flex justify-between mb-5 items-center">
              <div className="max-w-[106px] h-auto">
                <img src={customProductCondition() === 'LifeSAVER' ? LifeSaver: customProductCondition() === 'LifeSAVER+' ? LifeSaverPlus  : customProductCondition() === 'LifeSAVER POS' ? LifesaverPOS: null} />
              </div>
              {
                getEventQuotaResponse?.data?.remainingQuotaLifesaver > 0 && (getCurrentSubsResponse?.planName !== 'LifeSAVER' && getCurrentSubsResponse?.planName !== 'LifeSAVER+' && getCurrentSubsResponse?.planName !== 'LifeSAVER POS') ?
                  <p className="rounded-full text-caption1 text-white px-2 py-1 w-max bg-[#00B76A]">
                    {translate('gratis')} 1 {translate('bulan')}
                  </p> : null
              }
            </div>
            <p className="text-body2 mb-5">{customProductCondition() === 'LifeSAVER' ? translate('contentLs') : customProductCondition() === 'LifeSAVER+' ? translate('contentLsPlus'): customProductCondition() === 'LifeSAVER POS' ? translate('contentLsPos'): null}</p>
            <div className="mb-4">
              <RenderButtonCondition />
            </div>
            <p className="text-gray-400 text-center text-sm font-medium">
              {
                !getCurrentSubsResponse?.planName ? customProductCondition() === 'LifeSAVER' ? translate('noteLs') : customProductCondition() === 'LifeSAVER+' ? translate('noteLsPlus'): customProductCondition() === 'LifeSAVER POS' ? translate('noteLsPlus'): null : null
              }
            </p>
          </div>
          <div
            role="button"
            onClick={() => router.push(NAVIGATION.EVENT.EventMain)}
            className="text-center text-sm pb-5 font-bold text-red-500 underline hover:no-underline">
            {translate('btnBackToEvent')}
          </div>
        </div>

        <Alert iconColor="text-white/80" className="text-white text-xs">
          {translate('alertTitle')}
        </Alert>
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

      </>
    );
  };

  return (
    <>
      <div className="relative bg-primary-light-primary90 px-[5%]">
        <img src={BgSuccess} className="absolute top-0 z-0 left-0 w-full" />
        <button
          className='absolute z-20 py-7'
          onClick={() => {
            router.back()
            getIsUserEligibleClear();
          }}>
          <img src={ArrowBackWhite} />
        </button>
        <Container className="mt-4 z-10" noBackground fullScreen>
          <div className="w-full mt-20 max-w-[380px] mx-auto px-4">
            {RenderVoucher()}
          </div>
          <ModalTermNCondition 
            lang={lang}
            isOpen={isOpenModalTnc}
            onAgree={() => {
              router.push({
                pathname: NAVIGATION.EVENT.EventConfirmClaim,
                query: {
                    eventCode: getEventDetailResponse?.data?.eventCode, ...getEventDetailResponse?.data?.product
                  },
                },
                NAVIGATION.EVENT.EventConfirmClaim,
              );
            }}
            onClose={() => { setOpenModalTnc(false) }}
          />
        </Container>
      </div>
    </>
  );
}
