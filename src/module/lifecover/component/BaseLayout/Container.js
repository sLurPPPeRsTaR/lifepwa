import React from 'react';
import clsx from 'classnames';

const Container = ({ children, className, fullWidth = false }) => {
  const rootClass = clsx(
    'relative z-10 container mx-auto',
    {
      'max-w-2xl': !fullWidth,
      'px-4 md:px-8': fullWidth,
    },
    className,
  );

  return <div className={rootClass}>{children}</div>;
};

export default Container;
