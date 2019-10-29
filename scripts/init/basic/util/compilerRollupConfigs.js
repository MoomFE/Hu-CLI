require('@moomfe/zenjs');
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
    const rollupConfigPlugins = getUserPlugins( config );
    const rollupConfig = getConfiguredRollupConfig( config, {
      config,
      input: {
        input: config.input,
        plugins: rollupConfigPlugins
      },
      output: {
        file: config.output,
        format: config.format,
        name: config.name
      }
    });

    rollupConfigs.push(
      mergeDefaultPlugins( config, rollupConfig )
    );
  }

  return rollupConfigs;
}


function getUserPlugins( config ){
  const userPluginsFn = ZenJS.isFunction( config.plugins ) ? config.plugins : defaultConfig.plugins;
  const userPluginsFnResult = userPluginsFn();

  return Array.isArray( userPluginsFnResult )
           ? userPluginsFnResult
           : [];
}

function getConfiguredRollupConfig( config, rollupConfig ){
  const configureRollupFn = ZenJS.isFunction( config.configureRollup ) ? config.configureRollup : defaultConfig.configureRollup;
  const configureRollupFnResult = configureRollupFn( rollupConfig );

  return configureRollupFnResult ||
         rollupConfig;
}

function mergeDefaultPlugins( config, rollupConfig ){
  const plugins = rollupConfig.input.plugins;

  if( Array.isArray( plugins ) ){
    rollupConfig.input.plugins = [
      pluginCommonjs(),
      pluginNodeResolve(),
      pluginReplace( config, rollupConfig ),
      ...plugins,
      pluginTerser( config, rollupConfig ),
      pluginBanner( config, rollupConfig ),
      pluginConsole( config, rollupConfig )
    ];
    rollupConfig.input.plugins.$deleteValue()
                              .$deleteValue( false );
  }

  return rollupConfig;
}