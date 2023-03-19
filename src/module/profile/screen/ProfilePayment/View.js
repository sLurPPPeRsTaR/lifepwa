import { useEffect, useState } from 'react';
import Icon from 'react-icons-kit';
import { v4 as uuidv4 } from 'uuid';

import locale from './locale';
import { CommentInfo, CreditCard, ShieldCheck, Trash } from '@cp-config/Images';
import { Alert, Button, Input, Modal } from '@cp-component';
import { trans } from '@cp-util/trans';
import { chevronDown } from 'react-icons-kit/feather';
import { androidMoreVertical } from 'react-icons-kit/ionicons';
import { informationCircled } from 'react-icons-kit/ionicons';
import { chevronUp } from 'react-icons-kit/feather';
import { formatedCardDate, generateCardNo, regexNumber } from '@cp-util/common';
import { useCallback } from 'react';
import {
  DELETE_PAYMENT_METHOD_SUCCESS,
  ORDER_PAYMENT_METHOD_SUCCESS,
  SET_CREATE_BILL_FAILED,
  SET_CREATE_BILL_SUCCESS,
} from '@cp-module/payments/paymentsConstant';
import { BILL_TYPE, NAVIGATION, PAYMENT_TYPE } from '@cp-util/constant';
import { getTimestamp } from '@cp-util/format';
import { LsFooter1, LsFooter2, LsFooter3 } from '@cp-config/Svgs';
import { androidClose } from 'react-icons-kit/ionicons';
import { chevronRight } from 'react-icons-kit/feather';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LifesaverTncPayment from '@cp-module/lifesaver/screen/LifesaverTncPayment';
import { store } from '@cp-config/Store';

// const lang = 'id';

