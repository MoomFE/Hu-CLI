
module.exports = {

  // 打包模式
  //  - 开发环境: 'development' || false
  //  - 生产环境: 'production' || true
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
  // 生成 UMD 和 IIFE 模块的名字
  name: '',

  // 在打包好的文件最顶部插入一段内容
  banner: '',

  // 将代码中指定文本进行替换
  replace: {},

  // 外部依赖
  externals: {},

  // 提供给 rollup 的插件列表
  plugins: (config) => {
    return [];
  },

  // 传递给内置插件选项的配置
  pluginOptions: {
    // 传递给 banner 插件的配置
    banner: {
      extensions: ['.js', '.css'],
      isComment: true
    },
    // 传递给 rollup-plugin-terser 插件的配置
    terser: {
      numWorkers: 1,
      ecma: 6,
      warnings: true,
      compress: {
        passes: 1,
        unsafe: true,
        unsafe_proto: true,
        unsafe_arrows: true,
        unsafe_methods: true
      },
      output: {
        comments: false
      }
    },
    // 传递给 @rollup/plugin-commonjs 插件的配置
    commonjs: {},
    // 传递给 @rollup/plugin-node-resolve 插件的配置
    nodeResolve: {},
    // 传递给 @moomfe/hu-template-minifier 插件的配置
    templateMinifier: {}
  },

  // 方法会接收被解析的 rollup 配置作为参数, 可直接对传入配置进行修改或返回一个新的配置
  configureRollup: (rollupConfig, config) => {

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
  pipe: [
    // {
    //   input: '',
    //   output: ''
    // }
  ]

};


/* ------------------------------------ ------------------------------------ ------------------------------------ */
/* ------------------------------------ ------------------------------------ ------------------------------------ */
/* ------------------------------------ ------------------------------------ ------------------------------------ */


/**
 * 项目兼容性 ( browserslist )
 * 默认项目兼容性的判定标准为支持以下特性:
 *  - "Proxy object" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
 *  - "Arrow Functions" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
 *  - "Default parameters" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters)
 *  - "Rest Parameters" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)
 *  - "Template Strings" / "Template literals" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)
 *  - "Computed property names" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#计算属性名)
 *  - "Shorthand property names" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#属性定义)
 *  - "Shorthand method names" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#方法定义)
 *  - "Spread syntax" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
 *    - "Spread in array literals"
 *    - "Spread in function calls"
 *  - "Destructuring assignment" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
 *    - "Destructuring assignment"
 *    - "Computed property names"
 *  - "Classes" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)
 *  - "for...of" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
 *  - "const" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)
 *  - "let" (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
 */
