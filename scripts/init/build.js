require('@moomfe/zenjs');
const rollup = require('rollup');


module.exports = async () => {
  const configs = await require('./basic/index.js')();

  // 压缩 JS 代码
  {
    const pluginTerser = require('../plugins/terser.js');

    configs.forEach(({ config, input: { plugins } }) => {
      const index = plugins.$findIndex({ name: '__last__' });// 放到除置底外的末尾
      const plugin = pluginTerser( config );

      plugins.$add(
        index,
        plugin
      );
    });
  }

  for( const config of configs ){
    const bundle = await rollup.rollup( config.input );
    await bundle.write( config.output )
  }
}