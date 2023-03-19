import { useContext, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/feather';
import { AccordionCustomContext, isAccordionItemSelected } from './index';
import { AccordionCustomItemContext } from './Item';
import clsx from 'classnames';

const animateVariants = {
  active: {
    rotate: '180deg',
  },
  default: {
    rotate: '0deg',
  },
};
const Header = ({ as = 'div', children, className, ...rest }) => {
  const Component = as;

  const { activeKey, setActiveKey, alwaysOpen, onSelect } = useContext(
    AccordionCustomContext,
  );
  const { eventKey, defaultOpen } = useContext(AccordionCustomItemContext);

  const rootClass = clsx('flex items-start', className);

  const handleActiveKey = useCallback(() => {
    if (alwaysOpen && !activeKey) {
      setActiveKey([eventKey]);
    } else if (alwaysOpen && Array.isArray(activeKey)) {
      if (isAccordionItemSelected(activeKey, eventKey)) {
        setActiveKey(activeKey.filter((value) => value !== eventKey));
      } else {
        setActiveKey([...activeKey, eventKey]);
      }
    } else {
      if (eventKey === activeKey) {
        setActiveKey('');
      } else {
        setActiveKey(eventKey);
      }
    }

    onSelect(eventKey);
  }, [activeKey, eventKey, setActiveKey, onSelect, isAccordionItemSelected]);

  // useEffect(() => {
  //   setActiveKey((prev) => [...prev, eventKey]);
  // }, [eventKey]);
  // useEffect(() => {
  //   console.log(activeKey);
  // }, [activeKey]);

  return (
    <Component
      role="button"
      onClick={handleActiveKey}
      className={rootClass}
      {...rest}>
      <div className="flex-1">{children}</div>
      <div className="flex-initial">
        <motion.div
          key={eventKey}
          variants={animateVariants}
          animate={
            isAccordionItemSelected(activeKey, eventKey) ? 'active' : 'default'
          }
          initial={
            isAccordionItemSelected(activeKey, eventKey) ? 'active' : 'default'
          }>
          <Icon icon={chevronDown} className="text-[#C3C5CC]" size={24} />
        </motion.div>
      </div>
    </Component>
  );
};

export default Header;
