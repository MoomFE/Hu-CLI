require('@moomfe/zenjs');
const babel = require('@rollup/plugin-babel').babel;

module.exports = (config) => {
  const babelOption = config.pluginOptions.babel || {};
  const presets = babelOption.presets;

  // babelHelpers 的默认值为 'bundled' 但必须显式定义, 否则控制台会报错
  if (babelOption.babelHelpers === undefined) {
    babelOption.babelHelpers = 'bundled';
  }

  // 当检测到 `babel` 的 `@babel/preset-env` 预设的 `targets` 选项为字符串 `browserslist` 时
  // 替换为当前配置文件的 browserslist 配置
  if (Array.isArray(presets)) {
    for (let i = 0, len = presets.length; i < len; i++) {
      const preset = presets[i];

      if (Array.isArray(preset) && preset[0] === '@babel/preset-env') {
        const presetConfig = preset[1];

        if (Object.$isPlainObject(presetConfig) && presetConfig.targets === 'browserslist') {
          presetConfig.targets = config.browserslist;
          break;
        }
      }
    }
  }

  return babel(babelOption);
};
