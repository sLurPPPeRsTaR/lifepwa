import _ from 'lodash';
import clsx from 'classnames';
import Image from 'next/image';
import locale from './locale';
import { Icon } from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import { Modal } from '@cp-component';
import { x } from 'react-icons-kit/feather';
import { infoCircle } from 'react-icons-kit/fa';
import { chevronRight } from 'react-icons-kit/ionicons';
import { Handphone, Message } from '@cp-config/Svgs';

export default function Component(props) {
  const {
    lang,
    isOpen,
    toggle,
    email,
    number,
    action,
    handleClick,
    setOtpSendto,
  } = props;

  const listOption = [
    {
      id: 'email',
      icon: Message,
      title: email,
      link: 'https://api.whatsapp.com/send/?phone=628111372848',
    },
    {
      id: 'nomorHp',
      icon: Handphone,
      title: number,
      link: 'tel:1500176',
    },
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="sm">
      <div className="flex pl-3 pb-6 items-center">
        <Icon
          icon={x}
          size={20}
          className="cursor-pointer"
          onClick={() => toggle(false)}
        />
        <p className="text-base w-full text-center font-bold mt-1">
          {trans(locale, lang, 'title')}
        </p>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-col pb-3">
        {listOption.map((item, idx) =>
          item.title ? (
            <div
              key={idx}
              role="button"
              onClick={() => {
                setOtpSendto(item.title);
                handleClick({
                  id: item.title,
                  action,
                });
              }}
              className="group flex items-center justify-between rounded-md duration-500 px-4 py-5 hover:bg-red-100 border shadow-md rounded-3xl mt-4">
              <div className="flex gap-5 items-center">
                <Image src={item.icon} width={24} height={24} />
                <div className="text-body2 font-semibold text-[#202021]">
                  {trans(locale, lang, item.title)}
                </div>
              </div>
              <Icon
                icon={chevronRight}
                className="text-gray-300 duration-500 group-hover:text-red-dark-red90"
              />
            </div>
          ) : null,
        )}
      </div>
      <div className="mt-5 bg-[#FFEDD5] mx-auto rounded-xl w-full p-4 flex">
        <Icon icon={infoCircle} className="text-[#FBB559]" />
        <span className="pl-2 text-caption1 font-semibold">
          {trans(locale, lang, 'bottomInfo')}
        </span>
      </div>
    </Modal>
  );
}
