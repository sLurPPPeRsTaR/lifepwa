import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { API, NAVIGATION } from '@cp-util/constant';
import { pageview } from '@cp-util/func';
import { api } from '@cp-bootstrap/bootstrapApi';
import { toast, ToastContainer } from 'react-toastify';
import {
  BetterOpenApp,
  ModalCustomerCare,
  Loading,
  ModalFaqAsk,
  ModalHospital,
  ModalNotAvailable,
  ModalAvailableOnMobile,
  InternalServerError,
  ModalTermNCondition,
  ModalLifeSaverTnc,
  ModalLifeSaverShowRiplay,
  ModalLifetagAccessFailed,
  ModalLifetagNotActive,
  ModalLifetagOutOffStock,
  ModalLifetagPairingFailed,
  ModalLifetagReadyToConnect,
  Toast,
  ModalReferral,
} from '@cp-component';
import 'react-toastify/dist/ReactToastify.css';

function Bootstrap({
  lang,
  token,
  userData,
  children,
  setDeviceId,
  setAppConfig,
  isLoading,
  isFaqAsk,
  setFaqAsk,
  isHospital,
  setHospital,
  isCustomerCare,
  setCustomerCare,
  isBetterOpenApp,
  setBetterOpenApp,
  isNotAvailable,
  setNotAvailable,
  isAvailableOnMobile,
  setAvailableOnMobile,
  isInternalServerError,
  setInternalServerError,
  isLifetagAccessFailed,
  setLifetagAccessFailed,
  isLifetagNotActive,
  setLifetagNotActive,
  isLifetagOutOffStock,
  setLifetagOutOffStock,
  isLifetagPairingFailed,
  setLifetagPairingFailed,
  isLifetagReadyToConnect,
  setLifetagReadyToConnect,
  toastMsg,
  isModalTermNCondition,
  setModalTermNCondition,
  isModalLsTnc,
  setModalLsTnc,
  isModalShowRiplay,
  setModalShowRiplay,
  tncAgree,
  setSubmission,
  getCheckIssuedPolicy,
  getCheckIssuedPolicySuccess,
  isReferral,
  setReferral,
}) {
  const router = useRouter();
  const unProtectRoutes = [
    NAVIGATION.FAQ.FaqMain,
    NAVIGATION.FORPASS.Forpass,
    NAVIGATION.FORPASS.ForpassUat,
    NAVIGATION.LIFESAVER.LifesaverBajoRun,
    NAVIGATION.HOME.HomeListProduct,
    NAVIGATION.LIFESAVER.LifesaverMain,
    NAVIGATION.LIFECOVER.LifecoverMain,
    NAVIGATION.LIFECOVER.LifecoverSelectPackage,
    NAVIGATION.LIFECOVER.LifecoverFAQ,
    NAVIGATION.LIFECOVER.LifecoverComponent,
    NAVIGATION.TNC.TNCMain,
    NAVIGATION.TNC.TNCPortalMain,
    NAVIGATION.LIFESAVER.LifesaverCheckPayment,
    NAVIGATION.LIFESAVER.LifesaverSuccess,
    NAVIGATION.EVENT.EventMain,
    NAVIGATION.LIFETAG.LifetagMain,
    NAVIGATION.LIFETAG.LifetagScanner,
    NAVIGATION.LIFETAG.LifetagConfirm,
    NAVIGATION.LIFETAG.LifetagConfirmAddress,
    NAVIGATION.LIFETAG.LifetagDetailOrder,
    NAVIGATION.LIFETAG.LifetagDetailProduct,
    `${NAVIGATION.EVENT.EventDetail}/[...slug]`,
    NAVIGATION.EVENT.EventVoucherQrCode,
    NAVIGATION.UNSUBSCRIBE.UnsubscribeNewletter,
    NAVIGATION.EVENT.EventConfirmPayment,
    NAVIGATION.KYC.KycUploadSelfie,
    NAVIGATION.UPDATA.UpdataInformation,
    NAVIGATION.UPDATA.UpdataForm,
    NAVIGATION.UPDATA.UpdataUploadKK,
    NAVIGATION.UPDATA.UpdataPhone,
    NAVIGATION.UPDATA.UpdataUploadSelfie,
    NAVIGATION.ARTICLE.ArticleMain,
    NAVIGATION.CLAIMPOLIS.ClaimDetail,
    `${NAVIGATION.ARTICLE.ArticleDetail}/[...slug]`,
    '/404',
    '/loading',
    '/lifesaver/confirm-other/',
  ];

  const onHandleUnProtectRoutes = useCallback(() => {
    let routerPathName = router?.pathname;
    let newPath = '';
    let routerAsPathName = router?.asPath;

    if (
      routerPathName?.startsWith('/life-saver') ||
      routerPathName?.toLowerCase().startsWith('/lifesaver')
    ) {
      //split route.pathname
      const routerSplit = routerPathName.split('/');

      //determine if lifesaver has subpath or not. if it has, then set.
      if (routerSplit.length > 1) {
        for (var i = 0; i < routerSplit.length; i++) {
          if (i > 1) newPath = '/' + routerSplit[i];
        }
      }

      routerPathName = '/lifesaver' + newPath;
    } else if (
      routerAsPathName?.startsWith('/life-cover') ||
      routerAsPathName?.toLowerCase().startsWith('/lifecover')
    ) {
      const routerSplit = routerPathName.split('/');

      if (routerSplit.length > 1) {
        for (var i = 0; i < routerSplit.length; i++) {
          if (i > 1) newPath = '/' + routerSplit[i];
        }
      }

      routerPathName = '/lifecover' + newPath;
    }

    console.log('log routerPathName', routerPathName);
    console.log('log routerAsPathName', routerAsPathName);
    console.log('log newPath', newPath);
    if (!unProtectRoutes?.includes(routerPathName)) {
      console.log('log HOME');
      router.push({
        pathname: NAVIGATION.HOME.Home,
      });
    } else if (
      routerPathName?.startsWith('/lifesaver') ||
      routerPathName?.startsWith('/lifecover')
    ) {
      router.push({
        pathname: routerPathName,
      });
    }
  }, [router]);

  // const onHandleLifeSaverRoutes = useCallback(() => {
  //   const replaceRoutes = ['life-saver','lifeSAVER'];

  //   console.log("panggil sini");
  //   console.log(router?.pathname);
  //   if(replaceRoutes?.includes(router?.pathname) || router?.pathname?.includes(replaceRoutes)){

  //     const replacePathname = router.pathname.replace("lifeSAVER","lifesaver");
  //     replacePathname =replacePathname.replace("life-saver","lifesaver");

  //     console.log(replacePathname);

  //     router.push({
  //       pathname: replacePathname
  //     });
  //   }

  // }, [router]);

  // life tag
  // useEffect(() => {
  //   if (
  //     router?.pathname == NAVIGATION.LIFETAG.LifetagMain ||
  //     router?.pathname == NAVIGATION.LIFETAG.LifetagOrder ||
  //     router?.pathname == NAVIGATION.LIFETAG.LifetagScanner ||
  //     router?.pathname == NAVIGATION.LIFETAG.LifetagDetailProduct
  //   ) {
  //     router.push({ pathname: '/' });
  //   }
  // }, [router]);

  useEffect(() => {
    onHandleUnProtectRoutes();
    //onHandleLifeSaverRoutes();
  }, []);

  useEffect(() => {
    if (
      userData?.deviceId === null ||
      userData?.deviceId === undefined ||
      userData?.deviceId === ''
    ) {
      setDeviceId(uuidv4());
    }
  }, []);

  useEffect(() => {
    api.get(API.CONFIG.customerapps).then((res) => {
      setAppConfig({ features: res?.data?.data?.features });
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };

    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (toast.isActive('toast1')) {
      toast.dismiss();
    }

    if (toastMsg?.type === 'error') {
      toast.error(toastMsg?.text1, {
        toastId: 'toast1',
      });
    }
  }, [toastMsg]);

  useEffect(() => {
    if (token && userData?.alreadyKYC) {
      getCheckIssuedPolicy();
    }
  }, [token, userData?.alreadyKYC]);

  return (
    <>
      {router?.pathname !== '/syarat-dan-ketentuan' &&
      router?.pathname !== '/portal/syarat-dan-ketentuan' &&
      router?.pathname !== '/loading' ? (
        <BetterOpenApp
          lang={lang}
          isOpen={isBetterOpenApp}
          setClose={setBetterOpenApp}
        />
      ) : null}
      {children}

      <Loading isOpen={isLoading} />
      <ModalCustomerCare
        lang={lang}
        isOpen={isCustomerCare}
        setClose={setCustomerCare}
      />
      <InternalServerError
        lang={lang}
        isOpen={isInternalServerError}
        setClose={setInternalServerError}
      />
      <ModalNotAvailable
        lang={lang}
        isOpen={isNotAvailable}
        setClose={setNotAvailable}
      />
      <ModalAvailableOnMobile
        lang={lang}
        isOpen={isAvailableOnMobile}
        setClose={setAvailableOnMobile}
      />
      <ModalLifeSaverTnc
        lang={lang}
        isOpen={isModalLsTnc}
        setClose={setModalLsTnc}
      />
      <ModalLifeSaverShowRiplay
        lang={lang}
        isOpen={isModalShowRiplay}
        setClose={setModalShowRiplay}
      />
      {/* modal lifetag */}
      <ModalLifetagAccessFailed
        lang={lang}
        isOpen={isLifetagAccessFailed}
        setClose={setLifetagAccessFailed}
      />
      <ModalLifetagNotActive
        lang={lang}
        isOpen={isLifetagNotActive}
        setClose={setLifetagNotActive}
      />
      <ModalLifetagOutOffStock
        lang={lang}
        isOpen={isLifetagOutOffStock}
        setClose={setLifetagOutOffStock}
      />
      <ModalLifetagPairingFailed
        lang={lang}
        isOpen={isLifetagPairingFailed}
        setClose={setLifetagPairingFailed}
      />
      <ModalLifetagReadyToConnect
        lang={lang}
        isOpen={isLifetagReadyToConnect}
        setClose={setLifetagReadyToConnect}
      />
      <Toast
        warn={toastMsg?.warn}
        error={toastMsg?.error}
        title={toastMsg?.title}
        isOpen={toastMsg?.isOpen}
      />
      <ModalHospital lang={lang} isOpen={isHospital} setClose={setHospital} />
      <ModalReferral lang={lang} isOpen={isReferral} setClose={setReferral} />
      <ModalFaqAsk lang={lang} isOpen={isFaqAsk} setClose={setFaqAsk} />
      {toastMsg?.type == 'error' && <ToastContainer position="top-right" />}
    </>
  );
}

export default Bootstrap;
