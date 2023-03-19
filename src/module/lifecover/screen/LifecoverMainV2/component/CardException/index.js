import React from 'react';

const CardNotValid = ({ img, title, content }) => {
  return (
    <div className="bg-white h-full md:min-h-[380px] shadow-lg rounded-lg px-[15px] pt-[25px] pb-[25px] md:pb-[50px]">
      <div className="lg:max-w-[260px]">
        <img src={img} alt="" className="w-[72px] h-[72px] mb-2" />
        <div className="text-[18px] lg:text-[24px] text-neutral-dark-neutral80 font-semibold mb-3 max-w-[230px]">
          {title}
        </div>
        {content}
      </div>
    </div>
  );
};

export default CardNotValid;
