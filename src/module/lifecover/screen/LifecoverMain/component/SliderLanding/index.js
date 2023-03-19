import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderLanding = ({ value, onChange = (value = null) => {} }) => {
  return (
    <div className="relative flex items-center">
      <div className="flex-initial absolute z-10 left-[-5px] w-[10px] h-[10px] bg-[#ED1C24] rounded-full" />
      <div className="flex-1">
        <Slider
          step={100 * 1e6}
          min={300 * 1e6}
          value={value}
          max={1500 * 1e6}
          trackStyle={{ backgroundColor: '#ED1C24' }}
          dotStyle={{
            backgroundColor: '#ED1C24',
            border: 'none',
            width: '10px',
            height: '10px',
            top: '-3.5px',
          }}
          onChange={onChange}
        />
      </div>
      <div className="flex-initial absolute z-10 right-[-5px] w-[10px] h-[10px] bg-[#ED1C24] rounded-full" />
    </div>
  );
};

export default SliderLanding;
