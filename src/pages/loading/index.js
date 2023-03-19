import { Loading } from '@cp-component';
import { NAVIGATION } from '@cp-util/constant';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { windowTopLocation } from '@cp-util/common';

export default function Page() {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  const isFrom =
    typeof window !== 'undefined' && localStorage.getItem('isFrom');

  useEffect(() => {
    if (isFrom) {
      let decodedStringAtoB = atob(isFrom);
      let isFromCheck = JSON.parse(decodedStringAtoB);

      if (isFromCheck.isFromEvent) {
        router.push({
          pathname: NAVIGATION.EVENT.EventPaymentCheck,
        });
      }
    } else {
      setTimeout(() => {
        windowTopLocation();

        if (
          authState &&
          authState?.userData?.invoiceId &&
          authState?.userData?.reffNo
        ) {
          router.push('/check-payment/');
        }
      }, 2000);
    }
  }, [authState, isFrom]);

  return <Loading isOpen={true} />;
}
