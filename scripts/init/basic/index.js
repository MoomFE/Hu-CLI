require('@moomfe/zenjs');
const { yellow, bgBlackBright } = require('chalk');
const { pathExists } = require('fs-extra');
const print = require('../../utils/print.js');
const getConfigFile = require('./util/getConfigFile.js');
const compilerConfigs = require('./util/compilerConfigs.js');
const compilerRollupConfigs = require('./util/compilerRollupConfigs.js');



module.exports = async () => {
  const originConfigs = await getConfigFile();
  const configs = compilerConfigs( originConfigs );
  const errors = new Set;

  // 规避一些小问题
  for( const config of configs ){
    // 未定义 format 选项或 format 选项不合法
    if( [ 'amd', 'cjs', 'system', 'esm', 'iife', 'umd' ].includes( config.format ) === false ){
      errors.add(`${ bgBlackBright(' format ') } : 选项必须为 'amd', 'cjs', 'system', 'esm', 'iife', 'umd' 中的一个 !`);
    }
    // 选项 pluginOptions 并非是一个纯粹的对象
    if( Object.$isPlainObject( config.pluginOptions ) === false ){
      errors.add(`${ bgBlackBright(' pluginOptions ') } : 选项必须为一个纯粹的对象, 请检查您的配置文件 !`);
    }
    // 选项 plugins 并非是一个函数
    if( typeof config.plugins !== 'function' ){
      errors.add(`${ bgBlackBright(' plugins ') } : 选项必须为一个函数并且函数返回 plugins 数组, 请检查您的配置文件 !`);
    }
    // 未找到入口文件
    if( await pathExists( config.input ) === false ){
      errors.add(`未找到需要打包的入口文件 ( ${ yellow( config.input ) } ), 请确认后重试 !`);
    }
  }

  // 统一输出错误提示
  if( errors.size ){
    print.start();
    errors.forEach( error => {
      print.log( error );
    });
    print.end();
    process.exit( 0 );
  }

  return compilerRollupConfigs( configs );
};