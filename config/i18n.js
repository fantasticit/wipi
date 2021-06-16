const path = require('path');
const fs = require('fs-extra');

function parseI18n() {
  const localesDir = path.join(__dirname, '../locales');

  if (!fs.existsSync(localesDir)) {
    return { i18n: {}, locales: [], defaultLocale: '' };
  }

  const files = fs.readdirSync(localesDir);
  const messages = files.reduce((i18n, file) => {
    const language = file.replace(path.extname(file), '');
    const json = fs.readJsonSync(path.join(localesDir, file));
    i18n[language] = json;
    return i18n;
  }, {});
  const locales = Object.keys(messages);
  const defaultLocale = 'zh' in messages ? 'zh' : locales[0];

  return { messages, locales, defaultLocale };
}

module.exports = parseI18n();
