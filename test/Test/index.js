require('../../node_modules/@moomfe/zenjs');
require('chai/register-expect');

const { root } = require('../Lib/const');


// 重定向指令执行位置
process.cwd = () => {
  return root;
};


require('./plugins/banner.test');