const fs = require('fs');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const lessToJS = require('less-vars-to-js');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const { config } = require('../../config/env');
const { locales, defaultLocale } = require('../../config/i18n');
const withAntd = require('./next-antd.config');
const antdVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/theme/antd.less'), 'utf8')
);

const nextConfig = {
  assetPrefix: config.CLIENT_ASSET_PREFIX,
  i18n: {
    locales,
    defaultLocale,
  },
  env: {
    SERVER_API_URL: config.SERVER_API_URL || 'http://localhost:4000/api',
  },
  webpack: (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    );
    config.node = config.node || {};
    config.node.fs = 'empty';
    return config;
  },
};

module.exports = withPlugins(
  [
    [withCss],
    [
      withSass,
      {
        cssModules: true,
        localIdentName: '[name]__[local]_[hash:base64:5]',
      },
    ],
    [
      withAntd,
      {
        cssModules: true,
        cssLoaderOptions: {
          sourceMap: false,
          importLoaders: 1,
        },
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: antdVariables,
        },
      },
    ],
  ],
  nextConfig
);
