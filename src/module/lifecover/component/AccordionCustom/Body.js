import { useContext } from 'react';
import { motion } from 'framer-motion';
import { AccordionCustomContext, isAccordionItemSelected } from './index';
import { AccordionCustomItemContext } from './Item';
import clsx from 'classnames';

const animateVariants = {
  active: {
    height: 'auto',
    overflow: 'visible',
  },
  default: {
    height: 0,
    overflow: 'hidden',
  },
};
const Body = ({ children, className }) => {
  const { activeKey } = useContext(AccordionCustomContext);
  const { eventKey } = useContext(AccordionCustomItemContext);

  const rootClass = clsx('py-3', className);

  return (
    <motion.div
      key={eventKey}
      variants={animateVariants}
      animate={
        isAccordionItemSelected(activeKey, eventKey) ? 'active' : 'default'
      }
      initial={
        isAccordionItemSelected(activeKey, eventKey) ? 'active' : 'default'
      }>
      <div className={rootClass}>{children}</div>
    </motion.div>
  );
};

export default Body;
