import React from 'react';
import clsx from 'classnames';

const Footer = ({
  variant = 'default', // default | floating
  children,
  className,
}) => {
  const rootClass = clsx(
    'p-[24px]',
    {
      'fixed w-full max-w-[inherit] bottom-0': variant === 'floating',
    },
    className,
  );

  return <div className={rootClass}>{children}</div>;
};

export default Footer;
