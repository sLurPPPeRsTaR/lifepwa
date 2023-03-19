import { Loading } from '@cp-config/Images';
import { pFilter } from '@cp-config/Svgs';
import { trans } from '@cp-util/trans';
import clsx from 'classnames';
import React from 'react';

function ListSubscriptionOther({
  isActiveFilter,
  getSubscriptionDetailResponse,
  activeArrowBack,
  locale,
  lang,
  isLoading,
  children,
  onTabFilterClick,
}) {
  const filterTitle = [
    {
      key: 0,
      title: trans(locale, lang, 'aktif'),
    },
    {
      key: 1,
      title: trans(locale, lang, 'tidakAktif'),
    },
  ];

  return (
    <div className="px-2">
      {!getSubscriptionDetailResponse && !activeArrowBack && (
        <div className="my-4 flex flex-row gap-2 items-center">
          <img src={pFilter} />
          {filterTitle?.map((item, index) => {
            return (
              <div
                key={item?.key}
                role="button"
                onClick={() => onTabFilterClick(index)}
                className={clsx(
                  'py-[2px] md:py-1 px-3 border rounded-xl border-red-400 text-red-400 text-[10px] md:text-[11px]',
                  isActiveFilter === index ? 'bg-red-100' : 'bg-transparent',
                )}>
                <p className="text-[#FB909C] font-medium text-sm leading-5 tracking-wider">
                  {item?.title}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {isLoading ? (
        <div className="w-full flex justify-center">
          <img src={Loading} style={{ width: 400 }} />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default ListSubscriptionOther;
