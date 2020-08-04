const compileSassToCSS = require('./compileSassToCSS.js');


/**
 * 对传入的 CSS 进行处理
 */
module.exports = async (
  code,
  type,
  options
) => {
  // 去除头尾空格
  // 如果是无内容, 则直接返回
  if (!(code = code.trim())) {
    return '';
  }

  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');

  // 转译 Sass 代码
  if (['.sass', '.scss'].includes(type)) {
    code = await compileSassToCSS(code, options);
  }

  // 使用 PostCSS 进行兼容性处理
  code = (
    await postcss([autoprefixer]).process(code, {
      from: undefined
    })
  ).css;

  return code;
};
