/* eslint-disable import/no-extraneous-dependencies */


const { readFile } = require('fs-extra');
const { exec } = require('child_process');
const { root } = require('./const');
const initConfig = require('./utils/initConfig');
const compilerRollupConfigs = require('./compilerRollupConfigs');
const outputConfigAndInput = require('./utils/outputConfigAndInput');


/**
 * 调用 build 指令对传入配置进行打包,
 * 执行较慢
 */
module.exports = async (
  userConfig,
  command = 'npm run build'
) => {
  const config = initConfig(userConfig);
  const rollupConfigs = await module.exports.init(config);

  // 执行指令
  return new Promise((resolve, reject) => {
    exec(command, { cwd: root }, async (error, stdout, stderr) => {
      if (error) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ error, stdout, stderr });
      } else {
        const codes = [];

        // 读取所有输出文件内容
        for (const { config: rollupConfig } of rollupConfigs) {
          codes.push(
            // eslint-disable-next-line no-await-in-loop
            await readFile(rollupConfig.output, 'utf-8')
          );
        }

        resolve({ codes, stdout, logs: stdout });
      }
    });
  });
};

/**
 * 在执行打包前的一些预处理
 */
module.exports.init = async (config) => {
  // 解析为最终配置
  const rollupConfigs = compilerRollupConfigs(config);

  // 输出打包相关文件
  await outputConfigAndInput(rollupConfigs, config);

  return rollupConfigs;
};
