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

  it( '在使用 banner 选项进行打包时, 默认会将传入的 banner 转为注释', () => {
    return runBuild({ banner: '123' }).then(({ codes, logs }) => {
      expect(
        codes[0].startsWith(`/*!\n * 123\n */`)
      ).is.true;
    });
  });

  it( '在使用 banner 选项进行打包时, 默认会将传入的 banner 转为注释, 多行测试', () => {
    return runBuild({
      banner: `
        1
        2
        3
        4
        5
        6
      `
    }).then(({ codes, logs }) => {
      expect(
        codes[0].startsWith(`/*!\n * \n *         1\n *         2\n *         3\n *         4\n *         5\n *         6\n *       \n */`)
      ).is.true;
    });
  });

  it( '在使用 banner 选项进行打包时, 设置 isComment: false 可以不将传入的 banner 转为注释', () => {
    return runBuild({
      banner: '123',
      pluginOptions: {
        banner: {
          isComment: false
        }
      }
    }).then(({ codes, logs }) => {
      expect(
        codes[0].startsWith(`123`)
      ).is.true;
    });
  });

  it( '在使用 banner 选项进行打包时, 设置 extensions 可以约定需要输出 banner 的文件格式 ( js -> .js )', () => {
    return runBuild({
      banner: '123',
      pluginOptions: {
        banner: {
          extensions: [ '.js' ]
        }
      }
    }).then(({ codes, logs }) => {
      expect(
        codes[0].startsWith(`/*!\n * 123\n */`)
      ).is.true;
    });
  });

  it( '在使用 banner 选项进行打包时, 设置 extensions 可以约定需要输出 banner 的文件格式 ( js -> .css ) ( 二 )', () => {
    return runBuild({
      banner: '123',
      pluginOptions: {
        banner: {
          extensions: [ '.css' ]
        }
      }
    }).then(({ codes, logs }) => {
      expect(
        codes[0].startsWith(`/*!\n * 123\n */`)
      ).is.false;
    });
  });

  it( '综合测试 ( js -> .js )', () => {
    return runBuild({
      banner: '123',
      pluginOptions: {
        banner: {
          extensions: [ '.js' ],
          isComment: true
        }
      }
    }).then(({ codes, logs }) => {
      expect(
        codes[0].startsWith(`/*!\n * 123\n */`)
      ).is.true;
    });
  });

  it( '综合测试 ( js -> .js ) ( 二 )', () => {
    return runBuild({
      banner: '123',
      pluginOptions: {
        banner: {
          extensions: [ '.js' ],
          isComment: false
        }
      }
    }).then(({ codes, logs }) => {
      expect(
        codes[0].startsWith(`123`)
      ).is.true;
    });
  });

});