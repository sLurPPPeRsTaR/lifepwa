import clsx from 'classnames';
import Select, { components } from 'react-select';

const SingleValueWithIcon = ({ data, children, ...rest }) => {
  return (
    <components.SingleValue {...rest}>
      <div className="flex w-full gap-3 items-start">
        <div className="flex-initial">
          <img src={data?.icon} width={20} height={20} alt="" />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </components.SingleValue>
  );
};
const OptionWithIcon = ({ data, isDisabled, children, ...rest }) => {
  const imgClass = clsx('mb-1', {
    grayscale: isDisabled,
  });
  return (
    <components.Option isDisabled={isDisabled} {...rest}>
      <div className="flex gap-3 items-start border-b">
        <div className="flex-initial">
          <img
            src={data?.icon}
            width={20}
            height={20}
            alt=""
            className={imgClass}
          />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </components.Option>
  );
};
const MenuWithIcon = ({ children, selectProps, ...rest }) => {
  return (
    <components.Menu theme={(theme) => ({ borderRadius: 50 })} {...rest}>
      <div className="text-[#C4C4C4] text-[12px] px-3 pt-3">
        {selectProps.menuLabel}
      </div>
      <div className="divide-y">{children}</div>
    </components.Menu>
  );
};

const SelectCustomV2 = ({
  defaultValue,
  isClearable = false,
  options = [],
  components,
  placeholder = 'Select Option',
  labelMenu,
  styles,
  value,
  isDisabled = false,
  borderColor = '',
  onChange = (option) => {},
  ...rest
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      isClearable={isClearable}
      options={options}
      components={components}
      placeholder={placeholder}
      labelMenu={labelMenu}
      value={value}
      isDisabled={isDisabled}
      onChange={onChange}
      isSearchable
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor:
            borderColor !== ''
              ? borderColor
              : state.isFocused
              ? 'rgba(107, 114, 128, 1)'
              : 'rgba(213, 213, 213, 1)',
          marginBottom: 5,
          color: 'rgba(80, 82, 84, 1)',
          fontSize: '12px',
          fontWeight: 500,
          borderRadius: 12,
          boxShadow: 'none',
          outline: 'none',
          '&:hover': {
            borderColor: 'rgba(107, 114, 128, 1)',
          },
          '@media screen and (min-width: 1024px)': {
            padding: '5px 3px',
            fontSize: '14px',
          },
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: 'rgba(80, 82, 84, 0.5)',
          fontSize: '12px',
          '@media screen and (min-width: 1024px)': {
            fontSize: '14px',
          },
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          borderRadius: 16,
          zIndex: 999,
          overflow: 'hidden',
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          '::-webkit-scrollbar': {
            display: 'none',
            visibility: 'hidden',
          },
          '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#888',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isSelected
            ? 'rgba(255, 134, 148, .2)'
            : 'transparent',
          color: '#030D1B !important',
          padding: '10px 10px',
          fontSize: '12px',
          '&:active': {
            backgroundColor: 'rgba(80, 82, 84, 0.2)',
          },
          '@media screen and (min-width: 1024px)': {
            fontSize: '14px',
          },
        }),
        ...styles,
      }}
      {...rest}
    />
  );
};

export default Object.assign(SelectCustomV2, {
  SingleValueWithIcon,
  OptionWithIcon,
  MenuWithIcon,
});
