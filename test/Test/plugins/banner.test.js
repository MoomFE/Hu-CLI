const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');
const runBuild = require('../../Lib/runBuild');
const expect = require('chai').expect;


describe( 'plugins.banner', function(){
  this.timeout( Infinity );

  it( '不使用 banner 选项时, 在生成打包配置时不会加载相关插件', async () => {
    const rollupConfig = compilerRollupConfigs()[0];

    expect(
      rollupConfig.input.plugins.$find({ name: 'banner' })
    ).is.undefined;
  });

  it( '在使用 banner 选项时, 在生成打包配置时会加载相关插件', () => {
    const rollupConfig = compilerRollupConfigs({
      banner: ` `
    })[0];

    expect(
      rollupConfig.input.plugins.$find({ name: 'banner' })
    ).is.not.undefined;
  });

  it( '在使用 banner 选项进行打包时, 默认会将传入的 banner 转为注释', function(){
    return runBuild({ banner: '123' }).then(({ codes, logs }) => {
      expect(
        codes[0].startsWith(`/*!\n * 123\n */`)
      ).is.true;
    });
  });

});