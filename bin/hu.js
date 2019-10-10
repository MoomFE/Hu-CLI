#!/usr/bin/env node

const program = require('commander');


program.version(
  require('../package.json').version,
  '-v, --version'
);

program
  .command( 'watch' )
  .action( command => {
    console.log( command );
  });

program
  .command( 'build' )
  .action( command => {
    console.log( command );
  });

program.on('--help', function(){
  
});


program.parse( process.argv );