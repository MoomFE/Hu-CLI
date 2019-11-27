require('@moomfe/zenjs');
const { resolve } = require('path');
const defaultConfig = require('../../config.js');


module.exports = function compilerConfigs( originConfigs, parentConfig, configs = [] ){
  const rootPath = process.cwd();

  for( const originConfig of originConfigs ){
    const config = Object.$assign( null, parentConfig || defaultConfig, originConfig );
    const inputDir = resolve( rootPath, config.inputDir );
    const outputDir = resolve( rootPath, config.outputDir );
    const childConfigs = config.pipe;

    config._mergedConfig = Object.$assign( null, config );
    config._originConfig = Object.$assign( null, originConfig );
    config.inputDir = inputDir;
    config.outputDir = outputDir;
    config.input = resolve( inputDir, config.input );
    config.output = resolve( outputDir, config.output );

    if( config.externals == null ) config.externals = {};
    if( config.pluginOptions == null ) config.pluginOptions = {};

    if( Array.isArray( childConfigs ) && childConfigs.length ){
      delete config.pipe;
      compilerConfigs( childConfigs, config, configs );
    }else{
      configs.push( config );
    }
  }

  return configs;
};