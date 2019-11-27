require('@moomfe/zenjs');
const defaultConfig = require('../../config.js');


module.exports = ( config, rollupConfig ) => {
  const pluginsFn = ZenJS.isFunction( config.plugins ) ? config.plugins : defaultConfig.plugins;
  const pluginsFnResult = pluginsFn( config );
  const plugins = Array.isArray( pluginsFnResult ) ? pluginsFnResult : [];

  rollupConfig.input.plugins = plugins;
}