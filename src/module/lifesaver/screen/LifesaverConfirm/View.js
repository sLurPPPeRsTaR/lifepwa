import _, { isEmpty } from 'lodash';
import clsx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, useMemo } from 'react';
import Icon from 'react-icons-kit';
import { codeLifesaver, NAVIGATION, API, BASE_URL } from '@cp-util/constant';
import { trans } from '@cp-util/trans';
import {
  Button,
  Container,
  Modal,
  ProfileImage,
  Input,
  InputSelect,
} from '@cp-component';
import {
  androidRadioButtonOn,
  androidRadioButtonOff,
} from 'react-icons-kit/ionicons';
import {
  IconProfile,
  LifesaverLogoWhite,
  LifesaverPlusLogoWhite,
  Shield,
  Toa,
  VectorBackground,
  LifesaverPOSLogoWhite,
  Location,
} from '@cp-config/Images';
import {
  CheckButtonDeactive,
  CheckLifetagActive,
  CheckLifetagDeactive,
  Close,
  LifesaverBack1,
  LifesaverBankCard,
  Present,
  RedPlus,
} from '@cp-config/Svgs';
import { formatCapitalizeEachWord } from '@cp-util/format';
import { setFormatDate, setRupiah } from '@cp-util/common';
import {
  GET_PRODUCT,
  GET_PRODUCT_FAILED,
  SET_SUBMISSION_SUCCESS,
  SET_SUBMISSION_FAILED,
} from '@cp-module/lifesaver/lifesaverConstant';

import locale from './locale';
import LifesaverTncPayment from '../LifesaverTncPayment';

