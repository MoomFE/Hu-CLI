/* eslint-disable no-await-in-loop */


require('@moomfe/zenjs');
const rollup = require('rollup');
const basic = require('./basic/index.js');


module.exports = async (configsFromTest) => {
  const configs = configsFromTest || await basic();

  for (const config of configs) {
    const bundle = await rollup.rollup(config.input);
    await bundle.write(config.output);
  }
};
