import { trans } from '@cp-util/trans';
import { CaraKlaim, Restrukturisasi } from '@cp-config/Images';
import locale from './locale';
import { useEffect, useState } from 'react';

export default function Page(props) {
  const {
    lang,
    setNotAvailable,
    setAvailableOnMobile,
    getImportantForYouImage,
    getImportantForYouImageResponse,
  } = props;
  const [bgMobile, setBgMobile] = useState([]);
  const [bgDesktop, setBgDesktop] = useState([]);

  useEffect(() => {
    getImportantForYouImage({ position: 'Penting Untukmu', lang });
  }, [getImportantForYouImage, lang]);

  useEffect(() => {
    if (getImportantForYouImageResponse?.length > 0) {
      let mobileView = getImportantForYouImageResponse
        ?.filter(
          (item) =>
            item?.attributes?.Urutan === '1' ||
            item?.attributes?.Urutan === '2',
        )
        .reverse();
      let desktopView = getImportantForYouImageResponse
        ?.filter(
          (item) =>
            item?.attributes?.Urutan === '3' ||
            item?.attributes?.Urutan === '4',
        )
        .reverse();

      setBgDesktop(desktopView);
      setBgMobile(mobileView);
    }
  }, [getImportantForYouImageResponse]);

  const forYou = [
    // {
    //   image: CoachMark,
    //   title: 'panduanFitur',
    //   content: 'panduanAplikasiFitur',
    //   action: () => {
    //     setNotAvailable(true);
    //   },
    // },
    {
      image: Restrukturisasi,
      title: 'klaimAsuransi',
      content: 'klaimAsuransiContent',
      action: () => {
        setNotAvailable(true);
      },
    },
    {
      image: CaraKlaim,
      title: 'informasiPolis',
      content: 'informasiPolisContent',
      action: () => {
        setAvailableOnMobile(true);
      },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto pt-4 mt-3 border-b-2 lg:pt-5 pb-4 lg:mb-7">
      <div className="flex justify-center pb-2 md:pb-5">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-2 md:mb-4">
            <p className="font-bold text-xs xm:text-sm md:text-body1">
              {trans(locale, lang, 'terbaikUntukmu')}
            </p>
            <div
              role="button"
              className="text-caption1 text-gray-500 hover:underline">
              {/* {trans(locale, lang, 'lihatSemua')} */}
            </div>
          </div>

          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 md:gap-5">
            {forYou?.map((item, idx) => (
              <div
                key={idx}
                role="button"
                onClick={() => item?.action()}
                className="relative bg-white border rounded-xl shadow-sm pb-2 xm:pb-3 md:pb-4 duration-500 shadow-gray-100 hover:shadow-lg md:rounded-2xl">
                <div className="relative">
                  {getImportantForYouImageResponse?.length > 0 ? (
                    <img
                      src={
                        getImportantForYouImageResponse[idx].attributes.Image
                          .url
                      }
                      className="w-full rounded-xl md:rounded-2xl h-24 xm:h-28 lg:h-36"
                    />
                  ) : null}
                  <div className="absolute top-0 left-0 w-full h-full flex flex-row justify-between px-[5%] md:px-[8%] items-center">
                    <p className="whitespace-pre-line font-bold leading-4 xm:leading-5 text-white text-[11px] pb-6 w-1/3 xs:text-[8px] xm:text-[11px] xs:ml-2 md:ml-0 lg:pb-0 lg:text-lg lg:whitespace-normal lg:leading-normal">
                      {trans(locale, lang, item.content)}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] md:text-body2 pl-2 xm:text-xs md:pl-4 pt-2 md:pt-3 font-bold">
                  {trans(locale, lang, item.title)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
