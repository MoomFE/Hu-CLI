require('@moomfe/zenjs');
const defaultConfig = require('../../../config.js');
const pluginCommonjs = require('rollup-plugin-commonjs');
const pluginNodeResolve = require('rollup-plugin-node-resolve');
const pluginConsole = require('../../../plugins/console/index.js');
const pluginBanner = require('../../../plugins/banner/index.js');
const pluginReplace = require('../../../plugins/replace/index.js');
const pluginTerser = require('../../../plugins/terser/index.js');
const pluginTemplateMinifier = require('../../../plugins/template-minifier/index.js');


module.exports = ( configs ) => {
  const rollupConfigs = [];

  // 生成 rollup 的配置
  for( const config of configs ){
    const rollupDefaultConfig = getDefaultRollupConfig( config );
    const rollupConfig = getConfiguredRollupConfig( config, rollupDefaultConfig );

    rollupConfigs.push(
      mergeDefaultPlugins( config, rollupConfig )
    );
  }

  return rollupConfigs;
}


function getDefaultRollupConfig( config ){
  const rollupConfigPlugins = getUserPlugins( config );
  const rollupConfig = {
    config,
    input: {
      input: config.input,
      plugins: rollupConfigPlugins,
      external: []
    },
    output: {
      file: config.output,
      format: config.format,
      name: config.name,
      globals: {}
    }
  };

  // 处理外部依赖项
  if( config.externals && Object.$isEmptyObject( config.externals ) === false ){
    Object.entries( config.externals ).forEach(([ id, variableName ]) => {
      rollupConfig.input.external.push( id );
      rollupConfig.output.globals[ id ] = variableName;
    });
  }

  return rollupConfig;
}

/**
 * 执行 plugins 选项方法,
 * 获取用户返回的插件
 */
function getUserPlugins( config ){
  const userPluginsFn = ZenJS.isFunction( config.plugins ) ? config.plugins : defaultConfig.plugins;
  const userPluginsFnResult = userPluginsFn( config );

  return Array.isArray( userPluginsFnResult )
           ? userPluginsFnResult
           : [];
}

/**
 * 执行 configureRollup 选项方法,
 * 获取用户返回的新配置或使用修改的配置
 */
function getConfiguredRollupConfig( config, rollupConfig ){
  const configureRollupFn = ZenJS.isFunction( config.configureRollup ) ? config.configureRollup : defaultConfig.configureRollup;
  const configureRollupFnResult = configureRollupFn( rollupConfig, config );

  return configureRollupFnResult ||
         rollupConfig;
}

/**
 * 将用户插件和内置插件进行合并
 */
function mergeDefaultPlugins( config, rollupConfig ){
  const plugins = rollupConfig.input.plugins;

  if( Array.isArray( plugins ) ){
    rollupConfig.input.plugins = [
      pluginCommonjs( config.pluginOptions.commonjs ),
      pluginNodeResolve( config.pluginOptions.nodeResolve ),
      pluginReplace( config, rollupConfig ),
      pluginBanner( config, rollupConfig ),
      ...plugins,
      pluginTemplateMinifier( config, rollupConfig ),
      pluginTerser( config, rollupConfig ),
      pluginConsole( config, rollupConfig )
    ];
    rollupConfig.input.plugins.$deleteValue()
                              .$deleteValue( false );
  }

  return rollupConfig;
}