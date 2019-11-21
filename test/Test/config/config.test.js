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

        expect( stdout ).is.includes(`选项必须为 'development', 'production', true, false 中的一个, 请检查您的配置文件`);
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

        expect( stdout ).is.includes(`选项必须为 'development', 'production', true, false 中的一个, 请检查您的配置文件`);
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

        expect( stdout ).is.includes(`选项必须为 'development', 'production', true, false 中的一个, 请检查您的配置文件`);
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

        expect( stdout ).is.includes(`选项必须为 'amd', 'cjs', 'system', 'esm', 'esm.browser', 'iife', 'umd' 中的一个, 请检查您的配置文件`);
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

        expect( stdout ).is.includes(`选项必须为 'amd', 'cjs', 'system', 'esm', 'esm.browser', 'iife', 'umd' 中的一个, 请检查您的配置文件`);
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

        expect( stdout ).is.includes(`选项必须为 'amd', 'cjs', 'system', 'esm', 'esm.browser', 'iife', 'umd' 中的一个, 请检查您的配置文件`);
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

        expect( stdout ).is.includes(`选项必须为 'amd', 'cjs', 'system', 'esm', 'esm.browser', 'iife', 'umd' 中的一个, 请检查您的配置文件`);
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
            format: 'esm.browser'
          }, true);
        });

        expect( stdout ).is.equals('');
      });

      expect( isExit ).is.false;

      // 'esm.browser' 格式其实也是 'esm'
      const rollupConfig = compilerRollupConfigs({
        format: 'esm.browser'
      })[0];

      expect( rollupConfig.output.format ).is.equals('esm');
    }
    // 6
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
    // 7
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

  it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( externals )', async () => {
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            externals: []
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
            externals: {}
          }, true);
        });

        expect( stdout ).is.includes('');
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
  });

  it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( plugins )', async () => {
    {
      const isExit = await proxyProcessExit( async () => {
        const stdout = await proxyLog( async () => {
          await compilerRollupConfigs({
            plugins: []
          }, true);
        });

        expect( stdout ).is.includes('选项必须为一个函数并且函数返回 plugins 数组, 请检查您的配置文件');
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

  it( '使用 externals 选项可以定义外部依赖', () => {
    // 单个外部依赖
    {
      const rollupConfig = compilerRollupConfigs({
        externals: {
          '@moomfe/hu': 'Hu'
        }
      })[0];

      expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
      expect( rollupConfig.output.globals ).is.deep.equals({
        '@moomfe/hu': 'Hu'
      });
    }
    // 多个外部依赖
    {
      const rollupConfig = compilerRollupConfigs({
        externals: {
          '@moomfe/hu': 'Hu',
          '@moomfe/zenjs': 'ZenJS'
        }
      })[0];

      expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu', '@moomfe/zenjs' ]);
      expect( rollupConfig.output.globals ).is.deep.equals({
        '@moomfe/hu': 'Hu',
        '@moomfe/zenjs': 'ZenJS'
      });
    }
  });

  it( '使用 externals 选项可以定义外部依赖, 值可以传入 JSON 以适配不同打包场景的外部依赖来源', () => {
    // amd
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'amd',
          externals: {
            '@moomfe/hu': {
              amd: 'Hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'amd',
          externals: {
            '@moomfe/zenjs': 'ZenJS',
            '@moomfe/hu': {
              amd: 'Hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // cjs
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'cjs',
          externals: {
            '@moomfe/hu': {
              cjs: '@moomfe/hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': '@moomfe/hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'cjs',
          externals: {
            '@moomfe/zenjs': 'ZenJS',
            '@moomfe/hu': {
              cjs: '@moomfe/hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': '@moomfe/hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // system
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'system',
          externals: {
            '@moomfe/hu': {
              system: 'Hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'system',
          externals: {
            '@moomfe/zenjs': 'ZenJS',
            '@moomfe/hu': {
              system: 'Hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // esm
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'esm',
          externals: {
            '@moomfe/hu': {
              esm: '@moomfe/hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': '@moomfe/hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'esm',
          externals: {
            '@moomfe/zenjs': 'ZenJS',
            '@moomfe/hu': {
              esm: '@moomfe/hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': '@moomfe/hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // esm.browser
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'esm.browser',
          externals: {
            '@moomfe/hu': {
              'esm.browser': 'https://cdn.jsdelivr.net/npm/@moomfe/hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'https://cdn.jsdelivr.net/npm/@moomfe/hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'esm.browser',
          externals: {
            '@moomfe/zenjs': 'ZenJS',
            '@moomfe/hu': {
              'esm.browser': 'https://cdn.jsdelivr.net/npm/@moomfe/hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'https://cdn.jsdelivr.net/npm/@moomfe/hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // iife
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'iife',
          externals: {
            '@moomfe/hu': {
              iife: 'Hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'iife',
          externals: {
            '@moomfe/zenjs': 'ZenJS',
            '@moomfe/hu': {
              iife: 'Hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // umd
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'umd',
          externals: {
            '@moomfe/hu': {
              umd: 'Hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'umd',
          externals: {
            '@moomfe/zenjs': 'ZenJS',
            '@moomfe/hu': {
              umd: 'Hu'
            }
          }
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
  });

  it( '使用 externals 选项可以定义外部依赖, 值可以传入 JSON 以适配不同打包场景的外部依赖来源, 定义 default 选项可以定义其他打包场景下默认值', () => {
    const externals = {
      '@moomfe/hu': {
        'cjs': '@moomfe/hu',
        'esm': '@moomfe/hu',
        'esm.browser': 'https://cdn.jsdelivr.net/npm/@moomfe/hu',
        'default': 'Hu'
      }
    };
    const externalsMore = {
      '@moomfe/zenjs': 'ZenJS',
      '@moomfe/hu': {
        'cjs': '@moomfe/hu',
        'esm': '@moomfe/hu',
        'esm.browser': 'https://cdn.jsdelivr.net/npm/@moomfe/hu',
        'default': 'Hu'
      }
    };

    // amd
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'amd',
          externals
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'amd',
          externals: externalsMore
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // cjs
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'cjs',
          externals
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': '@moomfe/hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'cjs',
          externals: externalsMore
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': '@moomfe/hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // system
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'system',
          externals
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'system',
          externals: externalsMore
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // esm
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'esm',
          externals
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': '@moomfe/hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'esm',
          externals: externalsMore
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': '@moomfe/hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // esm.browser
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'esm.browser',
          externals
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'https://cdn.jsdelivr.net/npm/@moomfe/hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'esm.browser',
          externals: externalsMore
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'https://cdn.jsdelivr.net/npm/@moomfe/hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // iife
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'iife',
          externals
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'iife',
          externals: externalsMore
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
    // umd
    {
      // 单个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'amd',
          externals
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu'
        });
      }
      // 多个外部依赖
      {
        const rollupConfig = compilerRollupConfigs({
          format: 'amd',
          externals: externalsMore
        })[0];

        expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
        expect( rollupConfig.output.globals ).is.deep.equals({
          '@moomfe/hu': 'Hu',
          '@moomfe/zenjs': 'ZenJS'
        });
      }
    }
  });

});