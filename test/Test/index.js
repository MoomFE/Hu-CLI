require('../../node_modules/@moomfe/zenjs');
require('chai/register-expect');
require('chai/register-should');


const { root } = require('../Lib/const');


// 重定向指令执行位置
process.cwd = () => {
  return root;
};


require('./config/config.test');
require('./command/build.test');
require('./plugins/banner.test');
require('./plugins/replace.test');