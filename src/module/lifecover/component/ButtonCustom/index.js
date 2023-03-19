import clsx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const ButtonCustom = ({
  active,
  variant,
  children,
  className,
  prefixIcon,
  suffixIcon,
  textAlign,
  ...rest
}) => {
  const rootClass = clsx(
    `relative shadow-md text-gray-400 flex items-center w-full bg-white border border-gray-200/50 rounded-[16px] font-medium px-[20px] py-[15px]`,
    {
      'border-gray-300': variant === 'selectable',
      '!border-[#ED1C24] !text-[#ED1C24] !bg-[#ED1C24]/10':
        variant === 'selectable' && active,
      'pl-[40px]': !!prefixIcon && textAlign !== 'center',
      'pr-[40px]': !!suffixIcon && textAlign !== 'center',
      'justify-center': textAlign === 'center',
      'justify-start': textAlign === 'left',
      'justify-end': textAlign === 'right',
    },
    className,
  );
  const iconClass = clsx(
    'flex items-center justify-center absolute top-0 bottom-0 w-[40px]',
    {
      'left-0': !!prefixIcon,
      'right-0': !!suffixIcon,
    },
  );

  return (
    <button className={rootClass} {...rest}>
      {prefixIcon && <div className={iconClass}>{prefixIcon}</div>}
      {children}
      {suffixIcon && <div className={iconClass}>{suffixIcon}</div>}
    </button>
  );
};
ButtonCustom.defaultProps = {
  prefixIcon: null,
  suffixIcon: null,
  textAlign: 'left',
  active: false,
  className: '',
  variant: 'default',
  onPress: () => {},
};
ButtonCustom.propTypes = {
  children: PropTypes.node.isRequired,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  active: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'selectable']),
  className: PropTypes.string,
  prefixIcon: PropTypes.node,
  suffixIcon: PropTypes.node,
};

export default ButtonCustom;
