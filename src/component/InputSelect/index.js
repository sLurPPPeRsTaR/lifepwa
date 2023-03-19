import clsx from 'classnames';
import Select, { components } from 'react-select';
import { useState } from 'react';
import { record } from 'react-icons-kit/iconic/record';
import { Icon } from 'react-icons-kit';
function Component({
  active,
  className,
  handleOnChange,
  label,
  message,
  required,
  disabled,
  role,
  disableBgWhite,
  options,
  ref,
  additionalLabel,
  selectedOption,
  placeholder
}) {
  const [msg, setMsg] = useState('');

  function renderLabel() {
    if (label) {
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-end">
            <div className=" font-semibold mb-1 text-neutral-light-neutral40 text-[11px] lg:text-xs">
              {label}
            </div>
            {required ? (
              <div className="pl-[2px] text-body-2 text-primary-light-primary90 font-semibold">
                *
              </div>
            ) : null}
          </div>
          {additionalLabel && additionalLabel}
        </div>
      );
    }

    return null;
  }

  const CustomOption = ({ children, ...props }) => {
    return (
      <components.Control {...props}>
        <div>{children}</div>
        <Icon
          icon={record}
          size={22}
          className={`${
            props.data.value === selectedOption ? 'text-red-500' : 'text-white'
          } border-solid p-0 border-2 border-red-500 rounded-full`}
        />
      </components.Control>
    );
  };

  function renderInput() {
    return (
      <div
        role={role}
        ref={ref}
        onClick={() =>
          role === 'button' && typeof handleOnChange === 'function'
            ? handleOnChange()
            : null
        }
        className={clsx(
          clsx('flex gap-2 items-center text-xs xm:text-sm h-11 lg:h-12'),
          className,
          disabled
            ? disableBgWhite
              ? ''
              : 'bg-gray-100'
            : 'bg-main-light-white hover:border-gray-500 focus:border-gray-500',
          {
            'cursor-pointer border border-red-400 bg-red-100 hover:border-red-600 text-red-300':
              active && role === 'button',
            'text-[#C3C5CC]': !active && role === 'button',
          },
        )}>
        <Select
          maxMenuHeight={"160px"}
          placeholder={placeholder}
          value={options?.find((data) => data.value === selectedOption)}
          onChange={(val) => {
            handleOnChange(val);
          }}
          styles={{
            container: (baseStyles) => ({
              ...baseStyles,
              border: '1px solid #C8CACD',
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: 12,
              height: '100%',
              // This line disable the blue border
              boxShadow: 'none',
              border: 0,
              padding: '5px',
            }),
          }}
          className="w-full h-full rounded-xl"
          components={{ Option: CustomOption }}
          options={options}
        />
      </div>
    );
  }

  function renderMessage() {
    if (message) {
      return <>{msg}</>;
    }
    return null;
  }

  return (
    <div className={className}>
      {renderLabel()}
      {renderInput()}
      {renderMessage()}
    </div>
  );
}

export default Component;
