#!/usr/bin/env node

const program = require('commander');


program.version(
  require('../package.json').version,
  '-v, --version'
);

program
  .command( 'watch' )
  .action(() => {
    require('../scripts/init/watch.js')();
  });

program
  .command( 'build' )
  .action(() => {
    require('../scripts/init/build.js')();
  });

program.on('--help', function(){
  
});


program.parse( process.argv );