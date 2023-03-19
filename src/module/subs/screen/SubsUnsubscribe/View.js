import { useRouter } from 'next/router';

import { Button, Container, Input, Modal } from '@cp-component';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { arrowLeft } from 'react-icons-kit/feather';
import Icon from 'react-icons-kit';
import {
  Ambulance,
  BrokenHeart,
  PhoneSubs,
  SubsBenefit1,
  SubsBenefit2,
  SubsBenefit3,
  UnsubsBanner1,
  UnsubsBanner2,
  UnsubsBannerEn1,
  UnsubsBannerEn2,
  UnsubsBg,
} from '@cp-config/Images';
import { useState } from 'react';
import { useEffect } from 'react';
import { androidClose } from 'react-icons-kit/ionicons';
import moment from 'moment';
import { NAVIGATION } from '@cp-util/constant';
import { SET_UNSUBSCRIBE_SUCCESS } from '@cp-module/subs/subsConstant';

export default function Page({
  lang,
  getSubscriptionDetailResponse,
  setUnsubscribe,
  setUnsubscribeResponse,
  getSubscriptions,
  subsAction,
}) {
  const router = useRouter();
  const {
    query: { policyNo, productName, planName },
  } = router;

  const [isUnsubscribe, setIsUnsubscribe] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [otherReason, setOtherReason] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (subsAction === SET_UNSUBSCRIBE_SUCCESS) {
      setShowConfirmModal(false);
      getSubscriptions({
        page: 1,
        limit: 100,
      });
      router.push(
        {
          pathname: NAVIGATION.PROFILE.Profile,
          query: {
            activeTabProps: 1,
            policyNo: policyNo,
          },
        },
        NAVIGATION.PROFILE.Profile,
      );
    }
  }, [subsAction]);

  function unsubs() {
    const keys = reasons;
    if (otherReason.length > 0) {
      keys.push(otherReason);
    }
    setUnsubscribe({
      policyNo: policyNo,
      reasons: keys,
    });
  }

  const renderBenefitContent = () => {
    const menuData = [
      {
        label: trans(locale, lang, 'totalMedical'),
        subLabel: (
          <text>
            Rp{planName === 'LifeSAVER' ? '200.000.000,-' : '400.000.000,-'}{' '}
            <span className="text-black opacity-50">
              /{trans(locale, lang, 'kejadian')}
            </span>
          </text>
        ),
        image: SubsBenefit3,
      },
      {
        label: trans(locale, lang, 'medis'),
        subLabel: 'Rp20.000.000,-',
        image: SubsBenefit1,
      },
      {
        label: trans(locale, lang, 'fisio'),
        subLabel: 'Rp10.000.000,-',
        image: SubsBenefit2,
      },
      {
        label: trans(locale, lang, 'transportasi'),
        subLabel: trans(locale, lang, 'evakuasi'),
        image: Ambulance,
      },
    ];

    return (
      <div className="py-2 flex justify-center flex-col">
        <div className="flex justify-center items-center mb-5">
          <text className="font-semibold md:text-[18px] xs:text-[12px]">
            {trans(locale, lang, 'denganBerhenti')}
          </text>
        </div>
        <div className="w-full grid md:grid-rows-2 xs:grid-rows-1 md:grid-flow-col gap-2 bg-white rounded-3xl shadow-xl p-2 mt-2">
          {menuData.map((val, idx) => (
            <div key={idx} className="p-2 flex flex-row">
              <img src={val.image} className="w-10 h-10" />
              <div className="flex flex-col ml-3">
                <text className="font-semibold opacity-50 md:text-[16px] xs:text-[10px]">
                  {val.label}
                </text>
                <text className="font-semibold text-red-500 md:text-[15px] xs:text-[10px]">
                  {val.subLabel}
                </text>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBannerContent = () => {
    return (
      <div className="py-2 flex justify-center flex-col mt-10 xs:mt-5">
        <div className="w-full">
          <text className="text-left font-semibold md:text-[18px] xs:text-[12px]">
            {trans(locale, lang, 'taukah')}
          </text>
        </div>
        <div className="w-full grid md:grid-cols-2 xs:grid-cols-1 gap-4 p-2 mt-2">
          {lang === 'id' ? (
            <>
              <img src={UnsubsBanner1} />
              <img src={UnsubsBanner2} />
            </>
          ) : (
            <>
              <img src={UnsubsBannerEn1} />
              <img src={UnsubsBannerEn2} />
            </>
          )}
        </div>
      </div>
    );
  };

  const renderButton = () => {
    return (
      <div className="py-2 flex justify-center items-center flex-col md:mt-16 xs:mt-5">
        <text
          className={
            isUnsubscribe && reasons.length > 0
              ? 'font-semibold opacity-70 underline text-red-500'
              : 'font-semibold opacity-70 underline'
          }
          role="button"
          onClick={() => {
            if (isUnsubscribe) {
              if (reasons.length > 0) {
                setShowConfirmModal(true);
              }
            } else {
              setIsUnsubscribe(true);
            }
          }}>
          {trans(locale, lang, 'tetapBatalkan')}
        </text>
        <Button
          shadow
          type="linear-gradient"
          className="mt-5 md:w-[60vh] xs:w-[40vh] mb-5"
          onButtonClick={() => {
            if (isUnsubscribe) {
              setIsUnsubscribe(false);
              setReasons([]);
              setOtherReason('');
            } else {
              router.push(
                {
                  pathname: NAVIGATION.PROFILE.Profile,
                  query: {
                    activeTabProps: 1,
                    policyNo: policyNo,
                  },
                },
                NAVIGATION.PROFILE.Profile,
              );
            }
          }}>
          {trans(locale, lang, 'kembali')}
        </Button>
      </div>
    );
  };

  const renderFormUnsubscribe = () => {
    const reasonList = [
      'price',
      'lackOfValue',
      'productQuality',
      'poorExperience',
      'circumstance',
      'lainnya',
    ];
    return (
      <div className="py-2 flex justify-center items-center flex-col md:mx-20">
        <img src={PhoneSubs} className="xs:w-[20vh] md:w-[30vh] mb-10" />
        <div className="w-auto p-5 text-left">
          <text className="font-semibold md:text-[16px] xs:text-[12px]">
            {trans(locale, lang, 'sub')}
          </text>
        </div>
        <div className="md:w-[95%] xs:w-full md:py-5 md:px-10 xs:p-2 mt-5">
          <div className="flex flex-col text-left">
            <text className="font-semibold md:text-[18px] xs:text-[12px]">
              {trans(locale, lang, 'alasan')}
              <span className="text-red-500">*</span>
            </text>
            <text className="font-medium md:text-[16px] xs:text-[10px] opacity-50">
              {trans(locale, lang, 'pilihAlasan')}
            </text>
          </div>
          <div className="mt-5 flex flex-wrap">
            {reasonList.map((val, index) => (
              <text
                role="button"
                key={index}
                onClick={() => {
                  if (reasons.includes(val)) {
                    setReasons(reasons.filter((i) => i !== val));
                  } else {
                    setReasons((i) => [...i, val]);
                  }
                }}
                className={
                  reasons.includes(val)
                    ? 'md:text-[18px] xs:text-[12px] py-3 px-5 bg-white shadow-lg font-semibold opacity-70 rounded-2xl m-2 border-2 border-red-500 text-red-500'
                    : 'md:text-[18px] xs:text-[12px] py-3 px-5 bg-white shadow-lg font-semibold opacity-70 rounded-2xl m-2 border-2'
                }>
                {trans(locale, lang, val)}
              </text>
            ))}
          </div>
          {reasons.includes('lainnya') ? (
            <>
              <div className="flex flex-col text-left mt-5">
                <text className="font-semibold md:text-[18px] xs:text-[12px]">
                  {trans(locale, lang, 'lainnya')}
                </text>
              </div>
              <Input
                value={otherReason}
                isTextarea={true}
                placeholder={trans(locale, lang, 'tulisAlasan')}
                className="mb-5"
                textareaClassName="md:text-sm xs:text-[12px]"
                handleOnChange={(val) => {
                  setOtherReason(val);
                }}
              />
            </>
          ) : null}
        </div>
        {renderButton()}
      </div>
    );
  };

  const modalConfirmUnsubs = () => {
    return (
      <Modal isOpen={showConfirmModal}>
        <div className="flex flex-col justify-center items-center">
          <div className="flex py-3 md:px-5 items-center justify-center">
            <text className="font-bold text-center">
              {trans(locale, lang, 'konfirmasiPembatalan')}
            </text>
          </div>

          <div className="flex flex-col text-left mb-5 items-center justify-center">
            <text className="text-sm md:mx-5 mt-5 text-center">
              {trans(locale, lang, 'subPembatalan')}
              <span className="font-bold">
                {moment(getSubscriptionDetailResponse?.policyDueDate).format(
                  'D MMM YYYY',
                )}
              </span>
              {trans(locale, lang, 'subPembatalan3')}
            </text>
          </div>

          <Button
            shadow
            outline
            className="mt-5 md:w-[60vh] xs:w-[30vh] mb-5"
            onButtonClick={() => unsubs()}>
            {trans(locale, lang, 'tetapBatalkan')}
          </Button>

          <Button
            shadow
            type="linear-gradient"
            className="md:w-[60vh] xs:w-[30vh] mb-5"
            onButtonClick={() => {
              setIsUnsubscribe(false);
              setShowConfirmModal(false);
              setReasons([]);
              setOtherReason('');
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="w-full h-full bg-gray-50">
      {modalConfirmUnsubs()}
      <div className="w-full py-4 border-b-1 bg-white  grid place-items-center">
        <Icon
          className="absolute left-5"
          size={24}
          icon={arrowLeft}
          onClick={() => {
            if (isUnsubscribe) {
              setIsUnsubscribe(false);
              setReasons([]);
              setOtherReason('');
            } else {
              router.push(
                {
                  pathname: NAVIGATION.PROFILE.Profile,
                  query: {
                    activeTabProps: 1,
                    policyNo: policyNo,
                  },
                },
                NAVIGATION.PROFILE.Profile,
              );
            }
          }}
        />
        <text className="font-bold">{trans(locale, lang, 'berhenti')}</text>
      </div>

      <div
        className="w-full h-screen py-7 bg-gray-50 bg-cover justify-center flex"
        style={{ backgroundImage: `url(${UnsubsBg})` }}>
        <div className="md:w-[60%] xs:w-[90%] p-2 flex flex-col">
          {isUnsubscribe ? (
            renderFormUnsubscribe()
          ) : (
            <>
              {renderBenefitContent()}
              {renderBannerContent()}
              {renderButton()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
