import moment from 'moment';
import clsx from 'classnames';
import { useRouter } from 'next/router';
import { CloudyBox } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { LifeTagDummy, NotifPaper, NotifEmpty } from '@cp-config/Images';
import {
  APPLICATION_PAYMENT_ID_V2,
  BILL_TYPE,
  NAVIGATION,
} from '@cp-util/constant';
import { Badge, HeaderPage } from '@cp-component';
import locale from './locale';
import { setFormatDate, setRupiah, setRupiahEn } from '@cp-util/common';
import {
  STATUS_ALL,
  STATUS_UNPAID,
  STATUS_ON_PROCESS,
  STATUS_ON_DELIVERY,
} from '@cp-module/notification/notificationConstant';
import { formatDate } from '@cp-util/format';

export default function Page(props) {
  const router = useRouter();
  const {
    query: { activeTab },
  } = router;
  const {
    lang,
    getNotif,
    getNotifClear,
    getNotifTransaction,
    getNotifResponse,
    getNotifTransactionResponse,
    readNotif,
    setCreateBill,
    setCreateBillClear,
    setCreateBillResponse,
    setInvoiceId,
    token,
    setCreateBillParam,
    setIsComingFromScreen,
    getCurrentSubsResponse,
    userData,
  } = props;
  const [selectedMenu, setSelectedMenu] = useState('info');
  const [listNotif, setListNotif] = useState({});
  const [listNotifTransaction, setListNotifTransaction] = useState({});
  const [proposalNumber, setProposalNumber] = useState('');
  const [filterTransSelected, setFilterTransSelected] = useState(
    trans(locale, lang, 'semua'),
  );

  const translate = (val) => trans(locale, lang, val);

  const menu = ['promo', 'info', 'transaksi'];
  const transactionFilter = [
    { title: trans(locale, lang, 'semua'), status: STATUS_ALL },
    {
      title: trans(locale, lang, 'menungguPembayaran'),
      status: STATUS_UNPAID,
    },
    { title: trans(locale, lang, 'dalamProses'), status: STATUS_ON_PROCESS },
    {
      title: trans(locale, lang, 'dalamPengiriman'),
      status: STATUS_ON_DELIVERY,
    },
  ];

  useEffect(() => {
    if (activeTab) {
      setSelectedMenu(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (token != null && token != '') {
      getNotif(lang);
      getNotifTransaction(lang);
    }
  }, [getNotif]);

  useEffect(() => {
    if (token != null && token != '') {
      setListNotif(getNotifResponse);
      setListNotifTransaction(getNotifTransactionResponse);
    }
  }, [token, getNotifResponse, getNotifTransactionResponse]);

  useEffect(() => {
    if (setCreateBillParam?.isLifetagPayment) {
      //lifetag
      router.push(setCreateBillResponse?.data?.redirectUrl);
      setIsComingFromScreen({
        lifetagPayment: {
          invoiceId: setCreateBillParam?.data?.invoiceId,
          orderId: setCreateBillResponse?.data?.orderId,
        },
      });
    } else {
      //lifesaver
      if (!setCreateBillResponse?.redirectUrl) return;
      setCreateBillClear();

      if (setCreateBillParam?.isProposal) {
        setInvoiceId({
          invoiceMaster: setCreateBillResponse?.invoiceId,
          reffNo: setCreateBillParam?.data.reffNo,
          onFailed: NAVIGATION.NOTIFICATION.NotificationMain,
          planCode: setCreateBillResponse?.planCode,
        });
      } else {
        setInvoiceId({
          invoiceId: setCreateBillResponse?.invoiceId,
          reffNo: setCreateBillParam?.data.reffNo,
          onFailed: NAVIGATION.NOTIFICATION.NotificationMain,
          planCode: setCreateBillResponse?.planCode,
        });
      }

      if (
        setCreateBillResponse?.redirectUrl &&
        setCreateBillResponse?.invoiceId
      ) {
        router.push(setCreateBillResponse?.redirectUrl);
        setCreateBillClear();
      }
    }
  }, [setCreateBillResponse, setCreateBillParam]);

  const renderHeaderMenu = () => {
    return (
      <div>
        <div className="flex gap-4 w-full px-5 py-2 mt-2 mx-auto md:border md:rounded-xl md:shadow-md md:w-3/5">
          {menu.map((e, idx) => (
            <div
              key={idx}
              role="button"
              className={`w-full p-2 text-center rounded-xl hover:bg-red-100/50 ${
                selectedMenu === e ? 'bg-red-light-red20' : ''
              }`}>
              <div
                className="text-red-500 text-xs xm:text-base"
                onClick={() => setSelectedMenu(e)}>
                {trans(locale, lang, e)}
              </div>
            </div>
          ))}
        </div>
        {/* {selectedMenu === menu[2] && (
          <div className="flex justify-start border-t px-4 items-center pt-3 mt-2 pb-2 gap-x-1 overflow-x-scroll md:justify-center xm:gap-x-2 md:gap-y-3 md:border-0 md:overflow-hidden">
            {transactionFilter.map((e, idx) => (
              <Badge
                title={e.title}
                key={idx}
                onClick={() => setFilterTransSelected(e.status)}
                className={`mb-2 !text-xs md:!text-sm capitalize ${
                  filterTransSelected === e.title ? 'bg-red-100' : ''
                }`}
              />
            ))}
          </div>
        )} */}
      </div>
    );
  };

  const renderEmptyNotif = () => {
    return (
      <div className="w-full h-[65vh] flex items-center justify-center lg:h-[58vh]">
        <div className="text-center ">
          <img src={NotifEmpty} className="m-auto w-40" />
          <div className="w-[260px] mt-2 mx-auto">
            {trans(locale, lang, 'belumAdaNotifikasi')}
          </div>
        </div>
      </div>
    );
  };

  const renderListNotif = (data) => {
    return (
      <div className="mt-6 w-full h-[65vh] divide-y overflow-y-auto lg:h-[58vh] md:mt-10">
        {data.map((val) => (
          <div
            key={val.id}
            role="button"
            className={clsx(
              'w-full h-auto flex flex-col py-4 px-2 justify-center items-center md:px-[5%]',
              val.read ? 'bg-white' : 'bg-red-100/40',
              val?.heading === 'Pembayaran langganan gagal'
                ? 'cursor-pointer hover:bg-red-100/20'
                : '',
            )}
            onClick={() => {
              const item = val;

              const splitArr = item?.data?.path?.split('?');
              const screen = splitArr[0];
              const url = new URL(`${process.env.BASE_URL}${item?.data?.path}`);
              const query = new URLSearchParams(url?.search);

              const linking = {
                subsdetail: {
                  pathname: NAVIGATION.PROFILE.Profile,
                  query: {
                    activeTabProps: 1,
                    policyNo: query?.get('policyNo'),
                  },
                },
                polismain: {
                  pathname: NAVIGATION.POLICY.Polis,
                  query: {},
                },
                userticket: {
                  pathname: NAVIGATION.EVENT.EventVoucherQrCode,
                  query: {
                    eventId: query?.get('eventId'),
                    userEventId: query?.get('userEventId'),
                  },
                },
                kycretry: {
                  pathname: NAVIGATION.HOME.Home,
                  query: {},
                },
                // subsmain: NAVIGATION.SUBS.SubsMain,
                // paymentredirect: NAVIGATION.PAYMENTS.Payments3DS,
                // lifetagdetailorder: NAVIGATION.LIFETAG.LifetagDetailOrder,
                // profilepayments: NAVIGATION.PROFILE.ProfilePayments,
              };

              if (linking[screen]) {
                if (screen === 'kycretry' && !userData?.isReKYC) {
                  router.replace(NAVIGATION.HOME.Home);
                  getNotifClear();
                } else {
                  router.push(
                    {
                      pathname: linking[screen]?.pathname,
                      query: linking[screen]?.query,
                    },
                    linking[screen]?.pathname,
                  );
                }
              }
              if (item?.read !== true) {
                readNotif(item?.id);
              }
            }}>
            <div className="w-full flex flex-row justify-between">
              <div className="flex items-center mb-2">
                <img className="w-5 xm:w-7" src={NotifPaper} />
                <p className="pl-3 text-gray-400 text-xs xm:text-sm">
                  {val.title}
                </p>
              </div>
              <p className="text-gray-400 pr-2 text-xs md:text-sm">
                {moment(val.date).format('HH:mm')} -{' '}
                {setFormatDate(
                  moment(val.date).format('YYYY-MM-DD'),
                  lang,
                  true,
                )}
              </p>
            </div>
            <div className="pl-10 w-full flex flex-col text-left">
              <p className="font-bold pb-1 text-sm md:text-base">
                {val.heading}
              </p>
              <p className="text-xs xm:text-sm text-gray-400">{val.content}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // minus flaging on delivery
  const NotifLifetag = ({ item }) => {
    return (
      <div className="py-5 px-[5%]">
        <div
          role="button"
          className="border rounded-2xl divide-y shadow-sm px-3 py-5 w-full duration-500 md:p-5 hover:shadow-md hover:bg-red-50/60"
          onClick={() =>
            router.push(
              {
                pathname: NAVIGATION.LIFETAG.LifetagDetailOrder,
                query: { orderId: item?.orderId, fromNotification: true },
              },
              NAVIGATION.LIFETAG.LifetagDetailOrder,
            )
          }>
          {item?.product.map((e, idx) => (
            <div key={idx} className="text-sm ">
              <div className="flex py-2">
                <img
                  src={item?.productImage ? item?.productImage : LifeTagDummy}
                  className="h-14 w-14 md:h-20 md:w-20"
                />
                <div className="relative pl-3 md:pl-4 w-full text-xs md:text-sm">
                  <p className="font-bold">{e?.productName}</p>
                  <p className="text-[11px] pt-1 md:text-xs text-gray-400 line-through">
                    {lang == 'id'
                      ? setRupiah(e?.productPrice * e?.productQuantity)
                      : setRupiahEn(e?.productPrice * e?.productQuantity)}
                  </p>
                  <p className="font-bold pb-1 pt-1 text-red-500">
                    {lang == 'id'
                      ? setRupiah(
                          e?.productPrice * e?.productQuantity -
                            (e?.productDiscount || 0),
                        )
                      : setRupiahEn(
                          e?.productPrice * e?.productQuantity -
                            (e?.productDiscount || 0),
                        )}
                  </p>
                  {item.status == 'ON_PROCESS' && (
                    <div className="absolute top-6 right-0 bg-yellow-100/80 rounded-xl py-1 px-3">
                      <span className="text-yellow-600">
                        {trans(locale, lang, 'onProcess')}
                      </span>
                    </div>
                  )}
                  {item.status == 'ON_DELIVERY' && (
                    <div className="absolute top-6 right-0 bg-blue-100 rounded-xl py-1 px-3">
                      <span className="text-[#007AFF]">
                        {trans(locale, lang, 'onDelivery')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-start md:items-center">
                    <p className="text-gray-500">{translate('kuantitas')}</p>
                    <p className="">x {e?.productQuantity}</p>
                  </div>
                  <div className="flex justify-between items-start md:items-center">
                    <p className="text-gray-500">{translate('warna')}</p>
                    <p className="">{e?.productColour?.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-y-2 font-medium text-xs pt-3 mt-3 border-t md:text-sm md:gap-y-2 text-gray-800">
            <div className="flex justify-between items-start gap-y-1 md:items-center flex-col md:flex-row">
              <p className="text-gray-500">{translate('orderNumber')}</p>
              <p className="font-semibold">
                {item?.orderNumber ? item?.orderNumber : '-'}
              </p>
            </div>
            <div className="flex justify-between items-start gap-y-1 md:items-center flex-col md:flex-row">
              <p className="text-gray-500">{translate('noResi')}</p>
              <p className="font-semibold">
                {item?.trackingNumber ? item?.trackingNumber : '-'}
              </p>
            </div>
            <div className="flex justify-between items-start gap-y-1 md:items-center flex-col md:flex-row">
              <p className="text-gray-500">{translate('kurir')}</p>
              <p className="font-semibold">
                {item?.courierProvider ? item?.courierProvider : '-'}
              </p>
            </div>
            <div className="flex justify-between items-start gap-y-1 md:items-center flex-col md:flex-row">
              <p className="text-gray-500">{translate('orderDate')}</p>
              <p className="font-semibold">
                {item?.orderDate
                  ? setFormatDate(item?.orderDate.slice(0, 10))
                  : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderListNotifTransaction = (data) => {
    if (filterTransSelected === STATUS_UNPAID) {
      const resultFilter = data?.filter(
        (item) => item.status === STATUS_UNPAID,
      );
      if (resultFilter?.length < 1) {
        return renderEmptyNotif();
      }
      return (
        <div className="w-full h-[65vh] divide-y overflow-y-auto lg:h-[58vh]">
          {resultFilter?.map((val, idx) => (
            <div
              key={val.id}
              role="button"
              className={clsx(
                'w-full h-auto flex flex-col py-4 px-2 justify-center items-center md:px-[5%]',
                val.read ? 'bg-white' : 'bg-red-100/40',
                val?.heading === 'Pembayaran langganan gagal' ||
                  val?.heading === 'Subscription payment Failed'
                  ? 'cursor-pointer hover:bg-red-100/20'
                  : '',
              )}
              onClick={() => {
                if (
                  val?.heading === 'Pembayaran langganan gagal' ||
                  val?.heading === 'Subscription payment Failed'
                ) {
                  router.push(
                    {
                      pathname: NAVIGATION.PROFILE.Profile,
                      query: {
                        activeTabProps: 1,
                        policyNo: val?.data?.path?.split(
                          'subsdetail?policyNo=',
                        )?.[1],
                      },
                    },
                    NAVIGATION.PROFILE.Profile,
                  );
                } else if (
                  (val?.heading === 'Menunggu Pembayaran' ||
                    val?.heading === 'Waiting for Payment') &&
                  val?.data?.path?.length
                ) {
                  var invoice = val?.data?.path?.split('=')[1];
                  setCreateBill({
                    isProposal: true,
                    data: {
                      applicationId: APPLICATION_PAYMENT_ID_V2,
                      billType: BILL_TYPE.premium,
                      invoiceMaster: invoice,
                      language: lang,
                    },
                  });
                } else {
                  readNotif(val.id);
                }
              }}>
              <div className="w-full flex flex-row justify-between">
                <div className="flex items-center mb-2">
                  <img className="w-5 xm:w-7" src={NotifPaper} />
                  <p className="pl-3 text-gray-400 text-xs xm:text-sm">
                    {val.title}
                  </p>
                </div>
                <p className="text-gray-400 pr-2 text-xs md:text-sm">
                  {moment(val.date).format('HH:mm')} -{' '}
                  {setFormatDate(
                    moment(val.date).format('YYYY-MM-DD'),
                    lang,
                    true,
                  )}
                </p>
              </div>
              <div className="pl-10 w-full flex flex-col text-left">
                <p className="font-bold pb-1 text-sm md:text-base">
                  {val.heading}
                </p>
                <p className="text-xs xm:text-sm text-gray-400">
                  {val.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (filterTransSelected === STATUS_ON_PROCESS) {
      const resultFilter = data?.filter(
        (item) => item.type === 'LIFETAG' && item.status === STATUS_ON_PROCESS,
      );
      if (resultFilter?.length < 1) {
        return renderEmptyNotif();
      }
      // return (
      //   <div className="w-full h-[65vh] divide-y overflow-y-auto lg:h-[58vh]">
      //     {resultFilter?.map((val, idx) => (
      //       <NotifLifetag key={idx} item={val} />
      //     ))}
      //   </div>
      // );
    } else if (filterTransSelected === STATUS_ON_DELIVERY) {
      const resultFilter = data?.filter(
        (item) => item.type === 'LIFETAG' && item.status === STATUS_ON_DELIVERY,
      );

      if (resultFilter?.length < 1) {
        return renderEmptyNotif();
      }

      // return (
      //   <div className="w-full h-[65vh] divide-y overflow-y-auto lg:h-[58vh]">
      //     {resultFilter?.map((val, idx) => (
      //       <NotifLifetag key={idx} item={val} />
      //     ))}
      //   </div>
      // );
    }

    return (
      <div className="w-full h-[65vh] divide-y overflow-y-auto lg:h-[58vh]">
        {data.map((val, idx) =>
          val.type === 'LIFETAG' ? null : (
            // <NotifLifetag key={idx} item={val} />

            <div
              key={val.id}
              role="button"
              className={clsx(
                'w-full h-auto flex flex-col py-4 px-2 justify-center items-center md:px-[5%]',
                val.read ? 'bg-white' : 'bg-red-100/40',
                val?.heading === 'Pembayaran langganan gagal' ||
                  val?.heading === 'Subscription payment Failed'
                  ? 'cursor-pointer hover:bg-red-100/20'
                  : '',
              )}
              onClick={() => {
                if (
                  val?.heading === 'Pembayaran langganan gagal' ||
                  val?.heading === 'Subscription payment Failed'
                ) {
                  router.push(
                    {
                      pathname: NAVIGATION.PROFILE.Profile,
                      query: {
                        activeTabProps: 1,
                        policyNo: val?.data?.path?.split(
                          'subsdetail?policyNo=',
                        )?.[1],
                      },
                    },
                    NAVIGATION.PROFILE.Profile,
                  );
                } else if (
                  (val?.heading === 'Menunggu Pembayaran' ||
                    val?.heading === 'Waiting for Payment') &&
                  val?.data?.path?.length
                ) {
                  var invoice = val?.data?.path?.split('=')[1];
                  setCreateBill({
                    isProposal: true,
                    data: {
                      applicationId: APPLICATION_PAYMENT_ID_V2,
                      billType: BILL_TYPE.premium,
                      invoiceMaster: invoice,
                      language: lang,
                    },
                  });
                } else if (
                  val?.heading === 'LifeTag payment confirmation' ||
                  val?.heading === 'Menunggu Pembayaran LifeTag'
                ) {
                  const _invoiceId = val?.data?.path;
                  const split = _invoiceId?.split('=');
                  setCreateBill({
                    isLifetagPayment: true,
                    data: {
                      invoiceId: split[1],
                    },
                  });
                } else {
                  readNotif(val.id);
                }
              }}>
              <div className="w-full flex flex-row justify-between">
                <div className="flex items-center mb-2">
                  <img className="w-5 xm:w-7" src={NotifPaper} />
                  <p className="pl-3 text-gray-400 text-xs xm:text-sm">
                    {val.title}
                  </p>
                </div>
                <p className="text-gray-400 pr-2 text-xs md:text-sm">
                  {moment(val.date).format('HH:mm')} -{' '}
                  {setFormatDate(
                    moment(val.date).format('YYYY-MM-DD'),
                    lang,
                    true,
                  )}
                </p>
              </div>
              <div className="pl-10 w-full flex flex-col text-left">
                <p className="font-bold pb-1 text-sm md:text-base">
                  {val.heading}
                </p>
                <p className="text-xs xm:text-sm text-gray-400">
                  {val.content}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    );
  };

  const renderPage = () => {
    if (selectedMenu === 'promo') {
      return renderEmptyNotif();
    } else if (selectedMenu === 'info') {
      if (listNotif?.data !== null && listNotif?.data) {
        if (listNotif?.data?.length > 0) {
          return renderListNotif(listNotif?.data);
        } else {
          return renderEmptyNotif();
        }
      } else {
        return renderEmptyNotif();
      }
    } else if (selectedMenu === 'transaksi') {
      if (listNotifTransaction?.data !== null && listNotifTransaction?.data) {
        if (listNotifTransaction?.data?.length > 0) {
          return renderListNotifTransaction(listNotifTransaction?.data);
        } else {
          return renderEmptyNotif();
        }
      } else {
        return renderEmptyNotif();
      }
    }
  };

  return (
    <div className="relative">
      <HeaderPage
        title={trans(locale, lang, 'notifikasi')}
        onClickBack={() => {
          if (activeTab) {
            router.push(NAVIGATION.HOME.Home);
          } else {
            router.back();
          }
        }}
      />
      <div className="relative -top-14 px-[5%]">
        <div className="relative py-4 w-full max-w-4xl mx-auto rounded-5xl bg-white rounded-3xl shadow-md">
          {renderHeaderMenu()}
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
