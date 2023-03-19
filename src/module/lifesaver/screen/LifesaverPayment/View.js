import { Container } from '@cp-component';
import { BtnBack } from '@cp-config/Svgs';
import {
  APPLICATION_PAYMENT_ID,
  APPLICATION_PAYMENT_ID_RENEWAL,
  APPLICATION_PAYMENT_ID_V2,
  BILL_TYPE,
  NAVIGATION,
} from '@cp-util/constant';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import locale from './locale';
import { trans } from '@cp-util/trans';

export default function Page({ lang, setCreateBill, setCreateBillResponse }) {
  const router = useRouter();
  const iframeRef = useRef(null);

  const {
    query: { url, prev, policyNo, invoiceMaster, renewalPolicy, proposalNo },
  } = router;

  useEffect(() => {
    if (invoiceMaster) {
      setCreateBill({
        isInvoiceMaster: true,
        data: {
          invoiceMaster: invoiceMaster,
          applicationId: APPLICATION_PAYMENT_ID_V2,
          billType: BILL_TYPE.premium,
          paymentAccountId: '',
          language: lang,
        },
      });
    }
    if (renewalPolicy) {
      setCreateBill({
        isRenewal: true,
        data: {
          applicationId: APPLICATION_PAYMENT_ID_RENEWAL,
          billType: BILL_TYPE.premium,
          reffNo: renewalPolicy,
          language: lang,
        },
      });
    }
    if (proposalNo) {
      setCreateBill({
        isProposal: true,
        data: {
          applicationId: APPLICATION_PAYMENT_ID,
          billType: BILL_TYPE.premium,
          reffNo: proposalNo,
          language: lang,
        },
      });
    }
  }, []);

  return (
    <Container noBackground fullScreen className="overflow-hidden">
      <div className="relative border-b py-4 font-bold flex justify-center">
        <div
          role="button"
          onClick={() => {
            if (prev && prev === 'home') {
              router.push(NAVIGATION.HOME.Home);
            } else if (prev && prev === 'notif') {
              router.replace({
                pathname: '/notification',
                query: {
                  activeTab: 'transaksi',
                },
              });
            } else if (prev && prev === 'profilePayment') {
              router.back();
            } else if (prev && prev === 'profileSubscription') {
              router.push({
                pathname: NAVIGATION.PROFILE.Profile,
                query: {
                  activeTabProps: 1,
                  policyNo: policyNo,
                  activeArrowBack: true,
                },
              });
            } else {
              router.replace(
                {
                  pathname: '/lifesaver/confirm',
                  query: {
                    isBackPayment: true,
                  },
                },
                '/lifesaver/confirm',
              );
            }
          }}
          className="absolute flex items-center left-4 md:left-6 z-10">
          <Image src={BtnBack} width={24} height={24} />
        </div>
        <div>{trans(locale, lang, 'title')}</div>
      </div>
      <div>
        <iframe
          className="w-full min-h-[800px]"
          ref={iframeRef}
          // sandbox="allow-forms"
          src={
            url ||
            setCreateBillResponse?.redirectUrl ||
            setCreateBillResponse?.paymentInfo?.url
          }
        />
      </div>
    </Container>
  );
}
