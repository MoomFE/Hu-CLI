const { resolve } = require('path');


module.exports = {
  // 测试环境根目录
  root: resolve(__dirname, '../'),
  // 测试环境清理文件白名单
  whitelist: [
    'Lib',
    'Test',
    'bin',
    'node_modules',
    'package-lock.json',
    'package.json'
  ],
  // 默认入口代码
  defaultInput: `
    // lorem
    console.log("Lorem ipsum dolor sit amet consectetur.")
  `
};
