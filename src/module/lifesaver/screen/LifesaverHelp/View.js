import { useState } from 'react';
import locale from './locale';
import Image from 'next/image';
import Icon from 'react-icons-kit';
import { useRouter } from 'next/router';
import { trans } from '@cp-util/trans';
import { LsFooter1, LsFooter2, LsFooter3 } from '@cp-config/Svgs';
import { chevronRight } from 'react-icons-kit/ionicons';
import { NAVIGATION } from '@cp-util/constant';

export default function Page(props) {
  const { lang, setShowModalLsTnc, setShowModalLsFaq, setShowModalLsRiplay } =
    props;
  const router = useRouter();

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

  const dataGuide = [
    { title: 'tnc', function: () => setShowModalLsTnc(true) },
    { title: 'ringkasanInfo', function: () => setShowModalLsRiplay(true) },
    { title: 'faq', function: () => setShowModalLsFaq(true) },
  ];

  return (
    <div className="bg-[#FCFDFF]">
      <div className="max-w-5xl mx-auto pt-8 md:pt-20 px-[5%] lg:pt-24 xl:px-0">
        <div className="w-full flex justify-between gap-8 md:gap-14 flex-col-reverse md:flex-row">
          <div className="w-full md:w-[46%]">
            <div className="text-gray-500 text-body1 font-semibold mb-6 md:text-h6">
              {trans(locale, lang, 'bantuanDariIfg')}
            </div>
            <div className="flex flex-col gap-3">
              {dataHelp.map((item, idx) => (
                <div
                  key={idx}
                  role="button"
                  onClick={() =>
                    item.id == 'email'
                      ? (window.location = `mailto:${item.link}`)
                      : window.open(item.link, '_blank')
                  }
                  className="group flex h-12 items-center justify-between bg-white shadow-md shadow-gray-100 rounded-md border duration-500 px-4 hover:border-red-dark-red90">
                  <div className="flex gap-5 items-center">
                    <Image src={item.icon} width={24} height={24} />
                    <div className="text-xs xm:text-body2 font-semibold text-[#202021]">
                      {trans(locale, lang, item.title)}
                    </div>
                  </div>
                  <Icon
                    size={16}
                    icon={chevronRight}
                    className="text-primary-light-primary90 duration-500 group-hover:text-red-dark-red90"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[46%]">
            <div className="text-gray-500 text-body1 font-semibold mb-6 md:text-h6">
              {trans(locale, lang, 'panduanDariIfg')}
            </div>
            <div className="flex flex-col gap-3">
              {dataGuide.map((item, idx) => (
                <div
                  key={idx}
                  role="button"
                  onClick={item.function}
                  className="group flex h-12 items-center justify-between bg-white shadow-md shadow-gray-100 rounded-md font-bold text-xs xm:text-body2 border duration-500 px-4 hover:border-red-dark-red90">
                  {trans(locale, lang, item.title)}
                  <Icon
                    size={16}
                    icon={chevronRight}
                    className="text-primary-light-primary90 duration-500 group-hover:text-red-dark-red90"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-gray-500 pt-12 md:pt-20 pb-10 font-medium text-xs text-center">
          {trans(locale, lang, 'footer')}
        </div>
      </div>
    </div>
  );
}
