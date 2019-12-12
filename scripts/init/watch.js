const { resolve } = require('path');
const rollup = require('rollup');
const chokidar = require('chokidar');
const print = require('../utils/print.js');
const pluginConsole = require('../plugins/console/index.js');


const HU_RUNNING_CONFIG = process.env.HU_RUNNING_CONFIG;
let rollupWatcher = null;


module.exports = async () => {
  const configs = await require('./basic/index.js')();
  const rollupConfigs = configs.map( config => {
    return Object.assign( {}, config.input, {
      output: config.output,
      watch: {
        chokidar: true
      }
    });
  });

  rollupWatcher = rollup.watch( rollupConfigs );
  pluginConsole.watch( rollupWatcher );
}


{
  const root = process.cwd();
  const configFile = resolve( root, HU_RUNNING_CONFIG );

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