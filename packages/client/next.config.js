const fs = require('fs');
const path = require('path');
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

const nextConfig = {
  assetPrefix: isProd ? 'https://cdn.blog.wipi.tech' : '/',
  webpack: (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    config.plugins.push(
      new FilterWarningsPlugin({
        // ignore ANTD chunk styles [mini-css-extract-plugin] warning
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
  ],
  nextConfig
);
