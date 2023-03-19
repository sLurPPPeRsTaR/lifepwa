import React from 'react';
import clsx from 'classnames';

const Body = ({ children, className }) => {
  const rootClass = clsx('p-[24px]', className);

  return <div className={rootClass}>{children}</div>;
};

export default Body;
