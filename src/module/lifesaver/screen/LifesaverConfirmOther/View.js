import _ from 'lodash';
import clsx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { codeLifesaver, NAVIGATION } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import { v4 as uuidv4 } from 'uuid';
import { Button, Container, Modal } from '@cp-component';

import {
  LifesaverLogoWhite,
  LifesaverPlusLogoWhite,
  Toa,
  VectorBackground,
  LifesaverPOSLogoWhite,
  ConfirmLifecover,
} from '@cp-config/Images';
import {
  Close,
  LifesaverBack1,
  LifesaverBankCard,
  Present,
  RedPlus,
} from '@cp-config/Svgs';
import { setFormatDate, setRupiah, setRupiahEn } from '@cp-util/common';

import locale from './locale';
import LifesaverTncPayment from '../LifesaverTncPayment';
import FormRecipient from './components/FormRepicient';
import { setCreateBillBulkApi } from '@cp-module/payments/paymentsApi';
import { getRelationTypeApi } from '@cp-module/lifesaver/lifesaverApi';

export default function Page({
  getPaymentHistory,
  getPaymentMethod,
  getPaymentMethodError,
  getPaymentMethodResponse,
  getPaymentStatusResponse,
  getProduct,
  getProductResponse,
  lang,
  setCreateBill,
  setCreateBillClear,
  setCreateBillError,
  setCreateBillParam,
  setCreateBillResponse,
  setInternalServerError,
  setInvoiceId,
  setSubmissionClear,
  setWaitingError,
  userData,
  getAddressList,
  buyForOthersFormState,
  setBuyForOthersState,
}) {
  const router = useRouter();
  const {
    query: { from, product },
  } = router;
  const companyId = '1.047';
  const defaultFormData = {
    nik: '',
    name: '',
    gender: '',
    birthPlace: '',
    birthDate: '',
    address: '',
    province: '',
    city: '',
    district: '',
    subDistrict: '',
    neighborhood: '',
    hamlet: '',
    maritalStatus: '',
    occupation: '',
    phoneNo: '',
    relation: '',
    isEdit: true,
  };

  const [dataInput, setDataInput] = useState({});
  const [creditCardSelected, setCreditCardSelected] = useState('');
  const [showPaymentTnc, setShowPaymentTnc] = useState(false);
  const [isShowModalSubscribed, setIsShowModalSubscribed] = useState(false);

  // Modal
  const [modalConfirmActive, setModalConfirmActive] = useState(false);

  const translate = (val) => {
    return trans(locale, lang, val);
  };

  const [listRelationType, setListRelationType] = useState([]);
  let buyForOtherFilter = buyForOthersFormState?.filter(
    (state) => state?.planCode === codeLifesaver?.[product]?.planCode,
  );

  const [reffNo, setReffNo] = useState();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const buttonSubmit = {
    start: {
      label: trans(locale, lang, 'startSubscribe'),
      subLabel: trans(locale, lang, 'pembayaranSetiapBulan'),
      onSubmit: () => {
        setLoadingSubmit(true);
        const payload = {
          product: {
            productCode: getProductResponse.productCode,
            planCode: getProductResponse.planCode,
            type: 'subscription',
            eventCode: '',
          },
          agreement: {
            tnc: 'yes',
            riplay: 'yes',
          },
          receiver: buyForOtherFilter.map((item) => ({
            identityCardNumber: item.nik,
            relationType: item.relation,
          })),
        };
        setCreateBillBulkApi(payload)
          .then((response) => {
            setLoadingSubmit(false);
            if (
              response.data.submissionData.find(
                (data) => data.status === 'failed',
              )
            ) {
              let error = response.data.submissionData.map((data) => {
                if (data.status === 'failed') {
                  return data.message;
                }
                return '';
              });
              let updateError = buyForOtherFilter.map((state, idx) => {
                return {
                  ...state,
                  errorMessage: error[idx],
                };
              });
              setBuyForOthersState(updateError);
              return;
            }

            setReffNo(response.data.submissionData[0].proposalData.reffNo);
            setCreateBill({
              data: {
                applicationId: 'customerapps-pwa-v2',
                inviteeUserId: '',
                paymentAccountId: '',
                language: lang,
                sendNotification: true,
                premium: response.data.submissionData.map((data) => {
                  return {
                    invoiceId: response.data.masterInvoice,
                    reffNo: data.proposalData.reffNo,
                  };
                }),

                product: {},
              },
              isBundling: true,
            });
          })
          .catch((err) => {
            setLoadingSubmit(false);
            console.log(err);
          });
      },
    },
  };

  useEffect(() => {
    getAddressList();
  }, []);

  useEffect(() => {
    getPaymentHistory({ from, product });
  }, [from, product]);

  useEffect(() => {
    getProduct({
      productCode: codeLifesaver?.productCode,
      planCode: codeLifesaver?.[product]?.planCode,
    });
  }, [product]);

  useEffect(() => {
    if (userData?.userId) {
      getPaymentMethod({
        accountId: userData?.userId,
        companyId: companyId,
        applicationId: 'customerapps-pwa',
      });
    }
  }, [userData]);
  const [error, setError] = useState();
  useEffect(() => {
    getRelationTypeApi()
      .then((response) => {
        setListRelationType(response.data.data);
      })
      .catch((error) => { });
    if (!setCreateBillResponse?.redirectUrl) return;
    setCreateBillClear();

    setInvoiceId({
      invoiceMaster: setCreateBillResponse.invoiceId,
      type: 'receiver',
    });

    router.push(setCreateBillResponse?.redirectUrl);
  }, [setCreateBillResponse]);

  useEffect(() => {
    if (getPaymentMethodError?.message) {
      setInternalServerError(true);
    }
  }, [getPaymentMethodError]);

  useEffect(() => {
    if (setCreateBillError?.message) {
      alert(setCreateBillError.message);
    }
  }, [setCreateBillError]);

  useEffect(() => {
    if (getPaymentStatusResponse?.status === 'success') {
      router.push(
        {
          pathname: NAVIGATION.LIFESAVER.LifesaverSuccess,
          query: {
            policyNo: setCreateBillParam?.reffNo,
            productCode: setCreateBillParam?.productId?.replace('.', ''),
            source: 'LS',
            upgrade: false,
          },
        },
        NAVIGATION.LIFESAVER.LifesaverSuccess,
      );
    }
  }, [getPaymentStatusResponse]);

  useEffect(() => {
    setDataInput((prev) => ({
      ...prev,
      isFill:
        dataInput?.accountNumber?.length === 19 &&
        dataInput?.expDate?.length === 5 &&
        dataInput?.cvv?.length === 3,
      // && !cardValidation
    }));
  }, [dataInput?.accountNumber, dataInput?.expDate, dataInput?.cvv]);

  useEffect(() => {
    setCreditCardSelected(
      getPaymentMethodResponse?.cards?.filter((e) => e?.cardOrder === 0)?.[0],
    );
  }, [getPaymentMethodResponse]);

  useEffect(() => {
    if (setWaitingError?.message) {
      if (setWaitingError.message === 'DATA_ALREADY_EXISTS') {
        setIsShowModalRemember(true);
        setIsShowModalAge(false);
      }
      if (setWaitingError.message === 'DATA_NOT_EXISTS') {
        setIsShowModalRemember(false);
      }
    }
  }, [setWaitingError]);

  // Banner Content
  const renderHeader = () => {
    return (
      <div className="relative w-full rounded-none md:rounded-t-3xl flex justify-center bg-[#D71920] pt-4 pb-12">
        <div
          role="button"
          onClick={() => {
            setSubmissionClear();
            router.push(
              {
                pathname: NAVIGATION.LIFESAVER.LifesaverMain,
                query: { product },
              },
              NAVIGATION.LIFESAVER.LifesaverMain,
            );
          }}
          className="absolute flex items-center left-4 md:left-6 z-10">
          <Image src={LifesaverBack1} width={24} height={24} />
        </div>
        <div className="text-white font-bold">{translate('title')}</div>
      </div>
    );
  };

  const renderSubmission = () => {
    return (
      <div className="relative pb-4 flex items-end">
        <div className="mb-4 px-4 md:px-8 absolute w-full -top-8">
          <div className="text-body2 flex justify justify-between p-6 bg-gradient-to-br from-[#FBB04C] via-[#F43036] to-[#ED1C24] rounded-t-3xl">
            <div className="max-w-[124px]">
              {getProductResponse?.planName === 'LifeSAVER' ? (
                <img className="w-full" src={LifesaverLogoWhite} />
              ) : null}
              {getProductResponse?.planName === 'LifeSAVER+' ? (
                <img className="w-full" src={LifesaverPlusLogoWhite} />
              ) : null}
              {getProductResponse?.planName === 'LifeSAVER POS' ? (
                <img className="w-full" src={LifesaverPOSLogoWhite} />
              ) : null}
            </div>
            <div className="text-white font-bold">
              {lang === 'id'
                ? setRupiah(
                  buttonSubmit?.[from]?.promo
                    ? 0
                    : getProductResponse?.subsPrice,
                  lang,
                )
                : setRupiahEn(
                  buttonSubmit?.[from]?.promo
                    ? 0
                    : getProductResponse?.subsPrice,
                )}
              <span className="font-medium">/{translate('bulan')}</span>
            </div>
          </div>

          <div className="text-caption1 py-2 px-4 bg-white rounded-b-3xl shadow md:text-body2">
            <div className="flex justify-between py-1">
              <p className="text-gray-600">
                {translate('durasiProteksi')}
                <span className="text-primary-light-primary90">*</span>
              </p>
              <p className="font-bold">
                {getProductResponse
                  ? getProductResponse?.protectionDurationInMonth +
                  ` ${translate('bulan')}`
                  : '-'}
              </p>
            </div>
            <div className="flex justify-between pb-1">
              <p className="text-gray-600">
                {translate('jatuhTempoBerikutnya')}
              </p>
              <p className="font-bold">
                {setFormatDate(getProductResponse?.dueDate, lang)}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-32 text-caption1 text-gray-600 px-4 md:px-8 md:text-body2">
          <p>
            <span className="text-red-500">*</span> {translate('infoTunggu')}:
          </p>
          <ul className="list-disc pl-5">
            <li>
              {translate('produkNote1')}
              <span className="font-bold">24 {translate('jam')}</span>
              {translate('produkNote2')}
            </li>
            <li>
              {translate('produkNote3')}
              <span className="font-bold">5 {translate('hari')}</span>
              {translate('produkNote4')}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderMyCard = () => {
    if (!creditCardSelected?.cardNo) {
      return null;
    }

    return (
      <div className="flex flex-col p-4 mb-4">
        <div className="text-sm font-bold flex justify-between mb-2">
          <div>{lang === 'id' ? 'Pembayaran' : 'Payment'}</div>
          <div
            role="button"
            onClick={() => {
              buttonSubmit?.start?.onSubmit();
            }}
            className="text-primary-light-primary90">
            {lang === 'id' ? 'Metode Lainnya' : 'Other Method'}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="relative cursor-pointer flex w-full justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={LifesaverBankCard} className="w-8" />
              <div>
                <div className="flex items-center gap-4 mb-1">
                  <div className="font-semibold text-sm capitalize">
                    {creditCardSelected?.paymentLabel}
                  </div>
                  <div className="px-3 py-0.5 rounded-full font-bold text-primary-light-primary90 bg-primary-light-primary20/50">
                    {lang === 'id' ? 'Utama' : 'Main'}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {creditCardSelected?.cardNo?.replaceAll('X', '*')}
                </div>
              </div>
            </div>
            <input type="radio" name="mastercard" className="opacity-0" />
          </label>
        </div>
      </div>
    );
  };

  const renderTotalPayment = () => {
    let totalPrice = getProductResponse?.subsPrice * buyForOtherFilter?.length;
    return (
      <div className="px-4 md:px-8 border-t-[12px] py-6 border-gray-100]">
        <div className="flex justify-between items-center font-semibold">
          <div className="text-sm text-[#262626]">
            {trans(locale, lang, 'totalPaymentText')}
          </div>
          <div className="text-base text-[#009262]">
            {lang === 'id'
              ? setRupiah(
                buttonSubmit?.[from]?.promo ? 0 : totalPrice,
                lang,
              )
              : setRupiahEn(buttonSubmit?.[from]?.promo ? 0 : totalPrice)}
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-[#666B6F] font-medium">
          <div>
            Life<span className="italic">SAVER</span>
            {product == 'lifesaverplus' && '+'}
          </div>
          <div>
            {lang === 'id'
              ? setRupiah(
                buttonSubmit?.[from]?.promo
                  ? 0
                  : getProductResponse?.subsPrice,
              )
              : setRupiahEn(
                buttonSubmit?.[from]?.promo
                  ? 0
                  : getProductResponse?.subsPrice,
              )}
              {buyForOtherFilter?.length ? `  x ${buyForOtherFilter?.length} ` : null }
          </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    let totalPrice = getProductResponse?.subsPrice * buyForOtherFilter?.length;
    return (
      <div className="fixed border-t shadow-lg w-full bottom-0 z-10 bg-white flex justify-center">
        <div className="w-full max-w-[1440px] py-8 px-4 md:px-[5%] flex flex-col gap-4 sm:gap-0 justify-between items-center sm:flex-row ">
          <div className="flex w-full justify-between items-center flex-row md:flex-col md:w-auto md:items-start">
            <p className="text-body2 font-bold">Total</p>
            <div className="flex flex-col items-end md:items-start">
              <p className="text-[#00B76A] text-xl font-bold">
                {lang === 'id'
                  ? setRupiah(
                    buttonSubmit?.[from]?.promo ? 0 : totalPrice,
                    lang,
                  )
                  : setRupiahEn(buttonSubmit?.[from]?.promo ? 0 : totalPrice)}
              </p>
              <p className="text-caption1 font-bold text-gray-400">
                {trans(locale, lang, 'pembayaranSetiapBulan')}
              </p>
            </div>
          </div>
          <div className="w-full md:max-w-xs">
            {['hidden sm:flex', 'sm:hidden']?.map((classes, i) => (
              <Button
                key={i}
                disabled={loadingSubmit || !buyForOtherFilter.length || error}
                type="linear-gradient"
                className={`${classes} max-w-full ml-auto`}
                onButtonClick={() => {
                  setModalConfirmActive(true);
                }}>
                {trans(locale, lang, 'bayarDanKirim')}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  function renderModalSubscribed() {
    if (!isShowModalSubscribed) return null;

    return (
      <Modal isOpen={true} toggle={() => { }}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-12">
          <div
            role="button"
            className="absolute flex items-center left-0 z-50"
            onClick={() => {
              router.push({
                pathname: NAVIGATION.LIFESAVER.LifesaverMain,
              });
            }}>
            <Image src={Close} width={32} height={32} />
          </div>
          <div className="absolute -mt-24">
            <img src={Toa} className="max-w-[160px]" />
          </div>
        </div>
        <div className="font-bold text-h6 text-center mb-1">
          {translate('modal_subscribe_title')}
        </div>
        <div className="text-center text-sm">
          {translate('modal_subscribe_subtitle')}
        </div>
        <div className="mt-6">
          <Button
            type="linear-gradient"
            full
            onButtonClick={() => {
              router.push({
                pathname: NAVIGATION.LIFESAVER.LifesaverMain,
              });
            }}>
            {translate('modal_subscribe_button')}
          </Button>
        </div>
      </Modal>
    );
  }

  function renderFormBuyForOther() {
    return (
      <div className="px-4 md:px-8 border-t-[12px] py-6 border-gray-100]">
        <div className="w-full flex justify-between items-center mb-6 gap-3">
          <div className="flex items-center gap-3">
            <Image src={Present} alt="" width={30} height={30} />
            <div className="text-body2 font-medium text-primary-light-primary90">
              {trans(locale, lang, 'beliProteksi')}
            </div>
          </div>
        </div>
        {buyForOthersFormState?.map((value, index) => (
          <>
            {value?.planCode === codeLifesaver?.[product]?.planCode && (
              <FormRecipient
                relationList={listRelationType}
                key={`lifesaver_buy_for_other_${uuidv4()}`}
                trans={trans}
                buyForOthersFormState={buyForOthersFormState}
                locale={locale}
                lang={lang}
                value={value}
                product={codeLifesaver?.[product]?.planCode}
                index={index}
                onDelete={(idx) => {
                  const deleteBuyForOther = buyForOthersFormState?.filter(
                    (value, index) => idx !== index,
                  );
                  setBuyForOthersState(deleteBuyForOther);
                }}
                onSave={(value, idx) => {
                  buyForOthersFormState[idx] = {
                    ...value,
                    planCode: codeLifesaver?.[product]?.planCode,
                  };
                  setBuyForOthersState(buyForOthersFormState);
                  setError(value.errorMessage);
                }}
              />
            )}
          </>
        ))}
        {buyForOthersFormState?.length !== 5 ?
          <button
            disabled={buyForOtherFilter.length === 5}
            className="flex gap-2"
            onClick={() => {
              setBuyForOthersState([
                ...buyForOthersFormState,
                {
                  ...defaultFormData,
                  planCode: codeLifesaver?.[product]?.planCode,
                },
              ]);
            }}>
            <div className="text-body2 text-primary-light-primary90 font-semibold">
              {trans(locale, lang, 'addReceiverText')}
            </div>
            <div className="mt-0.5">
              <Image src={RedPlus} alt="" width={16} height={16} />
            </div>
          </button>
          :
          null
        }
      </div>
    );
  }
  function renderModalConfirm() {
    if (!modalConfirmActive) return null;

    return (
      <Modal isOpen={true} toggle={() => { }}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-12">
          <div className="absolute -mt-24">
            <img src={ConfirmLifecover} className="max-w-[160px]" />
          </div>
        </div>
        <div className="font-bold text-xl text-centerL mb-3">
          {product === 'lifesaver'
            ? trans(locale, lang, 'kamuAkanMemberikan')
            : trans(locale, lang, 'kamuAkanMemberikanplus')}
        </div>
        <div className="text-center text-sm">
          {trans(locale, lang, 'pastikanSemuaData')}
        </div>
        <div className="mt-6">
          <Button
            full
            outline
            className="text-sm border-red-300 mb-4"
            onButtonClick={() => {
              setModalConfirmActive(false);
            }}>
            {trans(locale, lang, 'periksaKembali')}
          </Button>
          <Button
            type="linear-gradient"
            full
            className="text-sm"
            onButtonClick={(paymentAccountId = '') => {
              setModalConfirmActive(false);
              buttonSubmit?.start?.onSubmit({});
            }}>
            {trans(locale, lang, 'lanjut')}
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <LifesaverTncPayment
        setShowPaymentTnc={setShowPaymentTnc}
        showPaymentTnc={showPaymentTnc}
      />
      <div>
        <Container
          className="py-0 md:pt-8 pb-40 relative"
          noBackground
          fullScreen>
          <img
            src={VectorBackground}
            className="absolute bottom-0 left-0 w-full z-0 h-1/2 md:h-auto"
          />
          <div className="relative bg-white w-full max-w-4xl mx-auto shadow-md z-10">
            {renderHeader()}
            {renderSubmission()}
            {renderFormBuyForOther()}
            {renderMyCard()}
            {renderTotalPayment()}
          </div>
        </Container>
        {renderFooter()}
      </div>
      {renderModalSubscribed()}
      {renderModalConfirm()}
    </>
  );
}
