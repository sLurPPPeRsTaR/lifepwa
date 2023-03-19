import { Container, Modal, QrScanner } from '@cp-component';
import { useBrowserDetectionHelper } from '@cp-util/browser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { trans } from '@cp-util/trans';
import { NAVIGATION } from '@cp-util/constant';
import locale from './locale';

export default function View(props) {
  const { lang, setLoading, setAvailableOnMobile } = props;

  // HOOKS
  const browserDetectionHelper = useBrowserDetectionHelper();
  const router = useRouter();

  // STATE
  const [openQrScanner, setOpenQrScanner] = useState(false);
  const [notSupport, setNotSupport] = useState(false);

  // HANDLER
  const handleRedirect = (codeData) => {
    const parsedUrl = getParseUrl(codeData);
    router.push(
      {
        pathname: NAVIGATION.LIFETAG.LifetagMain,
        query: {
          lifetagId: parsedUrl?.params?.lifetagId,
        },
      },
    );
  };

  // URL PARSER
  const getParseUrl = (url) => {
    const prefixUrl = url.split('?')[0];
  
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.forEach((param) => {
      const [key, val] = param.split('=');
      params[key] = decodeURIComponent(val);
    });
  
    return {
      prefix: prefixUrl,
      params: params,
    };
  };
  

  // EFFECTS
  // effect : check browser support navigation camera and open QrScanner
  useEffect(() => {
    if (browserDetectionHelper.browserIsReady) {
      if (browserDetectionHelper.isSupported()) {
        setOpenQrScanner(true);
      } else {
        //camera not support
        setNotSupport(true);
      }
    }

    return () => {
      setOpenQrScanner(false);
    };
  }, [browserDetectionHelper]);

  const modalCameraNotSupport = () => (
    <Modal
      isOpen={notSupport}
      size="sm"
      toggle={() => {
        setNotSupport(false);
        setOpenQrScanner(false);
        setTimeout(() => {
          router.push({ pathname: NAVIGATION.HOME.Home });
        }, 300);
      }}>
      <div className="py-6 px-5 text-center">
        <p className="font-bold text-base md:text-lg">
          {trans(locale, lang, 'titleNotSupport')}
        </p>
        <p className="text-sm pt-4 md:text-base">
          {trans(locale, lang, 'subtitleNotSupport')}
        </p>
      </div>
    </Modal>
  );

  return (
    <Container fullScreen noBackground>
      <QrScanner open={openQrScanner} onDetectedQrCode={handleRedirect} />
      {modalCameraNotSupport()}
    </Container>
  );
}
