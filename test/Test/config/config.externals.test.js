require('@moomfe/zenjs');
const expect = require('chai').expect;
const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');
const runBuild = require('../../Lib/runBuild');
const proxyLog = require('../../Lib/utils/proxyLog');
const proxyProcessExit = require('../../Lib/utils/proxyProcessExit');


describe( 'config', function(){
  this.timeout( Infinity );

  it( '使用 externals 选项可以定义外部依赖, 基础测试', async () => {
    // 配置检查
    const rollupConfig = compilerRollupConfigs({
      externals: {
        '@moomfe/hu': 'Hu'
      }
    })[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({
      '@moomfe/hu': 'Hu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      externals: {
        '@moomfe/hu': 'Hu'
      }
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`define(['@moomfe/hu']`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`require('@moomfe/hu')`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`System.register(['@moomfe/hu']`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`import Hu from '@moomfe/hu'`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`(Hu));`);
      expect( code ).is.includes(`Hu.hasOwnProperty('default') ? Hu['default'] : Hu`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`factory(global.Hu)`);
      expect( code ).is.includes(`require('@moomfe/hu')`);
      expect( code ).is.includes(`define(['@moomfe/hu']`);
      expect( code ).is.includes(`Hu.hasOwnProperty('default') ? Hu['default'] : Hu`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( amd )', async () => {
    for( const root of [ '', null, undefined ] ){
      const config = {
        format: 'amd',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs( config )[0];

      expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
      expect( rollupConfig.output.paths ).is.deep.equals({});
      expect( rollupConfig.output.globals ).is.deep.equals({});

      // 构建检查
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [ code ], logs }) => {
        expect( code.length < 1000 ).is.true;
        expect( code ).is.includes(`define(['@moomfe/hu']`);
      });
    }
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( cjs )', async () => {
    for( const root of [ '', null, undefined ] ){
      const config = {
        format: 'cjs',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs( config )[0];

      expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
      expect( rollupConfig.output.paths ).is.deep.equals({});
      expect( rollupConfig.output.globals ).is.deep.equals({});

      // 构建检查
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [ code ], logs }) => {
        expect( code.length < 1000 ).is.true;
        expect( code ).is.includes(`require('@moomfe/hu')`);
      });
    }
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( system )', async () => {
    for( const root of [ '', null, undefined ] ){
      const config = {
        format: 'system',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs( config )[0];

      expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
      expect( rollupConfig.output.paths ).is.deep.equals({});
      expect( rollupConfig.output.globals ).is.deep.equals({});

      // 构建检查
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [ code ], logs }) => {
        expect( code.length < 1000 ).is.true;
        expect( code ).is.includes(`System.register(['@moomfe/hu']`);
      });
    }
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( esm )', async () => {
    for( const root of [ '', null, undefined ] ){
      const config = {
        format: 'esm',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs( config )[0];

      expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
      expect( rollupConfig.output.paths ).is.deep.equals({});
      expect( rollupConfig.output.globals ).is.deep.equals({});

      // 构建检查
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [ code ], logs }) => {
        expect( code.length < 1000 ).is.true;
        expect( code ).is.includes(`import Hu from '@moomfe/hu'`);
      });
    }
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( iife )', async () => {
    for( const root of [ '', null, undefined ] ){
      const config = {
        format: 'iife',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs( config )[0];

      expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
      expect( rollupConfig.output.paths ).is.deep.equals({});
      expect( rollupConfig.output.globals ).is.deep.equals({});

      // 构建检查
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [ code ], logs }) => {
        expect( code.length < 1000 ).is.true;
        expect( code ).is.includes(`(Hu));`);
        expect( code ).is.includes(`Hu.hasOwnProperty('default') ? Hu['default'] : Hu`);
      });
    }
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( umd )', async () => {
    for( const root of [ '', null, undefined ] ){
      const config = {
        format: 'umd',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs( config )[0];

      expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
      expect( rollupConfig.output.paths ).is.deep.equals({});
      expect( rollupConfig.output.globals ).is.deep.equals({});

      // 构建检查
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [ code ], logs }) => {
        expect( code.length < 1000 ).is.true;
        expect( code ).is.includes(`factory(global.Hu)`);
        expect( code ).is.includes(`require('@moomfe/hu')`);
        expect( code ).is.includes(`define(['@moomfe/hu']`);
        expect( code ).is.includes(`Hu.hasOwnProperty('default') ? Hu['default'] : Hu`);
      });
    }
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`define(['@moomfe/hu']`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`require('@moomfe/hu')`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`System.register(['@moomfe/hu']`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`import Hu from '@moomfe/hu'`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({
      '@moomfe/hu': 'Huu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`(Huu));`);
      expect( code ).is.includes(`Hu.hasOwnProperty('default') ? Hu['default'] : Hu`);
    });
  });

  it( '使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs( config )[0];

    expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
    expect( rollupConfig.output.paths ).is.deep.equals({});
    expect( rollupConfig.output.globals ).is.deep.equals({
      '@moomfe/hu': 'Huu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [ code ], logs }) => {
      expect( code.length < 1000 ).is.true;
      expect( code ).is.includes(`factory(global.Huu)`);
      expect( code ).is.includes(`require('@moomfe/hu')`);
      expect( code ).is.includes(`define(['@moomfe/hu']`);
      expect( code ).is.includes(`Hu.hasOwnProperty('default') ? Hu['default'] : Hu`);
    });
  });

});