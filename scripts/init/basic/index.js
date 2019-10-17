const { yellow } = require('chalk');
const { pathExists } = require('fs-extra');
const pluginCommonjs = require('rollup-plugin-commonjs');
const pluginNodeResolve = require('rollup-plugin-node-resolve');
const print = require('../../utils/print.js');
const pluginConsole = require('../../plugins/console.js');
const pluginBanner = require('../../plugins/banner.js');


module.exports = async () => {
  const originConfigs = await require('./util/getConfigFile.js')();
  const configs = require('./util/compilerConfigs')( originConfigs );
  const rollupConfigs = [];

  // 生成 rollup 的配置
  for( const config of configs ){
    const plugins = [
      pluginCommonjs(),
      pluginNodeResolve(),
      {
        name: '__first__'
      },
      ...config.plugins(),
      {
        name: '__last__'
      },
      pluginBanner( config ),
      pluginConsole( config )
    ];

    rollupConfigs.push({
      config,
      input: {
        input: config.input,
        plugins: plugins.$deleteValue()
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
    const isInputFileExists = await pathExists( config.input );

    if( !isInputFileExists ){
      print.start();
      print.end(`未找到需要打包的入口文件 ( ${ yellow( config.input ) } ), 请确认后重试 !`);
      process.exit( 0 );
    }
  }

  return rollupConfigs;
};