import React from 'react'
import Head from 'next/head';

export default function index({
  title = 'Life by IFG',
  shortcut_icon = '/favicon.ico',
  description = 'Melindungi dengan Easy, Jalani Hidup Tanpa Worry!',
  fb_app_id = '612054723363946',
  og_type = 'website',
  og_url = 'https://www.life.id/',
  og_description = `Dengan Life by IFG, nikmati kemudahan akses informasi polis IFG Life di genggaman tangan Anda. Melindungi dengan easy, jalani hidup tanpa worry! IFG Life, Protecting Life's Progress.`,
  og_image = 'https://www.life.id/api/v1/public/assets/lifesaveroggraph.jpeg',
  twitter_card = 'summary_large_image'
}) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href={shortcut_icon} />
      <meta
        name="description"
        content={description}
      />
      <meta name="facebook-domain-verification" content="8bsx3clxzncc28x4bvfdn9nimgofdg" />
      <meta property="fb:app_id" content={fb_app_id} />
      <meta property="og:type" content={og_type} />
      <meta property="og:url" content={og_url} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={og_description}
      />
      <meta
        property="og:image"
        content={og_image}
      />

      <meta property="twitter:card" content={twitter_card} />
      <meta property="twitter:url" content={og_url} />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content={og_description}
      />
      <meta
        property="twitter:image"
        content={og_image}
      />
    </Head>
  )
}
