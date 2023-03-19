const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withFonts = require('next-fonts');

const nextConfig = {
  webpack5: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '',
    disableStaticImages: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // basePath: '/portal',
  // assetPrefix: '/portal/',
  env: {
    GOOGLE_TAG_MANAGER: process.env.GOOGLE_TAG_MANAGER,
    GOOGLE_NEW_TAG_MANAGER: process.env.GOOGLE_NEW_TAG_MANAGER,
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
    LIVENESS_SECRET_KEY: process.env.LIVENESS_SECRET_KEY,
    BASE_URL: process.env.BASEURL,
    GOOGLE_DEVICE_ID: process.env.GOOGLE_DEVICE_ID,
    API_FIREBASE: process.env.API_FIREBASE,
  },
};

module.exports = withPlugins(
  [
    [
      {
        trailingSlash: true,
        optimizeImages: false,
        reactStrictMode: true,
      },
    ],
    withImages,
    withFonts,
  ],
  nextConfig,
);
