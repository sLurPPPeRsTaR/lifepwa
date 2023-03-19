import { useRouter } from 'next/router';
import { NAVIGATION } from '@cp-util/constant';
import {
  Bell, LogoPutih,
} from '@cp-config/Images';
import { useEffect, useState } from 'react';

export default function Page(props) {
  const { lang, token, getCurrentSubsResponse, notification, getProductBanner, getProductBannerResponse } = props;
  const router = useRouter();
  const [listBanner, setListBanner] = useState({
    bannerDesktop1: '',
    bannerDesktop2: '',
    bannerDesktop3: '',
    bannerMobile1: '',
    bannerMobile2: '',
    bannerMobile3: '',
  });

  useEffect(() => {
    getProductBanner({position: "Main Banner",lang});
  }, [])

  useEffect(() => {
    if (getProductBannerResponse?.length > 0) {
      
      let mobileView = getProductBannerResponse?.filter((item) => item?.attributes?.PathMobile !== null)
      let desktopView = getProductBannerResponse?.filter((item) => item?.attributes?.PathMobile === null)

      setListBanner({
        ...listBanner, 
        bannerDesktop1: desktopView?.filter((item) => item?.attributes?.Urutan === '1')[0]?.attributes?.Image?.url,
        bannerDesktop2: desktopView?.filter((item) => item?.attributes?.Urutan === '2')[0]?.attributes?.Image?.url,
        bannerDesktop3: desktopView?.filter((item) => item?.attributes?.Urutan === '3')[0]?.attributes?.Image?.url,
        bannerMobile1: mobileView?.filter((item) => item?.attributes?.Urutan === '1')[0]?.attributes?.Image?.url,
        bannerMobile2: mobileView?.filter((item) => item?.attributes?.Urutan === '2')[0]?.attributes?.Image?.url,
        bannerMobile3: mobileView?.filter((item) => item?.attributes?.Urutan === '3')[0]?.attributes?.Image?.url,
      })
      // console.log(desktopView)
    }
  }, [getProductBannerResponse])

  const renderBannerWidget = () => {
    return (
      <div className="relative z-20 flex mb-1 gap-4 py-2 px-3 bg-transparent">
        <div
          role="button"
          onClick={() => {
            if (token) {
              router.push(NAVIGATION.NOTIFICATION.NotificationMain);
            } else {
              router.push(NAVIGATION.LOGIN.Login);
            }
          }}>
          <img src={Bell} className="relative w-4 md:w-4" />
          {notification && notification.data.count > 0 && (
            <div className="h-4 absolute bg-green-500 ml-2 top-0 rounded-full px-1">
              <span className="text-white h-full w-full text-[10px] grid place-content-center">
                {notification.data.count > 99 ? '99+' : notification.data.count}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const bannerHaveNoPolis = () => {
    const onClickBtn = () => {
      router.push(NAVIGATION.LIFESAVER.LifesaverMain);
    };

    return (
      <div className="cursor-pointer absolute h-full w-full z-10 top-0">
        <div className="absolute z-20 top-12 left-8 md:hidden">
          <img
            src={LogoPutih}
            className="h-7 lg:h-8"
            onClick={() => onClickBtn()}
          />
        </div>
        <img
          src={listBanner?.bannerDesktop1}
          className="hidden absolute z-10 inset-0 w-full h-full md:block"
          onClick={() => onClickBtn()}
        />
        <img
          src={listBanner?.bannerMobile1}
          className="block absolute z-10 inset-0 w-full h-full md:hidden"
          onClick={() => onClickBtn()}
        />
        <div className='absolute right-12 top-12'>
          {renderBannerWidget()}
        </div>
      </div>
    );
  };

  const bannerLifesaver = () => {
    const onClickBtn = () => {
      router.push(
        {
          pathname: NAVIGATION.LIFESAVER.LifesaverMain,
          query: { product: 'lifesaver' },
        },
        NAVIGATION.LIFESAVER.LifesaverMain,
      );
    };

    return (
      <div className="cursor-pointer absolute h-full w-full z-10 top-0">
        <div className="absolute z-20 top-12 left-8 md:hidden">
          <img
            src={LogoPutih}
            className="h-7 lg:h-8"
            onClick={() => onClickBtn()}
          />
        </div>
        <img
          src={listBanner?.bannerDesktop2}
          className="hidden absolute z-10 inset-0 w-full h-full md:block"
          onClick={() => onClickBtn()}
        />
        <img
          src={listBanner?.bannerMobile2}
          className="block absolute z-10 inset-0 w-full h-full md:hidden"
          onClick={() => onClickBtn()}
        />
        <div className='absolute right-12 top-12'>
          {renderBannerWidget()}
        </div>
      </div>
    );
  };

  const bannerLifesaverPlus = () => {
    const onClickBtn = () => {
      router.push(NAVIGATION.LIFESAVER.LifesaverInviteFriends);
    };

    return (
      <div className="cursor-pointer absolute h-full w-full z-10 top-0">
        <div className="absolute z-20 top-12 left-8 md:hidden">
          <img
            src={LogoPutih}
            className="h-7 lg:h-8"
            onClick={() => onClickBtn()}
          />
        </div>
        <img
          src={listBanner?.bannerDesktop3}
          className="hidden absolute z-10 inset-0 w-full h-full md:block"
          onClick={() => onClickBtn()}
        />
        <img
          src={listBanner?.bannerMobile3}
          className="block absolute z-10 inset-0 w-full h-full md:hidden"
          onClick={() => onClickBtn()}
        />
        <div className='absolute right-12 top-12'>
          {renderBannerWidget()}
        </div>
      </div>
    );
  };

  const renderBanner = () => {
    if (!token) return bannerHaveNoPolis();

    if (
      getCurrentSubsResponse?.planName === 'LifeSAVER' ||
      getCurrentSubsResponse?.planName === 'LifeSAVER POS'
    )
      return bannerLifesaver();
    if (getCurrentSubsResponse?.planName === 'LifeSAVER+')
      return bannerLifesaverPlus();

    return bannerHaveNoPolis();
  };

  return (
    <div className="relative z-0 h-64 xm:h-72 w-full text-white bg-red-dark-red90">
      {renderBanner()}
    </div>
  );
}
