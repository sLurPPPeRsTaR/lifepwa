import _ from 'lodash';
import { useRouter } from 'next/router';
import { Icon } from 'react-icons-kit';
import { useEffect, useState, useRef, createRef } from 'react';
import { trans } from '@cp-util/trans';
import { Container, Modal, Button } from '@cp-component';
import { arrowLeft } from 'react-icons-kit/feather';
import { closeRound } from 'react-icons-kit/ionicons';
import { x, check } from 'react-icons-kit/feather';
import { NAVIGATION } from '@cp-util/constant';
import { PaymentFail } from '@cp-config/Images';

import locale from './locale';
import LifesaverRs from '../LifesaverRs';
import LifesaverTnc from '../LifesaverTnc';
import LifesaverFaq from '../LifesaverFAQ';
import LifesaverHelp from '../LifesaverHelp';
import LifesaverStart from '../LifesaverStart';
import LifesaverRiplay from '../LifesaverRiplay';
import LifesaverBenefit from '../LifesaverBenefit';
import LifesaverOneForAll from '../LifesaverOneForAll';
import LifesaverException from '../LifesaverException';
import LifesaverProtectionMedis from '../LifesaverProtectionMedis';
import LifesaverProtectionSelect from '../LifesaverProtectionSelect';
import { useMemo } from 'react';
import { store } from '@cp-config/Store';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Page(props) {
  const { lang, setSubmissionClear, setEventCode } = props;
  const scrollToRef = createRef(null);
  const router = useRouter();
  const [width, setWidth] = useState();
  const [isModalProtectionActive, setModalProtectionActive] = useState(false);
  const [isDDBenefitActive, setDDBenefitActive] = useState(false);
  const [isDDWaterSportActive, setDDWaterSportActive] = useState(false);
  const [showDetailMedicalInjury, setDetailMedicalInjury] = useState(false);
  const [showDetailSportInjury, setDetailSportInjury] = useState(false);

  const [showModalLsTnc, setShowModalLsTnc] = useState(false);
  const [showModalLsFaq, setShowModalLsFaq] = useState(false);
  const [showModalLsRiplay, setShowModalLsRiplay] = useState(false);
  const [showModalPaymentTnc, setShowModalPaymentTnc] = useState(false);
  const [showDetailListProtectMain, setShowDetailListProtectMain] = useState(
    {},
  );
  const [showModalBenefit, setShowModalBenefit] = useState({
    id: 1,
    status: false,
  });

  const {
    query: { product, payment },
  } = router;

  const translate = (val) => trans(locale, lang, val);

  useEffect(()=>{
    AOS.init()
  },[])

  useEffect(() => {
    if (
      router.asPath.match(new RegExp(`[&?]${'eventCode'}=(.*?)(&|$)`)) !== null
    ) {
      setEventCode(
        router.asPath.match(new RegExp(`[&?]${'eventCode'}=(.*?)(&|$)`))[1],
      );
    }
  }, []);

  useEffect(() => {
    if (product && payment == 'fail') {
      setShowModalPaymentTnc(true);
    }
  }, [product, payment]);

  useEffect(() => {
    if (isDDBenefitActive) {
      setDDWaterSportActive(false);
      setDetailMedicalInjury(false);
      setDetailSportInjury(false);
    }
  }, [isDDBenefitActive]);

  useEffect(() => {
    if (isDDWaterSportActive) {
      setDDBenefitActive(false);
      setDetailMedicalInjury(false);
      setDetailSportInjury(false);
    }
  }, [isDDWaterSportActive]);

  useEffect(() => {
    if (showDetailMedicalInjury) {
      setDDWaterSportActive(false);
      setDDBenefitActive(false);
      setDetailSportInjury(false);
    }
  }, [showDetailMedicalInjury]);

  useEffect(() => {
    if (showDetailSportInjury) {
      setDDWaterSportActive(false);
      setDDBenefitActive(false);
      setDetailMedicalInjury(false);
    }
  }, [showDetailSportInjury]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
    }
  }, [typeof window !== 'undefined']);

  const renderModalListProtect = (object) => {
    return (
      <Modal isOpen={object.status} size="sm">
        <div className="flex justify-between border-b pb-2">
          <Icon
            icon={x}
            size={20}
            onClick={() => setShowDetailListProtectMain({ status: false })}
          />
          <p className="font-bold">{translate(object.title)}</p>
          <div className="w-5"></div>
        </div>
        <div className="overflow-y-auto  h-full max-h-[300px] ">
          {object.list?.map((e, i) => (
            <div key={i} className="flex gap-3 py-1">
              <Icon icon={check} size={20} className="text-red-dark-red90" />
              <p className="text-body2 text-black">{translate(e)}</p>
            </div>
          ))}
        </div>
      </Modal>
    );
  };

  function renderModalProtection() {
    return (
      <Modal
        isOpen={isModalProtectionActive}
        toggle={() => {
          setModalProtectionActive(false);
        }}
        className="bg-gray-50"
        size="sm"
        noPadding>
        <div className="px-4 pb-3 w-full flex gap-2 items-center text-start text-body1 font-bold border-b bg-white">
          <div
            className="flex items-center mr-2"
            role="button"
            onClick={() => setModalProtectionActive(false)}>
            <Icon icon={closeRound} size={18} />
          </div>
          {translate('infoProteksiMedis')}
        </div>
        <div className="px-4 md:px-8 pt-3">
          <div className="text-sm text-[#202021] mb-4 bg-white p-3 rounded-xl shadow-sm">
            <p className="text-body2 font-bold pb-1">
              {translate('manfaatUtama')}
            </p>
            <ul className="list-disc pl-4 py-1">
              <li className="text-body2 font-bold">
                {translate('proteksiMedisAkibatKecelakaan')}
              </li>
            </ul>
            <p className="leading-5">
              {translate('sampaiDengan')}
              <span className="text-red-dark-red90 font-semibold">
                {translate('rp')} 200{translate('juta')}
              </span>
              {translate('atau')}{' '}
              <span className="text-red-dark-red90 font-semibold">
                {translate('rp')} 400{translate('juta')}
              </span>
              {translate('tergantung')}
              <span className="italic">cashless</span> {translate('atau')}
              <span className="italic">
                reimbursement<span className="text-red-500">*</span>
              </span>
              .
            </p>
          </div>

          <div className="text-sm text-[#202021] mb-4 bg-white p-3 rounded-xl shadow-sm">
            <p className="text-body2 font-bold pb-1">
              {translate('manfaatPilihan')}
              <span className="text-red-500">**</span>:
            </p>
            <ul className="list-disc pl-4 py-1">
              <li className="text-body2 font-bold">
                {translate('proteksiMedisCederaOlahraga')}
              </li>
            </ul>
            <p className="leading-5">
              {translate('sebesar')}
              <span className="text-red-dark-red90 font-semibold">
                {translate('rp')} 20{translate('juta')}
              </span>
              , {translate('hanyaDapatDilakukanSecara')}
              <span className="italic">cashless</span> {translate('atau')}
              <span className="italic">
                reimbursement<span className="text-red-500">*</span>
              </span>
              .
            </p>
            <ul className="list-disc pl-4 pt-3 pb-1">
              <li className="text-body2 font-bold">
                {translate('fisioterapi')}
              </li>
            </ul>
            <p className="leading-5">
              {translate('sebesar')}
              <span className="text-red-dark-red90 font-semibold">
                {translate('rp')} 10{translate('juta')}
              </span>
              , {translate('hanyaDapatDilakukanSecara')}
              <span className="italic">cashless</span>.
            </p>
          </div>

          <div className="text-caption1 caption">
            <p className="italic text-xs leading-7">
              <span className="text-primary-light-primary90">*</span>
              {translate('berlakuInnerLimitUntukMetodeReimbursement')}
            </p>
            <p className="italic text-xs">
              <span className="text-primary-light-primary90">**</span>
              {translate('selamaPeriodePromosi')}
            </p>
          </div>
        </div>
      </Modal>
    );
  }

  const renderModalPaymentFail = () => {
    return (
      <Modal isOpen={showModalPaymentTnc} size="sm">
        <div className="relative pt-20 text-center">
          <img
            src={PaymentFail}
            className="absolute bottom-16 w-40 s:w-60 -top-24 left-1/2 transform -translate-x-1/2"
          />
          <p className="font-bold text-h6 text-center">
            {trans(locale, lang, 'title')}
          </p>
          <p className="text-xs pt-5 pb-8">{trans(locale, lang, 'subtitle')}</p>
        </div>
        <Button
          type="linear-gradient"
          full
          className="text-sm"
          onButtonClick={() => {
            setShowModalPaymentTnc(false);
          }}>
          {trans(locale, lang, 'kembali')}
        </Button>
      </Modal>
    );
  };

  return (
    <div
      onClick={() => {
        setDDBenefitActive(false);
        setDDWaterSportActive(false);
        setDetailMedicalInjury(false);
        setDetailSportInjury(false);
      }}>
      <Container noBackground fullScreen className="relative overflow-x-hidden">
        <div className="relative z-50 w-full max-w-[1440px] bg-red-dark-red90 text-white flex px-[4%] justify-between text-center items-center h-16">
          <Icon
            icon={arrowLeft}
            size={24}
            onClick={() => {
              setSubmissionClear();
              router.push(NAVIGATION.HOME.HomeListProduct);
            }}
            className="cursor-pointer md:ml-5 text-white"
          />
          <p className="text-base md:text-lg font-bold">
            Life<span className="italic">SAVER</span>
          </p>
          <div className="mr-5"></div>
        </div>

        <LifesaverStart scrollToRef={scrollToRef} />
        <LifesaverOneForAll
          width={width}
          setShowDetailListProtectMain={setShowDetailListProtectMain}
        />
        <LifesaverProtectionMedis
          setModalProtectionActive={setModalProtectionActive}
        />
       
        <LifesaverRs />
        <LifesaverException />
       
        <LifesaverProtectionSelect
          width={width}
          refProp={scrollToRef}
          isDDBenefitActive={isDDBenefitActive}
          setDDBenefitActive={setDDBenefitActive}
          isDDWaterSportActive={isDDWaterSportActive}
          setDDWaterSportActive={setDDWaterSportActive}
          showModalBenefit={showModalBenefit}
          setShowModalBenefit={setShowModalBenefit}
          setShowModalLsTnc={setShowModalLsTnc}
          setShowModalLsFaq={setShowModalLsFaq}
          setShowModalLsRiplay={setShowModalLsRiplay}
          showDetailMedicalInjury={showDetailMedicalInjury}
          setDetailMedicalInjury={setDetailMedicalInjury}
          showDetailSportInjury={showDetailSportInjury}
          setDetailSportInjury={setDetailSportInjury}
          product={product}
        />
        <LifesaverHelp
          setShowModalLsTnc={setShowModalLsTnc}
          setShowModalLsFaq={setShowModalLsFaq}
          setShowModalLsRiplay={setShowModalLsRiplay}
        />
      </Container>

      <LifesaverTnc
        showModalLsTnc={showModalLsTnc}
        setShowModalLsTnc={setShowModalLsTnc}
      />
      <LifesaverFaq
        showModalLsFaq={showModalLsFaq}
        setShowModalLsFaq={setShowModalLsFaq}
      />
      <LifesaverRiplay
        showModalLsRiplay={showModalLsRiplay}
        setShowModalLsRiplay={setShowModalLsRiplay}
      />
      <LifesaverBenefit
        showModalBenefit={showModalBenefit}
        setShowModalBenefit={setShowModalBenefit}
      />
      {renderModalProtection()}
      {renderModalPaymentFail()}
      {width < 768 &&
        showDetailListProtectMain?.status &&
        renderModalListProtect(showDetailListProtectMain)}
    </div>
  );
}
