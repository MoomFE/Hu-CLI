const { exec } = require('child_process');
const { root } = require('./const');


module.exports = script => {
  return new Promise(( resolve, reject ) => {
    exec(`npm run ${ script }`, { cwd: root }, ( error, stdout, stderr ) => {
      if( error ){
        reject( error, stdout, stderr );
      }else{
        resolve( stdout );
      }
    });
  });
};