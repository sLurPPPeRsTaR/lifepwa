import {
  lifeIdWhite,
  ifgLifeWhite,
  instagramWhite,
  facebookWhite,
  twitterwhite,
  youtubeWhite,
  linkedinWhite,
  appStore,
  googlePlay,
  footer,
  phoneRed,
  emailRed,
  callCenterRed,
} from '@cp-config/Images';
import { event } from '@cp-util/func';

const openInNewTab = (url, openId) => {
  event({
    action: 'openInNewTab',
    params: {
      search_term: openId,
    },
  });
  window.open(url, '_blank', 'noopener,noreferrer');
};

function Component({}) {
  return (
    <div
      className="w-full bg-cover mt-auto"
      style={{ backgroundImage: `url(${footer})` }}>
      <style>
        {`
      @media  (orientation: landscape)  and (min-width: 500px) and (max-width:660px) and (min-height: 250px) and (max-height:350px) {
        .odd-image {
          width:3.5vw
         }
      }
       
     `}
      </style>
      <div className="flex flex-col px-2 xm:px-4 md:px-8">
        <div className="flex flex-row w-full pt-6 md:pt-8 pb-[20px] border-b-[0.75px] border-solid border-[#AEB1B4]">
          <div className="flex flex-col flex-[0.8]">
            <div className="flex items-center">
              <img
                className="w-[10vw] md:w-[8vw] lg:w-[5vw]"
                src={lifeIdWhite}></img>
              <img
                onClick={() => openInNewTab('https://ifg-life.id/', 'ifgLife')}
                className="cursor-pointer mt-1 w-[20vw] md:w-[14vw] lg:w-[8vw]"
                src={ifgLifeWhite}></img>
            </div>
            <div className="flex items-center mt-4">
              <img
                className="w-[2.5vw] md:w-[2vw] lg:w-[1.25vw]"
                src={phoneRed}></img>
              <span className="text-center text-[4px] xm:text-[6px] md:text-[10px] lg:text-[14px] text-white pr-[5px]">
                <a href="tel:1500176">Call Center 1500176</a>
              </span>
              <img
                className="w-[3.5vw] md:w-[2vw] lg:w-[1.25vw] pr-[5px]"
                src={emailRed}></img>
              <span className="text-center text-[4px] xm:text-[6px] md:text-[10px] lg:text-[14px] text-white">
                <a href="mailto:customer_care@ifg-life.id">
                  customer_care@ifg-life.id
                </a>
              </span>
            </div>
            <div className="flex items-center mt-2">
              <img
                className="w-[2.5vw] md:w-[2vw] lg:w-[1.25vw]"
                src={callCenterRed}></img>
              <span
                onClick={() =>
                  openInNewTab('https://wa.me/628111372848', 'whatsApp')
                }
                className="cursor-pointer text-center text-[4px] xm:text-[6px] md:text-[10px] lg:text-[14px] text-white">
                WhatsApp Lifia
              </span>
            </div>
          </div>
          {/* <div className="flex flex-col flex-[0.2] items-center">
          <span className="text-center text-[4px] xm:text-[6px] md:text-[10px] lg:text-[14px] text-white">Diawasi dan terdaftar:</span>
          <img className="w-[10vw] md:w-[8vw] lg:w-[8vw] mt-2" src={ifgLifeWhite}></img>
        </div> */}
          <div className="flex flex-col flex-[0.2] items-center">
            <span className="text-center text-[4px] xm:text-[6px] md:text-[10px] lg:text-[14px] text-white">
              Dapatkan Aplikasi kami
            </span>
            <img
              onClick={() =>
                openInNewTab(
                  'https://play.google.com/store/apps/details?id=id.lifecustomer&hl=en&gl=ID',
                  'googlePlay',
                )
              }
              className="cursor-pointer w-[20vw] md:w-[10vw] my-1"
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
        <div className="flex flex-row mt-4">
          <span className="text-[4px] text-[4px] xm:text-[6px] md:text-[10px] lg:text-[14px] text-white flex-[0.8]">
            All Right Reserved by IFG Life Copyright 2022
          </span>
          <div className="flex flex-row ml-auto justify-center flex-[0.2] mb-2 mr-2 md:mr-0">
            <img
              onClick={() =>
                openInNewTab('https://www.instagram.com/ifg.life', 'instagram')
              }
              className="cursor-pointer landscape:w-[3.5vh] portrait:w-[5vw] portrait:md:w-[4vw] lg:w-[1.5vw] pr-[5px] odd-image"
              src={instagramWhite}></img>
            <img
              onClick={() =>
                openInNewTab(
                  'https://www.facebook.com/ifglife.official/',
                  'facebook',
                )
              }
              className="cursor-pointer landscape:w-[3.5vh]  portrait:w-[5vw] portrait:md:w-[4vw] lg:w-[1.5vw] pr-[5px] odd-image"
              src={facebookWhite}></img>
            <img
              onClick={() =>
                openInNewTab('https://twitter.com/ifglife', 'twitter')
              }
              className="cursor-pointer landscape:w-[3.5vh]  portrait:w-[5vw] portrait:md:w-[4vw] lg:w-[1.5vw] pr-[5px] odd-image"
              src={twitterwhite}></img>
            <img
              onClick={() =>
                openInNewTab('https://www.youtube.com/c/IFGLife', 'youtube')
              }
              className="cursor-pointer landscape:w-[3.5vh]  portrait:w-[5vw] portrait:md:w-[4vw] lg:w-[1.5vw] pr-[5px] odd-image"
              src={youtubeWhite}></img>
            <img
              onClick={() =>
                openInNewTab(
                  'https://www.linkedin.com/company/ifg-life/mycompany',
                  'linkedin',
                )
              }
              className="cursor-pointer landscape:w-[3.5vh] portrait:w-[5vw] portrait:md:w-[4vw] lg:w-[1.5vw] odd-image"
              src={linkedinWhite}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
