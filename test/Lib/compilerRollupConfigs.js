require('../../node_modules/@moomfe/zenjs');
const outputConfigAndInput = require('./utils/outputConfigAndInput');
const compilerRollupConfigsUseBasic = require('../../scripts/init/basic/index');
const compilerConfigs = require('../../scripts/init/basic/util/compilerConfigs');
const compilerRollupConfigs = require('../../scripts/init/basic/util/compilerRollupConfigs');


/**
 * 将传入配置使用 Hu-CLI 的方式解析为 rollup 的配置
 * @param config 需要解析的配置
 * @param useBasic 是否使用 basic/index.js 对代码进行解析
 */
module.exports = ( config, useBasic ) => {
  // 未传入配置文件
  if( config == null ) config = [{}];
  // 传入了正常配置文件
  else if( Object.$isPlainObject( config ) ) config = [ config ];
  // 数组格式的配置文件
  else if( Array.isArray( config ) ){
    if( !config.length ) config.push({});
  }
  // 非正常配置文件
  else throw "???";

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