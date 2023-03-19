import clsx from 'classnames';
import React, { useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TabLandingContext } from '.';

const animateTabContentVariants = {
  active: {
    opacity: 1,
    display: 'flex',
  },
  inactive: {
    opacity: 0,
    display: 'none',
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
};

const TabContent = ({ eventKey, children, ...rest }) => {
  const { activeKey } = useContext(TabLandingContext);

  const isActive = useMemo(() => eventKey === activeKey, [eventKey, activeKey]);

  return (
    <motion.div
      variants={animateTabContentVariants}
      key={eventKey}
      animate={isActive ? 'active' : 'inactive'}
      exit="inactive"
      initial="active"
      className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-10 justify-center"
      {...rest}>
      {children}
    </motion.div>
  );
};

export default TabContent;
