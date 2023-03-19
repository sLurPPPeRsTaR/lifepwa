import { Loading } from '@cp-component';
import { setEventDetail } from '@cp-module/event/eventAction';
import { NAVIGATION } from '@cp-util/constant';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPaymentEventStatusAction } from './action';

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter()
  const isFrom = typeof window !== 'undefined' && localStorage.getItem('isFrom');
  const decodedStringAtoB = isFrom && atob(isFrom);
  const isFromCheck = isFrom && typeof window !== undefined && JSON.parse(decodedStringAtoB);

  useEffect(() => {
    if (isFrom) {
      getPaymentEventStatusAction({
        invoiceId: isFromCheck?.invoiceId,
        reffNo: isFromCheck?.reffNo,
      }, callback)
    }

  }, [isFrom]);

  const callback = (response) => {
    const {
      metaCode,
      data,
    } = response;

    if (metaCode == 200) {
      const customeEvent = {
        banner: [{url:''}, {url:''}, {url: data.banner}],
        endDateTime: data.endDateTime,
        name: data.name,
        startDateTime: data.startDateTime
      }
      dispatch(setEventDetail({
        data: customeEvent,
        ticket: {
          userEventId: data.userEventId,
          orderType: isFromCheck?.orderType,
          planCode: isFromCheck?.planCode,
        }
      }));
      router.push('/event/success');
      return
    } else {
      if (isFrom) {
        let decodedStringAtoB = atob(isFrom);
        let isFromCheck = JSON.parse(decodedStringAtoB);

        if(!isFromCheck.eventId){
          router.push(NAVIGATION.HOME.Home);
          localStorage.removeItem('isFrom');
          return
        }
        router.push({
          pathname: NAVIGATION.EVENT.EventConfirmPayment,
          query: {
            d: isFromCheck.eventId
          }
        });
        localStorage.removeItem('isFrom');
      }
    }
  }

  return (
    <>
      <Loading isOpen={true} />
    </>
  )
} 