require('@moomfe/zenjs');
const { yellow, bgBlackBright } = require('chalk');
const { pathExists } = require('fs-extra');
const print = require('../../utils/print.js');
const getConfigFile = require('./util/getConfigFile.js');
const compilerConfigs = require('./util/compilerConfigs.js');
const compilerRollupConfigs = require('./util/compilerRollupConfigs.js');



module.exports = async ( _configs ) => {
  const errors = new Set;
  const configs = _configs || compilerConfigs(
    await getConfigFile()
  );

  // 规避一些小问题
  for( const config of configs ){
    // 不合法的 mode 选项
    if( [ 'development', 'production', true, false ].includes( config.mode ) === false ){
      errors.add(`${ bgBlackBright(' mode ') } : 选项必须为 'development', 'production', true, false 中的一个, 请检查您的配置文件 !`);
    }
    // 未定义 format 选项
    if( [ 'amd', 'cjs', 'system', 'esm', 'iife', 'umd' ].includes( config.format ) === false ){
      errors.add(`${ bgBlackBright(' format ') } : 选项必须为 'amd', 'cjs', 'system', 'esm', 'iife', 'umd' 中的一个, 请检查您的配置文件 !`);
    }
    // 选项 pluginOptions 并非是一个纯粹的对象
    if( Object.$isPlainObject( config.pluginOptions ) === false ){
      errors.add(`${ bgBlackBright(' pluginOptions ') } : 选项必须为一个纯粹的对象, 请检查您的配置文件 !`);
    }
    // 选项 plugins 并非是一个函数
    if( ZenJS.isFunction( config.plugins ) === false ){
      errors.add(`${ bgBlackBright(' plugins ') } : 选项必须为一个函数并且函数返回 plugins 数组, 请检查您的配置文件 !`);
    }
    // 选项 configureRollup 并非是一个函数
    if( ZenJS.isFunction( config.configureRollup ) === false ){
      errors.add(`${ bgBlackBright(' configureRollup ') } : 选项必须为一个函数, 请检查您的配置文件 !`);
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