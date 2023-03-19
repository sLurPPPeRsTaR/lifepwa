import clsx from 'classnames';
import { useEffect, useState } from 'react';
import moment from 'moment';

// Datepicker from "flatpickr"
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_red.css';
import 'flatpickr/dist/l10n/id.js';

function Component({
  active,
  inputMode,
  className,
  handleOnChange = () => {},
  isBajoRun,
  isBajoRunMessage = 'Mohon gunakan nomor HP atau Email yang terdaftar pada IFG Labuan Bajo Marathons',
  label,
  message,
  onBlur,
  onFocus,
  placeholder,
  prefixIcon,
  required,
  suffixIcon,
  type = 'text',
  value,
  disabled,
  labelRadio,
  checked,
  role,
  disableBgWhite,
  maxLength,
  inputClassName,
  isTextarea,
  placeholderColor,
  textareaClassName,
  autoFocus,
  ref,
  additionalLabel,
  valueDate,
  accept,
  lang = 'id',
  maxDate,
  formatDateInput = 'DD-MM-YYYY',
  formatDateOutput = 'DD MMM YYYY',
}) {
  const [msg, setMsg] = useState('');
  const [fontColor, setFontColor] = useState('');

  let monthID = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];
  let monthEN = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var date = moment(valueDate, 'DD-MM-YYYY', true);
  let monthName = '';
  if (lang === 'id') {
    monthName = monthID[date.month()];
  } else {
    monthName = monthEN[date.month()];
  }

  let defaultValudeDatePicker = `${date.format(
    'DD',
  )} ${monthName} ${date.format('YYYY')}`;

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
              <sup className="text-primary-light-primary90">*</sup>
            ) : null}
          </div>
          {additionalLabel && additionalLabel}
        </div>
      );
    }

    return null;
  }

  function renderInput() {
    const classNameInput = clsx(
      clsx(
        'relative flex gap-2 items-center rounded-xl border  shadow-sm text-xs px-3 lg:py-4 lg:text-sm border-neutral-light-neutral20',
      ),
      className,
      isTextarea ? 'h-auto' : 'h-11 lg:h-12',
      disabled
        ? disableBgWhite
          ? ''
          : 'bg-gray-100'
        : 'bg-main-light-white hover:border-gray-500 focus:border-gray-500',
      {
        'cursor-pointer border border-red-400 bg-red-100 hover:border-red-600 text-red-300':
          active && role === 'button',
        'text-[#C3C5CC]': !active && role === 'button',
        'border-secondary-light-secondary90': isBajoRun,
      },
    );

    if (type === 'date') {
      return (
        <Flatpickr
          options={{
            allowInput: false,
            enableTime: false,
            dateFormat: 'd M Y',
            defaultDate: defaultValudeDatePicker,
            maxDate: maxDate || null,
            locale: lang || 'id',
            disableMobile: true,
          }}
          onChange={([date]) => {
            handleOnChange(moment(date).format(formatDateInput));
          }}
          render={({ value }, ref) => {
            const isValid = moment(valueDate, formatDateInput, true).isValid();
            return (
              <div ref={ref} role={role} className={classNameInput}>
                {prefixIcon && prefixIcon}
                <p
                  className={clsx(
                    'w-full outline-none bg-transparent text-left',
                    inputClassName,
                    valueDate ? 'text-black' : 'text-gray-400',
                  )}>
                  {isValid
                    ? moment(valueDate, formatDateInput, true).format(
                        formatDateOutput,
                      )
                    : placeholder}
                </p>
                {suffixIcon && suffixIcon}
              </div>
            );
          }}
        />
      );
    }

    return (
      <div
        role={role}
        ref={ref}
        onClick={() =>
          role === 'button' && typeof handleOnChange === 'function'
            ? handleOnChange()
            : null
        }
        className={classNameInput}>
        {prefixIcon && prefixIcon}
        {role === 'button' ? (
          <div
            role="button"
            className={`w-full text-body2 font-medium text-black ${inputClassName}`}>
            {value}
          </div>
        ) : (
          <>
            {isTextarea ? (
              <textarea
                maxLength={300}
                placeholder={placeholder}
                className={`h-[200px] w-full outline-none ${textareaClassName}`}
                onChange={(e) => {
                  if (type == 'radio') {
                    handleOnChange(e.target?.value);
                  } else {
                    e.preventDefault();
                    handleOnChange(e.target?.value);
                  }
                }}></textarea>
            ) : (
              <input
                className={clsx(
                  'w-full outline-none bg-transparent',
                  inputClassName,
                  placeholderColor ? placeholderColor : 'placeholder-gray-400',
                )}
                type={type}
                accept={accept}
                autoFocus={autoFocus}
                onBlur={onBlur}
                onFocus={onFocus}
                inputMode={inputMode}
                disabled={disabled ? disabled : false}
                placeholder={placeholder}
                checked={type == 'radio' ? checked : null}
                value={value}
                maxLength={maxLength}
                onChange={(e) => {
                  if (type == 'radio') {
                    handleOnChange(e.target?.value);
                  } else {
                    e.preventDefault();
                    handleOnChange(e.target?.value);
                  }
                }}
                ref={ref}
              />
            )}
          </>
        )}
        {type == 'radio' ? (
          <param className="whitespace-nowrap font-medium opacity-50">
            {labelRadio}
          </param>
        ) : null}
        {/* {type == 'date' ? (
          <p
            className={`absolute bg-white h-full w-3/5 flex items-center ${
              valueDate ? '' : 'text-gray-400'
            }`}>
            {valueDate ? valueDate : placeholder}
          </p>
        ) : null} */}

        {suffixIcon && suffixIcon}
      </div>
    );
  }

  function renderMessage() {
    if (message || isBajoRun) {
      return (
        <p className={clsx('text-caption2 font-medium mt-1', fontColor)}>
          {isBajoRun ? (
            <span className="text-secondary-light-secondary90">
              {isBajoRunMessage}
            </span>
          ) : (
            <>{msg}</>
          )}
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
