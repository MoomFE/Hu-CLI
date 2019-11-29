require('@moomfe/zenjs');
const expect = require('chai').expect;
const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');
const runBuild = require('../../Lib/runBuild');


describe( 'plugins.json', function(){
  this.timeout( Infinity );

  it( '可以正常导入 .json 文件', () => {
    return runBuild({
      _code: `
        export { default } from './index.json';
      `,
      _files: {
        "index.json": `
          { "asd": 123 }
        `
      }
    }).then(({ codes: [ code ], logs }) => {
      const fn = new Function(`return ${
        code
      }`);

      expect( fn() ).is.deep.equals({
        asd: 123
      });
    });
  });

  it( '可以正常导入 .json5 文件', () => {
    return runBuild({
      _code: `
        export { default } from './index.json5';
      `,
      _files: {
        "index.json5": `
          // comments
          { "asd": 123 }
        `
      }
    }).then(({ codes: [ code ], logs }) => {
      const fn = new Function(`return ${
        code
      }`);

      expect( fn() ).is.deep.equals({
        asd: 123
      });
    });
  });

});