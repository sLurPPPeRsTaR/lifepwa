import _ from 'lodash';
import clsx from 'classnames';
import Image from 'next/image';
import locale from './locale';
import { Icon } from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import { Modal } from '@cp-component';
import { x } from 'react-icons-kit/feather';
import { chevronRight } from 'react-icons-kit/ionicons';
import { LsFooter1, LsFooter2, LsFooter3 } from '@cp-config/Svgs';

export default function Component(props) {
  const { lang, isOpen, setClose } = props;

  const dataHelp = [
    {
      id: 'wa',
      icon: LsFooter3,
      title: 'WhatsApp Lifia',
      link: 'https://api.whatsapp.com/send/?phone=628111372848',
    },
    {
      id: 'call',
      icon: LsFooter1,
      title: 'Call Center 1500176',
      link: 'tel:1500176',
    },
    {
      id: 'email',
      icon: LsFooter2,
      title: 'customer_care@ifg-life.id',
      link: 'customer_care@ifg-life.id',
    },
  ];

  return (
    <Modal isOpen={isOpen} size="sm">
      <div className="flex pl-3 pb-6 items-center">
        <Icon
          icon={x}
          size={20}
          className="cursor-pointer"
          onClick={() => setClose(false)}
        />
        <p className="text-base w-full text-center font-bold pl-4 mt-1">
          {trans(locale, lang, 'title')}
        </p>
        <div className='w-10'></div>
      </div>

      <div className="flex flex-col divide-y pb-3">
        {dataHelp.map((item, idx) => (
          <div
            key={idx}
            role="button"
            onClick={() =>
              item.id == 'email'
                ? (window.location = `mailto:${item.link}`)
                : window.open(item.link, '_blank')
            }
            className="group flex items-center justify-between rounded-md duration-500 p-2 hover:bg-red-100 xm:px-4 xm:py-5">
            <div className="flex gap-5 items-center">
              <Image src={item.icon} width={20} height={20} />
              <div className="text-xs xm:text-body2 font-semibold text-[#202021]">
                {trans(locale, lang, item.title)}
              </div>
            </div>
            <Icon
              icon={chevronRight}
              className="text-gray-300 duration-500 group-hover:text-red-dark-red90"
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
