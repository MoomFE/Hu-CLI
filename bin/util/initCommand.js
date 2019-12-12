const program = require('commander');


module.exports = function initCommand( command = 'build' ){
  program
    .command( command )
    .option('-c, --config <filename>', '使用指定的配置文件 ( 未指定时则默认使用 hu.config.js )')
    .action(( cmd ) => {
      process.env.HU_RUNNING_COMMAND = command;
      process.env.HU_RUNNING_CONFIG = cmd.config || 'hu.config.js';

      require(`../scripts/init/${ command }.js`)();
    });
}