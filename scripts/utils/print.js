require('@moomfe/zenjs');
const { green, red } = require('chalk');
const packageData = require('../../package.json');


const hr = `------------------------------------------------------------------------------------------------------------`;
const hr2 = `${ hr }\n`;
const cliName = `Hu-CLI v${ packageData.version }`;
const cliInfo = hr.split('').$splice( 6, cliName.length + 2, ` ${ green( cliName ) } ` ).join('');
let lastLog = packageData;


module.exports = {

  _log( message ){
    console.log( lastLog = message );
  },

  log( ...args ){
    for( const message of args ){
      this._log( `- ${ message }` );
    }
  },

  start(){
    lastLog !== packageData && lastLog !== hr2 && console.log( hr2 );
    this._log( cliInfo );
    Reflect.apply( this.log, this, arguments );
  },

  end(){
    Reflect.apply( this.log, this, arguments );
    this._log( hr2 );
  },

  error( ...args ){
    this.log(
      args.map( message => {
        return red( message );
      })
    );
  },

  stdout( message ){
    if( process.stdout.isTTY ){
      process.stdout.clearLine();
      process.stdout.cursorTo( 0 );
      process.stdout.write( '- ' + message );
    }else{
      this.log( message );
    }
  },

  stdoutClear(){
    if( process.stdout.isTTY ){
      process.stdout.clearLine();
      process.stdout.cursorTo( 0 );
    }
  }

};