import { Button, Container } from '@cp-component';
import { BgSuccess, LifeSaver, LifeSaverPlus } from '@cp-config/Images';
import {
  ArrowBackWhite,
  RedCalender,
  RedClock,
  VoucherLine,
} from '@cp-config/Svgs';
import { NAVIGATION } from '@cp-util/constant';
import { extrakDateEvent } from '@cp-util/func';
import { trans } from '@cp-util/trans';
import { toPng } from 'html-to-image';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { QRCodeCanvas } from 'qrcode.react';
import { useCallback, useEffect, useRef } from 'react';
import locale from './locale';

import 'moment/locale/id';

export default function Page({
  lang,
  setCustomerCare,
  getEventDetailResponse,
  getCurrentSubs,
  getPolicies,
  getEventDetail,
  getPoliciesResponse,
  getCurrentSubsResponse,
  setSelectedPolicy,
  getUserEventInvoiceIdResponse,
  getUserEventInvoiceIdClear,
  setEventBuyTicketClear,
}) {
  const router = useRouter();
  const {
    query: { eventId, product, accessCode, userEventId },
  } = router;
  const translate = (val) => trans(locale, lang, val);
  const wrapQrCodeRef = useRef(null);
  // const bannerUrl = getEventDetailResponse?.data?.banner?.filter(item => item.position === 1)[0].url;
  const bannerUrl = getEventDetailResponse?.data?.banner[2]?.url;
  const location = typeof window !== 'undefined' && window.location;
  const orderType =
    getEventDetailResponse?.ticket?.orderType == 1 ||
    getEventDetailResponse?.ticket?.orderType == 3;

  if (location) {
    localStorage.removeItem('isFrom');
  }

  // const isSameDay = moment(getEventDetailResponse?.data?.startDateTime).isSame(
  //   getEventDetailResponse?.data?.endDateTime,
  //   'day'
  // );
  // const time = extrakDateEvent(getEventDetailResponse.data?.startDateTime, getEventDetailResponse.data?.endDateTime, lang)
  // const date = isSameDay
  //   ? moment(getEventDetailResponse?.data?.startDateTime).format('DD MMM YYYY')
  //   : `${moment(getEventDetailResponse?.data?.startDateTime).format('DD')}-${moment(
  //     getEventDetailResponse?.data?.endDateTime
  //   ).format('DD MMMM YYYY')}`;
  const isSameDay = moment(getEventDetailResponse?.data?.startDateTime).isSame(
    getEventDetailResponse?.data?.endDateTime,
    'day',
  );

  const onButtonClick = useCallback(() => {
    if (wrapQrCodeRef.current === null) {
      return;
    }

    toPng(wrapQrCodeRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'event-qrcode.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {});
  }, [wrapQrCodeRef]);

  useEffect(() => {
    getEventDetail({
      eventId: eventId,
      lang: lang,
    });
    getCurrentSubs();
    getPolicies();
    moment.locale(lang);
  }, [getCurrentSubs, getPolicies, getEventDetail]);

  const renderCard = () => {
    return (
      <>
        <div className="rounded-[10px] bg-gray-50 mb-4">
          <div className="flex p-4">
            <div className="mr-2">
              <img
                src={bannerUrl}
                className="rounded-lg"
                style={{ width: '88px', height: 'auto' }}
              />
            </div>
            <div className="text-gray-600">
              <p className="font-bold text-sm">
                {getEventDetailResponse.data?.name}
              </p>
              <div className="mt-2">
                <div className="text-[9px] sm:text-xs flex items-center text-[#6B7580] mb-1">
                  <div className="mr-2">
                    <img src={RedCalender} />
                  </div>
                  <div>
                    <div className="flex">
                      <p className="mr-5 text-caption1 ">
                        {isSameDay
                          ? moment(
                              getEventDetailResponse?.data?.startDateTime,
                            ).format('DD MMMM YYYY')
                          : `${moment(
                              getEventDetailResponse?.data?.startDateTime,
                            ).format('DD')}-${moment(
                              getEventDetailResponse?.data?.endDateTime,
                            ).format('DD MMMM YYYY')}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-[9px] sm:text-xs flex items-center text-[#6B7580]">
                  <div className="mr-2">
                    <img src={RedClock} />
                  </div>
                  <div>
                    <p className="text-caption1 ">
                      {moment(
                        getEventDetailResponse?.data?.startDateTime,
                      ).format('HH:mm')}{' '}
                      -{' '}
                      {moment(getEventDetailResponse?.data?.endDateTime).format(
                        'HH:mm',
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-0 items-center">
            <div className="h-6 w-4 rounded-r-full bg-[#F32D33]" />
            <div>
              <Image src={VoucherLine} width={300} height={24} />
            </div>
            <div className="h-6 w-4 rounded-l-full bg-[#F32D33]" />
          </div>
          <div className="px-6 pb-5">
            <div className="py-2 flex justify-center" ref={wrapQrCodeRef}>
              <QRCodeCanvas
                value={
                  getEventDetailResponse?.ticket?.userEventId || userEventId
                }
                size={200}
              />
            </div>
          </div>

          {/* <div
            role="button"
            onClick={() => router.push('/')}
            className="text-center text-sm pb-5 font-bold text-red-500 underline hover:no-underline">
            {translate('btnBackToEvent')}
          </div> */}
        </div>

        {getUserEventInvoiceIdResponse?.data?.policy?.orderType === 1 &&
        getUserEventInvoiceIdResponse?.data?.product?.hasPolicy ? (
          <div className="p-4 rounded-2xl bg-white shadow">
            <p className="font-bold text-sm">
              {translate('kamuSudahTerproteksi')}
            </p>
            <div className="max-w-[106px] h-auto mx-auto my-3">
              <img src={LifeSaver} />
            </div>
            <Button
              type="linear-gradient"
              className="mx-auto"
              onButtonClick={() => {
                let activeLsPolis = getPoliciesResponse?.data.filter(
                  (item) => item.policyNo === getCurrentSubsResponse?.policyNo,
                )[0];
                setSelectedPolicy(activeLsPolis);
                router.push(NAVIGATION.POLICY.PolisDetail);
              }}>
              {translate('btnLanjut')}
            </Button>
          </div>
        ) : null}

        {/* <Alert iconColor="text-white/80" className="text-white text-xs">
          {translate('alertTitle')}
        </Alert> */}
        <div className="text-center text-sm py-5 text-white">
          <p>{translate('btnHelp1')}</p>
          {lang == 'id' ? (
            <p className="font-bold pt-1 pb-5">
              {translate('btnHelp2')}
              <span
                role="button"
                className="text-sm underline hover:no-underline"
                onClick={() => setCustomerCare(true)}>
                Customer Care
              </span>
              {translate('btnHelp3')}
            </p>
          ) : (
            <p className="font-bold pt-1 pb-5">
              {translate('btnHelp2')}
              {translate('btnHelp3')}
              <span
                role="button"
                className="text-sm underline hover:no-underline"
                onClick={() => setCustomerCare(true)}>
                Customer Care
              </span>
            </p>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="relative bg-primary-light-primary90">
        <img src={BgSuccess} className="absolute top-0 z-0 left-0 w-full" />
        <div className="absolute z-20 py-7 w-full px-[5%] flex justify-between">
          <button
            onClick={() => {
              getUserEventInvoiceIdClear();
              setEventBuyTicketClear();
              router.push(NAVIGATION.EVENT.EventMain);
            }}>
            <img src={ArrowBackWhite} />
          </button>
          <h1 className="text-base text-white font-bold">
            {translate('titleHeader')}
          </h1>
          <div />
        </div>
        <Container className="mt-4 z-10" noBackground fullScreen>
          <div className="w-full mt-14 max-w-[380px] mx-auto px-4">
            {renderCard()}
          </div>
        </Container>
      </div>
    </>
  );
}
