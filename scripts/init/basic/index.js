const { yellow, bgBlackBright } = require('chalk');
const { pathExists } = require('fs-extra');
const print = require('../../utils/print.js');
const getConfigFile = require('./util/getConfigFile.js');
const compilerConfigs = require('./util/compilerConfigs.js');
const compilerRollupConfigs = require('./util/compilerRollupConfigs.js');



module.exports = async () => {
  const originConfigs = await getConfigFile();
  const configs = compilerConfigs( originConfigs );

  // 规避一些小问题
  for( const config of configs ){
    // 选项 pluginOptions 并非是一个纯粹的对象
    if( Object.$isPlainObject( config.pluginOptions ) === false ){
      print.start();
      print.end(`${ bgBlackBright(' pluginOptions ') } : 选项必须为一个纯粹的对象, 请检查您的配置文件 !`);
      process.exit( 0 );
    }
    // 选项 plugins 并非是一个函数
    if( typeof config.plugins !== 'function' ){
      print.start();
      print.end(`${ bgBlackBright(' plugins ') } : 选项必须为一个函数并且函数返回 plugins 数组, 请检查您的配置文件 !`);
      process.exit( 0 );
    }
    // 未找到入口文件
    if( await pathExists( config.input ) === false ){
      print.start();
      print.end(`未找到需要打包的入口文件 ( ${ yellow( config.input ) } ), 请确认后重试 !`);
      process.exit( 0 );
    }
  }

  return compilerRollupConfigs( configs );
};