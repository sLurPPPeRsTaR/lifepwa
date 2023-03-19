import { Card2 } from '@cp-config/Images';
import { setFormatDate, setRupiah } from '@cp-util/common';
import { trans } from '@cp-util/trans';
import moment from 'moment';
import React from 'react';
import Icon from 'react-icons-kit';
import { info } from 'react-icons-kit/feather';
import { chevronDown } from 'react-icons-kit/feather';
import { chevronUp } from 'react-icons-kit/feather';
import { checkmarkCircled } from 'react-icons-kit/ionicons';
import ButtonActionSubs from '../../ButtonActionSubs';
import PolicyStatus from '../../PolicyStatus';
import ProductLogo from '../../ProductLogo';

function DetailSubscribeOther({
  detailRes,
  policyNoDetail,
  lang,
  locale,
  openedBills,
  paymentMethodRes,
  onGracePeriodPress,
  onOpenBills,
  onCustCarePress,
  onRenewalPress,
  onResubsPress,
  onLapsePress,
  onComingSoonPress,
  onChangePayment,
  detailPayerData
}) {

  const RenderProtectionDetail = () => {
    return (
      <div className="py-5">
        <h7 className="font-bold">
          {trans(locale, lang, 'detailKerabatSaya')}
        </h7>
        <div className='mt-3'>
          <div className="flex flex-col border rounded-2xl shadow-sm w-full py-2 px-4 mb-4">
          <div className='pl-3 mt-2 font-bold text-lg'>{detailRes?.receiverName || detailPayerData?.receiverName || '-'}</div>
            <div className="flex p-3 justify-between">
              <div className="flex flex-col gap-4 text-slate-500 ">
                <div>{trans(locale, lang, 'noPolis')}</div>
                <div>{trans(locale, lang, 'noHp')}</div>
                <div>{trans(locale, lang, 'statusHub')}</div>
                <div>{trans(locale, lang, 'durasiProteksi')}</div>
                <div>{trans(locale, lang, 'jatuhTempo')}</div>
              </div>
              <div className="flex flex-col gap-4 text-end">
                <div>{detailRes?.policyNo || '-'}</div>
                <div>{detailRes?.phoneNumber || detailPayerData?.phoneNumber || '-'}</div>
                <div>{detailRes?.relationType || detailPayerData?.relationType || '-'}</div>
                <div>
                  {detailRes?.protectionCycleInMonth || '-'}{' '}
                  {detailRes?.protectionCycleInMonth &&
                    trans(locale, lang, 'bulan')}
                </div>
                <div>{moment(detailRes?.policyDueDate).format('LL', lang)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RenderProtectionDuration = () => {
    return (
      <div className="pt-5">
        {detailRes?.status !== 'GRACE_PERIOD' ? (
          <div className="flex pb-1 items-center justify-between">
            <p className="text-sm text-gray-500">
              {trans(locale, lang, 'durasi')}
            </p>
            <p className="text-sm font-black text-right">
              {detailRes.protectionCycleInMonth} {trans(locale, lang, 'bulan')}
            </p>
          </div>
        ) : null}
        {detailRes?.status === 'GRACE_PERIOD' && (
          <div className="flex pb-1 items-center justify-between">
            <p className="text-sm text-gray-500">
              {trans(locale, lang, 'GRACE_PERIOD')}
              <Icon
                icon={info}
                className="ml-2"
                role="button"
                onClick={onGracePeriodPress}
              />
            </p>
            <p className="font-black text-sm text-right">
              {setFormatDate(detailRes.endGraceDate, lang, true)}
            </p>
          </div>
        )}
        <div className="flex pb-1 items-center justify-between">
          {detailRes?.status === 'LAPSE' ||
          detailRes?.status === 'GRACE_PERIOD' ? (
            <p className="text-sm text-gray-500">
              {trans(locale, lang, 'tempoLapse')}
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              {trans(locale, lang, 'tempo')}
            </p>
          )}
          <p className="font-black text-sm text-right whitespace-nowrap">
            {moment(detailRes?.policyDueDate).format('LL', lang)}
          </p>
        </div>
      </div>
    );
  };

  const RenderPaymentHistory = () => {
    return (
      <div>
        <div className="flex py-3 items-center justify-between">
          <p className="text-sm font-black text-gray-700">
            {trans(locale, lang, 'riwayatTagihan')}
          </p>
        </div>
        <div>
          {detailRes.billings != null && detailRes.billings.length > 0
            ? detailRes.billings.slice(0, 3).map((val, index) => (
                <div
                  className="flex flex-col border rounded-2xl shadow-sm w-full py-2 px-4 mb-4"
                  key={index}>
                  <div
                    className={
                      openedBills.includes(`Panel_${index}`)
                        ? 'flex items-center justify-between pb-2 border-b-2'
                        : 'flex items-center justify-between'
                    }
                    onClick={() => onOpenBills(index)}>
                    <div className="flex flex-col md:text-sm xs:text-[11px] leading-6 whitespace-nowrap">
                      {lang === 'id' ? (
                        <p>{setFormatDate(val.billDueDate, lang)}</p>
                      ) : (
                        <p>
                          {moment(setFormatDate(val.billDueDate, lang)).format(
                            'LL',
                          )}
                        </p>
                      )}
                      <p className="font-black py-1 text-gray-700">
                        {setRupiah(val.amount, lang)}
                      </p>
                      <p>
                        {trans(locale, lang, 'invoice')}
                        {val.invoiceId}
                      </p>
                    </div>
                    <div className="flex items-center absolute md:right-10 xs:right-5">
                      {val.status === 'paid' ? (
                        <>
                          <Icon
                            icon={checkmarkCircled}
                            size={18}
                            className="text-green-500"
                          />
                          <p className="font-black md:text-base xs:text-[11px] pl-2 text-green-500">
                            {trans(locale, lang, 'lunas')}
                          </p>
                        </>
                      ) : (
                        <>
                          {val.status === 'unpaid' ? (
                            <>
                              <p className="font-black md:text-base xs:text-[11px] pl-2 text-mediumGray-light-mediumGray mr-2">
                                {trans(locale, lang, 'belumLunas')}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="font-black md:text-base xs:text-[11px] pl-2 text-red-500 mr-2">
                                {trans(locale, lang, 'cancel')}
                              </p>
                            </>
                          )}
                        </>
                      )}
                      {val.paymentDetail ? (
                        <Icon
                          icon={
                            openedBills.includes(`Panel_${index}`)
                              ? chevronUp
                              : chevronDown
                          }
                          className="ml-4"
                        />
                      ) : null}
                    </div>
                  </div>
                  {openedBills.includes(`Panel_${index}`) && (
                    <div className="flex flex-col items-center justify-between">
                      {val.paymentDetail?.paymentList?.length !== 0
                        ? val.paymentDetail?.paymentList.map((item, idx) => (
                            <div className="w-full flex mt-4" key={idx}>
                              <div className="flex flex-col w-full md:text-sm xs:text-[11px] leading-6 whitespace-nowrap font-semibold">
                                <div className="flex flex-row">
                                  <div className="w-1 h-1 bg-black rounded-full m-1 mt-3"></div>
                                  <p className="md:text-base ml-1">
                                    {item?.paymentType ===
                                    'credit-or-debit-card'
                                      ? item?.accountNo?.toUpperCase()
                                      : item?.paymentType === 'ewallet'
                                      ? item?.channel
                                          ?.replace('Xendit-', '')
                                          .toUpperCase()
                                      : item?.paymentType?.toUpperCase()}
                                  </p>
                                </div>
                                <p className="ml-4 mt-1">
                                  {setFormatDate(
                                    moment(item.paymentDateTime).format(
                                      'YYYY-MM-DD',
                                    ),
                                    lang,
                                  )}{' '}
                                  {trans(locale, lang, 'pukul2')}{' '}
                                  {moment(item.paymentDateTime).format('HH:mm')}
                                </p>
                              </div>
                              <div className="flex items-center absolute md:right-12 xs:right-8">
                                {item.status === 'success' &&
                                item.refund === false ? (
                                  <>
                                    <p className="font-black md:text-sm xs:text-[11px] pl-2 text-green-500">
                                      {trans(locale, lang, 'success')}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="font-black md:text-sm xs:text-[11px] pl-2 text-red-500">
                                      {trans(locale, lang, 'failed')}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  )}
                </div>
              ))
            : null}
        </div>
        {paymentMethodRes?.cards?.length > 0 ? (
          <>
            <div className="flex py-3 items-center justify-between">
              <p className="text-sm font-black text-gray-700">
                {trans(locale, lang, 'metodePembayaran')}
              </p>
              <div
                role="button"
                className="cursor-pointer text-sm text-red-dark-red90 duration-400 p-1 px-2 rounded-md hover:bg-red-light-red20"
                onClick={onChangePayment}>
                {trans(locale, lang, 'ubah')}
              </div>
            </div>
            <div className="pb-5 text-gray-700">
              <div className="flex py-2 px-4 mb-4 items-center border rounded-2xl shadow-sm">
                <img src={Card2} className="w-8 mr-2" />
                <div className="flex flex-col text-sm xs:text-xs leading-6 font-bold">
                  <p>{paymentMethodRes?.cards[0].accountProvider}</p>
                  <p>{paymentMethodRes?.cards[0].cardNo?.replace(/X/g, '*')}</p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  };

  const RenderCustCare = () => {
    return (
      <div className="flex flex-col text-xs xs:text-[10px] font-semibold text-gray-500 p-2 bg-gray-100 rounded-xl text-center">
        <p>{trans(locale, lang, 'butuhBantuan')}</p>
        <p
          className="text-red-500 underline"
          role="button"
          onClick={onCustCarePress}>
          {trans(locale, lang, 'customerCare')}
        </p>
      </div>
    );
  };

  return (
    <div className="px-3 py-8 md:px-6 w-full">
      <PolicyStatus
        policyStatus={detailRes?.status}
        isSubscribe={detailRes?.isSubscribe}
        policyDueDate={detailRes?.policyDueDate}
        locale={locale}
        lang={lang}
      />
      <div className="mt-6 px-3 py-4 shadow-md border rounded-3xl md:p-5">
        <div className="cursor-pointer flex items-center justify-between">
          <ProductLogo
            status={detailRes?.status}
            planName={detailRes?.planName}
          />
        </div>
        <ButtonActionSubs
          tab="other"
          policyNo={policyNoDetail}
          detailRes={detailRes}
          locale={locale}
          lang={lang}
          onRenewalPress={onRenewalPress}
          onResubsPress={onResubsPress}
          onLapsePress={onLapsePress}
          onComingSoonPress={onComingSoonPress}
        />
      </div>
      <RenderProtectionDetail />
      <RenderProtectionDuration />
      <RenderPaymentHistory />
      <RenderCustCare />
    </div>
  );
}

export default DetailSubscribeOther;