export default function Page({
  eventCode,
  getPaymentHistory,
  getPaymentMethod,
  getPaymentMethodError,
  getPaymentMethodResponse,
  getPaymentStatusResponse,
  getPendingInvites,
  getPendingInvitesResponse,
  getProduct,
  getProductClear,
  getProductLifetag,
  getProductLifetagResponse,
  getProductResponse,
  lang,
  lifesaverAction,
  setCreateBill,
  setCreateBillClear,
  setCreateBillError,
  setCreateBillParam,
  setCreateBillResponse,
  setInternalServerError,
  setInvoiceId,
  setLoading,
  setSubmission,
  setSubmissionError,
  setSubmissionResponse,
  setSubmissionClear,
  setWaiting,
  setWaitingError,
  setWaitingResponse,
  token,
  userData,
  getAddressList,
  getAddressListClear,
  getAddressListResponse,
  setIsComingFromScreen,
  isComingFromScreen,
}) {
  const router = useRouter();
  const {
    query: { from, product },
  } = router;
  const companyId = '1.047';

  const [dataInput, setDataInput] = useState({});
  const [listFriends, setListFriends] = useState();
  const [userInviteSelected, setUserInviteSelected] = useState('');
  const [creditCardSelected, setCreditCardSelected] = useState('');
  const [showPaymentTnc, setShowPaymentTnc] = useState(false);
  const [isShowModalSubscribed, setIsShowModalSubscribed] = useState(false);
  const [isShowModalAge, setIsShowModalAge] = useState(false);
  const [isShowModalRemember, setIsShowModalRemember] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedLifetag, setSelectedLifetag] = useState([]);
  const [inputPostCode, setInputPostCode] = useState('');

  const translate = (val) => {
    return trans(locale, lang, val);
  };

  const translator = (val) => {
    const lifeSaverDecoration = (
      <>
        <span>Life</span>
        <span className="italic">SAVER</span>
      </>
    );

    const lifeSaverPlusDecoration = (
      <>
        <span>Life</span>
        <span className="italic">SAVER</span>
        <span>+</span>
      </>
    );

    return trans(locale, lang, val)
      ?.split(' ')
      ?.map((_text) => {
        switch (_text) {
          case 'LifeSAVER':
            return <>{lifeSaverDecoration} </>;
          case 'LifeSAVER+':
            return <>{lifeSaverPlusDecoration} </>;
          default:
            return <>{_text} </>;
        }
      });
  };

  const buttonSubmit = {
    start: {
      label: trans(locale, lang, 'startSubscribe'),
      subLabel: trans(locale, lang, 'pembayaranSetiapBulan'),
      onSubmit: ({ paymentAccountId }) => {
        const product = {};

        if(selectedLifetag?.length > 0){
          product = {
            product,
            userAddressId: isComingFromScreen?.params?.selectedId || userData?.ekycId,
            name: isComingFromScreen?.params?.name || userData.name,
            phoneNumber: isComingFromScreen?.params?.phoneNo || userData.mobilePhoneNumber,
            proposalNumber: setSubmissionResponse?.proposalNumber,
          }
          var productChildren = []
          for(let i = 0 ; i < selectedLifetag.length; i++){
            productChildren.push({
              productId: getProductLifetagResponse?.data?.product?.id,
              productColourId: selectedLifetag[i].id,
              quantity: selectedLifetag[i].total,
            })
          }
          product.product = productChildren;
        }

        setCreateBill({
          data: {
            applicationId: 'customerapps-pwa-v2',
            inviteeUserId: userInviteSelected || '',
            paymentAccountId: paymentAccountId || '',
            language: lang,
            sendNotification: true,
            premium: [
              {
                invoiceId: setSubmissionResponse?.masterInvoice,
                reffNo: setSubmissionResponse?.dataProposal?.reffNo,
              }
            ],
            product: product
          },
          isBundling: true
        })

        setInvoiceId({
          invoiceMaster: setCreateBillResponse?.invoiceId,
          planCode: codeLifesaver[product]?.planCode,
          onFailed: {
            pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
            query: {
              product,
              from,
            },
          },
        });
      },
    },
    upgrade: {
      label: trans(locale, lang, 'upgradeSubscribe'),
      subLabel: trans(locale, lang, 'pembayaranSetiapBulan'),
      onSubmit: () => {},
    },
    bajoRun: {
      label: trans(locale, lang, 'startSubscribe'),
      subLabel: trans(locale, lang, 'bulanBerikutnya'),
      promo: trans(locale, lang, 'gratis'),
      onSubmit: ({ paymentAccountId }) => {
        setCreateBill({
          data: {
            applicationId: 'customerapps-pwa-v2',
            billType: 'premium',
            eventCode: eventCode || '',
            inviteeUserId: userInviteSelected || '',
            language: lang,
            paymentAccountId: paymentAccountId || '',
            proposalStatus: 'WAITING_FOR_PAYMENT',
            // reffNo: setSubmissionResponse?.policyNo,
            reffNo: '012023007031',
            sendNotification: true,
            discount: Number(getEventDetailResponse?.data?.product?.discount),
          },
          isSinglePayment: true,
        });
        setInvoiceId({
          invoiceId: setSubmissionResponse?.transactionId,
          reffNo: setSubmissionResponse?.policyNo,
        });
      },
    },
  };

  const setProductResult = useCallback(
    (act) => {
      if (act === GET_PRODUCT) {
        setLoading(true);
      }
      if (act === SET_SUBMISSION_SUCCESS) {
        getPaymentMethod({
          accountId: userData?.userId,
          companyId: companyId,
        });
      }
      if (act === GET_PRODUCT_FAILED) {
        setConnectionFailed(true);
        getProductClear();
      }
      if (act === SET_SUBMISSION_FAILED) {
        setConnectionFailed(true);
      }
    },
    [
      getPaymentMethod,
      getProductClear,
      getProductResponse,
      product,
      setLoading,
      setSubmission,
      userData?.userId,
    ],
  );

  const renderDate = (date) => {
    if (date?.length !== 3) return;

    const idMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Ags',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];
    const enMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    if (lang === 'id') {
      return `${date[0]} ${idMonth[+date[1] - 1]} ${date[2]}`;
    }
    if (lang === 'en') {
      return `${enMonth[+date[1] - 1]}, ${date[0]} ${date[2]}`;
    }

    return;
  };

  const error = useMemo(() => {
    if (inputPostCode?.length === 5) {
      return false;
    }
    return { error: trans(locale, lang, 'postCodeWarning') };
  }, [inputPostCode?.length, lang]);

  useEffect(() => {
    getPendingInvites();
  }, []);

  // useEffect(() => {
  //   getProductLifetag(lang);
  //   getAddressList();
  // }, [lang]);

  useEffect(() => {
    getPaymentHistory({ from, product });
  }, [from, product]);

  useEffect(() => {
    if (setSubmissionError?.message) {
      switch (setSubmissionError?.message) {
        case 'PROPOSAL_POLICY_ALREADY_EXIST':
        case 'ALREADY_HAVE_ACTIVE_POLICY':
          setIsShowModalSubscribed(true);
          break;
        case 'AGE_OVER_69':
        case 'AGE_UNDER_18':
          setIsShowModalAge(true);
          break;
        default:
          break;
      }

      setLoading(false);
    }
  }, [setSubmissionError]);

  useEffect(() => {
    if (
      getPendingInvitesResponse != null &&
      getPendingInvitesResponse?.listInviting
    ) {
      setListFriends(getPendingInvitesResponse.listInviting);
      setUserInviteSelected(
        getPendingInvitesResponse?.listInviting[0]?.inviteeUserId,
      );
    }
  }, [getPendingInvitesResponse]);

  useEffect(() => {
    setProductResult(lifesaverAction);
  }, [lifesaverAction, setProductResult]);

  useEffect(() => {
    getProduct({
      productCode: codeLifesaver?.productCode,
      planCode: codeLifesaver?.[product]?.planCode,
    });
    setTimeout(() => {
      // if (!product) {
      if (true) {
        // router.push({ pathname: NAVIGATION.LIFESAVER.LifesaverMain });
      }
      // }, 2000);
    }, 1000);
  }, [product]);

  useEffect(() => {
    if (userData?.userId) {
      getPaymentMethod({
        accountId: userData?.userId,
        companyId: companyId,
        applicationId: 'customerapps-pwa-v2',
      });
    }
  }, [userData]);

  useEffect(() => {
    if (!setCreateBillResponse?.redirectUrl) return;

    setInvoiceId({
      invoiceMaster: setCreateBillResponse?.invoiceId,
      planCode: codeLifesaver[product]?.planCode,
      onFailed: {
        pathname: NAVIGATION.LIFESAVER.LifesaverConfirm,
        query: {
          product,
          from,
        },
      },
    });
    
    setCreateBillClear();

    // alert(setCreateBillResponse?.redirectUrl)
    router.push(setCreateBillResponse?.redirectUrl)

    // router.push(
    //   {
    //     pathname: setCreateBillResponse?.redirectUrl,
    //     query: {
    //       url: setCreateBillResponse?.redirectUrl,
    //       from,
    //       product,
    //     },
    //   },
    //   setCreateBillResponse?.redirectUrl,
    // );
  }, [setCreateBillResponse]);

  useEffect(() => {
    if (getPaymentMethodError?.message) {
      setInternalServerError(true);
    }
  }, [getPaymentMethodError]);

  useEffect(() => {
    if (setCreateBillError?.message) {
      alert(setCreateBillError.message);
      setCreateBillClear();
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
    if (setWaitingResponse?.status) {
      setIsShowModalRemember(true);
      setIsShowModalAge(false);
    }
  }, [setWaitingResponse]);

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
            setIsComingFromScreen({});
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
              {setRupiah(
                buttonSubmit?.[from]?.promo
                  ? 0
                  : getProductResponse?.subsPrice, lang
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

  const renderProfile = () => {
    return (
      <div className="px-4 md:px-8 border-t-[12px] py-6 border-gray-100">
        <p className="text-body2 mb-2">
          <span className="text-gray-800 font-bold">
            {translate('dataDiri')}
          </span>{' '}
          <span className="text-caption1 pl-1 text-gray-600 font-medium">
            {translate('dataDiriNote')}
          </span>
        </p>
        <div className="rounded-2xl shadow-md p-4 border">
          <p className="border-b pb-2 text-body2 text-gray-800 font-bold md:text-body1">
            {_.startCase(_.toLower(setSubmissionResponse?.name || '-'))}
          </p>
          <div className="pt-2 text-caption1 md:text-body2">
            <div className="flex justify-between py-1">
              <p className="text-gray-600">{translate('nik')}</p>
              <p className="font-bold">
                {setSubmissionResponse?.idCardNo || '-'}
              </p>
            </div>
            <div className="flex justify-between py-1">
              <p className="text-gray-600">{translate('tanggalLahir')}</p>
              <p className="font-bold">
                {setFormatDate(setSubmissionResponse?.dob, lang)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /** Memo LifetagPrice */
  const additionalAmount = useMemo(() => {
    if (selectedLifetag?.length > 0) {
      let totalLifeTagQty = 0;
      selectedLifetag?.forEach((element) => {
        totalLifeTagQty += element?.total;
      });
      const lifetagPrice =
        parseInt(getProductLifetagResponse?.data?.product?.price, 10) -
        parseInt(getProductLifetagResponse?.data?.product?.discount, 10);
      const totalLifeTagPrice = totalLifeTagQty * lifetagPrice;

      return totalLifeTagPrice + parseInt(getProductResponse?.subsPrice, 10);
    }
    return parseInt(getProductResponse?.subsPrice, 10);
  }, [
    getProductLifetagResponse?.data?.product?.discount,
    getProductLifetagResponse?.data?.product?.price,
    getProductResponse?.subsPrice,
    selectedLifetag,
  ]);

  const renderLifetag = () => {
    const _product = getProductLifetagResponse?.data?.product || [];
    if (_product?.length) return null;

    return (
      <div className="px-4 md:px-8 border-t-[12px] py-6 border-gray-100">
        <div className="mb-4">
          <p className="text-body2">
            <span className="text-gray-800 font-bold">
              {translator('lifetag_title')}
            </span>
          </p>
          <p>
            <span className="text-caption1 text-gray-600 font-medium">
              {translator('lifetag_subtitle')}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 divide-y-2">
          {_product?.colourList
            ?.sort((a, b) => a?.position - b?.position)
            ?.map((_item, _idx) => {
              const _isSelectedItem = selectedLifetag?.find(
                (_selected) => _selected?.id === _item?.id,
              );
              return (
                <div key={_idx} className="py-2">
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      role="button"
                      onClick={() => {
                        if (_isSelectedItem) {
                          setSelectedLifetag((prev) => {
                            return prev?.filter(
                              (_selected) => _selected?.id !== _item?.id,
                            );
                          });
                        } else {
                          setSelectedLifetag((prev) => {
                            return [
                              ...prev,
                              { id: _item?.id, total: 1, name: _item?.name },
                            ];
                          });
                        }
                      }}
                      className="flex-none flex items-center">
                      <Image
                        src={
                          _isSelectedItem
                            ? CheckLifetagActive
                            : CheckLifetagDeactive
                        }
                        alt="checkbox-lifetag"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="relative flex-none w-16 aspect-square bg-gray-200 rounded-md grid place-content-center">
                      <img
                        src={_item?.productImage}
                        alt="img"
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-caption1 text-[##202021] font-bold">
                        {_product?.name || '-'}
                      </p>
                      <p className="text-caption1 text-[#2E3E5C]/40 line-through decoration-text-[#2E3E5C]/40 font-medium">
                        {
                          <>{setRupiah(_product?.price || 0, lang)}</>
                        }
                      </p>
                      <p className="text-body2 text-[#2E3E5C]/40 font-semibold">
                        <>
                          {setRupiah(
                            _product?.price - _product?.discount || 0, lang
                          )}
                        </>
                      </p>
                    </div>
                  </div>
                  <div className="text-caption1 text-[#2E3E5C]/40 font-medium">
                    <div className="flex justify-between mb-1">
                      <div>{translator('lifetag_total')}</div>
                      <div className="w-20 h-6 border rounded-md grid grid-cols-3 divide-x-2 font-semibold overflow-hidden">
                        <div
                          role="button"
                          onClick={() => {
                            if (!_isSelectedItem) return;

                            if (_isSelectedItem?.total === 1) {
                              setSelectedLifetag((prev) => {
                                return prev?.filter(
                                  (_selected) => _selected?.id !== _item?.id,
                                );
                              });
                            } else {
                              setSelectedLifetag((prev) => {
                                return [
                                  ...prev?.filter(
                                    (_selected) => _selected?.id !== _item?.id,
                                  ),
                                  {
                                    id: _isSelectedItem?.id,
                                    total: _isSelectedItem?.total - 1,
                                  },
                                ];
                              });
                            }
                          }}
                          className={clsx(
                            'text-base grid place-content-center bg-gray-50',
                            _isSelectedItem &&
                              _isSelectedItem?.total &&
                              'text-primary-light-primary90',
                          )}>
                          -
                        </div>
                        <div className="grid place-content-center">
                          {_isSelectedItem?.total || 0}
                        </div>
                        <div
                          role="button"
                          onClick={() => {
                            if (!_isSelectedItem) return;

                            if (_isSelectedItem?.total < _item?.stock) {
                              setSelectedLifetag((prev) => {
                                return [
                                  ...prev?.filter(
                                    (_selected) => _selected?.id !== _item?.id,
                                  ),
                                  {
                                    id: _isSelectedItem?.id,
                                    total: _isSelectedItem?.total + 1,
                                  },
                                ];
                              });
                            }
                          }}
                          className={clsx(
                            'text-base grid place-content-center bg-gray-50',
                            _isSelectedItem &&
                              _isSelectedItem?.total &&
                              _isSelectedItem?.total < _item?.stock &&
                              'text-primary-light-primary90',
                          )}>
                          +
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>{translator('lifetag_colour')}</div>
                      <div>{_item?.name}</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  function onChangeAddress() {
    setIsComingFromScreen({
      screen: NAVIGATION.LIFESAVER.LifesaverConfirm,
      params: {
        name : isComingFromScreen?.params?.name || userData.name,
        phoneNo : isComingFromScreen?.params?.phoneNo || userData.mobilePhoneNumber,
      },
    });
    router.push({
      pathname: NAVIGATION.PROFILE.Profile,
      query: {
        activeTabProps: 3,
      },
    },
    NAVIGATION.PROFILE.Profile,);
  }

  const renderLifetagAddress = () => {
    const _address = getAddressListResponse?.data?.eKYCAddress;
    const city = _address?.city ? formatCapitalizeEachWord(_address?.city) : '';
    const district = _address?.district
      ? formatCapitalizeEachWord(_address?.district)
      : '';
    const postcode = _address?.postcode
      ? formatCapitalizeEachWord(_address?.postcode)
      : '';
    const province = _address?.province
      ? formatCapitalizeEachWord(_address?.province)
      : '';
    const rt = _address?.rt ? formatCapitalizeEachWord(_address?.rt) : '';
    const rw = _address?.rw ? formatCapitalizeEachWord(_address?.rw) : '';
    const street = _address?.street
      ? formatCapitalizeEachWord(_address?.street)
      : '';
    const subDistrict = _address?.subDistrict
      ? formatCapitalizeEachWord(_address?.subDistrict)
      : '';

    if (!isEmpty(isComingFromScreen)) {
      var textAddress = isComingFromScreen?.params?.selectedLifeTagAddress;
    }else{
      var textAddress = `${street}, ${
        rt && rw ? `RT${rt}/RW${rw}` : ''
      }, ${subDistrict}, ${district}, ${city}, ${province}, ${postcode}`
        .replace(/ ,/g, '')
        .trim()
        .replace(/^, /g, '')
        .trim()
        .replace(/,$/g, '');
    }
    return (
      <div className="px-4 md:px-8 border-t-[12px] pb-6 border-gray-100">
        <div className="flex justify-between pt-6 pb-1 ">
          <p className="text-body2 mb-2">
            <span className="text-gray-800 font-bold">
              {translate('addressTitle')}
            </span>{' '}
          </p>
          <p className="text-body2 mb-2" role='button' onClick={() => onChangeAddress()}>
            <Image src={Location} width={11} height={12}></Image>
            <span className="text-caption1 pl-1 text-gray-600 font-medium">
              {translate('otherAddress')}
            </span>
          </p>
        </div>
        <div className="rounded-2xl shadow-md p-4 border">
          <p className="border-b pb-2 text-body2 text-gray-800 font-bold md:text-body1">
            {!isEmpty(isComingFromScreen) ? isComingFromScreen?.params?.selectedTitle : translate('home')}
          </p>
          <div className="pt-2 text-caption1 md:text-body2">
          <div className="flex justify-between py-1">
              <p className="font-semibold">{!isEmpty(isComingFromScreen) ? isComingFromScreen?.params.name : userData.name}</p>
              <p className="font-semibold">{!isEmpty(isComingFromScreen) ? isComingFromScreen?.params.phoneNo : userData.mobilePhoneNumber}</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="font-semibold">{textAddress}</p>
            </div>
          </div>
          <div className="pt-4">
            {!isEmpty(isComingFromScreen) && isComingFromScreen?.params?.postCode ? null : (
             postcode === '' ? (
              <div>
                <p className="text-body2 font-semibold mb-2">
                  <span>{translate('postCode')}</span>
                  <span className="text-red-500">*</span>
                </p>
                <Input
                  className="mb-5"
                  maxLength={5}
                  message={error}
                  inputMode="numeric"
                  handleOnChange={(val) => {
                    setInputPostCode(val);
                  }}
                />
              </div>
            ) : null 
            )}
          </div>
        </div>
        <div className="pt-6 text-caption1 text-gray-600 px-4 md:px-8 md:text-body2">
          <p>{translate('information')}:</p>
          <ul className="list-disc pl-5">
            <li>
              {translate('estimation')}
              <span className="font-bold">2-4 {translate('workDay')}</span>
              {translate('dependOn')}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderInvitation = () => {
    return (
      <div className="p-4 md:p-8 border-b-8 border-gray-100">
        <p className="text-body2 mb-3 font-bold">{translate('diundang')}</p>

        <div className="flex flex-col gap-4 p-4 rounded-2xl shadow-md">
          {listFriends.map((item, idx) => {
            return (
              <label
                key={idx}
                onClick={() => setUserInviteSelected(item.inviteeUserId)}
                className={clsx(
                  'relative border border-gray-100 shadow-sm cursor-pointer flex py-2 px-3 rounded-lg w-full justify-between items-center hover:bg-red-light-red20',
                  userInviteSelected == item.inviteeUserId
                    ? 'bg-red-light-red20/10'
                    : '',
                )}>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex gap-2 items-center">
                    {item.inviteePhoto ? (
                      <ProfileImage
                        urlAPI={`${BASE_URL}${API.USER.photoThumbnail}/${item.inviteePhoto}`}
                        token={token}
                      />
                    ) : (
                      <img src={IconProfile} className="w-8" />
                    )}
                  </div>
                  <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="text-sm lg:text-base capitalize">
                      {item.inviteeName}
                    </div>
                    <div className="text-sm lg:text-base mr-8">
                      {renderDate(
                        item?.createdAt?.split('T')?.[0]?.split('-')?.reverse(),
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{item?.phoneNo}</p>
                <input
                  type="radio"
                  name="invitation"
                  className="opacity-0"
                  readOnly
                  checked={userInviteSelected == item.inviteeUserId}
                />
                <div className="absolute flex items-center gap-8 top-1/2 right-5 transform -translate-y-1/2">
                  {userInviteSelected == item.inviteeUserId ? (
                    <Icon
                      icon={androidRadioButtonOn}
                      size={24}
                      className="text-red-500"
                    />
                  ) : (
                    <Icon
                      icon={androidRadioButtonOff}
                      size={24}
                      className="text-red-300"
                    />
                  )}
                </div>
              </label>
            );
          })}
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
              buttonSubmit?.start?.onSubmit({});
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
        {/* {getPaymentMethodResponse?.cards?.length <= 0 ? (
          <div className="flex flex-col items-center justify-center pt-14">
            <Button
              outline
              className="text-sm"
              onButtonClick={() => {
                setActiveTab(2);
              }}>
              {translate('btnTambahKartu')}
            </Button>

            <p className="w-full pt-10 pb-6 text-center text-sm">
              {translate('belumAdaKartu')}
            </p>
          </div>
        ) : ( */}
      </div>
    );
  };

  const renderTotalPayment = () => {
    return (
      <div className="px-4 md:px-8 py-6">
        <div className="flex justify-between items-center font-semibold">
          <div className="text-sm text-[#262626]">Total Pembayaran</div>
          <div className="text-base text-[#009262]">
            {setRupiah(
              buttonSubmit?.[from]?.promo
                ? 0
                : getProductResponse?.subsPrice, lang
            )}
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-[#666B6F] font-medium">
          <div>
            Life<span className="italic">SAVER</span>
            {product == 'lifesaverplus' && '+'}
          </div>
          <div>
            {setRupiah(
              buttonSubmit?.[from]?.promo
                ? 0
                : getProductResponse?.subsPrice, lang
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAddCard = () => {
    return (
      <div className="pt-5 pb-10 flex flex-col gap-5">
        <Input
          label={translate('nomorKartu')}
          value={dataInput?.accountNumber}
          handleOnChange={(val) => {
            let value = generateCardNo(val, dataInput?.accountNumber || '');
            if (val?.length > 19) {
              value = dataInput?.accountNumber;
            }
            setDataInput({ ...dataInput, accountNumber: value });
          }}
          placeholder={translate('nomorKartuPlaceholder')}
        />
        <div className="flex flex-col md:flex-row gap-5">
          <Input
            label={translate('masaBerlaku')}
            value={dataInput?.expDate}
            maxLength={5}
            className="w-full"
            handleOnChange={(val) => {
              const expDateValue = formatedCardDate(
                val,
                dataInput?.expDate || '',
              );

              if (expDateValue?.error) {
                setMessageDate(expDateValue?.error);
              } else {
                setMessageDate(false);
              }

              if (val == '') {
                setMessageDate(false);
              }

              setDataInput({ ...dataInput, expDate: expDateValue?.value });
            }}
            placeholder={translate('masaBerlakuPlaceholder')}
            message={{ error: trans(locale, lang, messageDate) }}
          />
          <Input
            label={translate('CVV')}
            type="password"
            value={dataInput?.cvv}
            maxLength={3}
            className="w-full"
            inputMode="numeric"
            handleOnChange={(val) => {
              setDataInput({ ...dataInput, cvv: val });
            }}
            placeholder={translate('CVVPlaceholder')}
            message={{ error: messageOnlyNumber }}
          />
        </div>
        <Input
          label={translate('namaKartu')}
          value={dataInput?.accountName}
          handleOnChange={(val) =>
            setDataInput({ ...dataInput, accountName: val })
          }
          placeholder={translate('namaKartuPlaceholder')}
        />
      </div>
    );
  };

  const renderPayment = () => {
    const tabMenu = [{ title: 'kartuSaya' }, { title: 'tambahKartu' }];

    return (
      <div className="pt-10 px-4 md:px-8 py-4">
        <div className="flex items-end">
          {tabMenu?.map((e, i) => (
            <div
              key={i}
              role="button"
              onClick={() => {
                setActiveTab(i + 1);
                setButtonPay(true);
                i == 1 && setCreditCardSelected(null);
              }}
              className="w-full text-center border-b-2">
              <div
                role="button"
                className={clsx(
                  'w-full mx-auto pb-2 border-b-2 text-caption1 md:w-[70%] md:pb-3 md:text-body2',
                  activeTab === i + 1
                    ? 'border-red-500 text-red-500  font-bold'
                    : 'text-gray-400',
                )}>
                <p className="max-w-[180px] mx-auto">
                  {trans(locale, lang, e?.title)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full py-4">
          {activeTab == 1 && renderMyCard()}
          {activeTab == 2 && renderAddCard()}

          <p className="text-sm pb-2 text-center">
            {trans(locale, lang, 'titlePaymentTnc')}
          </p>
          <p
            onClick={() => setShowPaymentTnc(true)}
            className="cursor-pointer text-red-500 text-sm pb-8 font-bold text-center underline hover:no-underline">
            {trans(locale, lang, 'btnPaymentTnc')}
          </p>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="fixed border-t shadow-lg w-full bottom-0 z-10 bg-white flex justify-center">
        <div className="w-full max-w-[1440px] py-8 px-4 md:px-[5%] flex flex-col gap-4 sm:gap-0 justify-between items-center sm:flex-row ">
          <div className="flex w-full justify-between flex-row sm:flex-col md:w-auto md:items-start">
            <p className="text-body2 font-bold">Total</p>
            <div className="flex flex-col items-end sm:items-start">
              <p className="text-[#00B76A] text-xl font-bold">
                {selectedLifetag?.length > 0 ? (
                  setRupiah(additionalAmount, lang)
                ) : (
                  setRupiah(
                    buttonSubmit?.[from]?.promo
                      ? 0
                      : getProductResponse?.subsPrice, lang
                  )
                  )}
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
                type="linear-gradient"
                className={`${classes} max-w-full ml-auto`}
                onButtonClick={() => {
                  // router.push({
                  //   pathname: NAVIGATION.LIFESAVER.LifesaverCreditCard,
                  // });
                  buttonSubmit?.[from]?.onSubmit({
                    paymentAccountId: creditCardSelected?.paymentAccount,
                  });
                }}
                // disabled={buttonPay}
              >
                {/* {buttonSubmit[ from]?.label} */}
                {creditCardSelected
                  ? lang === 'id'
                    ? 'Bayar Sekarang'
                    : 'Take a Pay Now'
                  : lang === 'id'
                  ? 'Pilih Metode Pembayaran'
                  : 'Choose Payment Method'}
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
      <Modal isOpen={true} toggle={() => {}}>
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

  function renderModalAge() {
    if (!isShowModalAge) return null;

    return (
      <Modal isOpen={true} toggle={() => {}}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-12">
          <div className="absolute -mt-24">
            <img src={Toa} className="max-w-[160px]" />
          </div>
        </div>
        <div className="font-bold text-h6 text-center mb-1">
          {translate('modal_age_title')}
        </div>
        <div className="text-center text-sm">
          {translate('modal_age_subtitle')}
        </div>
        <div className="mt-6">
          <Button
            type="linear-gradient"
            full
            onButtonClick={() => {
              setWaiting();
            }}>
            {translate('modal_age_button')}
          </Button>
        </div>
      </Modal>
    );
  }

  function renderModalAlert() {
    return (
      <Modal isOpen={alertMessage} toggle={() => {}}>
        <div className="text-lg font-bold">Warning</div>
        <div className="mb-2">{alertMessage}</div>
        <div
          onClick={() => {
            setAlertMessage('');
            router.push({
              pathname: NAVIGATION.LIFESAVER.LifesaverMain,
            });
          }}
          className="flex justify-end font-semibold text-blue-400">
          OK
        </div>
      </Modal>
    );
  }

  function renderModalRemember() {
    if (!isShowModalRemember) return null;

    return (
      <Modal isOpen={true} toggle={() => {}}>
        <div className="relative w-full flex gap-2 items-center justify-center mb-12">
          <div className="absolute -mt-24">
            <img src={Shield} className="max-w-[160px]" />
          </div>
        </div>
        <div className="font-bold text-h6 text-center mb-1">
          {translate('waitingSuccessTitle')}
        </div>
        <div className="text-center text-sm">{translate('waitingSuccess')}</div>
        <div className="mt-6">
          <Button
            type="linear-gradient"
            full
            onButtonClick={() => {
              router.push({
                pathname: NAVIGATION.HOME.Home,
              });
            }}>
            {translate('kembaliBeranda')}
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
            {renderProfile()}
            {/* {renderLifetag()}
            {renderLifetagAddress()} */}
            {listFriends?.length > 0 && renderInvitation()}
            {renderMyCard()}
          </div>
        </Container>
        {renderFooter()}
      </div>
      {renderModalSubscribed()}
      {renderModalAge()}
      {renderModalRemember()}
      {renderModalAlert}
    </>
  );
}
