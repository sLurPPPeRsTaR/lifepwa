import React from 'react';

const CardCoverage = ({ lang, title, content, onClickDetail = () => {} }) => {
  const renderButtonText = () => {
    switch (lang) {
      case 'en':
        return 'See Detail';
      default:
        return 'Lihat Detail';
    }
  };

  return (
    <div className="bg-white/80 lg:bg-white/30 relative rounded-[16px] lg:pt-8 pt-5 px-[20px] pb-[20px] overflow-hidden  min-h-full  w-full">
      <div className="absolute top-0 inset-x-0 bg-gradient-orange h-[10px] w-full" />

      <div className="text-neutral-dark-neutral80  lg:text-white max-w-[220px] w-full text-sm lg:text-[18px] md:text-2xl xm:text-xl lg:leading-7 leading-none font-semibold mb-3">
        {title}
      </div>
      <p className="text-neutral-dark-neutral80 lg:text-white max-w-[200px] lg:text-sm xm:text-sm text-xs font-medium mb-3">
        {content}
      </p>

      <button
        onClick={onClickDetail}
        className="text-[14px] text-primary-dark-primary90 lg:text-secondary-dark-secondary20 bottom-[15px] font-semibold underline mb-2">
        {renderButtonText()}
      </button>
    </div>
  );
};

export default CardCoverage;
