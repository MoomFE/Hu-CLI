const { root } = require('../Lib/const');


// 重定向指令执行位置
process.cwd = () => {
  return root;
};


require('./config/config.test');
require('./config/config.externals.test');
require('./command/build.test');
require('./plugins/banner.test');
require('./plugins/json.test');
require('./plugins/replace.test');