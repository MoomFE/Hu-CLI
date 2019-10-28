const defaultConfig = require('../../../config.js');
const pluginCommonjs = require('rollup-plugin-commonjs');
const pluginNodeResolve = require('rollup-plugin-node-resolve');
const pluginConsole = require('../../../plugins/console.js');
const pluginBanner = require('../../../plugins/banner.js');
const pluginReplace = require('../../../plugins/replace.js');
const pluginTerser = require('../../../plugins/terser.js');


module.exports = ( configs ) => {
  const rollupConfigs = [];

  // 生成 rollup 的配置
  for( const config of configs ){
    const userPluginsFn = typeof config.plugins === 'function' ? config.plugins : defaultConfig.plugins;
    const userPlugins = userPluginsFn();
    const plugins = [
      pluginCommonjs(),
      pluginNodeResolve(),
      pluginReplace( config ),
      ...(
        Array.isArray( userPlugins ) ? userPlugins : []
      ),
      process.env.HU_RUNNING_COMMAND === 'build' && pluginTerser( config ),
      pluginBanner( config ),
      pluginConsole( config )
    ];

    rollupConfigs.push({
      config,
      input: {
        input: config.input,
        plugins: plugins.$deleteValue()
                        .$deleteValue( false )
      },
      output: {
        file: config.output,
        format: config.format,
        name: config.name,
        silent: true
      }
    });
  }

  return rollupConfigs;
}