require('../../node_modules/@moomfe/zenjs');
const outputConfigAndInput = require('./utils/outputConfigAndInput');
const initConfig = require('./utils/initConfig');
const compilerRollupConfigsUseBasic = require('../../scripts/init/basic/index');
const compilerConfigs = require('../../scripts/init/basic/compilerConfigs');
const compilerRollupConfigs = require('../../scripts/init/basic/compilerRollupConfigs');


/**
 * 将传入配置使用 Hu-CLI 的方式解析为 rollup 的配置
 * @param config 需要解析的配置
 * @param useBasic 是否使用 basic/index.js 对代码进行解析
 */
module.exports = ( _config, useBasic ) => {
  const config = initConfig( _config );
  let configs = compilerConfigs( config );
  let rollupConfigs = compilerRollupConfigs( configs );

  // 若要使用 basic/index.js 对代码进行解析
  // 则会对配置文件进行检查
  if( useBasic ){
    return new Promise( async resolve => {
      // 输出相关文件
      await outputConfigAndInput( rollupConfigs, config );
      // 执行解析
      await compilerRollupConfigsUseBasic( configs );
      // 执行完成
      resolve( rollupConfigs );
    });
  }

  return rollupConfigs;
}