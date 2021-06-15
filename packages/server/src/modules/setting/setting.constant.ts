import * as fs from 'fs-extra';
import * as path from 'path';
const config = require('../../../../../config');

export const i18n = config.i18n;

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
