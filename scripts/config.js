

module.exports = {

  /**
   * 项目兼容性
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
  browserslist: [
    "Chrome >= 49",
    "Firefox >= 47",
    "Safari >= 10",
    "Edge >= 14"
  ]

};