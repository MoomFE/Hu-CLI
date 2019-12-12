const { readFile } = require('fs-extra');
const { init } = require('./runBuildCommand');
const build = require('../../scripts/init/build');
const proxyLog = require('../Lib/utils/proxyLog');
const initConfig = require('./utils/initConfig');


/**
 * 调用 build.js 对传入配置进行打包,
 * 执行较快
 */
module.exports = async ( _config ) => {
  const config = initConfig( _config );
  const rollupConfigs = await init( config );

  // 执行指令
  return new Promise( async ( resolve, reject ) => {
    const codes = [];

    // 执行打包程序
    const stdout = await proxyLog( async () => {
      await build( rollupConfigs );
    });

    // 读取所有输出文件内容
    for( const { config } of rollupConfigs ){
      codes.push(
        await readFile( config.output, 'utf-8' )
      );
    }

    // 返回结果
    resolve({ codes, stdout, logs: stdout });
  });
}