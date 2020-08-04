const sass = require('node-sass');
const { isAbsolute, resolve } = require('path');
const { access, constants, readFile } = require('fs-extra');


/**
 * 获取使用 @import 导入的文件路径
 * @param {string} url 原有路径
 * @param {string} prev 父级路径
 * @param {array} includePaths CSS 包含路径
 */
async function getImporterFile(url, prev, includePaths) {
  // 使用 @import 导入的文件路径是绝对路径, 那直接返回改路径
  if (isAbsolute(url)) {
    return url;
  }

  let finalPath;

  // 优先在 CSS 包含路径中依次查找导入的文件
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

  // 再在依赖类库中进行查找
  if (!finalPath) {
    try {
      finalPath = require.resolve(url, {
        paths: [prev]
      });
    } catch (error) {}
  }

  if (finalPath) {
    return [
      finalPath,
      await readFile(finalPath, 'utf-8')
    ];
  }

  return new Error(`未找到路径: ${url}`);
}


module.exports = (data, options = {}) => {
  /** CSS 包含路径 */
  const includePaths = options.includePaths.reverse().filter((value, index, arr) => arr.indexOf(value) === index);

  return new Promise((promiseResolve) => {
    sass.render({
      data,
      importer: (url, prev, done) => {
        prev = prev === 'stdin' ? includePaths[0] : prev;

        getImporterFile(url, prev, includePaths)
          .then(([file, contents]) => {
            options.rollup.addWatchFile(file);
            done({ file, contents });
          })
          .catch((error) => done(error));
      }
    }, (error, result) => {
      error && console.log(error);
      promiseResolve(
        result.css.toString()
      );
    });
  });
};
