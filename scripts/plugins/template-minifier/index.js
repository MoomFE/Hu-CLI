const templateMinifier = require('@moomfe/hu-template-minifier/rollup');


module.exports = (config) => {
  if (config.mode === 'production' || config.mode === true) {
    return templateMinifier(config.pluginOptions.templateMinifier);
  }
};
