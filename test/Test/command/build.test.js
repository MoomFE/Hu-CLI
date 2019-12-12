require('@moomfe/zenjs');
const fs = require('fs-extra');
const path = require('path');
const expect = require('chai').expect;
const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');
const runBuild = require('../../Lib/runBuild');
const runBuildCommand = require('../../Lib/runBuildCommand');
const proxyLog = require('../../Lib/utils/proxyLog');
const proxyProcessExit = require('../../Lib/utils/proxyProcessExit');
const { root } = require('../../Lib/const');


describe( 'command.build', function(){
  this.timeout( Infinity );

  it( '默认方式使用 build 指令', async () => {
    let isRun = false;
    const isExit = await proxyProcessExit( async () => {
      await runBuildCommand({
        _code: `console.log(123)`
      }).then(({ codes: [ code ], logs }) => {
        isRun = true;
        expect( code ).is.includes(`console.log(123)`);
      });
    });

    expect( isRun ).is.true;
    expect( isExit ).is.false;
  });

  it( '使用 build 指令时带上 -c 参数', async () => {
    let isRun = false;
    const isExit = await proxyProcessExit( async () => {
      const configPath = path.resolve( root, 'other.config.js' );
      const code = `module.exports = {
        replace: {
          'console.log(123)': 'alert(456)'
        }
      }`;

      await fs.outputFile( configPath, code )
      await runBuildCommand(
        {
          _code: `console.log(123)`
        },
        'bin\\hu build -c other.config.js'
      ).then(({ codes: [ code ], logs }) => {
        isRun = true;
        expect( code ).is.not.includes(`console.log(123)`);
        expect( code ).is.includes(`alert(456)`);
      });
    });

    expect( isRun ).is.true;
    expect( isExit ).is.false;
  });

  it( '使用 build 指令时带上 --config 参数', async () => {
    let isRun = false;
    const isExit = await proxyProcessExit( async () => {
      const configPath = path.resolve( root, 'other.config.js' );
      const code = `module.exports = {
        replace: {
          'console.log(123)': 'alert(456)'
        }
      }`;

      await fs.outputFile( configPath, code )
      await runBuildCommand(
        {
          _code: `console.log(123)`
        },
        'bin\\hu build --config other.config.js'
      ).then(({ codes: [ code ], logs }) => {
        isRun = true;
        expect( code ).is.not.includes(`console.log(123)`);
        expect( code ).is.includes(`alert(456)`);
      });
    });

    expect( isRun ).is.true;
    expect( isExit ).is.false;
  });

});