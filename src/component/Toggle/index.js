import React from 'react';

export default function index({ onClick, setActive, active }) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={`flex w-9 h-5 border-2 rounded-full items-center duration-500 md:w-11 md:h-6 ${
        active
          ? 'bg-green-500 border-green-500 justify-end'
          : 'bg-gray-300 border-gray-300 justify-start'
      }`}>
      <div className="w-4 h-4 rounded-full bg-white md:w-5 md:h-5"></div>
    </div>
  );
}
