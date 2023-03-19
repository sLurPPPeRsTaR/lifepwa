import { useEffect, useState } from 'react';
import { Button, Container, HeaderEvent } from '@cp-component';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { useRouter } from 'next/router';
import { productData, userInfoData, totalHarga } from './constant';
import { codeLifesaver, NAVIGATION } from '@cp-util/constant';
import { formatCurrency } from '@cp-util/numbro';
import { WhiteLifeSaver } from '@cp-config/Svgs';
import { SET_SUBMISSION_SUCCESS, SET_SUBMISSION_FAILED } from '@cp-module/lifesaver/lifesaverConstant';
import { SET_CREATE_BILL_SUCCESS, SET_CREATE_BILL_FAILED } from '@cp-module/payments/paymentsConstant'
import { SET_EVENT_BUYTICKET_FAILED, SET_EVENT_BUYTICKET_SUCCESS } from '@cp-module/event/eventConstant';
import { setReferralValidationApi } from '@cp-module/event/eventApi';
import { getPoliciesApi } from '@cp-module/polis/polisApi';

export default function Page({
  lang,
  setLoading,
  getUserEventInvoiceIdResponse,
  getUserIdentityResponse,
  getUserIdentity,
  setCreateBill,
  setSubmissionOld,
  lsAction,
  setSubmissionResponse,
  setInternalServerError,
  paymentAction,
  getPolicies,
  getCurrentSubs,
  getPoliciesResponse,
  setSelectedPolicy,
  getCurrentSubsResponse,
  setEventBuyTicket,
  eventAction,
  accessCode,
  eventId,
  userData,
  getSubscriptions
}) {
  const router = useRouter();

  const [referralCode, setReferralCode] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherCodeError, setVoucherCodeError] = useState(false);
  const [voucherCodeRes, setVoucherCodeRes] = useState({ data: null, status: false });

  const totalprice = () => {
    if (Number(router?.query?.price) - Number(router?.query?.discount) === 0) {
      return 'FREE'
    } else {
      const result = `Rp${formatCurrency({
        value: router?.query?.price - router?.query?.discount,
        mantissa: 0,
      })},-`;

      return result
    }
  }

  useEffect(() => {
    getUserIdentity({});
    getPolicies();
    getCurrentSubs();
  }, []);

  const _handleSubmission = (referralCode = '', referralType = '') => {

    setSubmissionOld({
      product: {
        productCode: codeLifesaver?.productCode,
        planCode: codeLifesaver[router?.query?.name.toLowerCase()]?.planCode,
        type: codeLifesaver?.subsType?.start,
        eventCode: router?.query?.eventCode,
        referralCode,
        referralType,
      },
      agreement: {
        tnc: "yes",
        riplay: "yes"
      }
    })
    return
  }

  const _handleReferralCode = () => {
    if (referralCode !== '') {
      setReferralValidationApi({
        referralCode: referralCode
      }, {
        ekYCAndPhoneNumber: {
          mobilePhoneNumber: userData?.mobilePhoneNumber,
          ekycId: userData?.ekycId,
        }
      })
        .then(({ data }) => {
          // console.log('-->', data?.data?.referralCode);
          _handleSubmission(data?.data?.referralCode, data?.data?.referralType);
        })
        .catch(() => {
          _handleSubmission()

        })
    } else {
      _handleSubmission()
    }

  }

  const _handleSubmit = () => {
    setLoading(true);
    buyTiket();
  }

  const buyTiket = () => {
    if (
      getCurrentSubsResponse?.planName === 'LifeSAVER' ||
      getCurrentSubsResponse?.planName === 'LifeSAVER+'
    ) {
      setEventBuyTicket({
        eventId: eventId,
        haveLifeSaver: true,
        accessCode: accessCode
      })
    } else {
      setEventBuyTicket({
        eventId: eventId,
        haveLifeSaver: false,
        accessCode: accessCode
      })
    }
  }

  const _redirectDetailPolice = () => {

    setTimeout(() => {
      getPoliciesApi()
        .then(({ data }) => {
          let activeLsPolis = data?.data?.filter(item => ['ACTIVE', 'GRACE_PERIOD', 'GRACE PERIOD'].includes(item.status))[0]
          setSelectedPolicy(activeLsPolis)

          if (['ACTIVE', 'GRACE_PERIOD', 'GRACE PERIOD'].includes(activeLsPolis.status)) {
            setLoading(false)
            router.push({
              pathname: NAVIGATION.POLICY.PolisDetail,
              query: {
                prev: 'home'
              }
            })
            return;
          } else {
            setLoading(false)
            alert(trans(locale, lang, 'polisTidakTerbentuk'))
            return
          }
        })
        .catch((err) => console.log(err))
    }, 5000)

  }

  useEffect(() => {
    if (lsAction) {
      if (lsAction === SET_SUBMISSION_SUCCESS) {
        setCreateBill({
          data: {
            applicationId: "customerapps-mobile",
            invoiceId: setSubmissionResponse?.transactionId,
            invoiceType: "premium",
            reffNo: setSubmissionResponse?.policyNo,
          },
          isPaymentTypeFalse: true
        })
      }

      if (lsAction === SET_SUBMISSION_FAILED) {
        setInternalServerError(true)
        setLoading(false)
      }

      if (lsAction === SET_CREATE_BILL_FAILED) {
        setInternalServerError(true)
        setLoading(false)
      }
    }
  }, [lsAction])

  useEffect(() => {
    if (paymentAction) {
      if (paymentAction === SET_CREATE_BILL_SUCCESS) {

        getPoliciesApi()
          .then(() => {
            // console.log({ res });
            _redirectDetailPolice()
          })
          .catch((err) => {
            console.log(err);
          })
      }

      if (paymentAction === SET_CREATE_BILL_FAILED) {
        setInternalServerError(true)
        setLoading(false)
      }
    }
  }, [paymentAction])

  useEffect(() => {

    if (eventAction) {

      // buytiket watch
      if (eventAction === SET_EVENT_BUYTICKET_SUCCESS) {

        // console.log({ getPoliciesResponse: getPoliciesResponse?.data[0]?.status });
        const activePolis = getPoliciesResponse?.data?.filter(item => ['ACTIVE', 'GRACE_PERIOD', 'GRACE PERIOD'].includes(item.status))
        const isActive = activePolis.length > 0 ? true : false;
        if (isActive) {
          _redirectDetailPolice();
          return
        } else {
          _handleReferralCode()
          return
        }

      }
      if (eventAction === SET_EVENT_BUYTICKET_FAILED) {

        setInternalServerError(true);
      }
    }
  }, [eventAction]);

  const _hanldeVoucherCode = () => {

    if (!voucherCodeRes.status) {
      // setVoucherCode('');
      setVoucherCodeRes(prev => ({ data: null, status: true }));

      return;
    } else {
      setVoucherCode('');
      setVoucherCodeRes(prev => ({ data: null, status: false }));

      return
    }
  }

  return (
    <div className='relative w-full'>
      <HeaderEvent title={trans(locale, lang, 'konfirmasi')} customStyle={{ background: '#D71920' }} />
      <Container className='py-4' fullScreen noBackground>
        <section className={ClassNameCustome.section}>
          <div
            className='rounded-2xl bg-white shadow md:w-1/2 xs:w-full mb-5'
            style={{ marginTop: '-40px' }}
          >
            {productData(router.query, lang)?.map(
              (value) => {
                if (value.title === 'product') {
                  return (
                    <div className='flex justify-between p-4 rounded-t-2xl items-center'
                      style={{
                        background: "linear-gradient(169deg, rgba(251,176,76,1) 0%, rgba(237,28,36,1) 50%)"
                      }}
                    >
                      <div className='flex items-center w-full justify-between'>
                        <div className='w-3/6'>
                          <img src={WhiteLifeSaver} />
                        </div>
                        <p
                          className="text-caption1 text-white font-semibold"
                        >{value?.data}</p>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className='my-4 px-4'>
                      <div className='flex justify-between mb-2'>
                        <p className={ClassNameCustome.sectionItemKey}>{value.title}</p>
                        <p
                          className={ClassNameCustome.sectionItemValue}
                          style={{
                            textDecoration: getUserEventInvoiceIdResponse?.data?.policy
                              ?.orderType === 2 && value?.title === 'product'
                              ? 'line-through'
                              : 'none'
                          }}
                        >{value?.data}</p>
                      </div>
                    </div>
                  )
                }
              }
            )}
          </div>
        </section>
        <section className={`mt-4 ${ClassNameCustome.section}`}>
          <h2 className='text-sm font-semibold mb-2.5 md:w-1/2 xs:w-full '>{trans(locale, lang, 'dataDiri')}<span className={ClassNameCustome.sectionItemKey}>{' '}{trans(locale, lang, 'berdasarkanAkun')}</span></h2>
          <div className='rounded-2xl bg-white shadow p-4 md:w-1/2 xs:w-full mb-5'>
            <h2 className='text-sm font-semibold mb-4'>{getUserIdentityResponse?.name}</h2>
            <hr className='my-3' />
            {userInfoData(getUserIdentityResponse, lang)?.map(
              (value) => {
                return (
                  <div className='flex justify-between mb-2'>
                    <p className={ClassNameCustome.sectionItemKey}>{value?.title}</p>
                    <p className={ClassNameCustome.sectionItemValue}>{value?.data}</p>
                  </div>
                );
              }
            )}
          </div>
        </section>
        {/* start of section 3 # input referal code */}
        <section className={`mt-4 ${ClassNameCustome.section}`}>
          <h2 className='text-sm font-semibold mb-2.5 md:w-1/2 xs:w-full '>{trans(locale, lang, 'punyaReferral')}</h2>
          <div className='rounded-2xl md:w-1/2 xs:w-full mb-5'>
            <div class="relative">
              <input
                type="text"
                class={`w-full p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-2xl ${voucherCodeRes.status && voucherCode.length !== 0 && 'cursor-not-allowed'}`}
                placeholder={trans(locale, lang, 'masukkankodeReferral')}
                required
                onChange={(e) => setReferralCode(e.target.value)}
                value={referralCode}
                maxLength={10}
              />
            </div>
          </div>
        </section>
        {/* start of section 3 # input code */}
        <section className={`mt-4 ${ClassNameCustome.section}`}>
          <h2 className='text-sm font-semibold mb-2.5 md:w-1/2 xs:w-full '>{trans(locale, lang, 'punyaVoucher')}</h2>
          <div className='rounded-2xl md:w-1/2 xs:w-full mb-5'>
            <div class="relative">
              <input
                type="text"
                class={`w-full p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-2xl ${voucherCodeRes.status && voucherCode.length !== 0 && 'cursor-not-allowed'}`}
                placeholder={trans(locale, lang, 'masukkankodeVoucher')}
                required
                onChange={(e) => setVoucherCode(e.target.value)}
                value={voucherCode}
                disabled={voucherCodeRes.status && voucherCode.length !== 0}
              />
              {voucherCodeRes?.data?.data?.voucherCode && (
                <img src={Checklist} className='w-6 absolute'
                  style={{
                    bottom: '15px',
                    right: '93px'
                  }}
                />
              )}
              <button
                onClick={() => _hanldeVoucherCode()}
                class={`${voucherCode.length !== 0 ? 'text-[#FFFFFF]' : 'text-[#6B7580]'} absolute right-2.5 bottom-2.5 ${voucherCode.length !== 0 ? 'bg-gradient-to-r  from-[#F25D63] to-[#ED1C24]' : ' bg-[#C3C5CC]'} font-medium rounded-2xl text-sm px-4 py-2`}
              >
                {voucherCodeRes.status && voucherCode.length !== 0 ? trans(locale, lang, 'hapus') : trans(locale, lang, 'gunakan')}
              </button>
            </div>

            {voucherCodeRes.status && voucherCode.length !== 0 && (
              <p className='text-caption1 text-primary-dark-primary90 font-medium pl-2'>
                {trans(locale, lang, 'statusVoucher')}
              </p>
            )}
          </div>
        </section>
        {/* end of section 3 */}
        {/* end of section 3 */}
        <section className={`mt-4 ${ClassNameCustome.section} mb-28`}>
          <h2 className='text-sm font-semibold mb-2.5 md:w-1/2 xs:w-full '>{trans(locale, lang, 'totalHarga')}</h2>
          <div className='bg-white p-4 md:w-1/2 xs:w-full mb-5'>
            <h2 className='text-sm font-semibold mb-4'>{getUserIdentityResponse?.name}</h2>
            <hr className='my-3' />
            {totalHarga(router.query, lang)?.map(
              (value) => {
                return (
                  <div className='flex justify-between mb-2'>
                    <p className={ClassNameCustome.sectionItemKey}>{value?.title}</p>
                    <p className={ClassNameCustome.sectionItemValue}>{value?.value}</p>
                  </div>
                );
              }
            )}
          </div>
        </section>
        <section className='mt-4 px-[5%] flex flex-col items-center fixed bottom-0 bg-white w-full pt-2 shadow'>
          <div className='md:w-1/2 xs:w-full mb-5'>
            <div className='flex justify-between'>
              <h2 className='text-sm font-semibold mb-4 text-mediumGray-dark-mediumGray'>
                {trans(locale, lang, 'Total')}
              </h2>
              <h2 className='text-sm font-semibold mb-4 text-[#009262]'>
                {totalprice()}
              </h2>
            </div>
            <Button disabled={false} full type="linear-gradient" className="text-sm px-7 mt-3.5" onButtonClick={_handleSubmit}>{trans(locale, lang, 'lanjut')}</Button>
          </div>
        </section>
      </Container>
    </div>
  )
}

const ClassNameCustome = {
  section: 'pb-6 border-b-8 border-slate-100 px-[5%]  flex flex-col items-center',
  sectionItemKey: 'text-caption1 text-mediumGray-light-mediumGray font-medium',
  sectionItemValue: 'text-caption1 text-neutral-dark-neutral60 font-semibold',
}
