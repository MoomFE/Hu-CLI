const { resolve } = require('path');
const rollup = require('rollup');
const chokidar = require('chokidar');
const print = require('../utils/print.js');


let rollupWatcher = null;


module.exports = async () => {
  const configs = await require('./basic/index.js')();

  rollupWatcher = rollup.watch(
    configs.map( config => {
      return Object.assign( {}, config.input, {
        output: config.output,
        watch: {
          chokidar: true
        }
      });
    })
  );
}


{
  const root = process.cwd();
  const configFile = resolve( root, 'hu.config.js' );

  chokidar.watch( configFile ).on( 'change', ( path, stats ) => {
    if( rollupWatcher ){
      console.log('\n');
      print.start('配置文件发生更改, 正在重启打包程序 ...');
      print.end();

      rollupWatcher.close();
      rollupWatcher = null;

      module.exports();
    }
  });
}