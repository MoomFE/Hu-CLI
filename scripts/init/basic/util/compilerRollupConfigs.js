const pluginCommonjs = require('rollup-plugin-commonjs');
const pluginNodeResolve = require('rollup-plugin-node-resolve');
const pluginConsole = require('../../../plugins/console.js');
const pluginBanner = require('../../../plugins/banner.js');
const pluginReplace = require('../../../plugins/replace.js');


module.exports = ( configs ) => {
  const rollupConfigs = [];

  // 生成 rollup 的配置
  for( const config of configs ){
    const plugins = [
      pluginCommonjs(),
      pluginNodeResolve(),
      pluginReplace( config ),
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

  return rollupConfigs;
}