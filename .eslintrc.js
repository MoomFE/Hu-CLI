
module.exports = {
  root: true,
  extends: [
    "airbnb-base"
  ],
  rules: {
    // 强制在模块顶部调用 require()
    "global-require": "off",
    // 优先使用对象扩展而不是 Object.assign
    "prefer-object-spread": "off",
    // 优先使用数组和对象解构
    "prefer-destructuring": "off",
    // 禁止使用特定的语法
    "no-restricted-syntax": "off",
    // 禁止标识符中有悬空下划线
    "no-underscore-dangle": "off",
    // 要求或禁止使用拖尾逗号
    "comma-dangle": "off",
    // 要求箭头函数体使用大括号
    "arrow-body-style": "off",
    // 禁止未使用过的变量
    //   - 忽略对函数参数的检测
    "no-unused-vars": [ "warn", {
      "args": "none"
    }],
    // 禁用 console
    "no-console": "off",
    // 要求使用一致的 return 语句
    "consistent-return": "off",
    // 禁止对函数参数再赋值
    "no-param-reassign": "off",
    // 强制行的最大长度
    "max-len": [ "error", 180, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }]
  }

};