require('@moomfe/zenjs');
const expect = require('chai').expect;
const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');
const runBuild = require('../../Lib/runBuild');
const proxyLog = require('../../Lib/utils/proxyLog');
const proxyProcessExit = require('../../Lib/utils/proxyProcessExit');


describe( 'config', function(){
  this.timeout( Infinity );

  it( '对配置进行解析时, 若配置合法, 打包程序会正确执行', async () => {
    const isExit = await proxyProcessExit( async () => {
      const stdout = await proxyLog( async () => {
        await compilerRollupConfigs( null, true );
      });

      expect( stdout ).is.equals('');
    });

    expect( isExit ).is.false;
  });

  it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( mode )', async () => {
    // 1
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            mode: ''
          }, true);
        });

        expect( stdout ).is.includes(`选项必须为 "development", "production", true, false 中的一个, 请检查您的配置文件`);
      });

      expect( isExit ).is.true;
    }
    // 2
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            mode: 0
          }, true);
        });

        expect( stdout ).is.includes(`选项必须为 "development", "production", true, false 中的一个, 请检查您的配置文件`);
      });

      expect( isExit ).is.true;
    }
    // 3
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            mode: 1
          }, true);
        });

        expect( stdout ).is.includes(`选项必须为 "development", "production", true, false 中的一个, 请检查您的配置文件`);
      });

      expect( isExit ).is.true;
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    // 1
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            mode: 'development'
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
    // 2
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            mode: 'production'
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
    // 3
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            mode: true
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
    // 4
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            mode: false
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
  });

  it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( format )', async () => {
    // 1
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            format: ''
          }, true);
        });

        expect( stdout ).is.includes(`选项必须为 "amd", "cjs", "system", "esm", "iife", "umd" 中的一个, 请检查您的配置文件`);
      });

      expect( isExit ).is.true;
    }
    // 2
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            format: 'xxx'
          }, true);
        });

        expect( stdout ).is.includes(`选项必须为 "amd", "cjs", "system", "esm", "iife", "umd" 中的一个, 请检查您的配置文件`);
      });

      expect( isExit ).is.true;
    }
    // 3
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            format: 0
          }, true);
        });

        expect( stdout ).is.includes(`选项必须为 "amd", "cjs", "system", "esm", "iife", "umd" 中的一个, 请检查您的配置文件`);
      });

      expect( isExit ).is.true;
    }
    // 4
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            format: true
          }, true);
        });

        expect( stdout ).is.includes(`选项必须为 "amd", "cjs", "system", "esm", "iife", "umd" 中的一个, 请检查您的配置文件`);
      });

      expect( isExit ).is.true;
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    // 1
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            format: 'amd'
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
    // 2
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            format: 'cjs'
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
    // 3
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            format: 'system'
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
    // 4
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            format: 'esm'
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
    // 5
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            format: 'iife'
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
    // 6
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            format: 'umd'
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
  });

  it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( pluginOptions )', async () => {
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            pluginOptions: []
          }, true);
        });

        expect( stdout ).is.includes('选项必须为一个纯粹的对象, 请检查您的配置文件');
      });

      expect( isExit ).is.true;
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            pluginOptions: {}
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }

    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            pluginOptions: null
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
  });

  it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( plugins )', async () => {
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            plugins: []
          }, true);
        });

        expect( stdout ).is.includes('选项必须为一个函数, 请检查您的配置文件');
      });

      expect( isExit ).is.true;
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            plugins: () => []
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }

    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            plugins: null
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
  });

  it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( configureRollup )', async () => {
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            configureRollup: []
          }, true);
        });

        expect( stdout ).is.includes('选项必须为一个函数, 请检查您的配置文件');
      });

      expect( isExit ).is.true;
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            configureRollup: () => {}
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
  });

  it( '对配置进行解析时, 若入口文件不存在, 将会退出打包程序', async () => {
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            _code: null
          }, true);
        });

        expect( stdout ).is.includes('未找到需要打包的入口文件');
      });

      expect( isExit ).is.true;
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            _code: 'null'
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;
    }
  });

  it( '未使用 pipe 选项进行多项目打包时, 当前配置表会视为一个有效的配置表', () => {
    expect(
      compilerRollupConfigs().length
    ).is.equals( 1 );
  });

  it( '当使用 pipe 选项进行多项目打包时, 当前配置表将不再视为一个有效的配置表', () => {
    const rollupConfigs = compilerRollupConfigs({
      pipe: [
        {},
        {}
      ]
    });

    expect( rollupConfigs.length ).is.equals( 2 );
  });

  it( '使用 configureRollup 可以用于修改已经解析完成的 rollup 配置', () => {
    const rollupConfig = compilerRollupConfigs({
      configureRollup: rollupConfig => {
        rollupConfig.input.input = 'isEdit';
      }
    })[0];

    expect( rollupConfig.input.input ).is.equals('isEdit');
  });

  it( '使用 configureRollup 将会始终采纳方法返回的 rollup 配置', () => {
    const rollupConfig = compilerRollupConfigs({
      configureRollup: rollupConfig => {
        const newRollupConfig = Object.$assign( null, rollupConfig, {
          input: {
            input: 'isEdit'
          }
        });

        expect( rollupConfig.input.input ).is.not.equals('isEdit');
        expect( newRollupConfig.input.input ).is.equals('isEdit');

        return newRollupConfig;
      }
    })[0];

    expect( rollupConfig.input.input ).is.equals('isEdit');
  });

  it( '使用 configureRollup 选项时可以接受被解析后的 Hu-CLI 配置作为参数', () => {
    let config;

    compilerRollupConfigs({
      xxx: 123,
      configureRollup: ( rollupConfig, _config ) => config = _config
    })[0];

    expect( config.xxx ).is.equals( 123 );
  });

  it( '使用 mode 并指定为生产环境时, 会加载 @moomfe/hu-template-minifier 用于模板压缩', () => {
    // 1
    {
      const rollupConfig = compilerRollupConfigs({
        mode: 'production'
      })[0];

      expect(
        rollupConfig.input.plugins.$find({ name: 'hu-template-minifier' })
      ).is.not.undefined;
    }
    // 2
    {
      const rollupConfig = compilerRollupConfigs({
        mode: true
      })[0];

      expect(
        rollupConfig.input.plugins.$find({ name: 'hu-template-minifier' })
      ).is.not.undefined;
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    // 1
    {
      const rollupConfig = compilerRollupConfigs({
        mode: 'development'
      })[0];

      expect(
        rollupConfig.input.plugins.$find({ name: 'hu-template-minifier' })
      ).is.undefined;
    }
    // 2
    {
      const rollupConfig = compilerRollupConfigs({
        mode: false
      })[0];

      expect(
        rollupConfig.input.plugins.$find({ name: 'hu-template-minifier' })
      ).is.undefined;
    }
  });

  it( '使用 mode 并指定为生产环境时, 会加载 terser 用于代码压缩', () => {
    // 1
    {
      const rollupConfig = compilerRollupConfigs({
        mode: 'production'
      })[0];

      expect(
        rollupConfig.input.plugins.$find({ name: 'terser' })
      ).is.not.undefined;
    }
    // 2
    {
      const rollupConfig = compilerRollupConfigs({
        mode: true
      })[0];

      expect(
        rollupConfig.input.plugins.$find({ name: 'terser' })
      ).is.not.undefined;
    }

    // -------------------------------------------
    // - 反向测试
    // -------------------------------------------

    // 1
    {
      const rollupConfig = compilerRollupConfigs({
        mode: 'development'
      })[0];

      expect(
        rollupConfig.input.plugins.$find({ name: 'terser' })
      ).is.undefined;
    }
    // 2
    {
      const rollupConfig = compilerRollupConfigs({
        mode: false
      })[0];

      expect(
        rollupConfig.input.plugins.$find({ name: 'terser' })
      ).is.undefined;
    }
  });

  it( '使用 plugins 选项可以安装自定义 rollup 插件', () => {
    let code;

    return runBuild({
      _code: 'console.log(123)',
      plugins: () => [
        { transform: _code => code = _code }
      ]
    }).then(({ codes, logs }) => {
      expect( code ).is.equals('console.log(123)');
    });
  });

  it( '使用 plugins 选项时可以接受被解析后的 Hu-CLI 配置作为参数', () => {
    let config;

    compilerRollupConfigs({
      xxx: 123,
      plugins: _config => config = _config
    });

    expect( config.xxx ).is.equals( 123 );
  });

});