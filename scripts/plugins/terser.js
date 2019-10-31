const { terser } = require('rollup-plugin-terser');


module.exports = ( config ) => {
  if( config.mode === 'production' || config.mode === true ){
    return terser( config.pluginOptions.terser );
  }
};