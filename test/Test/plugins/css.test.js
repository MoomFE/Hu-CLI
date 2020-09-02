/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-new-func */


require('@moomfe/zenjs');
const expect = require('chai').expect;
const { resolve, dirname } = require('path');
const { pathExists, readFile } = require('fs-extra');
const runBuild = require('../../Lib/runBuild');
const { root } = require('../../Lib/const');


describe('plugins.css', function () {
  this.timeout(Infinity);

  const backgroundColorToStringReg = /^(\s*?)body(\s*?){(\s*?)background-color:(\s*?)#FFF(;?)(\s*?)}(\s*?)$/;
  const backgroundColorToStringRegEnd = /(\s*?)body(\s*?){(\s*?)background-color:(\s*?)#FFF(;?)(\s*?)}(\s*?)$/;
  const backgroundColorInsertReg = /document\.head\.appendChild\(document\.createElement\('style'\)\)\.innerHTML(\s*?)=(\s*?)"body(\s*?){(\\n)?(\s*?)background-color:(\s*?)#FFF(;?)(\s*?)}(\\n)?";/;

  it('可以正常导入 ".css", ".scss", ".sass" 类型的文件', async () => {
    let isRun = false;

    await runBuild({
      _code: `
        import './index.css'
        import './index.scss'
        import './index.sass'
      `,
      _files: {
        'index.css': '',
        'index.scss': '',
        'index.sass': ''
      }
    }).then(() => {
      isRun = true;
    });

    expect(isRun).is.true;
  });

  it('使用 ?toString 后缀导入 CSS 文件时, 可以将获得编译后的 CSS 字符串 - ( .css )', () => {
    return runBuild({
      _code: `
        export { default } from './index.css?toString'
      `,
      _files: {
        'index.css': 'body{ background-color: #FFF }'
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      const fn = new Function(`return ${
        code
      }`);

      expect(
        backgroundColorToStringReg.test(fn())
      ).is.true;
    });
  });

  it('使用 ?toString 后缀导入 CSS 文件时, 可以将获得编译后的 CSS 字符串 - ( .scss )', () => {
    return runBuild({
      _code: `
        export { default } from './index.scss?toString'
      `,
      _files: {
        'index.scss': 'body{ background-color: #FFF }'
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      const fn = new Function(`return ${
        code
      }`);

      expect(
        backgroundColorToStringReg.test(fn())
      ).is.true;
    });
  });

  it('使用 ?toString 后缀导入 CSS 文件时, 可以将获得编译后的 CSS 字符串 - ( .sass )', () => {
    return runBuild({
      _code: `
        export { default } from './index.sass?toString'
      `,
      _files: {
        'index.sass': 'body{ background-color: #FFF }'
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      const fn = new Function(`return ${
        code
      }`);

      expect(
        backgroundColorToStringReg.test(fn())
      ).is.true;
    });
  });

  it('使用 ?insert 后缀导入 CSS 文件时, 可以将 CSS 插入到 DOM 中 - ( .css )', () => {
    return runBuild({
      _code: `
        export { default } from './index.css?insert'
      `,
      _files: {
        'index.css': 'body{ background-color: #FFF }'
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      expect(
        backgroundColorInsertReg.test(code)
      ).is.true;
    });
  });

  it('使用 ?insert 后缀导入 CSS 文件时, 可以将 CSS 插入到 DOM 中 - ( .scss )', () => {
    return runBuild({
      _code: `
        export { default } from './index.scss?insert'
      `,
      _files: {
        'index.scss': 'body{ background-color: #FFF }'
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      expect(
        backgroundColorInsertReg.test(code)
      ).is.true;
    });
  });

  it('使用 ?insert 后缀导入 CSS 文件时, 可以将 CSS 插入到 DOM 中 - ( .sass )', () => {
    return runBuild({
      _code: `
        export { default } from './index.sass?insert'
      `,
      _files: {
        'index.sass': 'body{ background-color: #FFF }'
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      expect(
        backgroundColorInsertReg.test(code)
      ).is.true;
    });
  });

  it('不使用后缀导入 CSS 文件时, 会将导入的 CSS 内容输出为文件', () => {
    return runBuild({
      _code: `
        import './index.scss'
      `,
      _files: {
        'index.scss': 'body{ background-color: #FFF }'
      }
    }).then(async ({ rollupConfigs: [rollupConfig], error }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.true;
      expect(backgroundColorToStringReg.test(await readFile(cssFile))).is.true;
    });
  });

  it('使用 Sass 语言时, 使用 @import 绝对路径的方式导入其他样式文件', () => {
    const themePath = resolve(root, 'src/theme.scss');

    return runBuild({
      _code: `
        export { default } from './index.scss?toString'
      `,
      _files: {
        'theme.scss': '$color: #FFF',
        'index.scss': `
          @import ${JSON.stringify(themePath)};
          body{ background-color: $color }
        `
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      const fn = new Function(`return ${
        code
      }`);

      expect(
        backgroundColorToStringReg.test(fn())
      ).is.true;
    });
  });

  it('使用 Sass 语言时, 使用 @import 相对路径的方式导入其他样式文件 - 导入的样式文件无前缀时, 第一步先查找当前文件夹', () => {
    return runBuild({
      _code: `
        export { default } from './style/index.scss?toString'
      `,
      _files: {
        'style/theme.scss': '$color: #FFF',
        'style/index.scss': `
          @import "theme.scss";
          body{ background-color: $color }
        `
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      const fn = new Function(`return ${
        code
      }`);

      expect(
        backgroundColorToStringReg.test(fn())
      ).is.true;
    });
  });

  it('使用 Sass 语言时, 使用 @import 相对路径的方式导入其他样式文件 - 导入的样式文件无前缀时, 第二步会查找打包入口文件夹', () => {
    return runBuild({
      _code: `
        export { default } from './style/index.scss?toString'
      `,
      _files: {
        'theme.scss': '$color: #FFF',
        'style/index.scss': `
          @import "theme.scss";
          body{ background-color: $color }
        `
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      const fn = new Function(`return ${
        code
      }`);

      expect(
        backgroundColorToStringReg.test(fn())
      ).is.true;
    });
  });

  it('使用 Sass 语言时, 使用 @import 相对路径的方式导入其他样式文件 - 导入的样式文件无前缀时, 第三步会查找依赖类库', () => {
    return runBuild({
      _code: `
        export { default } from './index.scss?toString'
      `,
      _files: {
        'index.scss': `
          @import "normalize.css";
          body{ background-color: #FFF }
        `
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      const fn = new Function(`return ${
        code
      }`);

      expect(
        backgroundColorToStringReg.test(fn())
      ).is.false;

      expect(
        backgroundColorToStringRegEnd.test(fn())
      ).is.true;

      expect(
        /^\/\*! normalize.css/.test(fn())
      ).is.true;
    });
  });

  it('使用 Sass 语言时, 使用 @import 相对路径的方式导入其他样式文件 - 导入的样式文件使用 ./ 前缀时则导入指定文件', () => {
    return runBuild({
      _code: `
        export { default } from './style/index.scss?toString'
      `,
      _files: {
        'style/theme.scss': '$color: #FFF',
        'style/index.scss': `
          @import "./theme.scss";
          body{ background-color: $color }
        `
      }
    }).then(async ({ codes: [code], error, rollupConfigs: [rollupConfig] }) => {
      // 判断是否报错
      expect(error).is.not.throw;

      // 判断是否输出样式文件
      const cssFile = resolve(dirname(rollupConfig.output.file), 'index.css');
      expect(await pathExists(cssFile)).is.false;

      const fn = new Function(`return ${
        code
      }`);

      expect(
        backgroundColorToStringReg.test(fn())
      ).is.true;
    });
  });

  it('使用 Sass 语言时, 使用 @import 相对路径的方式导入其他样式文件 - 导入的样式文件使用 ./ 前缀时则导入指定文件, 不会查找打包入口文件夹', () => {
    return runBuild({
      _code: `
        export { default } from './style/index.scss?toString'
      `,
      _files: {
        'theme.scss': '$color: #FFF',
        'style/index.scss': `
          @import "./theme.scss";
          body{ background-color: $color }
        `
      }
    }).then(({ error }) => {
      // 判断是否报错
      expect(error).is.throw;
    });
  });
});
