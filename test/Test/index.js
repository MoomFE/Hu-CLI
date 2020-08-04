/* eslint-disable import/no-extraneous-dependencies */


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
      await remove(resolve(root, file)); // eslint-disable-line no-await-in-loop
    }
  }

  // 清理单元测试产生的环境变量
  delete process.env.HU_RUNNING_CONFIG;
});

// 单元测试
require('./config/config.test.js');
require('./config/config.externals.test.js');
require('./command/build.test.js');
require('./plugins/banner.test.js');
require('./plugins/json.test.js');
require('./plugins/replace.test.js');
require('./plugins/css.test.js');
