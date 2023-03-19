import clsx from 'classnames';
import { useEffect, useState } from 'react';

function Component({
    className,
    handleOnChange,
    label,
    message,
    handleOnFocus,
    placeholder,
    required,
    suffixIcon,
    disabled,
    maxLength,
    inputClassName,
    placeholderColor,
    additionalLabel,
    items,
    getItemSelected,
    onSearch,
    value,
}) {
    const [msg, setMsg] = useState('');
    const [fontColor, setFontColor] = useState('');
    const [showMenu, setShowMenu] = useState(false)
    const [inputValue, setInputValue] = useState(value)

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

    function RenderLabel() {
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

    function RenderMenu() {
        if (items?.length > 0 && showMenu) {
            return (
                <div className='w-full absolute bg-white border rounded z-50 shadow text-black' style={{ top: "54px" }}>
                    {
                        items?.map((item, index) => {
                            return (
                                <button key={index} className='w-full text-left hover:bg-[#dceafc] py-2 px-3' onClick={() => {
                                    setInputValue({ label: item?.label, value: item?.value })
                                    getItemSelected(item)
                                    setShowMenu(false)
                                }}>
                                    {item.label}
                                </button>
                            )
                        })
                    }
                </div>
            )
        }
    }

    function RenderInput() {
        return (
            <div
                className={clsx(
                    clsx('relative flex gap-2 items-center rounded-xl border shadow-sm text-xs lg:text-sm border-neutral-light-neutral20 h-11 lg:h-12'),
                    className,
                    disabled ? 'bg-gray-100' : 'bg-main-light-white hover:border-gray-500 focus:border-gray-500',
                )}>
                <div className='px-3 lg:py-4 w-full flex'>
                    <input
                        className={clsx(
                            'w-full outline-none bg-transparent text-black',
                            inputClassName,
                            placeholderColor ? placeholderColor : 'placeholder-gray-400',
                        )}
                        onFocus={(e) => {
                            setShowMenu(true)
                            handleOnFocus(e)
                        }}
                        disabled={disabled ? disabled : false}
                        placeholder={placeholder}
                        value={inputValue?.label}
                        maxLength={maxLength}
                        onChange={(e) => {
                            e.preventDefault();
                            setInputValue({ label: e.target.value, value: '' });
                            handleOnChange(e.target?.value);
                        }}
                    />
                    <div className='pl-2'>
                        {suffixIcon && suffixIcon}
                    </div>
                </div>
                <RenderMenu />
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
            {RenderLabel()}
            {RenderInput()}
            {renderMessage()}
        </div>
    );
}

Component.defaultProps = {
    handleOnFocus: () => { },
    handleOnBlur: () => { },
    handleOnChange: () => { },
}

export default Component;
