import clsx from 'classnames';
import { createContext, useMemo, useState, useEffect, useRef } from 'react';
import Header from './Header';
import Content from './Content';
import Item from './Item';

export const TabLandingContext = createContext({
  activeKey: null, // string or string[]
  setActiveKey: () => {},
});

const TabLanding = ({ children, defaultActiveKey }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const provideValue = useMemo(
    () => ({
      activeKey,
      setActiveKey,
    }),
    [activeKey, setActiveKey],
  );

  return (
    <TabLandingContext.Provider value={provideValue}>
      <div className="relative max-w-[900px] mx-auto z-10">{children}</div>
    </TabLandingContext.Provider>
  );
};

export default Object.assign(TabLanding, {
  Header,
  Content,
  Item,
});
