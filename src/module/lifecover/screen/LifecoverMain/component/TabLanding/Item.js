import clsx from 'classnames';
import React, { useContext, useMemo } from 'react';
import { TabLandingContext } from './index';

const TabItem = ({ eventKey, children }) => {
  const { activeKey, setActiveKey } = useContext(TabLandingContext);

  const isActive = useMemo(() => eventKey === activeKey, [eventKey, activeKey]);

  const buttonClass = clsx('px-4 h-full flex items-center justify-center', {
    'text-[#ED1A33] border-b-2 border-[#ED1A33] font-semibold w-full md:w-auto':
      isActive,
    'text-black/50 font-medium': !isActive,
  });

  return (
    <div className="flex-1 h-full flex items-center justify-center text-center">
      <button className={buttonClass} onClick={() => setActiveKey(eventKey)}>
        {children}
      </button>
    </div>
  );
};

export default TabItem;
