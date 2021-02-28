const UAParser = require('ua-parser-js');

export const parseUserAgent = (userAgent) => {
  const uaparser = new UAParser();
  uaparser.setUA(userAgent);
  const uaInfo = uaparser.getResult();
  let msg = `${uaInfo.browser.name || ''} ${uaInfo.browser.version || ''} `;
  msg += ` ${uaInfo.os.name || ''}  ${uaInfo.os.version || ''} `;
  msg += `${uaInfo.device.vendor || ''} ${uaInfo.device.model || ''} ${uaInfo.device.type || ''}`;
  return msg;
};
