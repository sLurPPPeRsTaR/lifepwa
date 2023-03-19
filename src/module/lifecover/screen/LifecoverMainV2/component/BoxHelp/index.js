import Image from 'next/image';
import React, { useCallback, useMemo } from 'react';
import Icon from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/ionicons';
import { LsFooter1, LsFooter2, LsFooter3 } from '@cp-config/Svgs';
import locale from '../../locale';
import { trans } from '@cp-util/trans';

const BoxHelp = ({
  lang = 'id',
  onClickTnc = () => {},
  onClickRiplay = () => {},
  onClickFaq = () => {},
}) => {
  const dataHelp = useMemo(
    () => [
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
      {
        id: 'wa',
        icon: LsFooter3,
        title: 'WhatsApp Lifia',
        link: 'https://api.whatsapp.com/send/?phone=628111372848',
      },
    ],
    [],
  );
  const dataGuide = useMemo(
    () => [
      {
        title: 'tnc',
        label: {
          id: <>Syarat dan Ketentuan</>,
          en: <>Term and Conditions</>,
        },
        handler: onClickTnc,
      },
      {
        title: 'ringkasanInfo',
        label: {
          id: <>Ringkasan Informasi Produk & Layanan (RIPLAY)</>,
          en: <>Product & Service Information Summary (RIPLAY)</>,
        },
        handler: onClickRiplay,
      },
      {
        title: 'faq',
        label: {
          id: (
            <>
              Pertanyaan Umum Life<span className="italic">COVER</span>
            </>
          ),
          en: (
            <>
              FAQ Life<span className="italic">COVER</span>
            </>
          ),
        },
        handler: onClickFaq,
      },
    ],
    [onClickTnc, onClickRiplay, onClickFaq],
  );

  const handleRedirectHelper = useCallback((item) => {
    if (item.id === 'email') {
      window.location = `mailto:${item.link}`;
    } else [window.open(item.link, '_blank')];
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-[5%] relative z-10 mt-[100px]">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="text-[18px] text-[#737373] font-semibold mb-[30px]">
            {trans(locale, lang, 'bantuanDariIfg')}
          </div>

          <div className="flex flex-col gap-3">
            {dataHelp.map((item) => (
              <div
                key={item.id}
                role="button"
                onClick={() => handleRedirectHelper(item)}
                className="group flex h-12 items-center justify-between bg-white shadow-md shadow-gray-100 rounded-md border duration-500 px-4 hover:border-red-dark-red90">
                <div className="flex gap-5 items-center">
                  <Image src={item.icon} width={24} height={24} />
                  <div className="text-xs xm:text-body2 font-semibold text-[#202021]">
                    {item.title}
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
        <div className="flex-1">
          <div className="text-[18px] text-[#737373] font-semibold mb-[30px]">
            {trans(locale, lang, 'panduanDariIfg')}
          </div>

          <div className="flex flex-col gap-3">
            {dataGuide.map((item) => (
              <div
                key={item.title}
                role="button"
                onClick={item.handler}
                className="group flex h-12 items-center justify-between bg-white shadow-md shadow-gray-100 rounded-md border duration-500 px-4 hover:border-red-dark-red90">
                <div className="text-xs xm:text-body2 font-semibold text-[#202021]">
                  {item.label[lang]}
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
      </div>
    </div>
  );
};

export default BoxHelp;
