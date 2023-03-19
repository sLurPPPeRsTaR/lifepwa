/* eslint-disable @next/next/no-img-element */
import {
  landingBackground,
  lifeIdRed,
  lifeIdWhite,
  ifgLifeWhite,
  landingContent,
  landingBackgroundContent,
  landingIphone,
  instagramWhite,
  facebookWhite,
  twitterwhite,
  youtubeWhite,
  linkedinWhite,
  appStore,
  googlePlay,
} from '@cp-config/Images';
import { Container } from '@cp-component';
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

function Screen() {
  return (
    <Container isShowHeader={false} isShowFooter={true}>
      <style>
        {`

       @media only screen and (min-width: 500px) and (max-width:600px) and (min-height: 660px) and (max-height:760px) {
         .odd-screen {
           height:50vh
         }
       }
       @media (min-width: 898px) and (max-width:1023px) and (min-height: 500px) and (max-height:900px) {
        .odd-screen {
          height:90vh
        }
      }
       @media (orientation: landscape) and (min-width: 1024px) and (max-height:600px) {
        .odd-screen {
          height:120vh
        }
      }

      @media  (orientation: landscape)  and (min-width: 500px) and (max-width:660px) and (min-height: 250px) and (max-height:350px) {
        .odd-screen {
          height:150vh
        }
        .odd-image {
          width:3.5vw
         }
      }
       
     `}
      </style>
      <div className="flex justify-center">
        <div className="w-full min-h-screen flex flex-col">
          <div className="md:mt-0 z-10 w-full flex flex-col justify-content-end bg-white rounded-t-2xl md:rounded-t-none">
            <div className="flex flex-col min-h-screen">
              {/* column 1 */}
              <div
                className="mb-[5vh] xs:mb-[12vh] md:mb-[20vh] lg:mb-[25vh] w-full h-full landscape:h-[120vh] landscape:sm:h-[100vh] landscape:md:h-[150vh] landscape:ld:h-[120vh] landscape:lg:h-[80vh] portrait:h-[90vw] portrait:s:h-[40vh] portrait:md:h-[50vh] portrait:lg:h-[70vh] odd-screen bg-cover"
                style={{ backgroundImage: `url(${landingBackground})` }}>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row w-full mt-4 px-2 xm:px-4 md:px-8">
                    <img
                      className="w-[10vw] md:w-[8vw] lg:w-[5vw]"
                      src={lifeIdWhite}></img>
                    <div className="flex flex-row flex-[0.2] justify-center ml-auto mr-2 md:mr-0">
                      <img
                        onClick={() =>
                          openInNewTab(
                            'https://www.instagram.com/ifg.life',
                            'instagram',
                          )
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
                        className="cursor-pointer landscape:w-[3.5vh] portrait:w-[5vw] portrait:md:w-[4vw] lg:w-[1.5vw] pr-[5px] odd-image"
                        src={facebookWhite}></img>
                      <img
                        onClick={() =>
                          openInNewTab('https://twitter.com/ifglife', 'twitter')
                        }
                        className="cursor-pointer landscape:w-[3.5vh] portrait:w-[5vw] portrait:md:w-[4vw] lg:w-[1.5vw] pr-[5px] odd-image"
                        src={twitterwhite}></img>
                      <img
                        onClick={() =>
                          openInNewTab(
                            'https://www.youtube.com/c/IFGLife',
                            'youtube',
                          )
                        }
                        className="cursor-pointer landscape:w-[3.5vh] portrait:w-[5vw] portrait:md:w-[4vw] lg:w-[1.5vw] pr-[5px] odd-image"
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
                <div className="flex flex-col mb-6 mt-6 md:mt-16 lg:mt-20">
                  <span className="text-center mb-4 text-[12px] xm:text-[20px] md:text-[32px] lg:text-[40px] xl:text-[48px] font-semibold text-white">
                    Melindungi dengan Easy, Jalani Hidup Tanpa Worry!
                  </span>
                  <span className="text-center mb-6 text-[8px] xm:text-[8px] md:text-[14px] text-white">
                    Hubungkan polis · Cek Detail Polis · Update Data · Customer
                    Care
                  </span>
                  <div className="flex justify-center mb-4">
                    <img
                      onClick={() =>
                        openInNewTab(
                          'https://play.google.com/store/apps/details?id=id.lifecustomer&hl=en&gl=ID',
                          'googlePlay',
                        )
                      }
                      className="cursor-pointer w-[20vw] md:w-[15vw] xl:w-[10vw] pr-[5px]"
                      src={googlePlay}
                    />
                    <img
                      onClick={() =>
                        openInNewTab(
                          'https://apps.apple.com/id/app/life-id/id1627986095',
                          'appStore',
                        )
                      }
                      className="cursor-pointer w-[20vw] md:w-[15vw] xl:w-[10vw]"
                      src={appStore}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center relative mt-[-100px] xm:mt-[-140px] s:mt-[-160px] landscape:sm:mt-[-50vh] landscape:md:mt-[-50vh] landscape:md:xl-[-60vh] md:mt-[-35vh] lg:mt-[-40vh] xl:mt-[-55vh]">
                <img className="w-[90%] xl:w-[70%]" src={landingIphone} />
              </div>
              {/* column 2*/}
              <div
                className="w-full bg-cover mb-6"
                style={{ backgroundImage: `url(${landingBackgroundContent})` }}>
                <div className="flex flex-col mb-6 mt-6">
                  <span className="text-center mb-4 text-[12px] xm:text-[20px] md:text-[32px] lg:text-[40px] xl:text-[48px] font-semibold text-black">
                    Semua Serba MUDAH!
                  </span>
                  <span className="text-center mb-4 text-[8px] xm:text-[8px] md:text-[14px] text-black">
                    Layanan asuransi jiwa terlengkap
                  </span>
                  <span className="text-center mb-4 text-[8px] xm:text-[8px] md:text-[14px] text-black">
                    Beli Polis • Cek Polis • Pengajuan Klaim • Customer Care
                  </span>
                  <div className="flex justify-center px-4 lg:px-0">
                    <img className="lg:w-[60%]" src={landingContent} />
                  </div>
                </div>
              </div>
              {/* column 3 */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Screen;
