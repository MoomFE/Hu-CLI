require('@moomfe/zenjs');
const chalk = require('chalk');
const package = require('../../package.json');


const hr = `------------------------------------------------------------------------------------------------------------`;
const hr2 = `${ hr }\n`;
const cliName = `Hu-CLI v${ package.version }`;
const cliInfo = hr.split('').$splice( 6, cliName.length + 2, ` ${ chalk.green( cliName ) } ` ).join('');


module.exports = {

  log( ...args ){
    for( const message of args ){
      console.log( `- ${ message }` );
    }
  },

  start(){
    console.log( cliInfo );
    Reflect.apply( this.log, this, arguments );
  },

  end(){
    Reflect.apply( this.log, this, arguments );
    console.log( hr2 );
  },

  error( ...args ){
    this.log(
      args.map( message => {
        return chalk.red( message );
      })
    );
  }

};