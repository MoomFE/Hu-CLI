#!/usr/bin/env node

const program = require('commander');
const initCommand = require('./util/initCommand');


initCommand('watch');
initCommand();

program.version(
  require('../package.json').version,
  '-v, --version'
);

program.on('--help', () => {

});


program.parse(process.argv);
