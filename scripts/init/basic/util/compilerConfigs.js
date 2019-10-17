require('@moomfe/zenjs');
const { bgBlackBright } = require('chalk');
const { resolve } = require('path');
const print = require('../../../utils/print.js');
const defaultConfig = require('../../../config.js');


module.exports = function compilerConfigs( originConfigs, parentConfig, configs = [] ){
  const rootPath = process.cwd();

  for( const originConfig of originConfigs ){
    const config = Object.$assign( null, parentConfig || defaultConfig, originConfig );
    const inputDir = resolve( rootPath, config.inputDir );
    const outputDir = resolve( rootPath, config.outputDir );
    const childConfigs = config.pipe;

    config.inputDir = inputDir;
    config.outputDir = outputDir;
    config.input = resolve( inputDir, config.input );
    config.output = resolve( outputDir, config.output );

    if( ZenJS.isFunction( config.plugins ) === false ){
      print.start();
      print.end(`${ bgBlackBright(' plugins ') } : 选项必须为一个函数并且函数返回 plugins 数组`);
      process.exit( 0 );
    }

    if( Object.$isPlainObject( config.pluginOptions ) === false ){
      config.pluginOptions = {};
    }

    if( Array.isArray( childConfigs ) && childConfigs.length ){
      delete config.pipe;
      compilerConfigs( childConfigs, config, configs );
    }

    configs.push( config );
  }

  return configs;
};