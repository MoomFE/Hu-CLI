const sass = require('node-sass');
const { isAbsolute, resolve, dirname } = require('path');
const { access, constants, readFile } = require('fs-extra');


/**
 * 获取使用 @import 导入的 CSS 文件的路径及文件内容
 * @param {string} url 原有路径
 * @param {string} prev 导入该 CSS 的父级 CSS 文件路径
 * @param {array} includePaths CSS 包含路径
 */
async function getImporterFile(url, prev, includePaths) {
  let finalPath;

  // 使用 @import 导入的文件路径是绝对路径
  if (isAbsolute(url)) {
    finalPath = url;
  }

  // 使用 ./ 和 ../ 作为前缀时
  // 则只获取指定文件的路径及内容
  if (!finalPath && (url.startsWith('./') || url.startsWith('../'))) {
    finalPath = resolve(dirname(prev), url);

    return [
      finalPath,
      await readFile(finalPath, 'utf-8')
    ];
  }

  // 优先在 CSS 包含路径中依次查找导入的文件
  if (!finalPath) {
    for (const includePath of includePaths) {
      finalPath = resolve(includePath, url);

      try {
        await access(finalPath, constants.F_OK); // eslint-disable-line no-await-in-loop
        break;
      } catch (error) {
        finalPath = undefined;
        continue;
      }
    }
  }

  // 最后使用 require 的方式, 在依赖类库中进行查找
  if (!finalPath) {
    finalPath = require.resolve(url, {
      paths: [dirname(prev)]
    });
  }

  return [
    finalPath,
    await readFile(finalPath, 'utf-8')
  ];
}


module.exports = (data, options) => {
  /** 优先查找导入 CSS 的包含路径 */
  const includePaths = options.includePaths.filter((value, index, arr) => arr.indexOf(value) === index);
  /** 查找到导入的 CSS 后, 执行的回调 */
  const importerCallback = options.importer;

  return new Promise((promiseResolve, promiseReject) => {
    sass.render({
      file: options.file,
      data,
      importer: (url, prev, done) => {
        getImporterFile(url, prev, includePaths)
          .then(([file, contents]) => {
            importerCallback(file);
            done({ file, contents });
          })
          .catch((error) => done(error));
      }
    }, (error, result) => {
      if (error) {
        return promiseReject(error);
      }
      promiseResolve(
        result.css.toString()
      );
    });
  });
};
