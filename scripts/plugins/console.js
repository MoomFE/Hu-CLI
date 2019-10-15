const print = require('../utils/print.js');
const chalk = require('chalk');


module.exports = () => ({

  name: 'console',

  /**
   * 构建开始时
   * 输出开始部分的信息
   */
  buildStart( inputOptions ){
    print.start(`Input   : ${ chalk.green( inputOptions.input ) }`);
  }

});