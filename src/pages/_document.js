import { Head, Html, Main, NextScript } from 'next/document';

function Page() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat&display=optional"
          rel="stylesheet"
        />
        <link
          href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Page;
