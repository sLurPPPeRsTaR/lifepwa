import React from 'react';
import {
  KycStep1Active,
  KycStep2,
  UpdataStep2Active,
  KycStep3Active,
  UpdataStep3Active,
  UpdataStep3Inactive,
  UpdataStep4Active,
  UpdataStep4Inactive,
} from '@cp-config/Svgs';

export default function View({ title, step1, step2, step3, step4 }) {
  return (
    <div className="flex flex-col items-center mb-6 mt-4 px-4 md:px-0">
      <div className="flex items-center w-full max-w-full sm:max-w-[75%] gap-2 mb-3 md:gap-4">
        <div className="relative">
          <img src={KycStep1Active} className="w-5 md:w-6" />
          {step1 && (
            <span className="text-red-500 absolute top-8 w-max text-xs font-bold left-1/2 translate-x-[-50%] hidden md:block">
              {title}
            </span>
          )}
        </div>
        <div
          className={`grow h-[1px] rounded-full ${
            step2 || step3 || step4 ? 'bg-red-500' : 'bg-gray-200'
          }`}
        />
        <div className="relative">
          <img
            src={step2 || step3 || step4 ? UpdataStep2Active : KycStep2}
            className="w-5 md:w-6"
          />
          {step2 && (
            <span className="text-red-500 absolute top-8 w-max text-xs font-bold left-1/2 translate-x-[-50%] hidden md:block">
              {title}
            </span>
          )}
        </div>
        <div
          className={`grow h-[1px] rounded-full ${
            step3 || step4 ? 'bg-red-500' : 'bg-gray-200'
          }`}
        />
        <div className="relative">
          <img
            src={step3 || step4 ? UpdataStep3Active : UpdataStep3Inactive}
            className="w-5 md:w-6"
          />
          {step3 && (
            <span className="text-red-500 absolute top-8 w-max text-xs font-bold left-1/2 translate-x-[-50%] hidden md:block">
              {title}
            </span>
          )}
        </div>
        <div
          className={`grow h-[1px] rounded-full ${
            step4 ? 'bg-red-500' : 'bg-gray-200'
          }`}
        />
        <div className="relative">
          <img
            src={step4 ? UpdataStep4Active : UpdataStep4Inactive}
            className="w-5 md:w-6"
          />
          {step4 && (
            <span className="text-red-500 absolute top-8 w-max text-xs font-bold left-1/2 translate-x-[-50%] hidden md:block">
              {title}
            </span>
          )}
        </div>
      </div>
      <p className="w-full text-left text-red-500 text-xs font-bold md:hidden">
        {title}
      </p>
    </div>
  );
}
