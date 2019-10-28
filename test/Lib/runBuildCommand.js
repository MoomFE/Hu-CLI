const { remove, outputFile, readFile } = require('fs-extra');
const { exec } = require('child_process');
const { defaultInput, root } = require('./const');
const compilerRollupConfigs = require('./compilerRollupConfigs');
const outputConfig = require('../Lib/utils/outputConfig');


/**
 * 调用 build 指令对传入配置进行打包,
 * 执行较慢
 */
module.exports = async ( config ) => {
  const rollupConfigs = await module.exports.init( config );

  // 执行指令
  return new Promise(( resolve, reject ) => {
    exec( `npm run build`, { cwd: root }, async ( error, stdout, stderr ) => {
      if( error ){
        reject({ error, stdout, stderr });
      }else{
        const codes = [];

        // 读取所有输出文件内容
        for( const { config } of rollupConfigs ){
          codes.push(
            await readFile( config.output, 'utf-8' )
          );
        }

        resolve({ codes, stdout, logs: stdout });
      }
    });
  });
};

/**
 * 在执行打包前的一些预处理
 */
module.exports.init = async ( config ) => {
  // 将标识当前正在执行的指令的环境变量进行重定向
  process.env.HU_RUNNING_COMMAND = 'build';

  // 解析为最终配置
  const rollupConfigs = compilerRollupConfigs( config );

  // 确保打包入口和出口被删除
  for( const { config } of rollupConfigs ){
    await Promise.all([
      // 删除打包出口
      remove( config.output ),
      // 输出打包入口内容
      outputFile( config.input, config._code || defaultInput )
    ]);
  }

  // 删除无用属性
  delete config._code;

  // 输出配置文件
  await outputConfig( config );

  return rollupConfigs;
};