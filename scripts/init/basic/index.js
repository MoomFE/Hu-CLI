require('colors');
const print = require('../../utils/print.js');
const fs = require('fs-extra');
const pluginCommonjs = require('rollup-plugin-commonjs');
const pluginNodeResolve = require('rollup-plugin-node-resolve');


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
          pluginNodeResolve()
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
      print.end(`未找到需要打包的入口文件 ( ${ config.input.yellow } ), 请确认后重试 !`);
      process.exit( 0 );
    }
  }

  return rollupConfigs;
};