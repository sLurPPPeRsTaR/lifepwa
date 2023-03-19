import React, { memo, useState } from 'react';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/feather';

function Accordion(props) {
  const {
    header,
    children,
    headerClassName,
    bordered = true,
    contentClassName,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  function renderHeader() {
    return (
      <div
        className={
          headerClassName || 'w-full mt-4 flex flex-row justify-between'
        }
        onClick={() => {
          setIsOpen((old) => !old);
        }}
        role="button">
        {header}
        <Icon
          size={20}
          className={`text-gray-400 duration-300 ${
            isOpen ? '-rotate-180' : ''
          }`}
          icon={chevronDown}
        />
      </div>
    );
  }

  function renderContent() {
    return (
      <div
        className={`w-full overflow-hidden duration-300 ${
          isOpen
            ? `${contentClassName || 'h-auto p-2 mt-2 mb-6 md:p-3'} ${
                bordered && 'shadow-sm border rounded-xl'
              }`
            : 'h-0'
        }`}>
        {children}
      </div>
    );
  }

  return (
    <div className="w-full">
      {renderHeader()}
      {renderContent()}
    </div>
  );
}

export default memo(Accordion);
