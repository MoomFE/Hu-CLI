require('@moomfe/zenjs');
const rollup = require('rollup');


module.exports = async () => {
  const configs = await require('./basic/index.js')();

  for( const config of configs ){
    const bundle = await rollup.rollup( config.input );
    await bundle.write( config.output )
  }
}