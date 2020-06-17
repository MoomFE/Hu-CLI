/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-new-func */


require('@moomfe/zenjs');
const expect = require('chai').expect;
const runBuild = require('../../Lib/runBuild');


describe('plugins.css', function () {
  this.timeout(Infinity);

  const backgroundColorToStringReg = /body(\s*?){(\s*?)background-color:(\s*?)#FFF(;?)(\s*?)}/;
  const backgroundColorInsertReg = /document\.head\.appendChild\(document\.createElement\('style'\)\)\.innerHTML(\s*?)=(\s*?)"body(\s*?){(\\n)?(\s*?)background-color:(\s*?)#FFF(;?)(\s*?)}(\\n)?";/;

  it('可以正常导入 ".css", ".scss", ".sass" 类型的文件', () => {
    return runBuild({
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
    });
  });

  it('使用 ?toString 后缀导入 CSS 文件时, 可以将获得编译后的 CSS 字符串 - ( .css )', () => {
    return runBuild({
      _code: `
        export { default } from './index.css?toString'
      `,
      _files: {
        'index.css': 'body{ background-color: #FFF }'
      }
    }).then(({ codes: [code], logs }) => {
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
    }).then(({ codes: [code], logs }) => {
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
    }).then(({ codes: [code], logs }) => {
      const fn = new Function(`return ${
        code
      }`);

      expect(
        backgroundColorToStringReg.test(fn())
      ).is.true;
    });
  });

  it('使用 ?insert 后缀导入 CSS 文件时, 可以将获得编译后的 CSS 字符串 - ( .css )', () => {
    return runBuild({
      _code: `
        export { default } from './index.css?insert'
      `,
      _files: {
        'index.css': 'body{ background-color: #FFF }'
      }
    }).then(({ codes: [code], logs }) => {
      expect(
        backgroundColorInsertReg.test(code)
      ).is.true;
    });
  });

  it('使用 ?insert 后缀导入 CSS 文件时, 可以将获得编译后的 CSS 字符串 - ( .scss )', () => {
    return runBuild({
      _code: `
        export { default } from './index.scss?insert'
      `,
      _files: {
        'index.scss': 'body{ background-color: #FFF }'
      }
    }).then(({ codes: [code], logs }) => {
      expect(
        backgroundColorInsertReg.test(code)
      ).is.true;
    });
  });

  it('使用 ?insert 后缀导入 CSS 文件时, 可以将获得编译后的 CSS 字符串 - ( .sass )', () => {
    return runBuild({
      _code: `
        export { default } from './index.sass?insert'
      `,
      _files: {
        'index.sass': 'body{ background-color: #FFF }'
      }
    }).then(({ codes: [code], logs }) => {
      expect(
        backgroundColorInsertReg.test(code)
      ).is.true;
    });
  });
});
