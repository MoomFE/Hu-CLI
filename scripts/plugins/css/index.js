require('@moomfe/zenjs');
const { resolve, dirname, parse } = require('path');
const { readFile } = require('fs-extra');
const querystring = require('querystring');
const compileCSS = require('./compileCSS');


/** 支持的 CSS 类型 */
const extensions = [
  '.css', '.sass', '.scss'
];


module.exports = (config, rollupConfig) => {
  /** CSS 包含路径 */
  const INCLUDEPATHS = [rollupConfig.config.inputDir];

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
    load: pluginFnPreprocess('load', function ([id], { url, ext }) {
      /** CSS 文件路径 */
      const path = resolve(url.dir, `${url.name}${ext}`);

      // 监听该 CSS 文件更改
      //  - 导入 CSS 时使用了参数, 某些插件在解析路径时无法识别, 导致不会监听该 CSS 文件更改
      this.addWatchFile(path);
      // 返回读取到的 CSS 文件内容
      return readFile(path, 'utf-8');
    }),

    /**
     * 解析文件时
     * 对 CSS 进行转义
     */
    transform: pluginFnPreprocess('transform', async function ([code, id], { search, ext, url }) {
      /** CSS 文件路径 */
      const path = resolve(url.dir, `${url.name}${ext}`);

      // 取出所有参数
      search = Object.keys(querystring.parse(search));
      // 对 CSS 进行处理
      code = await compileCSS(code, ext, {
        includePaths: [url.dir, rollupConfig.config.inputDir],
        file: path,
        importer: (finalPath) => {
          this.addWatchFile(finalPath);
        }
      });

      // 返回 CSS 字符串
      if (search.includes('toString')) {
        return `export default ${JSON.stringify(code)}`;
      }

      // 插入到 DOM 中
      if (search.includes('insert')) {
        return `
          document.head.appendChild(document.createElement('style')).innerHTML = ${JSON.stringify(code)};
          export default '';
        `;
      }

      return '';
    })

  };
};

/**
 * 插件预处理方法
 */
function pluginFnPreprocess(name, callback) {
  return async function (...args) {
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
      let result = Reflect.apply(callback, this, [args, {
        url,
        ext,
        search
      }]);

      // 需要等待异步回调执行完
      if (result instanceof Promise) {
        result = await result;
      }

      return result;
    }

    return null;
  };
}
