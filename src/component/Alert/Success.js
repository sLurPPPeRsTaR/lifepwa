import { KycChecklistRound } from '@cp-config/Svgs';
import React from 'react';

export default function Success({ title }) {
  return (
    <div className="flex items-center gap-2 rounded-3xl py-3 px-5 bg-green-200 sm:py-4">
      <img src={KycChecklistRound} className="w-8" />
      <p className="text-xs xm:text-sm">{title}</p>
    </div>
  );
}
