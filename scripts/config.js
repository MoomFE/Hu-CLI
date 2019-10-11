

module.exports = {

  // 打包入口文件
  input: 'index.js',
  // 打包输出文件
  output: 'index.js',

  // 多项目打包
  pipe: [
    // {
    //   input: '',
    //   output: ''
    // }
  ],

  // 打包入口目录
  inputDir: './src',
  // 打包输出目录
  outputDir: './dist',

  // 项目兼容性
  browserslist: [
    "Chrome >= 49",
    "Firefox >= 47",
    "Safari >= 10",
    "Edge >= 14"
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

/**
 * 项目打包入口目录 ( inputDir )
 */

/**
 * 项目打包输出目录 ( outputDir )
 */

/**
 * 项目打包入口文件 ( input )
 */

/**
 * 项目打包输出文件 ( output )
 */

/**
 * 项目打包输出文件 ( pipe )
 */