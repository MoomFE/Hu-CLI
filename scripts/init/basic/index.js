const { isString } = require('@moomfe/zenjs');
const { yellow, bgBlackBright } = require('chalk');
const { pathExists } = require('fs-extra');
const print = require('../../utils/print.js');
const checkConfigs = require('./utils/checkConfigs.js');
const getConfigFile = require('./utils/getConfigFile.js');
const compilerConfigs = require('./compilerConfigs.js');
const compilerRollupConfigs = require('./compilerRollupConfigs.js');



module.exports = async ( _configs ) => {
  const errors = new Set;
  const configs = _configs || compilerConfigs(
    await getConfigFile()
  );

  // 配置格式检测
  await checkConfigs( configs, errors, {
    mode: {
      options: [ 'development', 'production', true, false ]
    },
    format: {
      options: [ 'amd', 'cjs', 'system', 'esm', 'iife', 'umd' ]
    },
    // externals: [
    //   { type: 'isPlainObject' },
    //   {
    //     dependency: 'format',
    //     message: ( value, result, { format } ) => {
    //       return `${ bgBlackBright(` externals `) } : 选项在 ${ yellow( 'format: ' + format ) } 下取值不正确, 请检查您的配置文件 !`
    //     },
    //     validator: async ( value, { format } ) => {
    //       for( let [ id, variableName ] of Object.entries( value ) ){
    //         if( !isString( variableName ) ){
    //           if( variableName == null || ( variableName = isString( variableName[ format ] ) ? variableName[ format ] : variableName.default ) == null ){
    //             delete value[ id ];
    //             continue;
    //           }
    //         }
    //         if( !( isString( variableName ) && variableName !== '' ) ) return false;
    //       }
    //       return true;
    //     }
    //   }
    // ],
    pluginOptions: {
      type: 'isPlainObject'
    },
    plugins: {
      type: 'isFunction'
    },
    configureRollup: {
      type: 'isFunction'
    },
    input: {
      message: value => {
        return `未找到需要打包的入口文件 ( ${ yellow( value ) } ), 请确认后重试 !`;
      },
      validator: async value => {
        return await pathExists( value );
      }
    }
  });

  // 统一输出错误提示
  if( errors.size ){
    print.start();
    errors.forEach( error => {
      print.log( error );
    });
    print.end();
    process.exit( 0 );
  }

  return compilerRollupConfigs( configs );
};