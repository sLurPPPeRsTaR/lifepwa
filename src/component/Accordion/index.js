import Icon from 'react-icons-kit';
import { useState, useEffect } from 'react';
import { trans } from '@cp-util/trans';
import { chevronUp } from 'react-icons-kit/ionicons';
import locale from './locale';

export default function Accordion({ lang, list, className }) {
  const [active, setActive] = useState([]);

  useEffect(() => {
    let tempState = [];
    list.map((e, idx) => {
      tempState.push({ id: idx, status: false });
    });
    setActive(tempState);
  }, [list]);

  const setHandleActive = (id) => {
    let tempActive = [];
    active.map((e, idx) => {
      if (idx == id) {
        tempActive.push({ id: idx, status: !e?.status });
      } else {
        tempActive.push({ id: idx, status: e.status });
      }
    });
    setActive(tempActive);
  };

  return (
    <div className="divide-y">
      {list.map((item, idx) => (
        <div key={idx} className="flex flex-col">
          <div
            role="button"
            onClick={() => setHandleActive(idx)}
            className={`cursor-pointer w-full p-3 xm:p-5 flex flex-row justify-between items-center mt-4 duration-500 ${
              active[idx]?.status ? 'bg-red-500 text-white rounded-t-3xl' : ''
            }`}>
            <span
              className={`font-black text-xs mr-2 hover:text-red-300 xm:text-base md:text-base`}>
              {item.question}
            </span>
            <Icon
              icon={chevronUp}
              size={20}
              className={`duration-500 group-hover:text-red-300 origin-center ${
                active[idx]?.status ? 'text-white' : 'text-gray-300 rotate-180 '
              }`}
            />
          </div>
          <div
            className={`w-full pt-4 px-2 h-0 !leading-6 duration-500 text-xs xm:text-sm xm:px-4 ${
              active[idx]?.status
                ? 'h-auto pb-5 mb-5 border rounded-b-3xl'
                : 'overflow-hidden'
            }`}>
            {item.answer}

            {item.buttonListRs && (
              <div
                role="button"
                onClick={item.buttonListRs}
                className="text-red-500 pt-5 hover:underline">
                {trans(locale, lang, 'listRs')}
              </div>
            )}
            {item.buttonLandingLC && (
              <div
                role="button"
                onClick={item.buttonLandingLC}
                className="text-red-500 pt-5 hover:underline">
                {trans(locale, lang, 'landingLC')}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
