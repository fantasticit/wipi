const fs = require('fs-extra');
const path = require('path');
const dotenv = require('dotenv');
const isProd = process.env.NODE_ENV === 'production';

exports.envfile = (() => {
  const localenv = path.resolve(__dirname, '../.env');
  const prodenv = path.resolve(__dirname, '../.env.prod');
  if (!fs.existsSync(localenv) && !fs.existsSync(prodenv)) {
    throw new Error('Can not locate  any .env file in ' + __dirname);
  }
  if (isProd && fs.existsSync(prodenv)) return prodenv;
  return localenv;
})();

exports.config = dotenv.parse(fs.readFileSync(exports.envfile));

exports.i18n = (() => {
  const localesDir = path.join(__dirname, '../locales');
  if (fs.existsSync(localesDir)) {
    const files = fs.readdirSync(localesDir);
    return files.reduce((i18n, file) => {
      const language = file.replace(path.extname(file), '');
      const json = fs.readJsonSync(path.join(localesDir, file));
      i18n[language] = json;
      return i18n;
    }, {});
  }
  return {};
})();
exports.locales = Object.keys(exports.i18n);
exports.defaultLocale = 'zh' in exports.i18n ? 'zh' : exports.locales[0];
