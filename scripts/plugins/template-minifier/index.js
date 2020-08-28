const templateMinifier = require('@moomfe/hu-template-minifier/rollup');


module.exports = (config) => {
  return templateMinifier(config.pluginOptions.templateMinifier);
};
