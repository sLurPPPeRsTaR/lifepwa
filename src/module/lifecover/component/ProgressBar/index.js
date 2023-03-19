import clsx from 'classnames';
import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ step = 4, maxStep = 5, className }) => {
  const rootClass = clsx('relative h-[4px] w-full bg-gray-300', className);
  const calculateStep = step / maxStep;
  const progressBarWidth = (() => {
    const multiplyCalc = step / maxStep;
    return `calc(100% * ${multiplyCalc})`;
  })();
  const linearGradientStyle = (() => ({
    height: '100%',
    width: progressBarWidth,
  }))();

  const variants = {
    animate: {
      width: `calc(100% * ${calculateStep})`,
    },
  };

  return (
    <div className={rootClass}>
      <motion.div
        variants={variants}
        animate="animate"
        className="absolute bg-gradient-red top-0 bottom-0 left-0 h-full"
        style={linearGradientStyle}
      />
    </div>
  );
};

export default ProgressBar;
