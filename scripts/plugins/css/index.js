require('@moomfe/zenjs');
const { resolve, dirname, parse } = require('path');
const { readFile } = require('fs-extra');


/** 支持的 CSS 类型 */
const extensions = [
  '.css', '.sass', '.scss'
];


module.exports = (config) => {
  return {

    name: 'hu:css',

    /**
     * 解析路径时
     * 解析 CSS 文件路径
     */
    resolveId: pluginFnPreprocess('resolveId', ([to, from]) => {
      return resolve(dirname(from), to);
    }),

    /**
     * 加载文件时
     * 读取 CSS 文件
     */
    load: pluginFnPreprocess('load', async ([id], { url, ext }) => {
      const code = await readFile(
        resolve(dirname(id), `${url.name}${ext}`),
        'utf-8'
      );
      return code;
    }),

    /**
     * 解析文件时
     * 对 CSS 进行转义
     */
    transform: pluginFnPreprocess('transform', async ([code, id], { search }) => {
      return '';
    })

  };
};

/**
 * 插件预处理方法
 */
function pluginFnPreprocess(name, callback) {
  return async (...args) => {
    let id;

    switch (name) {
      case 'resolveId':
      case 'load': id = args[0]; break;
      case 'transform': id = args[1]; break;
      default: throw new Error('???');
    }

    /** 路径信息 */
    const url = parse(id);
    /** 后缀信息 */
    const [ext, search] = url.ext.split('?');

    // 是支持的 CSS 类型
    if (extensions.includes(ext)) {
      let result = callback(args, {
        url,
        ext,
        search
      });

      // 需要等待异步回调执行完
      if (result instanceof Promise) {
        result = await result;
      }

      return result;
    }

    return null;
  };
}
