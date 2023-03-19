import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { windowTopLocation } from '@cp-util/common';

export default function View(props) {
  const {
    reffNo,
    userData,
    setLoading,
    getPaymentStatusV2,
    getPaymentStatusv2Failed,
    getPaymentStatusv2Response,
  } = props;

  const router = useRouter();
  const {
    query: { invoiceId },
  } = router;

  // -----> status === 'UNPAID'
  // ....?.data?.path == paymentredirect/?invoiceId=xxxxxx
  // -----> loading
  // -----> dapet data dari invoiceId
  // -----> 3Ds

  useEffect(() => {
    if (window !== 'undefined') {
      windowTopLocation();
    }
  }, []);

  useEffect(() => {
    if (invoiceId && reffNo) {
      getPaymentStatusV2({
        invoiceId: invoiceId,
        proposalNumber: reffNo,
      });
      setLoading(true);
    }
  }, [invoiceId, reffNo]);

  return <div>index {invoiceId}</div>;
}
