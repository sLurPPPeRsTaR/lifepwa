import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import Bootstrap from '@cp-bootstrap/Bootstrap';
import { wrapper } from '@cp-config/Store';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import '@cp-style/_globals.css';
import seo from '../../next-seo.config';
import { MetaIFGLife } from '@cp-config/Images';
import { Head } from '@cp-component';
import { useEffect } from 'react';
import { datadogRum } from '@datadog/browser-rum';
import { ParallaxProvider } from 'react-scroll-parallax';
function MyApp({ Component, pageProps }) {
  const location = typeof window !== 'undefined' && window.location;

  useEffect(() => {
    if (location?.host == 'www.life.id') {
      datadogRum.init({
        applicationId: '7c76ce2d-5aeb-4139-a232-9d407095586a',
        clientToken: 'pub728b560c0ed8f08d654c46cd790d26a8',
        site: 'datadoghq.com',
        service: 'customer-life-by-ifg-pwa',
        env: 'prd',
        // Specify a version number to identify the deployed version of your application in Datadog
        // version: '1.0.0',
        sampleRate: 100,
        sessionReplaySampleRate: 20,
        trackInteractions: true,
        trackResources: true,
        trackLongTasks: true,
        defaultPrivacyLevel: 'mask-user-input',
      });
      datadogRum.startSessionReplayRecording();
    }
  }, []);
  useEffect(() => {
    !(function (t, e, n, s, a, c, i, o, p) {
      (t.AppsFlyerSdkObject = a),
        (t.AF =
          t.AF ||
          function () {
            (t.AF.q = t.AF.q || []).push(
              [Date.now()].concat(Array.prototype.slice.call(arguments)),
            );
          }),
        (t.AF.id = t.AF.id || i),
        (t.AF.plugins = {}),
        (o = e.createElement(n)),
        (p = e.getElementsByTagName(n)[0]),
        (o.async = 1),
        (o.src =
          'https://websdk.appsflyer.com?' +
          (c.length > 0 ? 'st=' + c.split(',').sort().join(',') + '&' : '') +
          (i.length > 0 ? 'af_id=' + i : '')),
        p.parentNode.insertBefore(o, p);
    })(window, document, 'script', 0, 'AF', 'pba', {
      pba: {
        webAppId: '23574ff5-4a2b-42bb-867d-29ade0320eff',
        measurementStatus: true,
      },
    });
    if (window.AF_SDK) {
      window.AF_SDK.PLUGINS.PBA.enableMeasurement();
    }
  }, []);

  return (
    <Bootstrap>
      <Head />
      <ParallaxProvider>
        <Script type="text/jsx" async src={'GOOGLE_TAG_MANAGER'} />
        <Script type="text/jsx" async src={'GOOGLE_NEW_TAG_MANAGER'} />
        <DefaultSeo {...seo} />
        <AnimatePresence initial exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
        <ToastContainer position="top-right" autoClose={5000} closeOnClick />
      </ParallaxProvider>
    </Bootstrap>
  );
}

export default wrapper.withRedux(MyApp);
