import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION } from '@cp-util/constant';
import { Button, HeaderPage, MenuBar, Modal } from '@cp-component';
import {
  LsBannerProductList,
  LifecoverbannerImg,
  LifecoverLogoDark,
  googlePlay,
  appStore,
  LifecoverLogoDarkLg,
  LifesaverProductListBanner,
  LifecoverProductListBanner,
  LifecoverBannerSecond,
} from '@cp-config/Images';
import { trans } from '@cp-util/trans';
import locale from './locale';
import { LifecoverLandingV2Img1 } from '../../../../config/Images';
import { event } from '@cp-util/func';

const HomeListProduct = (props) => {
  const { lang } = props;
  const router = useRouter();
  const [isComingSoon, setIsComingSoon] = useState(false);

  const renderCardLifeSaver = () => {
    return (
      <div className="flex w-full h-full flex-col gap-3 justify-center shadow-xl rounded-xl p-3">
        <div className="w-full h-full">
          <img
            src={LifesaverProductListBanner}
            alt="LifeSaverBanner"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full flex items-center justify-between h-full">
          <div className="flex flex-col">
            <span className="lg:text-sm text-xs font-semibold">
              {trans(locale, lang, 'titleProduk')}
            </span>
            <span
              className="lg:text-xs text-[10px] font-normal text-gray-400"
              dangerouslySetInnerHTML={{
                __html: trans(locale, lang, 'descProduk'),
              }}
            />
          </div>
          <Button
            onButtonClick={() =>
              router.push(NAVIGATION.LIFESAVER.LifesaverMain)
            }
            type="linear-gradient"
            className="lg:w-24 lg:h-10 md:w-20 w-16 md:h-8 h-7 text-xs lg:text-sm  rounded-xl"
            auto>
            {trans(locale, lang, 'pilih')}
          </Button>
        </div>
      </div>
    );
  };

  const renderCardLifeCover = () => {
    return (
      <div className="flex w-full h-full flex-col gap-3 justify-center shadow-xl rounded-xl p-3">
        <div className="w-full h-full">
          <img
            src={LifecoverBannerSecond}
            alt="LifeSaverBanner"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full flex items-center justify-between h-full">
          <div className="flex flex-col">
            <span className="lg:text-sm text-xs font-semibold">
              {trans(locale, lang, 'titleLifeCover')}
            </span>
            <span
              className="lg:text-xs text-[10px] font-normal text-gray-400"
              dangerouslySetInnerHTML={{
                __html: trans(locale, lang, 'descLifecover'),
              }}
            />
          </div>
          <Button
            onButtonClick={() =>
              router.push(NAVIGATION.LIFECOVER.LifecoverMain)
            }
            type="linear-gradient"
            className="lg:w-24 lg:h-10 md:w-20 w-16 md:h-8 h-7 text-xs lg:text-sm  rounded-xl"
            auto>
            {trans(locale, lang, 'pilih')}
          </Button>
        </div>
      </div>
    );
  };

  const openInNewTab = (url, openId) => {
    event({
      action: 'openInNewTab',
      params: {
        search_term: openId,
      },
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const modalComingSoon = () => {
    return (
      <Modal
        isOpen={isComingSoon}
        toggle={() => setIsComingSoon(false)}
        noPadding
        noBackground
        size="md">
        <div className="w-full h-full relative flex justify-left items-center">
          <img
            src={LifecoverLandingV2Img1}
            alt="LifeSaverBanner"
            className="object-cover w-full h-full rounded-2xl"
          />
          <div className="h-auto p-4 w-[50%] absolute flex flex-col">
            <img
              src={LifecoverLogoDarkLg}
              className="text-[4px] md:text-[10px] w-[45em] mb-2"
              alt="Lifecover Logo"
            />
            <text className="text-xs xm:text-md md:text-3xl font-bold text-orange-400">
              {trans(locale, lang, 'comingSoon')}
            </text>
            <text className="text-[8px] xm:text-[10px] md:text-xs my-2">
              {trans(locale, lang, 'kalianJugaBisa')}
            </text>
            <div className="flex flex-row py-2">
              <img
                onClick={() =>
                  openInNewTab(
                    'https://play.google.com/store/apps/details?id=id.lifecustomer&hl=en&gl=ID',
                    'googlePlay',
                  )
                }
                className="cursor-pointer w-[20vw] md:w-[10vw] my-1 mr-2"
                src={googlePlay}
              />
              <img
                onClick={() =>
                  openInNewTab(
                    'https://apps.apple.com/id/app/life-id/id1627986095',
                    'appStore',
                  )
                }
                className="cursor-pointer w-[20vw] md:w-[10vw]"
                src={appStore}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <HeaderPage
        title={trans(locale, lang, 'titleHead')}
        isHelp
        isNotification
        center
        onClickBack={() => router.push(NAVIGATION.HOME.Home)}
        height="h-32"
      />
      <div className="flex justify-center lg:-top-10 md:-top-8 -top-9  relative w-full h-full">
        <div className="shadow-lg rounded-3xl  bg-white min-w-1/2 lg:h-[110vh] h-full mx-2 md:mx-0 lg:mx-0 lg:p-5 sm:p-3 p-3">
          <div className="flex justify-between">
            <span className="lg:text-sm md:text-sm  text-xs font-Monstserrat font-semibold ">
              {trans(locale, lang, 'proteksiUntuk')}
            </span>
          </div>
          <div className="flex flex-col gap-4  mt-3 w-full  ">
            {renderCardLifeSaver()}
            {renderCardLifeCover()}
            {modalComingSoon()}
          </div>
        </div>
      </div>
      <MenuBar />
    </>
  );
};

export default HomeListProduct;
