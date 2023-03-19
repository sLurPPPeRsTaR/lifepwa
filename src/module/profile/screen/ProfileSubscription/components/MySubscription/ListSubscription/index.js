import { Button } from '@cp-component';
import { setFormatDate, setRupiah } from '@cp-util/common';
import { trans } from '@cp-util/trans';
import moment from 'moment';
import React from 'react';
import Icon from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather';
import ProductLogo from '../../ProductLogo';
import SubscriptionEmpty from '../../SubscriptionEmpty';

function ListSubscription({
  getSubscriptionsResponse,
  locale,
  lang,
  activeArrowBack,
  children,
  onDetailPress,
  onUpgradePress,
  onResubsPress
}) {
  const renderListSubsriptions = (val) => {
    return (
      <div
        key={val.policyNo}
        className="p-3 mt-4 shadow-md border rounded-xl md:rounded-3xl xm:p-5">
        <div
          className="cursor-pointer border-b pb-2 mb-3 flex items-center justify-between"
          onClick={() => onDetailPress(val)}>
          <div className="flex flex-col">
            <div className="mb-2">
              {val.status === 'GRACE_PERIOD' ? (
                <p className="p-1 md:text-sm xs:text-[10px] mb-2 bg-orange-100 font-bold text-orange-500 rounded-lg text-left relative">
                  {trans(locale, lang, val.status)}
                </p>
              ) : val.isSubscribe === false ? (
                <p className="p-1 md:text-sm xs:text-[10px] mb-2 bg-gray-100 font-bold text-gray-500 rounded-lg text-left relative">
                  {trans(locale, lang, 'berhenti')}
                </p>
              ) : val.status === 'LAPSE' ? (
                <p className="p-1 md:text-sm xs:text-[10px] mb-2 bg-gray-100 font-bold rounded-lg text-left relative">
                  {trans(locale, lang, val.status)}
                </p>
              ) : null}
            </div>
            <ProductLogo status={val?.status} planName={val?.planName} />
          </div>
          <Icon
            icon={chevronRight}
            size={24}
            className="text-red-dark-red90 hover:bg-red-light-red20 duration-500 rounded-md"
          />
        </div>

        <div className="flex py-1 items-center justify-between">
          <p className="text-sm xs:text-[12px] text-gray-500">
            {trans(locale, lang, 'durasi')}
          </p>
          <p className="text-sm xs:text-[12px] font-black whitespace-nowrap">
            {val.protectionCycleInMonth} {trans(locale, lang, 'bulan')}
          </p>
        </div>

        <div className="flex py-1  items-center justify-between">
          <p className="text-sm xs:text-[12px] text-gray-500">
            {trans(locale, lang, 'tempo')}
          </p>
          <p className="font-black text-sm xs:text-[12px] whitespace-nowrap">
            {setFormatDate(
              moment(val.policyDueDate).format('YYYY-MM-DD'),
              lang,
              true,
            )}
          </p>
        </div>

        <div className="flex py-1 items-center justify-between">
          <p className="text-sm xs:text-[12px] text-gray-500">
            {trans(locale, lang, 'harga')}
          </p>
          <p className="font-black text-sm xs:text-[12px] whitespace-nowrap">
            {setRupiah(val.subscriptionFee, lang)}/
            {trans(locale, lang, 'bulan')}
          </p>
        </div>

        {val.status !== 'GRACE_PERIOD' || val.status !== 'LAPSE' ? (
          val.isSubscribe && val.status !== 'LAPSE' ? (
            val.planName === 'LifeSAVER' || val.planName === 'LifeSAVER POS' ? (
              <Button
                className="mt-4 text-xs xm:text-sm"
                type="linear-gradient"
                shadow
                full
                disabled={val.status === 'GRACE_PERIOD'}
                onButtonClick={onUpgradePress}>
                {trans(locale, lang, 'upgrade')}
              </Button>
            ) : (
              <Button
                className="mt-4 text-xs xm:text-sm"
                type="linear-gradient"
                shadow
                full
                disabled>
                {trans(locale, lang, 'upgrade')}
              </Button>
            )
          ) : val.status !== 'LAPSE' ? (
            <Button
              className="mt-4 text-xs xm:text-sm"
              type="linear-gradient"
              shadow
              full
              onButtonClick={()=>onResubsPress(val)}>
              {trans(locale, lang, 'aktifkanLagi')}
            </Button>
          ) : null
        ) : null}
      </div>
    );
  };
  const RenderListActiveSubs = () => {
    if (
      getSubscriptionsResponse &&
      getSubscriptionsResponse?.getActiveSubs?.length > 0
    ) {
      return getSubscriptionsResponse.getActiveSubs?.map((val) =>
        renderListSubsriptions(val),
      );
    }
  };

  const RenderListInActiveSubs = () => {
    if (
      getSubscriptionsResponse &&
      getSubscriptionsResponse?.getInActiveSubs?.length > 0
    ) {
      return getSubscriptionsResponse.getInActiveSubs?.map((val) =>
        renderListSubsriptions(val),
      );
    }
  };
  const RenderMain = () => {
    return (
      <div className="py-6 px-3 w-full xm:py-8 xm:px-6">
        {getSubscriptionsResponse?.getActiveSubs?.length === 0 &&
        getSubscriptionsResponse?.getInActiveSubs?.length === 0 ? (
          <>
            <SubscriptionEmpty locale={locale} lang={lang} />
          </>
        ) : (
          <>
            <RenderListActiveSubs />
            <RenderListInActiveSubs />
          </>
        )}
      </div>
    );
  };

  if (!activeArrowBack) {
    return <RenderMain />;
  } else {
    return children;
  }
}

export default ListSubscription;
