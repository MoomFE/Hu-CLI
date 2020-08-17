/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */


require('@moomfe/zenjs');
const expect = require('chai').expect;
const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');
const runBuild = require('../../Lib/runBuild');


describe('config.externals', function () {
  this.timeout(Infinity);

  it('使用 externals 选项可以定义外部依赖, 基础测试', async () => {
    // 配置检查
    const rollupConfig = compilerRollupConfigs({
      externals: {
        '@moomfe/hu': 'Hu'
      }
    })[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({
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
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('define([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('require(\'@moomfe/hu\')');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('System.register([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('import Hu from \'@moomfe/hu\'');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('(Hu));');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 1 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: [
        '@moomfe/hu'
      ]
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('factory(global.Hu)');
      expect(code).is.includes('require(\'@moomfe/hu\')');
      expect(code).is.includes('define([\'@moomfe/hu\']');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( amd )', async () => {
    for (const root of ['', null, undefined]) {
      const config = {
        format: 'amd',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs(config)[0];

      expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
      expect(rollupConfig.output.paths).is.deep.equals({});
      expect(rollupConfig.output.globals).is.deep.equals({});

      // 构建检查
      // eslint-disable-next-line no-await-in-loop
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [code], logs }) => {
        expect(code.length < 1000).is.true;
        expect(code).is.includes('define([\'@moomfe/hu\']');
      });
    }
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( cjs )', async () => {
    for (const root of ['', null, undefined]) {
      const config = {
        format: 'cjs',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs(config)[0];

      expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
      expect(rollupConfig.output.paths).is.deep.equals({});
      expect(rollupConfig.output.globals).is.deep.equals({});

      // 构建检查
      // eslint-disable-next-line no-await-in-loop
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [code], logs }) => {
        expect(code.length < 1000).is.true;
        expect(code).is.includes('require(\'@moomfe/hu\')');
      });
    }
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( system )', async () => {
    for (const root of ['', null, undefined]) {
      const config = {
        format: 'system',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs(config)[0];

      expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
      expect(rollupConfig.output.paths).is.deep.equals({});
      expect(rollupConfig.output.globals).is.deep.equals({});

      // 构建检查
      // eslint-disable-next-line no-await-in-loop
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [code], logs }) => {
        expect(code.length < 1000).is.true;
        expect(code).is.includes('System.register([\'@moomfe/hu\']');
      });
    }
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( esm )', async () => {
    for (const root of ['', null, undefined]) {
      const config = {
        format: 'esm',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs(config)[0];

      expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
      expect(rollupConfig.output.paths).is.deep.equals({});
      expect(rollupConfig.output.globals).is.deep.equals({});

      // 构建检查
      // eslint-disable-next-line no-await-in-loop
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [code], logs }) => {
        expect(code.length < 1000).is.true;
        expect(code).is.includes('import Hu from \'@moomfe/hu\'');
      });
    }
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( iife )', async () => {
    for (const root of ['', null, undefined]) {
      const config = {
        format: 'iife',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs(config)[0];

      expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
      expect(rollupConfig.output.paths).is.deep.equals({});
      expect(rollupConfig.output.globals).is.deep.equals({});

      // 构建检查
      // eslint-disable-next-line no-await-in-loop
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [code], logs }) => {
        expect(code.length < 1000).is.true;
        expect(code).is.includes('(Hu));');
        expect(code).is.includes('_interopDefaultLegacy(Hu);');
      });
    }
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.1 ) ( umd )', async () => {
    for (const root of ['', null, undefined]) {
      const config = {
        format: 'umd',
        externals: {
          '@moomfe/hu': root
        }
      };

      // 配置检查
      const rollupConfig = compilerRollupConfigs(config)[0];

      expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
      expect(rollupConfig.output.paths).is.deep.equals({});
      expect(rollupConfig.output.globals).is.deep.equals({});

      // 构建检查
      // eslint-disable-next-line no-await-in-loop
      await runBuild({
        _code: `
          import Hu from '@moomfe/hu';
          console.log( Hu );
        `,
        ...config
      }).then(({ codes: [code], logs }) => {
        expect(code.length < 1000).is.true;
        expect(code).is.includes('factory(global.Hu)');
        expect(code).is.includes('require(\'@moomfe/hu\')');
        expect(code).is.includes('define([\'@moomfe/hu\']');
        expect(code).is.includes('_interopDefaultLegacy(Hu);');
      });
    }
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('define([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('require(\'@moomfe/hu\')');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('System.register([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('import Hu from \'@moomfe/hu\'');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('(Huu));');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.2 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: {
        '@moomfe/hu': 'Huu'
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('factory(global.Huu)');
      expect(code).is.includes('require(\'@moomfe/hu\')');
      expect(code).is.includes('define([\'@moomfe/hu\']');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: ''
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('define([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: ''
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('require(\'@moomfe/hu\')');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: ''
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('System.register([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: ''
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('import Hu from \'@moomfe/hu\'');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: ''
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('(Huu));');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: ''
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('factory(global.Huu)');
      expect(code).is.not.includes('require(\'@moomfe/hu\')');
      expect(code).is.not.includes('define([\'@moomfe/hu\']');
      expect(code).is.not.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3.1 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: '',
          default: 'Huuu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('define([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3.1 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: '',
          default: 'Huuu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('require(\'@moomfe/hu\')');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3.1 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: '',
          default: 'Huuu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('System.register([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3.1 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: '',
          default: 'Huuu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('import Hu from \'@moomfe/hu\'');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3.1 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: '',
          default: 'Huuu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('(Huu));');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.3.1 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: {
        '@moomfe/hu': {
          iife: 'Huu',
          cjs: '',
          default: 'Huuu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huuu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('factory(global.Huuu)');
      expect(code).is.includes('require(\'@moomfe/hu\')');
      expect(code).is.includes('define([\'@moomfe/hu\']');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('define([\'@moomfe/huuuu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('require(\'@moomfe/huu\')');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('System.register([\'@moomfe/huuuu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('import Hu from \'@moomfe/huuuu\'');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('(Hu));');
      expect(code).is.not.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huuu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('factory(global.Huuu)');
      expect(code).is.includes('require(\'@moomfe/huuu\')');
      expect(code).is.includes('define([\'@moomfe/huuu\']');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - no default ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('define([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - no default ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('require(\'@moomfe/huu\')');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - no default ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('System.register([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - no default ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('import Hu from \'@moomfe/hu\'');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - no default ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('(Huu));');
      expect(code).is.not.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - no default ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: {
        '@moomfe/hu': {
          cjs: {
            path: '@moomfe/huu'
          },
          umd: {
            root: 'Huuu',
            path: '@moomfe/huuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huuu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('factory(global.Huuu)');
      expect(code).is.includes('require(\'@moomfe/huuu\')');
      expect(code).is.includes('define([\'@moomfe/huuu\']');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充1 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: {
        '@moomfe/hu': {
          umd: {
            root: 'Huu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('define([\'@moomfe/huuuu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充1 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: {
        '@moomfe/hu': {
          umd: {
            root: 'Huu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('require(\'@moomfe/huuuu\')');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充1 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: {
        '@moomfe/hu': {
          umd: {
            root: 'Huu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('System.register([\'@moomfe/huuuu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充1 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: {
        '@moomfe/hu': {
          umd: {
            root: 'Huu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('import Hu from \'@moomfe/huuuu\'');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充1 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: {
        '@moomfe/hu': {
          umd: {
            root: 'Huu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('(Hu));');
      expect(code).is.not.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充1 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: {
        '@moomfe/hu': {
          umd: {
            root: 'Huu'
          },
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('factory(global.Huu)');
      expect(code).is.includes('require(\'@moomfe/huuuu\')');
      expect(code).is.includes('define([\'@moomfe/huuuu\']');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充2 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: {
        '@moomfe/hu': {
          umd: {
            path: '@moomfe/huuuu'
          },
          default: 'Huu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('define([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充2 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: {
        '@moomfe/hu': {
          umd: {
            path: '@moomfe/huuuu'
          },
          default: 'Huu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('require(\'@moomfe/hu\')');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充2 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: {
        '@moomfe/hu': {
          umd: {
            path: '@moomfe/huuuu'
          },
          default: 'Huu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('System.register([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充2 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: {
        '@moomfe/hu': {
          umd: {
            path: '@moomfe/huuuu'
          },
          default: 'Huu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('import Hu from \'@moomfe/hu\'');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充2 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: {
        '@moomfe/hu': {
          umd: {
            path: '@moomfe/huuuu'
          },
          default: 'Huu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('(Huu));');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充2 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: {
        '@moomfe/hu': {
          umd: {
            path: '@moomfe/huuuu'
          },
          default: 'Huu'
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('factory(global.Huu)');
      expect(code).is.includes('require(\'@moomfe/huuuu\')');
      expect(code).is.includes('define([\'@moomfe/huuuu\']');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充3 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: {
        '@moomfe/hu': {
          umd: 'Huu',
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('define([\'@moomfe/huuuu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充3 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: {
        '@moomfe/hu': {
          umd: 'Huu',
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('require(\'@moomfe/huuuu\')');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充3 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: {
        '@moomfe/hu': {
          umd: 'Huu',
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('System.register([\'@moomfe/huuuu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充3 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: {
        '@moomfe/hu': {
          umd: 'Huu',
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({
      '@moomfe/hu': '@moomfe/huuuu'
    });
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('import Hu from \'@moomfe/huuuu\'');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充3 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: {
        '@moomfe/hu': {
          umd: 'Huu',
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('(Hu));');
      expect(code).is.not.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充3 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: {
        '@moomfe/hu': {
          umd: 'Huu',
          default: {
            path: '@moomfe/huuuu'
          }
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals(['@moomfe/hu']);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({
      '@moomfe/hu': 'Huu'
    });

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.true;
      expect(code).is.includes('factory(global.Huu)');
      expect(code).is.includes('require(\'@moomfe/hu\')');
      expect(code).is.includes('define([\'@moomfe/hu\']');
      expect(code).is.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充4 ) ( amd )', async () => {
    const config = {
      format: 'amd',
      externals: {
        '@moomfe/hu': {
          umd: {},
          default: {}
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('define([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充4 ) ( cjs )', async () => {
    const config = {
      format: 'cjs',
      externals: {
        '@moomfe/hu': {
          umd: {},
          default: {}
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('require(\'@moomfe/hu\')');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充4 ) ( system )', async () => {
    const config = {
      format: 'system',
      externals: {
        '@moomfe/hu': {
          umd: {},
          default: {}
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('System.register([\'@moomfe/hu\']');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充4 ) ( esm )', async () => {
    const config = {
      format: 'esm',
      externals: {
        '@moomfe/hu': {
          umd: {},
          default: {}
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('import Hu from \'@moomfe/hu\'');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充4 ) ( iife )', async () => {
    const config = {
      format: 'iife',
      externals: {
        '@moomfe/hu': {
          umd: {},
          default: {}
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('(Hu));');
      expect(code).is.not.includes('_interopDefaultLegacy(Hu);');
    });
  });

  it('使用 externals 选项可以定义外部依赖, 详细测试 ( 2.4 - 补充4 ) ( umd )', async () => {
    const config = {
      format: 'umd',
      externals: {
        '@moomfe/hu': {
          umd: {},
          default: {}
        }
      }
    };

    // 配置检查
    const rollupConfig = compilerRollupConfigs(config)[0];

    expect(rollupConfig.input.external).is.deep.equals([]);
    expect(rollupConfig.output.paths).is.deep.equals({});
    expect(rollupConfig.output.globals).is.deep.equals({});

    // 构建检查
    await runBuild({
      _code: `
        import Hu from '@moomfe/hu';
        console.log( Hu );
      `,
      ...config
    }).then(({ codes: [code], logs }) => {
      expect(code.length < 1000).is.false;
      expect(code).is.not.includes('factory(global.Hu)');
      expect(code).is.not.includes('require(\'@moomfe/hu\')');
      expect(code).is.not.includes('define([\'@moomfe/hu\']');
      expect(code).is.not.includes('_interopDefaultLegacy(Hu);');
    });
  });
});
