const { resolve } = require('path');
const { exec } = require('child_process');
const cwd = resolve( __dirname, '../../' );


module.exports = script => {
  return new Promise(( resolve, reject ) => {
    exec(`npm run ${ script }`, { cwd }, ( error, stdout, stderr ) => {
      if( error ){
        reject( error, stdout, stderr );
      }else{
        resolve( stdout );
      }
    });
  });
};