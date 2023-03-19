import clsx from 'classnames';
import { useMemo } from 'react';

export default function Component({
  auto,
  bordered,
  children,
  className,
  disabled,
  full,
  onButtonClick,
  prefixIcon,
  outline,
  shadow,
  type,
  ...props
}) {
  const Main = useMemo(() => {
    return (
      <div
        {...props}
        role="button"
        onClick={!disabled ? onButtonClick : () => {}}
        className={clsx(
          'flex gap-2 justify-center items-center rounded-2xl font-semibold',
          shadow && 'shadow',
          !full && 'max-w-[320px]',
          disabled
            ? 'bg-grayButton-light-grayButton text-gray-500 cursor-auto'
            : 'text-white',
          type === 'linear-gradient' &&
            !disabled &&
            'bg-gradient-to-r  from-[#F25D63] to-[#ED1C24]',
          type === 'bg-light' &&
            disabled &&
            'bg-grayButton-light-grayButton text-gray-500 cursor-auto',
          type === 'bg-light' && !disabled && 'bg-red-light-red20',
          type === 'bg-yellow' &&
            !disabled &&
            'bg-[#EEAC5C] !text-black shadow-md shadow-yellow-600 duration-300 hover:shadow-sm hover:!text-white',
          outline && 'bg-main-light-whites border-[1.5px]',
          bordered && 'border border-red-300',
          outline && '!text-primary-light-primary90',
          !auto && 'w-full h-10 xm:h-12',
          className,
        )}>
        {prefixIcon && prefixIcon}
        {children}
      </div>
    );
  }, [
    props,
    disabled,
    onButtonClick,
    shadow,
    full,
    type,
    outline,
    bordered,
    auto,
    className,
    prefixIcon,
    children,
  ]);

  return Main;
}
