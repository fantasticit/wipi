import * as get from 'lodash/get';
import * as UAParser from 'ua-parser-js';

const keys = [
  'browser.name',
  'browser.version',
  'engine.name',
  'engine.version',
  'os.name',
  'os.version',
  'device.vendor',
  'device.model',
  'device.type',
];

const joinMsg = (ua, keys) =>
  keys
    .map((key) => get(ua, key))
    .filter(Boolean)
    .join(' ');

export const parseUserAgent = (userAgent) => {
  const uaparser = new UAParser();
  uaparser.setUA(userAgent);
  const ua = uaparser.getResult();

  return {
    data: {
      browser: joinMsg(ua, keys.slice(0, 1)),
      engine: joinMsg(ua, keys.slice(2, 3)),
      os: joinMsg(ua, keys.slice(4, 5)),
      device: joinMsg(ua, keys.slice(6)),
    },
    text: joinMsg(ua, keys),
  };
};
