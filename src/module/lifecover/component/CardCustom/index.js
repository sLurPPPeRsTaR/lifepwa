import React from 'react';
import clsx from 'classnames';
import Body from './Body';
import Header from './Header';

const CardCustom = ({ children, className, withDefaultMobileStyle }) => {
  const rootClass = clsx(
    'shadow-[16px] border border-gray-100 max-w-[inherit] bg-white overflow-hidden',
    {
      'rounded-none lg:rounded-[30px]': withDefaultMobileStyle,
      'rounded-[30px]': !withDefaultMobileStyle,
    },
    className,
  );

  return <div className={rootClass}>{children}</div>;
};

export default Object.assign(CardCustom, {
  Header,
  Body,
});
