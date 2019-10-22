const { outputFile } = require('fs-extra');
const { resolve } = require('path');
const { root } = require('../const');


module.exports = ( config ) => {
  const toString = JSON.stringify( config );
  const data = `module.exports = ${
    toString
  }`;


  return outputFile(
    resolve( root, 'hu.config.js' ),
    data
  );
}