import Image from 'next/image';
import { useEffect, useRef, useCallback } from 'react';
import { NAVIGATION } from '@cp-util/constant';
import { useRouter } from 'next/router';
import { Loading } from '@cp-config/Images';
import {
  SET_CREATE_BILL_FAILED,
  SET_CREATE_BILL_SUCCESS,
} from '@cp-module/payments/paymentsConstant';

export default function Page(props) {
  const {
    lang,
    paymentAction,
    setCreateBill,
    setCreateBillClear,
    setCreateBillFailed,
    setCreateBillResponse,
  } = props;

  const router = useRouter();
  const {
    query: { invoiceId },
  } = router;

  useEffect(() => {
    if (invoiceId) {
      setCreateBill({
        isLifetagPayment: true,
        data: {
          invoiceId,
        },
      });
    }
  }, []);

  const paymentResult = useCallback((act) => {
    if (act === SET_CREATE_BILL_SUCCESS) {
      router.push(
        {
          pathname: NAVIGATION.LIFETAG.LifetagPayment,
          query: {
            url: setCreateBillResponse?.data?.redirectUrl,
            prev: 'notif',
          },
        },
        NAVIGATION.LIFETAG.LifetagPayment,
      );
    }
    if (act === SET_CREATE_BILL_FAILED) {
      router.push(
        {
          pathname: NAVIGATION.NOTIFICATION.NotificationMain,
          query: { prev: 'notif' },
        },
        NAVIGATION.NOTIFICATION.NotificationMain,
      );
      setCreateBillClear(false);
    }
  }, []);

  useEffect(() => {
    paymentResult(paymentAction);
  }, [paymentAction, paymentResult]);

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <img src={Loading} className="h-80" />
    </div>
  );
}
