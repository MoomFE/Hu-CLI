
module.exports = {
  root: true,
  extends: [
    'airbnb-base'
  ],
  globals: {
    ZenJS: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    afterEach: 'readonly'
  },
  rules: {
    // 是否强制在模块顶部调用 require()
    'global-require': 'off',
    // 是否优先使用对象扩展而不是 Object.assign
    'prefer-object-spread': 'off',
    // 是否优先使用数组和对象解构
    'prefer-destructuring': 'off',
    // 是否禁止使用特定的语法
    'no-restricted-syntax': 'off',
    // 是否禁止标识符中有悬空下划线
    'no-underscore-dangle': 'off',
    // 是否要求或禁止使用拖尾逗号
    'comma-dangle': 'off',
    // 是否要求箭头函数体使用大括号
    'arrow-body-style': 'off',
    // 是否禁止未使用过的变量
    //   - 忽略对函数参数的检测
    'no-unused-vars': [ 'warn', {
      args: 'none'
    }],
    // 是否禁用 console
    'no-console': 'off',
    // 是否要求使用一致的 return 语句
    'consistent-return': 'off',
    // 是否禁止对函数参数再赋值
    'no-param-reassign': 'off',
    // 强制行的最大长度
    'max-len': [ 'error', 180, 2, {
      // 忽略含有链接的行
      ignoreUrls: true,
      // 忽略所有拖尾注释和行内注释
      ignoreComments: false,
      // 忽略包含正则表达式的行
      ignoreRegExpLiterals: true,
      // 忽略含有双引号或单引号字符串的行
      ignoreStrings: true,
      // 忽略包含模板字面量的行
      ignoreTemplateLiterals: true,
    }],
    // 是否禁止未使用过的表达式
    'no-unused-expressions': [ 'error', {
      // 是否允许在表达式中使用逻辑短路求值
      allowShortCircuit: true,
      // 是否允许在表达式中使用类似逻辑短路求值的三元运算符
      allowTernary: false,
      // 是否允许在表达式中使用带标签的模板字面量
      allowTaggedTemplates: false
    }],
    // 是否禁止使用一元操作符 ++ 和 --
    'no-plusplus': 'off',
    // 是否要求或禁止命名的 function 表达式
    'func-names': 'off',
    // 是否禁止在返回语句中赋值
    //   - 除非使用括号把它们括起来
    'no-return-assign': [ 'error', 'except-parens' ],
    // 是否强制在花括号内使用一致的换行符
    'object-curly-newline': [ 'error', {
      ObjectExpression: { minProperties: 6, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 6, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 6, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 6, multiline: true, consistent: true },
    }],
    // 是否禁用 continue
    'no-continue': 'off'
  }

};