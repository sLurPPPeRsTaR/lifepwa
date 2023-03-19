import React from 'react';
import Image from 'next/image';
import { trans } from '@cp-util/trans';
import { addQueryStringUrl } from '@cp-util/addQueryStringUrl';
import locale from './locale';
import { useModal, useSSR } from '@cp-hooks';
import { ModalRegisterOrLogin, Button, Modal } from '@cp-component';
import { NAVIGATION } from '@cp-util/constant';
import { Close } from '@cp-config/Svgs';
import { LifesaverTnc } from '@cp-module/lifesaver/screen';
import { LifecoverRiplay } from '@cp-module/lifecover/component';
import { useRouter } from 'next/router';
import { PREV_PREMI } from '@cp-module/lifecover/screen/LifecoverSelectPackage/View';
import { GOOGLE_PEOPLE_API } from '@cp-util/constant';

export default function LifecoverModalRegisterOrLogin({
  isOpen,
  toggle,
  lang,
  userData,
  age,
  benefit,
  planCode,
  paymentType,
}) {
  const { isSSR } = useSSR();
  const isLogin = !!userData?.userId;
  const alreadyEkyc = userData?.alreadyKYC;
  const translate = (field) => trans(locale, lang, field);
  const router = useRouter();
  const modalTnc = useModal();
  const modalRiplay = useModal();
  const isOpenModalNotEkyc = !modalTnc.isOpen && !modalRiplay.isOpen;
  const callbackUrl = addQueryStringUrl(
    NAVIGATION.LIFECOVER.LifecoverSelectPackage,
    {
      ...(benefit && { benefit }),
      ...(age && { age }),
    },
  );
  const successUrl = addQueryStringUrl(
    NAVIGATION.LIFECOVER.LifecoverMedicalStatement,
    { benefit, planCode, paymentType },
  );
  const handleOpenModalTnc = () => {
    toggle();
    modalTnc.open();
  };
  const handleOpenModalRiplay = () => {
    toggle();
    modalRiplay.open();
  };

  const renderTncHeader = () => (
    <div className="relative w-full flex gap-2 items-center justify-center mb-4">
      <div
        role="button"
        className="absolute flex items-center left-0 z-50"
        onClick={toggle}>
        <Image src={Close} width={32} height={32} />
      </div>

      <div className="relative w-full">
        <p className="text-center font-bold">{translate('tnc')}</p>
      </div>
    </div>
  );

  const renderTncBody = () => (
    <p className="text-body2 leading-6 font-medium text-neutral-light-neutral80 mt-5 mb-3">
      {translate('loginEligible2')}
      <span
        onClick={handleOpenModalTnc}
        className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
        {translate('loginEligible3')}
      </span>
      {translate('loginEligible4')}
      <span
        onClick={handleOpenModalRiplay}
        className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
        {translate('loginEligible5')}
      </span>
      {translate('loginEligibleKyc1')}
    </p>
  );

  const renderModalIsEkyc = () => (
    <Modal isOpen={isOpen} toggle={toggle}>
      {renderTncHeader()}
      {renderTncBody()}
      <div>
        <Button
          type="linear-gradient"
          full
          className="text-sm"
          onButtonClick={() => {
            router.push(successUrl);
          }}>
          {translate('sayaSetuju')}
        </Button>
      </div>
    </Modal>
  );

  const renderModalNotEkyc = () => (
    <Modal isOpen={isOpenModalNotEkyc}>
      <p className="font-bold text-base text-center">{translate('tnc')}</p>
      <p className="text-body2 leading-6 font-medium text-neutral-light-neutral80 mt-6 mb-8">
        {translate('loginEligible2')}
        <span
          onClick={handleOpenModalTnc}
          className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
          {translate('loginEligible3')}
        </span>
        {translate('loginEligible4')}
        <span
          onClick={handleOpenModalRiplay}
          className="cursor-pointer underline text-primary-light-primary90 font-semibold hover:text-red-700 hover:no-underline">
          {translate('loginEligible5')}
        </span>
        {translate('loginEligibleKyc2')}
      </p>

      <div>
        <Button
          type="linear-gradient"
          full
          className="text-sm"
          onButtonClick={() => {
            router.push(
              {
                pathname: NAVIGATION.KYC.KycMain,
                query: { callbackUrl },
              },
              NAVIGATION.KYC.KycMain,
            );
          }}>
          {translate('loginEligibleKyc3')}
        </Button>
      </div>
    </Modal>
  );

  const renderModalNotLogin = () => (
    <ModalRegisterOrLogin
      isOpen={isOpen}
      toggle={toggle}
      callbackUrl={callbackUrl}
      header={renderTncHeader()}
      body={renderTncBody()}
    />
  );

  const renderModal = () => {
    if (!isLogin) return renderModalNotLogin();
    if (alreadyEkyc) return renderModalIsEkyc();
    return !isSSR && renderModalNotEkyc();
  };

  return (
    <>
      <LifesaverTnc
        showModalLsTnc={modalTnc.isOpen}
        setShowModalLsTnc={modalTnc.set}
      />
      <LifecoverRiplay
        showModalLcRiplay={modalRiplay.isOpen}
        setShowModalLcRiplay={modalRiplay.set}
      />
      {renderModal()}
    </>
  );
}
