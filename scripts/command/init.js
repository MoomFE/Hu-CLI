const { resolve, relative } = require('path');
const { pathExists, outputFile } = require('fs-extra');
const { yellow } = require('chalk');
const inquirer = require('inquirer');
const print = require('../utils/print.js');


module.exports = async () => {
  const root = process.cwd();
  const packageFile = resolve(root, 'package.json');

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
    // 写入 npm 脚本
    writeNpmScripts(packageFile);
  });
};


/**
 * 创建 .eslintrc.js 规则文件
 */
function createEslintrcFile(root) {
  const fileName = '.eslintrc.js';
  const eslintrcRelativePath = JSON.stringify(relative(root, resolve(__dirname, `../../${fileName}`))).replace(/(^")|("$)/g, "'");
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
    .replace(/^\s{2,4}/mg, '');

  outputFile(`${root}/${fileName}`, data);
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
