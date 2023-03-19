import React from 'react';
import clsx from 'classnames';

const Footer = ({ children, className, containerClassName }) => {
  const rootClass = clsx(
    'fixed z-[88] w-full left-0 right-0 bottom-0',
    className,
  );
  const containerClass = clsx(
    'min-h-[100px] bg-white px-6 py-3 mx-auto',
    containerClassName,
  );
  const rootStyle = {
    boxShadow:
      '3px -3px 9px rgba(255, 255, 255, 0.400759), 2px 2px 30px rgba(18, 61, 101, 0.15), inset -4px -3px 40px rgba(255, 255, 255, 0.09)',
  };

  return (
    <div className={rootClass}>
      <div style={rootStyle} className={containerClass}>
        {children}
      </div>
    </div>
  );
};

export default Footer;
