import { useRouter } from 'next/router';
import { trans } from '@cp-util/trans';
import { NAVIGATION } from '@cp-util/constant';
import locale from './locale';
import {
  HomeMenuNew1,
  HomeMenuNew2,
  HomeMenuNew3,
  HomeMenuNew4,
  HomeMenuNew5,
  Path,
} from '@cp-config/Images';
import { eventAppsflyer } from '@cp-util/func'

export default function Page(props) {
  const { lang, setHospital, setAvailableOnMobile, onClickLifeCard, userId } = props;

  const router = useRouter();
  const menuData = [
    {
      label: trans(locale, lang, 'lifecard'),
      image: HomeMenuNew3,
      // url: () => setAvailableOnMobile(true),
      url: () => {
        if (onClickLifeCard) onClickLifeCard();
      },
    },
    {
      label: trans(locale, lang, 'event'),
      image: HomeMenuNew4,
      url: () => {
        eventAppsflyer({
          eventName: 'af_event_tile',
          payload: { 
            af_user_id: userId,
            af_channel: "website" 
          },
        });
        router.push(NAVIGATION.EVENT.EventMain)
      },
    },
    {
      label: trans(locale, lang, 'clinic'),
      image: HomeMenuNew1,
      url: () => setHospital(true),
    },

    {
      label: trans(locale, lang, 'faq'),
      image: HomeMenuNew2,
      url: NAVIGATION.FAQ.FaqMain,
    },
    {
      label: trans(locale, lang, 'klaim'),
      image: HomeMenuNew5,
      url: NAVIGATION.CLAIMPOLIS.main,
    },
  ];

  const renderMenuFloating = () => {
    return (
      <div className="flex justify-center mb-3">
        <div className="relative w-full grid grid-cols-5 gap-2 p-2 rounded-2xl bg-white shadow-sm max-w-6xl text-center overflow-hidden md:gap-4">
          <img
            src={Path}
            className="absolute bottom-0 left-0 z-0 w-full h-auto object-cover"
          />
          {menuData?.map((menu, index) => (
            <div
              key={index}
              onClick={() =>
                menu.url
                  ? typeof menu.url === 'string'
                    ? router.push(menu.url)
                    : typeof menu.url === 'function'
                    ? menu.url()
                    : setFeatureNotAvailable(true)
                  : null
              }
              className={`relative py-1 rounded-xl flex flex-col justify-center items-center duration-500 md:py-2 ${
                menu.url && 'cursor-pointer hover:bg-red-100'
              }`}>
              <img src={menu?.image} className="h-10 md:h-14" />
              <p className="pt-1 md:pt-2 font-medium text-neutral-dark-neutral80 text-[9px] md:text-body1">
                {menu?.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return renderMenuFloating();
}
