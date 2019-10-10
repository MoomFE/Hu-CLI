#!/usr/bin/env node

const program = require('commander');


program.version(
  require('../package.json').version,
  '-v, --version'
);

program
  .command( 'watch' )
  .action(function(){
    console.log( arguments );
  });

program
  .command( 'build' )
  .action(function(){
    console.log( arguments );
  });

program.on('--help', function(){
  console.log( arguments );
});


program.parse( process.argv );