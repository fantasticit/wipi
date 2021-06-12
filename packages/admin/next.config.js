const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const lessToJS = require('less-vars-to-js');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withAntd = require('./next-antd.config');

const antdVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/theme/antd.less'), 'utf8')
);

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {};
}

const isProd = process.env.NODE_ENV === 'production';
const config = (() => {
  const env = path.resolve(__dirname, '../../.env');
  const prodenv = path.resolve(__dirname, '../../.env.prod');

  try {
    if (isProd && fs.existsSync(prodenv)) {
      return dotenv.parse(fs.readFileSync(prodenv));
    }
    if (fs.existsSync(env)) {
      return dotenv.parse(fs.readFileSync(env));
    }
  } catch (e) {}
})();

const nextConfig = {
  assetPrefix: isProd ? (config && config['ADMIN_ASSET_PREFIX']) || '/' : '/',
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
