import Icon from 'react-icons-kit';
import { useState } from 'react';
import { trans } from '@cp-util/trans';
import { chevronUp } from 'react-icons-kit/ionicons';
import locale from './locale';

export default function Accordion2({ lang, list, className }) {
  const [active, setActive] = useState({});
  // const setHandleActive = (val) => {
  //   if (active == val) {
  //     setActive(0);
  //   } else {
  //     setActive(val);
  //   }
  // };

  return (
    <div className="divide-y">
      {list.map((item, idx) => (
        <div key={idx} className="flex flex-col">
          <div
            onClick={() =>
              setHandleActive({ id: idx + 1, status: !active.status })
            }
            className={`cursor-pointer w-full p-3 xm:p-5 flex flex-row justify-between items-center mt-4 duration-500 ${
              active.id == idx + 1 && active.status
                ? 'bg-red-500 text-white rounded-t-3xl'
                : ''
            }`}>
            <span
              className={`font-black text-xs mr-2 hover:text-red-300 xm:text-base md:text-base`}>
              {item.question}
            </span>
            <Icon
              icon={chevronUp}
              size={20}
              className={`duration-500 group-hover:text-red-300 origin-center ${
                active.id == idx + 1 && active.status ? 'text-white' : 'text-gray-300 rotate-180 '
              }`}
            />
          </div>
          <div
            className={`w-full pt-4 px-2 h-0 !leading-6 duration-500 text-xs xm:text-sm xm:px-4 ${
              active.id == idx + 1 && active.status
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
          </div>
        </div>
      ))}
    </div>
  );
}
