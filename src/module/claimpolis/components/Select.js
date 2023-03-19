import clsx from 'classnames';
import Select from 'react-select';
import { useState, useEffect } from 'react';
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
  placeholder,
  defaultValue,
}) {
  const [msg, setMsg] = useState('');
  const [fontColor, setFontColor] = useState('');

  useEffect(() => {
    if (message?.normal) {
      setMsg(message?.normal);
      setFontColor('text-neutral-light-neutral-60');
    }
    if (message?.success) {
      setMsg(message?.success);
      setFontColor('text-success-light-success90');
    }
    if (message?.warning) {
      setMsg(message?.warning);
      setFontColor('text-warning-light-warning90');
    }
    if (message?.error) {
      setMsg(message?.error);
      setFontColor('text-red-500');
    }
  }, [message]);

  function renderLabel() {
    if (label) {
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-end">
            <div className=" font-semibold mb-1 text-neutral-light-neutral40 text-[11px] lg:text-xs">
              {label}
            </div>
            {required ? (
              <sup className="text-body-2 text-primary-light-primary90 font-semibold">
                *
              </sup>
            ) : null}
          </div>
          {additionalLabel && additionalLabel}
        </div>
      );
    }

    return null;
  }

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
          placeholder={placeholder}
          defaultInputValue={defaultValue?.label}
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
              boxShadow: 'none',
              border: 0,
              padding: '5px',
            }),
          }}
          className="w-full h-full rounded-xl"
          options={options}
          onKeyDown={(e) => {
            console.log(e)
          }}
        />
      </div>
    );
  }

  function renderMessage() {
    if (message) {
        return (
          <p className={clsx('text-caption2 font-medium mt-1', fontColor)}>
            <>{msg}</>
          </p>
        );
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
