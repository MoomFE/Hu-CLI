require('@moomfe/zenjs');
const { green, yellow } = require('chalk');
const { outputFile } = require('fs-extra');
const { resolve } = require('path');
const { gzipSync } = require('zlib');
const print = require('../../utils/print');
const getSize = require('../../utils/getSize');


module.exports = (config, rollupConfig) => {
  let startTime = new Date();
  const warnSet = new Set();


  rollupConfig.input.onwarn = (warning, defaultHandler) => {
    switch (warning.code) {
      case 'EMPTY_BUNDLE': break;
      default: {
        warnSet.add(warning.message);
      }
    }
  };


  return {

    name: 'hu:console',

    /**
     * 构建开始时
     * 输出开始部分的信息
     */
    buildStart(inputOptions) {
      startTime = new Date();
      warnSet.clear();

      print.start(`Input   : ${green(inputOptions.input)}`);
    },

    /**
     * 构建完成时
     * 手动写入文件到磁盘以获取实时写入状态跟踪
     * 并且阻止 rollup 再次写入文件
     */
    async generateBundle(outputOptions, bundle, isWrite) {
      const outputMap = new Map();
      let index = 0;

      // 取出所有需要写入到磁盘的文件
      Object.entries(bundle).forEach(([name, options]) => {
        delete bundle[name];

        let output = config.output;
        let code = '';

        if (!options.isEntry) {
          output = resolve(config.outputDir, config.assetsDir, options.fileName);
        }

        switch (options.type) {
          case 'chunk': code = options.code; break;
          case 'asset': code = options.source; break;
          default:
        }

        outputMap.set(output, code);
      });

      // 写入文件到磁盘
      for (const [output, code] of outputMap) {
        if (!process.env.HU_RUNNING_TEST) {
          print.stdout(`Writing : ${green(output)}`);
        }

        const prefix = index++ ? '      ' : 'Output';
        const size = getSize(code.length);
        const gzipSize = getSize(gzipSync(code).length);

        // eslint-disable-next-line no-await-in-loop
        await outputFile(output, code);

        print.log(`${prefix}  : ${green(output)} - ( ${green(size)} / ${green(gzipSize)} )`);
      }

      // 输出结束部分的信息
      const date = new Date();
      const dateFormat = date.$format('YYYY-MM-DD HH:mm:ss Z');
      const time = `${date.$diff(startTime)}ms`;

      print.log(`Built at: ${green(dateFormat)}`);
      print.log(`Time    : ${green(time)}`);

      // 输出警告信息
      if (warnSet.size) {
        let errorIndex = 0;

        warnSet.forEach((message) => {
          const prefix = errorIndex++ ? '    ' : 'Warn';
          const msg = yellow(message);

          print.log(`${prefix}    : ${msg}`);
        });

        warnSet.clear();
      }

      print.end();
    }

  };
};


/**
 * Rollup 解析文件时, 输出正在解析的文件路径
 */
module.exports.transform = (config, rollupConfig) => {
  let progress = 0;

  return {

    name: 'hu:console.transform',

    /**
     * 构建开始时
     * 重置变量
     */
    buildStart(inputOptions) {
      progress = 0;
    },

    /**
     * 解析文件时
     * 输出正在解析的文件路径
     */
    transform(code, id) {
      if (!process.env.HU_RUNNING_TEST) {
        print.stdout(`Transform ( ${++progress} ): ${green(id)}`);
      }
    }

  };
};


/**
 * 执行 watch 时
 * 监听抛出的异常信息
 */
module.exports.watch = (rollupWatcher) => {
  rollupWatcher.on('event', (event) => {
    switch (event.code) {
      case 'START':
      case 'BUNDLE_START':
      case 'BUNDLE_END':
      case 'END': break;
      case 'ERROR': {
        console.log(event.error.stack);
        break;
      }
      default: {
        console.log(event);
      }
    }
  });
};
