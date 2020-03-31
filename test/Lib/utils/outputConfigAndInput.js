const { remove, outputFile } = require('fs-extra');
const { resolve, dirname } = require('path');
const { defaultInput } = require('../const');
const outputConfig = require('./outputConfig');


/**
 * 输出配置及相关文件
 */
module.exports = async (rollupConfigs, config) => {
  // 确保打包入口和出口被删除
  for (const { config: rollupConfig } of rollupConfigs) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.all([
      // 删除打包出口
      remove(rollupConfig.output),
      // 输出打包入口内容或删除打包入口文件
      (
        rollupConfig._code === null
          ? remove(rollupConfig.input)
          : outputFile(rollupConfig.input, rollupConfig._code || defaultInput)
      ),
      // 输出打包所需的其他文件
      outputFiles(rollupConfig)
    ]);
    // 删除无用属性
    delete rollupConfig._code;
    delete rollupConfig._files;
  }

  // 删除无用属性
  delete config._code;
  delete config._files;

  // 输出配置文件
  await outputConfig(config);
};


async function outputFiles({ _files, input }) {
  if (_files) {
    const fileEntries = Object.entries(_files);
    const dir = dirname(input);

    for (const [file, content] of fileEntries) {
      // eslint-disable-next-line no-await-in-loop
      await outputFile(
        resolve(dir, file),
        content
      );
    }
  }
}
