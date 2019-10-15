require('@moomfe/zenjs');
const print = require('../../../utils/print.js');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');


module.exports = async () => {
  const root = process.cwd();
  const configFile = path.resolve( root, 'hu.config.js' );
  const isConfigFileExists = await fs.pathExists( configFile );
  let config;

  // 未找到配置文件
  if( !isConfigFileExists ){
    print.start();
    print.end(`未能在指令执行目录 ( ${ chalk.yellow( root ) } ) 查找到配置文件 ( ${ chalk.yellow('hu.config.js') } ), 请确认后重试 !`);
    process.exit( 0 );
  }

  // 配置文件报错或无内容导出
  try {
    config = require( configFile );
  } catch ( error ){
    print.start();
    print.log(`配置文件 ( ${ chalk.yellow( configFile ) } ) 执行时发生异常, 请确认无误后重试 !`);
    print.error( error );
    print.end();
    process.exit( 0 );
  } finally {
    // 确保配置文件重载时可以读取到最新的配置文件
    delete require.cache[ configFile ];
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
    print.end(`配置文件 ( ${ chalk.yellow( configFile ) } ) 不支持此格式, 请确认后重试 !`);
    process.exit( 0 );
  }

  return config;
}