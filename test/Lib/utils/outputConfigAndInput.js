const { remove, outputFile } = require('fs-extra');
const { resolve, dirname } = require('path');
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
      // 输出打包入口内容或删除打包入口文件
      (
        config._code === null
          ? remove( config.input )
          : outputFile( config.input, config._code || defaultInput )
      ),
      // 输出打包所需的其他文件
      outputFiles( config )
    ]);
    // 删除无用属性
    delete config._code;
    delete config._files;
  }

  // 删除无用属性
  delete config._code;
  delete config._files;

  // 输出配置文件
  await outputConfig( config );
}


async function outputFiles({ _files, input }){
  if( _files ){
    const fileEntries = Object.entries( _files );
    const dir = dirname( input );

    for( const [ file, content ] of fileEntries ){
      await outputFile(
        resolve( dir, file ),
        content
      );
    }
  }
}