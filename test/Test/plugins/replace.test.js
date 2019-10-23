const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');
const runBuild = require('../../Lib/runBuild');


describe( 'plugins.replace', function(){
  this.timeout( Infinity );

  it( '不使用 replace 选项时, 在生成打包配置时不会加载相关插件', () => {
    const rollupConfig = compilerRollupConfigs()[0];

    expect(
      rollupConfig.input.plugins.$find({ name: 'replace' })
    ).is.undefined;
  });

  it( '在使用 replace 选项时, 如果选项内没有内容, 在生成打包配置时不会加载相关插件', () => {
    const rollupConfig = compilerRollupConfigs({
      replace: {}
    })[0];

    expect(
      rollupConfig.input.plugins.$find({ name: 'replace' })
    ).is.undefined;
  });

  it( '在使用 replace 选项时, 且选项内有内容, 在生成打包配置时会加载相关插件', () => {
    const rollupConfig = compilerRollupConfigs({
      replace: {
        a: 'b'
      }
    })[0];

    expect(
      rollupConfig.input.plugins.$find({ name: 'replace' })
    ).is.not.undefined;
  });

  it( '在使用 replace 选项进行打包时, 会按照传入的 key: value 进行全部替换', () => {
    return runBuild({
      code: `
        console.log("aaa-BBB-aaa")
      `,
      replace: {
        aaa: 'AAA'
      }
    }).then(({ codes, logs }) => {
      expect(
        codes[0].includes('AAA-BBB-AAA')
      ).is.true;
    });
  });

  it( '在使用 replace 选项进行打包时, 会按照传入的 key: value 进行依次替换', () => {
    return runBuild({
      code: `
        console.log("aaa-BBB-aaa")
      `,
      replace: {
        aaa: 'BBB',
        BBB: 'AAA',
        AAA: 'CCC'
      }
    }).then(({ codes, logs }) => {
      expect(
        codes[0].includes('CCC-CCC-CCC')
      ).is.true;
    });
  });

});