export default function Page(props) {
  const {
    lang,
    userId,
    userData,
    getPaymentMethod,
    getPaymentMethodResponse,
    orderPaymentMethod,
    orderPaymentMethodClear,
    paymentsAction,
    deletePaymentMethod,
    deletePaymentMethodClear,
    setCreateBill,
    setCreateBillResponse,
    setCreateBillClear,
    setCreateBillError,
    setIsOnlyAddCard,
    isOnlyAddCard,
    setInvoiceId,
    setPaymentId,
    setCreateBillParam,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [floatingMenu, setFloatingMenu] = useState('');
  const [openForm, setOpenForm] = useState(false);

  const [cardNo, setCardNo] = useState('');
  const [cardMessage, setCardMessage] = useState(false);
  const [expiredDate, setExpiredDate] = useState('');
  const [messageDate, setMessageDate] = useState(false);
  const [cvv, setCvv] = useState('');
  const [messageOnlyNumber, setMessageOnlyNumber] = useState(false);
  const [cardName, setCardName] = useState('');

  const [paymentList, setPaymentList] = useState([]);
  const [tempPaymentList, setTempPaymentList] = useState([]);
  const [orderModal, setOrderModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAddCard, setIsAddCard] = useState(false);
  const [showPaymentTnc, setShowPaymentTnc] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getPaymentMethod({
      companyId: 'ifg-life',
      accountId: userId,
    });
  }, [getPaymentMethod]);

  useEffect(() => {
    setPaymentList(getPaymentMethodResponse?.cards || []);
  }, [getPaymentMethodResponse, setPaymentList]);

  useEffect(() => {
    if (paymentsAction === ORDER_PAYMENT_METHOD_SUCCESS) {
      getPaymentMethod({
        companyId: 'ifg-life',
        accountId: userId,
      });
      setOrderModal(false);
      orderPaymentMethodClear();
    }

    if (paymentsAction === DELETE_PAYMENT_METHOD_SUCCESS) {
      getPaymentMethod({
        companyId: 'ifg-life',
        accountId: userId,
      });
      setDeleteModal(false);
      deletePaymentMethodClear();
      setSelectedCard(null);
    }

    if (paymentsAction === SET_CREATE_BILL_SUCCESS && isAddCard) {
      setIsAddCard(false);
      setPaymentId(setCreateBillResponse?.paymentInfo?.paymentId);
      router.push(
        {
          pathname: NAVIGATION.LIFESAVER.LifesaverPayment,
          query: {
            url: setCreateBillResponse?.paymentInfo?.url,
            prev: 'profilePayment',
          },
        },
        NAVIGATION.LIFESAVER.LifesaverPayment,
      );
    }

    if (paymentsAction === SET_CREATE_BILL_FAILED) {
      setShowError(true);
      setCreateBillClear();
      setErrorMessage(setCreateBillError?.message);
    }
  }, [paymentsAction]);

  const validateNumber = (input) => {
    if (input.length > 0 && !regexNumber.test(input)) {
      return false;
    }
    return true;
  };

  function renderAlertContainer() {
    return (
      <Alert
        onClick={() => setShowError(false)}
        iconColor="text-red-500"
        className="bg-red-200 relative px-4 w-full">
        {errorMessage}
      </Alert>
    );
  }

  const onChangeOrder = useCallback(
    (val) => {
      const temp = val.cardOrder;
      const arr = [];
      paymentList.map((item) => {
        arr.push({
          order: item.cardOrder,
          paymentAccountId: item.paymentAccount,
        });
      });
      const swap = arr.map((item) => {
        if (item.order === 0) return { ...item, order: temp };
        if (item.order === temp) return { ...item, order: 0 };
        return item;
      });
      setTempPaymentList(swap);
      setOrderModal(true);
    },
    [paymentList],
  );

  const onAddPayment = () => {
    if (userData?.alreadyKYC) {
      setIsAddCard(true);
      const data = {
        invoiceId: uuidv4(),
        productId: '01',
        billType: BILL_TYPE.premium,
        reffNo: 0,
        amount: 0,
        billingDate: getTimestamp(new Date()),
        paymentType: PAYMENT_TYPE.creditDebitCard,
        applicationId: 'customerapps-pwa',
        eventCode: '',
        paymentInfo: {
          paymentLabel: cardName || '',
          accountNumber: cardNo.replace(/ /g, ''),
          accountName: '',
          expMonth: expiredDate.split('/')[0],
          expYear: expiredDate.split('/')[1],
          cvn: cvv,
        },
        isSubscribe: true,
        isVoid: true,
      };
      setCreateBill(data);
      setInvoiceId({
        invoiceId: data.invoiceId,
      });
    } else {
      router.push(
        {
          pathname: NAVIGATION.KYC.KycMain,
          query: { prev: 'profilePayment' },
        },
        NAVIGATION.KYC.KycMain,
      );
    }
  };

  const modalChangeOrder = () => {
    return (
      <Modal
        size="sm"
        className="relative"
        isOpen={orderModal}
        toggle={() => setOrderModal(false)}>
        <div className="text-center text-h6 text-neutral-light-neutral90 font-bold mb-4">
          {trans(locale, lang, 'aturSebagaiUtama')}
        </div>
        <div className="text-center text-sm mb-4 sm:mb-8">
          {trans(locale, lang, 'yakinGak')}
        </div>
        <Button
          className="mb-4"
          outline
          onButtonClick={() => {
            setOrderModal(false);
          }}
          shadow
          full>
          {trans(locale, lang, 'batalkan')}
        </Button>
        <Button
          className="mb-4"
          type="linear-gradient"
          onButtonClick={() => {
            orderPaymentMethod({
              accounts: tempPaymentList,
              applicationId: 'customerapps-pwa',
            });
          }}
          shadow
          full>
          {trans(locale, lang, 'konfirmasi')}
        </Button>
      </Modal>
    );
  };

  const modalDeleteCard = () => {
    return (
      <Modal
        size="sm"
        className="relative"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(false)}>
        <div className="absolute -ml-4 -mt-28 w-full flex justify-center mb-6">
          <img src={Trash} width={146} height={146} />
        </div>
        <div className="text-center text-h6 text-neutral-light-neutral90 font-bold mt-16 mb-4">
          {trans(locale, lang, 'konfirmasiHapus')}
        </div>
        <div className="text-center text-sm mb-4 sm:mb-8">
          {trans(locale, lang, 'yakinHapuskan')}
        </div>
        <Button
          className="mb-4"
          outline
          onButtonClick={() => {
            deletePaymentMethod({
              paymentAccountId: selectedCard,
              applicationId: 'customerapps-pwa',
            });
          }}
          shadow
          full>
          {trans(locale, lang, 'hapus')}
        </Button>
        <Button
          className="mb-4"
          type="linear-gradient"
          onButtonClick={() => {
            setDeleteModal(false);
          }}
          shadow
          full>
          {trans(locale, lang, 'kembali')}
        </Button>
      </Modal>
    );
  };

  const renderEmptyCard = () => {
    return (
      <div className="flex flex-col p-5">
        <text className="text-base font-black">
          {trans(locale, lang, 'paymentMethod')}
        </text>
        <text className="text-sm my-2">
          {trans(locale, lang, 'belumAdaMetode')}
        </text>
        <hr />
      </div>
    );
  };

  const renderCards = () => {
    return (
      <div className="flex flex-col p-5">
        <div className="flex flex-row justify-between">
          <text className="text-base font-black">
            {trans(locale, lang, 'paymentMethod')}
          </text>
          {paymentList?.length > 1 ? (
            <text
              role="button"
              className="text-base font-semibold text-[#ED1C24]"
              onClick={() => setEditMode(!editMode)}>
              {trans(locale, lang, editMode ? 'selesai' : 'ubah')}
            </text>
          ) : null}
        </div>
        <text className="text-sm my-2">
          {trans(locale, lang, 'metodePembayaranUtamaBerbeda')}
        </text>
        {getPaymentMethodResponse?.cards?.length > 0 ? renderListCard() : null}
        <hr />
      </div>
    );
  };

  const renderListCard = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center p-4 shadow-md border rounded-2xl mt-2">
          {paymentList?.map((val, idx) => (
            <div className="flex flex-row w-full my-2" key={idx}>
              <div className="basis-2/12 w-full h-full grid place-items-center">
                <img src={CreditCard} className="pl-2 w-16" />
              </div>
              <div className="basis-8/12 w-full h-full flex-col flex justify-center ml-2">
                <div>
                  <div className="flex flex-col">
                    <p className="font-bold text-xs xm:text-sm xl:text-base">
                      {val.paymentLabel}
                    </p>
                    <p className="font-medium text-xs xs:leading-4 xm:text-sm xl:text-sm">
                      {val.cardNo.replace(/X/g, '*')}
                    </p>
                  </div>
                </div>
                {idx === 0 ? (
                  <div className="basis-2/12 w-full h-full grid place-items-center">
                    <text className="p-2 mb-16 bg-red-100 absolute right-10 rounded-xl text-center xs:text-[10px] xm:text-xs text-[#ED1C24]">
                      {trans(locale, lang, 'utama')}
                    </text>
                  </div>
                ) : null}
              </div>

              {editMode && idx !== 0 ? (
                <div className="absolute right-10 flex justify-end">
                  <Icon
                    icon={androidMoreVertical}
                    size={24}
                    onClick={() =>
                      floatingMenu === idx
                        ? setFloatingMenu('')
                        : setFloatingMenu(idx)
                    }
                    className="cursor-pointer text-gray-500 rounded-sm hover:text-red-dark-red90 mr-2"
                  />
                  {floatingMenu === idx && renderFloatingMenu(val)}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="flex flex-row bg-orange-200 p-4 rounded-2xl my-5 shadow-md">
          <Icon
            className="text-orange-400"
            icon={informationCircled}
            size={20}
          />
          <text className="ml-2 text-sm font-semibold">
            {trans(locale, lang, 'metodePembayaranKamuAkan')}
          </text>
        </div>
      </div>
    );
  };

  const renderFloatingMenu = (val) => {
    return (
      <div className="absolute border-2 right-7 bg-white rounded-md whitespace-nowrap">
        {val.cardOrder !== 0 ? (
          <div
            onClick={() => {
              setFloatingMenu(false);
              onChangeOrder(val);
            }}
            className="cursor-pointer border-b-2 py-2 px-3 text-sm text-center">
            {trans(locale, lang, 'applyMain')}
          </div>
        ) : null}
        <div
          onClick={() => {
            setFloatingMenu(false);
            setSelectedCard(val.paymentAccount);
            setDeleteModal(true);
          }}
          className="cursor-pointer border-b-2 py-2 px-3 text-sm text-center">
          {trans(locale, lang, 'hapusMetode')}
        </div>
      </div>
    );
  };

  const renderAddCard = () => {
    return (
      <div className="flex flex-col px-5">
        <text className="text-base font-bold opacity-70">
          {trans(locale, lang, 'addMethod')}
        </text>
        <text className="text-base font-semibold opacity-50">
          {trans(locale, lang, 'creditCard')}
        </text>
        <div className="flex flex-col p-4 shadow-md border rounded-2xl mt-2">
          <div
            role="button"
            className="flex flex-row justify-center items-center "
            onClick={() => {
              if (userData?.alreadyKYC) {
                setOpenForm(!openForm);
              } else {
                router.push(
                  {
                    pathname: NAVIGATION.KYC.KycMain,
                    query: { prev: 'profilePayment' },
                  },
                  NAVIGATION.KYC.KycMain,
                );
              }
            }}>
            <div className="basis-2/12 w-full h-full grid place-items-center">
              <img src={CreditCard} className="pl-2 w-16" />
            </div>
            <div className="basis-8/12 w-full h-full flex-col flex justify-center ml-2">
              <p className="font-bold text-xs xm:text-sm xl:text-base">
                {trans(locale, lang, 'creditCardOrDebit')}
              </p>
              <p className="font-medium text-xs xs:leading-4 xm:text-sm xl:text-sm">
                {trans(locale, lang, 'visaNMastercard')}
              </p>
            </div>

            <div className="basis-2/12 w-full h-full grid place-items-center">
              <Icon
                icon={openForm ? chevronUp : chevronDown}
                size={24}
                className="text-mediumGray-light-mediumGray"
              />
            </div>
          </div>
          {openForm ? renderAddForm() : null}
        </div>
      </div>
    );
  };

  const getCardValidation = () => {
    return (
      messageDate === 'formatBulanTidakValid' ||
      messageDate === 'formatTglTidakValid' ||
      messageDate === 'cardExpired'
    );
  };

  const renderAddForm = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col bg-gray-100 p-4 rounded-2xl my-5 shadow-md text-xs font-semibold">
          <div className="flex gap-3 mb-3">
            <div className="flex-none grid place-content-center w-6 h-full">
              <img src={ShieldCheck} className="w-5 h-5" />
            </div>
            <div>
              <text>{trans(locale, lang, 'demiKenyamanan')}</text>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-none grid place-content-center w-6 h-full">
              <img src={CommentInfo} className="w-4 h-4" />
            </div>
            <div>
              <text>{trans(locale, lang, 'metodePembayaranBisa')}</text>
            </div>
          </div>
        </div>
        <Input
          className="mb-5"
          value={cardNo}
          maxLength={19}
          placeholder={trans(locale, lang, 'nomorKartuPlaceholder')}
          message={
            cardMessage ? { error: trans(locale, lang, cardMessage) } : false
          }
          label={trans(locale, lang, 'nomorKartu')}
          handleOnChange={(val) => {
            let value = generateCardNo(val, cardNo);

            if (val?.length > 19) {
              value = cardNo;
            }

            if (!validateNumber(val.replace(/ /g, ''))) {
              setCardMessage('hanyaInputAngka');
            } else {
              setCardMessage(false);
            }
            setCardNo(value);
            // setValidEmail(validateEmail(val));
          }}
        />
        <div className="flex flex-row">
          <Input
            className="mb-5 mr-2"
            value={expiredDate}
            placeholder={trans(locale, lang, 'masaBerlakuPlaceholder')}
            maxLength={5}
            message={
              getCardValidation()
                ? { error: trans(locale, lang, messageDate) }
                : false
            }
            label={trans(locale, lang, 'masaBerlaku')}
            handleOnChange={(val) => {
              const expDateValue = formatedCardDate(val, expiredDate);

              if (val === '') {
                setMessageDate(false);
              } else {
                setMessageDate(expDateValue?.error);
              }

              setExpiredDate(expDateValue?.value);
            }}
          />
          <Input
            className="mb-5"
            value={cvv}
            maxLength={3}
            type="password"
            inputMode="numeric"
            placeholder={trans(locale, lang, 'CVVPlaceholder')}
            message={
              messageOnlyNumber
                ? { error: trans(locale, lang, messageOnlyNumber) }
                : false
            }
            label={trans(locale, lang, 'CVV')}
            handleOnChange={(val) => {
              if (!validateNumber(val)) {
                setMessageOnlyNumber('hanyaInputAngka');
              } else {
                setMessageOnlyNumber(false);
              }

              setCvv(val);
            }}
          />
        </div>
        <Input
          className="mb-5"
          value={cardName}
          placeholder={trans(locale, lang, 'namaKartuPlaceholder')}
          // message={emailMessage}
          label={trans(locale, lang, 'namaKartu')}
          handleOnChange={(val) => {
            setCardName(val);
            // setValidEmail(validateEmail(val));
          }}
        />
      </div>
    );
  };

  const renderAddButton = () => {
    return (
      <div className="p-4 w-full flex flex-col mt-2 text-sm">
        <text>
          <span className="text-red-500">*</span>
          {trans(locale, lang, 'debitOtomatis')} <br />
          <br />
          {trans(locale, lang, 'denganMemasukan')}
          <span
            className="text-red-500 underline"
            role="button"
            onClick={() => setShowPaymentTnc(true)}>
            {trans(locale, lang, 'SKPembayaran')}
          </span>
        </text>
        <Button
          type="linear-gradient"
          className="mt-5"
          disabled={
            cardMessage ||
            messageOnlyNumber ||
            messageDate ||
            cardNo.length < 16 ||
            expiredDate.length < 5 ||
            cvv.length < 3
          }
          full
          onButtonClick={() => onAddPayment()}>
          {trans(locale, lang, 'tambahkan')}
        </Button>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="p-4 relative bottom-0 w-full mt-20">
        <div className="flex flex-col text-xs xs:text-[10px] font-semibold text-gray-500 p-2 bg-gray-100 rounded-xl text-center">
          <text>{trans(locale, lang, 'butuhBantuan')}</text>
          <text
            className="text-red-500 underline"
            role="button"
            onClick={() => setShowHelp(true)}>
            {trans(locale, lang, 'customerCare')}
          </text>
        </div>
      </div>
    );
  };

  const modalHelpContact = () => {
    return (
      <Modal isOpen={showHelp}>
        <div className="flex py-3 px-5 justify-between border-b">
          <Icon
            icon={androidClose}
            size={20}
            onClick={() => setShowHelp(false)}
            className="cursor-pointer text-gray-600"
          />
          <text className="font-bold">
            {trans(locale, lang, 'customerCare')}
          </text>
          <div></div>
        </div>

        <div className="flex flex-col my-5">
          {dataHelp.map((val) => (
            <div
              key={val.id}
              className="flex flex-row p-3 border rounded-md justify-between text-sm shadow-md font-semibold mb-3"
              role="button"
              onClick={() =>
                val.id == 'email'
                  ? (window.location = `mailto:${val.link}`)
                  : window.open(val.link, '_blank')
              }>
              <div className="flex flex-row">
                <Image src={val.icon} width={24} height={24} />
                <text className="ml-2">{val.title}</text>
              </div>
              <Icon
                icon={chevronRight}
                className="text-gray-300 duration-500 group-hover:text-red-dark-red90"
              />
            </div>
          ))}
        </div>
      </Modal>
    );
  };

  const dataHelp = [
    {
      id: 'wa',
      icon: LsFooter3,
      title: 'WhatsApp Lifia',
      link: 'https://api.whatsapp.com/send/?phone=628111372848',
    },
    {
      id: 'call',
      icon: LsFooter1,
      title: 'Call Center 1500176',
      link: 'tel:1500176',
    },
    {
      id: 'email',
      icon: LsFooter2,
      title: 'customer_care@ifg-life.id',
      link: 'customer_care@ifg-life.id',
    },
  ];

  return (
    <div>
      {modalChangeOrder()}
      {modalDeleteCard()}
      {modalHelpContact()}
      <LifesaverTncPayment
        setShowPaymentTnc={setShowPaymentTnc}
        showPaymentTnc={showPaymentTnc}
      />

      <div className="relative w-full bg-white md:rounded-3xl xs:min-h-[60vh] lg:min-h-[70vh] border xs:mb-24 lg:mb-0">
        <div className="flex justify-center border-b-4 py-6 w-full text-center">
          <text className="text-base md:text-lg font-bold">
            {trans(locale, lang, 'pembayaran')}
          </text>
        </div>

        <div className="w-full h-full">
          {getPaymentMethodResponse?.cards?.length > 0
            ? renderCards()
            : renderEmptyCard()}
          {renderAddCard()}
          <div className="w-full px-4">
            {showError ? renderAlertContainer() : null}
          </div>
          {openForm ? renderAddButton() : null}
          {renderFooter()}
        </div>
      </div>
    </div>
  );
}
