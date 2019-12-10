

module.exports = ( config, rollupConfig ) => {
  const format = config.format;
  const output = rollupConfig.output;

  if( typeof format === 'string' && format.includes('.') ){
    output.format = format.split('.')[0];
  }else{
    output.format = format;
  }
}