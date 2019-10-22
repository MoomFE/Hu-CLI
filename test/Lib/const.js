const { resolve } = require('path');


module.exports = {
  // 测试环境根目录
  root: resolve( __dirname, '../' ),
  // 
  defaultInput: `
    // lorem
    console.log("Lorem ipsum dolor sit amet consectetur.")
  `
};