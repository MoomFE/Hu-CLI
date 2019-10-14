require('colors');
require('@moomfe/zenjs');
const package = require('../../package.json');


const hr = `------------------------------------------------------------------------------------------------------------`;
const hr2 = `${ hr }\n`;
const cliName = `Hu-CLI v${ package.version }`;
const cliInfo = hr.split('').$splice( 6, cliName.length + 2, ` ${ cliName.green } ` ).join('');


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
  }

};