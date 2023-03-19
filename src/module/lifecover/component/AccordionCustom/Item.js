import { createContext, useEffect, useMemo, useContext } from 'react';
import { AccordionCustomContext, isAccordionItemSelected } from './index';

export const AccordionCustomItemContext = createContext({
  eventKey: '',
  defaultOpen: false,
});
const Item = ({ id = '', eventKey, className, children, defaultOpen }) => {
  const { activeKey, setActiveKey, alwaysOpen, onSelect } = useContext(
    AccordionCustomContext,
  );

  const providerValue = useMemo(
    () => ({
      eventKey,
      defaultOpen,
    }),
    [eventKey, defaultOpen],
  );

  useEffect(() => {
    if (defaultOpen && alwaysOpen) {
      setActiveKey((prev) => {
        if (Array.isArray(prev) && !prev.includes(eventKey)) {
          return [...prev, eventKey];
        }
        return prev;
      });
    }

    // remove from activekey when component unmounted
    return () => {
      setActiveKey((prev) => {
        if (Array.isArray(prev) && !prev.includes(eventKey)) {
          return prev.filter((key) => key !== eventKey);
        }
        return prev;
      });
    };
  }, []);

  return (
    <AccordionCustomItemContext.Provider value={providerValue}>
      <div id={id ?? eventKey} className={className} data-event-key={eventKey}>
        {children}
      </div>
    </AccordionCustomItemContext.Provider>
  );
};

export default Item;
