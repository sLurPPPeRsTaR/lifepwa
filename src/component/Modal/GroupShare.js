import { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { trans } from '@cp-util/trans';
import { Modal } from '@cp-component';
import { closeRound } from 'react-icons-kit/ionicons';
import locale from './locale';
import {
  MailShare,
  TwitterShare,
  FacebookShare,
  WhatsappShare,
  TelegramShare,
  CopyLinkShare,
} from '@cp-config/Images';

export default function component(props) {
  const {
    lang,
    title,
    isOpen,
    setClose,
    linkWhatsApp,
    linkFacebook,
    linkTelegram,
    linkTwitter,
    linkEmail,
    copyLink,
  } = props;

  const [showTooltips, setShowTooltips] = useState(false);

  const socials = [
    {
      icon: FacebookShare,
      url: `https://www.facebook.com/sharer/sharer.php?u=${linkFacebook}=LifeTag By IFG`,
      title: 'Facebook',
    },
    {
      icon: WhatsappShare,
      url: `https://wa.me/?text=${linkWhatsApp}`,
      title: 'WhatsApp',
    },
    {
      icon: TelegramShare,
      url: `https://t.me/share/url?url=${linkTelegram}`,
      title: 'Telegram',
    },
    {
      icon: TwitterShare,
      url: `http://twitter.com/intent/tweet?url=${linkTwitter}`,
      title: 'Twitter',
    },
    {
      icon: MailShare,
      url: linkEmail,
      title: 'Email',
    },
    {
      id: 'copyLink',
      icon: CopyLinkShare,
      url: copyLink,
      title: trans(locale, lang, 'copyLink'),
    },
  ];

  const handleClick = (id, title, url) => {
    if (id === 'copyLink') {
      console.log('copylink');
      navigator.clipboard.writeText(url);
      setShowTooltips(true);
    } else if (title === 'Email') {
      window.location = `mailto:?subject=LifeTag by IFG&amp;body${url}`;
    } else {
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    if (showTooltips) {
      setTimeout(() => {
        setShowTooltips(false);
      }, 2000);
    }
  }, [showTooltips]);

  return (
    <Modal isOpen={isOpen} size="md" className="relative">
      <Icon
        icon={closeRound}
        size={16}
        role="button"
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-600"
        onClick={() => setClose(false)}
      />
      <p className="text-center font-semibold py-3 text-base md:text-lg">
        {title}
      </p>

      <div className="flex flex-wrap items-center justify-center md:justify-evenly pb-4 md:p-3">
        {socials.map((item, idx) => (
          <div
            key={idx}
            className="relative w-16 flex flex-col items-center mt-4 md:mt-0 xm:w-20 md:w-24">
            {showTooltips && item?.id === 'copyLink' && (
              <p className="absolute -top-5 xm:-top-8 text-[9px] xm:text-[10px] md:text-[11px] bg-black/70 text-white px-1 xm:px-2 py-1 rounded-lg">
                {trans(locale, lang, 'tooltipsCopyLink')}
              </p>
            )}
            <div
              role="button"
              className="w-9 h-9 rounded-full duration-300 overflow-hidden hover:shadow-lg hover:border md:w-14 md:h-14"
              onClick={() => handleClick(item?.id, item?.title, item?.url)}>
              <img src={item?.icon} className="w-full h-full p-1 scale-125" />
            </div>
            <p className="w-full text-center pt-2 text-[11px] md:text-xs">
              {item?.title}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
}
