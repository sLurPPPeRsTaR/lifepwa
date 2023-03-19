import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loading, Modal } from '@cp-component';
import { NAVIGATION } from '@cp-util/constant';
import { windowTopLocation } from '@cp-util/common';
import { eventAppsflyer } from '@cp-util/func';
import { Close } from '@cp-config/Svgs';
import { Check } from '@cp-config/Images';
import locale from './locale';
import { trans } from '@cp-util/trans';
export default function Page({
  from,
  getPaymentHistory,
  getPaymentStatusV2,
  getPaymentStatusv2Failed,
  getPaymentStatusv2Response,
  getPaymentStatusv3Failed,
  getPaymentStatusv3Response,
  invoiceId,
  product,
  reffNo,
  policyNumber,
  setCreateBillParam,
  setCreateBillResponse,
  setLoading,
  getPaymentStatus,
  getPaymentStatusResponse,
  isOnlyAddCard,
  setIsOnlyAddCard,
  setCreateBillClear,
  paymentId,
  appsflyerData,
  onFailed,
  invoiceMaster,
  getPaymentStatusV3,
  type,
  lang,
  setBuyForOthersState,
  eventId
}) {
  const router = useRouter();

  useEffect(() => {
    if (window !== 'undefined') {
      windowTopLocation();
    }
  }, []);
  console.log(invoiceMaster)

  useEffect(() => {
    console.log(invoiceId , reffNo)
    if (invoiceId && reffNo) {
     
      getPaymentStatusV2({ invoiceId, proposalNumber: reffNo });
      setLoading(true);
    }
  }, [invoiceId, reffNo]);

  useEffect(() => {
    if (invoiceMaster) {
      getPaymentStatusV3({ invoiceMaster });
      setLoading(true);
    }
  }, [invoiceMaster]);

  useEffect(() => {
    if (invoiceId && paymentId) {
      windowTopLocation();

      getPaymentStatus({
        isOnlyAddCard: true,
        data: {
          paymentId: paymentId,
          invoiceId: invoiceId,
        },
      });
      setLoading(true);
    }
  }, [invoiceId, paymentId]);

  useEffect(() => {
    if (invoiceId && policyNumber) {
      getPaymentStatusV2({ invoiceId, policyNumber });
      setLoading(true);
    }
  }, [invoiceId, policyNumber]);

  useEffect(() => {
    if (
      getPaymentStatusv2Response?.status === 'success' ||
      getPaymentStatusv3Response?.status === 'success'
    ) {
      windowTopLocation();
      eventAppsflyer({
        eventName: 'af_subscribe',
        payload: appsflyerData,
      });
      setLoading(false);
      setBuyForOthersState([{ isEdit: true }]);
      if (type === 'event') {
        router.push(
          {
            pathname: NAVIGATION?.EVENT?.EventVoucherQrCode,
            query: {
              eventId,
            },
          },
          NAVIGATION?.EVENT?.EventVoucherQrCode,
        );
      } else if (type === 'receiver') {
        setTimeout(() => {
          router.push(
            {
              pathname: NAVIGATION.PROFILE.Profile,
              query: {
                activeTabProps: 1,
                other: true,
                policyNo: '',
              },
            },
            NAVIGATION.PROFILE.Profile,
          );
        }, 2000);
      } else {
        router.push(
          {
            pathname: NAVIGATION.LIFESAVER.LifesaverSuccess,
            query: {
              policyNo: setCreateBillParam?.reffNo,
              productCode: setCreateBillParam?.productId?.replace('.', ''),
              source: 'LS',
              upgrade: false,
            },
          },
          NAVIGATION.LIFESAVER.LifesaverSuccess,
        );
      }

      getPaymentHistory({ from: '', product: '' });
    }
  }, [getPaymentStatusv2Response, getPaymentStatusv3Response]);

  useEffect(() => {
    if (
      getPaymentStatusResponse?.status === 'success' ||
      getPaymentStatusResponse?.status === 'waiting'
    ) {
      windowTopLocation();
      setLoading(false);
      setIsOnlyAddCard(false);
      setCreateBillClear();

      router.push(
        {
          pathname: NAVIGATION.PROFILE.Profile,
          query: {
            activeTabProps: 9,
          },
        },
        NAVIGATION.PROFILE.Profile,
      );
    }
  }, [getPaymentStatusResponse]);

  useEffect(() => {
    if (
      getPaymentStatusv2Failed?.message ||
      getPaymentStatusv3Failed?.message
    ) {
      windowTopLocation();
      if (onFailed) {
        router.replace(
          onFailed,
          onFailed?.pathname ? onFailed?.pathname : onFailed,
        );
      } else {
        router.replace(
          {
            pathname: NAVIGATION.LIFESAVER.LifesaverMain,
            query: { product, from, payment: 'fail' },
          },
          NAVIGATION.LIFESAVER.LifesaverMain,
        );
      }
      getPaymentHistory({ from: '', product: '' });
    }
  }, [getPaymentStatusv2Failed, getPaymentStatusv3Failed]);

  const modalAlreadySubs = () => {
    if (type === 'receiver') {
      return (
        <Modal
          isOpen={true}
          size="sm"
          className="z-[999] relative flex flex-col justify-center items-center py-20">
          <div
            role="button"
            className="absolute left-2 top-3"
            onClick={() => {
              setShowAlreadySubs(false);
            }}>
            <img src={Close} width={32} height={32} />
          </div>
          <img src={Check} className="max-w-[120px] w-full mb-10" />
          <p className="font-bold text-center w-2/3 text-body2 md:text-body1">
            {trans(locale, lang, 'berhasil')}{' '}
            {setCreateBillParam?.productId?.replace('.', '')}{' '}
            <span className="italic">SAVER+</span>
          </p>
        </Modal>
      );
    }
  };
  return (
    <>
      {modalAlreadySubs()}
      <Loading isOpen={type !== 'receiver'} />
    </>
  );
}
