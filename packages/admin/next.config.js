const fs = require('fs');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const lessToJS = require('less-vars-to-js');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const { config } = require('../../config/env');
const withAntd = require('./next-antd.config');
const antdVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/theme/antd.less'), 'utf8')
);

const nextConfig = {
  assetPrefix: config.ADMIN_ASSET_PREFIX,
  env: {
    SERVER_API_URL: config.SERVER_API_URL,
  },
  webpack: (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    );

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
    [withImages],
  ],
  nextConfig
);
