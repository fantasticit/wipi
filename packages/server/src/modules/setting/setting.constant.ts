import * as fs from 'fs-extra';
import * as path from 'path';

export const i18n = (() => {
  try {
    const localesDir = path.join(__dirname, '../../../../../locales');

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
  } catch (e) {
    return {};
  }
})();

export const UNPROTECTED_KEYS = [
  'i18n',
  'systemUrl',
  'adminSystemUrl',
  'systemTitle',
  'systemLogo',
  'systemFavicon',
  'systemFooterInfo',
  'seoKeyword',
  'seoDesc',
  'baiduAnalyticsId',
  'googleAnalyticsId',
];
