import React from 'react';
import clsx from 'classnames';

const Header = ({ children, className }) => {
  const rootClass = clsx('p-[24px] bg-gradient-red', className);

  return <div className={rootClass}>{children}</div>;
};

export default Header;
