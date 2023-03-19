import React from 'react';
import Icon from 'react-icons-kit';
import { checkmarkRound } from 'react-icons-kit/ionicons/checkmarkRound';

const CheckCustom = ({
  type = 'checkbox', // checkbox | radio
  checked,
  ...rest
}) => {
  const renderIndicator = () => {
    if (type === 'checkbox') {
      return (
        <>
          <div className="peer-checked:bg-primary-dark-primary90 bg-[#666B6F]/20 absolute rounded-sm w-[16px] h-[16px]"></div>
          <div className="peer-checked:block hidden absolute pb-[2px]">
            <Icon icon={checkmarkRound} className="text-white" size={10} />
          </div>
        </>
      );
    }
    return (
      <>
        <div className="peer-checked:border-primary-dark-primary90 absolute border border-neutral-light-neutral20 rounded-full w-[16px] h-[16px]"></div>
        <div className="peer-checked:bg-primary-dark-primary90 absolute bg-white rounded-full w-[12px] h-[12px]" />
      </>
    );
  };

  return (
    <div className="flex-initial relative w-[16px] h-[16px] flex items-center justify-center">
      <input type={type} className="peer hidden" checked={checked} {...rest} />
      {renderIndicator()}
    </div>
  );
};

export default CheckCustom;
