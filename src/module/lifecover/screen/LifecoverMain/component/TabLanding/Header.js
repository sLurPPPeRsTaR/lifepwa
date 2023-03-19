import React from 'react';

const TabHeader = ({ children }) => {
  return (
    <div className="relative flex text-[11px] sm:text-[14px] h-[58px] border-b border-black/10">
      {children}
    </div>
  );
};

export default TabHeader;
