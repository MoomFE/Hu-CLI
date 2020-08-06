/* eslint-disable import/no-extraneous-dependencies */


require('@moomfe/zenjs');
const outputConfigAndInput = require('./utils/outputConfigAndInput');
const initConfig = require('./utils/initConfig');
const compilerRollupConfigsUseBasic = require('../../scripts/init/index');
const compilerConfigs = require('../../scripts/init/compilerConfigs');
const compilerRollupConfigs = require('../../scripts/init/compilerRollupConfigs');


/**
 * 将传入配置使用 Hu-CLI 的方式解析为 rollup 的配置
 * @param config 需要解析的配置
 * @param useBasic 是否使用 basic/index.js 对代码进行解析
 */
module.exports = (userConfig, useBasic) => {
  const config = initConfig(userConfig);
  const configs = compilerConfigs(config);
  const rollupConfigs = compilerRollupConfigs(configs);

  // 若要使用 basic/index.js 对代码进行解析
  // 则会对配置文件进行检查
  if (useBasic) {
    return (async () => {
      // 输出相关文件
      await outputConfigAndInput(rollupConfigs, config);
      // 执行解析
      await compilerRollupConfigsUseBasic(configs);
      // 执行完成
      return rollupConfigs;
    })();
  }

  return rollupConfigs;
};
