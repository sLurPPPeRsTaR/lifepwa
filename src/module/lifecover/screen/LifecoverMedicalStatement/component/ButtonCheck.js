import clsx from 'classnames';
import { CheckCustom } from '@cp-module/lifecover/component';

const ButtonCheck = ({
  label,
  wrapperClassName,
  checked,
  disabled = false,
  ...rest
}) => {
  const Component = disabled ? 'div' : 'label';

  const wrapperClass = clsx(
    `relative text-[12px] lg:text-[14px] text-gray-400 flex items-center w-full rounded-[16px] font-medium cursor-pointer`,
    {
      'bg-white border border-neutral-light-neutral20 px-[13.5px] lg:px-[20px] py-[12px] lg:py-[15px]':
        !disabled,
      'bg-[#EBEEF0] px-[14px] lg:px-[21px] py-[13px] lg:py-[16px]': disabled,
    },
    wrapperClassName,
  );

  return (
    <Component className={wrapperClass}>
      <div className="flex-1">{label}</div>
      <CheckCustom type="radio" checked={checked} {...rest} />
    </Component>
  );
};

export default ButtonCheck;
