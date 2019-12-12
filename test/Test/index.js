const { remove, readdir } = require('fs-extra');
const { resolve } = require('path');
const { root, whitelist } = require('../Lib/const');


// 重定向指令执行位置
process.cwd = () => {
  return root;
};

// 清理单元测试产生的文件
afterEach( async () => {
  const files = await readdir( root );

  for( const file of files ){
    if( whitelist.includes( file ) === false ){
      await remove( resolve( root, file ) );
    }
  }
});

// 单元测试
require('./config/config.test');
require('./config/config.externals.test');
require('./command/build.test');
require('./plugins/banner.test');
require('./plugins/json.test');
require('./plugins/replace.test');