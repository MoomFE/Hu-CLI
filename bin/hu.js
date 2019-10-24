#!/usr/bin/env node

const program = require('commander');


program.version(
  require('../package.json').version,
  '-v, --version'
);

program
  .command( 'watch' )
  .action(() => {
    process.env.HU_RUNNING_COMMAND = 'watch';

    require('../scripts/init/watch.js')();
  });

program
  .command( 'build' )
  .action(() => {
    process.env.HU_RUNNING_COMMAND = 'build';

    require('../scripts/init/build.js')();
  });

program.on('--help', function(){
  
});


program.parse( process.argv );