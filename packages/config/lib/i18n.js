"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLocale = exports.locales = exports.messages = void 0;
const fs = require("fs-extra");
const path = require("path");
function parseI18n() {
    const localesDir = path.join(__dirname, '../../../locales');
    if (!fs.existsSync(localesDir)) {
        return { messages: {}, locales: [], defaultLocale: '' };
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
_a = parseI18n(), exports.messages = _a.messages, exports.locales = _a.locales, exports.defaultLocale = _a.defaultLocale;
//# sourceMappingURL=i18n.js.map