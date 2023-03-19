import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Loading, ModalPaymentFail } from '@cp-component';
import { NAVIGATION } from '@cp-util/constant';
import {
  SET_LIFETAG_PAYMENT_CHECK_FAILED,
  SET_LIFETAG_PAYMENT_CHECK_SUCCESS,
} from '@cp-module/payments/paymentsConstant';
import {
  SET_LIFETAG_UPDATE_ORDER_FAILED,
  SET_LIFETAG_UPDATE_ORDER_SUCCESS,
} from '@cp-module/lifetag/lifetagConstant';

export default function Page({
  lang,
  lifetagAction,
  paymentsAction,
  setCustomerCare,
  setLifetagPaymentCheck,
  setLifetagUpdateOrder,
  setLifetagCreateOrderResponse,
  setLifetagPaymentCheckResponse,
  setLifetagCreateOrderClear,
  isComingFromSreen,
  setIsComingFromScreen,
}) {
  const router = useRouter();
  const [paymentFailed, setPaymentFailed] = useState(false);

  useEffect(() => {
    setLifetagPaymentCheck({
      invoiceId: isComingFromSreen?.lifetagPayment?.invoiceId,
    });
  }, [isComingFromSreen?.lifetagPayment?.invoiceId]);

  const checkPaymentEvents = useCallback(
    (act) => {
      if (act === SET_LIFETAG_PAYMENT_CHECK_SUCCESS) {
        if (setLifetagPaymentCheckResponse?.data?.status === 'SUCCESS') {
          setLifetagUpdateOrder({
            orderId: isComingFromSreen?.lifetagPayment?.orderId,
            invoiceId: isComingFromSreen?.lifetagPayment?.invoiceId,
          });
        } else {
          setPaymentFailed(true);
        }
      }
      if (act === SET_LIFETAG_PAYMENT_CHECK_FAILED) {
        setPaymentFailed(true);
      }
    },
    [isComingFromSreen?.lifetagPayment, setLifetagUpdateOrder],
  );

  const lifetagActionResult = useCallback(
    (act) => {
      if (act === SET_LIFETAG_UPDATE_ORDER_SUCCESS) {
        router.push(NAVIGATION.HOME.Home);
        setLifetagCreateOrderClear();
        setIsComingFromScreen({});
      }
      if (act === SET_LIFETAG_UPDATE_ORDER_FAILED) {
        setPaymentFailed(true);
      }
    },
    [setIsComingFromScreen, setLifetagCreateOrderClear],
  );

  useEffect(() => {
    checkPaymentEvents(paymentsAction);
  }, [checkPaymentEvents, paymentsAction]);

  useEffect(() => {
    lifetagActionResult(lifetagAction);
  }, [lifetagActionResult, lifetagAction]);

  return (
    <>
      {paymentFailed ? (
        <ModalPaymentFail
          isOpen={paymentFailed}
          lang={lang}
          customerCare={() => setCustomerCare(true)}
          setClose={() => {
            router.back();
            setPaymentFailed(false);
          }}
        />
      ) : (
        <Loading isOpen={true} />
      )}
    </>
  );
}
