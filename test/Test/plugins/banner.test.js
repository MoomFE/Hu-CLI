require('../../../node_modules/@moomfe/zenjs');
const { expect } = require('chai');
const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');


describe( 'plugins.banner', () => {

  it( '不使用 banner 选项时, 在生成打包配置时不会加载相关插件', async () => {
    const rollupConfigs = compilerRollupConfigs();
    const rollupConfig = rollupConfigs[0];

    expect(
      rollupConfig.input.plugins.$find({ name: 'banner' })
    ).is.undefined;
  });

});