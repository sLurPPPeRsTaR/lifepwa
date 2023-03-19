import { Button, Container, Modal } from '@cp-component';
import { Close } from '@cp-config/Svgs';
import { SET_SUBMISSION_SUCCESS } from '@cp-module/lifesaver/lifesaverConstant';
import { codeLifesaver, NAVIGATION } from '@cp-util/constant';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

export default function Page({
  getProducts,
  getProductsResponse,
  lifesaverAction,
  setSubmission,
  setLoading,
}) {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState('lifesaverplus');

  const lifesaverResult = useCallback((act) => {
    if (act === SET_SUBMISSION_SUCCESS) {
      router.push({
        pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
      });
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    lifesaverResult(lifesaverAction);
  }, [lifesaverAction, lifesaverResult]);

  function onSubmitAgreement() {
    setSubmission({
      product: {
        productCode: codeLifesaver?.productCode,
        planCode: codeLifesaver[selectedPackage]?.planCode,
        type: codeLifesaver?.subsType?.start,
        price: parseInt(
          getProductsResponse?.[selectedPackage]?.biayaLangganan,
          10,
        ),
      },
      agreement: {
        tnc: 'yes',
        riplay: 'yes',
      },
    });
    setLoading(true);
  }

  function renderModalTermCondition() {
    return (
      <Modal isOpen={true}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-4">
          <div
            role="button"
            className="absolute flex items-center left-0"
            onClick={() => {
              router.push({
                pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
              });
            }}>
            <Image src={Close} width={32} height={32} />
          </div>
          <div className="text-black/80 font-semibold">
            Syarat dan Ketentuan
          </div>
        </div>
        <div className="text-body2 font-medium text-neutral-light-neutral80 mb-6">
          Saya menyatakan telah setuju dan memahami{' '}
          <span className="text-primary-light-primary90 font-semibold">
            Syarat & Ketentuan IFG Life
          </span>{' '}
          serta{' '}
          <span className="text-primary-light-primary90 font-semibold">
            Ringkasan Informasi Produk & Layanan (RIPLAY)
          </span>{' '}
          terkait produk asuransi yang telah saya pilih,
        </div>
        <div>
          <Button
            type="linear-gradient"
            full
            onButtonClick={() => {
              onSubmitAgreement();
              // router.push({
              //   pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
              // });
            }}>
            Saya Setuju
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <Container fullScreen noBackground />
      {renderModalTermCondition()}
    </>
  );
}
