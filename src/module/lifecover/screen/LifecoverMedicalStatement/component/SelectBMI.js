import clsx from 'classnames';
import { SelectCustom } from '@cp-module/lifecover/component';
import { useRef } from 'react';

const Item = ({ value, children, selected }) => {
  const activeClass = clsx(
    'font-bold border-b-2 border-primary-dark-primary90',
  );
  const rootClass = clsx(
    'h-[32px] w-[86px] flex items-center justify-center !px-0',
  );

  return (
    <SelectCustom.Item
      value={value}
      selected={selected}
      className={rootClass}
      activeClassName={activeClass}>
      {children}
    </SelectCustom.Item>
  );
};
const SelectBMI = ({
  label,
  placeholder,
  children,
  value,
  unit = 'Kg',
  onChange,
}) => {
  const wrapperRef = useRef(null);

  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
    if (wrapperRef.current) {
      // console.log(wrapperRef.current.querySelector(`[data-value="${value}"]`))
      wrapperRef.current.scrollTop =
        wrapperRef.current.querySelector(`[data-value="${value}"]`).offsetTop -
        80;
    }
  };

  return (
    <SelectCustom
      label={label}
      value={value}
      placeholder={placeholder}
      showHeaderDividerOpen
      onChange={handleChange}>
      <div className="relative flex justify-center flex-row gap-3">
        <div className="flex-1" />
        <div className="flex-initial relative">
          <div
            className="h-[1px] absolute z-10 flex-1 bg-white w-full top-0 left-0 right-0"
            style={{ boxShadow: '0px 30px 50px 32px #FFFFFF' }}
          />
          <div
            ref={wrapperRef}
            className="h-[200px] overflow-x-hidden overflow-y-auto scroll-smooth scrollbar-hide">
            {children}
          </div>
          <div
            className="h-[1px] absolute z-10 flex-1 bg-white w-full bottom-0 left-0 right-0"
            style={{ boxShadow: '0px -30px 50px 24px #FFFFFF' }}
          />
        </div>
        <div className="flex-1 text-right flex justify-start items-center">
          <span className="text-neutral-light-neutral90 font-semibold">
            {unit}
          </span>
        </div>
      </div>
    </SelectCustom>
  );
};

export default Object.assign(SelectBMI, {
  Item,
});
