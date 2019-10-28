const { remove, outputFile } = require('fs-extra');
const { defaultInput } = require('../const');
const outputConfig = require('./outputConfig');


/**
 * 输出配置及相关文件
 */
module.exports = async ( rollupConfigs, config ) => {
  // 确保打包入口和出口被删除
  for( const { config } of rollupConfigs ){
    await Promise.all([
      // 删除打包出口
      remove( config.output ),
      // 输出打包入口内容
      outputFile( config.input, config._code || defaultInput )
    ]);
    // 删除无用属性
    delete config._code;
  }

  // 删除无用属性
  delete config._code;

  // 输出配置文件
  await outputConfig( config );
}