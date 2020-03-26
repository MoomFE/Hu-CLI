
module.exports = (config, rollupConfig) => {
  const format = config.format;

  if (typeof format === 'string' && format.includes('.')) {
    rollupConfig.output.format = format.split('.')[0];
  }
};
