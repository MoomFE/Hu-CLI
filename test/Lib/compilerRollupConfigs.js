require('../../node_modules/@moomfe/zenjs');
const compilerConfigs = require('../../scripts/init/basic/util/compilerConfigs');
const compilerRollupConfigs = require('../../scripts/init/basic/util/compilerRollupConfigs');


module.exports = ( config ) => {

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

  const configs = compilerConfigs( config );
  const rollupConfigs = compilerRollupConfigs( configs );

  return rollupConfigs;
}