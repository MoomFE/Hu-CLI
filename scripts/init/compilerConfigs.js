require('@moomfe/zenjs');
const { resolve, dirname } = require('path');
const defaultConfig = require('../config.js');


/**
 * 编译 Hu-CLI 配置文件
 */
module.exports = function compilerConfigs(originConfigs, parentConfig, configs = []) {
  const HU_RUNNING_CONFIG = process.env.HU_RUNNING_CONFIG;
  let rootPath = process.cwd();

  // 当使用 `-c, --config` 指定了配置文件, 则按照配置文件的层级作为根目录
  if (HU_RUNNING_CONFIG && HU_RUNNING_CONFIG !== 'hu.config.js') {
    rootPath = dirname(
      resolve(rootPath, HU_RUNNING_CONFIG)
    );
  }

  for (const originConfig of originConfigs) {
    const config = Object.$assign(null, parentConfig || defaultConfig, originConfig);
    const inputDir = resolve(rootPath, config.inputDir);
    const outputDir = resolve(rootPath, config.outputDir);
    const childConfigs = config.pipe;

    config._mergedConfig = Object.$assign(null, config);
    config._originConfig = Object.$assign(null, originConfig);
    config.inputDir = inputDir;
    config.outputDir = outputDir;
    config.input = resolve(inputDir, config.input);
    config.output = resolve(outputDir, config.output);

    if (config.externals == null) config.externals = {};
    if (config.pluginOptions == null) config.pluginOptions = {};
    if (config.plugins == null) config.plugins = defaultConfig.plugins;

    if (Array.isArray(childConfigs) && childConfigs.length) {
      delete config.pipe;
      compilerConfigs(childConfigs, config, configs);
    } else {
      configs.push(config);
    }
  }

  return configs;
};
