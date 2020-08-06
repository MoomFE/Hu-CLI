const rollup = require('rollup');


module.exports = async (configsFromTest) => {
  const configs = configsFromTest || await require('../init/index.js')();

  for (const config of configs) {
    const bundle = await rollup.rollup(config.input); // eslint-disable-line no-await-in-loop
    await bundle.write(config.output); // eslint-disable-line no-await-in-loop
  }
};
