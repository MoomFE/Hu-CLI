require('@moomfe/zenjs');
const expect = require('chai').expect;
const compilerRollupConfigs = require('../../Lib/compilerRollupConfigs');
const runBuild = require('../../Lib/runBuild');


describe( 'plugins.replace', function(){
  this.timeout( Infinity );

  it( '不使用 replace 选项时, 在生成打包配置时不会加载相关插件', () => {
    const rollupConfig = compilerRollupConfigs()[0];

    expect(
      rollupConfig.input.plugins.$find({ name: 'replace' })
    ).is.undefined;
  });

  it( '在使用 replace 选项时, 如果选项内没有内容, 在生成打包配置时不会加载相关插件', () => {
    const rollupConfig = compilerRollupConfigs({
      replace: {}
    })[0];

    expect(
      rollupConfig.input.plugins.$find({ name: 'replace' })
    ).is.undefined;
  });

  it( '在使用 replace 选项时, 且选项内有内容, 在生成打包配置时会加载相关插件', () => {
    const rollupConfig = compilerRollupConfigs({
      replace: {
        a: 'b'
      }
    })[0];

    expect(
      rollupConfig.input.plugins.$find({ name: 'replace' })
    ).is.not.undefined;
  });

  it( '在使用 replace 选项进行打包时, 会按照传入的 key: value 进行全部替换', () => {
    return runBuild({
      _code: `
        console.log("aaa-BBB-aaa")
      `,
      replace: {
        aaa: 'AAA'
      }
    }).then(({ codes, logs }) => {
      expect(
        codes[0].includes('AAA-BBB-AAA')
      ).is.true;
    });
  });

  it( '在使用 replace 选项进行打包时, 会按照传入的 key: value 进行依次替换', () => {
    return runBuild({
      _code: `
        console.log("aaa-BBB-aaa")
      `,
      replace: [
        { from: 'aaa', to: 'BBB' },
        { from: 'BBB', to: 'AAA' },
        { from: 'AAA', to: 'CCC' }
      ]
    }).then(({ codes, logs }) => {
      expect(
        codes[0].includes('CCC-CCC-CCC')
      ).is.true;
    });
  });

  it( '在使用 replace 选项进行打包时, 可以对各种字符进行替换', () => {
    return runBuild({
      _code: `
        console.log(\`-=~!@#$%^&*()_+[]\\\\{}|;':",./<>?\`)
      `,
      replace: {
        "-": "",
        "=": "",
        "~": "",
        "!": "",
        "@": "",
        "#": "",
        "$": "",
        "%": "",
        "^": "",
        "&": "",
        "*": "",
        "(": "",
        ")": "",
        "_": "",
        "+": "",
        "[": "",
        "]": "",
        "\\\\": "",
        "{": "",
        "}": "",
        "|": "",
        ";": "",
        "'": "",
        ":": "",
        "\"": "",
        ",": "",
        ".": "",
        "/": "",
        "<": "",
        ">": "",
        "?": "",
        " ": "",
        "`": "\"",
        "consolelog\"\"": "console.log(\"\")"
      }
    }).then(({ codes, logs }) => {
      expect(
        codes[0].includes('console.log("")')
      ).is.true;
    });
  });

  it( '在使用 replace 选项进行打包时, 可以传入数组类型的选项, 可以自定义正则表达式进行替换', () => {
    return runBuild({
      _code: `
        console.log("aaa-BBB-aaa-DDD")
      `,
      replace: [
        { from: 'BBB', to: 'CCC' },
        { from: /aaa(?=-)/, to: 'AAA' },
        { from: 'DDD', to: 'BBB' }
      ]
    }).then(({ codes, logs }) => {
      expect(
        codes[0].includes('AAA-CCC-aaa-BBB')
      ).is.true;
    });
  });

});