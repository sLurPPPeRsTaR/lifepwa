import {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { motion } from 'framer-motion';
import { usePopper } from 'react-popper';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/feather';
import clsx from 'classnames';

const animateTogglerVariants = {
  active: {
    rotate: '180deg',
  },
  default: {
    rotate: '0deg',
  },
};
const animateContentVariants = {
  active: {
    height: 'auto',
    opacity: 1,
  },
  default: {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
  },
};

export const SelectCustomContext = createContext({
  label: null,
  value: '',
  open: false,
  setOpen: () => {},
  setValue: () => {},
  setLabel: () => {},
  onChange: () => {},
});

const Item = ({ value, className, activeClassName, children }) => {
  const {
    value: contextValue,
    setOpen,
    setValue,
    setLabel,
    onChange,
  } = useContext(SelectCustomContext);

  const activeClass = clsx('bg-[#c4c4c4]/20', activeClassName);
  const rootClass = clsx(
    'cursor-pointer px-5 py-4 hover:bg-[#c4c4c4]/10 transition',
    value === contextValue && activeClass,
    className,
  );

  const handleSetvalue = () => {
    setLabel(children);
    setValue(value);
    setOpen(false);
    onChange(value);
  };

  useEffect(() => {
    if (value === contextValue) {
      setLabel(children);
      onChange(value);
    }
  }, [contextValue]);

  return (
    <div data-value={value} onClick={handleSetvalue} className={rootClass}>
      {children}
    </div>
  );
};
const SelectCustom = ({
  label = null,
  value = null,
  placeholder = '',
  children,
  showHeaderDividerOpen = false,
  required = false,
  onChange = (value = null) => {},
}) => {
  const [selectRef, setSelectRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(value);
  const [selectLabel, setSelectLabel] = useState(null);
  const providerValue = useMemo(
    () => ({
      label: selectLabel,
      value: selectValue,
      open,
      setOpen,
      setValue: setSelectValue,
      setLabel: setSelectLabel,
      onChange,
    }),
    [
      selectValue,
      selectLabel,
      open,
      setOpen,
      setSelectValue,
      setSelectLabel,
      onChange,
    ],
  );
  const popperModifiers = useMemo(
    () => [
      {
        name: 'sameWidth',
        enabled: true,
        fn: ({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        phase: 'beforeWrite',
        requires: ['computeStyles'],
      },
    ],
    [],
  );
  const { styles, attributes } = usePopper(selectRef, popperRef, {
    placement: 'bottom-start',
    strategy: 'fixed',
    modifiers: popperModifiers,
  });

  const togglerClass = clsx(
    'h-[56px] bg-white border-[#DADADA]/40 relative z-[20] flex items-center px-5 py-4',
    {
      'border rounded-[16px]': !open,
      'border-t border-l border-r rounded-t-[16px]': open,
    },
  );

  useEffect(() => {
    const unsub = () => {
      setOpen(false);
    };

    if (providerValue.open) {
      window.addEventListener('click', unsub);
    }

    return () => {
      window.removeEventListener('click', unsub);
    };
  }, [providerValue.open]);

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  return (
    <SelectCustomContext.Provider value={providerValue}>
      <div className="flex flex-column">
        {label && (
          <label className="font-semibold mb-1 text-neutral-light-neutral40 text-[11px] lg:text-xs">
            {label}
          </label>
        )}
        {required ? (
          <div className="pl-[2px] text-body-2 text-primary-light-primary90 font-semibold">
            *
          </div>
        ) : null}
      </div>
      <div
        ref={setSelectRef}
        className="relative"
        onClick={(e) => e.stopPropagation()}>
        <div
          role="button"
          onClick={() => setOpen(!open)}
          className={togglerClass}>
          <div className="flex-1">
            {providerValue.value ? (
              <div className="text-neutral-dark-neutral60 font-medium">
                {providerValue.label}
              </div>
            ) : (
              <div className="text-[#030D1B]/40 select-none">{placeholder}</div>
            )}
          </div>
          <div className="flex-initial">
            <motion.div
              key={providerValue.value}
              variants={animateTogglerVariants}
              animate={open ? 'active' : 'default'}
              initial={open ? 'active' : 'default'}>
              <Icon icon={chevronDown} className="text-[#C3C5CC]" size={24} />
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        ref={setPopperRef}
        key={providerValue.value}
        variants={animateContentVariants}
        animate={open ? 'active' : 'default'}
        initial="default"
        style={styles.popper}
        className="bg-white rounded-b-[16px] border-l border-r border-b border-[#DADADA]/40 overflow-hidden z-[998]"
        {...attributes.popper}>
        {showHeaderDividerOpen && providerValue.open && (
          <div className="px-5">
            <hr />
          </div>
        )}
        {children}
      </motion.div>
    </SelectCustomContext.Provider>
  );
};

export default Object.assign(SelectCustom, {
  Item,
});
