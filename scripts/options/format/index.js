

module.exports = ( config, rollupConfig ) => {
  if( config.format === 'esm.browser' ){
    rollupConfig.output.format = 'esm';
  }
}