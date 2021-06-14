const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const lessToJS = require('less-vars-to-js');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withAntd = require('./next-antd.config');

const antdVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/theme/antd.less'), 'utf8')
);

// fix: prevents error when .less files are required by node
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
  assetPrefix: isProd ? (config && config['CLIENT_ASSET_PREFIX']) || '/' : '/',
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
  webpack: (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    config.plugins.push(
      new FilterWarningsPlugin({
        // ignore ANTD chunk styles [mini-css-extract-plugin] warning
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
