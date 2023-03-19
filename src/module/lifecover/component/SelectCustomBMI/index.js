import clsx from 'classnames';
import { components } from 'react-select';
import SelectCustomV2 from '../SelectCustomV2';

const MenuBMI = ({ children, hasValue, selectProps, ...rest }) => {
  console.log(children);
  return (
    <components.Menu
      theme={(theme) => ({ borderRadius: 50, position: 'relative' })}
      {...rest}>
      <div className="text-[#C4C4C4] text-[12px] px-3 pt-3">
        {selectProps.labelMenu}
      </div>
      <div className="flex justify-center flex-row gap-3">
        <div className="flex-1" />
        <div className="flex-initial relative">
          <div className="flex-initial text-center min-w-[100px]">
            {children}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-start">
          {hasValue && (
            <div className="absolute z-40">
              <div className="text-neutral-light-neutral90 font-semibold">
                {selectProps.labelUnit}
              </div>
            </div>
          )}
        </div>
      </div>
    </components.Menu>
  );
};
const SingleValueBMI = ({ children, selectProps, ...rest }) => {
  return (
    <components.SingleValue {...rest}>
      <div className="flex w-full gap-3 items-start">
        <div className="flex-1">{children}</div>
        <div className="flex-initial">{selectProps.labelUnit}</div>
      </div>
    </components.SingleValue>
  );
};
const OptionBMI = ({ data, isDisabled, selectProps, children, ...rest }) => {
  return (
    <components.Option isDisabled={isDisabled} {...rest}>
      <div className="flex gap-3 items-start justify-center border-b py-3">
        <div className="flex-initial">{children}</div>
        <div className="flex-initial">{selectProps.labelUnit}</div>
      </div>
    </components.Option>
  );
};

const SelectCustomBMI = ({
  defaultValue,
  isClearable = false,
  options = [],
  placeholder = 'Select Option',
  labelUnit,
  value,
  isDisabled = false,
  onChange = (option) => {},
}) => {
  // font-semibold mb-1 text-neutral-light-neutral40 text-[11px] lg:text-xs
  return (
    <SelectCustomV2
      defaultValue={defaultValue}
      isClearable={isClearable}
      options={options}
      placeholder={placeholder}
      labelUnit={labelUnit}
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      components={{
        Option: OptionBMI,
        SingleValue: SingleValueBMI,
      }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          padding: '3px',
          borderRadius: '16px',
          backgroundColor: state.isDisabled ? '#EBEEF0' : 'white',
          '@media screen and (min-width: 1024px)': {
            padding: '9px',
          },
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isSelected
            ? 'rgba(255, 134, 148, .2)'
            : 'transparent',
          color: '#030D1B !important',
          padding: '0 10px',
          fontSize: '10px',
          '&:active': {
            backgroundColor: 'rgba(80, 82, 84, 0.2)',
          },
          '@media screen and (min-width: 350px)': {
            fontSize: '12px',
          },
          '@media screen and (min-width: 1024px)': {
            fontSize: '14px',
          },
          borderBottom: state.isSelected ? '1.5px solid #ED1C24' : 'none',
        }),
      }}
    />
  );
};

export default SelectCustomBMI;
