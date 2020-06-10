/* eslint-disable import/no-extraneous-dependencies */


require('@moomfe/zenjs');


/**
 * 在执行打包前对传入的 config 进行预处理
 */
module.exports = (config) => {
  // 未传入配置文件
  if (config == null) config = [{}];
  // 传入了正常配置文件
  else if (Object.$isPlainObject(config)) config = [config];
  // 数组格式的配置文件
  else if (Array.isArray(config)) {
    if (!config.length) config.push({});
    // eslint-disable-next-line brace-style
  }
  // 非正常配置文件
  else throw new Error('???');

  return config;
};
