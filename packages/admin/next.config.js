const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');
const withPWA = require('next-pwa');
const { config } = require('@wipi/config');
const antdVariablesFilePath = path.resolve(__dirname, './antd-custom.less');

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: config.ADMIN_ASSET_PREFIX,
  env: {
    SERVER_API_URL: config.SERVER_API_URL,
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV !== 'production',
          dest: '.next',
          sw: 'service-worker.js',
        },
      },
    ],
    [
      withLess,
      {
        lessLoaderOptions: {
          additionalData: (content) => `${content}\n\n@import '${antdVariablesFilePath}';`,
        },
      },
    ],
  ],
  nextConfig
);
