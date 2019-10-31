# Hu-CLI
Hu-CLI 是一个基于 rollup 的打包工具

<br>
<br>

## 安装

```bash
  > npm install @moomfe/hu-cli -g
```

<br>

## 指令

```bash
  // 打包构建指令, 会自动对代码进行压缩处理
  > hu build

  // 监听模式
  > hu watch
```

<br>

## 配置
```js
  // hu.config.js
  //  - 此配置表为默认配置
  module.exports = {

    // 打包模式
    //  - 开发环境: 'development' || false
    //  - 生产环境: 'production' || true
    //     - 生产环境会自动调用代码压缩工具对代码进行压缩, 速度较慢
    mode: 'development',

    // 打包入口文件
    input: 'index.js',
    // 打包输出文件
    output: 'index.js',

    // 打包入口目录
    inputDir: './src',
    // 打包输出目录
    outputDir: './dist',

    // 输出的文件类型 ( amd, cjs, system, esm, iife, umd )
    format: 'iife',
    // 生成 UMD 和 LIFE 模块的名字
    name: '',

    // 在打包好的文件最顶部插入一段内容
    banner: '',

    // 将代码中指定文本进行替换 ( 对象形式 )
    replace: {
      // 'process.env.NODE_ENV': JSON.stringify('production')
    },
    // 将代码中指定文本进行替换 ( 数组形式 )
    //  - 支持传入正则
    replace: [
      // { from: 'process.env.NODE_ENV', to: JSON.stringify('production') },
      // { from: /aaa(?=-)/, to: 'AAA' }
    ],

    /**
     * 提供给 rollup 的插件列表
     *  - 可以自行安装一些其他的 rollup 插件
     * @param config 被解析后的 Hu-CLI 配置
     */
    plugins: ( config ) => {
      // 需要通过这样一个工厂函数对 rollup 插件进行返回
      return [];
    },

    // 传递给内置插件选项的配置
    pluginOptions: {
      // 传递给 banner 选项相关的配置
      banner: {
        // 需要在打包后插入 banner 的文件类型
        extensions: [ '.js', '.css' ],
        // 当前 banner 是否需要自动转换为注释插入
        isComment: true
      },
      // 传递给 rollup-plugin-terser 插件的配置
      //  - 以下是默认情况下的配置
      //  - 完整选项请查看插件官网 ( https://github.com/TrySound/rollup-plugin-terser )
      terser: {
        sourcemap: false,
        numWorkers: 1,
        ecma: 6,
        warnings: true,
        compress: {
          passes: 3,
          unsafe: true,
          unsafe_proto: true,
          unsafe_arrows: true,
          unsafe_methods: true
        },
        output: {
          comments: false
        }
      },
      // 传递给 rollup-plugin-commonjs 插件的配置
      //  - 完整选项请查看插件官网 ( https://github.com/rollup/rollup-plugin-commonjs )
      commonjs: {

      }
    },

    /**
     * 可直接对传入配置进行修改或返回一个新的配置
     * @param rollupConfig 被解析后的 rollup 配置
     * @param config 被解析后的 Hu-CLI 配置
     */
    configureRollup: ( rollupConfig, config ) => {
      // ...
      // return newRollupConfig;
    },

    // 项目兼容性
    browserslist: [
      'Chrome >= 49',
      'Firefox >= 47',
      'Safari >= 10',
      'Edge >= 14'
    ],

    // 多项目打包
    //  - 在使用了 pipe 选项后, 与 pipe 同级的配置将不再视为一个有效的配置表, 仅用作继承给 pipe 内的打包配置用
    pipe: [
      // 会自动继承上一层级的配置
      // {
      //   input: '',
      //   output: ''
      // }
    ]
    
  };
```

<br>

## License

Hu-CLI is licensed under a [MIT License](./LICENSE).