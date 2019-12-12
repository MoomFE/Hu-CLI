require('@moomfe/zenjs');
const { yellow } = require('chalk');
const { resolve } = require('path');
const { pathExists } = require('fs-extra');
const print = require('../../../utils/print.js');




module.exports = async () => {
  const root = process.cwd();
  const configFile = resolve( root, process.env.HU_RUNNING_CONFIG );
  const isConfigFileExists = await pathExists( configFile );
  let config;

  // 未找到配置文件
  if( isConfigFileExists === false ){
    // 使用默认配置
    config = [{}];
  }else{
    // 配置文件报错或无内容导出
    try {
      config = require( configFile );
    } catch ( error ){
      print.start();
      print.log(`配置文件 ( ${ yellow( configFile ) } ) 执行时发生异常, 请确认无误后重试 !`);
      print.error( error );
      print.end();
      process.exit( 0 );
    } finally {
      // 确保配置文件重载时可以读取到最新的配置文件
      delete require.cache[ configFile ];
    }
  }

  // 正常配置文件
  if( Object.$isPlainObject( config ) ){
    config = [ config ];
  }
  // 数组格式的配置文件
  else if( Array.isArray( config ) ){
    if( !config.length ){
      config.push({});
    }
  }
  // 非正常配置文件
  else{
    print.start();
    print.end(`配置文件 ( ${ yellow( configFile ) } ) 不支持此格式, 请确认后重试 !`);
    process.exit( 0 );
  }

  return config;
}