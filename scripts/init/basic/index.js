const print = require('../../utils/print.js');
const chalk = require('chalk');
const fs = require('fs-extra');
const pluginCommonjs = require('rollup-plugin-commonjs');
const pluginNodeResolve = require('rollup-plugin-node-resolve');
const pluginConsole = require('../../plugins/console');


module.exports = async () => {
  const originConfigs = await require('./util/getConfigFile.js')();
  const configs = require('./util/compilerConfigs')( originConfigs );
  const rollupConfigs = [];

  // 生成 rollup 的配置
  for( const config of configs ){
    rollupConfigs.push({
      input: {
        input: config.input,
        plugins: [
          pluginCommonjs(),
          pluginNodeResolve(),
          pluginConsole( config )
        ]
      },
      output: {
        file: config.output,
        format: 'iife',
        name: undefined,
        silent: true
      }
    });
  }

  // 规避一些小问题
  for( const config of configs ){
    const isInputFileExists = await fs.pathExists( config.input );

    if( !isInputFileExists ){
      print.start();
      print.end(`未找到需要打包的入口文件 ( ${ chalk.yellow( config.input ) } ), 请确认后重试 !`);
      process.exit( 0 );
    }
  }

  return rollupConfigs;
};