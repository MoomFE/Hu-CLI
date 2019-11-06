require('@moomfe/zenjs');
const { green, yellow } = require('chalk');
const { outputFile } = require('fs-extra');
const { resolve } = require('path');
const { gzipSync } = require('zlib');
const print = require('../../utils/print');
const getSize = require('../../utils/getSize');


module.exports = ( config, rollupConfig ) => {
  let progress = 0;
  let startTime = new Date;
  let warnSet = new Set;


  rollupConfig.input.onwarn = ( warning, defaultHandler ) => {
    switch( warning.code ){
      case 'EMPTY_BUNDLE': break;
      default: {
        warnSet.add( warning.message );
      };
    }
  }


  return {

    name: 'console',

    /**
     * 构建开始时
     * 输出开始部分的信息
     */
    buildStart( inputOptions ){
      progress = 0;
      startTime = new Date;
      warnSet.clear();

      print.start(`Input   : ${ green( inputOptions.input ) }`);
    },

    /**
     * 解析文件时
     * 输出正在解析的文件路径
     */
    transform( code, id ){
      print.stdout(`Transform ( ${ ++progress } ): ${ green( id ) }`);
    },

    /**
     * 构建完成时
     * 手动写入文件到磁盘以获取实时写入状态跟踪
     * 并且阻止 rollup 再次写入文件
     */
    generateBundle: async function( outputOptions, bundle, isWrite ){
      const outputMap = new Map;
      let index = 0;

      // 取出所有需要写入到磁盘的文件
      Object.entries( bundle ).forEach(([ name, options ]) => {
        delete bundle[ name ];
        outputMap.set(
          options.isEntry ? config.output : resolve( config.outputDir, options.fileName ),
          options.code
        );
      });

      // 写入文件到磁盘
      for( const [ output, code ] of outputMap ){
        print.stdout(`Writing : ` + green( output ));

        const prefix = index++ ? '      ' : 'Output';
        const size = getSize( code.length );
        const gzipSize = getSize( gzipSync( code ).length );

        await outputFile( output, code );

        print.stdoutClear();
        print.log(`${ prefix }  : ${ green( output ) } - ( ${ green( size ) } / ${ green( gzipSize ) } )`);
      }

      // 输出结束部分的信息
      const date = new Date;
      const dateFormat = date.$format('YYYY-MM-DD HH:mm:ss Z');
      const time = date.$diff( startTime ) + 'ms';

      print.log(`Built at: ${ green( dateFormat ) }`);
      print.log(`Time    : ${ green( time ) }`);

      // 输出警告信息
      if( warnSet.size ){
        let index = 0;

        warnSet.forEach( message => {
          const prefix = index++ ? '    ' : 'Warn';
          const msg = yellow( message );

          print.log(`${ prefix }    : ${ msg }`);
        });

        warnSet.clear();
      }

      print.end();
    }

  };
};


module.exports.watch = rollupWatcher => {
  rollupWatcher.on( 'event', event => {
    switch( event.code ){
      case 'START':
      case 'BUNDLE_START':
      case 'BUNDLE_END':
      case 'END': break;
      case 'ERROR': {
        console.log( event.error.stack );
        break;
      };
      default:{
        console.log( event );
      };
    }
  });
}