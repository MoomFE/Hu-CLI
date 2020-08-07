const path = require('path');
const { pathExists, outputFile } = require('fs-extra');
const { yellow } = require('chalk');
const inquirer = require('inquirer');
const print = require('../utils/print.js');


module.exports = async () => {
  const root = process.cwd();
  const packageFile = path.resolve(root, 'package.json');

  // 未找到 package.json 文件
  if (await pathExists(packageFile) === false) {
    print.start();
    print.log(`未找到 ( ${yellow('package.json')} ) 文件, 请先执行 \`npm run init\` 初始化项目 !`);
    print.end();
    process.exit(0);
  }

  inquirer.prompt([
    {
      type: 'confirm',
      name: 'importEslintRules',
      message: '是否导入 ESLint 规则规范代码书写'
    }
  ]).then((answers) => {
    // 导入 ESLint 规则
    if (answers.importEslintRules) createEslintrcFile(root);
    // 创建 Hu-CLI 的配置文件
    createConfigFile(root);
    // 写入 npm 脚本
    writeNpmScripts(packageFile);
  });
};


/**
 * 创建 .eslintrc.js 规则文件
 */
function createEslintrcFile(root) {
  let eslintrcRelativePath = path.posix.join(
    ...path.relative(root, path.resolve(__dirname, '../../.eslintrc.js')).split(path.sep)
  );

  if (!path.isAbsolute(eslintrcRelativePath) && !eslintrcRelativePath.startsWith('.')) {
    eslintrcRelativePath = `./${eslintrcRelativePath}`;
  }

  eslintrcRelativePath = JSON.stringify(eslintrcRelativePath);
  eslintrcRelativePath = eslintrcRelativePath.replace(/(^")|("$)/g, "'");

  const data = `
    module.exports = {
      root: true,
      env: {
        browser: true
      },
      extends: [
        ${eslintrcRelativePath}
      ]
    };
  `
    .trimLeft()
    .replace(/^[^\S\r\n]{2,4}/mg, '');

  outputFile(`${root}/.eslintrc.js`, data);
}

/**
 * 创建 Hu-CLI 的配置文件
 */
function createConfigFile(root) {
  const data = `
    /** 当前执行的指令 */
    const HU_RUNNING_COMMAND = process.env.HU_RUNNING_COMMAND;

    module.exports = {
      mode: HU_RUNNING_COMMAND === 'build',
      replace: {
        'process.env.NODE_ENV': JSON.stringify(HU_RUNNING_COMMAND === 'build' ? 'production' : 'development')
      }
    };
  `
    .trimLeft()
    .replace(/^[^\S\r\n]{2,4}/mg, '');

  outputFile(`${root}/hu.config.js`, data);
}

/**
 * 写入 npm 脚本
 */
function writeNpmScripts(packageFile) {
  const packageJson = require(packageFile); // eslint-disable-line import/no-dynamic-require
  const packageScripts = packageJson.scripts || (packageJson.scripts = {});

  packageScripts.build = 'hu build';
  packageScripts.watch = 'hu watch';

  outputFile(packageFile, JSON.stringify(packageJson, null, 2));
}
