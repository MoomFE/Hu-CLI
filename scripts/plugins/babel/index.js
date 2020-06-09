const babel = require('@rollup/plugin-babel').babel;

module.exports = (config) => {
  const babelOption = config.pluginOptions.babel || {};

  // babelHelpers 的默认值为 'bundled' 但必须显式定义, 否则控制台会报错
  if (babelOption.babelHelpers === undefined) {
    babelOption.babelHelpers = 'bundled';
  }

  return babel(babelOption);
};
