/* eslint-disable import/no-extraneous-dependencies */


const { readFile } = require('fs-extra');
const { init } = require('./runBuildCommand');
const build = require('../../scripts/init/build');
const proxyLog = require('./utils/proxyLog');
const initConfig = require('./utils/initConfig');


/**
 * 调用 build.js 对传入配置进行打包,
 * 执行较快
 */
module.exports = async (userConfig) => {
  const config = initConfig(userConfig);
  const rollupConfigs = await init(config);

  // 执行指令
  return (async () => {
    const codes = [];

    // 执行打包程序
    const stdout = await proxyLog(async () => {
      await build(rollupConfigs);
    });

    // 读取所有输出文件内容
    for (const { config: rollupConfig } of rollupConfigs) {
      codes.push(
        // eslint-disable-next-line no-await-in-loop
        await readFile(rollupConfig.output, 'utf-8')
      );
    }

    // 返回结果
    return { codes, stdout, logs: stdout };
  })();
};
