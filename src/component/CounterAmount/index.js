import React from 'react';

export default function index({ amount, setMin, setPlus, index }) {
  return (
    <div className="flex justify-center font-bold">
      <div
        role="button"
        onClick={setMin}
        className={`select-none w-6 h-6 border grid place-content-center rounded-l-md duration-300 bg-gray-200 xm:w-8 xm:h-8  
        ${index !== 0 ? 'text-red-500 hover:bg-gray-100' : ''}
        ${index === 0 && amount > 1 ? 'text-red-500 hover:bg-gray-100' : ''}
        `}>
        -
      </div>
      <input
        type="number"
        value={amount}
        inputMode="numeric"
        className="text-center font-bold text-xs px-2 h-6 w-10 border outline-none xm:text-sm xm:h-8 xm:w-12"
      />
      <div
        role="button"
        onClick={setPlus}
        className="select-none text-red-500 w-6 h-6 border grid place-content-center rounded-r-md duration-300 bg-gray-200 hover:bg-gray-100 xm:w-8 xm:h-8">
        +
      </div>
    </div>
  );
}
