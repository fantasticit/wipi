const config = require('@fantasticit/code-lint/lib/config/eslint')();

// Here you can modify `config` as needed.
config.rules['require-await'] = 0;
config.rules['import/no-unresolved'] = 0;
config.rules['no-useless-constructor'] = 0;
config.rules['no-empty-function'] = 0;
config.rules['no-param-reassign'] = 0;
config.rules['no-use-before-define'] = 0;
config.rules['no-console'] = 0;
config.rules['@typescript-eslint/no-var-requires'] = 0;
config.rules['@typescript-eslint/explicit-member-accessibility'] = 0;

// .d.ts 中的全局类型引起大量报错，暂无好的解决办法
config.rules['no-undef'] = 0;
config.rules['react/jsx-no-bind'] = 0;
config.rules['class-methods-use-this'] = 0;
config.rules['react/jsx-key'] = 1;
config.rules['react/react-in-jsx-scope'] = 1;
config.rules['no-return-await'] = 1;
config.rules['@typescript-eslint/no-empty-function'] = 1;

module.exports = config;
