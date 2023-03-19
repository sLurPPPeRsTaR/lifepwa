import { createContext, useMemo, useState, useEffect, useRef } from 'react';
import Body from './Body';
import Header from './Header';
import Item from './Item';

export const AccordionCustomContext = createContext({
  activeKey: null, // string or string[]
  alwaysOpen: false,
  allOpen: false,
  setActiveKey: () => {},
  onSelect: () => {},
});
export const isAccordionItemSelected = (activeKey, eventKey) => {
  return Array.isArray(activeKey)
    ? activeKey.includes(eventKey)
    : activeKey === eventKey;
};

const AccordionCustom = ({
  children,
  defaultActiveKey,
  alwaysOpen = false,
  allOpen = false,
  onSelect = (eventKey = null) => {},
}) => {
  const accordionRef = useRef(null);
  const [activeKey, setActiveKey] = useState(
    alwaysOpen ? [] : defaultActiveKey,
  );

  const provideValue = useMemo(
    () => ({
      activeKey,
      alwaysOpen,
      allOpen,
      setActiveKey,
      onSelect,
    }),
    [activeKey, allOpen, alwaysOpen, setActiveKey, onSelect],
  );

  useEffect(() => {
    if (allOpen && alwaysOpen && accordionRef.current) {
      const elsEventKey = [];
      accordionRef.current
        .querySelectorAll('[data-event-key]')
        ?.forEach((nodeEl) => {
          elsEventKey = [...elsEventKey, nodeEl.getAttribute('data-event-key')];
        });

      setActiveKey(elsEventKey);
    }
  }, []);

  return (
    <AccordionCustomContext.Provider value={provideValue}>
      <div ref={accordionRef}>{children}</div>
    </AccordionCustomContext.Provider>
  );
};

export default Object.assign(AccordionCustom, {
  Item,
  Header,
  Body,
});
