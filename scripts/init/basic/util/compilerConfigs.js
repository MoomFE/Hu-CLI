require('@moomfe/zenjs');
const path = require('path');
const defaultConfig = require('../../../config.js');


module.exports = function compilerConfigs( originConfigs, parentConfig, configs = [] ){
  const rootPath = process.cwd();

  for( const originConfig of originConfigs ){
    const config = Object.$assign( null, parentConfig || defaultConfig, originConfig );
    const inputDir = path.resolve( rootPath, config.inputDir );
    const outputDir = path.resolve( rootPath, config.outputDir );
    const childConfigs = config.pipe;

    config.inputDir = inputDir;
    config.outputDir = outputDir;
    config.input = path.resolve( inputDir, config.input );
    config.output = path.resolve( outputDir, config.output );

    if( Array.isArray( childConfigs ) && childConfigs.length ){
      delete config.pipe;
      compilerConfigs( childConfigs, config, configs );
    }

    configs.push( config );
  }

  return configs;
};