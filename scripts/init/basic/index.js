const { yellow } = require('chalk');
const { pathExists } = require('fs-extra');
const print = require('../../utils/print.js');
const getConfigFile = require('./util/getConfigFile.js');
const compilerConfigs = require('./util/compilerConfigs.js');
const compilerRollupConfigs = require('./util/compilerRollupConfigs.js');



module.exports = async () => {
  const originConfigs = await getConfigFile();
  const configs = compilerConfigs( originConfigs );
  const rollupConfigs = compilerRollupConfigs( configs );

  // 规避一些小问题
  for( const config of configs ){
    const isInputFileExists = await pathExists( config.input );

    if( !isInputFileExists ){
      print.start();
      print.end(`未找到需要打包的入口文件 ( ${ yellow( config.input ) } ), 请确认后重试 !`);
      process.exit( 0 );
    }
  }

  return rollupConfigs;
};