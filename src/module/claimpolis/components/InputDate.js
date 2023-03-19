import clsx from 'classnames';
import { useEffect, useState } from 'react';
import moment from 'moment';

// Datepicker from "flatpickr"
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_red.css';
import 'flatpickr/dist/l10n/id.js';

function Component({
    className,
    handleOnChange = () => { },
    label,
    message,
    placeholder,
    required,
    disabled,
    additionalLabel,
    format,
    dateOptions,
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
        return (
            <div
                className={clsx(
                    clsx('relative flex gap-2 items-center rounded-xl border  shadow-sm text-xs px-3 lg:py-4 lg:text-sm border-neutral-light-neutral20 h-11 lg:h-12'),
                    className,
                    disabled
                        ? 'bg-gray-100'
                        : 'bg-main-light-white hover:border-gray-500 focus:border-gray-500',
                )}>
                <Flatpickr
                    options={{
                        ...dateOptions
                    }}
                    onChange={([date]) => {
                        handleOnChange(
                            moment(date).format(format ? format : 'YYYY-MM-DD'),
                            // date,
                        );
                    }}
                    render={({ value }, pRef) => {
                        return (
                            <input
                                className={clsx('w-full outline-none bg-transparent placeholder-gray-400')}
                                disabled={disabled ? disabled : false}
                                placeholder={placeholder}
                                ref={pRef}
                            />
                        );
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
