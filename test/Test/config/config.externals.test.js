require('@moomfe/zenjs');
const expect = require('chai').expect;
const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');
const runBuild = require('../../Lib/runBuild');
const proxyLog = require('../../Lib/utils/proxyLog');
const proxyProcessExit = require('../../Lib/utils/proxyProcessExit');


describe( 'config', () => {
  this.timeout( Infinity );

  // it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( externals )', async () => {
  //   {
  //     const isExit = await proxyProcessExit( async () => {
  //       const stdout = await proxyLog( async () => {
  //         await compilerRollupConfigs({
  //           externals: []
  //         }, true);
  //       });

  //       expect( stdout ).is.includes('选项必须为一个纯粹的对象, 请检查您的配置文件');
  //     });

  //     expect( isExit ).is.true;
  //   }

  //   // -------------------------------------------
  //   // - 反向测试
  //   // -------------------------------------------

  //   // 1
  //   {
  //     const isExit = await proxyProcessExit( async () => {
  //       const stdout = await proxyLog( async () => {
  //         await compilerRollupConfigs({
  //           externals: {}
  //         }, true);
  //       });

  //       expect( stdout ).is.equals('');
  //     });

  //     expect( isExit ).is.false;
  //   }
  //   // 2
  //   {
  //     const isExit = await proxyProcessExit( async () => {
  //       const stdout = await proxyLog( async () => {
  //         await compilerRollupConfigs({
  //           externals: null
  //         }, true);
  //       });

  //       expect( stdout ).is.equals('');
  //     });

  //     expect( isExit ).is.false;
  //   }
  // });

  // it( '对配置进行解析时, 若配置不合法, 将会退出打包程序 ( externals ) ( 二 )', async () => {
  //   // 1
  //   {
  //     const isExit = await proxyProcessExit( async () => {
  //       const stdout = await proxyLog( async () => {
  //         await compilerRollupConfigs({
  //           format: 'iife',
  //           externals: {
  //             '@moomfe/hu': ''
  //           }
  //         }, true);
  //       });

  //       expect( stdout ).is.includes('下取值不正确, 请检查您的配置文件');
  //     });

  //     expect( isExit ).is.true;
  //   }
  //   // 2
  //   {
  //     const isExit = await proxyProcessExit( async () => {
  //       const stdout = await proxyLog( async () => {
  //         await compilerRollupConfigs({
  //           format: 'iife',
  //           externals: {
  //             '@moomfe/hu': {
  //               'iife': ''
  //             }
  //           }
  //         }, true);
  //       });

  //       expect( stdout ).is.includes('下取值不正确, 请检查您的配置文件');
  //     });

  //     expect( isExit ).is.true;
  //   }

  //   // -------------------------------------------
  //   // - 反向测试
  //   // -------------------------------------------

  //   // 1
  //   {
  //     const isExit = await proxyProcessExit( async () => {
  //       const stdout = await proxyLog( async () => {
  //         await compilerRollupConfigs({
  //           format: 'iife',
  //           externals: {
  //             '@moomfe/hu': 'Hu'
  //           }
  //         }, true);
  //       });

  //       expect( stdout ).is.equals('');
  //     });

  //     expect( isExit ).is.false;
  //   }
  //   // 1
  //   {
  //     const isExit = await proxyProcessExit( async () => {
  //       const stdout = await proxyLog( async () => {
  //         await compilerRollupConfigs({
  //           format: 'iife',
  //           externals: {
  //             '@moomfe/hu': {
  //               iife: 'Hu'
  //             }
  //           }
  //         }, true);
  //       });

  //       expect( stdout ).is.equals('');
  //     });

  //     expect( isExit ).is.false;
  //   }
  // });

  // it( '使用 externals 选项可以定义外部依赖', () => {
  //   // 单个外部依赖
  //   {
  //     const rollupConfig = compilerRollupConfigs({
  //       externals: {
  //         '@moomfe/hu': 'Hu'
  //       }
  //     })[0];

  //     expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //     expect( rollupConfig.output.globals ).is.deep.equals({
  //       '@moomfe/hu': 'Hu'
  //     });
  //   }
  //   // 多个外部依赖
  //   {
  //     const rollupConfig = compilerRollupConfigs({
  //       externals: {
  //         '@moomfe/hu': 'Hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       }
  //     })[0];

  //     expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu', '@moomfe/zenjs' ]);
  //     expect( rollupConfig.output.globals ).is.deep.equals({
  //       '@moomfe/hu': 'Hu',
  //       '@moomfe/zenjs': 'ZenJS'
  //     });
  //   }
  // });

  // it( '使用 externals 选项可以定义外部依赖, 值可以传入 JSON 以适配不同打包场景的外部依赖来源', () => {
  //   // amd
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'amd',
  //         externals: {
  //           '@moomfe/hu': {
  //             amd: 'Hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'amd',
  //         externals: {
  //           '@moomfe/zenjs': 'ZenJS',
  //           '@moomfe/hu': {
  //             amd: 'Hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // cjs
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'cjs',
  //         externals: {
  //           '@moomfe/hu': {
  //             cjs: '@moomfe/hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'cjs',
  //         externals: {
  //           '@moomfe/zenjs': 'ZenJS',
  //           '@moomfe/hu': {
  //             cjs: '@moomfe/hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // system
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'system',
  //         externals: {
  //           '@moomfe/hu': {
  //             system: 'Hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'system',
  //         externals: {
  //           '@moomfe/zenjs': 'ZenJS',
  //           '@moomfe/hu': {
  //             system: 'Hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // esm
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'esm',
  //         externals: {
  //           '@moomfe/hu': {
  //             esm: '@moomfe/hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'esm',
  //         externals: {
  //           '@moomfe/zenjs': 'ZenJS',
  //           '@moomfe/hu': {
  //             esm: '@moomfe/hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // iife
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'iife',
  //         externals: {
  //           '@moomfe/hu': {
  //             iife: 'Hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'iife',
  //         externals: {
  //           '@moomfe/zenjs': 'ZenJS',
  //           '@moomfe/hu': {
  //             iife: 'Hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // umd
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'umd',
  //         externals: {
  //           '@moomfe/hu': {
  //             umd: 'Hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'umd',
  //         externals: {
  //           '@moomfe/zenjs': 'ZenJS',
  //           '@moomfe/hu': {
  //             umd: 'Hu'
  //           }
  //         }
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  // });

  // it( '使用 externals 选项可以定义外部依赖, 值可以传入 JSON 以适配不同打包场景的外部依赖来源, 定义 default 选项可以定义其他打包场景下默认值', () => {
  //   const externals = {
  //     '@moomfe/hu': {
  //       'cjs': '@moomfe/hu',
  //       'esm': '@moomfe/hu',
  //       'default': 'Hu'
  //     }
  //   };
  //   const externalsMore = {
  //     '@moomfe/zenjs': 'ZenJS',
  //     '@moomfe/hu': {
  //       'cjs': '@moomfe/hu',
  //       'esm': '@moomfe/hu',
  //       'default': 'Hu'
  //     }
  //   };

  //   // amd
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'amd',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'amd',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // cjs
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'cjs',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'cjs',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // system
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'system',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'system',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // esm
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'esm',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'esm',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // iife
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'iife',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'iife',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // umd
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'amd',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'amd',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': 'Hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  // });

  // it( '使用 externals 选项可以定义外部依赖, 值可以传入 JSON 以适配不同打包场景的外部依赖来源, 当前打包场景下未找到对应外部依赖时会忽略', () => {
  //   const externals = {
  //     '@moomfe/hu': {
  //       'cjs': '@moomfe/hu',
  //       'esm': '@moomfe/hu'
  //     }
  //   };
  //   const externalsMore = {
  //     '@moomfe/zenjs': 'ZenJS',
  //     '@moomfe/hu': {
  //       'cjs': '@moomfe/hu',
  //       'esm': '@moomfe/hu'
  //     }
  //   };

  //   // amd
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'amd',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({});
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'amd',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // cjs
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'cjs',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'cjs',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // system
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'system',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({});
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'system',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // esm
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'esm',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu'
  //       });
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'esm',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs', '@moomfe/hu' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/hu': '@moomfe/hu',
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // iife
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'iife',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({});
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'iife',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  //   // umd
  //   {
  //     // 单个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'amd',
  //         externals
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({});
  //     }
  //     // 多个外部依赖
  //     {
  //       const rollupConfig = compilerRollupConfigs({
  //         format: 'amd',
  //         externals: externalsMore
  //       })[0];

  //       expect( rollupConfig.input.external ).is.deep.equals([ '@moomfe/zenjs' ]);
  //       expect( rollupConfig.output.globals ).is.deep.equals({
  //         '@moomfe/zenjs': 'ZenJS'
  //       });
  //     }
  //   }
  // });

});