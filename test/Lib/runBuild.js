const { readFile } = require('fs-extra');
const { init } = require('./runBuildCommand');
const build = require('../../scripts/init/build');


/**
 * 调用 build.js 对传入配置进行打包,
 * 执行较快
 */
module.exports = async ( config ) => {
  // 解析为最终配置
  const rollupConfigs = await init( config );

  // 执行指令
  return new Promise( async ( resolve, reject ) => {
    let stdout = '';
    const codes = [];
    const consoleLog = console.log;

    // 劫持控制台输出
    console.log = ( ...args ) => {
      stdout = stdout + '\n' + args.join('\n');
    }

    // 执行打包程序
    await build( rollupConfigs );

    // 读取所有输出文件内容
    for( const { config } of rollupConfigs ){
      codes.push(
        await readFile( config.output, 'utf-8' )
      );
    }

    // 还原劫持控制台输出
    console.log = consoleLog;

    // 返回结果
    resolve({ codes, stdout, logs: stdout });
  });
}