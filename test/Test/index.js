const { remove, readdir } = require('fs-extra');
const { resolve } = require('path');
const { root, whitelist } = require('../Lib/const');


// 重定向指令执行位置
process.cwd = () => {
  return root;
};

// 清理单元测试产生无用数据
afterEach(async () => {
  const files = await readdir(root);

  // 清理单元测试产生的文件
  for (const file of files) {
    if (whitelist.includes(file) === false) {
      // eslint-disable-next-line no-await-in-loop
      await remove(resolve(root, file));
    }
  }

  // 清理单元测试产生的环境变量
  delete process.env.HU_RUNNING_CONFIG;
});

// 单元测试
require('./config/config.test');
require('./config/config.externals.test');
require('./command/build.test');
require('./plugins/banner.test');
require('./plugins/json.test');
require('./plugins/replace.test');
