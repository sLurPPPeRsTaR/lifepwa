import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { NAVIGATION } from '@cp-util/constant';
import { SosButton } from '@cp-component';
import { trans } from '@cp-util/trans';
import locale from './locale';
import {
  MenuHome,
  MenuHomeActive,
  MenuLifesaver,
  MenuLifesaverActive,
  MenuPolis,
  MenuPolisActive,
  MenuProfile,
  MenuProfileActive,
} from '@cp-config/Images';

export default function Component({ lang }) {
  const router = useRouter();
  const { userData } = useSelector((state) => state?.auth);

  const menuData = [
    {
      label: trans(locale, lang, 'title1'),
      image: MenuHome,
      imageActive: MenuHomeActive,
      path: '/',
    },
    {
      label: trans(locale, lang, 'title2'),
      image: MenuLifesaver,
      imageActive: MenuLifesaverActive,
      path: NAVIGATION.HOME.HomeListProduct,
    },
    {
      label: trans(locale, lang, 'title3'),
      image: MenuPolis,
      imageActive: MenuPolisActive,
      path: '/polis',
    },
    {
      label: trans(locale, lang, 'title4'),
      image: MenuProfile,
      imageActive: MenuProfileActive,
      path: '/profile',
    },
  ];

  const handleNavigate = (pathname) => {
    if (
      userData?.userId ||
      pathname === '/' ||
      pathname === NAVIGATION.HOME.HomeListProduct
    ) {
      return router.push({ pathname });
    }

    return router.push({
      pathname: NAVIGATION.LOGIN.Login,
    });
  };

  return (
    <div
      className={`fixed z-50 w-full flex justify-center left-0 bg-white duration-500 bottom-0`}>
      <div className="w-full max-w-[1440px] grid gap-15 grid-cols-4 py-2">
        {menuData?.map((menu, index) => {
          return (
            <div
              key={index}
              role="button"
              onClick={() => handleNavigate(menu?.path)}
              className="text-center py-2 rounded-md duration-300 hover:bg-red-50">
              <img
                src={
                  router?.pathname === menu?.path
                    ? menu?.imageActive
                    : menu?.image
                }
                className="mb-2 w-5 xm:w-6 md:w-7 mx-auto"
              />
              <div className="text-xs sm:text-sm font-medium text-mediumGray-dark-mediumGray">
                {menu?.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
