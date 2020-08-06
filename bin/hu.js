#!/usr/bin/env node

require('./util/initProxyConsole');
const program = require('commander');
const initBuildCommand = require('./util/initBuildCommand');


initBuildCommand('watch');
initBuildCommand();

program.version(
  require('../package.json').version,
  '-v, --version'
);

program.on('--help', () => {

});


program.parse(process.argv);
