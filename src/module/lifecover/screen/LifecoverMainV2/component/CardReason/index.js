import React from 'react';

const CardReason = ({ img, content }) => {
  return (
    <div className="flex w-full h-full flex-col items-center">
      <div className="flex-initial relative z-10 flex-shrink-0">
        <img src={img} alt="" className="w-[100px] h-[100px]" />
      </div>
      <div className="flex-initial relative mt-[-45px] w-full h-full bg-[#FDE8EB] rounded-[12px] pt-[39px] pb-[20px] px-[9px] min-h-[115px]">
        {content}
      </div>
    </div>
  );
};

export default CardReason;
