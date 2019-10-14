require('colors');
const print = require('../../../utils/print.js');
const path = require('path');
const fs = require('fs-extra');


module.exports = async () => {
  const root = process.cwd();
  const configFile = path.resolve( root, 'hu.config.js' );
  const isConfigFileExists = await fs.pathExists( configFile );
  let config;

  print.start();

  // 未找到配置文件
  if( !isConfigFileExists ){
    print.end(`未能在指令执行目录 ( ${ root.yellow } ) 查找到配置文件 ( ${ 'hu.config.js'.yellow } ), 请确认后重试 !`);
    process.exit( 0 );
  }

  // 配置文件报错或无内容导出
  try {
    config = require( configFile );

    if( JSON.stringify( config) === '{}' ){
      throw "";
    }
  } catch ( error ){
    print.end(`配置文件  ( ${ configFile.yellow } ) 为空或有误, 请确认无误后重试 !`);
    process.exit( 0 );
  } finally {
    // 确保配置文件重载时可以读取到最新的配置文件
    delete require.cache[ configFile ];
  }

  return config;
}