import { useEffect, useCallback, useState } from 'react';
import { Button, CardWarning, Container, HeaderEvent } from '@cp-component';
import {
  LifeSaverPlus,
  LifeSaver,
  Checklist,
  LifesaverPOS,
} from '@cp-config/Images';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { getIsUserEligibleApi } from '@cp-module/home/homeApi';
import { useRouter } from 'next/router';
import { NAVIGATION } from '@cp-util/constant';
import {
  eventData,
  productData,
  infoData,
  userInfoData,
  totalSummaryData,
} from './constant';
import { formatCurrency } from '@cp-util/numbro';
import {
  GET_USER_EVENT_INVOICE_ID_FAILED,
  GET_USER_EVENT_INVOICE_ID_SUCCESS,
  SET_PAYMENT_EVENT_SUCCESS,
  SET_PAYMENT_EVENT_FAILED,
  SET_EVENT_BUYTICKET_SUCCESS,
  SET_EVENT_BUYTICKET_FAILED,
  SET_VALIDATE_REFERRAL_CODE_SUCCESS,
  SET_VALIDATE_REFERRAL_CODE_FAILED,
  SET_VALIDATE_VOUCHER_CODE_SUCCESS,
  SET_VALIDATE_VOUCHER_CODE_FAILED,
} from '@cp-module/event/eventConstant';
import {
  SET_CREATE_BILL_EVENT_SUCCESS,
  SET_CREATE_BILL_EVENT_FAILED,
} from '@cp-module/payments/paymentsConstant';
import {
  GET_CURRENT_SUBS_FAILED,
  GET_CURRENT_SUBS_SUCCESS,
  SET_SUBMISSION_OLD_FAILED,
  SET_SUBMISSION_OLD_SUCCESS,
} from '@cp-module/lifesaver/lifesaverConstant';
import moment from 'moment';
import { paymentEventVoucherAction } from './action';
import { setUserFotoApi } from '../../../profile/profileApi';
import { paymentEventVoucherApi } from '@cp-module/payments/paymentsApi';
import _ from 'lodash';
export default function Page({
  lang,
  userData,
  // action,
  setLoading,
  getEventDetailResponse,
  getUserEventInvoiceId,
  getUserEventInvoiceIdResponse,
  getUserIdentityResponse,
  getUserIdentity,
  setPaymentEvent,
  eventAction,
  lifesaverAction,
  paymentsAction,
  setPaymentEventResponse,
  setEventParam,
  event,
  getEventDetail,
  setInternalServerError,
  setEventBuyTicket,
  getPoliciesResponse,
  getEventDetailParam,
  getCurrentSubsResponse,
  setValidateReferralCode,
  setValidateReferralCodeResponse,
  setSubmissionOld,
  setSubmissionOldResponse,
  setSubmissionOldError,
  setCreateBillEvent,
  getCurrentSubs,
  setInvoiceId,
  setValidateVoucherCode,
  setValidateVoucherCodeClear,
  setValidateVoucherCodeResponse,
  setValidateVoucherCodeFailed,
  setCreateBillEventError,
  setEventBuyTicketClear,
  setCreateBillEventClear,
}) {
  const router = useRouter();
  // const { eventId } = router.query;
  // const eventId = getEventDetailResponse?.data?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [code, setCode] = useState('');
  const [voucherCodeError, setCodeError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [nominalVoucher, setNominalVoucher] = useState(0);
  const [isErrSubsVisible, setIsErrSubsVisible] = useState(false);
  const [errSubsMessage, setErrSubsMessage] = useState('');
  const location = typeof window !== 'undefined' && window.location;
  const eventId = location?.search?.split('d=')[1];
  const windowLocal = typeof window !== 'undefined' && window;

  useEffect(() => {
    const handleBack = () => {
      // logic untuk menangani back browser
      // misalnya mengarahkan user ke halaman sebelumnya
      // console.log(getEventDetailResponse?.data?.slugId)
      location.href = `${location.origin}/event`;
    };

    windowLocal.addEventListener('popstate', handleBack);
    return () => {
      windowLocal.removeEventListener('popstate', handleBack);
    };
  }, []);

  useEffect(() => {
    windowLocal.onpopstate = () => {
      router.reload();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    getUserIdentity({});
    if (eventId) {
      getUserEventInvoiceId({
        eventId,
      });
      getEventDetail({
        eventId,
        lang: lang,
        accessCode: '',
        userId: userData?.userId,
      });
    }
  }, []);

  const queryObj = () => {
    return {
      isFromEvent: true,
      url: setPaymentEventResponse?.data?.redirectUrl,
      invoiceId: getUserEventInvoiceIdResponse?.data?.id,
      reffNo: getUserEventInvoiceIdResponse?.data?.payment?.policyNumber,
      eventId: eventId,
      orderType: getUserEventInvoiceIdResponse?.data?.policy?.orderType,
      planCode: getUserEventInvoiceIdResponse?.data?.product?.planCode,
    };
  };

  const setProductResult = useCallback(
    (act) => {
      if (act === SET_SUBMISSION_OLD_SUCCESS) {
        if (
          getUserEventInvoiceIdResponse?.data?.event?.price > 0 ||
          getUserEventInvoiceIdResponse?.data?.policy?.gracePeriod
        ) {
          setPaymentEvent({
            userEventInvoiceId: getUserEventInvoiceIdResponse?.data?.id,
            voucherCode: voucherCode || '',
            referralCode: referralCode,
          });
        } else {
          setCreateBillEvent({
            applicationId: 'customerapps-pwa',
            invoiceId: setSubmissionOldResponse?.transactionId,
            invoiceType: 'premium',
            reffNo: setSubmissionOldResponse?.proposalNumber,
          });
        }
      }

      if (act === SET_SUBMISSION_OLD_FAILED) {
        setIsErrSubsVisible(true);
        setErrSubsMessage(setSubmissionOldError?.message);
      }
      return null;
    },
    [
      code,
      getUserEventInvoiceIdResponse?.data?.event?.price,
      getUserEventInvoiceIdResponse?.data?.id,
      getUserEventInvoiceIdResponse?.data?.policy?.gracePeriod,
      referralCode,
      setCreateBillEvent,
      setPaymentEvent,
      setSubmissionOldError?.message,
      setSubmissionOldResponse?.transactionId,
      setSubmissionOldResponse?.proposalNumber,
    ],
  );
  const eventResult = useCallback(
    (act) => {
      if (act === GET_USER_EVENT_INVOICE_ID_SUCCESS) {
        setLoading(false);
        setIsLoading(false);
      }
      if (act === GET_USER_EVENT_INVOICE_ID_FAILED) {
        setLoading(false);
        setIsLoading(false);
      }
      if (act === SET_PAYMENT_EVENT_SUCCESS) {
        setLoading(false);
        setIsLoading(false);

        setEventParam(queryObj());
        setInvoiceId({
          reffNo: getUserEventInvoiceIdResponse?.data?.payment?.policyNumber,
          invoiceId: getUserEventInvoiceIdResponse?.data?.id,
          type: 'event',
          eventId: getEventDetailResponse?.data?.id,
        });

        const encodedStringBtoA = btoa(JSON.stringify(queryObj()));
        localStorage.setItem('isFrom', encodedStringBtoA);

        router?.push(setPaymentEventResponse?.data?.redirectUrl);
      }
      if (act === SET_PAYMENT_EVENT_FAILED) {
        setLoading(false);
        setIsLoading(false);
        setInternalServerError(true);
      }

      if (act === SET_EVENT_BUYTICKET_SUCCESS) {
        if (
          getUserEventInvoiceIdResponse?.data?.policy?.orderType !== 1 ||
          !getUserEventInvoiceIdResponse?.data?.product?.hasPolicy
        ) {
          router?.push({
            query: {
              eventId: getEventDetailResponse?.data?.id,
            },
            pathname: NAVIGATION.EVENT.EventSuccess,
          });
        } else if (
          getUserEventInvoiceIdResponse?.data?.event?.price - nominalVoucher <=
            0 ||
          _.isEmpty(getCurrentSubsResponse)
        ) {
          setSubmissionOld({
            product: {
              productCode:
                getUserEventInvoiceIdResponse?.data?.product?.productCode,
              planCode: getUserEventInvoiceIdResponse?.data?.product?.planCode,
              type: 'subscription',
              price: parseInt(getEventDetailResponse?.data?.product?.price, 10),
              eventCode: getEventDetailResponse?.data?.eventCode || '',
              referralCode:
                setValidateReferralCodeResponse?.data?.referralCode || '',
              referralType:
                setValidateReferralCodeResponse?.data?.referralType || '',
            },
            agreement: {
              tnc: 'yes',
              riplay: 'yes',
            },
          });
        }
      }
      if (SET_EVENT_BUYTICKET_FAILED) {
        setIsLoading(false);
      }
      if (act === SET_VALIDATE_REFERRAL_CODE_SUCCESS) {
        _handleSubmit();
      }
      if (act === SET_VALIDATE_REFERRAL_CODE_FAILED) {
        _handleSubmit();
      }
      if (act === SET_VALIDATE_VOUCHER_CODE_SUCCESS) {
        setLoading(false);
        setIsUsed(true);
        setNominalVoucher(setValidateVoucherCodeResponse?.data?.discount);
      }
      if (act === SET_VALIDATE_VOUCHER_CODE_FAILED) {
        setLoading(false);
        if (
          setValidateVoucherCodeFailed?.message?.includes('DATA_NOT_EXISTS')
        ) {
          setIsError(true);
          // setErrMsg(trans(locale, lang, 'voucherNotFound'));
        }
      }

      setLoading(false);
    },
    [
      getCurrentSubs,
      getCurrentSubsResponse,
      getEventDetailResponse?.data?.eventCode,
      getEventDetailResponse?.data?.id,
      getEventDetailResponse?.data?.product?.price,
      getUserEventInvoiceIdResponse?.data?.event?.price,
      getUserEventInvoiceIdResponse?.data?.id,
      getUserEventInvoiceIdResponse?.data?.payment?.policyNumber,
      getUserEventInvoiceIdResponse?.data?.policy?.orderType,
      getUserEventInvoiceIdResponse?.data?.product?.hasPolicy,
      getUserEventInvoiceIdResponse?.data?.product?.planCode,
      getUserEventInvoiceIdResponse?.data?.product?.productCode,
      lang,
      nominalVoucher,
      setCreateBillEventError?.message,
      setLoading,
      setPaymentEventResponse?.data?.redirectUrl,
      setSubmissionOld,
      setValidateReferralCodeResponse?.data?.referralCode,
      setValidateReferralCodeResponse?.data?.referralType,
      setValidateVoucherCodeFailed?.message,
      setValidateVoucherCodeResponse?.data?.discount,
    ],
  );

  const setPaymentsResult = useCallback(
    (act) => {
      if (act === SET_CREATE_BILL_EVENT_SUCCESS) {
        setIsLoading(false);
        getCurrentSubs();
        router?.push({
          query: {
            eventId: getEventDetailResponse?.data?.id,
          },
          pathname: NAVIGATION.EVENT.EventSuccess,
        });
      }
      if (act === SET_CREATE_BILL_EVENT_FAILED) {
        setIsLoading(false);
        if (setCreateBillEventError?.message !== 'INTERNAL_SERVER_ERROR') {
          // Alert.alert('Warning', setCreateBillEventError?.message);
        }
        setCreateBillEventClear();
      }

      setLoading(false);
    },
    [getEventDetailResponse?.data?.id, setLoading],
  );

  useEffect(() => {
    eventResult(eventAction);
  }, [eventAction, eventResult]);

  useEffect(() => {
    setPaymentsResult(paymentsAction);
  }, [paymentsAction, setPaymentsResult]);

  useEffect(() => {
    setProductResult(lifesaverAction);
  }, [lifesaverAction, setProductResult]);
  const onValidateRefferal = () => {
    setValidateReferralCode({ referralCode });
  };
  const _handleSubmit = () => {
    if (userData?.userId === '') {
      router?.push({
        query: {
          eventId: getEventDetailResponse?.data?.slugId,
        },
        pathname: NAVIGATION.LOGIN.Login,
      });
      return;
    }
    const isPolicyActiveExist = getPoliciesResponse?.data?.filter(
      (v) => v?.statusCode === 'active',
    );

    //update
    setIsLoading(true);

    // setInvoiceId(getUserEventInvoiceIdResponse?.data?.id)
    if (
      getUserEventInvoiceIdResponse?.data?.event?.price - nominalVoucher > 0 ||
      getUserEventInvoiceIdResponse?.data?.policy?.gracePeriod
    ) {
      setPaymentEvent({
        userEventInvoiceId: getUserEventInvoiceIdResponse?.data?.id,
        voucherCode: code || '',
        referralCode: referralCode,
      });
    } else {
      setEventBuyTicket({
        // userEventInvoiceId: getUserEventInvoiceIdResponse?.data?.id,
        eventId: getEventDetailParam?.eventId,
        haveLifeSaver: isPolicyActiveExist?.length > 0,
        accessCode: getEventDetailParam?.accessCode,
        voucherCodeInternal: code || '',
        referralCode: referralCode,
      });
    }
  };
  function onValidateVoucher() {
    // setErrMsg('');
    setIsError(false);
    setIsUsed(false);
    setNominalVoucher(0);
    setValidateVoucherCodeClear();
    if (isError || isUsed) {
      setCode('');
    } else {
      setLoading(true);
      setValidateVoucherCode({
        voucherCode: code,
        eventId: getEventDetailResponse?.data?.id,
        invoiceId: getUserEventInvoiceIdResponse?.data?.id,
      });
    }
  }
  const price = getUserEventInvoiceIdResponse?.data?.total - nominalVoucher;
  const totalprice = `Rp${formatCurrency({
    value: price || 0,
    mantissa: 0,
  })},-`;
  return (
    <div>
      <HeaderEvent
        title={trans(locale, lang, 'konfirmasi')}
        customStyle={{ background: '#D71920' }}
        onClickRouter={() =>
          (location.href = `${location.origin}/event/detail/${getEventDetailResponse?.data?.slugId}`)
        }
      />
      <Container className="py-4" fullScreen noBackground>
        {/* component here */}
        {/* start of section 1 */}
        <section className={ClassNameCustome.section}>
          <div
            className="rounded-2xl bg-white shadow md:w-1/2 xs:w-full mb-5"
            style={{ marginTop: '-40px' }}>
            <div
              className="flex justify-between p-4 rounded-t-2xl items-center"
              style={{
                background:
                  'linear-gradient(169deg, rgba(251,176,76,1) 0%, rgba(237,28,36,1) 50%)',
              }}>
              <h2 className="text-xl text-main-light-white font-bold">
                {getUserEventInvoiceIdResponse?.data?.event?.name}
              </h2>
              {/* <p className='text-sm text-main-light-white font-bold'>{totalprice}</p> */}
            </div>
            <div className="p-4">
              {eventData(
                getUserEventInvoiceIdResponse?.data,
                getEventDetailResponse?.data,
                lang,
              )?.map((value) => (
                <div className="flex justify-between mb-2">
                  <p className={ClassNameCustome.sectionItemKey}>
                    {value?.title}
                  </p>
                  <p className={ClassNameCustome.sectionItemValue}>
                    {value?.data}
                  </p>
                </div>
              ))}
              {getUserEventInvoiceIdResponse?.data?.policy?.orderType !== 2 &&
              getUserEventInvoiceIdResponse?.data?.hasPolicy ? (
                <hr className="my-3" />
              ) : null}
              {productData(getUserEventInvoiceIdResponse?.data, lang)?.map(
                (value) => {
                  if (
                    (getUserEventInvoiceIdResponse?.data?.policy?.orderType ===
                      1 &&
                      getUserEventInvoiceIdResponse?.data?.product
                        ?.hasPolicy) ||
                    (getUserEventInvoiceIdResponse?.data?.policy?.orderType ===
                      3 &&
                      !_.isEmpty(getUserEventInvoiceIdResponse?.data?.product))
                  ) {
                    return (
                      <div className="flex justify-between mb-2">
                        {value?.title === 'product' ? (
                          <div className="flex items-center">
                            <img
                              src={
                                getUserEventInvoiceIdResponse?.data?.product
                                  ?.planCode === '02'
                                  ? LifeSaver
                                  : getUserEventInvoiceIdResponse?.data?.product
                                      ?.planCode === '03'
                                  ? LifeSaverPlus
                                  : LifesaverPOS
                              }
                              className="h-3.5 mr-1"
                            />
                            <span className="text-primary">
                              {trans(locale, lang, value?.primary)}
                            </span>
                          </div>
                        ) : (
                          <p className={ClassNameCustome.sectionItemKey}>
                            {value?.title}
                            <span>{trans(locale, lang, value?.primary)}</span>
                          </p>
                        )}
                        <div className="flex">
                          <p
                            className={ClassNameCustome.sectionItemValue}
                            style={{
                              textDecoration:
                                getUserEventInvoiceIdResponse?.data?.policy
                                  ?.orderType === 2 &&
                                value?.title === 'product'
                                  ? 'line-through'
                                  : 'none',
                            }}>
                            {value?.data}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                },
              )}
            </div>
          </div>
          {getUserEventInvoiceIdResponse?.data?.policy?.gracePeriod && (
            <CardWarning
              // desc={trans(locale, lang, 'agarTetapProteksi')}
              desc={`${
                trans(locale, lang, 'agarTetapProteksi') +
                moment(
                  getUserEventInvoiceIdResponse?.data?.product?.nextBillingDate,
                ).format('DD MMM YYYY')
              } pukul ${moment(
                getUserEventInvoiceIdResponse?.data?.product?.nextBillingDate,
              ).format('HH:mm')} WIB`}
            />
          )}

          {infoData(getUserEventInvoiceIdResponse?.data, lang)
            ?.filter((value) => value?.show)
            ?.map((value) => {
              return (
                <div className=" md:w-1/2 xs:w-full ">
                  <div className="flex">
                    <p className="text-primary mr-1">
                      {trans(locale, lang, value?.primary)}
                    </p>
                    <p className={ClassNameCustome.sectionItemKey}>
                      {value?.title}
                    </p>
                  </div>
                  {value?.details?.map((val) => {
                    return (
                      <ul className="list-disc ml-3">
                        <li
                          className={`ml-3 ${ClassNameCustome.sectionItemKey}`}>
                          {val?.content}
                        </li>
                      </ul>
                    );
                  })}
                </div>
              );
            })}
        </section>
        {/* end of section 1 */}

        {/* start of section 2 */}
        <section className={`mt-4 ${ClassNameCustome.section}`}>
          <h2 className="text-sm font-semibold mb-2.5 md:w-1/2 xs:w-full ">
            {trans(locale, lang, 'dataDiri')}
            <span className={ClassNameCustome.sectionItemKey}>
              {' '}
              {trans(locale, lang, 'berdasarkanAkun')}
            </span>
          </h2>
          <div className="rounded-2xl bg-white shadow p-4 md:w-1/2 xs:w-full mb-5">
            <h2 className="text-sm font-semibold mb-4">
              {getUserIdentityResponse?.name}
            </h2>
            <hr className="my-3" />
            {userInfoData(getUserIdentityResponse, lang)?.map((value) => {
              return (
                <div className="flex justify-between mb-2">
                  <p className={ClassNameCustome.sectionItemKey}>
                    {value?.title}
                  </p>
                  <p className={ClassNameCustome.sectionItemValue}>
                    {value?.data}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
        {/* end of section 2 */}
        {/* start of section 3 # input referal code */}
        <section className={`mt-4 ${ClassNameCustome.section}`}>
          <h2 className="text-sm font-semibold mb-2.5 md:w-1/2 xs:w-full ">
            {trans(locale, lang, 'punyaReferral')}
          </h2>
          <div className="rounded-2xl md:w-1/2 xs:w-full mb-5">
            <div class="relative">
              <input
                type="text"
                class={`w-full p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-2xl ${
                  isUsed && code?.length !== 0 && 'cursor-not-allowed'
                }`}
                placeholder={trans(locale, lang, 'masukkankodeReferral')}
                required
                onChange={(e) => setReferralCode(e.target.value)}
                value={referralCode}
                maxLength={10}
              />
            </div>
          </div>
        </section>
        {/* end of section 3 */}
        {/* start of section 3 # input code */}
        <section className={`mt-4 ${ClassNameCustome.section}`}>
          <h2 className="text-sm font-semibold mb-2.5 md:w-1/2 xs:w-full ">
            {trans(locale, lang, 'punyaVoucher')}
          </h2>
          <div className="rounded-2xl md:w-1/2 xs:w-full mb-5">
            <div class="relative">
              <input
                type="text"
                class={`w-full p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-2xl ${
                  isUsed && code?.length !== 0 && 'cursor-not-allowed'
                }`}
                placeholder={trans(locale, lang, 'masukkankodeVoucher')}
                required
                onChange={(e) => setCode(e.target.value)}
                value={code}
                disabled={isError || isUsed}
              />
              {isUsed && (
                <img
                  src={Checklist}
                  className="w-6 absolute"
                  style={{
                    bottom: '15px',
                    right: '93px',
                  }}
                />
              )}
              <button
                onClick={() => onValidateVoucher()}
                class={`${
                  code?.length !== 0 ? 'text-[#FFFFFF]' : 'text-[#6B7580]'
                } absolute right-2.5 bottom-2.5 ${
                  code?.length !== 0
                    ? 'bg-gradient-to-r  from-[#F25D63] to-[#ED1C24]'
                    : ' bg-[#C3C5CC]'
                } font-medium rounded-2xl text-sm px-4 py-2`}>
                {isError || isUsed
                  ? trans(locale, lang, 'hapus')
                  : trans(locale, lang, 'gunakan')}
              </button>
            </div>

            {isError && code?.length !== 0 && (
              <p className="text-caption1 text-primary-dark-primary90 font-medium pl-2">
                {trans(locale, lang, 'statusVoucher')}
              </p>
            )}
          </div>
        </section>
        {/* end of section 3 */}
        {/* start of section 4 */}
        <section
          className={`mt-4 ${ClassNameCustome.section} border-0`}
          style={{ marginBottom: 150 }}>
          <div className="md:w-1/2 xs:w-full mb-5">
            {totalSummaryData(
              getUserEventInvoiceIdResponse?.data,
              lang,
              setValidateVoucherCodeResponse?.data,
            )
              ?.filter((val) => val?.title !== '')
              ?.map((value, idx) => (
                <div className="flex justify-between mb-1">
                  {!value?.data?.includes('undefined') && (
                    <>
                      <h2
                        style={{ color: value.type && '#009262' }}
                        className={
                          idx == 0
                            ? 'text-sm font-semibold'
                            : value.key == 'info'
                            ? `${ClassNameCustome.sectionItemKey} italic`
                            : ClassNameCustome.sectionItemKey
                        }>
                        {value?.title}
                        {value?.title2 && (
                          <span className="italic">{value?.title2}</span>
                        )}
                      </h2>
                      <p
                        className={
                          value?.key || value.type
                            ? 'text-caption1 font-semibold text-[#009262]'
                            : ClassNameCustome.sectionItemValue
                        }>
                        {value?.data}
                      </p>
                    </>
                  )}
                </div>
              ))}
          </div>
        </section>
        {/* end of section 4 */}
        {/* start of section 5 */}
        <section className="mt-4 px-[5%] flex flex-col items-center fixed bottom-0 left-0 bg-white w-full pt-2 shadow">
          <div className="md:w-1/2 xs:w-full mb-5">
            <div className="flex justify-between">
              <h2 className="text-sm font-semibold mb-4 text-mediumGray-dark-mediumGray">
                {trans(locale, lang, 'Total')}
              </h2>
              <h2 className="text-sm font-semibold mb-4 text-[#009262]">
                {price > 0 ? totalprice : trans(locale, lang, 'free')}
              </h2>
            </div>
            {/* <p className={`text-right ${ClassNameCustome.sectionItemKey}`}>{trans(locale, lang, 'pembayaranSetiapBulan')}</p>
            <p className={`text-right ${ClassNameCustome.sectionItemKey}`}>{trans(locale, lang, 'kamuDapatBerhenti')}</p> */}
            <Button
              disabled={false}
              full
              type="linear-gradient"
              className="text-sm px-7 mt-3.5"
              onButtonClick={onValidateRefferal}>
              {isLoading
                ? trans(locale, lang, 'loadAvail')
                : price > 0
                ? trans(locale, lang, 'bayarSekarang')
                : trans(locale, lang, 'lanjutkan')}
            </Button>
          </div>
        </section>
        {/* end of section 5 */}
      </Container>
    </div>
  );
}

const ClassNameCustome = {
  section:
    'pb-6 border-b-8 border-slate-100 px-[5%]  flex flex-col items-center',

  sectionItemKey: 'text-caption1 text-mediumGray-light-mediumGray font-medium',
  sectionItemValue: 'text-caption1 text-neutral-dark-neutral60 font-semibold',
};
