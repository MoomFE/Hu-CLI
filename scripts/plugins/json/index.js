const { extname } = require('path');
const { dataToEsm } = require('rollup-pluginutils');
const json5 = require('json5');

const defaultOptions = {
  compact: false,
  preferConst: false,
  objectShorthand: false,
  namedExports: true
};


module.exports = ( config ) => {
  const options = config.pluginOptions.json || {};
  let indent = options.indent;

  if( typeof indent !== 'string' ){
    indent = '  ';
  }

  return {
    name: 'json',
    transform( json, id ){
      const ext = extname( id );

      if( ext === '.json' || ext === '.json5' ){
        return dataToEsm( json5.parse( json ), {
          indent,
          ...defaultOptions
        });
      }
    }
  };
}