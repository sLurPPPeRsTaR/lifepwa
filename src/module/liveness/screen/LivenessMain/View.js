import { useRef, useEffect } from 'react';
import { trans } from '@cp-util/trans';
import { useRouter } from 'next/router';
import { arrowLeft } from 'react-icons-kit/feather';
import Icon from 'react-icons-kit';
import locale from './locale';
import { NAVIGATION } from '@cp-util/constant';

export default function page(props) {
  const { lang } = props;
  const router = useRouter();
  const query = router?.query;
  const iframeRef = useRef(null);

  const renderHeader = () => {
    return (
      <div className="relative z-10 w-full flex justify-between items-center shadow-sm bg-white h-16 px-5 lg:h-20 lg:px-[5%]">
        <div className="w-5 xm:w-10 md:w-20" role="button">
          <Icon
            icon={arrowLeft}
            size={20}
            onClick={() => {
              if (query?.navFrom) {
                router.replace(query?.navFrom);
              } else {
                router.replace(NAVIGATION.HOME.Home);
              }
            }}
            className="cursor-pointer"
          />
        </div>
        <p className="font-bold text-sm md:text-base lg:text-lg">
          {trans(locale, lang, 'title')}
        </p>
        <div className="w-0 xm:w-10 md:w-20"></div>
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      <iframe
        id="myFrame"
        ref={iframeRef}
        className="w-full h-screen liveness"
        allow="autoplay; camera;"
        src={query?.url}></iframe>
    </>
  );
}
